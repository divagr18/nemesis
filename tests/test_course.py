"""The course (Oct 28): ramp, flights that come back down, a second ice patch, the `course` op,
export format, and the robot-aware export (G1 scene and trajectories)."""

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
KS = K - T.N_RAMP_BOXES  # the stairs' boxes when there is a ramp


def theta_with(**slots):
    t = C.neutral()
    for k, v in slots.items():
        t[C.INDEX[k]] = v
    return t


def ramp(angle=10.0, start=1.0, length=2.0, **kw):
    return theta_with(ramp_angle=angle, ramp_start=start, ramp_length=length, **kw)


def porch(h=0.06, d=0.3, n=3, start=0.5, landing=1.5, **kw):
    return theta_with(stairs_height=h, stairs_depth=d, stairs_count=n, stairs_start=start, stairs_landing=landing, **kw)


HEADLINE = {"name": "out the door", "hypothesis": "a route from a sentence", "ops": [
    {"op": "course", "segments": [
        {"kind": "stairs_up", "gap": 0.5, "height": 0.05, "count": 3, "depth": 0.25},
        {"kind": "stairs_down"},
        {"kind": "ice", "gap": 0.2, "mu": 0.08, "length": 1.5},
        {"kind": "ramp", "angle": 8, "length": 2}]},
    {"op": "command", "a": [1.0, 0, 0]}]}


# --- Layout -----------------------------------------------------------------------------------

def test_course_slots_appended():
    assert [(n, C.INDEX[n].start) for n in T.COURSE_SLOTS] == [
        ("ramp_angle", 67), ("ramp_start", 68), ("ramp_length", 69), ("stairs_landing", 70),
        ("ice2_slip", 71), ("ice2_start", 72), ("ice2_length", 73)]
    assert C.USED == 74 and np.all(C.NEUTRAL[63:] == 0)
    assert [n for n in T.COURSE_SLOTS if C.SLOT[n].neutral_off] == ["ramp_start", "ramp_length", "stairs_landing"]
    # Slots 0-66 are layout v2 exactly: with 67-79 reset to padding, the v2 hash comes back.
    h = hashlib.sha256()
    for a, pad in ((C.NEUTRAL, 0.0), (C.LO, 0.0), (C.HI, 0.0), (C.SPAN, 1.0)):
        a = np.asarray(a, np.float32).copy()
        a[67:] = pad
        h.update(a.tobytes())
    h.update(repr([(k, v.start, v.stop) for k, v in C.INDEX.items() if v.start < 67]).encode())
    assert h.hexdigest() == "fef3fefabcf442d671fb04fb366d734f3bceedc84eb685d50524cbe7126fdbd2"


def test_old_theta_has_no_course():
    """θ from before the course slots (zeros in 67-79) is neutral: no ramp, no descent, no patch,
    and the critic input reads them as the padding did (-1)."""
    from nemesis.adversary.modes import has_terrain
    old = C.neutral()
    old[67:] = 0.0
    assert C.describe(old) == {} and not has_terrain(old)
    assert T.export_terrain(old, C.GO1, K) is None and T.ice_patches(old, C.GO1) == []
    np.testing.assert_array_equal(C.normalized(old)[67:], -np.ones(13, np.float32))
    np.testing.assert_array_equal(C.clip(old), old)
    pos, quat = T.mocap_poses(old, np.zeros(2), -0.4, C.GO1, K)
    assert np.allclose(pos, T.PARK_POS) and np.allclose(quat, [1, 0, 0, 0])


def test_stairs_poses_unchanged_by_the_course():
    """Up-only stairs give the same step-box poses as layout v2 did (value for value)."""
    th = theta_with(stairs_height=0.08, stairs_depth=0.3, stairs_count=3, stairs_start=1.0).astype(np.float64)
    pos, quat = T.mocap_poses(th, np.array([1.0, 2.0]), -0.7, C.GO1, K)
    yaw = -0.7
    for i in range(3):
        x = 1.0 + i * 0.3 + T.BOX[0]
        np.testing.assert_allclose(pos[i], [1.0 + np.cos(yaw) * x, 2.0 + np.sin(yaw) * x, 0.08 * (i + 1) - T.BOX[2]])
        np.testing.assert_array_equal(quat[i], [np.cos(yaw / 2), 0.0 * yaw, 0.0 * yaw, np.sin(yaw / 2)])


