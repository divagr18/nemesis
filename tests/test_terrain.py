"""Terrain (stairs and curbs, Oct 27): layout, placement math, DSL, families, export, physics."""

import hashlib
import json
import os

import numpy as np
import pytest

from nemesis import robots
from nemesis.perturb import canonical as C
from nemesis.perturb import terrain as T

SIM = pytest.mark.skipif(os.environ.get("NEMESIS_SKIP_SIM"), reason="needs MJX")
K = robots.GO1.terrain_boxes
KS = K  # the stairs have every box when there is no ramp


def theta_with(**slots):
    t = C.neutral()
    for k, v in slots.items():
        t[C.INDEX[k]] = v
    return t


def stairs(h=0.08, d=0.3, n=3, start=1.0, **kw):
    return theta_with(stairs_height=h, stairs_depth=d, stairs_count=n, stairs_start=start, **kw)


# --- Layout -----------------------------------------------------------------------------------

def test_layout_prefix_unchanged():
    """The 63 original Go1 slots keep their indices, neutral, range and span (layout v1 values)."""
    h = hashlib.sha256()
    for a in (C.NEUTRAL, C.LO, C.HI, C.SPAN):
        h.update(np.asarray(a, np.float32)[:63].tobytes())
    h.update(repr([(k, v.start, v.stop) for k, v in C.INDEX.items() if v.start < 63]).encode())
    assert h.hexdigest() == "d88ee53ae3f3b353e4792dfd5f1f3d86e620ef55a83e46536c0b2b9051f282b7"
    assert [(n, C.INDEX[n].start) for n in T.SLOTS] == [
        ("stairs_height", 63), ("stairs_depth", 64), ("stairs_count", 65), ("stairs_start", 66)]
    assert np.all(C.NEUTRAL[63:] == 0) and np.all(C.LO[74:] == 0) and np.all(C.HI[74:] == 0)  # 67-73: the course
    assert [n for n in T.SLOTS if C.SLOT[n].neutral_off] == ["stairs_depth", "stairs_start"]
    assert "stairs_height" not in C.layout("g1").INDEX  # G1: no terrain yet


def test_zero_padding_means_flat_ground():
    """θ vectors from before the terrain slots (zeros in the padding) are neutral and flat."""
    from nemesis.adversary.modes import cause_family, has_terrain
    old = C.neutral()
    old[63:] = 0.0
    assert C.describe(old) == {} and not has_terrain(old)
    assert T.export_steps(old, C.GO1, K) is None
    pos, quat = T.mocap_poses(old, np.zeros(2), 0.3, C.GO1, K)
    assert np.allclose(pos, T.PARK_POS) and np.allclose(quat, [1, 0, 0, 0])
    np.testing.assert_array_equal(C.clip(old), old)  # the "off" neutrals survive clipping
    np.testing.assert_array_equal(C.normalized(old)[63:], -np.ones(17, np.float32))  # as the padding read
    old[C.INDEX["latency"]] = 2.0
    assert cause_family(old) == "timing"


# --- Placement --------------------------------------------------------------------------------

def test_stairs_placement():
    th = stairs(h=0.08, d=0.3, n=3, start=1.0)
    x0, top, used = T.segments(th.astype(np.float64), C.GO1, KS)
    assert used.tolist() == [True] * 3 + [False] * 5
    np.testing.assert_allclose(x0[:3], [1.0, 1.3, 1.6])
    np.testing.assert_allclose(top[:3], [0.08, 0.16, 0.24])
    # Drawn as non-overlapping blocks; the top step runs BOX_LENGTH from its riser.
    np.testing.assert_allclose(T.columns(th, C.GO1, K), [(1.0, 1.3, 0.08), (1.3, 1.6, 0.16),
                                                         (1.6, 1.6 + T.BOX_LENGTH, 0.24)], atol=1e-6)
    # World frame: start at (1, 2) heading +y. Box i's top front edge sits on riser i.
    yaw = np.pi / 2
    pos, quat = T.mocap_poses(th.astype(np.float64), np.array([1.0, 2.0]), yaw, C.GO1, K)
    np.testing.assert_allclose(pos[1], [1.0, 2.0 + 1.3 + T.BOX[0], 0.16 - T.BOX[2]], atol=1e-6)
    np.testing.assert_allclose(quat[1], [np.cos(yaw / 2), 0, 0, np.sin(yaw / 2)], atol=1e-6)
    np.testing.assert_allclose(pos[3:], np.tile(T.PARK_POS, (K - 3, 1)))  # the ramp boxes too
    assert np.all(pos[:3, 2] + T.BOX[2] - 2 * T.BOX[2] < 0)  # every box reaches below the floor
    # The same function traced by JAX (what the wrapper uses) gives the same poses.
    import jax.numpy as jp
    jpos, jquat = T.mocap_poses(jp.asarray(th), jp.array([1.0, 2.0]), yaw, C.GO1, K, jp)
    np.testing.assert_allclose(jpos, pos, atol=1e-5)
    np.testing.assert_allclose(jquat, quat, atol=1e-6)


