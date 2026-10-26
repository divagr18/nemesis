"""The canonical perturbation vector θ.

Every perturbation program compiles to one fixed-length float vector, so the MJX
rollout is jitted once and reused by search, training, evaluation and the demo.
Unused slots hold neutral values, under which the simulation is unchanged.
"""

from dataclasses import dataclass

import numpy as np

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


FEET = ("FR", "FL", "RR", "RL")
JOINTS = tuple(f"{leg}_{j}" for leg in FEET for j in ("hip", "thigh", "calf"))
CMD_LO, CMD_HI = (-1.5, -0.8, -1.2), (1.5, 0.8, 1.2)  # Joystick's command amplitudes

SLOTS = (
    # Contact and body
    Slot("foot_friction", 4, 1.0, 0.05, 1.5, "mu", "effective contact friction per foot (FR FL RR RL); ice 0.05-0.15, wet tile 0.25-0.4, wood 0.5-0.7, concrete 0.7-1.0"),
    Slot("ice_mu", 1, 1.0, 0.05, 1.0, "mu", "friction inside the ice patch"),
    Slot("ice_start", 1, 0.0, 0.0, 6.0, "m", "distance along the initial heading where the ice patch begins"),
    Slot("ice_length", 1, 0.0, 0.0, 4.0, "m", "ice patch length (0 = no patch)"),
    Slot("payload_mass", 1, 0.0, 0.0, 5.0, "kg", "mass strapped to the trunk (Go1 is ~12 kg; 5 kg is its spec limit)"),
    Slot("payload_offset", 3, 0.0, (-0.1, -0.06, -0.05), (0.1, 0.06, 0.1), "m", "payload position relative to trunk CoM (x fwd, y left, z up)"),
    Slot("slope", 2, 0.0, -0.3, 0.3, "rad", "ground incline (pitch, roll); +pitch = uphill when walking forward"),
    # Actuation
    Slot("motor_strength", 12, 1.0, 0.3, 1.0, "x", "Kp and torque-limit scale per motor, order " + " ".join(JOINTS)),
    Slot("joint_friction", 1, 1.0, 1.0, 4.0, "x", "joint frictionloss scale (stiff/worn joints)"),
    Slot("latency", 1, 0.0, 0.0, 2.0, "steps", "action delay in 20 ms control steps (rounded)"),
    # External forces
    Slot("push1_force", 3, 0.0, -150.0, 150.0, "N", "world-frame force on the trunk; 60-120 N for 0.1 s is a strong shove"),
    Slot("push1_start", 1, 0.0, 0.0, 20.0, "s", "push start time within the episode"),
    Slot("push1_duration", 1, 0.0, 0.0, 0.5, "s", "push duration (0 = no push)"),
    Slot("push2_force", 3, 0.0, -150.0, 150.0, "N", "second push, world frame"),
    Slot("push2_start", 1, 0.0, 0.0, 20.0, "s", "second push start"),
    Slot("push2_duration", 1, 0.0, 0.0, 0.5, "s", "second push duration"),
    # Sensing
    Slot("obs_noise", 1, 0.0, 0.0, 0.3, "std", "extra Gaussian noise on proprioception"),
    Slot("joint_offset", 12, 0.0, -0.05, 0.05, "rad", "encoder zero offset per joint"),
    Slot("imu_bias", 2, 0.0, -0.08, 0.08, "rad", "IMU tilt bias (roll, pitch) in the gravity reading"),
    Slot("linvel_bias", 3, 0.0, -0.3, 0.3, "m/s", "bias on the body linear-velocity estimate"),
    # Command profile
    Slot("command_mode", 1, 0.0, 0.0, 1.0, "flag", "1 = override the joystick with the profile below"),
    Slot("command_a", 3, 0.0, CMD_LO, CMD_HI, "m/s,m/s,rad/s", "command (vx, vy, yaw rate) before the switch"),
    Slot("command_b", 3, 0.0, CMD_LO, CMD_HI, "m/s,m/s,rad/s", "command after the switch"),
    Slot("command_switch", 1, 20.0, 0.0, 20.0, "s", "time of the switch from command_a to command_b"),
)

MAX_LATENCY = 2


def _layout():
    idx, off = {}, 0
    for s in SLOTS:
        idx[s.name] = slice(off, off + s.size)
        off += s.size
    assert off <= D, f"θ layout needs {off} > {D} slots"
    return idx, off


INDEX, USED = _layout()
SLOT = {s.name: s for s in SLOTS}


def _fill(attr: str, pad: float) -> np.ndarray:
    v = np.full(D, pad, dtype=np.float32)
    for s in SLOTS:
        v[INDEX[s.name]] = getattr(s, attr)
    return v


NEUTRAL = _fill("neutral", 0.0)
LO = _fill("lo", 0.0)
HI = _fill("hi", 0.0)
SPAN = np.where(HI > LO, HI - LO, 1.0)


def neutral() -> np.ndarray:
    return NEUTRAL.copy()


def clip(theta: np.ndarray) -> np.ndarray:
    return np.clip(theta, LO, HI)


def normalized(theta):
    """θ scaled to [-1, 1] over the envelope (critic input)."""
    return 2.0 * (theta - LO) / SPAN - 1.0


def describe(theta: np.ndarray, atol: float = 1e-6) -> dict:
    """Non-neutral slots as {name: values}, for logs and the demo UI."""
    out = {}
    for s in SLOTS:
        v = np.asarray(theta[INDEX[s.name]])
        if not np.allclose(v, NEUTRAL[INDEX[s.name]], atol=atol):
            out[s.name] = v.round(3).tolist() if s.size > 1 else round(float(v[0]), 3)
    return out
