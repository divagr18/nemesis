"""Attack programs: the JSON language Nemesis's LLM writes, compiled to θ.

A program is a hypothesis plus a list of ops. Every numeric field is either a fixed number or
a free range [lo, hi] that the optimizer searches. Compiling yields a base θ and a fixed-size
map from free parameters to θ slots, so search over any program reuses one jitted rollout.

    {"name": "rear slip on turn",
     "hypothesis": "the gait relies on rear-foot grip when the yaw command flips",
     "ops": [{"op": "friction", "feet": ["RR", "RL"], "mu": [0.1, 0.5]},
             {"op": "command", "a": [0.8, 0, 0], "b": [0.8, 0, [-1.2, 1.2]], "switch": [1, 4]}]}
"""

from dataclasses import dataclass
from typing import Annotated, Literal, Union

import jax.numpy as jp
import numpy as np
from pydantic import BaseModel, ConfigDict, Field, field_validator

from nemesis.perturb import canonical as C

K_MAX = 10  # max free parameters per program (padded, so search compiles once)

Num = Union[float, tuple[float, float]]  # fixed value, or [lo, hi] to search
LEGS = Literal["FR", "FL", "RR", "RL"]
JOINT = Literal["hip", "thigh", "calf"]


class _Op(BaseModel):
    model_config = ConfigDict(extra="forbid")


class Friction(_Op):
    op: Literal["friction"]
    feet: list[LEGS] = Field(min_length=1)
    mu: Num


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


class Motor(_Op):
    op: Literal["motor"]
    legs: list[LEGS] = Field(min_length=1)
    joints: list[JOINT] = Field(min_length=1)
    strength: Num


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


class EncoderOffset(_Op):
    op: Literal["encoder_offset"]
    legs: list[LEGS] = Field(min_length=1)
    joints: list[JOINT] = Field(min_length=1)
    offset: Num


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


Op = Annotated[Union[Friction, IcePatch, Payload, Slope, Motor, JointFriction, Latency, Push,
                     SensorNoise, EncoderOffset, ImuBias, VelocityBias, Command],
               Field(discriminator="op")]


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
        return ops


@dataclass
class Compiled:
    """θ(v) = base with free values v written into their slots."""
    program: Program
    base: np.ndarray       # [D]
    M: np.ndarray          # [K_MAX, D] 0/1 map from free params to θ slots
    lo: np.ndarray         # [K_MAX]
    hi: np.ndarray         # [K_MAX]
    names: list[str]       # free parameter names (len = number of active params)

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
            u[k] = 0.0 if span == 0 else np.clip((C.NEUTRAL[slot] - self.lo[k]) / span, 0, 1)
        return u


def _joint_idx(legs, joints):
    return [C.JOINTS.index(f"{leg}_{j}") for leg in legs for j in joints]


def compile_program(program: Program | dict | str) -> Compiled:
    if isinstance(program, str):
        program = Program.model_validate_json(program)
    elif isinstance(program, dict):
        program = Program.model_validate(program)

    base = C.neutral()
    rows, lo, hi, names = [], [], [], []

    def put(slot_name: str, offsets: list[int], value: Num, label: str):
        s = C.INDEX[slot_name]
        idx = [s.start + o for o in offsets]
        env_lo, env_hi = C.LO[idx].min(), C.HI[idx].max()
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
        match op:
            case Friction():
                put("foot_friction", [C.FEET.index(f) for f in op.feet], op.mu, f"{tag}.mu")
            case IcePatch():
                put("ice_mu", [0], op.mu, f"{tag}.mu")
                put("ice_start", [0], op.start, f"{tag}.start")
                put("ice_length", [0], op.length, f"{tag}.length")
            case Payload():
                put("payload_mass", [0], op.mass, f"{tag}.mass")
                for j, ax in enumerate("xyz"):
                    put("payload_offset", [j], getattr(op, f"offset_{ax}"), f"{tag}.offset_{ax}")
            case Slope():
                put("slope", [0], op.pitch, f"{tag}.pitch")
                put("slope", [1], op.roll, f"{tag}.roll")
            case Motor():
                put("motor_strength", _joint_idx(op.legs, op.joints), op.strength, f"{tag}.strength")
            case JointFriction():
                put("joint_friction", [0], op.scale, f"{tag}.scale")
            case Latency():
                put("latency", [0], op.steps, f"{tag}.steps")
            case Push():
                pushes += 1
                p = f"push{pushes}"
                for j, ax in enumerate("xyz"):
                    put(f"{p}_force", [j], getattr(op, f"force_{ax}"), f"{tag}.force_{ax}")
                put(f"{p}_start", [0], op.start, f"{tag}.start")
                put(f"{p}_duration", [0], op.duration, f"{tag}.duration")
            case SensorNoise():
                put("obs_noise", [0], op.std, f"{tag}.std")
            case EncoderOffset():
                put("joint_offset", _joint_idx(op.legs, op.joints), op.offset, f"{tag}.offset")
            case ImuBias():
                put("imu_bias", [0], op.roll, f"{tag}.roll")
                put("imu_bias", [1], op.pitch, f"{tag}.pitch")
            case VelocityBias():
                for j, ax in enumerate("xyz"):
                    put("linvel_bias", [j], getattr(op, ax), f"{tag}.{ax}")
            case Command():
                base[C.INDEX["command_mode"]] = 1.0
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
        clash = [s.name for s in C.SLOTS if (M.sum(0)[C.INDEX[s.name]] > 1).any()]
        raise ValueError(f"two searched parameters target the same slot: {clash}")
    lo_a = np.array(lo + [0.0] * pad, np.float32)
    hi_a = np.array(hi + [0.0] * pad, np.float32)
    return Compiled(program, base.astype(np.float32), M, lo_a, hi_a, names)


def json_schema() -> dict:
    """JSON Schema of Program, embedded in the LLM prompt."""
    return Program.model_json_schema()