# --- Placement --------------------------------------------------------------------------------

def _box_corners(pos, quat, half):
    import mujoco
    R = np.zeros(9)
    mujoco.mju_quat2Mat(R, np.asarray(quat, np.float64))
    R = R.reshape(3, 3)
    signs = np.array([[sx, sy, sz] for sx in (-1, 1) for sy in (-1, 1) for sz in (-1, 1)], np.float64)
    return pos + (signs * half) @ R.T


def test_ramp_pose():
    """The ramp box's top face runs from (start, 0) to (start + run, run * tan(angle)) along the
    heading, whatever the start yaw; the landing's top is at the ramp's height."""
    pytest.importorskip("mujoco")
    th = ramp(angle=10.0, start=1.0, length=2.0).astype(np.float64)
    H = 2.0 * np.tan(np.deg2rad(10.0))
    for yaw, origin in ((0.0, np.zeros(2)), (0.9, np.array([2.0, -1.0]))):
        pos, quat = T.mocap_poses(th, origin, yaw, C.GO1, K)
        assert np.allclose(pos[:KS - 1], T.PARK_POS)  # box KS - 1 = K - 3: the second landing box
        c = _box_corners(pos[K - 1], quat[K - 1], np.asarray(T.BOX))
        R = np.array([[np.cos(yaw), np.sin(yaw)], [-np.sin(yaw), np.cos(yaw)]])
        local = np.c_[(c[:, :2] - origin) @ R.T, c[:, 2]]
        top = local[np.argsort(local[:, 2])[-4:]]  # the top face's corners
        far = top[np.argmax(top[:, 0])]
        assert far[0] == pytest.approx(3.0, abs=1e-6) and far[2] == pytest.approx(H, abs=1e-6)
        assert abs(far[1]) == pytest.approx(T.BOX[1], abs=1e-6)
        # The top face's plane meets the floor at the start (its near edge is under the floor).
        near = top[np.argmin(top[:, 0])]
        slope = (far[2] - near[2]) / (far[0] - near[0])
        assert slope == pytest.approx(np.tan(np.deg2rad(10.0)), rel=1e-6)
        assert far[0] - far[2] / slope == pytest.approx(1.0, abs=1e-6) and near[2] < 0
        land = _box_corners(pos[K - 2], quat[K - 2], np.asarray(T.BOX))
        land = np.c_[(land[:, :2] - origin) @ R.T, land[:, 2]]
        assert land[:, 2].max() == pytest.approx(H, abs=1e-6) and land[:, 0].min() == pytest.approx(3.0, abs=1e-6)
        assert land[:, 2].min() < 0 and land[:, 0].max() == pytest.approx(3.0 + T.LANDING_LENGTH, abs=1e-6)
        # No stairs: box K-3 extends the landing to 4.8 m.
        land2 = _box_corners(pos[K - 3], quat[K - 3], np.asarray(T.BOX))
        land2 = np.c_[(land2[:, :2] - origin) @ R.T, land2[:, 2]]
        assert land2[:, 2].max() == pytest.approx(H, abs=1e-6)
        assert land2[:, 0].min() == pytest.approx(3.0 + T.LANDING_LENGTH, abs=1e-6)
    assert T.ramps(th, C.GO1, K)[1] == pytest.approx((3.0, 3.0 + 2 * T.LANDING_LENGTH, H, H))
    # Stairs using 6 boxes leave the ramp a single landing box.
    th6 = theta_with(stairs_height=0.05, stairs_count=6, stairs_start=0.5, stairs_depth=0.3, ramp_angle=10.0,
                     ramp_start=4.0, ramp_length=2.0)
    assert T.ramps(th6, C.GO1, K)[1][1] == pytest.approx(6.0 + T.LANDING_LENGTH)
    assert T.local_boxes(th6.astype(np.float64), C.GO1, K)[2].all()
    # The same poses traced by JAX (what the wrapper uses).
    import jax.numpy as jp
    jpos, jquat = T.mocap_poses(jp.asarray(th), jp.array([2.0, -1.0]), 0.9, C.GO1, K, jp)
    np.testing.assert_allclose(jpos, pos, atol=1e-5)
    np.testing.assert_allclose(jquat, quat, atol=1e-6)


