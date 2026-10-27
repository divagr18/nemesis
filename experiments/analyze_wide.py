"""Analysis of the pre-registered wide sweep (docs/PREREGISTRATION.md): verdicts for H-A..H-E.

  python experiments/analyze_wide.py                # A, B, C, D (CPU: reads runs/A, runs/C, runs/D)
  python experiments/analyze_wide.py --eval-e       # + E: gauntlet for DR width variants (GPU)

Writes runs/analysis/wide.json and runs/analysis/wide.md. Definitions are imported from
experiments/analyze.py (strict failure) so they cannot drift from the pre-registration.
"""

import argparse
import json
import pickle
import sys
from collections import defaultdict
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).parent))
from analyze import FEASIBLE_MAX, _strict_ok, _total_dev_and_families  # noqa: E402

ADVERSARIES = ["nemesis", "shuffled", "box", "random"]
BUDGETS = [0.5e6, 1e6, 2e6, 5e6, 10e6]


def load_attack_runs(root: Path) -> dict:
    runs = {}
    for d in sorted(root.glob("*")):
        if not (d / "args.json").exists():
            continue
        atlas = [json.loads(l) for l in (d / "atlas.jsonl").read_text().splitlines()] if (d / "atlas.jsonl").exists() else []
        hists = []
        for f in sorted(d.glob("history_*.pkl")):
            h = pickle.load(open(f, "rb"))
            if isinstance(h, dict):
                hists.append(h)
        done = (d / "budget.json").exists()
        runs[d.name] = {"args": json.loads((d / "args.json").read_text()), "atlas": atlas, "hists": hists, "done": done}
    return runs


def strict_stats(run) -> dict:
    found = [r for r in run["atlas"] if r.get("found")]
    strict = [r for r in found if _strict_ok(r)]
    modes = {tuple(r["mode"]) for r in strict if r.get("mode")}
    return {"failures": len(found), "strict": len(strict), "strict_modes": len(modes)}


def budget_curve(run) -> list[int]:
    """Strict failures discovered by each budget. CMA arms: a program counts at the first generation
    where any candidate failed in >= SEARCH_FAIL of search seeds with a strictly plausible θ (search
    seeds, not the fresh-seed re-check, so this curve is optimistic for every arm equally). Random:
    archived records with their exact attack-step stamps."""
    from nemesis.adversary.cmaes import SEARCH_FAIL
    events = []
    if run["hists"]:
        for h in run["hists"]:
            for g, gen in enumerate(h["gens"]):
                ok = [i for i in np.flatnonzero(gen["fail_rate"] >= SEARCH_FAIL)
                      if _strict_ok({"theta": gen["thetas"][i], "fail_rate": float(gen["fail_rate"][i])})]
                if ok:
                    events.append(h["start"] + (g + 1) * h["per_gen"])
                    break
    else:
        events = [r["attack_steps"] for r in run["atlas"] if r.get("found") and _strict_ok(r) and "attack_steps" in r]
    return [int(sum(e <= b for e in events)) for b in BUDGETS]


def by(runs, prefix):
    """Group runs named <prefix>_<adversary>_s<seed> -> {adversary: [run, ...]}."""
    out = defaultdict(list)
    for name, r in runs.items():
        if name.startswith(prefix + "_") and r["done"]:
            out[name[len(prefix) + 1:].rsplit("_s", 1)[0]].append(r)
    return out


