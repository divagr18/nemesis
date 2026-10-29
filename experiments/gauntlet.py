"""Build the locked evaluation gauntlet (run once; the result is committed with its hash).

Three independent parts, none produced by any adversary under test:
  hand      the G2 attack programs at 4 severities (32)
  realistic 20 hand-authored, physically realistic scenarios (fixed values, no search)
  sobol     256 Sobol points over the half-width envelope (w=0.5), forward-walking task varied

usage: python experiments/gauntlet.py   ->  experiments/gauntlet.npz + printed SHA-256
"""

import hashlib
import json
import sys
from pathlib import Path

import numpy as np
from scipy.stats import qmc

sys.path.insert(0, str(Path(__file__).parent))
from finetune import held_out_thetas  # noqa: E402

from nemesis.adversary.baselines import envelope  # noqa: E402
from nemesis.perturb import canonical as C  # noqa: E402
from nemesis.perturb.dsl import compile_program  # noqa: E402

FWD = {"op": "command", "a": [1.0, 0, 0]}
REALISTIC = [
    ("wet tile at walking speed", [FWD, {"op": "friction", "feet": ["FR", "FL", "RR", "RL"], "mu": 0.3}]),
    ("polished wood, brisk walk", [{"op": "command", "a": [1.4, 0, 0]}, {"op": "friction", "feet": ["FR", "FL", "RR", "RL"], "mu": 0.5}]),
    ("ice patch 1 m ahead", [FWD, {"op": "ice_patch", "mu": 0.1, "start": 1.0, "length": 1.5}]),
    ("3 kg backpack", [FWD, {"op": "payload", "mass": 3.0, "offset_z": 0.06}]),
    ("4 kg load hanging off the back", [FWD, {"op": "payload", "mass": 4.0, "offset_x": -0.09, "offset_z": 0.05}]),
    ("10 degree ramp up", [FWD, {"op": "slope", "pitch": 0.17}]),
    ("10 degree ramp down", [FWD, {"op": "slope", "pitch": -0.17}]),
    ("side slope 8 degrees", [FWD, {"op": "slope", "roll": 0.14}]),
    ("hot motors, 70% torque", [FWD, {"op": "motor", "legs": ["FR", "FL", "RR", "RL"], "joints": ["hip", "thigh", "calf"], "strength": 0.7}]),
    ("one worn knee motor", [FWD, {"op": "motor", "legs": ["RL"], "joints": ["calf"], "strength": 0.45}]),
    ("stiff joints in the cold", [FWD, {"op": "joint_friction", "scale": 3.0}]),
    ("20 ms control latency", [FWD, {"op": "latency", "steps": 1}]),
    ("noisy IMU and encoders", [FWD, {"op": "sensor_noise", "std": 0.12}]),
    ("miscalibrated encoders", [FWD, {"op": "encoder_offset", "legs": ["FR", "RR"], "joints": ["thigh"], "offset": 0.04}]),
    ("IMU mounted 3 degrees off", [FWD, {"op": "imu_bias", "roll": 0.05, "pitch": 0.03}]),
    ("velocity estimate drifting", [FWD, {"op": "velocity_bias", "x": 0.2, "y": 0.1}]),
    ("shoulder bump from the side", [FWD, {"op": "push", "force_y": 90, "start": 2.0, "duration": 0.15}]),
    ("shoved from behind", [FWD, {"op": "push", "force_x": 100, "start": 1.5, "duration": 0.15}]),
    ("stop and reverse", [{"op": "command", "a": [1.0, 0, 0], "b": [-0.8, 0, 0], "switch": 2.0}]),
    ("sharp turn on wet floor", [{"op": "command", "a": [0.8, 0, 1.0]}, {"op": "friction", "feet": ["FR", "FL", "RR", "RL"], "mu": 0.35}]),
]