def test_ramp_clamps_and_off():
    _, _, H, _, used = T.ramp(ramp(angle=30.0, start=9.0, length=5.0).astype(np.float64), C.GO1)
    assert used and H == pytest.approx(T.MAX_RAMP_RUN * np.tan(np.deg2rad(15.0)))
    # The longest, steepest ramp's top face still starts under the floor.
    pos, quat = T.mocap_poses(ramp(angle=15.0, length=T.MAX_RAMP_RUN).astype(np.float64), np.zeros(2), 0.0, C.GO1, K)
    assert _box_corners(pos[K - 1], quat[K - 1], np.asarray(T.BOX))[:, 2].min() < -0.5
    assert not T.ramp(ramp(angle=0.05).astype(np.float64), C.GO1)[4]


def _profile(theta, x):
    """Terrain height at x along the heading from the boxes themselves (union of solids)."""
    center, pitch, used = T.local_boxes(np.asarray(theta, np.float64), C.GO1, K)
    half = T.box_sizes(K)
    z = 0.0
    for c, p, u, h in zip(center, pitch, used, half):
        if not u:
            continue
        if abs(p) < 1e-9 or abs(p - np.pi / 2) < 1e-9:
            hx, hz = (h[0], h[2]) if abs(p) < 1e-9 else (h[2], h[0])
            if c[0] - hx <= x < c[0] + hx:
                z = max(z, c[2] + hz)
    return z


def test_descent_heights():
    """A flight that comes back down: the boxes' union is up 3 steps, a 1.5 m landing, down 3."""
    th = porch(h=0.06, d=0.3, n=3, start=0.5, landing=1.5)
    cols = T.columns(th, C.GO1, K)
    np.testing.assert_allclose(cols, [(0.5, 0.8, 0.06), (0.8, 1.1, 0.12), (1.1, 2.6, 0.18),
                                      (2.6, 2.9, 0.12), (2.9, 3.2, 0.06)], atol=1e-6)
    for x0, x1, h in cols:  # the physics boxes make exactly that profile
        for x in np.linspace(x0 + 1e-3, x1 - 1e-3, 5):
            assert _profile(th, x) == pytest.approx(h, abs=1e-6), x
    assert _profile(th, 0.49) == 0 and _profile(th, 3.21) == 0
    for landing in (1.5, 2.2, 3.0):  # landings 1.5-3 m are covered by the two top boxes
        th = porch(landing=landing, d=0.2, n=4)
        for x0, x1, h in T.columns(th, C.GO1, K):
            for x in np.linspace(x0 + 1e-3, x1 - 1e-3, 7):
                assert _profile(th, x) == pytest.approx(h, abs=1e-6)
    # More than 4 steps: capped at 4 each way (8 boxes); with a ramp, 3 each way and 6 up.
    _, _, used = T.stairs(porch(n=6).astype(np.float64), C.GO1, K)
    assert used.sum() == 8
    _, _, used = T.stairs(porch(n=6, ramp_angle=5.0).astype(np.float64), C.GO1, K)
    assert used.sum() == 6 and not used[-2:].any()
    th = theta_with(stairs_height=0.05, stairs_count=8, stairs_start=1.0, stairs_depth=0.3, ramp_angle=5.0,
                    ramp_start=4.0, ramp_length=1.0)
    _, _, used = T.local_boxes(th.astype(np.float64), C.GO1, K)
    assert used.all() and len(T.columns(th, C.GO1, K)) == 6
    from nemesis.adversary.modes import has_terrain
    assert has_terrain(porch()) and has_terrain(ramp())


