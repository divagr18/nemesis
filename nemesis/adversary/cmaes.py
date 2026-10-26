"""CMA-ES over one attack program's free parameters: find the most plausible failure.

Search runs in logit space z (u = sigmoid(z) in [0,1]^k, θ = program.theta_unit(u)), so every
candidate stays inside the program's ranges and the physical envelope.

Fitness (minimized):
  - candidates that make the robot fall in at least FAIL_RATE of the seeds score -2 + cost,
    where cost in [0, 1] is how far θ is from nominal. Among failures, the least extreme wins.
  - all other candidates score their mean robustness margin in [-1, 1]: the search first
    pushes toward failure, then shrinks toward the most plausible version of it.
"""

from dataclasses import dataclass, field

import jax
import jax.numpy as jp
import numpy as np
from evosax.algorithms import CMA_ES

from nemesis.perturb import canonical as C
from nemesis.perturb.dsl import K_MAX, Compiled

FAIL_RATE = 0.5    # a scenario counts as a failure if the robot falls in at least half the seeds
SHRINK_FAIL = 0.8  # shrinking stops while the failure is still clearly reproducible


def plausibility_cost(thetas: np.ndarray) -> np.ndarray:
    """Normalized distance from nominal in [0, 1]: RMS of per-slot deviation over the envelope,
    taken over the slots that deviate (so one strong change is as costly as several mild ones)."""
    dev = np.abs(thetas - C.NEUTRAL) / C.SPAN
    dev[:, C.INDEX["command_mode"]] = 0  # the command profile is the task, not a perturbation
    for name in ("command_a", "command_b", "command_switch"):
        dev[:, C.INDEX[name]] = 0
    n = np.maximum((dev > 1e-6).sum(1), 1)
    return np.sqrt((dev**2).sum(1) / n)


@dataclass
class SearchResult:
    program: Compiled
    best_theta: np.ndarray
    best_fitness: float
    best_fail_rate: float
    best_cost: float
    env_steps: int
    history: list = field(default_factory=list)  # per generation: thetas, fitness, fail_rate

    @property
    def found_failure(self) -> bool:
        return self.best_fail_rate >= FAIL_RATE


def fitness(result: dict, thetas: np.ndarray) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    fail_rate = result["fell"].mean(1)
    robust = result["robustness"].mean(1)
    cost = plausibility_cost(thetas)
    f = np.where(fail_rate >= FAIL_RATE, -2.0 + cost, robust)
    return f, fail_rate, cost


def search(evaluator, params, program: Compiled, **kw) -> SearchResult:
    return search_many(evaluator, params, [program], **kw)[0]


class _Run:
    """CMA-ES state for one program inside a batched multi-program search."""

    def __init__(self, program, pop, rng):
        self.program, self.k = program, max(program.k, 1)
        self.es = CMA_ES(population_size=pop, solution=jp.zeros(self.k))
        self.es_params = self.es.default_params
        self.state = self.es.init(rng, jp.zeros(self.k), self.es_params)
        self.best = (np.inf, None, 0.0, 1.0)
        self.history, self.steps, self.stale = [], 0, 0
        self.done = False

    def ask(self, rng, pop):
        z, self.state = self.es.ask(rng, self.state, self.es_params)
        u = np.zeros((pop, getattr(self.program, "width", K_MAX)), np.float32)
        u[:, :self.k] = np.asarray(jax.nn.sigmoid(z))[:, :self.k] if self.program.k else 0.5
        return z, np.stack([np.asarray(self.program.theta_unit(ui)) for ui in u])

    def tell(self, rng, z, thetas, res, patience, record):
        f, fail_rate, cost = fitness(res, thetas)
        self.state, _ = self.es.tell(rng, z, jp.asarray(f), self.state, self.es_params)
        if record:
            self.history.append({"thetas": thetas, "fitness": f, "fail_rate": fail_rate, "cost": cost})
        i = int(np.argmin(f))
        if f[i] < self.best[0] - 1e-3:
            self.best, self.stale = (float(f[i]), thetas[i], float(fail_rate[i]), float(cost[i])), 0
        else:
            self.stale += 1
        self.done = self.program.k == 0 or self.stale >= patience

    def result(self) -> SearchResult:
        b = self.best
        return SearchResult(self.program, b[1], b[0], b[2], b[3], self.steps, self.history)


def search_many(evaluator, params, programs: list, pop: int = 24, gens: int = 12, seeds: int = 8,
                key: int = 0, patience: int = 4, record: bool = True, slots: int | None = None):
    """Runs CMA-ES for several programs at once: every generation, all programs' candidates go
    through ONE batched evaluation (θ is data, so the GPU sees one big batch).

    `slots` fixes the number of programs per batch (finished or missing programs are padded with
    nominal θ and not charged), so the evaluator compiles once for the whole hunt.
    """
    slots = slots or len(programs)
    rng = jax.random.PRNGKey(key)
    runs = []
    for p in programs:
        rng, k = jax.random.split(rng)
        runs.append(_Run(p, pop, k))
    pad = np.repeat(C.neutral()[None], pop, axis=0)

    for _ in range(gens):
        active = [r for r in runs if not r.done]
        if not active:
            break
        for start in range(0, len(active), slots):
            chunk = active[start:start + slots]
            asked = []
            for r in chunk:
                rng, k = jax.random.split(rng)
                asked.append(r.ask(k, pop))
            batch = [th for _, th in asked] + [pad] * (slots - len(chunk))
            res = evaluator(params, np.concatenate(batch), seeds=seeds, key=key)  # common seeds
            for j, (r, (z, th)) in enumerate(zip(chunk, asked)):
                part = {name: v[j * pop:(j + 1) * pop] for name, v in res.items()}
                rng, k = jax.random.split(rng)
                r.tell(k, z, th, part, patience, record)
                r.steps += pop * seeds * evaluator.horizon
    return [r.result() for r in runs]


def shrink(evaluator, params, theta: np.ndarray, seeds: int = 8, key: int = 1, iters: int = 4):
    """Delta-debugging: move each perturbed slot group toward nominal while the failure persists.

    "Persists" means a fall rate of at least SHRINK_FAIL, not just FAIL_RATE: shrinking to the exact
    boundary yields scenarios that fail ~50% of the time and drop below the bar on fresh seeds.

    Returns (minimal θ, env steps used). Groups are canonical slots (e.g. all four foot
    frictions move together); each is bisected between nominal and its current value.
    """
    theta = np.array(theta, np.float32)
    steps = 0
    for s in C.SLOTS:
        sl = C.INDEX[s.name]
        if s.name.startswith("command") or np.allclose(theta[sl], C.NEUTRAL[sl]):
            continue
        lo, hi = 0.0, 1.0  # fraction of the way from nominal to the current value
        target = theta[sl].copy()
        for _ in range(iters):
            mid = (lo + hi) / 2
            cand = theta.copy()
            cand[sl] = C.NEUTRAL[sl] + mid * (target - C.NEUTRAL[sl])
            fail = evaluator(params, cand[None], seeds=seeds, key=key)["fell"].mean() >= SHRINK_FAIL
            steps += seeds * evaluator.horizon
            lo, hi = (lo, mid) if fail else (mid, hi)
        theta[sl] = C.NEUTRAL[sl] + hi * (target - C.NEUTRAL[sl])
    return theta, steps