def test_tallest_stairs_stay_buried():
    _, top, used = T.segments(stairs(h=0.15, d=0.2, n=8).astype(np.float64), C.GO1, KS)
    assert used.all() and top.max() - 2 * T.BOX[2] < 0


@pytest.mark.parametrize("count, h, expect", [(0.4, 0.1, 0), (0.6, 0.1, 1), (2.6, 0.1, 3), (8.0, 0.1, 8),
                                              (5.0, 0.0005, 0)])
def test_count_rounds_and_tiny_risers_are_flat(count, h, expect):
    _, _, used = T.segments(stairs(h=h, n=count).astype(np.float64), C.GO1, KS)
    assert int(used.sum()) == expect


def test_depth_and_start_are_clamped():
    """A hand-made θ with height but the "off" depth/start still yields valid boxes."""
    x0, _, used = T.segments(theta_with(stairs_height=0.1, stairs_count=2).astype(np.float64), C.GO1, KS)
    np.testing.assert_allclose(x0[:2], [0.5, 0.7])
    assert used[:2].all() and used.sum() == 2


def test_touches_is_exact_box_distance():
    th = stairs(h=0.1, d=0.3, n=1, start=1.0).astype(np.float64)  # a curb: x in [1, 3.4], top 0.1
    pts = np.array([[1.5, 0.0, 0.12], [1.5, 0.0, 0.09], [0.95, 0.0, 0.05], [1.5, 1.6, 0.05]])
    for p, r, want in [(0, 0.0, False), (0, 0.03, True), (1, 0.0, True), (2, 0.04, False), (2, 0.06, True),
                       (3, 0.05, False), (3, 0.11, True)]:
        assert T.touches(pts[p:p + 1], np.array([r]), th, np.zeros(2), 0.0, C.GO1, K) == want, (p, r)
    # Rotated start: the same point in the start frame.
    yaw, o = 0.7, np.array([2.0, -1.0])
    R = np.array([[np.cos(yaw), -np.sin(yaw)], [np.sin(yaw), np.cos(yaw)]])
    w = np.concatenate([o + R @ pts[1, :2], pts[1, 2:]])[None]
    assert T.touches(w, np.zeros(1), th, o, yaw, C.GO1, K)
    assert not T.touches(w, np.zeros(1), C.neutral(), o, yaw, C.GO1, K)


# --- DSL, families, controls -----------------------------------------------------------------

STAIRS = {"name": "stairs at a trot", "hypothesis": "the swing height is tuned for flat ground",
          "ops": [{"op": "stairs", "height": [0.02, 0.12], "depth": 0.28, "count": [1, 6], "start": 1.2},
                  {"op": "command", "a": [1.0, 0, 0]}]}