def test_touches_tilted_box():
    th = ramp(angle=10.0, start=1.0, length=2.0).astype(np.float64)
    z = np.tan(np.deg2rad(10.0)) * 1.0  # surface height 1 m up the ramp (x = 2)
    for dz, r, want in ((0.01, 0.0, False), (-0.01, 0.0, True), (0.03, 0.04, True), (0.03, 0.02, False)):
        p = np.array([[2.0, 0.0, z + dz]])
        assert T.touches(p, np.array([r]), th, np.zeros(2), 0.0, C.GO1, K) == want, (dz, r)
    assert T.touches(np.array([[4.0, 0.0, 0.3]]), np.zeros(1), th, np.zeros(2), 0.0, C.GO1, K)  # in the landing
    assert not T.touches(np.array([[0.9, 0.0, 0.01]]), np.zeros(1), th, np.zeros(2), 0.0, C.GO1, K)
    # Stood-on-end step boxes of a flight that comes back down.
    pr = porch(h=0.06, d=0.3, n=3, start=0.5, landing=1.5).astype(np.float64)
    assert T.touches(np.array([[2.0, 0.0, 0.17]]), np.zeros(1), pr, np.zeros(2), 0.0, C.GO1, K)
    assert not T.touches(np.array([[2.0, 0.0, 0.19]]), np.zeros(1), pr, np.zeros(2), 0.0, C.GO1, K)
    assert not T.touches(np.array([[3.3, 0.0, 0.01]]), np.zeros(1), pr, np.zeros(2), 0.0, C.GO1, K)


def test_ice2_window():
    import jax.numpy as jp
    from nemesis.perturb import apply as A
    th = jp.asarray(theta_with(ice2_slip=0.9, ice2_start=2.0, ice2_length=1.5,
                               ice_mu=0.3, ice_start=0.5, ice_length=0.5))
    mu = lambda d: np.asarray(A.with_ice(th, d)[C.INDEX["foot_friction"]])  # noqa: E731
    np.testing.assert_allclose(mu(1.9), [1.0] * 4)
    np.testing.assert_allclose(mu(2.0), [0.1] * 4, atol=1e-6)
    np.testing.assert_allclose(mu(3.4), [0.1] * 4, atol=1e-6)
    np.testing.assert_allclose(mu(3.5), [1.0] * 4)
    np.testing.assert_allclose(mu(0.7), [0.3] * 4, atol=1e-6)  # the first patch still works
    off = jp.asarray(theta_with(ice2_start=2.0, ice2_length=1.5))  # no slip: no patch
    np.testing.assert_allclose(np.asarray(A.with_ice(off, 2.5)[C.INDEX["foot_friction"]]), [1.0] * 4)
    np.testing.assert_allclose(T.ice_patches(np.asarray(th), C.GO1), [(0.3, 0.5, 0.5), (0.1, 2.0, 1.5)], atol=1e-6)


# --- DSL --------------------------------------------------------------------------------------

