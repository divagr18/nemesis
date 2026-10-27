"""Attack programs: the JSON language Nemesis's LLM writes, compiled to θ.

A program is a hypothesis plus a list of ops. Every numeric field is either a fixed number or
a free range [lo, hi] that the optimizer searches. Compiling yields a base θ and a fixed-size
map from free parameters to θ slots, so search over any program reuses one jitted rollout.

    {"name": "rear slip on turn",
     "hypothesis": "the gait relies on rear-foot grip when the yaw command flips",
     "ops": [{"op": "friction", "feet": ["RR", "RL"], "mu": [0.1, 0.5]},
             {"op": "command", "a": [0.8, 0, 0], "b": [0.8, 0, [-1.2, 1.2]], "switch": [1, 4]}]}

Legs and joint names are the robot's (Go1: FR FL RR RL x hip thigh calf; G1: L R x hip_pitch ...
ankle_roll). language(robot) builds that robot's Program model and compiler; the module-level
Program, compile_program and json_schema are Go1's.

Robots with terrain also get `stairs`, `curb` and `course` (at most one of them per program). A
course is a route of ordered segments along the start heading (stairs_up, stairs_down, curb, ramp,
ice, wet) that plan_course lays out with a cursor and checks, with error messages written for the
LLM to read and fix:

    {"op": "course", "segments": [
        {"kind": "stairs_up", "gap": 0.5, "height": 0.05, "count": 3, "depth": 0.25},
        {"kind": "stairs_down"},
        {"kind": "ice", "gap": 0.2, "mu": 0.08, "length": 1.5},
        {"kind": "ramp", "angle": 8, "length": 2}]}
"""

from dataclasses import dataclass
from functools import cache
from typing import Annotated, Literal, Union

import jax.numpy as jp
import numpy as np
from pydantic import BaseModel, ConfigDict, Field, field_validator

from nemesis import robots
from nemesis.perturb import canonical as C
from nemesis.perturb import terrain

K_MAX = 10  # max free parameters per program (padded, so search compiles once)
CURB_DEPTH = 0.3  # a curb is one step; its top continues as a landing whatever the depth

Num = Union[float, tuple[float, float]]  # fixed value, or [lo, hi] to search


class _Op(BaseModel):
    model_config = ConfigDict(extra="forbid")


class IcePatch(_Op):
    op: Literal["ice_patch"]
    mu: Num
    start: Num
    length: Num


class Payload(_Op):
    op: Literal["payload"]
    mass: Num
    offset_x: Num = 0.0
    offset_y: Num = 0.0
    offset_z: Num = 0.0


class Slope(_Op):
    op: Literal["slope"]
    pitch: Num = 0.0
    roll: Num = 0.0


class JointFriction(_Op):
    op: Literal["joint_friction"]
    scale: Num


class Latency(_Op):
    op: Literal["latency"]
    steps: Num


class Push(_Op):
    op: Literal["push"]
    force_x: Num = 0.0
    force_y: Num = 0.0
    force_z: Num = 0.0
    start: Num
    duration: Num


class SensorNoise(_Op):
    op: Literal["sensor_noise"]
    std: Num


class ImuBias(_Op):
    op: Literal["imu_bias"]
    roll: Num = 0.0
    pitch: Num = 0.0


class VelocityBias(_Op):
    op: Literal["velocity_bias"]
    x: Num = 0.0
    y: Num = 0.0
    z: Num = 0.0


class Command(_Op):
    op: Literal["command"]
    a: tuple[Num, Num, Num]
    b: tuple[Num, Num, Num] | None = None
    switch: Num = 20.0


class Stairs(_Op):
    """Steps rising away from the robot, straight across its initial path (robots with terrain)."""
    op: Literal["stairs"]
    height: Num        # riser height per step (m)
    depth: Num = 0.3   # tread depth (m)
    count: Num         # number of steps (rounded)
    start: Num         # distance from the start position to the first riser (m)


