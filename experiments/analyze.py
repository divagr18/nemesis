"""Main-experiment analysis: discovery, gauntlet robustness, and cross-play.

  python experiments/analyze.py                 # discovery only (CPU, reads runs/arms/*)
  python experiments/analyze.py --eval          # + gauntlet and nominal metrics for every policy (GPU)
  python experiments/analyze.py --eval --cross  # + cross-play matrix (GPU)

Writes runs/analysis/results.json and runs/analysis/summary.md.

Fairness rules (decided before results, see PLAN.md and docs/LAB_NOTEBOOK.md):
  - a "discovered failure mode" counts only if the failure is PLAUSIBLE (cost <= COST_MAX) and
    FEASIBLE (fresh-seed fall rate < 0.95, the same quarantine rule the bank uses), so blind
    search cannot inflate the count with physically unsurvivable scenarios;
  - the gauntlet's Sobol part is drawn from DR's own training distribution (w=0.5), so it is
    reported separately from the hand-written and realistic parts;
  - per-seed values are always shown next to means (3 seeds is thin).
"""

import argparse
import json
import sys
from collections import defaultdict
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).parent))

COST_MAX = 0.5
FEASIBLE_MAX = 0.95
# Post-hoc (added after seeing partial results; reported next to, never instead of, the
# pre-registered metric). The pre-registered cost is RMS over *deviating* slots, so perturbing
# ~60 slots moderately scores ~0.45 and passes. These judge the total deviation and the number of
# perturbation families active at once.
TOTAL_DEV_MAX = 1.0
FAMILIES_MAX = 3
ARMS = ["dr", "random", "box", "shuffled", "nemesis"]


def load_runs(root: Path) -> dict:
    runs = defaultdict(dict)
    for d in sorted(root.iterdir()):
        if not d.is_dir() or not (d / "args.json").exists():
            continue
        args = json.loads((d / "args.json").read_text())
        recs = [json.loads(l) for l in (d / "atlas.jsonl").read_text().splitlines()] if (d / "atlas.jsonl").exists() else []
        budget = json.loads((d / "budget.json").read_text()) if (d / "budget.json").exists() else None
        rounds = sorted(int(p.name.split("_")[1]) for p in d.glob("round_*") if (p / "ckpts").exists())
        runs[args["arm"]][args["seed"]] = {"dir": d, "args": args, "atlas": recs, "budget": budget, "rounds": rounds}
    return runs


def _total_dev_and_families(theta) -> tuple[float, int]:
    from nemesis.adversary.cmaes import NOT_MAGNITUDES
    from nemesis.adversary.modes import FAMILIES
    from nemesis.perturb import canonical as C
    th = np.asarray(theta, np.float32)
    dev = np.abs(th - C.NEUTRAL) / C.SPAN
    for name in NOT_MAGNITUDES:
        dev[C.INDEX[name]] = 0
    active = sum(any(dev[C.INDEX[sl]].max() > 1e-3 for sl in slots) for slots in FAMILIES.values())
    return float(np.sqrt((dev ** 2).sum())), int(active)


def _strict_ok(rec) -> bool:
    total, fams = _total_dev_and_families(rec["theta"])
    return total <= TOTAL_DEV_MAX and fams <= FAMILIES_MAX and rec["fail_rate"] < FEASIBLE_MAX


def discovery(runs: dict) -> dict:
    """Distinct plausible+feasible failure modes per round (cumulative), per arm and seed."""
    out = {}
    for arm, seeds in runs.items():
        out[arm] = {}
        for seed, r in seeds.items():
            n_rounds = r["args"]["rounds"]
            per_round, modes = [], set()
            for k in range(n_rounds):
                for rec in r["atlas"]:
                    if rec.get("round") == k and rec.get("found") and rec.get("mode") \
                            and rec["cost"] <= COST_MAX and rec["fail_rate"] < FEASIBLE_MAX:
                        modes.add(tuple(rec["mode"]))
                per_round.append(len(modes))
            strict_round, strict_modes = [], set()
            for k in range(n_rounds):
                for rec in r["atlas"]:
                    if rec.get("round") == k and rec.get("found") and rec.get("mode") and _strict_ok(rec):
                        strict_modes.add(tuple(rec["mode"]))
                strict_round.append(len(strict_modes))
            all_fail = [x for x in r["atlas"] if x.get("found")]
            ok = [x for x in all_fail if x["cost"] <= COST_MAX and x["fail_rate"] < FEASIBLE_MAX]
            strict = [x for x in all_fail if _strict_ok(x)]
            out[arm][seed] = {
                "modes_per_round": per_round,
                "strict_modes_per_round": strict_round, "strict_failures": len(strict),
                "families_active": int(np.median([_total_dev_and_families(x["theta"])[1] for x in all_fail]))
                                   if all_fail else None,
                "failures": len(all_fail), "plausible_feasible": len(ok),
                "attack_steps": (r["budget"] or {}).get("steps", {}).get("attack"),
                "finetune_steps": (r["budget"] or {}).get("steps", {}).get("finetune"),
                "modes": sorted({tuple(x["mode"]) for x in ok}),
            }
    return out


def _summ(res) -> dict:
    per = res["robustness"].mean(1)
    k = max(1, int(np.ceil(0.1 * len(per))))
    return {"fall": float(res["fell"].mean()), "success": float(res["success"].mean()),
            "cvar10": float(np.sort(per)[:k].mean()), "progress": float(res["progress"].mean()),
            "track_err": float(res["track_err"].mean())}


