"""The canonical perturbation vector θ.

Every perturbation program compiles to one fixed-length float vector, so the MJX
rollout is jitted once and reused by search, training, evaluation and the demo.
Unused slots hold neutral values, under which the simulation is unchanged.

Each robot has its own Layout (same slot names; foot, joint and envelope sizes follow the robot),
padded to the same length D. The module-level names (SLOTS, INDEX, NEUTRAL, ...) are Go1's layout.
"""

from dataclasses import dataclass
from functools import cache

import numpy as np

from nemesis import robots

D = 80  # padded length; bump THETA_LAYOUT_VERSION in config if slots change


@dataclass(frozen=True)
class Slot:
    name: str
    size: int
    neutral: float | tuple
    lo: float | tuple
    hi: float | tuple
    unit: str
    doc: str
    # The neutral value is an "off" marker outside [lo, hi] (stairs_depth, stairs_start: 0, the
    # padding value, so θ vectors from before the slot existed stay neutral). The slot only matters
    # when another slot switches the feature on, so it is never a deviation from nominal.
    neutral_off: bool = False


def _slots(r: robots.Robot) -> tuple:
    nf, nj = len(r.feet), len(r.joints)
    cmd_lo, cmd_hi = r.command_lo, r.command_hi
    friction_doc = f"contact friction per foot ({' '.join(r.feet)}); ice 0.05-0.15, wet tile 0.25-0.4, wood 0.5-0.7"
    if r.foot_friction_cap is not None:
        cap = r.foot_friction_cap
        friction_doc += f"; nominal (and maximum) contact friction is {cap}, so values above {cap} have no effect"
    else:
        friction_doc += ", concrete 0.7-1.0"
    return (
        # Contact and body
        Slot("foot_friction", nf, r.nominal_friction, 0.05, 1.5, "mu", friction_doc),
        Slot("ice_mu", 1, 1.0, 0.05, 1.0, "mu", "friction inside the ice patch"),
        Slot("ice_start", 1, 0.0, 0.0, 6.0, "m", "distance along the initial heading where the ice patch begins"),
        Slot("ice_length", 1, 0.0, 0.0, 4.0, "m", "ice patch length (0 = no patch)"),
        Slot("payload_mass", 1, 0.0, 0.0, r.payload_max, "kg", f"mass strapped to the trunk ({r.payload_note})"),
        Slot("payload_offset", 3, 0.0, r.payload_lo, r.payload_hi, "m", "payload position relative to trunk CoM (x fwd, y left, z up)"),
        Slot("slope", 2, 0.0, -0.3, 0.3, "rad", "ground incline (pitch, roll); +pitch = uphill when walking forward"),
        # Actuation
        Slot("motor_strength", nj, 1.0, 0.3, 1.0, "x", "Kp and torque-limit scale per motor, order " + " ".join(r.joints)),
        Slot("joint_friction", 1, 1.0, 1.0, 4.0, "x", "joint frictionloss scale (stiff/worn joints)"),
        Slot("latency", 1, 0.0, 0.0, 2.0, "steps", "action delay in 20 ms control steps (rounded)"),
        # External forces
        Slot("push1_force", 3, 0.0, -r.push_max, r.push_max, "N", f"force on the trunk in the start-heading frame (x = initial forward, y = left, z = up); {r.push_note}"),
        Slot("push1_start", 1, 0.0, 0.0, 20.0, "s", "push start time within the episode"),
        Slot("push1_duration", 1, 0.0, 0.0, 0.5, "s", "push duration (0 = no push)"),
        Slot("push2_force", 3, 0.0, -r.push_max, r.push_max, "N", "second push, start-heading frame (x = initial forward, y = left)"),
        Slot("push2_start", 1, 0.0, 0.0, 20.0, "s", "second push start"),
        Slot("push2_duration", 1, 0.0, 0.0, 0.5, "s", "second push duration"),
        # Sensing
        Slot("obs_noise", 1, 0.0, 0.0, 0.3, "std", "extra Gaussian noise on proprioception"),
        Slot("joint_offset", nj, 0.0, -0.05, 0.05, "rad", "encoder zero offset per joint"),
        Slot("imu_bias", 2, 0.0, -0.08, 0.08, "rad", "IMU tilt bias (roll, pitch) in the gravity reading"),
        Slot("linvel_bias", 3, 0.0, -0.3, 0.3, "m/s", "bias on the body linear-velocity estimate"),
        # Command profile
        Slot("command_mode", 1, 0.0, 0.0, 1.0, "flag", "1 = override the joystick with the profile below"),
        Slot("command_a", 3, 0.0, cmd_lo, cmd_hi, "m/s,m/s,rad/s", "command (vx, vy, yaw rate) before the switch"),
        Slot("command_b", 3, 0.0, cmd_lo, cmd_hi, "m/s,m/s,rad/s", "command after the switch"),
        Slot("command_switch", 1, 20.0, 0.0, 20.0, "s", "time of the switch from command_a to command_b"),
    ) + (_terrain_slots(r) if r.terrain_boxes else ())


