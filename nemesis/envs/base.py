"""Load Playground locomotion envs with project-wide settings."""

import mujoco
from mujoco import mjx
from mujoco_playground import registry

from nemesis import config, robots
from nemesis.perturb import terrain

# Playground's Joystick scenes only let the feet touch the floor, so a fallen robot sinks
# through the ground. Go1: these geoms (trunk box, main thigh and calf capsules) are made to
# collide with the floor (floor contype=1; robot geoms keep contype=0, so no self-collision).
BODY_COLLISION_GEOMS = robots.GO1.collision_parts


def body_collision_geom_ids(m: mujoco.MjModel, robot: "str | robots.Robot" = "go1") -> list[int]:
    """Geoms that should touch the floor: the robot's named collision geoms, plus the largest geom
    of the given type on every body whose name ends with one of its collision parts."""
    r = robots.get(robot)
    best = {}
    for g in range(m.ngeom):
        body = mujoco.mj_id2name(m, mujoco.mjtObj.mjOBJ_BODY, m.geom_bodyid[g]) or ""
        part = next((p for p in r.collision_parts if body.endswith(p)), None)
        if part is None or m.geom_type[g] != r.collision_parts[part] or m.geom_conaffinity[g]:
            continue
        if body not in best or m.geom_rbound[g] > m.geom_rbound[best[body]]:
            best[body] = g
    named = [mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_GEOM, n)
             for n in (*r.collision_geoms, *(e[1] for e in r.extra_geoms))]
    return sorted(set(best.values()) | set(named))


def _feet_own_contact(m: mujoco.MjModel, r: robots.Robot) -> None:
    """Lets each foot set its own contact friction (robots with per-foot geoms, i.e. Go1).

    Playground's floor has contact priority over the feet, so every foot-floor contact takes the
    floor's friction, solref, solimp and condim, and per-foot friction is impossible. The feet get
    a copy of the floor's contact parameters and a higher priority instead: at neutral θ every
    contact parameter is unchanged (bit-identical rollouts), and apply_model can now set each
    foot's friction on its own (capped at the floor's, the trained nominal contact).
    """
    floor = mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_GEOM, "floor")
    for name in r.foot_geoms:
        g = mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_GEOM, name)
        m.geom_friction[g] = m.geom_friction[floor]
        m.geom_solref[g] = m.geom_solref[floor]
        m.geom_solimp[g] = m.geom_solimp[floor]
        m.geom_condim[g] = m.geom_condim[floor]
        m.geom_priority[g] = m.geom_priority[floor] + 1
    if r.foot_friction_cap is not None:
        assert abs(m.geom_friction[floor, 0] - r.foot_friction_cap) < 1e-6, "floor friction changed"


STEP_RGBA = (0.6, 0.6, 0.58, 1.0)  # concrete grey (mp4 overlays add an ember nosing)
STEP_CONTYPE = 2  # steps touch geoms whose conaffinity has bit 2: the feet only


def _steps_like_floor(m: mujoco.MjModel, r: robots.Robot) -> None:
    """Steps are floor: the floor's contact parameters and priority, so foot-step contacts take
    each foot's own friction exactly as foot-floor contacts do (see _feet_own_contact). The feet
    get conaffinity bit 2 so they collide with the steps (contype 2); their floor contacts (floor
    contype 1) are unchanged."""
    floor = mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_GEOM, "floor")
    for name in r.foot_geoms:
        g = mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_GEOM, name)
        m.geom_conaffinity[g] |= STEP_CONTYPE
    for i in range(r.terrain_boxes):
        g = mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_GEOM, robots.terrain_geom(i))
        for f in ("geom_friction", "geom_solref", "geom_solimp", "geom_condim", "geom_priority",
                  "geom_solmix", "geom_margin", "geom_gap"):
            getattr(m, f)[g] = getattr(m, f)[floor]