class Curb(_Op):
    """A single step up onto a raised walkway: stairs with count 1."""
    op: Literal["curb"]
    height: Num
    start: Num


# --- Course: a route from a sentence (Oct 28) ---------------------------------------------------

_GAP = Field(0.0, ge=0.0, le=6.0, description="flat ground (m) before this segment, measured from where the "
                                             "previous segment ended (from the start position for the first)")


class _Seg(BaseModel):
    model_config = ConfigDict(extra="forbid")


class StairsUpSeg(_Seg):
    """Steps up, straight across the path. The top step continues as a 2.4 m landing (raised
    walkway); the segment ends at its last riser. At most 8 steps, 6 in a course with a ramp."""
    kind: Literal["stairs_up"]
    gap: float = _GAP
    height: Num = Field(description="riser height per step (m): door threshold 0.02-0.03, small step 0.05-0.08, "
                                    "curb or low step 0.10-0.15 (max 0.15)")
    count: float = Field(ge=1, le=8, description="number of steps (1-8; at most 4 if a stairs_down follows, "
                                                   "6 with a ramp, 3 with both)")
    depth: float = Field(0.3, ge=0.2, le=0.6, description="tread depth (m), household stairs 0.25-0.30")


class CurbSeg(_Seg):
    """One step up onto a raised walkway 2.4 m long (stairs_up with count 1); ends at its edge."""
    kind: Literal["curb"]
    gap: float = _GAP
    height: Num = Field(description="curb height (m), max 0.15")


class StairsDownSeg(_Seg):
    """The same steps back down to the floor after the top landing. Needs a stairs_up or curb
    earlier in the course (only ice/wet in between): the robot starts on the ground, so "down the
    porch steps" is stairs_up then stairs_down. The landing (last riser up to first riser down) is
    1.5-3 m; ends at the last riser down."""
    kind: Literal["stairs_down"]
    gap: float | None = Field(None, ge=0.0, le=3.0, description="flat top (m) after where the previous "
                                                              "segment ended; omit for the shortest landing (1.5 m)")


class RampSeg(_Seg):
    """An uphill ramp, then a flat landing at its top: 4.8 m, or 2.4 m when the course's stairs
    use 6 steps or 3 up and down (then a drop back to the floor). Ends at the top of the ramp."""
    kind: Literal["ramp"]
    gap: float = _GAP
    angle: Num = Field(description="slope in DEGREES (0-15): wheelchair ramp 3-5, steep driveway 8-12")
    length: float = Field(ge=0.3, le=2.2, description="horizontal run (m) from the bottom to the top (max 2.2)")


class IceSeg(_Seg):
    """A low-friction patch on the ground (no height change); ends at its far edge."""
    kind: Literal["ice"]
    gap: float = _GAP
    mu: Num = Field(0.1, description="friction: ice 0.05-0.15")
    length: float = Field(gt=0.0, le=4.0, description="patch length (m)")


class WetSeg(_Seg):
    """A wet patch: lower friction than ice; ends at its far edge."""
    kind: Literal["wet"]
    gap: float = _GAP
    mu: Num = Field(0.3, description="friction: wet tile 0.25-0.4")
    length: float = Field(gt=0.0, le=4.0, description="patch length (m)")


Segment = Annotated[Union[StairsUpSeg, CurbSeg, StairsDownSeg, RampSeg, IceSeg, WetSeg], Field(discriminator="kind")]
PATCH_KINDS = ("ice", "wet")


@dataclass
class CoursePlan:
    """Where a course's segments land: the stairs/ramp slot values (fixed or [lo, hi]) and the
    low-friction patches (mu, start, length) in order."""
    slots: dict
    patches: list
    spans: list  # (kind, x_begin, x_end) per segment along the heading


def _fixed(v) -> bool:
    return not isinstance(v, (tuple, list))