def test_dsl_round_trip():
    from nemesis.perturb import dsl
    c = dsl.compile_program(STAIRS)
    assert c.names == ["0.stairs.height", "0.stairs.count"]
    th = np.asarray(c.theta_unit(np.full(dsl.K_MAX, 0.5, np.float32)))
    assert th[C.INDEX["stairs_height"]][0] == pytest.approx(0.07)
    assert th[C.INDEX["stairs_count"]][0] == pytest.approx(3.5)
    assert th[C.INDEX["stairs_depth"]][0] == pytest.approx(0.28)
    assert th[C.INDEX["stairs_start"]][0] == pytest.approx(1.2)
    again = dsl.compile_program(dsl.Program.model_validate(STAIRS).model_dump_json())
    np.testing.assert_array_equal(again.base, c.base)
    np.testing.assert_array_equal(again.M, c.M)
    curb = dsl.compile_program({"name": "curb", "hypothesis": "h", "ops": [{"op": "curb", "height": 0.1, "start": 1.0}]})
    assert C.describe(curb.base) == {"stairs_height": 0.1, "stairs_depth": dsl.CURB_DEPTH, "stairs_count": 1.0,
                                     "stairs_start": 1.0}
    # Values beyond the envelope are clipped; one terrain op per program; G1 has no terrain ops.
    big = dsl.compile_program({"name": "x", "hypothesis": "y", "ops": [{"op": "curb", "height": 0.3, "start": 9}]})
    assert big.base[C.INDEX["stairs_height"]][0] == pytest.approx(0.15)
    assert big.base[C.INDEX["stairs_start"]][0] == pytest.approx(3.0)
    with pytest.raises(Exception):
        dsl.Program.model_validate({"name": "x", "hypothesis": "y", "ops": [
            {"op": "curb", "height": 0.1, "start": 1}, {"op": "stairs", "height": 0.1, "count": 2, "start": 1}]})
    with pytest.raises(Exception):
        dsl.compile_program({"name": "x", "hypothesis": "y", "ops": [{"op": "curb", "height": 0.1, "start": 1}]}, "g1")
    schema = json.dumps(dsl.json_schema())
    assert '"stairs"' in schema and '"curb"' in schema and '"curb"' not in json.dumps(dsl.json_schema("g1"))


def test_terrain_family_and_magnitudes():
    from nemesis.adversary.cmaes import NOT_MAGNITUDES, plausibility_cost
    from nemesis.adversary.modes import FAMILIES, OP_FAMILY, allowed_slots, cause_family, has_terrain
    assert OP_FAMILY["stairs"] == OP_FAMILY["curb"] == "terrain" and set(T.SLOTS) <= set(FAMILIES["terrain"])
    assert {"stairs_depth", "stairs_start"} <= set(NOT_MAGNITUDES)
    assert "stairs_height" not in NOT_MAGNITUDES and "stairs_count" not in NOT_MAGNITUDES
    curb = stairs(h=0.1, d=0.3, n=1, start=1.0)
    assert has_terrain(curb) and cause_family(curb) == "terrain"
    # Plausibility: only height and count deviate (depth/start are shape and position).
    want = np.sqrt(((0.1 / 0.15) ** 2 + (1 / 8) ** 2) / 2)
    assert plausibility_cost(curb[None])[0] == pytest.approx(want, rel=1e-5)
    assert "stairs_depth" in allowed_slots(["terrain"]) and "stairs_height" not in allowed_slots(["push"])
    assert "stairs_height" not in allowed_slots(["terrain"], C.layout("g1"))


def test_strict_metric_counts_terrain():
    import sys
    from pathlib import Path
    sys.path.insert(0, str(Path(__file__).parent.parent / "experiments"))
    import analyze
    total, fams = analyze._total_dev_and_families(stairs(h=0.1, n=1, start=2.5))
    assert fams == 1 and total == pytest.approx(np.hypot(0.1 / 0.15, 1 / 8), rel=1e-5)
    total, fams = analyze._total_dev_and_families(C.neutral())
    assert fams == 0 and total == 0


def test_controls_generate_terrain():
    from nemesis.adversary.baselines import BoxProgram, envelope, random_program, random_thetas
    from nemesis.adversary.modes import has_terrain
    from nemesis.perturb.dsl import K_MAX, compile_program
    ops = set()
    for seed in range(60):
        p = random_program(3, seed)
        assert 1 <= compile_program(p).k <= K_MAX
        ops |= {o.op for o in p.ops}
    assert {"stairs", "curb"} <= ops
    lo, hi = envelope(0.5)
    sl = C.INDEX["stairs_depth"]
    assert lo[sl][0] == pytest.approx(0.2) and hi[sl][0] == pytest.approx(0.6)  # full range at any width
    assert hi[C.INDEX["stairs_height"]][0] == pytest.approx(0.075)
    th = random_thetas(64, np.random.default_rng(0))
    assert np.mean([has_terrain(t) for t in th]) > 0.8
    box = BoxProgram()
    assert set(range(63, 67)) <= set(box.idx.tolist())


# --- Export -----------------------------------------------------------------------------------

