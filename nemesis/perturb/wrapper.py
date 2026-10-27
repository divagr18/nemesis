"""NemesisWrapper: per-episode perturbations θ for training, evaluation and replay.

Wraps the raw env and goes under Brax's vmap/episode/auto-reset wrappers (train with
randomization_fn=None: Playground's DR wrapper calls env.unwrapped directly and would bypass
this one). Playground-equivalent domain randomization is applied here instead, resampled every
episode, so every experimental arm trains through the same mechanism.

Each env carries θ in state.info. When an episode ends a new θ is drawn for the auto-reset
episode: from a scenario bank (with a nominal fraction), or uniformly from the envelope (the
domain-randomization arm). Set info["nemesis_resample"]=False to pin θ (evaluation).

Beyond the raw env, the wrapper also
  - ends the episode on a real fall (non-foot contact with the floor or a step, tilt > 45°, root
    below the robot's minimum height, e.g. 0.18 m for Go1),
  - computes the reward without Playground's clip at 0, so hard scenarios keep a gradient,
  - stacks the last HISTORY actor observations and appends normalized θ to the critic's input.

The robot (θ layout, body ids, observation offsets, fall thresholds) comes from the robots.Spec
that envs.base.load_env attaches to the raw env.
"""

import contextlib

import jax
import jax.numpy as jp
import numpy as np
from mujoco_playground._src import wrapper as pg_wrapper

from nemesis import robots
from nemesis.perturb import apply as A
from nemesis.perturb import canonical as C
from nemesis.perturb import terrain

HISTORY = 3
STATE = robots.GO1.obs_size  # Go1's values; per-robot ones come from the env's robots.Spec
MIN_HEIGHT = robots.GO1.min_height
MIN_UP_Z = float(np.cos(np.deg2rad(robots.GO1.max_tilt_deg)))


def spec_of(env) -> robots.Spec:
    """The robots.Spec load_env attached to the raw env (resolved by env class for a bare env)."""
    raw = env.unwrapped
    spec = getattr(raw, "_nemesis_spec", None)
    if spec is None:
        module = type(raw).__module__.split(".")
        robot = next(r for r in robots.ROBOTS.values() if r.name in module)
        spec = robots.resolve(robot, raw._mj_model)
    return spec


SAMPLE_SPACING = 0.02  # m between fall-check sample points on the body's collision geoms


def body_samples(m, geoms, spacing: float = SAMPLE_SPACING):
    """Spheres covering the body collision geoms, for the geometric body-step check: points on
    each box's surface (radius 0) and along each capsule's axis (its radius), at most `spacing`
    apart. Returns (geom id [P], offset in the geom frame [P, 3], radius [P])."""
    import mujoco
    gid, local, rad = [], [], []
    for g in np.asarray(geoms):
        size = m.geom_size[g]
        if m.geom_type[g] == mujoco.mjtGeom.mjGEOM_BOX:
            axes = [np.linspace(-a, a, int(np.ceil(2 * a / spacing)) + 1) for a in size]
            grid = np.stack(np.meshgrid(*axes, indexing="ij"), -1).reshape(-1, 3)
            pts = grid[(np.abs(np.abs(grid) - size) < 1e-9).any(1)]  # surface only
            r = np.zeros(len(pts))
        elif m.geom_type[g] == mujoco.mjtGeom.mjGEOM_CAPSULE:
            z = np.linspace(-size[1], size[1], int(np.ceil(2 * size[1] / spacing)) + 1)
            pts = np.stack([np.zeros_like(z), np.zeros_like(z), z], -1)
            r = np.full(len(z), size[0])
        elif m.geom_type[g] == mujoco.mjtGeom.mjGEOM_SPHERE:
            pts, r = np.zeros((1, 3)), np.full(1, size[0])
        else:
            raise ValueError(f"no fall-check samples for geom type {m.geom_type[g]}")
        gid.append(np.full(len(pts), g)), local.append(pts), rad.append(r)
    return (np.concatenate(gid).astype(np.int32), np.concatenate(local).astype(np.float32),
            np.concatenate(rad).astype(np.float32))


