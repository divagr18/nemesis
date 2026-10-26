"""Batched evaluation of one policy under many θ: the inner loop of search and the gauntlet.

One jitted function evaluates B (θ, seed) pairs in parallel. θ and the policy params are both
traced arguments, so new scenarios and new checkpoints never trigger a recompile.

Per scenario it reports whether the robot fell, when, a continuous robustness score for the
optimizer (an STL-style margin: > 0 means it stayed up and kept tracking, more negative means
it fell earlier), the mean command-tracking error, and progress along the initial heading.
"""

import json
from pathlib import Path

import jax
import jax.numpy as jp
import numpy as np
from brax.training.acme import running_statistics
from brax.training.agents.ppo import networks as ppo_networks

from nemesis.perturb import apply as A
from nemesis.perturb.wrapper import MIN_HEIGHT, MIN_UP_Z, NemesisWrapper

TRACK_TOL = 0.4  # m/s: mean planar velocity error above this counts as not doing the task


class Evaluator:
    def __init__(self, env: NemesisWrapper, run_dir: str | Path, horizon: int = 300):
        cfg = json.loads((Path(run_dir) / "config.json").read_text())["ppo"]
        normalize = running_statistics.normalize if cfg.get("normalize_observations") else (lambda x, y: x)
        nets = ppo_networks.make_ppo_networks(env.observation_size, env.action_size,
                                              preprocess_observations_fn=normalize,
                                              **cfg["network_factory"])
        self._make_policy = ppo_networks.make_inference_fn(nets)
        self.env = env
        self.horizon = horizon
        self._raw = env.unwrapped
        self._run = jax.jit(self._batch, static_argnames="record")

    def _one(self, params, theta, rng, record):
        env, T = self.env, self.horizon
        policy = self._make_policy(params, deterministic=True)
        s = env.reset_with(rng, theta)
        s.info["nemesis_resample"] = jp.zeros((), bool)
        q0 = s.data.qpos
        yaw0 = 2 * jp.arctan2(q0[6], q0[3])

        def body(carry, t):
            s, alive, margin, err_sum, n_alive, t_fall = carry
            action, _ = policy(s.obs, jax.random.fold_in(rng, t))
            cmd = s.info["command"]
            s = env.step(s, action)
            fell = s.metrics["nemesis_fall"] > 0
            h, up = s.data.qpos[2], s.data.xmat[A.TRUNK][2, 2]
            m = jp.minimum((h - MIN_HEIGHT) / 0.1, (up - MIN_UP_Z) / (1 - MIN_UP_Z))
            m = jp.where(fell, jp.minimum(m, 0.0) - 0.1, m)
            v = self._raw.get_local_linvel(s.data)
            err = jp.linalg.norm(v[:2] - cmd[:2])
            margin = jp.where(alive, jp.minimum(margin, m), margin)
            err_sum = err_sum + jp.where(alive, err, 0.0)
            n_alive = n_alive + alive
            t_fall = jp.where(alive & fell, t, t_fall)
            alive = alive & ~fell
            out = s.data.qpos if record else None
            return (s, alive, margin, err_sum, n_alive, t_fall), out

        init = (s, jp.ones((), bool), jp.full((), 1.0), jp.zeros(()), jp.zeros(()), jp.full((), T))
        (s, alive, margin, err_sum, n_alive, t_fall), qpos = jax.lax.scan(body, init, jp.arange(T))

        track_err = err_sum / jp.maximum(n_alive, 1.0)
        q1 = s.data.qpos
        progress = (q1[0] - q0[0]) * jp.cos(yaw0) + (q1[1] - q0[1]) * jp.sin(yaw0)
        survived_score = jp.minimum(margin, (TRACK_TOL - track_err) / TRACK_TOL)
        robustness = jp.where(alive, survived_score, -1.0 + t_fall / T)
        out = {
            "fell": ~alive,
            "time_to_fall": t_fall * env.dt,
            "track_err": track_err,
            "progress": progress,
            "robustness": robustness,
            "success": alive & (track_err < TRACK_TOL),
        }
        if record:
            out["qpos"] = qpos
        return out

    def _batch(self, params, thetas, rngs, record=False):
        return jax.vmap(lambda th, r: self._one(params, th, r, record))(thetas, rngs)

    def __call__(self, params, thetas, seeds: int | np.ndarray = 8, key: int = 0, record=False):
        """Evaluates every θ under `seeds` common random seeds; returns arrays shaped [B, seeds].

        `seeds` may also be an explicit array of seed ints.
        """
        thetas = jp.asarray(thetas, jp.float32)
        seed_ids = np.arange(seeds) if np.isscalar(seeds) else np.asarray(seeds)
        B, S = thetas.shape[0], len(seed_ids)
        rngs = jax.vmap(lambda i: jax.random.fold_in(jax.random.PRNGKey(key), i))(jp.asarray(seed_ids))
        th = jp.repeat(thetas, S, axis=0)
        rg = jp.tile(rngs, (B, 1))
        out = self._run(params, th, rg, record=record)
        return {k: np.asarray(v).reshape(B, S, *v.shape[1:]) for k, v in out.items()}