def _terrain_slots(r: robots.Robot) -> tuple:
    """Stairs and curbs, appended after the original slots (whose indices stay put). Neutral is 0
    everywhere, the padding value, so every older θ means flat ground."""
    hip = r.hip_height
    return (
        Slot("stairs_height", 1, 0.0, 0.0, 0.15, "m",
             f"height of each step's riser (0 = flat ground, no steps). Door threshold 0.02-0.03, "
             f"low step or curb 0.10-0.15; household stair risers (0.15-0.18) are beyond this robot, "
             f"whose hip is ~{hip} m high"),
        Slot("stairs_depth", 1, 0.0, 0.2, 0.6, "m",
             "tread depth of each step along the walking direction (household stairs 0.25-0.30)",
             neutral_off=True),
        Slot("stairs_count", 1, 0.0, 0.0, 8.0, "steps",
             "number of steps, rounded to an integer (0 = none, 1 = a curb); the top step is a "
             "landing 2.4 m deep"),
        Slot("stairs_start", 1, 0.0, 0.5, 3.0, "m",
             "distance from the start position, along the initial heading, to the first riser; the "
             "steps are 3 m wide, centred on the start position, and rise away from the robot",
             neutral_off=True),
    ) + _course_slots(r)


def _course_slots(r: robots.Robot) -> tuple:
    """The course (layout v3, Oct 28): a ramp, a flight that comes back down, a second ice patch.
    Appended after the stairs slots. Neutral is 0 everywhere, the padding value (start, length and
    landing have an "off" 0 outside their range), so every older θ has none of them. Written by
    the DSL's `course` op, which places them along the heading."""
    hip = r.hip_height
    return (
        Slot("ramp_angle", 1, 0.0, 0.0, 15.0, "deg",
             f"uphill ramp across the path, in DEGREES (0 = no ramp). Wheelchair ramp 3-5, steep "
             f"driveway or loading ramp 8-12; beyond ~15 is unrealistic for this robot (hip ~{hip} m). "
             f"After the ramp comes a flat 2.4 m landing at its top height. Set with the course op"),
        Slot("ramp_start", 1, 0.0, 0.5, 6.0, "m",
             "distance along the initial heading where the ramp leaves the floor", neutral_off=True),
        Slot("ramp_length", 1, 0.0, 0.5, 2.2, "m",
             "horizontal run of the ramp, from the floor to its top (rise = run * tan(angle))",
             neutral_off=True),
        Slot("stairs_landing", 1, 0.0, 1.5, 3.0, "m",
             "0 = the stairs only go up; otherwise the top of the flight is a landing this long "
             "(from the last riser up) and the same steps go back down to the floor (at most 4 "
             "steps each way). Set with the course op (stairs_up then stairs_down)",
             neutral_off=True),
        Slot("ice2_slip", 1, 0.0, 0.0, 0.95, "1-mu",
             "a second low-friction patch: its friction is 1 - ice2_slip (ice mu 0.05-0.15 = slip "
             "0.85-0.95, wet tile mu 0.25-0.4 = slip 0.6-0.75; slip below 0.4 has no effect). "
             "Stored as 1 - mu so 0 = no patch; set with the course op (ice/wet segments)"),
        Slot("ice2_start", 1, 0.0, 0.0, 6.0, "m",
             "distance along the initial heading where the second patch begins"),
        Slot("ice2_length", 1, 0.0, 0.0, 4.0, "m", "second patch length (0 = no patch)"),
    )