def evaluate(runs: dict, base: str, seeds: int, cross: bool) -> dict:
    from finetune import forward_nominal
    from gauntlet import load as load_gauntlet

    from nemesis.envs.base import load_env
    from nemesis.perturb import canonical as C
    from nemesis.perturb.wrapper import NemesisWrapper
    from nemesis.sim.evaluate import Evaluator
    from nemesis.train.ppo import load_params

    g = load_gauntlet()
    suites = {"nominal": forward_nominal()[None], "hand": g["hand"], "realistic": g["realistic"], "sobol": g["sobol"]}
    ev = Evaluator(NemesisWrapper(load_env()[0], base_dr=False), base, horizon=250)

    policies = {"baseline": base}
    for arm, s in runs.items():
        for seed, r in s.items():
            if r["rounds"]:
                policies[f"{arm}_s{seed}"] = str(r["dir"] / f"round_{r['rounds'][-1]}")
    out = {"gauntlet": {}}
    for name, run in policies.items():
        params = load_params(run)
        out["gauntlet"][name] = {k: _summ(ev(params, th, seeds=seeds, key=2026)) for k, th in suites.items()}
        print(name, {k: round(v["fall"], 3) for k, v in out["gauntlet"][name].items()}, flush=True)

    if cross:
        attacks = {}
        for arm, s in runs.items():
            th = [np.array(x["theta"], np.float32) for r in s.values() for x in r["atlas"]
                  if x.get("found") and x["cost"] <= COST_MAX and x["fail_rate"] < FEASIBLE_MAX]
            if th:
                attacks[arm] = np.stack(th)
        out["cross"] = {}
        for name, run in policies.items():
            params = load_params(run)
            out["cross"][name] = {a: float(ev(params, th, seeds=8, key=77)["fell"].mean()) for a, th in attacks.items()}
            print("cross", name, out["cross"][name], flush=True)
        out["cross_sizes"] = {a: len(t) for a, t in attacks.items()}
    return out


def summary_md(disc: dict, ev: dict | None) -> str:
    L = ["# Main experiment summary", "",
         f"Discovery counts only plausible (cost <= {COST_MAX}) and feasible (fall < {FEASIBLE_MAX}) failures.", "",
         "## Discovery (distinct plausible+feasible failure modes, cumulative by round)", "",
         "| Arm | per seed | mean after last round | plausible+feasible failures | attack steps |",
         "|---|---|---|---|---|"]
    for arm in ARMS:
        if arm not in disc:
            continue
        s = disc[arm]
        last = [v["modes_per_round"][-1] for v in s.values() if v["modes_per_round"]]
        L.append(f"| {arm} | {', '.join(str(v['modes_per_round']) for v in s.values())} | "
                 f"{np.mean(last):.1f} | {', '.join(str(v['plausible_feasible']) for v in s.values())} | "
                 f"{', '.join(f'{(v['attack_steps'] or 0)/1e6:.1f}M' for v in s.values())} |")
    L += ["", f"## Discovery, post-hoc strict plausibility (total deviation <= {TOTAL_DEV_MAX}, "
          f"<= {FAMILIES_MAX} perturbation families, feasible)", "",
          "Added after partial results exposed a flaw in the pre-registered cost (see LAB_NOTEBOOK).", "",
          "| Arm | modes per round (per seed) | mean after last round | strict failures | median families per failure |",
          "|---|---|---|---|---|"]
    for arm in ARMS:
        if arm not in disc:
            continue
        s = disc[arm]
        last = [v["strict_modes_per_round"][-1] for v in s.values() if v["strict_modes_per_round"]]
        L.append(f"| {arm} | {', '.join(str(v['strict_modes_per_round']) for v in s.values())} | "
                 f"{np.mean(last) if last else 0:.1f} | {', '.join(str(v['strict_failures']) for v in s.values())} | "
                 f"{', '.join(str(v['families_active']) for v in s.values())} |")
    if ev:
        L += ["", "## Gauntlet (fall rate; lower is better) and nominal", "",
              "| Policy | hand | realistic | sobol (DR distribution) | CVaR10 hand | nominal progress (m) |",
              "|---|---|---|---|---|---|"]
        for name, r in ev["gauntlet"].items():
            L.append(f"| {name} | {r['hand']['fall']:.3f} | {r['realistic']['fall']:.3f} | {r['sobol']['fall']:.3f} | "
                     f"{r['hand']['cvar10']:+.3f} | {r['nominal']['progress']:.2f} |")
        if "cross" in ev:
            arms = list(ev["cross_sizes"])
            L += ["", "## Cross-play (fall rate of each policy under each arm's failures)", "",
                  "| Policy | " + " | ".join(f"{a} ({ev['cross_sizes'][a]})" for a in arms) + " |",
                  "|---|" + "---|" * len(arms)]
            for name, r in ev["cross"].items():
                L.append(f"| {name} | " + " | ".join(f"{r.get(a, float('nan')):.3f}" for a in arms) + " |")
    return "\n".join(L) + "\n"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default="runs/arms")
    ap.add_argument("--base", default="runs/baseline_v2")
    ap.add_argument("--out", default="runs/analysis")
    ap.add_argument("--eval", action="store_true")
    ap.add_argument("--cross", action="store_true")
    ap.add_argument("--seeds", type=int, default=16)
    args = ap.parse_args()

    runs = load_runs(Path(args.root))
    disc = discovery(runs)
    ev = evaluate(runs, args.base, args.seeds, args.cross) if args.eval else None
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    (out / "results.json").write_text(json.dumps({"discovery": disc, "eval": ev}, indent=1, default=list))
    md = summary_md(disc, ev)
    (out / "summary.md").write_text(md)
    print(md)


if __name__ == "__main__":
    main()