def plan_course(segments) -> CoursePlan:
    """Lays the segments out along the start heading with a cursor, checks the course is
    buildable, and returns the slot values. Raises ValueError with a message meant for the LLM."""
    G = C.GO1  # terrain slot ranges are the same for every robot that has terrain
    rng = lambda name: (round(float(G.LO[G.INDEX[name]][0]), 4), round(float(G.HI[G.INDEX[name]][0]), 4))  # noqa: E731
    slots, patches, spans = {}, [], []
    cursor, state = 0.0, "ground"  # ground | top (on a raised top) | ramp (on the ramp's landing)
    flight = ramp_end = None
    for k, seg in enumerate(segments):
        where = f"segment {k} ({seg.kind})"
        gap = seg.gap if seg.gap is not None else 0.0
        b = cursor + gap
        if state == "top" and seg.kind != "stairs_down" and b > flight["top_end"] + 1e-9:
            raise ValueError(f"{where} starts {b:.2f} m ahead, past the end of the raised top (it ends "
                             f"{terrain.BOX_LENGTH} m after the last riser, at {flight['top_end']:.2f} m, and drops back "
                             f"to the floor there). Start it sooner (smaller gap) or go back down with stairs_down first.")
        if state == "ramp" and seg.kind not in PATCH_KINDS:
            raise ValueError(f"{where}: only ice or wet patches can follow a ramp (the course ends on the ramp's "
                             "top landing). Put stairs and curbs before the ramp.")
        if seg.kind in ("stairs_up", "curb"):
            if flight is not None:
                raise ValueError(f"{where}: only one stairs_up or curb per course (they share the stairs slots); "
                                 "use count for several steps")
            n = 1 if seg.kind == "curb" else int(np.floor(seg.count + 0.5))
            d = CURB_DEPTH if seg.kind == "curb" else seg.depth
            lo, hi = rng("stairs_start")
            if not lo - 1e-9 <= b <= hi + 1e-9:
                raise ValueError(f"{where}: its first riser would be {b:.2f} m from the start; stairs and curbs must "
                                 f"begin {lo}-{hi} m ahead (adjust the gaps)")
            slots.update(stairs_height=seg.height, stairs_depth=d, stairs_count=float(n), stairs_start=b)
            last = b + (n - 1) * d
            flight = {"n": n, "d": d, "height": seg.height, "last": last, "top_end": last + terrain.BOX_LENGTH}
            state, cursor = "top", last
            spans.append((seg.kind, b, last))
        elif seg.kind == "stairs_down":
            if flight is None or state != "top":
                raise ValueError(f"{where}: stairs_down needs a stairs_up or curb earlier in the course, with only "
                                 "ice or wet segments in between. The robot starts on the ground, so to go down steps "
                                 "it first goes up them (a porch or stoop: stairs_up then stairs_down)")
            n_max = robots.GO1.terrain_boxes // 2
            if flight["n"] > n_max:
                raise ValueError(f"{where}: a flight that comes back down has at most {n_max} steps each way "
                                 f"(the stairs_up has {flight['n']})")
            first = max(cursor, flight["last"] + terrain.DESCENT_BOX_LENGTH) if seg.gap is None else b
            land = first - flight["last"]
            lo, hi = rng("stairs_landing")
            if not lo - 1e-9 <= land <= hi + 1e-9:
                raise ValueError(f"{where}: the top landing (last riser up to first riser down) would be {land:.2f} m; "
                                 f"it must be {lo}-{hi} m (omit gap for the shortest)")
            slots["stairs_landing"] = float(np.clip(land, lo, hi))
            end = first + (flight["n"] - 1) * flight["d"]
            state, cursor = "ground", end
            spans.append((seg.kind, first, end))
        elif seg.kind == "ramp":
            if "ramp_angle" in slots:
                raise ValueError(f"{where}: only one ramp per course")
            a_lo, a_hi = rng("ramp_angle")
            angles = [float(v) for v in seg.angle] if not _fixed(seg.angle) else [float(seg.angle)]
            if min(angles) < terrain.MIN_ANGLE or max(angles) > a_hi + 1e-9:
                raise ValueError(f"{where}: angle must be between {terrain.MIN_ANGLE} and {a_hi:.0f} degrees "
                                 f"(got {seg.angle}); ramps steeper than ~15 degrees are unrealistic for this robot")
            z = 0.0
            if state == "top":  # the ramp rises out of the raised top at its current height
                if not (_fixed(flight["height"]) and _fixed(seg.angle)):
                    raise ValueError(f"{where}: a ramp that starts on a raised top needs a fixed angle and a fixed "
                                     "step height (no [lo, hi] ranges)")
                z = flight["n"] * float(flight["height"])
            back = z / np.tan(np.deg2rad(float(angles[0]))) if z > 0 else 0.0
            x_start, run = b - back, seg.length + back
            lo, hi = rng("ramp_start")
            if not lo - 1e-9 <= x_start <= hi + 1e-9:
                raise ValueError(f"{where}: the ramp would leave the floor {x_start:.2f} m ahead; it must be {lo}-{hi} m "
                                 "(adjust the gaps)")
            lo, hi = rng("ramp_length")
            if not lo - 1e-9 <= run <= hi + 1e-9:
                raise ValueError(f"{where}: the ramp's run from the floor would be {run:.2f} m; it must be {lo}-{hi} m")
            if flight is not None:  # a ramp takes the last two terrain boxes from the stairs
                boxes = robots.GO1.terrain_boxes - terrain.N_RAMP_BOXES
                need = flight["n"] * (2 if "stairs_landing" in slots else 1)
                if need > boxes:
                    raise ValueError(f"{where}: with a ramp in the course the stairs get {boxes} boxes: at most "
                                     f"{boxes} steps up, or {boxes // 2} up and back down (got {flight['n']})")
            slots.update(ramp_angle=seg.angle, ramp_start=x_start, ramp_length=run)
            boxes = 0 if flight is None else flight["n"] * (2 if "stairs_landing" in slots else 1)
            free = robots.GO1.terrain_boxes - terrain.N_RAMP_BOXES - boxes
            ramp_end = x_start + run + terrain.LANDING_LENGTH * (2 if free > 0 else 1)
            state, cursor = "ramp", b + seg.length
            spans.append((seg.kind, b, cursor))
        else:  # ice / wet
            if len(patches) == 2:
                raise ValueError(f"{where}: at most 2 ice/wet patches per course")
            if b > 6.0 + 1e-9:
                raise ValueError(f"{where}: patches must begin within 6 m of the start (this one begins at {b:.2f} m)")
            if state == "ramp" and b > ramp_end:
                raise ValueError(f"{where}: begins past the end of the ramp's top landing ({ramp_end:.2f} m)")
            patches.append((seg.mu, b, seg.length))
            cursor = b + seg.length
            spans.append((seg.kind, b, cursor))
    return CoursePlan(slots, patches, spans)