class Layout:
    """θ layout of one robot: slots, their index ranges in the padded vector, and the envelope."""

    D = D

    def __init__(self, robot: robots.Robot):
        self.robot = robot
        self.FEET, self.JOINTS = robot.feet, robot.joints
        self.SLOTS = _slots(robot)
        self.INDEX, off = {}, 0
        for s in self.SLOTS:
            self.INDEX[s.name] = slice(off, off + s.size)
            off += s.size
        assert off <= D, f"θ layout needs {off} > {D} slots"
        self.USED = off
        self.SLOT = {s.name: s for s in self.SLOTS}
        self.NEUTRAL = self._fill("neutral", 0.0)
        self.LO = self._fill("lo", 0.0)
        self.HI = self._fill("hi", 0.0)
        self.SPAN = np.where(self.HI > self.LO, self.HI - self.LO, 1.0)
        off = np.zeros(D, bool)
        for s in self.SLOTS:
            off[self.INDEX[s.name]] = s.neutral_off
        self.NEUTRAL_OFF = off
        # normalized() reads an "off" neutral as the bottom of the range (-1, as the padding read
        # before the slot existed), so the critic's θ input is unchanged for older θ vectors.
        self._off_shift = np.where(off, self.LO - self.NEUTRAL, 0.0).astype(np.float32)

    def _fill(self, attr: str, pad: float) -> np.ndarray:
        v = np.full(D, pad, dtype=np.float32)
        for s in self.SLOTS:
            v[self.INDEX[s.name]] = getattr(s, attr)
        return v

    def neutral(self) -> np.ndarray:
        return self.NEUTRAL.copy()

    def clip(self, theta: np.ndarray) -> np.ndarray:
        """θ clipped to the envelope; "off" neutral values (outside it by design) are kept."""
        theta = np.asarray(theta)
        return np.where(self.NEUTRAL_OFF & (theta == self.NEUTRAL), theta, np.clip(theta, self.LO, self.HI))

    def normalized(self, theta):
        """θ scaled to [-1, 1] over the envelope (critic input; numpy or JAX)."""
        theta = theta + (theta == self.NEUTRAL) * self._off_shift
        return 2.0 * (theta - self.LO) / self.SPAN - 1.0

    def describe(self, theta: np.ndarray, atol: float = 1e-6) -> dict:
        """Non-neutral slots as {name: values}, for logs and the demo UI."""
        out = {}
        for s in self.SLOTS:
            v = np.asarray(theta[self.INDEX[s.name]])
            if not np.allclose(v, self.NEUTRAL[self.INDEX[s.name]], atol=atol):
                out[s.name] = v.round(3).tolist() if s.size > 1 else round(float(v[0]), 3)
        return out


def layout(robot: "str | robots.Robot" = "go1") -> Layout:
    return _layout(robots.get(robot).name)


@cache
def _layout(name: str) -> Layout:
    return Layout(robots.get(name))


MAX_LATENCY = 2

# Go1's layout as module-level names (the original API; existing checkpoints and atlases use it).
GO1 = layout("go1")
FEET, JOINTS = GO1.FEET, GO1.JOINTS
CMD_LO, CMD_HI = robots.GO1.command_lo, robots.GO1.command_hi  # Joystick's command amplitudes
SLOTS, INDEX, USED, SLOT = GO1.SLOTS, GO1.INDEX, GO1.USED, GO1.SLOT
NEUTRAL, LO, HI, SPAN = GO1.NEUTRAL, GO1.LO, GO1.HI, GO1.SPAN
neutral, clip, normalized, describe = GO1.neutral, GO1.clip, GO1.normalized, GO1.describe
