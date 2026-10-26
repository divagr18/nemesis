"""NemesisWrapper: per-episode perturbations θ for training, evaluation and replay.

Wraps the raw env and goes under Brax's vmap/episode/auto-reset wrappers (train with
randomization_fn=None: Playground's DR wrapper calls env.unwrapped directly and would bypass
this one). Playground-equivalent domain randomization is applied here instead, resampled every
episode, so every experimental arm trains through the same mechanism.

Each env carries θ in state.info. When an episode ends a new θ is drawn for the auto-reset
episode: from a scenario bank (with a nominal fraction), or uniformly from the envelope (the
domain-randomization arm). Set info["nemesis_resample"]=False to pin θ (evaluation).

Beyond the raw env, the wrapper also
  - ends the episode on a real fall (non-foot ground contact, tilt > 45°, trunk below 0.18 m),
  - computes the reward without Playground's clip at 0, so hard scenarios keep a gradient,
  - stacks the last HISTORY actor observations and appends normalized θ to the critic's input.
"""

import contextlib

import jax
import jax.numpy as jp
import numpy as np
from mujoco_playground._src import wrapper as pg_wrapper

from nemesis.perturb import apply as A
from nemesis.perturb import canonical as C

HISTORY = 3
STATE = 48
MIN_HEIGHT = 0.18
MIN_UP_Z = float(np.cos(np.deg2rad(45)))