def fmt(vals):
    if not vals:
        return "n/a"
    return f"{np.mean(vals):.1f} [{', '.join(str(v) for v in vals)}]"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default="runs")
    ap.add_argument("--eval-e", action="store_true")
    ap.add_argument("--seeds", type=int, default=16)
    args = ap.parse_args()
    root = Path(args.root)
    out, L = {}, ["# Wide sweep: pre-registered verdicts", ""]

    # ---- A + B: hard targets and budget curves -------------------------------------------------
    A = load_attack_runs(root / "A")
    L += ["## A: hard targets (strict failures, mean [per seed])", "",
          "| Target | " + " | ".join(ADVERSARIES) + " |", "|---|" + "---|" * len(ADVERSARIES)]
    out["A"] = {}
    for t in ("base", "dr", "nem"):
        g = by(A, t)
        out["A"][t] = {a: [strict_stats(r)["strict"] for r in g.get(a, [])] for a in ADVERSARIES}
        L.append(f"| {t} | " + " | ".join(fmt(out["A"][t][a]) for a in ADVERSARIES) + " |")
    L += ["", "Strict modes:", "", "| Target | " + " | ".join(ADVERSARIES) + " |", "|---|" + "---|" * len(ADVERSARIES)]
    for t in ("base", "dr", "nem"):
        g = by(A, t)
        L.append(f"| {t} | " + " | ".join(fmt([strict_stats(r)["strict_modes"] for r in g.get(a, [])]) for a in ADVERSARIES) + " |")
    m = {t: {a: np.mean(v) if v else np.nan for a, v in out["A"][t].items()} for t in out["A"]}
    hard_ok = all(m[t]["nemesis"] > max(m[t][a] for a in ADVERSARIES if a != "nemesis") for t in ("dr", "nem"))
    gap = lambda t: m[t]["nemesis"] - max(m[t][a] for a in ADVERSARIES if a != "nemesis")  # noqa: E731
    verdict_a = hard_ok and gap("dr") > gap("base")
    L += ["", f"**H-A verdict:** {'SUPPORTED' if verdict_a else 'NOT SUPPORTED'} "
              f"(nemesis − best other: base {gap('base'):+.1f}, dr {gap('dr'):+.1f}, nem {gap('nem'):+.1f})", ""]
    out["A_verdict"] = bool(verdict_a)

    L += ["## B: budget curve on the DR-hardened target (strict failures by attack steps)", "",
          "| Adversary | " + " | ".join(f"{b/1e6:g}M" for b in BUDGETS) + " |", "|---|" + "---|" * len(BUDGETS)]
    out["B"] = {}
    g = by(A, "dr")
    for a in ADVERSARIES:
        curves = np.array([budget_curve(r) for r in g.get(a, [])]) if g.get(a) else np.zeros((0, len(BUDGETS)))
        out["B"][a] = curves.mean(0).tolist() if len(curves) else None
        L.append(f"| {a} | " + " | ".join(f"{x:.1f}" for x in (curves.mean(0) if len(curves) else [np.nan] * len(BUDGETS))) + " |")
    small = [i for i, b in enumerate(BUDGETS) if b <= 2e6]
    lead = all((out["B"]["nemesis"] or [0] * 5)[i] > max((out["B"][a] or [0] * 5)[i] for a in ADVERSARIES if a != "nemesis")
               for i in small)
    L += ["", f"**H-B verdict:** {'SUPPORTED' if lead else 'NOT SUPPORTED'} (nemesis leads at every budget ≤ 2M)", ""]
    out["B_verdict"] = bool(lead)

    # ---- C: search-space size ---------------------------------------------------------------------
    C = load_attack_runs(root / "C")
    small_g, full_g = by(C, "small"), by(A, "base")
    L += ["## C: small (friction, push, load) vs full search space, baseline target", "",
          "| Adversary | small | full (A, seeds 0-1) | relative drop |", "|---|---|---|---|"]
    out["C"] = {}
    for a in ADVERSARIES:
        s = [strict_stats(r)["strict"] for r in small_g.get(a, [])]
        f = [strict_stats(r)["strict"] for r in full_g.get(a, []) if r["args"]["seed"] in (0, 1)]
        drop = (np.mean(s) - np.mean(f)) / np.mean(s) if s and f and np.mean(s) > 0 else np.nan
        out["C"][a] = {"small": s, "full": f, "drop": None if np.isnan(drop) else float(drop)}
        L.append(f"| {a} | {fmt(s)} | {fmt(f)} | {drop:+.0%} |" if not np.isnan(drop) else f"| {a} | {fmt(s)} | {fmt(f)} | n/a |")
    blind = [out["C"][a]["drop"] for a in ("random", "box", "shuffled") if out["C"][a]["drop"] is not None]
    nd = out["C"]["nemesis"]["drop"]
    verdict_c = nd is not None and blind and nd < np.median(blind)
    L += ["", f"**H-C verdict:** {'SUPPORTED' if verdict_c else 'NOT SUPPORTED'} "
              f"(nemesis drop {nd if nd is None else f'{nd:+.0%}'} vs blind median "
              f"{np.median(blind) if blind else float('nan'):+.0%})", ""]
    out["C_verdict"] = bool(verdict_c)

    # ---- D: ablations -----------------------------------------------------------------------------
    D = load_attack_runs(root / "D")
    L += ["## D: Nemesis ablations (strict failures; 'full' = A's nemesis seeds 0-1)", "",
          "| Target | full | no Spark feedback | no history | Glimmer proposer |", "|---|---|---|---|---|"]
    out["D"] = {}
    for t in ("base", "dr"):
        full = [strict_stats(r)["strict"] for r in by(A, t).get("nemesis", []) if r["args"]["seed"] in (0, 1)]
        var = {v: [strict_stats(r)["strict"] for r in by(D, t).get(v, [])] for v in ("noobs", "nohist", "glimmer")}
        out["D"][t] = {"full": full, **var}
        L.append(f"| {t} | {fmt(full)} | {fmt(var['noobs'])} | {fmt(var['nohist'])} | {fmt(var['glimmer'])} |")
    mean = lambda v: np.mean(v) if v else np.nan  # noqa: E731
    fullm = np.nanmean([mean(out["D"][t]["full"]) for t in out["D"]])
    d1 = fullm > np.nanmean([mean(out["D"][t]["noobs"]) for t in out["D"]])
    d2 = fullm > np.nanmean([mean(out["D"][t]["nohist"]) for t in out["D"]])
    d3 = np.nanmean([mean(out["D"][t]["glimmer"]) for t in out["D"]]) >= 0.5 * fullm
    L += ["", f"**H-D1 (Spark feedback helps):** {'SUPPORTED' if d1 else 'NOT SUPPORTED'}",
          f"**H-D2 (history helps):** {'SUPPORTED' if d2 else 'NOT SUPPORTED'}",
          f"**H-D3 (Glimmer ≥ 50% of Wonder):** {'SUPPORTED' if d3 else 'NOT SUPPORTED'}", ""]
    out["D_verdicts"] = {"D1": bool(d1), "D2": bool(d2), "D3": bool(d3)}

    # ---- E: DR envelope widths (GPU) --------------------------------------------------------------
    if args.eval_e:
        from analyze import _summ
        from finetune import forward_nominal  # noqa: F401
        from gauntlet import load as load_gauntlet

        from nemesis.envs.base import load_env
        from nemesis.perturb.wrapper import NemesisWrapper
        from nemesis.sim.evaluate import Evaluator
        from nemesis.train.ppo import load_params

        gt = load_gauntlet()
        suite = np.concatenate([gt["hand"], gt["realistic"]])
        ev = Evaluator(NemesisWrapper(load_env()[0], base_dr=False), "runs/baseline_v2", horizon=250)
        policies = {}
        for w, pat in (("0.25", "E/dr_w0.25_s*"), ("0.5", "arms/dr_s*"), ("1.0", "E/dr_w1.0_s*")):
            policies[w] = [d / "round_2" for d in sorted(root.glob(pat)) if (d / "round_2" / "ckpts").exists()]
        out["E"] = {w: [_summ(ev(load_params(p), suite, seeds=args.seeds, key=2026))["fall"] for p in ps]
                    for w, ps in policies.items()}
        L += ["## E: DR envelope width (fall rate on hand-written + realistic gauntlet)", "",
              "| w | per seed | mean |", "|---|---|---|"]
        for w, v in out["E"].items():
            L.append(f"| {w} | {', '.join(f'{x:.3f}' for x in v)} | {np.mean(v) if v else float('nan'):.3f} |")
        ref = out["E"]["0.5"]
        worse = lambda v: v and min(v) > max(ref)  # noqa: E731
        verdict_e = bool(ref) and worse(out["E"]["0.25"]) and worse(out["E"]["1.0"])
        L += ["", f"**H-E verdict:** {'SUPPORTED' if verdict_e else 'NOT SUPPORTED'} "
                  "(both widths outside and above the w=0.5 seed range)", ""]
        out["E_verdict"] = verdict_e

    (root / "analysis").mkdir(parents=True, exist_ok=True)
    (root / "analysis" / "wide.json").write_text(json.dumps(out, indent=1, default=float))
    (root / "analysis" / "wide.md").write_text("\n".join(L) + "\n")
    print("\n".join(L))


if __name__ == "__main__":
    main()
