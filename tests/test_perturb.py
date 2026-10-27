"""Perturbation engine tests. One jitted reset/step pair is shared by every scenario: θ is data,
so a single compile covers them all."""

import jax
import jax.numpy as jp
import numpy as np
import pytest

from nemesis.envs.base import load_env
from nemesis.perturb import apply as A
from nemesis.perturb import canonical as C
from nemesis.perturb.wrapper import NemesisWrapper


@pytest.fixture(scope="module")
def env():
    return load_env()[0]


@pytest.fixture(scope="module")
def sim(env):
    w = NemesisWrapper(env, base_dr=False)
    reset = jax.jit(w.reset_with)
    step = jax.jit(w.step)

    def run(theta, n, seed=0):
        s = reset(jax.random.PRNGKey(seed), jp.asarray(theta, jp.float32))
        a = jp.zeros(env.action_size)
        traj = []
        for _ in range(n):
            s = step(s, a)
            traj.append(s)
        return traj

    return w, run


def theta_with(**slots):
    t = C.neutral()
    for k, v in slots.items():
        t[C.INDEX[k]] = v
    return t


def test_layout():
    assert C.USED <= C.D
    inside = (C.LO <= C.NEUTRAL) & (C.NEUTRAL <= C.HI)
    assert np.all(inside | C.GO1.NEUTRAL_OFF)  # stairs_depth/start: "off" neutral 0 outside the range
    assert C.describe(C.neutral()) == {}


def test_neutral_model_is_unchanged(env):
    base = env.unwrapped._mjx_model
    m = A.apply_model(base, jp.asarray(C.NEUTRAL))
    for f in ("geom_friction", "body_mass", "body_ipos", "body_inertia", "actuator_gainprm",
              "actuator_biasprm", "actuator_forcerange", "dof_frictionloss"):
        np.testing.assert_allclose(getattr(m, f), getattr(base, f), atol=1e-6, err_msg=f)
    np.testing.assert_allclose(m.opt.gravity, base.opt.gravity, atol=1e-5)


def test_neutral_rollout_matches_raw_env(env, sim):
    """Neutral θ, no base DR: the wrapper reproduces the raw env's states.

    The jitted graphs differ, so float reassociation drifts slowly through contacts; a
    semantic difference (wrong friction, mass, push...) shows up as far larger errors.
    """
    _, run = sim
    step = jax.jit(env.step)
    s = env.reset(jax.random.PRNGKey(1))
    for _ in range(20):
        s = step(s, jp.zeros(env.action_size))
    w = run(C.neutral(), 20, seed=1)[-1]
    np.testing.assert_allclose(s.data.qpos, w.data.qpos, atol=1e-3)
    np.testing.assert_allclose(s.obs["state"], w.obs["state"][:48], atol=1e-2)


def test_weak_motors_collapse_onto_floor(env, sim):
    _, run = sim
    neutral = run(C.neutral(), 60, seed=2)
    weak = run(theta_with(motor_strength=0.3), 60, seed=2)
    assert float(weak[-1].data.qpos[2]) < float(neutral[-1].data.qpos[2]) - 0.015
    assert any(float(s.metrics["nemesis_fall"]) > 0 for s in weak)
    assert float(weak[-1].data.qpos[2]) > 0.05  # rests on the floor instead of sinking through
    assert not any(float(s.metrics["nemesis_fall"]) > 0 for s in neutral)
    assert len(env.unwrapped._nemesis_body_geoms) == 9  # trunk + 4 thighs + 4 calves


def test_push_moves_robot(sim):
    _, run = sim
    push = theta_with(push1_force=[0.0, 150.0, 0.0], push1_start=0.1, push1_duration=0.3)
    n = run(C.neutral(), 30, seed=3)[-1]
    p = run(push, 30, seed=3)[-1]
    assert float(p.data.qpos[1] - n.data.qpos[1]) > 0.05


def test_observation_shapes(sim):
    w, run = sim
    s = run(C.neutral(), 1)[-1]
    assert s.obs["state"].shape == w.observation_size["state"]
    assert s.obs["privileged_state"].shape == w.observation_size["privileged_state"]


def test_slope_gravity_reading():
    down = np.asarray(A.slope_down(jp.asarray(theta_with(slope=[0.2, 0.0]))))
    np.testing.assert_allclose(np.linalg.norm(down), 1.0, atol=1e-6)
    assert down[0] < 0  # gravity pulls backward when walking uphill along +x


def test_command_profile_and_ice():
    theta = jp.asarray(theta_with(command_mode=1.0, command_a=[1.0, 0, 0], command_b=[-1.0, 0, 0],
                                  command_switch=2.0, ice_mu=0.1, ice_start=1.0, ice_length=2.0))
    np.testing.assert_allclose(A.command(theta, 1.0, jp.zeros(3)), [1, 0, 0])
    np.testing.assert_allclose(A.command(theta, 2.5, jp.zeros(3)), [-1, 0, 0])
    np.testing.assert_allclose(A.slot(A.with_ice(theta, 0.5), "foot_friction"), 1.0)
    np.testing.assert_allclose(A.slot(A.with_ice(theta, 1.5), "foot_friction"), 0.1, atol=1e-6)


def test_latency_buffer():
    theta = jp.asarray(theta_with(latency=2.0))
    buf = jp.zeros((C.MAX_LATENCY + 1, 2))
    outs = []
    for i in range(1, 5):
        a, buf = A.delay_action(theta, buf, jp.full(2, float(i)))
        outs.append(float(a[0]))
    assert outs == [0.0, 0.0, 1.0, 2.0]


def test_training_stack_runs(env):
    """The wrapper works under Brax's vmap/episode/auto-reset training wrappers."""
    from mujoco_playground import wrapper
    w = NemesisWrapper(env, uniform=True, nominal_frac=0.5)
    venv = wrapper.wrap_for_brax_training(w, episode_length=20, action_repeat=1)
    s = jax.jit(venv.reset)(jax.random.split(jax.random.PRNGKey(0), 8))
    step = jax.jit(venv.step)
    for _ in range(25):
        s = step(s, jp.zeros((8, env.action_size)))
    assert s.info["nemesis_theta"].shape == (8, C.D)
    assert np.isfinite(np.asarray(s.obs["state"])).all()
