"""Curating the counterexample bank before each fine-tuning round.

Every item is scored under the CURRENT policy (fall rate p over fresh seeds) and then
  - quarantined if p >= QUARANTINE: very likely infeasible (e.g. braking hard on ice), and
    training on unsolvable worlds only makes the policy timid (PAIRED; SFL "No Regrets"),
  - weighted by learnability p(1-p) (SFL, arXiv 2408.15099), with a replay floor so solved
    items keep coming back and cannot be silently forgotten,
  - balanced across failure families, so one family (friction produced 78% of round 2's bank)
    cannot drown out the others.
"""

import numpy as np

from nemesis.adversary.modes import cause_family

QUARANTINE = 0.95
REPLAY_FLOOR = 0.03  # weight of an item the policy already solves (p(1-p) peaks at 0.25)


def curate(evaluator, params, thetas: np.ndarray, seeds: int = 16, key: int = 11) -> dict:
    """Returns {"bank", "weights", "report"}; weights sum to 1 over the kept items."""
    thetas = np.asarray(thetas, np.float32)
    if len(thetas) == 0:
        return {"bank": thetas, "weights": np.zeros(0), "report": {"n": 0}}
    p = evaluator(params, thetas, seeds=seeds, key=key)["fell"].mean(1)
    keep = p < QUARANTINE
    fams = np.array([cause_family(t) for t in thetas])
    w = np.maximum(p * (1 - p), REPLAY_FLOOR)

    # Equal total weight per family among kept items.
    for f in np.unique(fams[keep]):
        m = keep & (fams == f)
        w[m] = w[m] / w[m].sum()
    w = np.where(keep, w, 0.0)
    report = {
        "n": int(len(thetas)), "kept": int(keep.sum()), "quarantined": int((~keep).sum()),
        "mean_fall": float(p.mean()),
        "families": {str(f): {"n": int((fams == f).sum()), "kept": int((keep & (fams == f)).sum()),
                              "mean_fall": float(p[fams == f].mean())} for f in np.unique(fams)},
    }
    if not keep.any():
        return {"bank": thetas[:0], "weights": np.zeros(0), "report": report}
    return {"bank": thetas[keep], "weights": w[keep] / w[keep].sum(), "report": report}
