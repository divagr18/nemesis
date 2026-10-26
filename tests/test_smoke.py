import jax
import jax.numpy as jnp

from nemesis import config


def test_profiles():
    assert config.profile().num_envs > 0


def test_jax_runs():
    x = jnp.arange(4.0)
    assert float(jax.jit(lambda v: (v * v).sum())(x)) == 14.0


def test_mujoco_playground_imports():
    from mujoco_playground import registry

    assert config.BASE_ENV in registry.locomotion.ALL_ENVS