class Course(_Op):
    """A route along the robot's initial heading, as ordered segments (robots with terrain). Each
    segment starts `gap` m after the previous one ends (the first: after the start position):
    stairs_up/curb end at their last riser, stairs_down at its last riser down, ramp at its top,
    ice/wet at their far edge. A raised top (stairs or curb) is 2.4 m long unless stairs_down
    follows; a ramp is followed only by ice/wet on its landing. At most one stairs_up or curb, one
    stairs_down, one ramp and two ice/wet patches. Gaps, lengths, counts and depths are fixed
    numbers; height, angle and mu may be [lo, hi] ranges. Keep courses short: at 1 m/s the robot
    covers about 4.5 m in a 5 s episode. Example, "out the door, down three small steps, across an
    icy driveway, up a ramp": [{"kind": "stairs_up", "gap": 0.5, "height": 0.05, "count": 3,
    "depth": 0.25}, {"kind": "stairs_down"}, {"kind": "ice", "gap": 0.2, "mu": 0.08, "length": 1.5},
    {"kind": "ramp", "angle": 8, "length": 2}]"""
    op: Literal["course"]
    segments: list[Segment] = Field(min_length=1, max_length=6)

    @field_validator("segments")
    @classmethod
    def _buildable(cls, segments):
        plan_course(segments)
        return segments


