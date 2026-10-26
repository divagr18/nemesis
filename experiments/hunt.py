"""One Nemesis hunt: Wonder proposes programs, CMA-ES finds each one's most plausible failure,
failures are shrunk to their minimal form and archived with their search history.

usage: python experiments/hunt.py --run runs/baseline_v2 --out runs/hunt_r0 --rounds 2 --per-round 8
"""

import argparse
import json
import pickle
import time
from pathlib import Path

import numpy as np

from nemesis.adversary import cmaes
from nemesis.adversary.archive import Archive
from nemesis.adversary.proposer import propose
from nemesis.envs.base import load_env
from nemesis.perturb import canonical as C
from nemesis.perturb.dsl import compile_program
from nemesis.perturb.wrapper import NemesisWrapper
from nemesis.sim.evaluate import Evaluator
from nemesis.train.ppo import load_params


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--run", default="runs/baseline_v2")
    ap.add_argument("--out", default="runs/hunt_r0")
    ap.add_argument("--rounds", type=int, default=2)
    ap.add_argument("--per-round", type=int, default=8)
    ap.add_argument("--pop", type=int, default=24)
    ap.add_argument("--gens", type=int, default=12)
    ap.add_argument("--seeds", type=int, default=8)
    ap.add_argument("--horizon", type=int, default=300)
    args = ap.parse_args()

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    archive = Archive(out / "atlas.jsonl")
    env = NemesisWrapper(load_env()[0], base_dr=False)
    ev = Evaluator(env, args.run, horizon=args.horizon)
    params = load_params(args.run)

    nominal = ev(params, C.neutral()[None], seeds=32)
    print(f"nominal: fall rate {nominal['fell'].mean():.2f}, success {nominal['success'].mean():.2f}")

    total_steps = 0
    for rnd in range(args.rounds):
        t0 = time.time()
        programs = propose(n=args.per_round, history=archive.history_for_prompt(), seed=rnd)
        print(f"\n=== round {rnd}: {len(programs)} programs from Wonder ({time.time() - t0:.0f}s)")
        for p in programs:
            c = compile_program(p)
            t1 = time.time()
            res = cmaes.search(ev, params, c, pop=args.pop, gens=args.gens, seeds=args.seeds, key=rnd)
            steps = res.env_steps
            theta, shrink_steps = res.best_theta, 0
            if res.found_failure:
                theta, shrink_steps = cmaes.shrink(ev, params, res.best_theta, seeds=args.seeds)
            final = ev(params, theta[None], seeds=32, key=99)  # fresh seeds for the reported rate
            fail_rate = float(final["fell"].mean())
            found = fail_rate >= cmaes.FAIL_RATE
            total_steps += steps + shrink_steps + 32 * args.horizon
            rec = archive.add(
                round=rnd, name=p.name, hypothesis=p.hypothesis, program=p.model_dump(),
                found=found, fail_rate=fail_rate, cost=float(cmaes.plausibility_cost(theta[None])[0]),
                time_to_fall=float(final["time_to_fall"].mean()), theta=theta,
                theta_desc=C.describe(theta), searched_fail_rate=res.best_fail_rate,
                env_steps=steps + shrink_steps, policy=args.run, source="llm+cma",
            )
            with open(out / f"history_{rec['id']}.pkl", "wb") as f:
                pickle.dump(res.history, f)
            print(f"  {'BROKE ' if found else 'held  '} {p.name:40s} fall={fail_rate:.2f} "
                  f"cost={rec['cost']:.2f} gens={len(res.history)} ({time.time() - t1:.0f}s)  {rec['theta_desc']}")

    fails = archive.failures()
    summary = {"programs": len(archive.records), "failures": len(fails), "env_steps": total_steps}
    (out / "summary.json").write_text(json.dumps(summary, indent=1))
    print(f"\n{summary}")


if __name__ == "__main__":
    main()
