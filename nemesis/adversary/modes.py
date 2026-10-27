"""Failure-mode signatures, for counting distinct failures (the discovery curve).

A mode combines how the robot fell (behavior: fall direction from the trunk-frame gravity at
the fall) with what caused it (the perturbation family with the largest normalized deviation
from nominal). Two failures share a mode only if they fall the same way for the same kind of
reason, e.g. ("forward", "friction") vs ("left", "push").
"""

import numpy as np

from nemesis.perturb import canonical as C

FAMILIES = {
    "friction": ("foot_friction", "ice_mu", "ice_start", "ice_length"),
    "load": ("payload_mass", "payload_offset"),
    "slope": ("slope",),
    "actuation": ("motor_strength", "joint_friction"),
    "push": ("push1_force", "push1_start", "push1_duration", "push2_force", "push2_start", "push2_duration"),
    "timing": ("latency",),
    "sensing": ("obs_noise", "joint_offset", "imu_bias", "linvel_bias"),
}
DIRECTIONS = ("forward", "backward", "left", "right")
OP_FAMILY = {"friction": "friction", "ice_patch": "friction", "payload": "load", "slope": "slope",
             "motor": "actuation", "joint_friction": "actuation", "push": "push", "latency": "timing",
             "sensor_noise": "sensing", "encoder_offset": "sensing", "imu_bias": "sensing",
             "velocity_bias": "sensing", "command": None}


def allowed_slots(families, L=C.GO1) -> set[str]:
    """θ slot names an adversary restricted to `families` may perturb (the command profile, i.e.
    the task, is always allowed). families=None means everything. `L` is the robot's θ layout."""
    if families is None:
        return {s.name for s in L.SLOTS}
    keep = {"command_mode", "command_a", "command_b", "command_switch"}
    for f in families:
        keep |= set(FAMILIES[f])
    return keep


def cause_family(theta: np.ndarray, L=C.GO1) -> str:
    dev = np.abs(np.asarray(theta) - L.NEUTRAL) / L.SPAN
    scores = {fam: max(dev[L.INDEX[s]].max() for s in slots) for fam, slots in FAMILIES.items()}
    fam, score = max(scores.items(), key=lambda kv: kv[1])
    return fam if score > 1e-6 else "command"  # only the command profile was changed


def fall_direction(fall_gravity: np.ndarray) -> str:
    """Trunk-frame gravity at the fall: +x nose down (forward), -x backward, ±y roll."""
    g = np.asarray(fall_gravity).reshape(-1, 3).mean(0)
    if abs(g[0]) >= abs(g[1]):
        return "forward" if g[0] > 0 else "backward"
    return "right" if g[1] > 0 else "left"


def signature(theta: np.ndarray, eval_result: dict, row: int, L=C.GO1) -> tuple[str, str]:
    """Mode of θ given its evaluation row (only the seeds where the robot fell count)."""
    fell = eval_result["fell"][row].astype(bool)
    g = eval_result["fall_gravity"][row][fell] if fell.any() else eval_result["fall_gravity"][row]
    return fall_direction(g), cause_family(theta, L)