class NemesisWrapper(pg_wrapper.Wrapper):
    def __init__(self, env, bank: np.ndarray | None = None, nominal_frac: float = 0.5,
                 uniform: bool = False, lo: np.ndarray | None = None, hi: np.ndarray | None = None,
                 base_dr: bool = True):
        """
        bank: [N, D] scenarios to sample from. uniform=True samples U(lo, hi) per episode instead.
        nominal_frac: probability an episode runs with neutral θ.
        base_dr: apply Playground-equivalent domain randomization under θ.
        """
        super().__init__(env)
        self._bank = jp.asarray(bank if bank is not None else C.neutral()[None], jp.float32)
        self._nominal_frac = nominal_frac
        self._uniform = uniform
        self._lo = jp.asarray(C.LO if lo is None else lo)
        self._hi = jp.asarray(C.HI if hi is None else hi)
        self._base_dr = base_dr
        raw = env.unwrapped
        self._body_geoms = jp.asarray(getattr(raw, "_nemesis_body_geoms", []), jp.int32)
        self._scales = dict(raw._config.reward_config.scales)

    @property
    def observation_size(self):
        priv = self.env.observation_size["privileged_state"][0]
        return {"state": (STATE * HISTORY,), "privileged_state": (priv + C.D,)}

    # --- θ and DR sampling ---

    def sample_theta(self, rng):
        k1, k2 = jax.random.split(rng)
        if self._uniform:
            theta = jax.random.uniform(k1, (C.D,), minval=self._lo, maxval=self._hi)
        else:
            theta = self._bank[jax.random.randint(k1, (), 0, self._bank.shape[0])]
        nominal = jax.random.uniform(k2) < self._nominal_frac
        return jp.where(nominal, jp.asarray(C.NEUTRAL), theta)

    def sample_dr(self, rng):
        model = self.env.unwrapped._mjx_model
        return A.sample_base_dr(rng, model) if self._base_dr else A.neutral_base_dr(model)

    @contextlib.contextmanager
    def _perturbed(self, theta, dr):
        env = self.env.unwrapped
        base = env._mjx_model
        try:
            env._mjx_model = A.apply_model(A.apply_base_dr(base, dr), theta)
            yield
        finally:
            env._mjx_model = base

    # --- Fall detection ---

    def fallen(self, data):
        """Real fall: a non-foot body touches the ground, tilt over 45°, or the trunk is too low."""
        c = data.contact
        body = jp.isin(c.geom[:, 0], self._body_geoms) | jp.isin(c.geom[:, 1], self._body_geoms)
        touching = jp.any(body & (c.dist < 0.0)) if self._body_geoms.size else False
        up_z = data.xmat[A.TRUNK][2, 2]
        return touching | (up_z < MIN_UP_Z) | (data.qpos[2] < MIN_HEIGHT)

    # --- Observations ---

    def _obs(self, theta, obs, data, rng, cmd, hist):
        obs = A.perturb_obs(theta, obs, data, rng, cmd)
        hist = jp.concatenate([obs["state"][None], hist[:-1]], axis=0)
        priv = jp.concatenate([obs["privileged_state"], C.normalized(theta)])
        return {"state": hist.reshape(-1), "privileged_state": priv}, hist

    # --- Env API ---

    def reset(self, rng):
        rng, k1, k2 = jax.random.split(rng, 3)
        return self.reset_with(rng, self.sample_theta(k1), self.sample_dr(k2))

    def reset_with(self, rng, theta, dr=None):
        """Reset under a specific θ (evaluation/replay). dr=None means no base randomization."""
        dr = A.neutral_base_dr(self.env.unwrapped._mjx_model) if dr is None else dr
        k = jax.random.fold_in(rng, 0x4E4D)  # env.reset gets `rng` untouched, so replays match
        with self._perturbed(theta, dr):
            state = self.env.reset(rng)
        cmd = A.command(theta, 0.0, state.info["command"])
        state.info["command"] = cmd
        state.info.update(
            nemesis_theta=theta, nemesis_dr=dr, nemesis_rng=k,
            nemesis_t=jp.zeros((), jp.int32),
            nemesis_buf=jp.zeros((C.MAX_LATENCY + 1, self.env.action_size)),
            nemesis_origin=jp.zeros(3),
            nemesis_resample=jp.ones((), bool),
        )
        state.metrics["nemesis_fall"] = jp.zeros(())
        hist = jp.zeros((HISTORY, STATE))
        obs, hist = self._obs(theta, state.obs, state.data, k, cmd, hist)
        state.info["nemesis_hist"] = hist
        return state.replace(obs=obs)

    def step(self, state, action):
        info = state.info
        theta, dr, t = info["nemesis_theta"], info["nemesis_dr"], info["nemesis_t"]
        rng, k_obs, k_theta, k_dr = jax.random.split(info["nemesis_rng"], 4)
        time = t * self.dt

        # Position along the initial heading, for the ice patch (origin = pose at the first step).
        q = state.data.qpos
        yaw = 2 * jp.arctan2(q[6], q[3])
        origin = jp.where(t == 0, jp.array([q[0], q[1], yaw]), info["nemesis_origin"])
        dist = (q[0] - origin[0]) * jp.cos(origin[2]) + (q[1] - origin[1]) * jp.sin(origin[2])
        theta_now = A.with_ice(theta, dist)

        applied, buf = A.delay_action(theta, info["nemesis_buf"], action)
        xfrc = state.data.xfrc_applied.at[A.TRUNK, :3].set(A.push_force(theta, time))
        info["command"] = A.command(theta, time, info["command"])
        state = state.replace(data=state.data.replace(xfrc_applied=xfrc))

        with self._perturbed(theta_now, dr):
            state = self.env.step(state, applied)

        # Strict termination and unclipped reward (Playground clips the per-step reward at 0).
        fall = self.fallen(state.data)
        env_done = state.done > 0
        done = env_done | fall
        rewards = sum(state.metrics[f"reward/{k}"] for k in self._scales)
        extra_term = (fall & ~env_done) * self._scales.get("termination", 0.0)
        reward = (rewards + extra_term) * self.dt

        cmd = A.command(theta, time + self.dt, state.info["command"])
        obs, hist = self._obs(theta, state.obs, state.data, k_obs, cmd, state.info["nemesis_hist"])

        # Draw the next episode's θ and DR now; Brax's auto-reset then restarts the episode.
        new = done & state.info["nemesis_resample"]
        state.info.update(
            command=cmd,
            nemesis_theta=jp.where(new, self.sample_theta(k_theta), theta),
            nemesis_dr=jax.tree.map(lambda a, b: jp.where(new, a, b), self.sample_dr(k_dr), dr),
            nemesis_t=jp.where(done, 0, t + 1),
            nemesis_buf=jp.where(done, jp.zeros_like(buf), buf),
            nemesis_hist=jp.where(done, jp.zeros_like(hist), hist),
            nemesis_origin=origin,
            nemesis_rng=rng,
        )
        state.metrics["nemesis_fall"] = fall.astype(jp.float32)
        return state.replace(obs=obs, reward=reward, done=done.astype(state.done.dtype))
