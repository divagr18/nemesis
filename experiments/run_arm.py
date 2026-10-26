"""One experimental arm: R rounds of (attack, then fine-tune on what was found), from a shared
baseline, with every env step charged to the arm's budget.

Arms:
  dr        no attack; fine-tune on uniform θ over a scaled envelope (domain randomization)
  random    attack = uniform θ over the full envelope; keep the ones that fail
  box       attack = CMA-ES over every θ slot at once (full-union, no LLM)
  shuffled  attack = CMA-ES over blind random programs (same op count as the LLM's)
  nemesis   attack = Muse Wonder programs + CMA-ES + shrink + Muse Spark observations

Budget matching (--match):
  total     DR gets the adversary's attack budget as extra fine-tuning steps
  training  every arm gets the same fine-tuning steps; attack steps are reported separately

Writes runs/<out>/round_<r>/ (policy), atlas.jsonl, discovery.jsonl (one line per new failure
mode: cumulative env steps, mode), and budget.json.

usage: python experiments/run_arm.py --arm nemesis --seed 0 --out runs/arms/nemesis_s0
"""

import argparse
import json
import pickle
import sys
import time
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).parent))

from nemesis.adversary import cmaes  # noqa: E402
from nemesis.adversary.archive import Archive  # noqa: E402
from nemesis.adversary.bank import curate  # noqa: E402
from nemesis.adversary.baselines import BoxProgram, envelope, random_program, random_thetas  # noqa: E402
from nemesis.adversary.modes import signature  # noqa: E402
from nemesis.adversary.observe import observe_failure  # noqa: E402
from nemesis.adversary.proposer import propose  # noqa: E402
from nemesis import config  # noqa: E402
from nemesis.envs.base import load_env  # noqa: E402
from nemesis.perturb import canonical as C  # noqa: E402
from nemesis.perturb.dsl import compile_program  # noqa: E402
from nemesis.perturb.wrapper import NemesisWrapper  # noqa: E402
from nemesis.sim.evaluate import Evaluator  # noqa: E402
from nemesis.train.ppo import load_params, train  # noqa: E402

CHECK_SEEDS = 32


class Ledger:
    """Env-step accounting plus the discovery curve (first time each failure mode is seen)."""

    def __init__(self, out: Path):
        self.steps = {"attack": 0, "finetune": 0}
        self.modes = set()
        self.f = open(out / "discovery.jsonl", "a")

    def charge(self, kind: str, n: int):
        self.steps[kind] += int(n)

    def failure(self, mode: tuple, rnd: int):
        if mode not in self.modes:
            self.modes.add(mode)
            self.f.write(json.dumps({"attack_steps": self.steps["attack"], "total_steps": sum(self.steps.values()),
                                     "round": rnd, "mode": list(mode), "n_modes": len(self.modes)}) + "\n")
            self.f.flush()


def check_and_archive(ev, params, thetas, names, rnd, archive, ledger, source, extra=None):
    """Re-evaluates candidate failures on fresh seeds; archives and logs the ones that hold."""
    if len(thetas) == 0:
        return
    res = ev(params, np.stack(thetas), seeds=CHECK_SEEDS, key=99)
    ledger.charge("attack", len(thetas) * CHECK_SEEDS * ev.horizon)
    for j, th in enumerate(thetas):
        fail_rate = float(res["fell"][j].mean())
        found = fail_rate >= cmaes.FAIL_RATE
        mode = signature(th, res, j) if found else None
        rec = archive.add(round=rnd, name=names[j], found=found, fail_rate=fail_rate, theta=th,
                          cost=float(cmaes.plausibility_cost(th[None])[0]), theta_desc=C.describe(th),
                          mode=list(mode) if mode else None, source=source,
                          hypothesis=(extra or {}).get(names[j], {}).get("hypothesis", ""),
                          spark=(extra or {}).get(names[j], {}).get("spark"))
        if found:
            ledger.failure(mode, rnd)
        yield rec