def test_course_round_trip():
    from nemesis.perturb import dsl
    c = dsl.compile_program(HEADLINE)
    assert c.k == 0
    assert C.describe(c.base) == pytest.approx({
        "ice_mu": 0.08, "ice_start": 3.2, "ice_length": 1.5, "command_mode": 1.0, "command_a": [1.0, 0.0, 0.0],
        "command_b": [1.0, 0.0, 0.0], "stairs_height": 0.05, "stairs_depth": 0.25, "stairs_count": 3.0,
        "stairs_start": 0.5, "ramp_angle": 8.0, "ramp_start": 4.7, "ramp_length": 2.0, "stairs_landing": 1.5})
    again = dsl.compile_program(dsl.Program.model_validate(HEADLINE).model_dump_json())
    np.testing.assert_array_equal(again.base, c.base)
    ter = T.export_terrain(c.base, C.GO1, K)
    assert [s["height"] for s in ter["steps"]] == [0.05, 0.1, 0.15, 0.1, 0.05]
    assert ter["steps"][-1]["x1"] == 3.0 and ter["ramps"][0]["x0"] == 4.7
    # Ranges: searched heights / angles / mu, the second patch as slip = 1 - mu.
    prog = {"name": "x", "hypothesis": "y", "ops": [
        {"op": "ice_patch", "mu": 0.1, "start": 0.2, "length": 0.5},
        {"op": "course", "segments": [{"kind": "curb", "gap": 1.0, "height": [0.02, 0.1]},
                                      {"kind": "wet", "gap": 0.2, "mu": [0.2, 0.4], "length": 1.0}]}]}
    c = dsl.compile_program(prog)
    assert c.names == ["1.course.0.curb.height", "1.course.1.wet.mu"]
    np.testing.assert_allclose(c.lo[:2], [0.02, 0.6]) and np.testing.assert_allclose(c.hi[:2], [0.1, 0.8])
    th = np.asarray(c.theta_unit(np.full(dsl.K_MAX, 0.5, np.float32)))
    assert th[C.INDEX["ice2_slip"]][0] == pytest.approx(0.7) and th[C.INDEX["ice2_start"]][0] == pytest.approx(1.2)
    assert th[C.INDEX["ice_mu"]][0] == pytest.approx(0.1)  # the ice_patch op keeps the first patch
    # A ramp that rises out of a raised top starts at the top's height.
    c = dsl.compile_program({"name": "x", "hypothesis": "y", "ops": [{"op": "course", "segments": [
        {"kind": "curb", "gap": 1.0, "height": 0.05}, {"kind": "ramp", "gap": 0.5, "angle": 5, "length": 1.0}]}]})
    x0, x1, h0, h1 = T.ramps(c.base, C.GO1, K)[0]
    assert x0 + 0.05 / np.tan(np.deg2rad(5)) == pytest.approx(1.5, abs=1e-4) and x1 == pytest.approx(2.5, abs=1e-5)
    assert "course" in json.dumps(dsl.json_schema()) and "course" not in json.dumps(dsl.json_schema("g1"))


@pytest.mark.parametrize("segments, msg", [
    ([{"kind": "stairs_down"}], "needs a stairs_up or curb"),
    ([{"kind": "curb", "gap": 1, "height": 0.05}, {"kind": "ice", "gap": 3, "length": 1}], "past the end of the raised top"),
    ([{"kind": "ramp", "gap": 1, "angle": 20, "length": 1}], "between 0.1 and 15 degrees"),
    ([{"kind": "ramp", "gap": 1, "angle": 5, "length": 1}, {"kind": "curb", "height": 0.05}], "only ice or wet"),
    ([{"kind": "stairs_up", "gap": 1, "height": 0.05, "count": 6}, {"kind": "stairs_down"}], "at most 4 steps"),
    ([{"kind": "stairs_up", "gap": 4, "height": 0.05, "count": 2}], "must begin 0.5-3.0 m ahead"),
    ([{"kind": "curb", "gap": 1, "height": [0.02, 0.1]}, {"kind": "ramp", "angle": 5, "length": 1}], "fixed angle"),
    ([{"kind": "curb", "gap": 1, "height": 0.05}, {"kind": "curb", "height": 0.05}], "only one stairs_up or curb"),
    ([{"kind": "curb", "gap": 1, "height": 0.05}, {"kind": "stairs_down", "gap": 0.5}], "1.5-3.0 m"),
    ([{"kind": "ice", "gap": 1, "length": 1}, {"kind": "wet", "length": 1}, {"kind": "ice", "length": 1}], "at most 2"),
])
def test_course_errors(segments, msg):
    from nemesis.perturb import dsl
    with pytest.raises(ValueError, match=msg):
        dsl.Program.model_validate({"name": "b", "hypothesis": "b", "ops": [{"op": "course", "segments": segments}]})


