"""Headless rendering of trajectories to mp4."""

import argparse
import os
from pathlib import Path

os.environ.setdefault("MUJOCO_GL", "egl")

import mediapy
import numpy as np


def render(env, traj, camera: str = "track", width: int = 640, height: int = 480, every: int = 2):
    return env.render(traj[::every], camera=camera, width=width, height=height)


def save_video(frames, path: str | Path, env, every: int = 2):
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    mediapy.write_video(str(path), frames, fps=1.0 / env.dt / every)


def render_qpos(mj_model, qpos, camera: str = "track", width: int = 640, height: int = 480,
                every: int = 2, scene_fn=None) -> list[np.ndarray]:
    """Renders logged joint positions [T, nq] (from a batched evaluation, so the clip shows
    exactly the rollout that was scored; re-simulating is not bit-exact across batch sizes).

    scene_fn(scene, t) may add visual geoms (perturbation overlays) to each frame.
    """
    import mujoco

    data = mujoco.MjData(mj_model)
    frames = []
    with mujoco.Renderer(mj_model, height=height, width=width) as r:
        for t in range(0, len(qpos), every):
            data.qpos[:] = qpos[t]
            mujoco.mj_forward(mj_model, data)
            r.update_scene(data, camera=camera)
            if scene_fn is not None:
                scene_fn(r.scene, t)
            frames.append(r.render())
    return frames


def tile(clips: list, cols: int = 2) -> list[np.ndarray]:
    """Tiles equal-size clips into a grid, padding shorter clips with their last frame."""
    n = max(len(c) for c in clips)
    clips = [list(c) + [c[-1]] * (n - len(c)) for c in clips]
    blank = np.zeros_like(clips[0][0])
    while len(clips) % cols:
        clips.append([blank] * n)
    rows = [clips[i:i + cols] for i in range(0, len(clips), cols)]
    return [np.vstack([np.hstack([c[t] for c in row]) for row in rows]) for t in range(n)]


if __name__ == "__main__":
    from nemesis.envs.base import load_env
    from nemesis.sim.rollout import body_frame_displacement, rollout
    from nemesis.train.ppo import make_policy
    import json

    ap = argparse.ArgumentParser(description="Render a policy from a run directory.")
    ap.add_argument("--run", default="runs/baseline")
    ap.add_argument("--step", type=int, default=None)
    ap.add_argument("--out", default=None)
    ap.add_argument("--command", type=float, nargs=3, default=[1.0, 0.0, 0.0])
    ap.add_argument("--seconds", type=float, default=10)
    args = ap.parse_args()

    from nemesis.perturb.wrapper import NemesisWrapper

    cfg = json.loads((Path(args.run) / "config.json").read_text())
    env, _ = load_env(cfg["env_name"], body_collisions=cfg.get("nemesis", False))
    if cfg.get("nemesis", False):
        env = NemesisWrapper(env, nominal_frac=1.0, base_dr=False)
    policy = make_policy(args.run, env, args.step)
    traj = rollout(env, policy, steps=int(args.seconds / env.dt), command=args.command)
    disp = body_frame_displacement(traj)
    out = args.out or str(Path(args.run) / "videos" / f"step_{args.step or 'latest'}.mp4")
    save_video(render(env, traj), out, env)
    print(f"{len(traj)} steps, body-frame displacement {disp.round(2)} m -> {out}")
