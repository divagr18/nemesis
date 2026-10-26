"""Load Playground locomotion envs with project-wide settings."""

from mujoco_playground import registry

from nemesis import config


def load_env(name: str = config.BASE_ENV, impl: str = config.SIM_IMPL, **overrides):
    """Returns (env, env_config). `overrides` are passed to Playground as config overrides."""
    cfg = registry.get_default_config(name)
    env = registry.load(name, config=cfg, config_overrides={"impl": impl, **overrides})
    return env, cfg