def test_course_program_rules():
    from nemesis.perturb import dsl
    course = {"op": "course", "segments": [{"kind": "ice", "gap": 1, "length": 1}, {"kind": "wet", "length": 1}]}
    with pytest.raises(ValueError, match="at most 1 stairs, curb or course"):
        dsl.Program.model_validate({"name": "x", "hypothesis": "y", "ops": [course, {"op": "curb", "height": 0.1, "start": 1}]})
    with pytest.raises(ValueError, match="at most 2 low-friction patches"):
        dsl.Program.model_validate({"name": "x", "hypothesis": "y", "ops": [
            course, {"op": "ice_patch", "mu": 0.1, "start": 0, "length": 1}]})
    with pytest.raises(Exception):
        dsl.compile_program({"name": "x", "hypothesis": "y", "ops": [course]}, "g1")


# --- Families, metrics, controls --------------------------------------------------------------

def test_course_families_and_magnitudes():
    from nemesis.adversary.cmaes import NOT_MAGNITUDES, plausibility_cost
    from nemesis.adversary.modes import FAMILIES, OP_FAMILY, cause_family
    assert OP_FAMILY["course"] == "terrain"
    assert {"ramp_angle", "ramp_start", "ramp_length", "stairs_landing"} <= set(FAMILIES["terrain"])
    assert {"ice2_slip", "ice2_start", "ice2_length"} <= set(FAMILIES["friction"])
    assert {"ramp_start", "ramp_length", "stairs_landing", "ice2_start"} <= set(NOT_MAGNITUDES)
    assert not {"ramp_angle", "ice2_slip", "ice2_length"} & set(NOT_MAGNITUDES)
    assert cause_family(ramp()) == "terrain"
    ice1 = theta_with(ice_mu=0.1, ice_start=1.0, ice_length=2.0)
    ice2 = theta_with(ice2_slip=0.9, ice2_start=1.0, ice2_length=2.0)
    assert cause_family(ice2) == "friction"
    assert plausibility_cost(ice2[None])[0] == pytest.approx(plausibility_cost(ice1[None])[0], rel=1e-5)
    assert plausibility_cost(ramp(angle=7.5)[None])[0] == pytest.approx(0.5, rel=1e-5)
    assert all(n in C.INDEX for n in NOT_MAGNITUDES) and not (C.GO1.NEUTRAL_OFF & ~np.isin(
        np.arange(C.D), [i for n in NOT_MAGNITUDES for i in range(C.INDEX[n].start, C.INDEX[n].stop)])).any()


def test_controls_unchanged_and_course_programs():
    """random_program, random_thetas and the box arm draw what they drew before the course
    (digests from commit 82b66cb); random_course_program adds buildable courses."""
    from nemesis.adversary.baselines import BoxProgram, envelope, random_course_program, random_program, random_thetas
    from nemesis.perturb.dsl import K_MAX, compile_program
    h = hashlib.sha256()
    for seed in range(200):
        for n in (1, 2, 3):
            h.update(random_program(n, seed).model_dump_json().encode())
    assert h.hexdigest() == "1d6ecd86553c4cebf77a4846e96212a17aecca2cf16325d2e3b21603dfe38d99"
    th = random_thetas(64, np.random.default_rng(0))
    assert hashlib.sha256(th.tobytes()).hexdigest() == "7580501d5951190f585e087af452deb1d24de3e3912d81914bde80881f51cd21"
    assert BoxProgram().k == 66 and not set(range(67, 74)) & set(BoxProgram().idx.tolist())
    assert set(range(67, 74)) <= set(BoxProgram(course=True).idx.tolist())
    lo, hi = envelope(0.5)
    assert np.all(lo[67:] == 0) and np.all(hi[67:] == 0)
    assert envelope(0.5, course=True)[1][C.INDEX["ramp_angle"]][0] == pytest.approx(7.5)
    kinds = set()
    for seed in range(120):
        p = random_course_program(3, seed)
        assert 1 <= compile_program(p).k <= K_MAX
        kinds |= {s.kind for o in p.ops if o.op == "course" for s in o.segments}
    assert {"curb", "stairs_up", "stairs_down", "ramp", "ice"} <= kinds


def test_proposer_mentions_the_course():
    from nemesis.adversary.proposer import system_prompt
    text = system_prompt()
    assert "course" in text and "ramp_angle" in text and "ice2_slip" in text


# --- Export -----------------------------------------------------------------------------------

