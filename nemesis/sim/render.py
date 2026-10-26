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

    env_name = json.loads((Path(args.run) / "config.json").read_text())["env_name"]
    env, _ = load_env(env_name)
    policy = make_policy(args.run, env, args.step)
    traj = rollout(env, policy, steps=int(args.seconds / env.dt), command=args.command)
    disp = body_frame_displacement(traj)
    out = args.out or str(Path(args.run) / "videos" / f"step_{args.step or 'latest'}.mp4")
    save_video(render(env, traj), out, env)
    print(f"{len(traj)} steps, body-frame displacement {disp.round(2)} m -> {out}")
