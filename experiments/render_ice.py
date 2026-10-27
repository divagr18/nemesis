"""Clips of a robot slipping on ice: an ice patch it walks onto, and ice everywhere.

Picks the first seed where the robot falls, renders every control step at 1280x720 with the
perturbation overlays, and writes a real-time and a quarter-speed copy.

usage: python experiments/render_ice.py --robot g1 --run runs/g1_baseline --out runs/humanoid_clips
"""

import argparse
from pathlib import Path

import mediapy
import numpy as np

from nemesis import robots
from nemesis.envs.base import load_env
from nemesis.perturb.dsl import compile_program
from nemesis.perturb.wrapper import NemesisWrapper
from nemesis.sim.evaluate import Evaluator
from nemesis.sim.overlays import overlays
from nemesis.sim.render import render_qpos
from nemesis.train.ppo import load_params


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--robot", default="g1")
    ap.add_argument("--run", default="runs/g1_baseline")
    ap.add_argument("--out", default="runs/humanoid_clips")
    ap.add_argument("--seeds", type=int, default=32)
    args = ap.parse_args()

    bot = robots.get(args.robot)
    fwd = {"op": "command", "a": list(bot.nominal_command)}
    feet = list(bot.feet)
    shots = {
        "ice_patch": [fwd, {"op": "ice_patch", "mu": 0.05, "start": 1.2, "length": 3.0}],
        "ice_everywhere": [fwd, {"op": "friction", "feet": feet, "mu": 0.1}],
    }
    env = NemesisWrapper(load_env(robot=args.robot)[0], base_dr=False)
    ev = Evaluator(env, args.run, horizon=300)
    params = load_params(args.run)
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    for name, ops in shots.items():
        theta = np.asarray(compile_program({"name": name, "hypothesis": name, "ops": ops}, args.robot).base)
        res = ev(params, theta[None], seeds=args.seeds, key=11)
        fell = np.flatnonzero(res["fell"][0])
        print(f"{name}: falls {len(fell)}/{args.seeds}", flush=True)
        seed = int(fell[0]) if len(fell) else 0
        rec = ev(params, theta[None], seeds=np.array([seed]), key=11, record=True)
        q = rec["qpos"][0, 0]
        if rec["fell"][0, 0]:  # end ~2 s after the fall
            q = q[: int(min(len(q), rec["time_to_fall"][0, 0] / env.dt + 100))]
        model, scene_fn = overlays(env.mj_model, theta, q, env.dt, robot=args.robot)
        frames = render_qpos(model, q, width=1280, height=720, every=1, scene_fn=scene_fn)
        fps = 1.0 / env.dt
        mediapy.write_video(str(out / f"{args.robot}_{name}.mp4"), frames, fps=fps)
        mediapy.write_video(str(out / f"{args.robot}_{name}_slowmo.mp4"), frames, fps=fps / 4)
        print(f"  seed {seed}, fell={bool(rec['fell'][0, 0])} -> {out / f'{args.robot}_{name}.mp4'} (+ _slowmo)", flush=True)


if __name__ == "__main__":
    main()
