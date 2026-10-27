"""Experiment F (pre-registered): can Nemesis repair what a DR-trained policy still gets wrong?

For a DR-trained target policy:
  1. collect the failures Nemesis found against it (attack-only runs from experiments A/F);
  2. split them by program into a training half and a held-out half;
  3. (i)  fine-tune the DR policy on the curated training half (50/40/10 mix, lr 1e-4, 40M steps)
     (ii) continue DR (w=0.5) from the same policy for the same 40M steps;
  4. evaluate the original, (i) and (ii) on the held-out residual failures and on the locked
     gauntlet (hand-written + realistic).

usage: python experiments/residual_repair.py --target runs/targets/dr_s1 \
           --attacks runs/A/dr_nemesis_s0,runs/A/dr_nemesis_s1,runs/A/dr_nemesis_s2 --out runs/F/dr_s1
"""

import argparse
import json
import pickle
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).parent))
from analyze import _summ  # noqa: E402
from gauntlet import load as load_gauntlet  # noqa: E402

from nemesis.adversary.archive import Archive  # noqa: E402
from nemesis.adversary.bank import curate  # noqa: E402
from nemesis.adversary.baselines import envelope  # noqa: E402
from nemesis.adversary.cmaes import SEARCH_FAIL  # noqa: E402
from nemesis.envs.base import load_env  # noqa: E402
from nemesis.perturb import canonical as C  # noqa: E402
from nemesis.perturb.wrapper import NemesisWrapper  # noqa: E402
from nemesis.sim.evaluate import Evaluator  # noqa: E402
from nemesis.train.ppo import load_params, train  # noqa: E402


def collect(attack_dirs: list[Path]):
    """[(program_key, shrunk θ, [history-cloud θ...]), ...] for every failure found."""
    items = []
    for d in attack_dirs:
        hists = {}
        for f in d.glob("history_*.pkl"):
            h = pickle.load(open(f, "rb"))
            if isinstance(h, dict):
                hists[h["program"]] = np.concatenate([g["thetas"][g["fail_rate"] >= SEARCH_FAIL] for g in h["gens"]])
        for rec in Archive(d / "atlas.jsonl").failures():
            cloud = hists.get(rec["name"], np.zeros((0, C.D), np.float32))
            items.append((f"{d.name}/{rec['name']}", np.array(rec["theta"], np.float32), cloud[:32]))
    return items


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--target", required=True)
    ap.add_argument("--attacks", required=True, help="comma-separated attack-only run dirs")
    ap.add_argument("--out", required=True)
    ap.add_argument("--steps", type=int, default=40_000_000)
    ap.add_argument("--seeds", type=int, default=16)
    args = ap.parse_args()
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)

    items = collect([Path(p) for p in args.attacks.split(",")])
    rng = np.random.default_rng(0)
    order = rng.permutation(len(items))
    train_items = [items[i] for i in order[: len(items) // 2]]
    held_items = [items[i] for i in order[len(items) // 2:]]
    print(f"{len(items)} residual failures: {len(train_items)} train / {len(held_items)} held-out", flush=True)
    if not train_items or not held_items:
        sys.exit("not enough residual failures to split")
    train_bank = np.concatenate([np.stack([t for _, t, _ in train_items])] + [c for _, _, c in train_items if len(c)])
    held = np.stack([t for _, t, _ in held_items])
    (out / "split.json").write_text(json.dumps({"train": [k for k, _, _ in train_items],
                                                "held_out": [k for k, _, _ in held_items]}, indent=1))

    ev = Evaluator(NemesisWrapper(load_env()[0], base_dr=False), args.target, horizon=250)
    base = load_params(args.target)

    # (i) Nemesis repair: curated residual bank.
    cur = curate(ev, base, train_bank)
    print(f"curated: {cur['report']}", flush=True)
    lo, hi = envelope(0.25)
    env = NemesisWrapper(load_env()[0], bank=cur["bank"] if len(cur["bank"]) else C.neutral()[None],
                         bank_weights=cur["weights"] if len(cur["bank"]) else None,
                         nominal_frac=0.5, uniform_frac=0.1, lo=lo, hi=hi)
    train(run_dir=out / "repair", num_timesteps=args.steps, num_evals=3, seed=1, restore_params=base, env=env,
          eval_env=NemesisWrapper(load_env()[0], nominal_frac=1.0), learning_rate=1e-4)

    # (ii) Control: continue DR (w=0.5) for the same steps.
    lo, hi = envelope(0.5)
    env = NemesisWrapper(load_env()[0], uniform=True, nominal_frac=0.5, lo=lo, hi=hi)
    train(run_dir=out / "dr_continue", num_timesteps=args.steps, num_evals=3, seed=1, restore_params=base, env=env,
          eval_env=NemesisWrapper(load_env()[0], nominal_frac=1.0), learning_rate=1e-4)

    g = load_gauntlet()
    suites = {"held_out_residuals": held, "gauntlet": np.concatenate([g["hand"], g["realistic"]])}
    report = {}
    for name, run in (("original", args.target), ("nemesis_repair", out / "repair"), ("dr_continue", out / "dr_continue")):
        params = load_params(run)
        report[name] = {k: _summ(ev(params, th, seeds=args.seeds, key=31)) for k, th in suites.items()}
        print(name, {k: round(v["fall"], 3) for k, v in report[name].items()}, flush=True)
    (out / "report.json").write_text(json.dumps(report, indent=1))


if __name__ == "__main__":
    main()
