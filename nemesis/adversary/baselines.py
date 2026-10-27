"""Control adversaries that isolate what the LLM contributes.

- random_search: uniform θ over the whole envelope (the DR distribution, used as an attacker).
- BoxProgram / full_union: CMA-ES over every primitive at once, no LLM structure.
- random_program: "shuffled LLM", i.e. programs with the same number of ops as the LLM's, op types
  and parameters chosen blindly, each field searched over its full envelope.
All share the evaluator and the fitness of cmaes.py, and are charged env steps the same way.
Every function takes the robot (default Go1), whose θ layout and nominal task it uses.
"""

import random

import jax.numpy as jp
import numpy as np

from nemesis import robots
from nemesis.perturb import canonical as C
from nemesis.perturb.dsl import K_MAX, compile_program, language

# Default task for programs without a command op. The command profile itself is searchable by
# every adversary (LLM programs may set it, and the controls search it), so none is privileged.
FORWARD = {"op": "command", "a": [1.0, 0.0, 0.0]}
TASK_SLOTS = ("command_mode",)


def forward(robot="go1") -> dict:
    """The nominal task (walk forward at the robot's nominal speed) as a command op."""
    return {"op": "command", "a": list(robots.get(robot).nominal_command)}


def _task_theta(robot="go1") -> np.ndarray:
    L = C.layout(robot)
    cmd = list(robots.get(robot).nominal_command)
    th = L.neutral()
    th[L.INDEX["command_mode"]] = 1.0
    th[L.INDEX["command_a"]] = cmd
    th[L.INDEX["command_b"]] = cmd
    return th


def envelope(width: float = 1.0, robot="go1") -> tuple[np.ndarray, np.ndarray]:
    """(lo, hi) of the envelope scaled toward nominal: width 1 is the full physical envelope,
    width 0.25 keeps each slot within a quarter of its range around nominal. The command
    profile always spans its full range (it is the task, not a perturbation), and so do slots
    whose neutral is an "off" marker outside their range (stairs_depth, stairs_start: shape and
    position, which only matter once stairs_height and stairs_count turn the steps on)."""
    L = C.layout(robot)
    lo = L.NEUTRAL + width * (L.LO - L.NEUTRAL)
    hi = L.NEUTRAL + width * (L.HI - L.NEUTRAL)
    lo, hi = np.where(L.NEUTRAL_OFF, L.LO, lo), np.where(L.NEUTRAL_OFF, L.HI, hi)
    for name in ("command_a", "command_b", "command_switch"):
        sl = L.INDEX[name]
        lo[sl], hi[sl] = L.LO[sl], L.HI[sl]
    sl = L.INDEX["command_mode"]
    lo[sl] = hi[sl] = 1.0
    return lo.astype(np.float32), hi.astype(np.float32)


def random_thetas(n: int, rng: np.random.Generator, width: float = 1.0, families=None,
                  robot="go1") -> np.ndarray:
    """Uniform over the (scaled) envelope, including the command profile; slots outside the allowed
    families stay nominal."""
    from nemesis.adversary.modes import allowed_slots
    L = C.layout(robot)
    lo, hi = envelope(width, robot)
    th = rng.uniform(lo, hi, size=(n, C.D)).astype(np.float32)
    keep = allowed_slots(families, L)
    for s in L.SLOTS:
        if s.name not in keep:
            th[:, L.INDEX[s.name]] = L.NEUTRAL[L.INDEX[s.name]]
    return th


class BoxProgram:
    """Searches every non-task θ slot directly (full-union CMA); quacks like dsl.Compiled."""

    def __init__(self, families=None, robot="go1"):
        from nemesis.adversary.modes import allowed_slots
        L = self.layout = C.layout(robot)
        keep = allowed_slots(families, L)
        self.idx = np.array([i for s in L.SLOTS if s.name not in TASK_SLOTS and s.name in keep
                             for i in range(L.INDEX[s.name].start, L.INDEX[s.name].stop)])
        self.base = _task_theta(robot)
        self.names = [f"theta[{i}]" for i in self.idx]
        self.program = None

    @property
    def k(self) -> int:
        return len(self.idx)

    width = property(lambda self: self.k)

    def theta_unit(self, u):
        u = jp.asarray(u)[: self.k]
        vals = jp.asarray(self.layout.LO)[self.idx] + jp.asarray(self.layout.SPAN)[self.idx] * u
        return jp.asarray(self.base).at[self.idx].set(vals)

    def theta_units(self, U: np.ndarray) -> np.ndarray:
        """Vectorized numpy θ for a population U [P, k]."""
        L = self.layout
        th = np.repeat(self.base[None], len(U), axis=0)
        th[:, self.idx] = L.LO[self.idx] + L.SPAN[self.idx] * np.asarray(U, np.float32)[:, : self.k]
        return th.astype(np.float32)


