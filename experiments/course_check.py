"""Course check (P12 #2): fall rates of a policy on ramps, a second ice patch, flights that come
back down and a 3-segment course, plus one course clip.

Forward command at the robot's nominal speed (Go1: 1 m/s), 5 s episodes by default. Prints a
markdown table (falls, progress, median time to fall, where the falls happened, and how many seeds
got past the last feature) and renders the 3-segment course with the overlays.

usage: python experiments/course_check.py --run runs/baseline_v2 --out runs/terrain_clips
"""

import argparse
import json
from collections import Counter
from pathlib import Path

import numpy as np

from nemesis import robots
from nemesis.perturb import canonical as C
from nemesis.perturb.dsl import compile_program, plan_course
from nemesis.perturb.dsl import language

COURSE3 = [{"kind": "curb", "gap": 1.0, "height": 0.04},
           {"kind": "ice", "gap": 1.0, "mu": 0.15, "length": 1.0},
           {"kind": "ramp", "gap": 0.35, "angle": 8, "length": 1.7}]
HEADLINE = [{"kind": "stairs_up", "gap": 0.5, "height": 0.05, "count": 3, "depth": 0.25},
            {"kind": "stairs_down"},
            {"kind": "ice", "gap": 0.2, "mu": 0.08, "length": 1.5},
            {"kind": "ramp", "angle": 8, "length": 2}]


def scenarios(bot) -> dict:
    """name -> (ops, spans [(label, x0, x1)] along the heading)."""
    fwd = {"op": "command", "a": list(bot.nominal_command)}
    out = {"flat": ([fwd], [])}
    for deg in (5, 10, 15):
        seg = [{"kind": "ramp", "gap": 1.0, "angle": deg, "length": 2.0}]
        out[f"ramp {deg} deg (1 m, 2 m run)"] = ([fwd, {"op": "course", "segments": seg}], None)
    out["ice2 mu 0.1 at 2 m, 2 m long"] = (
        [fwd, {"op": "ice_patch", "mu": 1.0, "start": 0.0, "length": 0.0},  # first patch unused
         {"op": "course", "segments": [{"kind": "ice", "gap": 2.0, "mu": 0.1, "length": 2.0}]}], None)
    out["porch 3 x 5 cm up and down"] = ([fwd, {"op": "course", "segments": HEADLINE[:2]}], None)
    out["course: curb 4 cm, ice 0.15, ramp 8 deg"] = ([fwd, {"op": "course", "segments": COURSE3}], None)
    out["course: porch, ice 0.08, ramp 8 deg"] = ([fwd, {"op": "course", "segments": HEADLINE}], None)
    for k, (ops, spans) in out.items():
        if spans is None:
            course = next(o for o in ops if o["op"] == "course")
            Seg = language("go1").Program.model_validate({"name": k, "hypothesis": k, "ops": [course]}).ops[0].segments
            out[k] = (ops, [(kind, round(a, 2), round(b, 2)) for kind, a, b in plan_course(Seg).spans])
    return out


def theta_of(name, ops, robot) -> np.ndarray:
    th = np.asarray(compile_program({"name": name, "hypothesis": name, "ops": ops}, robot).base)
    return th


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--robot", default="go1")
    ap.add_argument("--run", default="runs/baseline_v2")
    ap.add_argument("--out", default="runs/terrain_clips")
    ap.add_argument("--seeds", type=int, default=16)
    ap.add_argument("--seconds", type=float, default=5.0)
    ap.add_argument("--no-clips", action="store_true")
    ap.add_argument("--clip", default="course: curb 4 cm, ice 0.15, ramp 8 deg")
    args = ap.parse_args()

    from nemesis.envs.base import load_env
    from nemesis.perturb.wrapper import NemesisWrapper
    from nemesis.sim.evaluate import Evaluator
    from nemesis.train.ppo import load_params

    bot = robots.get(args.robot)
    env = NemesisWrapper(load_env(robot=args.robot)[0], base_dr=False)
    ev = Evaluator(env, args.run, horizon=int(round(args.seconds / env.dt)))
    params = load_params(args.run)
    shots = scenarios(bot)
    thetas = {k: theta_of(k, ops, args.robot) for k, (ops, _) in shots.items()}
    res = ev(params, np.stack(list(thetas.values())), seeds=args.seeds, key=2027)
    rows = {}
    table = ["| Scenario | Falls | Progress (m), mean [min, max] | Median time to fall (s) | Falls by segment | Past the last feature |",
             "|---|---|---|---|---|---|"]
    for i, k in enumerate(thetas):
        fell, prog, ttf = res["fell"][i], res["progress"][i], res["time_to_fall"][i]
        spans = shots[k][1]
        where = Counter()
        for f, p in zip(fell, prog):
            if f:
                seg = [s for s in spans if p >= s[1] - 0.35]  # the body reaches a feature ~0.35 m before the trunk
                where[seg[-1][0] if seg else "before"] += 1
        end = max((s[2] for s in spans), default=0.0)
        past = float(np.mean(~fell & (prog > end + 0.2))) if spans else float("nan")
        rows[k] = {"theta": C.layout(args.robot).describe(thetas[k]), "spans": spans, "fall": float(fell.mean()),
                   "progress": float(prog.mean()), "progress_min": float(prog.min()), "progress_max": float(prog.max()),
                   "ttf": float(np.median(ttf[fell])) if fell.any() else None, "falls_by_segment": dict(where),
                   "past_last": past}
        r = rows[k]
        by = ", ".join(f"{s} {n}" for s, n in where.items()) or "-"
        table.append(f"| {k} | {r['fall']:.0%} | {r['progress']:.2f} [{r['progress_min']:.2f}, {r['progress_max']:.2f}] | "
                     f"{'-' if r['ttf'] is None else f'{r['ttf']:.2f}'} | {by} | "
                     f"{'-' if not spans else f'{past:.0%} (x > {end + 0.2:.1f} m)'} |")
    print("\n".join(table), flush=True)
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    (out / "course_table.json").write_text(json.dumps({"run": args.run, "seeds": args.seeds, "seconds": args.seconds,
                                                       "rows": rows}, indent=1))
    if args.no_clips:
        return

    import mediapy

    from nemesis.sim.overlays import overlays
    from nemesis.sim.render import render_qpos
    key = args.clip
    i = list(thetas).index(key)
    fell = np.flatnonzero(res["fell"][i])
    seed = int(fell[0]) if len(fell) else 0
    rec = ev(params, thetas[key][None], seeds=np.array([seed]), key=2027, record=True)
    q = rec["qpos"][0, 0]
    if rec["fell"][0, 0]:  # end ~1 s after the fall
        q = q[: int(min(len(q), rec["time_to_fall"][0, 0] / env.dt + 50))]
    model, scene_fn = overlays(env.mj_model, thetas[key], q, env.dt, robot=args.robot)
    frames = render_qpos(model, q, width=1280, height=720, every=1, scene_fn=scene_fn)
    mediapy.write_video(str(out / "course.mp4"), frames, fps=1.0 / env.dt)
    mediapy.write_video(str(out / "course_slowmo.mp4"), frames, fps=0.25 / env.dt)
    mediapy.write_image(str(out / "course_frame.png"), frames[min(len(frames) - 1, int(3.5 / env.dt))])
    print(f"{key}: seed {seed}, fell={bool(rec['fell'][0, 0])} -> {out / 'course.mp4'} (+ _slowmo, _frame.png)", flush=True)


if __name__ == "__main__":
    main()
