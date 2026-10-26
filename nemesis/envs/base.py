"""Load Playground locomotion envs with project-wide settings."""

import mujoco
from mujoco import mjx
from mujoco_playground import registry

from nemesis import config

# Playground's Joystick scene only lets the feet touch the floor, so a fallen robot sinks
# through the ground. These geoms (trunk box, main thigh and calf capsules) are made to
# collide with the floor (floor contype=1; robot geoms keep contype=0, so no self-collision).
BODY_COLLISION_GEOMS = {
    "trunk": mujoco.mjtGeom.mjGEOM_BOX,
    "thigh": mujoco.mjtGeom.mjGEOM_CAPSULE,
    "calf": mujoco.mjtGeom.mjGEOM_CAPSULE,
}


def body_collision_geom_ids(m: mujoco.MjModel) -> list[int]:
    """The largest geom of the given type on the trunk and on every thigh and calf."""
    best = {}
    for g in range(m.ngeom):
        body = mujoco.mj_id2name(m, mujoco.mjtObj.mjOBJ_BODY, m.geom_bodyid[g]) or ""
        part = next((p for p in BODY_COLLISION_GEOMS if body.endswith(p)), None)
        if part is None or m.geom_type[g] != BODY_COLLISION_GEOMS[part] or m.geom_conaffinity[g]:
            continue
        if body not in best or m.geom_rbound[g] > m.geom_rbound[best[body]]:
            best[body] = g
    return sorted(best.values())


def load_env(name: str = config.BASE_ENV, impl: str = config.SIM_IMPL, body_collisions: bool = True,
             **overrides):
    """Returns (env, env_config). `overrides` are passed to Playground as config overrides."""
    cfg = registry.get_default_config(name)
    env = registry.load(name, config=cfg, config_overrides={"impl": impl, **overrides})
    if body_collisions:
        m = env.unwrapped._mj_model
        ids = body_collision_geom_ids(m)
        m.geom_conaffinity[ids] = 1
        env.unwrapped._mjx_model = mjx.put_model(m, impl=impl)
        env.unwrapped._nemesis_body_geoms = ids
    return env, cfg