def test_export_course_format():
    pytest.importorskip("mujoco")
    from nemesis.perturb import dsl
    from nemesis.sim import export as E
    try:
        m = E.go1_model()
    except ImportError as e:
        pytest.skip(str(e))
    q = E.synthetic_qpos(m, seconds=1.0, fall_at=None, yaw0=0.4)
    ov = E.trajectory(m, q, C.neutral(), 0.02)["overlays"]
    assert ov["terrain"] is None and ov["ice"] is None and ov["ice_patches"] == []
    th = dsl.compile_program(HEADLINE).base.copy()
    th[C.INDEX["ice2_slip"]], th[C.INDEX["ice2_start"]], th[C.INDEX["ice2_length"]] = 0.7, 6.0, 1.0
    ov = E.trajectory(m, q, th, 0.02)["overlays"]
    assert ov["terrain"] == {
        "steps": [{"x0": 0.5, "x1": 0.75, "height": 0.05}, {"x0": 0.75, "x1": 1.0, "height": 0.1},
                  {"x0": 1.0, "x1": 2.5, "height": 0.15}, {"x0": 2.5, "x1": 2.75, "height": 0.1},
                  {"x0": 2.75, "x1": 3.0, "height": 0.05}],
        "width": 3.0,
        "ramps": [{"x0": 4.7, "x1": 6.7, "h0": 0.0, "h1": 0.2811}, {"x0": 6.7, "x1": 9.1, "h0": 0.2811, "h1": 0.2811}]}
    assert ov["ice"]["mu"] == 0.08 and ov["ice_patches"][0] == ov["ice"]
    assert [p["mu"] for p in ov["ice_patches"]] == [0.08, 0.3] and ov["ice_patches"][1]["start"] == 6.0
    assert set(ov["ice_patches"][1]) == set(ov["ice"])
    json.dumps(ov)


def test_export_go1_unchanged_by_robot_argument():
    pytest.importorskip("mujoco")
    from nemesis.sim import export as E
    try:
        m = E.go1_model()
    except ImportError as e:
        pytest.skip(str(e))
    th, q = E.sample_theta(), E.synthetic_qpos(m, seconds=2.0, fall_at=1.0)
    a = json.dumps(E.trajectory(m, q, th, 0.02))
    assert a == json.dumps(E.trajectory(m, q, th, 0.02, robot="go1"))
    assert json.dumps(E.scene_assets(m)) == json.dumps(E.scene_assets(m, robot="go1"))
    ov = json.loads(a)["overlays"]
    assert ov["payload"]["body"] == 0 and [w["name"] for w in ov["weak"]] == ["RL_calf"]
    assert [f["site"] for f in ov["slippery_feet"]] == ["FR", "FL"]


@SIM
def test_g1_trajectory_export():
    """A G1 neutral-θ rollout exports unit quaternions for every drawn body, G1's foot sites, and
    no Go1-only overlays (G1 has no terrain slots)."""
    import jax
    import jax.numpy as jp
    from nemesis.envs.base import load_env
    from nemesis.perturb.wrapper import NemesisWrapper
    from nemesis.sim import export as E
    env = NemesisWrapper(load_env(robot="g1")[0], base_dr=False)
    L = C.layout("g1")
    s = env.reset_with(jax.random.PRNGKey(0), jp.asarray(L.neutral()))
    step = jax.jit(env.step)
    qs = [np.asarray(s.data.qpos)]
    for _ in range(20):
        s = step(s, jp.zeros(env.action_size))
        qs.append(np.asarray(s.data.qpos))
    m = env.unwrapped._mj_model
    tr = E.trajectory(m, np.stack(qs), L.neutral(), env.dt, label="G1", robot="g1")
    bodies = E.drawn_bodies(m)
    assert tr["bodies"] == [E._name(m, 1, b) for b in bodies] and len(bodies) > 20
    quat = E.unpack(tr["quat"])
    assert quat.shape == (11, len(bodies), 4)
    np.testing.assert_allclose(np.linalg.norm(quat, axis=-1), 1.0, atol=1e-5)
    assert tr["fall_time"] is None and tr["overlays"]["terrain"] is None and "ice_patches" not in tr["overlays"]
    th = L.neutral()
    th[L.INDEX["foot_friction"]] = [0.1, 0.6]
    th[L.INDEX["payload_mass"]] = 5.0
    ov = E.overlay_spec(m, th, qs[0], robot="g1")
    assert [f["site"] for f in ov["slippery_feet"]] == ["left_foot"]
    assert bodies[ov["payload"]["body"]] == env.spec.trunk
    sc = E.scene_assets(m, robot="g1")
    assert set(sc["sites"]) == {"left_foot", "right_foot"} and len(sc["bodies"]) == len(bodies)


