"""F7: does the humanoid baseline walk, and do hand-written attacks break it?

Evaluates nominal walking (the robot's nominal command) and a few attack programs written in the
humanoid's DSL under common random seeds, prints fall rates and progress, and renders clips of
nominal walking and of a shove from logged trajectories (with perturbation overlays).

usage: python experiments/humanoid_check.py --run runs/g1_baseline
"""

import argparse
import json
from pathlib import Path

import numpy as np

from nemesis import robots
from nemesis.adversary.baselines import forward
from nemesis.envs.base import load_env
from nemesis.perturb import canonical as C
from nemesis.perturb.dsl import compile_program
from nemesis.perturb.wrapper import NemesisWrapper
from nemesis.sim.evaluate import Evaluator
from nemesis.sim.overlays import overlays
from nemesis.sim.render import render_qpos, save_video
from nemesis.train.ppo import load_params


def attacks(robot: str) -> dict:
    fwd, feet = forward(robot), list(robots.get(robot).feet)
    shove = lambda f: [fwd, {"op": "push", "force_y": f, "start": 2.0, "duration": 0.2}]  # noqa: E731
    return {
        "nominal": [fwd],
        "shove 100 N": shove(100.0),
        "shove 150 N": shove(150.0),
        "shove 200 N": shove(200.0),
        "shove 300 N": shove(300.0),
        "ice mu 0.1": [fwd, {"op": "friction", "feet": feet, "mu": 0.1}],
        "wet mu 0.3": [fwd, {"op": "friction", "feet": feet, "mu": 0.3}],
        "latency 20 ms": [fwd, {"op": "latency", "steps": 1}],
        "latency 40 ms": [fwd, {"op": "latency", "steps": 2}],
        "payload 10 kg high": [fwd, {"op": "payload", "mass": 10.0, "offset_x": -0.1, "offset_z": 0.3}],
        "weak knees 0.5": [fwd, {"op": "motor", "legs": feet, "joints": ["knee"], "strength": 0.5}],
        "uphill 0.2 rad": [fwd, {"op": "slope", "pitch": 0.2}],
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--run", default="runs/g1_baseline")
    ap.add_argument("--robot", default="g1")
    ap.add_argument("--seeds", type=int, default=16)
    ap.add_argument("--seconds", type=float, default=5.0)
    ap.add_argument("--out", default="runs/humanoid_clips")
    args = ap.parse_args()

    env = NemesisWrapper(load_env(robot=args.robot)[0], base_dr=False)
    ev = Evaluator(env, args.run, horizon=int(round(args.seconds / env.dt)))
    params = load_params(args.run)
    progs = attacks(args.robot)
    thetas = np.stack([compile_program({"name": k, "hypothesis": k, "ops": ops}, args.robot).base
                       for k, ops in progs.items()])
    res = ev(params, thetas, seeds=args.seeds)
    rows = []
    for i, name in enumerate(progs):
        rows.append({"attack": name, "fall_rate": float(res["fell"][i].mean()),
                     "progress_m": float(res["progress"][i].mean()),
                     "track_err": float(res["track_err"][i].mean()),
                     "theta": C.layout(args.robot).describe(thetas[i])})
        print(f"{name:20s} fall={rows[-1]['fall_rate']:.2f}  progress={rows[-1]['progress_m']:.2f} m"
              f"  track_err={rows[-1]['track_err']:.2f}", flush=True)
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    (out / f"{args.robot}_check.json").write_text(json.dumps(rows, indent=1))

    # Clips: nominal walking (seed 0) and the 200 N shove (first seed where it fell, if any).
    for name, file in (("nominal", "nominal"), ("shove 200 N", "shove")):
        i = list(progs).index(name)
        fell = np.flatnonzero(res["fell"][i])
        seed = int(fell[0]) if name != "nominal" and len(fell) else 0
        rec = ev(params, thetas[i][None], seeds=np.array([seed]), record=True, key=0)
        q = rec["qpos"][0, 0]
        model, scene_fn = overlays(env.mj_model, thetas[i], q, env.dt, robot=args.robot)
        frames = render_qpos(model, q, width=640, height=480, every=1, scene_fn=scene_fn)
        save_video(frames, out / f"{args.robot}_{file}.mp4", env, every=1)
        print(f"{file}: seed {seed}, fell={bool(rec['fell'][0, 0])} -> {out / f'{args.robot}_{file}.mp4'}")


if __name__ == "__main__":
    main()