def _range(L, name, i=0) -> list[float]:
    s = L.SLOT[name]
    lo, hi = (v if np.isscalar(v) else v[i] for v in (s.lo, s.hi))
    return [float(lo), float(hi)]


def _templates(robot="go1") -> dict:
    """Each op with its fields spanning the full envelope (legs and joints drawn at random)."""
    rb, L = robots.get(robot), C.layout(robot)
    legs, parts = list(rb.feet), list(rb.joint_parts)
    push = _range(L, "push1_force")
    terrain = {}
    if rb.terrain_boxes:
        # Count starts at 1 (0 would be flat ground; a curb is its own op).
        terrain = {
            "stairs": lambda r: {"height": _range(L, "stairs_height"), "depth": _range(L, "stairs_depth"),
                                 "count": [1.0, _range(L, "stairs_count")[1]],
                                 "start": _range(L, "stairs_start")},
            "curb": lambda r: {"height": _range(L, "stairs_height"), "start": _range(L, "stairs_start")},
        }
    return {
        "friction": lambda r: {"feet": r.sample(legs, r.randint(1, len(legs))), "mu": [0.05, 1.5]},
        "ice_patch": lambda r: {"mu": [0.05, 1.0], "start": [0.0, 6.0], "length": [0.0, 4.0]},
        "payload": lambda r: {"mass": _range(L, "payload_mass"), "offset_x": _range(L, "payload_offset", 0),
                              "offset_z": _range(L, "payload_offset", 2)},
        "slope": lambda r: {"pitch": [-0.3, 0.3], "roll": [-0.3, 0.3]},
        "motor": lambda r: {"legs": r.sample(legs, r.randint(1, len(legs))),
                            "joints": r.sample(parts, r.randint(1, 3)), "strength": [0.3, 1.0]},
        "joint_friction": lambda r: {"scale": [1.0, 4.0]},
        "latency": lambda r: {"steps": [0.0, 2.0]},
        "push": lambda r: {"force_x": push, "force_y": push, "start": [0.0, 5.0], "duration": [0.0, 0.5]},
        "sensor_noise": lambda r: {"std": [0.0, 0.3]},
        "encoder_offset": lambda r: {"legs": r.sample(legs, r.randint(1, len(legs))),
                                     "joints": r.sample(parts, r.randint(1, 3)), "offset": [-0.05, 0.05]},
        "imu_bias": lambda r: {"roll": [-0.08, 0.08], "pitch": [-0.08, 0.08]},
        "velocity_bias": lambda r: {"x": [-0.3, 0.3], "y": [-0.3, 0.3]},
    } | terrain


_TEMPLATES = _templates("go1")


def random_program(n_ops: int, seed: int, families=None, robot="go1"):
    """A blind program with n_ops perturbation ops (plus the forward task), ≤ K_MAX free params."""
    from nemesis.adversary.modes import OP_FAMILY
    go1 = robots.get(robot).name == "go1"
    templates, task = (_TEMPLATES, FORWARD) if go1 else (_templates(robot), forward(robot))
    Program = language(robot).Program
    r = random.Random(seed)
    pool = [op for op in templates if families is None or OP_FAMILY[op] in families]
    n_ops = min(n_ops, len(pool))
    while True:
        ops = [task] + [{"op": op, **templates[op](r)} for op in r.sample(pool, n_ops)]
        try:  # invalid: e.g. both stairs and curb drawn (one terrain op per program)
            p = Program.model_validate({"name": f"shuffled_{seed}", "hypothesis": "random control", "ops": ops})
            if compile_program(p, robot).k <= K_MAX:
                return p
        except ValueError:
            pass
        n_ops = max(1, n_ops - (r.random() < 0.3))