def _robot_ops(r: robots.Robot):
    """The ops whose fields name the robot's legs and joints."""
    LEGS = Literal[tuple(r.feet)]
    JOINT = Literal[tuple(r.joint_parts)]

    class Friction(_Op):
        op: Literal["friction"]
        feet: list[LEGS] = Field(min_length=1)
        mu: Num

    class Motor(_Op):
        op: Literal["motor"]
        legs: list[LEGS] = Field(min_length=1)
        joints: list[JOINT] = Field(min_length=1)
        strength: Num

    class EncoderOffset(_Op):
        op: Literal["encoder_offset"]
        legs: list[LEGS] = Field(min_length=1)
        joints: list[JOINT] = Field(min_length=1)
        offset: Num

    ops = (Friction, IcePatch, Payload, Slope, Motor, JointFriction, Latency, Push, SensorNoise,
           EncoderOffset, ImuBias, VelocityBias, Command)
    if r.terrain_boxes:
        ops += (Stairs, Curb, Course)
    Op = Annotated[Union[ops], Field(discriminator="op")]

    class Program(BaseModel):
        model_config = ConfigDict(extra="forbid")
        name: str
        hypothesis: str
        ops: list[Op] = Field(min_length=1, max_length=6)

        @field_validator("ops")
        @classmethod
        def _at_most_two_pushes(cls, ops):
            if sum(isinstance(o, Push) for o in ops) > 2:
                raise ValueError("at most 2 push ops")
            if sum(isinstance(o, (Stairs, Curb, Course)) for o in ops) > 1:
                raise ValueError("at most 1 stairs, curb or course op (they share the stairs slots); put every "
                                 "terrain piece of a route into one course op")
            courses = [o for o in ops if isinstance(o, Course)]
            if courses:
                patches = sum(s.kind in PATCH_KINDS for s in courses[0].segments)
                if patches + sum(isinstance(o, IcePatch) for o in ops) > 2:
                    raise ValueError("at most 2 low-friction patches per program (ice_patch ops plus the course's "
                                     "ice/wet segments)")
            return ops

    return Friction, Motor, EncoderOffset, Op, Program


@dataclass
class Compiled:
    """θ(v) = base with free values v written into their slots."""
    program: BaseModel
    base: np.ndarray       # [D]
    M: np.ndarray          # [K_MAX, D] 0/1 map from free params to θ slots
    lo: np.ndarray         # [K_MAX]
    hi: np.ndarray         # [K_MAX]
    names: list[str]       # free parameter names (len = number of active params)
    layout: C.Layout = C.GO1

    width = K_MAX  # length of the u vector theta_unit expects

    @property
    def k(self) -> int:
        return len(self.names)

    def theta(self, v):
        """θ for free values v [K_MAX] (jittable; padded entries are ignored)."""
        written = self.M.sum(0) > 0
        return jp.where(written, v @ self.M, self.base)

    def theta_unit(self, u):
        """θ for u in [0, 1]^K_MAX (search space)."""
        return self.theta(self.lo + (self.hi - self.lo) * u)

    def theta_units(self, U: np.ndarray) -> np.ndarray:
        """Vectorized numpy θ for a population U [P, K_MAX] (no per-candidate JAX dispatch)."""
        V = self.lo + (self.hi - self.lo) * np.asarray(U, np.float32)
        written = self.M.sum(0) > 0
        return np.where(written, V @ self.M, self.base).astype(np.float32)

    def neutral_unit(self) -> np.ndarray:
        """u that puts every free parameter as close to neutral as its range allows."""
        u = np.zeros(K_MAX, np.float32)
        for k in range(self.k):
            slot = np.flatnonzero(self.M[k])[0]
            span = self.hi[k] - self.lo[k]
            u[k] = 0.0 if span == 0 else np.clip((self.layout.NEUTRAL[slot] - self.lo[k]) / span, 0, 1)
        return u


