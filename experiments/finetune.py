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
from nemesis.adversary.bank import curate  # noqa: E402
from nemesis.adversary.baselines import envelope, random_thetas  # noqa: E402
from nemesis.envs.base import load_env  # noqa: E402
from nemesis.perturb import canonical as C  # noqa: E402
from nemesis.perturb.dsl import K_MAX, compile_program  # noqa: E402
from nemesis.perturb.wrapper import NemesisWrapper  # noqa: E402
from nemesis.sim.evaluate import Evaluator  # noqa: E402
from nemesis.train.ppo import load_params, train  # noqa: E402


def held_out_thetas(n_uniform: int = 256, seed: int = 123):
    """Hand-written attacks at 4 severities + uniform samples of the envelope at two widths."""
    hand = []
    for p in PROGRAMS:
        c = compile_program(p)
        for lv in (0.25, 0.5, 0.75, 1.0):
            u = np.full(K_MAX, lv, np.float32)
            harsh_is_lo = p["name"] in ("ice", "rear slip", "weak rear knees", "reversal on ice")
            hand.append(np.asarray(c.theta_unit(1 - u if harsh_is_lo else u)))
    rng = np.random.default_rng(seed)
    return np.stack(hand), random_thetas(n_uniform, rng, width=0.25), random_thetas(n_uniform, rng, width=0.5)


def history_failures(archive, hunt_dir: Path, per_program: int, seed: int = 0) -> np.ndarray:
    """Failing candidates (>= SEARCH_FAIL during search) from the CMA histories of programs that
    broke the robot: a diverse cloud around each failure mode, not just its minimal version."""
    import pickle

    from nemesis.adversary.cmaes import SEARCH_FAIL

    rng = np.random.default_rng(seed)
    out = []
    for rec in archive.failures():
        hist = pickle.load(open(hunt_dir / f"history_{rec['id']}.pkl", "rb"))
        hist = hist["gens"] if isinstance(hist, dict) else hist
        cands = np.concatenate([g["thetas"][g["fail_rate"] >= SEARCH_FAIL] for g in hist])
        if len(cands):
            out.append(cands[rng.permutation(len(cands))[:per_program]])
    return np.concatenate(out) if out else np.zeros((0, C.D), np.float32)


def summarize(res) -> dict:
    """Fall rate, success, and CVaR@10% of the robustness margin (mean of the worst 10% of
    scenarios; continuous, so it does not saturate when the worst scenarios all fall)."""
    per_scenario = res["robustness"].mean(1)
    k = max(1, int(np.ceil(0.1 * len(per_scenario))))
    return {"fall_rate": float(res["fell"].mean()), "success": float(res["success"].mean()),
            "cvar10_robustness": float(np.sort(per_scenario)[:k].mean()),
            "progress_m": float(res["progress"].mean())}


def forward_nominal() -> np.ndarray:
    """Nominal physics with a fixed 1 m/s forward command (so progress is meaningful)."""
    th = C.neutral()
    th[C.INDEX["command_mode"]] = 1.0
    th[C.INDEX["command_a"]] = th[C.INDEX["command_b"]] = [1.0, 0.0, 0.0]
    return th


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="runs/baseline_v2")
    ap.add_argument("--atlas", default="runs/hunt_r1/atlas.jsonl")
    ap.add_argument("--out", default="runs/ft_r1")
    ap.add_argument("--steps", type=int, default=50_000_000)
    ap.add_argument("--evals", type=int, default=5)
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--per-program", type=int, default=32, help="history failures per broken program")
    ap.add_argument("--uniform-width", type=float, default=0.25, help="envelope width of the 10% uniform slice")
    ap.add_argument("--eval-only", action="store_true", help="skip training; re-run the comparison")
    ap.add_argument("--no-curate", action="store_true", help="skip learnability/feasibility curation")
    ap.add_argument("--lr", type=float, default=1e-4, help="fine-tuning learning rate (resume)")
    args = ap.parse_args()

    # Cumulative bank across every given atlas (comma-separated), so earlier fixes are replayed.
    parts, n_shrunk = [], 0
    for path in args.atlas.split(","):
        archive = Archive(path)
        parts.append(archive.thetas(failures_only=True))
        n_shrunk += len(archive.failures())
        if args.per_program:
            parts.append(history_failures(archive, Path(path).parent, args.per_program))
    bank = np.concatenate(parts) if parts else np.zeros((0, C.D), np.float32)
    if len(bank) == 0:
        sys.exit("no counterexamples in the atlas")
    print(f"training bank: {len(bank)} counterexamples "
          f"({n_shrunk} shrunk failures + search-history failures)")
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    np.save(out / "bank.npy", bank)

    if not args.eval_only:
        weights = None
        if not args.no_curate:
            ev0 = Evaluator(NemesisWrapper(load_env()[0], base_dr=False), args.base, horizon=250)
            cur = curate(ev0, load_params(args.base), bank)
            (out / "bank_report.json").write_text(json.dumps(cur["report"], indent=1))
            print(f"curated bank: {cur['report']}")
            bank, weights = cur["bank"], cur["weights"]
        lo, hi = envelope(args.uniform_width)
        env = NemesisWrapper(load_env()[0], bank=bank, bank_weights=weights, nominal_frac=0.5,
                             uniform_frac=0.1, lo=lo, hi=hi)
        eval_env = NemesisWrapper(load_env()[0], nominal_frac=1.0)
        train(run_dir=out, num_timesteps=args.steps, num_evals=args.evals, seed=args.seed,
              restore_params=load_params(args.base), env=env, eval_env=eval_env, learning_rate=args.lr)

    # Before/after on identical scenarios and seeds.
    ev = Evaluator(NemesisWrapper(load_env()[0], base_dr=False), args.base, horizon=250)
    hand, uni25, uni50 = held_out_thetas()
    suites = {"nominal": forward_nominal()[None], "train_bank": bank, "heldout_hand": hand,
              "heldout_env25": uni25, "heldout_env50": uni50}
    report = {}
    for label, run in (("before", args.base), ("after", str(out))):
        params = load_params(run)
        report[label] = {name: summarize(ev(params, th, seeds=16, key=7)) for name, th in suites.items()}
    (out / "comparison.json").write_text(json.dumps(report, indent=1))
    for name in suites:
        b, a = report["before"][name], report["after"][name]
        print(f"{name:16s} fall {b['fall_rate']:.3f} -> {a['fall_rate']:.3f}   "
              f"CVaR10(robust) {b['cvar10_robustness']:+.3f} -> {a['cvar10_robustness']:+.3f}   "
              f"progress {b['progress_m']:.1f} -> {a['progress_m']:.1f} m")


if __name__ == "__main__":
    main()
