"""Control adversaries that isolate what the LLM contributes.

- random_search: uniform θ over the whole envelope (the DR distribution, used as an attacker).
- BoxProgram / full_union: CMA-ES over every primitive at once, no LLM structure.
- random_program: "shuffled LLM", i.e. programs with the same number of ops as the LLM's, op types
  and parameters chosen blindly, each field searched over its full envelope.
All share the evaluator and the fitness of cmaes.py, and are charged env steps the same way.
"""

import random

import jax.numpy as jp
import numpy as np

from nemesis.perturb import canonical as C
from nemesis.perturb.dsl import K_MAX, Program, compile_program

# Default task for programs without a command op. The command profile itself is searchable by
# every adversary (LLM programs may set it, and the controls search it), so none is privileged.
FORWARD = {"op": "command", "a": [1.0, 0.0, 0.0]}
TASK_SLOTS = ("command_mode",)


def _task_theta() -> np.ndarray:
    th = C.neutral()
    th[C.INDEX["command_mode"]] = 1.0
    th[C.INDEX["command_a"]] = [1.0, 0.0, 0.0]
    th[C.INDEX["command_b"]] = [1.0, 0.0, 0.0]
    return th


def envelope(width: float = 1.0) -> tuple[np.ndarray, np.ndarray]:
    """(lo, hi) of the envelope scaled toward nominal: width 1 is the full physical envelope,
    width 0.25 keeps each slot within a quarter of its range around nominal. The command
    profile always spans its full range (it is the task, not a perturbation)."""
    lo = C.NEUTRAL + width * (C.LO - C.NEUTRAL)
    hi = C.NEUTRAL + width * (C.HI - C.NEUTRAL)
    for name in ("command_a", "command_b", "command_switch"):
        sl = C.INDEX[name]
        lo[sl], hi[sl] = C.LO[sl], C.HI[sl]
    sl = C.INDEX["command_mode"]
    lo[sl] = hi[sl] = 1.0
    return lo.astype(np.float32), hi.astype(np.float32)


def random_thetas(n: int, rng: np.random.Generator, width: float = 1.0, families=None) -> np.ndarray:
    """Uniform over the (scaled) envelope, including the command profile; slots outside the allowed
    families stay nominal."""
    from nemesis.adversary.modes import allowed_slots
    lo, hi = envelope(width)
    th = rng.uniform(lo, hi, size=(n, C.D)).astype(np.float32)
    keep = allowed_slots(families)
    for s in C.SLOTS:
        if s.name not in keep:
            th[:, C.INDEX[s.name]] = C.NEUTRAL[C.INDEX[s.name]]
    return th


class BoxProgram:
    """Searches every non-task θ slot directly (full-union CMA); quacks like dsl.Compiled."""

    def __init__(self, families=None):
        from nemesis.adversary.modes import allowed_slots
        keep = allowed_slots(families)
        self.idx = np.array([i for s in C.SLOTS if s.name not in TASK_SLOTS and s.name in keep
                             for i in range(C.INDEX[s.name].start, C.INDEX[s.name].stop)])
        self.base = _task_theta()
        self.names = [f"theta[{i}]" for i in self.idx]
        self.program = None

    @property
    def k(self) -> int:
        return len(self.idx)

    width = property(lambda self: self.k)

    def theta_unit(self, u):
        u = jp.asarray(u)[: self.k]
        vals = jp.asarray(C.LO)[self.idx] + jp.asarray(C.SPAN)[self.idx] * u
        return jp.asarray(self.base).at[self.idx].set(vals)

    def theta_units(self, U: np.ndarray) -> np.ndarray:
        """Vectorized numpy θ for a population U [P, k]."""
        th = np.repeat(self.base[None], len(U), axis=0)
        th[:, self.idx] = C.LO[self.idx] + C.SPAN[self.idx] * np.asarray(U, np.float32)[:, : self.k]
        return th.astype(np.float32)


_TEMPLATES = {
    "friction": lambda r: {"feet": r.sample(["FR", "FL", "RR", "RL"], r.randint(1, 4)), "mu": [0.05, 1.5]},
    "ice_patch": lambda r: {"mu": [0.05, 1.0], "start": [0.0, 6.0], "length": [0.0, 4.0]},
    "payload": lambda r: {"mass": [0.0, 5.0], "offset_x": [-0.1, 0.1], "offset_z": [-0.05, 0.1]},
    "slope": lambda r: {"pitch": [-0.3, 0.3], "roll": [-0.3, 0.3]},
    "motor": lambda r: {"legs": r.sample(["FR", "FL", "RR", "RL"], r.randint(1, 4)),
                        "joints": r.sample(["hip", "thigh", "calf"], r.randint(1, 3)), "strength": [0.3, 1.0]},
    "joint_friction": lambda r: {"scale": [1.0, 4.0]},
    "latency": lambda r: {"steps": [0.0, 2.0]},
    "push": lambda r: {"force_x": [-150, 150], "force_y": [-150, 150], "start": [0.0, 5.0], "duration": [0.0, 0.5]},
    "sensor_noise": lambda r: {"std": [0.0, 0.3]},
    "encoder_offset": lambda r: {"legs": r.sample(["FR", "FL", "RR", "RL"], r.randint(1, 4)),
                                 "joints": r.sample(["hip", "thigh", "calf"], r.randint(1, 3)), "offset": [-0.05, 0.05]},
    "imu_bias": lambda r: {"roll": [-0.08, 0.08], "pitch": [-0.08, 0.08]},
    "velocity_bias": lambda r: {"x": [-0.3, 0.3], "y": [-0.3, 0.3]},
}


def random_program(n_ops: int, seed: int, families=None) -> Program:
    """A blind program with n_ops perturbation ops (plus the forward task), ≤ K_MAX free params."""
    from nemesis.adversary.modes import OP_FAMILY
    r = random.Random(seed)
    pool = [op for op in _TEMPLATES if families is None or OP_FAMILY[op] in families]
    n_ops = min(n_ops, len(pool))
    while True:
        ops = [FORWARD] + [{"op": op, **_TEMPLATES[op](r)} for op in r.sample(pool, n_ops)]
        p = Program.model_validate({"name": f"shuffled_{seed}", "hypothesis": "random control", "ops": ops})
        try:
            if compile_program(p).k <= K_MAX:
                return p
        except ValueError:
            pass
        n_ops = max(1, n_ops - (r.random() < 0.3))