# --- Physics (MJX on CPU) ---------------------------------------------------------------------

@pytest.fixture(scope="module")
def go1():
    from nemesis.envs.base import load_env
    return load_env()[0]


def _settle(go1, th, where, pitch_deg, lift):
    """Robot spawned `where` m along the heading from the course origin, pitched to the surface,
    `lift` m up and at rest; 60 steps holding the default pose. Returns (state, origin)."""
    import jax
    import jax.numpy as jp
    from mujoco import mjx
    from nemesis.perturb import apply as A
    raw = go1.unwrapped
    s = raw.reset(jax.random.PRNGKey(0))
    q = s.data.qpos
    yaw = 2 * jp.arctan2(q[6], q[3])
    origin = jp.array([q[0] - where * jp.cos(yaw), q[1] - where * jp.sin(yaw), yaw])
    pos, quat = A.terrain_mocap(jp.asarray(th), origin, raw._nemesis_spec)
    b = -np.deg2rad(pitch_deg) / 2  # nose up: a rotation about y by -pitch
    q = q.at[3:7].set(jp.array([jp.cos(yaw / 2) * np.cos(b), -jp.sin(yaw / 2) * np.sin(b),
                                jp.cos(yaw / 2) * np.sin(b), jp.sin(yaw / 2) * np.cos(b)]))
    data = s.data.replace(qpos=q.at[2].add(lift + 0.01), qvel=jp.zeros_like(s.data.qvel), mocap_pos=pos,
                          mocap_quat=quat)
    s = s.replace(data=mjx.forward(raw._mjx_model, data))
    step = jax.jit(raw.step)
    for _ in range(60):
        s = step(s, jp.zeros(raw.action_size))
    return s, origin


@SIM
@pytest.mark.parametrize("where, box", [(2.0, -1), (3.6, -2)])
def test_robot_stands_on_the_ramp(go1, where, box):
    """Spawned on an 8 deg ramp (1-3 m) or on its landing, at rest, the robot stands on that box
    (all four feet in contact), at standing height above the surface, and is not fallen."""
    import jax.numpy as jp
    from nemesis.perturb.wrapper import NemesisWrapper
    spec = go1.unwrapped._nemesis_spec
    th = ramp(angle=8.0, start=1.0, length=2.0)
    flat, _ = _settle(go1, C.neutral(), 0.0, 0.0, 0.0)
    t = np.tan(np.deg2rad(8.0))
    s, origin = _settle(go1, th, where, 8.0 if box == -1 else 0.0, (where - 1.0) * t if box == -1 else 2.0 * t)
    c = s.data.contact
    geom, dist = np.asarray(c.geom), np.asarray(c.dist)
    on = np.isin(geom, [spec.terrain_geoms[box]]).any(1) & (dist < 0.002)
    assert {int(g) for g in geom[on].ravel()} & set(spec.foot_geoms) == set(spec.foot_geoms)
    o = np.asarray(origin)
    x = (float(s.data.qpos[0]) - o[0]) * np.cos(o[2]) + (float(s.data.qpos[1]) - o[1]) * np.sin(o[2])
    surface = (x - 1.0) * t if box == -1 else 2.0 * t
    assert float(s.data.qpos[2]) - surface == pytest.approx(float(flat.data.qpos[2]), abs=0.03)
    assert not bool(NemesisWrapper(go1, base_dr=False).fallen(s.data, jp.asarray(th), origin))