def test_export_terrain_format():
    pytest.importorskip("mujoco")
    from nemesis.sim import export as E
    try:
        m = E.go1_model()
    except ImportError as e:
        pytest.skip(str(e))
    q = E.synthetic_qpos(m, seconds=1.0, fall_at=None, yaw0=0.4)
    assert E.trajectory(m, q, C.neutral(), 0.02)["overlays"]["terrain"] is None
    ov = E.trajectory(m, q, stairs(h=0.06, d=0.25, n=3, start=1.0), 0.02)["overlays"]
    assert ov["terrain"] == {"steps": [{"x0": 1.0, "x1": 1.25, "height": 0.06},
                                       {"x0": 1.25, "x1": 1.5, "height": 0.12},
                                       {"x0": 1.5, "x1": 3.9, "height": 0.18}], "width": 3.0, "ramps": []}
    json.dumps(ov)


# --- Physics (MJX on CPU) ---------------------------------------------------------------------

@pytest.fixture(scope="module")
def go1():
    from nemesis.envs.base import load_env
    return load_env()[0]


@SIM
def test_rebuild_keeps_the_robot_model(go1):
    """The MjSpec rebuild adds only the terrain bodies and boxes: every field of the old model
    (Playground's model + body collisions + per-foot contact) is unchanged, apart from names and
    the feet's new conaffinity bit for the steps."""
    import mujoco
    from mujoco_playground import registry
    from nemesis.envs import base
    m = go1.unwrapped._mj_model
    old = registry.load("Go1JoystickFlatTerrain", config_overrides={"impl": "jax"}).unwrapped._mj_model
    ids = base.body_collision_geom_ids(old)
    old.geom_conaffinity[ids] = 1
    base._feet_own_contact(old, robots.GO1)
    assert (m.nbody, m.ngeom, m.nmocap) == (old.nbody + K, old.ngeom + K, K)
    feet = list(go1.unwrapped._nemesis_spec.foot_geoms)
    skip = ("name", "names", "bvh", "mesh_bvhadr", "mesh_pathadr", "paths",
            "key_mpos", "key_mquat")  # keyframes gain the new mocap bodies' (parked) poses
    checked = 0
    for f in dir(m):
        a = getattr(m, f, None)
        if f.startswith(skip) or f.startswith("_") or not isinstance(a, np.ndarray):
            continue
        b = getattr(old, f)
        if a.shape != b.shape:
            a = a[:b.shape[0]]
        if f == "geom_conaffinity":
            a = a.copy()
            a[feet] &= 1
        np.testing.assert_array_equal(a, b, err_msg=f)
        checked += 1
    assert checked > 100
    for f in ("timestep", "ccd_iterations", "iterations", "ls_iterations", "cone", "solver", "disableflags"):
        assert getattr(m.opt, f) == getattr(old.opt, f), f
    # The floor and the step boxes never collide (no shared contype/conaffinity bit), and only
    # the feet collide with the steps.
    from mujoco.mjx._src.collision_driver import geom_pairs
    spec = go1.unwrapped._nemesis_spec
    pairs = {tuple(sorted(p[:2])) for p in geom_pairs(m)}
    with_steps = {g for p in pairs if set(p) & set(spec.terrain_geoms) for g in p} - set(spec.terrain_geoms)
    assert with_steps == set(spec.foot_geoms)
    assert mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_BODY, robots.terrain_body(0)) == 14


@SIM
def test_steps_are_data_not_model(go1):
    """Placing stairs moves mocap bodies; the model the physics compiles is untouched."""
    import jax
    import jax.numpy as jp
    from nemesis.perturb import apply as A
    from nemesis.perturb.wrapper import NemesisWrapper
    raw = go1.unwrapped
    spec = raw._nemesis_spec
    assert spec.terrain_geoms == robots.GO1_SPEC.terrain_geoms and spec.terrain_mocap == tuple(range(K))
    m = raw._mj_model
    np.testing.assert_allclose(m.body_pos[[m.geom_bodyid[g] for g in spec.terrain_geoms]], np.tile(T.PARK_POS, (K, 1)))
    w = NemesisWrapper(go1, base_dr=False)
    s = w.reset_with(jax.random.PRNGKey(0), jp.asarray(stairs()))
    np.testing.assert_allclose(s.data.mocap_pos, np.tile(T.PARK_POS, (K, 1)))  # parked until step 0
    s = jax.jit(w.step)(s, jp.zeros(raw.action_size))
    pos, _ = A.terrain_mocap(jp.asarray(stairs()), s.info["nemesis_origin"], spec)
    np.testing.assert_allclose(s.data.mocap_pos, pos, atol=1e-6)
    assert float(s.data.mocap_pos[0, 2]) == pytest.approx(0.08 - T.BOX[2], abs=1e-6)