# The humanoid's regression set for Patch (server/patch_worker.py): REALISTIC at G1 scale (33 kg,
# 0.8 m/s; shoves the baseline survives, F7 notes). Compiled on demand, not part of the locked file.
G1_FWD = {"op": "command", "a": [0.8, 0, 0]}
G1_LEGS = ["L", "R"]
HUMANOID = [
    ("wet tile at walking speed", [G1_FWD, {"op": "friction", "feet": G1_LEGS, "mu": 0.3}]),
    ("polished wood, brisk walk", [{"op": "command", "a": [1.0, 0, 0]}, {"op": "friction", "feet": G1_LEGS, "mu": 0.5}]),
    ("ice patch 1 m ahead", [G1_FWD, {"op": "ice_patch", "mu": 0.1, "start": 1.0, "length": 1.5}]),
    ("5 kg backpack", [G1_FWD, {"op": "payload", "mass": 5.0, "offset_x": -0.1, "offset_z": 0.15}]),
    ("4 kg carried in front", [G1_FWD, {"op": "payload", "mass": 4.0, "offset_x": 0.12, "offset_z": 0.1}]),
    ("10 degree ramp up", [G1_FWD, {"op": "slope", "pitch": 0.17}]),
    ("10 degree ramp down", [G1_FWD, {"op": "slope", "pitch": -0.17}]),
    ("side slope 8 degrees", [G1_FWD, {"op": "slope", "roll": 0.14}]),
    ("hot motors, 70% torque", [G1_FWD, {"op": "motor", "legs": G1_LEGS, "joints": ["hip_pitch", "hip_roll", "hip_yaw", "knee", "ankle_pitch", "ankle_roll"], "strength": 0.7}]),
    ("one worn knee motor", [G1_FWD, {"op": "motor", "legs": ["L"], "joints": ["knee"], "strength": 0.6}]),
    ("stiff joints in the cold", [G1_FWD, {"op": "joint_friction", "scale": 3.0}]),
    ("20 ms control latency", [G1_FWD, {"op": "latency", "steps": 1}]),
    ("noisy IMU and encoders", [G1_FWD, {"op": "sensor_noise", "std": 0.12}]),
    ("miscalibrated encoders", [G1_FWD, {"op": "encoder_offset", "legs": G1_LEGS, "joints": ["hip_pitch"], "offset": 0.04}]),
    ("IMU mounted 3 degrees off", [G1_FWD, {"op": "imu_bias", "roll": 0.05, "pitch": 0.03}]),
    ("velocity estimate drifting", [G1_FWD, {"op": "velocity_bias", "x": 0.2, "y": 0.1}]),
    ("shoulder bump from the side", [G1_FWD, {"op": "push", "force_y": 100, "start": 2.0, "duration": 0.15}]),
    ("shoved from behind", [G1_FWD, {"op": "push", "force_x": 120, "start": 1.5, "duration": 0.15}]),
    ("stop and reverse", [{"op": "command", "a": [0.8, 0, 0], "b": [-0.6, 0, 0], "switch": 2.0}]),
    ("turn on a wet floor", [{"op": "command", "a": [0.6, 0, 0.8]}, {"op": "friction", "feet": G1_LEGS, "mu": 0.35}]),
]


def humanoid(robot: str = "g1") -> np.ndarray:
    """HUMANOID compiled to θ (fixed values, so the result is deterministic)."""
    return np.stack([np.asarray(compile_program({"name": n, "hypothesis": "regression", "ops": ops}, robot).base)
                     for n, ops in HUMANOID]).astype(np.float32)


def build() -> dict:
    hand, _, _ = held_out_thetas()
    realistic = np.stack([np.asarray(compile_program({"name": n, "hypothesis": "gauntlet", "ops": ops}).base)
                          for n, ops in REALISTIC])
    lo, hi = envelope(0.5)
    pts = qmc.Sobol(d=C.D, scramble=True, seed=2026).random(256).astype(np.float32)
    sobol = lo + (hi - lo) * pts
    return {"hand": hand.astype(np.float32), "realistic": realistic.astype(np.float32),
            "sobol": sobol.astype(np.float32)}


def digest(parts: dict) -> str:
    h = hashlib.sha256()
    for k in sorted(parts):
        h.update(k.encode()), h.update(np.ascontiguousarray(parts[k]).tobytes())
    return h.hexdigest()


def load(path: str | Path = Path(__file__).parent / "gauntlet.npz") -> dict:
    parts = dict(np.load(path))
    expected = json.loads((Path(path).with_suffix(".json")).read_text())["sha256"]
    assert digest(parts) == expected, "gauntlet changed since it was locked"
    return parts


if __name__ == "__main__":
    parts = build()
    path = Path(__file__).parent / "gauntlet.npz"
    np.savez(path, **parts)
    meta = {"sha256": digest(parts), "sizes": {k: len(v) for k, v in parts.items()},
            "realistic": [n for n, _ in REALISTIC], "theta_layout_version": 1}
    path.with_suffix(".json").write_text(json.dumps(meta, indent=1))
    print(json.dumps(meta, indent=1))
