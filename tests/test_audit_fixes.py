"""Regression tests for the pre-experiment code audit (Oct 27). Each test pins one finding."""

import os

import jax
import jax.numpy as jp
import numpy as np
import pytest

from nemesis.perturb import apply as A
from nemesis.perturb import canonical as C


def theta_with(**slots):
    t = C.neutral()
    for k, v in slots.items():
        t[C.INDEX[k]] = v
    return jp.asarray(t)


@pytest.mark.parametrize("yaw", [0.0, 1.3, -2.4, 3.0])
def test_slope_is_relative_to_start_heading(yaw):
    """Audit #3: 'uphill' must be uphill whatever the random start yaw."""
    down = np.asarray(A.slope_down(theta_with(slope=[0.3, 0.0]), yaw))
    heading = np.array([np.cos(yaw), np.sin(yaw)])
    np.testing.assert_allclose(down[:2] @ heading, -np.sin(0.3), atol=1e-5)  # pulls backward


@pytest.mark.parametrize("yaw", [0.0, 1.3, -2.4])
def test_push_is_relative_to_start_heading(yaw):
    """Audit #3: 'shoved from behind' pushes along the robot's initial forward direction."""
    th = theta_with(push1_force=[100.0, 0.0, 0.0], push1_start=1.0, push1_duration=0.2)
    f = np.asarray(A.push_force(th, 1.1, yaw))
    np.testing.assert_allclose(f[:2], 100.0 * np.array([np.cos(yaw), np.sin(yaw)]), atol=1e-4)
    assert np.allclose(np.asarray(A.push_force(th, 0.5, yaw)), 0.0)


def test_noise_spares_action_and_command():
    """Audit LOW: sensor noise must not corrupt the last-action and command observations."""
    from types import SimpleNamespace
    obs = {"state": jp.zeros(48), "privileged_state": jp.zeros(123)}
    data = SimpleNamespace(xmat=jp.tile(jp.eye(3), (14, 1, 1)))
    out = A.perturb_obs(theta_with(obs_noise=0.3), obs, data, jax.random.PRNGKey(0), jp.zeros(3))
    assert np.allclose(np.asarray(out["state"][33:]), 0.0)
    assert np.abs(np.asarray(out["state"][:33])).sum() > 0


def test_forced_reset_interval_covers_an_episode(monkeypatch):
    """Audit #2: Brax forced resets every 3.2 s in a 50M/5-eval fine-tune."""
    monkeypatch.setenv("NEMESIS_PROFILE", "aws")
    from nemesis.train.ppo import ppo_config
    for steps, evals in ((50_000_000, 5), (40_000_000, 3), (200_000_000, 10)):
        p = ppo_config("Go1JoystickFlatTerrain", steps, evals)
        per_env = p.batch_size * p.num_minibatches // p.num_envs * p.unroll_length
        per_step = p.batch_size * p.num_minibatches * p.unroll_length
        if p.num_resets_per_eval:
            tspe = -(-p.num_timesteps // (max(p.num_evals - 1, 1) * per_step * p.num_resets_per_eval))
            assert tspe * per_env >= p.episode_length, (steps, evals, p.num_resets_per_eval)


def test_theta_normalizer_is_pinned_on_resume():
    """Audit #1: critic θ inputs had std ~1e-6 after a nominal-only baseline."""
    from brax.training.acme import running_statistics, specs
    from nemesis.train.ppo import _reset_theta_normalizer
    spec = {"state": specs.Array((144,), jp.float32), "privileged_state": specs.Array((123 + C.D,), jp.float32)}
    norm = running_statistics.init_state(spec)
    batch = {"state": jp.ones((64, 144)), "privileged_state": jp.ones((64, 123 + C.D))}
    norm = running_statistics.update(norm, batch)  # constant inputs -> std clamps to the minimum
    norm = jax.device_get(norm)  # checkpoints are saved with device_get and load as numpy
    fixed = _reset_theta_normalizer(norm)
    std = np.asarray(fixed.std["privileged_state"])
    assert np.allclose(std[-C.D:], 1.0) and np.allclose(np.asarray(fixed.mean["privileged_state"][-C.D:]), 0.0)
    theta = np.asarray(C.normalized(np.asarray(theta_with(foot_friction=0.05, latency=2.0))))
    z = running_statistics.normalize(
        {"state": jp.zeros(144), "privileged_state": jp.concatenate([jp.ones(123), jp.asarray(theta)])}, fixed)
    assert np.abs(np.asarray(z["privileged_state"][-C.D:])).max() <= 1.0 + 1e-5


def test_fitness_never_prefers_nan_or_stand_still():
    """Audit #4/#5: NaN candidates and non-falling survivors must not outrank real failures."""
    from nemesis.adversary.cmaes import fitness
    thetas = np.stack([C.neutral()] * 3)
    res = {"fell": np.array([[1] * 8, [0] * 8, [0] * 8], bool),
           "robustness": np.array([[-0.5] * 8, [0.0] * 8, [np.nan] * 8])}
    f, _, _ = fitness(res, thetas)
    assert np.argmin(f) == 0 and np.isinf(f[2])


@pytest.mark.skipif(os.environ.get("NEMESIS_SKIP_SIM"), reason="needs MJX")
def test_nan_state_is_a_fall_and_time_limit_resets_clock():
    """Audit #5 and #6."""
    from nemesis.envs.base import load_env
    from nemesis.perturb.wrapper import NemesisWrapper
    w = NemesisWrapper(load_env()[0], base_dr=False)
    s = w.reset_with(jax.random.PRNGKey(0), jp.asarray(C.NEUTRAL))
    bad = s.data.replace(qpos=s.data.qpos.at[0].set(jp.nan))
    assert bool(w.fallen(bad))
    w._episode_length = 5
    step = jax.jit(w.step)
    ts = []
    for _ in range(7):
        s = step(s, jp.zeros(12))
        ts.append(int(s.info["nemesis_t"]))
    assert ts[:6] == [1, 2, 3, 4, 0, 1]