class Language:
    """One robot's attack language: its pydantic Program model, compiler and JSON Schema."""

    def __init__(self, robot: robots.Robot):
        self.robot = robot
        self.layout = C.layout(robot)
        self.Friction, self.Motor, self.EncoderOffset, self.Op, self.Program = _robot_ops(robot)

    def json_schema(self) -> dict:
        """JSON Schema of Program, embedded in the LLM prompt."""
        return self.Program.model_json_schema()

    def _joint_idx(self, legs, joints):
        return [self.layout.JOINTS.index(f"{leg}_{j}") for leg in legs for j in joints]

    def compile_program(self, program) -> Compiled:
        L = self.layout
        if isinstance(program, str):
            program = self.Program.model_validate_json(program)
        elif isinstance(program, dict):
            program = self.Program.model_validate(program)
        elif not isinstance(program, self.Program):
            program = self.Program.model_validate(program.model_dump())

        base = L.neutral()
        rows, lo, hi, names = [], [], [], []

        def put(slot_name: str, offsets: list[int], value: Num, label: str):
            s = L.INDEX[slot_name]
            idx = [s.start + o for o in offsets]
            env_lo, env_hi = L.LO[idx].min(), L.HI[idx].max()
            if isinstance(value, (tuple, list)):
                a, b = sorted(float(x) for x in value)
                a, b = float(np.clip(a, env_lo, env_hi)), float(np.clip(b, env_lo, env_hi))
                row = np.zeros(C.D, np.float32)
                row[idx] = 1.0
                rows.append(row), lo.append(a), hi.append(b), names.append(label)
                base[idx] = a  # placeholder; overwritten by the free value
            else:
                base[idx] = float(np.clip(value, env_lo, env_hi))

        pushes = 0
        for i, op in enumerate(program.ops):
            tag = f"{i}.{op.op}"
            match op.op:
                case "friction":
                    put("foot_friction", [L.FEET.index(f) for f in op.feet], op.mu, f"{tag}.mu")
                case "ice_patch":
                    put("ice_mu", [0], op.mu, f"{tag}.mu")
                    put("ice_start", [0], op.start, f"{tag}.start")
                    put("ice_length", [0], op.length, f"{tag}.length")
                case "payload":
                    put("payload_mass", [0], op.mass, f"{tag}.mass")
                    for j, ax in enumerate("xyz"):
                        put("payload_offset", [j], getattr(op, f"offset_{ax}"), f"{tag}.offset_{ax}")
                case "slope":
                    put("slope", [0], op.pitch, f"{tag}.pitch")
                    put("slope", [1], op.roll, f"{tag}.roll")
                case "motor":
                    put("motor_strength", self._joint_idx(op.legs, op.joints), op.strength, f"{tag}.strength")
                case "joint_friction":
                    put("joint_friction", [0], op.scale, f"{tag}.scale")
                case "latency":
                    put("latency", [0], op.steps, f"{tag}.steps")
                case "push":
                    pushes += 1
                    p = f"push{pushes}"
                    for j, ax in enumerate("xyz"):
                        put(f"{p}_force", [j], getattr(op, f"force_{ax}"), f"{tag}.force_{ax}")
                    put(f"{p}_start", [0], op.start, f"{tag}.start")
                    put(f"{p}_duration", [0], op.duration, f"{tag}.duration")
                case "sensor_noise":
                    put("obs_noise", [0], op.std, f"{tag}.std")
                case "encoder_offset":
                    put("joint_offset", self._joint_idx(op.legs, op.joints), op.offset, f"{tag}.offset")
                case "imu_bias":
                    put("imu_bias", [0], op.roll, f"{tag}.roll")
                    put("imu_bias", [1], op.pitch, f"{tag}.pitch")
                case "velocity_bias":
                    for j, ax in enumerate("xyz"):
                        put("linvel_bias", [j], getattr(op, ax), f"{tag}.{ax}")
                case "course":
                    self._compile_course(op, tag, put, any(o.op == "ice_patch" for o in program.ops))
                case "stairs" | "curb":
                    put("stairs_height", [0], op.height, f"{tag}.height")
                    put("stairs_depth", [0], op.depth if op.op == "stairs" else CURB_DEPTH, f"{tag}.depth")
                    put("stairs_count", [0], op.count if op.op == "stairs" else 1.0, f"{tag}.count")
                    put("stairs_start", [0], op.start, f"{tag}.start")
                case "command":
                    base[L.INDEX["command_mode"]] = 1.0
                    b = op.b if op.b is not None else op.a
                    for j in range(3):
                        put("command_a", [j], op.a[j], f"{tag}.a{j}")
                        put("command_b", [j], b[j], f"{tag}.b{j}")
                    put("command_switch", [0], op.switch, f"{tag}.switch")

        if len(names) > K_MAX:
            raise ValueError(f"{len(names)} free parameters; at most {K_MAX} allowed")
        pad = K_MAX - len(names)
        M = np.vstack(rows + [np.zeros((pad, C.D), np.float32)]) if rows else np.zeros((K_MAX, C.D), np.float32)
        if (M.sum(0) > 1).any():
            clash = [s.name for s in L.SLOTS if (M.sum(0)[L.INDEX[s.name]] > 1).any()]
            raise ValueError(f"two searched parameters target the same slot: {clash}")
        lo_a = np.array(lo + [0.0] * pad, np.float32)
        hi_a = np.array(hi + [0.0] * pad, np.float32)
        return Compiled(program, base.astype(np.float32), M, lo_a, hi_a, names, L)


    def _compile_course(self, op, tag: str, put, ice_taken: bool):
        """Writes a course's slots (perturb/terrain.py geometry) through `put`. Its first ice/wet
        patch uses the ice_* slots unless the program also has an ice_patch op; the next one uses
        the second patch's slots (stored as ice2_slip = 1 - mu)."""
        plan = plan_course(op.segments)
        label = {}
        for k, seg in enumerate(op.segments):
            for f in ("height", "angle"):
                if hasattr(seg, f):
                    label[f] = f"{tag}.{k}.{seg.kind}.{f}"
        names = {"stairs_height": label.get("height"), "ramp_angle": label.get("angle")}
        for slot, value in plan.slots.items():
            put(slot, [0], value, names.get(slot) or f"{tag}.{slot}")
        patch_slots = ["ice2"] if ice_taken else ["ice", "ice2"]
        patch_segs = [k for k, s in enumerate(op.segments) if s.kind in PATCH_KINDS]
        for (mu, start, length), which, k in zip(plan.patches, patch_slots, patch_segs):
            name = f"{tag}.{k}.{op.segments[k].kind}.mu"
            if which == "ice":
                put("ice_mu", [0], mu, name)
            else:  # 1 - mu: a range [a, b] of mu is the range [1 - b, 1 - a] of slip
                put("ice2_slip", [0], 1.0 - float(mu) if _fixed(mu) else (1.0 - float(mu[1]), 1.0 - float(mu[0])),
                    name)
            put(f"{which}_start", [0], start, f"{tag}.{k}.start")
            put(f"{which}_length", [0], length, f"{tag}.{k}.length")


def language(robot: "str | robots.Robot" = "go1") -> Language:
    return _language(robots.get(robot).name)


@cache
def _language(name: str) -> Language:
    return Language(robots.get(name))


# Go1's language as module-level names (the original API).
GO1 = language("go1")
Friction, Motor, EncoderOffset, Op, Program = GO1.Friction, GO1.Motor, GO1.EncoderOffset, GO1.Op, GO1.Program
LEGS = Literal["FR", "FL", "RR", "RL"]
JOINT = Literal["hip", "thigh", "calf"]


def compile_program(program, robot: "str | robots.Robot" = "go1") -> Compiled:
    return language(robot).compile_program(program)


def json_schema(robot: "str | robots.Robot" = "go1") -> dict:
    """JSON Schema of Program, embedded in the LLM prompt."""
    return language(robot).json_schema()