def attack(arm, ev, params, rnd, args, archive, ledger, out, observations):
    """Spends ~args.attack_steps env steps on the arm's adversary."""
    budget = args.attack_steps
    start = ledger.steps["attack"]
    used = lambda: ledger.steps["attack"] - start  # noqa: E731
    rng = np.random.default_rng(args.seed * 1000 + rnd)

    if arm == "random":
        batch_cost = args.pop * args.per_round * args.search_seeds * ev.horizon
        while budget - used() >= batch_cost:
            th = random_thetas(args.pop * args.per_round, rng, width=1.0)
            res = ev(params, th, seeds=args.search_seeds, key=rnd)
            ledger.charge("attack", len(th) * args.search_seeds * ev.horizon)
            cands = [th[i] for i in np.flatnonzero(res["fell"].mean(1) >= cmaes.SEARCH_FAIL)][:32]
            list(check_and_archive(ev, params, cands, [f"random_r{rnd}"] * len(cands), rnd, archive, ledger, arm))
        return

    batch = 0
    per_gen = args.per_round * args.pop * args.search_seeds * ev.horizon
    while True:
        # Never start a search the remaining budget cannot pay for (shrink and fresh-seed checks
        # add a small, logged overshoot).
        gens_now = min(args.gens, (budget - used()) // per_gen)
        if gens_now < 2:
            break
        extra = {}
        if arm == "nemesis":
            programs = propose(n=args.per_round, history=archive.history_for_prompt(),
                               observations=observations, seed=args.seed * 100 + rnd * 10 + batch,
                               model=args.proposer)
            for p in programs:
                extra[p.name] = {"hypothesis": p.hypothesis}
            compiled = [compile_program(p) for p in programs]
        elif arm == "shuffled":
            compiled = [compile_program(random_program(int(rng.integers(1, 4)), int(rng.integers(1e9))))
                        for _ in range(args.per_round)]
        elif arm == "box":
            compiled = [BoxProgram() for _ in range(args.per_round)]  # independent restarts
        results = cmaes.search_many(ev, params, compiled, pop=args.pop, gens=gens_now,
                                    seeds=args.search_seeds, key=args.seed * 100 + rnd * 10 + batch,
                                    slots=args.per_round)
        thetas, names = [], []
        for k, r in enumerate(results):
            ledger.charge("attack", r.env_steps)
            if not r.found_failure:
                continue
            th, s_steps = cmaes.shrink(ev, params, r.best_theta, seeds=args.search_seeds)
            ledger.charge("attack", s_steps)
            name = r.program.program.name if getattr(r.program, "program", None) else f"{arm}_r{rnd}_{batch}_{k}"
            thetas.append(th), names.append(name)
            with open(out / f"history_r{rnd}_b{batch}_k{k}.pkl", "wb") as f:
                pickle.dump(r.history, f)
        for rec in check_and_archive(ev, params, thetas, names, rnd, archive, ledger, arm, extra):
            if arm == "nemesis" and rec["found"] and not args.no_observe:
                clip = out / "clips" / f"r{rnd}_{rec['id']}.mp4"
                spark = observe_failure(ev, params, np.array(rec["theta"], np.float32), clip)
                ledger.charge("attack", 9 * ev.horizon)  # Spark's probe and recorded rollouts
                observations.append(f"{rec['name']}: {spark['mode']}: {spark['what_happened']} "
                                    f"Likely cause: {spark['likely_cause']}")
        batch += 1


def history_bank(out: Path, seed: int, per_program: int = 32) -> np.ndarray:
    """Failing candidates (>= SEARCH_FAIL) from every CMA search that found a failure, up to
    per_program each: the same diverse-cloud bank construction as experiments/finetune.py."""
    rng = np.random.default_rng(seed)
    parts = []
    for f in sorted(out.glob("history_r*.pkl")):
        hist = pickle.load(open(f, "rb"))
        cands = np.concatenate([g["thetas"][g["fail_rate"] >= cmaes.SEARCH_FAIL] for g in hist])
        parts.append(cands[rng.permutation(len(cands))[:per_program]])
    return np.concatenate(parts) if parts else np.zeros((0, C.D), np.float32)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--arm", required=True, choices=["dr", "random", "box", "shuffled", "nemesis"])
    ap.add_argument("--base", default="runs/baseline_v2")
    ap.add_argument("--out", required=True)
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--rounds", type=int, default=3)
    ap.add_argument("--attack-steps", type=int, default=10_000_000)
    ap.add_argument("--ft-steps", type=int, default=40_000_000)
    ap.add_argument("--match", choices=["total", "training"], default="total")
    ap.add_argument("--dr-width", type=float, default=0.5)
    ap.add_argument("--per-round", type=int, default=8)
    ap.add_argument("--pop", type=int, default=24)
    ap.add_argument("--gens", type=int, default=12)
    ap.add_argument("--search-seeds", type=int, default=8)
    ap.add_argument("--horizon", type=int, default=250)
    ap.add_argument("--no-observe", action="store_true")
    ap.add_argument("--lr", type=float, default=1e-4, help="fine-tuning learning rate (resume)")
    ap.add_argument("--proposer", default=config.WONDER,
                    help="nemesis arm's proposer: muse-wonder-1.0 (API) or glimmer (open weights, llama.cpp)")
    args = ap.parse_args()

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    (out / "args.json").write_text(json.dumps(vars(args), indent=1))
    archive = Archive(out / "atlas.jsonl")
    ledger = Ledger(out)
    observations: list[str] = []
    policy = args.base

    for rnd in range(args.rounds):
        t0 = time.time()
        ev = Evaluator(NemesisWrapper(load_env()[0], base_dr=False), policy, horizon=args.horizon)
        params = load_params(policy)
        if args.arm != "dr":
            attack(args.arm, ev, params, rnd, args, archive, ledger, out, observations)

        ft_steps = args.ft_steps
        if args.arm == "dr":
            lo, hi = envelope(args.dr_width)
            env = NemesisWrapper(load_env()[0], uniform=True, nominal_frac=0.5, lo=lo, hi=hi)
            if args.match == "total":
                ft_steps += args.attack_steps
        else:
            raw = np.concatenate([archive.thetas(failures_only=True), history_bank(out, args.seed)])
            cur = curate(ev, params, raw)
            with open(out / f"bank_r{rnd}.json", "w") as f:
                json.dump(cur["report"], f, indent=1)
            print(f"round {rnd} bank: {cur['report']}", flush=True)
            bank, weights = cur["bank"], cur["weights"]
            if len(bank) == 0:
                print(f"round {rnd}: no usable counterexamples; fine-tuning on nominal + uniform only")
                bank, weights = C.neutral()[None], None
            lo, hi = envelope(0.25)
            env = NemesisWrapper(load_env()[0], bank=bank, bank_weights=weights, nominal_frac=0.5,
                                 uniform_frac=0.1, lo=lo, hi=hi)
        run_dir = out / f"round_{rnd}"
        _, _, actual = train(run_dir=run_dir, num_timesteps=ft_steps, num_evals=3, seed=args.seed * 10 + rnd,
                             restore_params=load_params(policy), env=env, learning_rate=args.lr,
                             eval_env=NemesisWrapper(load_env()[0], nominal_frac=1.0))
        ledger.charge("finetune", actual)  # Brax rounds the budget up; charge what actually ran
        policy = str(run_dir)
        print(f"round {rnd} done in {time.time() - t0:.0f}s: {len(archive.failures())} failures, "
              f"{len(ledger.modes)} modes, steps {ledger.steps}", flush=True)
        (out / "budget.json").write_text(json.dumps({"steps": ledger.steps, "modes": len(ledger.modes),
                                                     "failures": len(archive.failures()),
                                                     "final_policy": policy}, indent=1))


if __name__ == "__main__":
    main()