def _add_terrain(spec, r: robots.Robot) -> None:
    """Adds r.terrain_boxes terrain boxes on mocap bodies, parked under the floor (the wrapper moves
    them through data.mocap_pos/quat; see perturb/terrain.py): stairs, curbs, and a ramp with
    its landing (all the same size, terrain.box_sizes).

    The bodies come after the robot's, so no robot body or geom id moves (world geoms would
    precede the robot's). Every box has a fixed size: placing terrain changes only data,
    never a model field, so the jitted physics stays the same program as without terrain.
    Only the feet collide with them (contype bit 2, see _steps_like_floor): MJX's capsule-box and
    box-box collision functions would make every step ~5x slower (216 contacts instead of 24), so
    a body touching a step is found geometrically by the fall check (terrain.touches) instead,
    which ends the episode the same way. The floor (contype 1, conaffinity 0) never collides with
    them. Hidden (group 3): renderers draw the steps from θ (overlays, export).
    """
    for i, size in enumerate(terrain.box_sizes(r.terrain_boxes)):
        body = spec.worldbody.add_body(name=robots.terrain_body(i), mocap=True,
                                       pos=list(terrain.PARK_POS))
        body.add_geom(name=robots.terrain_geom(i), type=mujoco.mjtGeom.mjGEOM_BOX,
                      size=[float(v) for v in size], contype=STEP_CONTYPE, conaffinity=0, condim=3, mass=0,
                      group=3, rgba=list(STEP_RGBA))


def build_spec(raw, r: robots.Robot):
    """The env's MJCF as an MjSpec with the robot's primitive collision geoms (massless, hidden
    group 3) and terrain boxes added; Playground's post-load model edits are not in it."""
    spec = mujoco.MjSpec.from_file(str(raw.xml_path), assets=raw._model_assets)
    for body, name, gtype, size, where in r.extra_geoms:
        g = spec.body(body).add_geom(name=name, type=mujoco.mjtGeom(gtype), size=list(size),
                                     contype=0, conaffinity=0, group=3, condim=3, mass=0)
        if len(where) == 6:
            g.fromto = list(where)
        else:
            g.pos = list(where)
    if r.terrain_boxes:
        _add_terrain(spec, r)
    return spec


def _rebuild(raw, r: robots.Robot):
    """Rebuilds the env's model from build_spec, then re-runs the env's id lookup (added geoms can
    shift geom ids).

    Playground edits its model after loading it (timestep, CCD iterations, PD gains, joint and
    control ranges, framebuffer); those fields are copied over. tests/test_terrain.py checks that
    every other field of the robot's bodies and geoms is unchanged."""
    spec = build_spec(raw, r)
    old = raw._mj_model
    m = spec.compile()
    m.opt.timestep = old.opt.timestep
    m.opt.ccd_iterations = old.opt.ccd_iterations
    m.jnt_range[:] = old.jnt_range
    m.actuator_ctrlrange[:] = old.actuator_ctrlrange
    m.dof_damping[:] = old.dof_damping
    m.actuator_gainprm[:] = old.actuator_gainprm
    m.actuator_biasprm[:] = old.actuator_biasprm
    m.vis.global_.offwidth, m.vis.global_.offheight = old.vis.global_.offwidth, old.vis.global_.offheight
    raw._mj_model = m
    raw._post_init()


def load_env(name: str = config.BASE_ENV, impl: str = config.SIM_IMPL, body_collisions: bool = True,
             robot: "str | None" = None, **overrides):
    """Returns (env, env_config). `overrides` are passed to Playground as config overrides.

    `robot` (a robots.ROBOTS key) picks that robot's env instead of `name`. The raw env gets a
    `_nemesis_spec` (robots.Spec) that the wrapper, evaluator and overlays read.
    """
    r = robots.get(robot) if robot else robots.for_env(name)
    name = r.env if robot else name
    cfg = registry.get_default_config(name)
    env = registry.load(name, config=cfg, config_overrides={"impl": impl, **overrides})
    raw = env.unwrapped
    ids = []
    if body_collisions:
        if r.extra_geoms or r.terrain_boxes:
            _rebuild(raw, r)
        m = raw._mj_model
        ids = body_collision_geom_ids(m, r)
        m.geom_conaffinity[ids] = 1
        if r.foot_geoms:
            _feet_own_contact(m, r)
        if r.terrain_boxes:
            _steps_like_floor(m, r)
        raw._mjx_model = mjx.put_model(m, impl=impl)
        raw._nemesis_body_geoms = ids
    raw._nemesis_spec = robots.resolve(r, raw._mj_model, ids)
    return env, cfg
