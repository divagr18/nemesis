"""Gate G2: hand-written attack programs vs a trained policy.

Evaluates nominal plus each program at a few fixed settings under common random seeds, prints
failure rates, and renders a 2x2 grid of the worst rollouts from their logged trajectories.

usage: python experiments/g2_attacks.py --run runs/baseline_v2
"""

import argparse
import json
from pathlib import Path

import numpy as np

from nemesis.envs.base import load_env
from nemesis.perturb import canonical as C
from nemesis.perturb.dsl import K_MAX, compile_program
from nemesis.perturb.wrapper import NemesisWrapper
from nemesis.sim.evaluate import Evaluator
from nemesis.sim.render import render_qpos, save_video, tile
from nemesis.train.ppo import load_params

FORWARD = {"op": "command", "a": [1.0, 0, 0]}
PROGRAMS = [
    {"name": "ice", "hypothesis": "all-feet low friction", "ops": [FORWARD, {"op": "friction", "feet": ["FR", "FL", "RR", "RL"], "mu": [0.05, 1.0]}]},
    {"name": "rear slip", "hypothesis": "rear feet lose grip", "ops": [FORWARD, {"op": "friction", "feet": ["RR", "RL"], "mu": [0.05, 1.0]}]},
    {"name": "side shove", "hypothesis": "lateral push mid-stride", "ops": [FORWARD, {"op": "push", "force_y": [0, 150], "start": 2.0, "duration": 0.2}]},
    {"name": "heavy pack", "hypothesis": "payload high and back", "ops": [FORWARD, {"op": "payload", "mass": [0, 5], "offset_x": -0.1, "offset_z": 0.1}]},
    {"name": "weak rear knees", "hypothesis": "rear calf motors derated", "ops": [FORWARD, {"op": "motor", "legs": ["RR", "RL"], "joints": ["calf"], "strength": [0.3, 1.0]}]},
    {"name": "reversal on ice", "hypothesis": "sudden reversal while slipping", "ops": [{"op": "command", "a": [1.2, 0, 0], "b": [-1.2, 0, 0], "switch": 2.0}, {"op": "friction", "feet": ["FR", "FL", "RR", "RL"], "mu": [0.1, 1.0]}]},
    {"name": "lag", "hypothesis": "40 ms action latency + sensor noise", "ops": [FORWARD, {"op": "latency", "steps": [0, 2]}, {"op": "sensor_noise", "std": [0, 0.3]}]},
    {"name": "uphill", "hypothesis": "steep incline", "ops": [FORWARD, {"op": "slope", "pitch": [0, 0.3]}]},
]
LEVELS = [0.0, 0.25, 0.5, 0.75, 1.0]  # u for every free param: 0 = lo (harshest for most ops listed as [harsh, mild])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--run", default="runs/baseline_v2")
    ap.add_argument("--seeds", type=int, default=16)
    ap.add_argument("--out", default="runs/g2")
    args = ap.parse_args()

    env = NemesisWrapper(load_env()[0], base_dr=False)
    ev = Evaluator(env, args.run, horizon=300)
    params = load_params(args.run)

    thetas, labels = [], []
    for p in PROGRAMS:
        c = compile_program(p)
        for lv in LEVELS:
            u = np.full(K_MAX, lv, np.float32)
            # Free ranges are written [harsh, mild] for friction/strength and [mild, harsh] otherwise.
            harsh_is_lo = p["name"] in ("ice", "rear slip", "weak rear knees", "reversal on ice")
            thetas.append(np.asarray(c.theta_unit(1 - u if harsh_is_lo else u)))
            labels.append((p["name"], lv))
    thetas.append(C.neutral())
    labels.append(("nominal", 0.0))

    res = ev(params, np.stack(thetas), seeds=args.seeds)
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    rows = []
    for i, (name, lv) in enumerate(labels):
        rows.append({"program": name, "severity": lv, "fall_rate": float(res["fell"][i].mean()),
                     "success": float(res["success"][i].mean()),
                     "robustness": float(res["robustness"][i].mean()),
                     "progress_m": float(res["progress"][i].mean()),
                     "theta": C.describe(thetas[i])})
        print(f"{name:18s} sev={lv:.2f}  fall={rows[-1]['fall_rate']:.2f}  success={rows[-1]['success']:.2f}"
              f"  robust={rows[-1]['robustness']:+.2f}  progress={rows[-1]['progress_m']:.1f} m")
    (out / "results.json").write_text(json.dumps(rows, indent=1))

    # Render the 4 harshest distinct failures from their logged trajectories.
    worst = sorted(range(len(rows) - 1), key=lambda i: (rows[i]["robustness"], -rows[i]["severity"]))
    picks, seen = [], set()
    for i in worst:
        if rows[i]["program"] not in seen and rows[i]["fall_rate"] > 0:
            picks.append(i), seen.add(rows[i]["program"])
        if len(picks) == 4:
            break
    if picks:
        rec = ev(params, np.stack([thetas[i] for i in picks]), seeds=1, record=True)
        clips = [render_qpos(env.mj_model, rec["qpos"][j, 0], width=480, height=360) for j in range(len(picks))]
        save_video(tile(clips), out / "worst_failures.mp4", env)
        print("rendered", [rows[i]["program"] for i in picks], "->", out / "worst_failures.mp4")


if __name__ == "__main__":
    main()