class NemesisWrapper(pg_wrapper.Wrapper):
    def __init__(self, env, bank: np.ndarray | None = None, nominal_frac: float = 0.5,
                 uniform: bool = False, lo: np.ndarray | None = None, hi: np.ndarray | None = None,
                 base_dr: bool = True, uniform_frac: float = 0.0, bank_weights: np.ndarray | None = None,
                 fall_penalty: float = 1.0, env_pushes: bool | None = None):
        """
        bank: [N, D] scenarios to sample from. uniform=True samples U(lo, hi) per episode instead.
        bank_weights: [N] sampling probabilities for the bank (default uniform), e.g. learnability.
        fall_penalty: reward subtracted on a fall. Playground's termination term is only -1*dt,
            less than one step of nominal reward, so in hard scenarios falling early pays off.
        nominal_frac: probability an episode runs with neutral θ.
        uniform_frac: probability an episode samples U(lo, hi) even in bank mode (the 10% slice
            of the nominal / counterexample / uniform training mix).
        base_dr: apply Playground-equivalent domain randomization under θ.
        env_pushes: keep the raw env's own random pushes (Playground's G1 kicks the robot by
            0.1-2 m/s every 5-10 s; Go1's are disabled in its config). Default: same as base_dr,
            so training keeps Playground's recipe and evaluation envs (base_dr=False) only see θ.
        """
        super().__init__(env)
        raw = env.unwrapped
        self.spec = spec_of(env)
        self.robot = self.spec.robot
        self.layout = L = C.layout(self.robot)
        self._bank = jp.asarray(bank if bank is not None else L.neutral()[None], jp.float32)
        w = np.ones(len(self._bank)) if bank_weights is None else np.asarray(bank_weights, np.float64)
        self._bank_logits = jp.asarray(np.log(np.maximum(w / w.sum(), 1e-12)), jp.float32)
        self._fall_penalty = fall_penalty
        self._nominal_frac = nominal_frac
        self._uniform = uniform
        self._lo = jp.asarray(L.LO if lo is None else lo)
        self._hi = jp.asarray(L.HI if hi is None else hi)
        self._base_dr = base_dr
        self._env_pushes = base_dr if env_pushes is None else env_pushes
        self._uniform_frac = uniform_frac
        self._body_geoms = jp.asarray(getattr(raw, "_nemesis_body_geoms", []), jp.int32)
        self._samples = None
        if self.spec.terrain_geoms and len(self._body_geoms):
            self._samples = tuple(jp.asarray(a) for a in body_samples(raw._mj_model, self._body_geoms))
        self._scales = dict(raw._config.reward_config.scales)
        self._episode_length = int(raw._config.episode_length)
        self.min_height = self.robot.min_height
        self.min_up_z = self.spec.min_up_z

    @property
    def observation_size(self):
        priv = self.env.observation_size["privileged_state"][0]
        return {"state": (self.robot.obs_size * HISTORY,), "privileged_state": (priv + C.D,)}

    def local_linvel(self, data):
        """Body-frame linear velocity as the env measures it (for command tracking)."""
        raw = self.env.unwrapped
        frame = self.robot.linvel_frame
        return raw.get_local_linvel(data) if frame is None else raw.get_local_linvel(data, frame)

    # --- θ and DR sampling ---

    def sample_theta(self, rng):
        k1, k2, k3 = jax.random.split(rng, 3)
        uni = jax.random.uniform(k1, (C.D,), minval=self._lo, maxval=self._hi)
        if self._uniform:
            theta = uni
        else:
            theta = self._bank[jax.random.categorical(k3, self._bank_logits)]
        r = jax.random.uniform(k2)
        theta = jp.where(r < self._nominal_frac + self._uniform_frac, uni, theta)
        return jp.where(r < self._nominal_frac, jp.asarray(self.layout.NEUTRAL), theta)

    def sample_dr(self, rng):
        model = self.env.unwrapped._mjx_model
        return A.sample_base_dr(rng, model, self.spec) if self._base_dr else A.neutral_base_dr(model)

    @contextlib.contextmanager
    def _perturbed(self, theta, dr, yaw=0.0):
        env = self.env.unwrapped
        base = env._mjx_model
        try:
            env._mjx_model = A.apply_model(A.apply_base_dr(base, dr, self.spec), theta, yaw, self.spec)
            yield
        finally:
            env._mjx_model = base

    @staticmethod
    def without_env_pushes(state):
        """Turns off the raw env's own random pushes for this env (they would act on top of θ).

        Playground's G1 Joystick kicks the base whenever (push_step + 1) % push_interval_steps == 0;
        an interval of 2^30 steps never comes. The env's info is kept across Brax auto-resets, so
        this holds for later episodes too.
        """
        if "push_interval_steps" in state.info:
            state.info["push_interval_steps"] = jp.full_like(state.info["push_interval_steps"], 2**30)
        return state

    # --- Fall detection ---

    def fallen(self, data, theta=None, origin=None):
        """Real fall: a non-foot body touches the ground (the floor, or a step when θ and the start
        pose `origin` (x, y, yaw) are given), the trunk tilts too far, the root is too low, or the
        simulation diverged (non-finite state)."""
        c = data.contact
        g0, g1, floor = c.geom[:, 0], c.geom[:, 1], self.spec.floor
        # Only body-floor contacts: G1 also has explicit hand-thigh contact pairs.
        body = (((g0 == floor) & jp.isin(g1, self._body_geoms))
                | ((g1 == floor) & jp.isin(g0, self._body_geoms)))
        touching = jp.any(body & (c.dist < 0.0)) if self._body_geoms.size else False
        if self._samples is not None and theta is not None:
            # Terrain boxes only collide with the feet (envs.base), so a body touching one is found
            # geometrically: points over the body's collision geoms inside a step or ramp box.
            geom, local, radius = self._samples
            pts = data.geom_xpos[geom] + jp.einsum("pij,pj->pi", data.geom_xmat[geom], local)
            touching = touching | terrain.touches(pts, radius, theta, origin[:2], origin[2], self.layout,
                                                  len(self.spec.terrain_geoms), jp)
        up_z = data.xmat[self.spec.trunk][2, 2]
        diverged = ~(jp.isfinite(data.qpos).all() & jp.isfinite(data.qvel).all())
        return touching | (up_z < self.min_up_z) | (data.qpos[2] < self.min_height) | diverged

    # --- Observations ---

    def _obs(self, theta, obs, data, rng, cmd, hist, yaw=0.0):
        obs = A.perturb_obs(theta, obs, data, rng, cmd, yaw, self.spec)
        hist = jp.concatenate([obs["state"][None], hist[:-1]], axis=0)
        priv = jp.concatenate([obs["privileged_state"], self.layout.normalized(theta)])
        return {"state": hist.reshape(-1), "privileged_state": priv}, hist

    # --- Env API ---

    def reset(self, rng):
        rng, k1, k2 = jax.random.split(rng, 3)
        return self.reset_with(rng, self.sample_theta(k1), self.sample_dr(k2))

    def reset_with(self, rng, theta, dr=None):
        """Reset under a specific θ (evaluation/replay). dr=None means no base randomization."""
        sp = self.spec
        dr = A.neutral_base_dr(self.env.unwrapped._mjx_model) if dr is None else dr
        k = jax.random.fold_in(rng, 0x4E4D)  # env.reset gets `rng` untouched, so replays match
        with self._perturbed(theta, dr):
            state = self.env.reset(rng)
        cmd = A.command(theta, 0.0, state.info["command"], sp)
        state.info["command"] = cmd
        state.info.update(
            nemesis_theta=theta, nemesis_dr=dr, nemesis_rng=k,
            nemesis_t=jp.zeros((), jp.int32),
            nemesis_buf=jp.zeros((C.MAX_LATENCY + 1, self.env.action_size)),
            nemesis_origin=jp.zeros(3),
            nemesis_resample=jp.ones((), bool),
        )
        state.metrics["nemesis_fall"] = jp.zeros(())
        if not self._env_pushes:
            state = self.without_env_pushes(state)
        q = state.data.qpos
        yaw = 2 * jp.arctan2(q[6], q[3])
        hist = jp.zeros((HISTORY, self.robot.obs_size))
        obs, hist = self._obs(theta, state.obs, state.data, k, cmd, hist, yaw)
        state.info["nemesis_hist"] = hist
        return state.replace(obs=obs)

    def step(self, state, action, restart: bool = True):
        sp = self.spec
        info = state.info
        theta, dr, t = info["nemesis_theta"], info["nemesis_dr"], info["nemesis_t"]
        rng, k_obs, k_theta, k_dr = jax.random.split(info["nemesis_rng"], 4)
        time = t * self.dt

        # Start pose (x, y, heading), taken at the first step of each episode: the ice patch and
        # the stairs are placed along the heading, and slopes and pushes are defined relative to it.
        q = state.data.qpos
        yaw = 2 * jp.arctan2(q[6], q[3])
        origin = jp.where(t == 0, jp.array([q[0], q[1], yaw]), info["nemesis_origin"])
        dist = (q[0] - origin[0]) * jp.cos(origin[2]) + (q[1] - origin[1]) * jp.sin(origin[2])
        theta_now = A.with_ice(theta, dist, sp)

        applied, buf = A.delay_action(theta, info["nemesis_buf"], action, sp)
        xfrc = state.data.xfrc_applied.at[sp.trunk, :3].set(A.push_force(theta, time, origin[2], sp))
        info["command"] = A.command(theta, time, info["command"], sp)

        data = state.data.replace(xfrc_applied=xfrc)
        if sp.terrain_geoms:  # stairs, ramp: move the terrain boxes (data only; parked when θ has none)
            pos, quat = A.terrain_mocap(theta, origin, sp)
            mocap = jp.array(sp.terrain_mocap)
            data = data.replace(mocap_pos=data.mocap_pos.at[mocap].set(pos),
                                mocap_quat=data.mocap_quat.at[mocap].set(quat))
        state = state.replace(data=data)

        with self._perturbed(theta_now, dr, origin[2]):
            state = self.env.step(state, applied)

        # Strict termination and unclipped reward (Playground clips the per-step reward at 0),
        # with a real fall penalty.
        fall = self.fallen(state.data, theta_now, origin)
        env_done = state.done > 0
        done = env_done | fall
        rewards = sum(state.metrics[f"reward/{k}"] for k in self._scales)
        extra_term = (fall & ~env_done) * self._scales.get("termination", 0.0)
        reward = (rewards + extra_term) * self.dt - self._fall_penalty * done
        reward = jp.where(jp.isfinite(reward), reward, -self._fall_penalty)

        cmd = A.command(theta, time + self.dt, state.info["command"], sp)
        obs, hist = self._obs(theta, state.obs, state.data, k_obs, cmd, state.info["nemesis_hist"],
                              origin[2])

        # Episode end, including Brax's time-limit truncation (which this wrapper cannot see as
        # `done`): draw the next episode's θ and DR, and reset the clock, latency and history.
        # restart=False (evaluation) keeps the scenario running past the end, so a recording that
        # continues after a fall does not see the stairs, ice or pushes re-anchor from t=0.
        end = done | (t + 1 >= self._episode_length)
        if not restart:
            end = jp.zeros_like(end)
        new = end & state.info["nemesis_resample"]
        state.info.update(
            command=cmd,
            nemesis_theta=jp.where(new, self.sample_theta(k_theta), theta),
            nemesis_dr=jax.tree.map(lambda a, b: jp.where(new, a, b), self.sample_dr(k_dr), dr),
            nemesis_t=jp.where(end, 0, t + 1),
            nemesis_buf=jp.where(end, jp.zeros_like(buf), buf),
            nemesis_hist=jp.where(end, jp.zeros_like(hist), hist),
            nemesis_origin=origin,
            nemesis_rng=rng,
        )
        state.metrics["nemesis_fall"] = fall.astype(jp.float32)
        return state.replace(obs=obs, reward=reward, done=done.astype(state.done.dtype))
