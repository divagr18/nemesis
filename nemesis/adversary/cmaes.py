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

FAIL_RATE = 0.5


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


def search(evaluator, params, program: Compiled, pop: int = 24, gens: int = 12, seeds: int = 8,
           key: int = 0, patience: int = 4, record: bool = True) -> SearchResult:
    k = max(program.k, 1)
    es = CMA_ES(population_size=pop, solution=jp.zeros(k))
    es_params = es.default_params
    rng = jax.random.PRNGKey(key)
    state = es.init(rng, jp.zeros(k), es_params)

    best = (np.inf, None, 0.0, 1.0)
    history, steps, stale = [], 0, 0
    for g in range(gens):
        rng, k_ask, k_tell = jax.random.split(rng, 3)
        z, state = es.ask(k_ask, state, es_params)
        u = np.zeros((pop, K_MAX), np.float32)
        u[:, :k] = np.asarray(jax.nn.sigmoid(z))[:, :k] if program.k else 0.5
        thetas = np.stack([np.asarray(program.theta_unit(ui)) for ui in u])
        res = evaluator(params, thetas, seeds=seeds, key=key)  # common random seeds per generation
        steps += pop * seeds * evaluator.horizon
        f, fail_rate, cost = fitness(res, thetas)
        state, _ = es.tell(k_tell, z, jp.asarray(f), state, es_params)
        if record:
            history.append({"thetas": thetas, "fitness": f, "fail_rate": fail_rate, "cost": cost})
        i = int(np.argmin(f))
        if f[i] < best[0] - 1e-3:
            best, stale = (float(f[i]), thetas[i], float(fail_rate[i]), float(cost[i])), 0
        else:
            stale += 1
        if program.k == 0 or stale >= patience:
            break
    return SearchResult(program, best[1], best[0], best[2], best[3], steps, history)


def shrink(evaluator, params, theta: np.ndarray, seeds: int = 8, key: int = 1, iters: int = 4):
    """Delta-debugging: move each perturbed slot group toward nominal while the failure persists.

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
            fail = evaluator(params, cand[None], seeds=seeds, key=key)["fell"].mean() >= FAIL_RATE
            steps += seeds * evaluator.horizon
            lo, hi = (lo, mid) if fail else (mid, hi)
        theta[sl] = C.NEUTRAL[sl] + hi * (target - C.NEUTRAL[sl])
    return theta, steps
