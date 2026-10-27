"""Terrain check (P11.6): fall rates of a policy on curbs and short flights of steps, plus clips.

Forward command at the robot's nominal speed (Go1: 1 m/s), 5 s episodes, curbs of 2-12 cm and two
small flights of steps, all starting 1 m ahead. Prints a markdown table and renders a curb trip and
a stairs attempt with the overlays (every control step, cut ~1 s after a fall).

usage: python experiments/terrain_check.py --run runs/baseline_v2 --out runs/terrain_clips
"""

import argparse
import json
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

START, DEPTH = 1.0, 0.3


def scenarios(bot) -> dict:
    fwd = {"op": "command", "a": list(bot.nominal_command)}
    out = {"flat": [fwd]}
    for cm in (2, 4, 6, 8, 10, 12):
        out[f"curb {cm} cm"] = [fwd, {"op": "curb", "height": cm / 100, "start": START}]
    for n, cm in ((3, 6), (5, 8)):
        out[f"stairs {n} x {cm} cm"] = [fwd, {"op": "stairs", "height": cm / 100, "depth": DEPTH,
                                             "count": n, "start": START}]
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--robot", default="go1")
    ap.add_argument("--run", default="runs/baseline_v2")
    ap.add_argument("--out", default="runs/terrain_clips")
    ap.add_argument("--seeds", type=int, default=16)
    ap.add_argument("--seconds", type=float, default=5.0)
    ap.add_argument("--no-clips", action="store_true")
    args = ap.parse_args()

    bot = robots.get(args.robot)
    env = NemesisWrapper(load_env(robot=args.robot)[0], base_dr=False)
    ev = Evaluator(env, args.run, horizon=int(round(args.seconds / env.dt)))
    params = load_params(args.run)
    shots = scenarios(bot)
    thetas = {k: np.asarray(compile_program({"name": k, "hypothesis": k, "ops": ops}, args.robot).base)
              for k, ops in shots.items()}
    res = ev(params, np.stack(list(thetas.values())), seeds=args.seeds, key=2027)
    rows, table = {}, ["| Scenario | Falls | Progress (m), mean [min, max] | Median time to fall (s) | Reached the top |",
                       "|---|---|---|---|---|"]
    for i, k in enumerate(thetas):
        fell, prog, ttf = res["fell"][i], res["progress"][i], res["time_to_fall"][i]
        n_steps = 0 if k == "flat" else (1 if k.startswith("curb") else int(k.split()[1]))
        top = START + n_steps * DEPTH
        reached = float(np.mean(~fell & (prog > top + 0.2))) if n_steps else float("nan")
        rows[k] = {"fall": float(fell.mean()), "progress": float(prog.mean()), "progress_min": float(prog.min()),
                   "progress_max": float(prog.max()), "ttf": float(np.median(ttf[fell])) if fell.any() else None,
                   "reached_top": reached}
        r = rows[k]
        table.append(f"| {k} | {r['fall']:.0%} | {r['progress']:.2f} [{r['progress_min']:.2f}, {r['progress_max']:.2f}] | "
                     f"{'-' if r['ttf'] is None else f'{r['ttf']:.2f}'} | {'-' if n_steps == 0 else f'{reached:.0%}'} |")
    print("\n".join(table), flush=True)
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    (out / "table.json").write_text(json.dumps({"run": args.run, "seeds": args.seeds, "rows": rows}, indent=1))
    if args.no_clips:
        return

    # A curb trip: the lowest curb that trips the robot in at least half the seeds (else the highest).
    curbs = [k for k in rows if k.startswith("curb")]
    curb = next((k for k in curbs if rows[k]["fall"] >= 0.5), curbs[-1])
    for name, key in ((f"{args.robot}_curb_trip", curb), (f"{args.robot}_stairs_attempt", "stairs 5 x 8 cm")):
        i = list(thetas).index(key)
        fell = np.flatnonzero(res["fell"][i])
        seed = int(fell[0]) if len(fell) else 0
        rec = ev(params, thetas[key][None], seeds=np.array([seed]), key=2027, record=True)
        q = rec["qpos"][0, 0]
        if rec["fell"][0, 0]:  # end ~1 s after the fall
            q = q[: int(min(len(q), rec["time_to_fall"][0, 0] / env.dt + 50))]
        model, scene_fn = overlays(env.mj_model, thetas[key], q, env.dt, robot=args.robot)
        frames = render_qpos(model, q, width=1280, height=720, every=1, scene_fn=scene_fn)
        fps = 1.0 / env.dt
        mediapy.write_video(str(out / f"{name}.mp4"), frames, fps=fps)
        mediapy.write_video(str(out / f"{name}_slowmo.mp4"), frames, fps=fps / 4)
        print(f"{key}: seed {seed}, fell={bool(rec['fell'][0, 0])} -> {out / name}.mp4 (+ _slowmo)", flush=True)


if __name__ == "__main__":
    main()
