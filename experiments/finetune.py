"""One counterexample-guided fine-tuning round, then a before/after comparison.

Resumes PPO from a policy's latest checkpoint and trains on the mix
  50% nominal / 40% archived counterexamples / 10% uniform over the envelope,
then evaluates old vs new on nominal, on the training counterexamples, and on held-out
scenarios the fine-tune never saw (hand-written attacks + uniform envelope samples).

usage: python experiments/finetune.py --base runs/baseline_v2 --atlas runs/hunt_r1/atlas.jsonl \
           --out runs/ft_r1 --steps 50000000
"""

import argparse
import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).parent))
from g2_attacks import PROGRAMS  # held-out, hand-written attacks  # noqa: E402

from nemesis.adversary.archive import Archive  # noqa: E402
from nemesis.adversary.baselines import random_thetas  # noqa: E402
from nemesis.envs.base import load_env  # noqa: E402
from nemesis.perturb import canonical as C  # noqa: E402
from nemesis.perturb.dsl import K_MAX, compile_program  # noqa: E402
from nemesis.perturb.wrapper import NemesisWrapper  # noqa: E402
from nemesis.sim.evaluate import Evaluator  # noqa: E402
from nemesis.train.ppo import load_params, train  # noqa: E402


def held_out_thetas(n_uniform: int = 256, seed: int = 123):
    """Hand-written attacks at 4 severities + a uniform sample of the envelope."""
    hand = []
    for p in PROGRAMS:
        c = compile_program(p)
        for lv in (0.25, 0.5, 0.75, 1.0):
            u = np.full(K_MAX, lv, np.float32)
            harsh_is_lo = p["name"] in ("ice", "rear slip", "weak rear knees", "reversal on ice")
            hand.append(np.asarray(c.theta_unit(1 - u if harsh_is_lo else u)))
    return np.stack(hand), random_thetas(n_uniform, np.random.default_rng(seed))


def summarize(res) -> dict:
    fell = res["fell"]
    per_scenario = fell.mean(1)
    k = max(1, int(np.ceil(0.1 * len(per_scenario))))
    return {"fall_rate": float(fell.mean()), "success": float(res["success"].mean()),
            "cvar10_fall": float(np.sort(per_scenario)[-k:].mean()),
            "progress_m": float(res["progress"].mean())}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="runs/baseline_v2")
    ap.add_argument("--atlas", default="runs/hunt_r1/atlas.jsonl")
    ap.add_argument("--out", default="runs/ft_r1")
    ap.add_argument("--steps", type=int, default=50_000_000)
    ap.add_argument("--evals", type=int, default=5)
    ap.add_argument("--seed", type=int, default=0)
    args = ap.parse_args()

    bank = Archive(args.atlas).thetas(failures_only=True)
    if len(bank) == 0:
        sys.exit("no counterexamples in the atlas")
    print(f"training bank: {len(bank)} counterexamples")
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    np.save(out / "bank.npy", bank)

    env = NemesisWrapper(load_env()[0], bank=bank, nominal_frac=0.5, uniform_frac=0.1)
    eval_env = NemesisWrapper(load_env()[0], nominal_frac=1.0)
    train(run_dir=out, num_timesteps=args.steps, num_evals=args.evals, seed=args.seed,
          restore_params=load_params(args.base), env=env, eval_env=eval_env)

    # Before/after on identical scenarios and seeds.
    ev = Evaluator(NemesisWrapper(load_env()[0], base_dr=False), args.base, horizon=250)
    hand, uniform = held_out_thetas()
    suites = {"nominal": C.neutral()[None], "train_bank": bank, "heldout_hand": hand,
              "heldout_uniform": uniform}
    report = {}
    for label, run in (("before", args.base), ("after", str(out))):
        params = load_params(run)
        report[label] = {name: summarize(ev(params, th, seeds=16, key=7)) for name, th in suites.items()}
    (out / "comparison.json").write_text(json.dumps(report, indent=1))
    for name in suites:
        b, a = report["before"][name], report["after"][name]
        print(f"{name:16s} fall {b['fall_rate']:.3f} -> {a['fall_rate']:.3f}   "
              f"CVaR10 {b['cvar10_fall']:.3f} -> {a['cvar10_fall']:.3f}   "
              f"progress {b['progress_m']:.1f} -> {a['progress_m']:.1f} m")


if __name__ == "__main__":
    main()