def _stand_on_step(go1, h):
    """Robot spawned over a curb of height h (start pose lifted by h), held by the default pose."""
    import jax
    import jax.numpy as jp
    from mujoco import mjx
    from nemesis.perturb import apply as A
    raw = go1.unwrapped
    spec = raw._nemesis_spec
    s = raw.reset(jax.random.PRNGKey(0))
    q = s.data.qpos
    yaw = 2 * jp.arctan2(q[6], q[3])
    # The curb (riser 0.5 m from this origin, 2.4 m long) is under the whole robot.
    origin = jp.array([q[0] - 1.2 * jp.cos(yaw), q[1] - 1.2 * jp.sin(yaw), yaw])
    pos, quat = A.terrain_mocap(jp.asarray(stairs(h=h, d=0.3, n=1, start=0.5)), origin, spec)
    data = s.data.replace(qpos=q.at[2].add(h), mocap_pos=pos, mocap_quat=quat)
    s = s.replace(data=mjx.forward(raw._mjx_model, data))
    step = jax.jit(raw.step)
    for _ in range(60):
        s = step(s, jp.zeros(raw.action_size))
    c = s.data.contact
    geom, dist = np.asarray(c.geom), np.asarray(c.dist)
    on_step = np.isin(geom, spec.terrain_geoms).any(1) & (dist < 0.002)
    feet = {int(g) for g in geom[on_step].ravel()} & set(spec.foot_geoms)
    return float(s.data.qpos[2]), feet


@SIM
def test_robot_stands_on_a_step(go1):
    z0, _ = _stand_on_step(go1, 0.0)
    z, feet = _stand_on_step(go1, 0.1)
    assert feet == set(go1.unwrapped._nemesis_spec.foot_geoms)  # all four feet on the step
    assert z - z0 == pytest.approx(0.1, abs=0.01)


@SIM
def test_body_on_a_step_is_a_fall(go1):
    import jax
    import jax.numpy as jp
    from nemesis.perturb.wrapper import NemesisWrapper
    w = NemesisWrapper(go1, base_dr=False)
    s = w.reset_with(jax.random.PRNGKey(0), jp.asarray(C.NEUTRAL))
    q = s.data.qpos
    yaw = 2 * jp.arctan2(q[6], q[3])
    origin = jp.array([q[0] - 1.0 * jp.cos(yaw), q[1] - 1.0 * jp.sin(yaw), yaw])
    # A 0.15 m step around the standing robot's legs: the calves are inside it. A step ahead of
    # the robot (start 2 m from the same origin) or no step at all is not a fall.
    under, ahead = stairs(h=0.15, n=1, start=0.5), stairs(h=0.15, n=1, start=2.0)
    assert not bool(w.fallen(s.data, jp.asarray(C.NEUTRAL), origin))
    assert not bool(w.fallen(s.data, jp.asarray(ahead), origin))
    assert bool(w.fallen(s.data, jp.asarray(under), origin))


def test_replay_holds_the_fall_pose_on_terrain():
    """Only the feet collide with steps, so past a fall on stairs the recording holds the fall pose
    (a body would sink into the step); on flat ground the real tumble is kept."""
    from nemesis.perturb import canonical as C
    from nemesis.perturb.dsl import compile_program
    from nemesis.sim.export import hold_after_fall

    q = np.cumsum(np.ones((100, 19)), axis=0)
    stairs = compile_program({"name": "s", "hypothesis": "h", "ops": [
        {"op": "stairs", "height": 0.1, "count": 4, "start": 0.8}]}).base
    held = hold_after_fall(q, stairs, fall_time=1.0, dt=0.02)
    k = int(round(1.0 / 0.02)) + 1
    assert np.array_equal(held[:k + 1], q[:k + 1]) and (held[k:] == q[k]).all()
    assert np.array_equal(hold_after_fall(q, C.neutral(), 1.0, 0.02), q)
    assert np.array_equal(hold_after_fall(q, stairs, None, 0.02), q)
