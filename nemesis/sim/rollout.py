"""Single-episode rollouts for rendering and inspection (batched evaluation lives elsewhere)."""

import jax
import jax.numpy as jnp
import numpy as np


def rollout(env, policy, seed: int = 0, steps: int = 500, command=None):
    """Runs one episode; returns the list of states. `command` pins Joystick's (vx, vy, yaw_rate)."""
    reset, step = jax.jit(env.reset), jax.jit(env.step)
    rng = jax.random.PRNGKey(seed)
    state = reset(rng)
    cmd = None if command is None else jnp.asarray(command, dtype=jnp.float32)
    traj = []
    for _ in range(steps):
        if cmd is not None:
            state.info["command"] = cmd
        rng, key = jax.random.split(rng)
        action, _ = policy(state.obs, key)
        state = step(state, action)
        traj.append(state)
        if bool(state.done):
            break
    return traj


def body_frame_displacement(traj) -> np.ndarray:
    """Base displacement (x forward, y left) in the robot's initial heading frame."""
    q0 = np.asarray(traj[0].data.qpos)
    q1 = np.asarray(traj[-1].data.qpos)
    w, z = q0[3], q0[6]  # yaw-only part of the initial (w, x, y, z) quaternion
    yaw = 2 * np.arctan2(z, w)
    dx, dy = q1[0] - q0[0], q1[1] - q0[1]
    c, s = np.cos(yaw), np.sin(yaw)
    return np.array([c * dx + s * dy, -s * dx + c * dy])
