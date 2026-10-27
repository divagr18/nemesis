"""Job lists for the pre-registered wide sweep (docs/PREREGISTRATION.md), split across boxes.

    python experiments/widesweep_jobs.py A 5     # print 5 shell chains (one per box) for experiment A
Each chain is a ';'-joined list of commands to pass to `scripts/fleet.sh run <i> "<chain>"`.
"""

import sys

ADVERSARIES = ["nemesis", "shuffled", "box", "random"]
TARGETS = {"dr": "runs/targets/dr_s1", "nem": "runs/targets/nemesis_s0", "base": "runs/baseline_v2"}
COST = {"box": 3, "nemesis": 2, "shuffled": 2, "random": 1}  # relative wall time, for balancing


def run(arm, seed, out, *extra):
    flags = " ".join(extra)
    return (f"python -W ignore experiments/run_arm.py --arm {arm} --seed {seed} --out {out} {flags} "
            f"> {out}.log 2>&1")


def jobs(exp: str) -> list[tuple[int, str]]:
    J = []
    if exp == "A":  # hard targets, attack-only; budget curve (B) comes from the same logs
        for t, path in TARGETS.items():
            for arm in ADVERSARIES:
                for s in range(3):
                    J.append((COST[arm], run(arm, s, f"runs/A/{t}_{arm}_s{s}", f"--base {path}",
                                             "--attack-only --rounds 1 --attack-steps 10000000")))
    elif exp == "C":  # small search space (friction, push, load) on the baseline; full space = A's base runs
        for arm in ADVERSARIES:
            for s in range(2):
                J.append((COST[arm], run(arm, s, f"runs/C/small_{arm}_s{s}", "--base runs/baseline_v2",
                                         "--families friction,push,load",
                                         "--attack-only --rounds 1 --attack-steps 10000000")))
    elif exp == "D":  # nemesis ablations; 'full' = A's nemesis runs (seeds 0,1) on the same targets
        for t in ("base", "dr"):
            for s in range(2):
                for name, flags in (("noobs", "--no-observe"), ("nohist", "--no-history"),
                                    ("glimmer", "--proposer glimmer")):
                    J.append((2, run("nemesis", s, f"runs/D/{t}_{name}_s{s}", f"--base {TARGETS[t]}", flags,
                                     "--attack-only --rounds 1 --attack-steps 10000000")))
    elif exp == "E":  # DR envelope width (w=0.5 is the main sweep)
        for w in ("0.25", "1.0"):
            for s in range(3):
                J.append((6, run("dr", s, f"runs/E/dr_w{w}_s{s}", f"--dr-width {w}")))
    elif exp == "S":  # terrain (pre-registered H-S): full space now includes stairs/curbs
        for t in ("base", "dr"):
            for arm in ("nemesis", "shuffled", "box"):
                for s in range(3):
                    J.append((COST[arm], run(arm, s, f"runs/S/{t}_{arm}_s{s}", f"--base {TARGETS[t]}",
                                             "--attack-only --rounds 1 --attack-steps 10000000")))
    else:
        raise SystemExit(f"unknown experiment {exp}")
    return J


def split(J: list[tuple[int, str]], n: int) -> list[str]:
    """Greedy longest-first assignment of jobs to n boxes."""
    boxes = [[0, []] for _ in range(n)]
    for cost, cmd in sorted(J, key=lambda j: -j[0]):
        b = min(boxes, key=lambda x: x[0])
        b[0] += cost
        b[1].append(cmd)
    return ["mkdir -p runs/" + ("A" if "runs/A/" in b[1][0] else b[1][0].split("runs/")[1].split("/")[0])
            + "; " + "; ".join(b[1]) for b in boxes if b[1]]


if __name__ == "__main__":
    exp, n = sys.argv[1], int(sys.argv[2])
    for chain in split(jobs(exp), n):
        print(chain)
