"""Regression tests for the physics audit (Oct 27, second audit). Each test pins one finding."""

import os
from types import SimpleNamespace

import jax
import jax.numpy as jp
import mujoco
import numpy as np
import pytest

from nemesis import robots
from nemesis.perturb import apply as A
from nemesis.perturb import canonical as C

SIM = pytest.mark.skipif(os.environ.get("NEMESIS_SKIP_SIM"), reason="needs MJX")
G1L = C.layout("g1")


def theta_with(L=C.GO1, **slots):
    t = L.neutral()
    for k, v in slots.items():
        t[L.INDEX[k]] = v
    return jp.asarray(t)


@pytest.fixture(scope="module")
def go1():
    from nemesis.envs.base import load_env
    return load_env()[0]


@pytest.fixture(scope="module")
def g1():
    from nemesis.envs.base import load_env
    return load_env(robot="g1")[0]


# --- #1: Go1 per-foot friction ---------------------------------------------------------------

@SIM
def test_go1_feet_carry_the_floor_contact_params(go1):
    m = go1.unwrapped._mj_model
    spec = go1.unwrapped._nemesis_spec
    for g in spec.foot_geoms:
        assert m.geom_priority[g] > m.geom_priority[spec.floor]
        for f in ("geom_friction", "geom_solref", "geom_solimp", "geom_condim"):
            np.testing.assert_array_equal(getattr(m, f)[g], getattr(m, f)[spec.floor], err_msg=f)
    assert m.geom_friction[spec.floor, 0] == pytest.approx(robots.GO1.foot_friction_cap)


@SIM
@pytest.mark.parametrize("feet, expect", [
    ([1.0, 1.0, 1.0, 1.0], [0.6, 0.6, 0.6, 0.6]),       # neutral: the trained nominal contact
    ([0.08, 0.08, 0.08, 0.08], [0.08] * 4),             # uniform ice, as before the fix
    ([1.0, 1.0, 0.05, 1.0], [0.6, 0.6, 0.05, 0.6]),     # one slick rear foot, really just one
    ([1.5, 0.3, 1.5, 1.5], [0.6, 0.3, 0.6, 0.6]),       # above the cap: no effect
])
def test_go1_contact_friction_is_per_foot(go1, feet, expect):
    from mujoco import mjx
    raw, spec = go1.unwrapped, go1.unwrapped._nemesis_spec
    data = raw.reset(jax.random.PRNGKey(0)).data
    m = A.apply_model(raw._mjx_model, theta_with(foot_friction=feet), 0.0, spec)
    c = mjx.forward(m, data).contact
    geom, mu = np.asarray(c.geom), np.asarray(c.friction)[:, 0]
    for g, want in zip(spec.foot_geoms, expect):
        rows = (geom[:, 0] == g) | (geom[:, 1] == g)
        assert rows.any()
        np.testing.assert_allclose(mu[rows], want, atol=1e-6)


def test_friction_and_push_docs():
    assert "have no effect" in C.SLOT["foot_friction"].doc and "0.6" in C.SLOT["foot_friction"].doc
    assert "concrete" in G1L.SLOT["foot_friction"].doc  # G1's pairs are not capped
    for L in (C.GO1, G1L):
        for k in ("push1_force", "push2_force"):
            assert "start-heading frame" in L.SLOT[k].doc and "world" not in L.SLOT[k].doc


# --- #2: payload inertia ---------------------------------------------------------------------

def _free_body(M, ipos, iquat, inertia, point=None):
    """A free body with the given inertial; `point` = (m, position in the body frame) welds a
    point mass to it. MuJoCo then builds the composite itself (reference)."""
    s = mujoco.MjSpec()
    b = s.worldbody.add_body(name="a")
    b.add_freejoint()
    b.explicitinertial = True
    b.mass, b.ipos, b.iquat, b.inertia = float(M), list(ipos), list(iquat), list(inertia)
    if point is not None:
        c = b.add_body(name="b", pos=list(point[1]))
        c.explicitinertial = True
        c.mass, c.inertia, c.ipos, c.iquat = float(point[0]), [1e-9] * 3, [0.0] * 3, [1.0, 0, 0, 0]
    return s.compile()


def _mass_matrix(model, quat):
    d = mujoco.MjData(model)
    d.qpos[3:7] = quat
    mujoco.mj_forward(model, d)
    M = np.zeros((model.nv, model.nv))
    if hasattr(d, "qM"):  # MuJoCo < 3.3
        mujoco.mj_fullM(model, M, d.qM)
    else:
        mujoco.mj_fullM(model, d, M)
    return M


@pytest.mark.parametrize("r, m", [((0.1, 0.0, 0.0), 5.0), ((0.0, 0.0, 0.1), 5.0),
                                  ((0.1, -0.06, 0.1), 5.0), ((-0.05, 0.03, 0.08), 2.0)])
def test_payload_inertia_matches_mujoco_composite(r, m):
    # Go1's trunk inertial: its principal frame is rotated ~90 deg about y (the bug's trigger).
    M, ipos = 5.204, np.array([0.0223, 0.002, -0.0005])
    iquat = np.array([-3.42088047e-03, 7.05204098e-01, 1.06698015e-04, 7.08996098e-01])
    iquat /= np.linalg.norm(iquat)
    inertia = np.array([0.0716565, 0.0630105, 0.0168101])
    r = np.array(r)
    ref = _free_body(M, ipos, iquat, inertia, point=(m, ipos + r))
    I, q = A.composite_inertia(jp.float32(M), jp.asarray(iquat, jp.float32),
                               jp.asarray(inertia, jp.float32), jp.float32(m), jp.asarray(r, jp.float32))
    ours = _free_body(M + m, ipos + m * r / (M + m), np.asarray(q, np.float64), np.asarray(I, np.float64))
    quat = np.array([0.9, 0.2, -0.3, 0.25]) / np.linalg.norm([0.9, 0.2, -0.3, 0.25])
    np.testing.assert_allclose(_mass_matrix(ours, quat), _mass_matrix(ref, quat), rtol=1e-4, atol=2e-5)


@SIM
def test_neutral_payload_leaves_inertial_frame_unchanged(go1):
    base = go1.unwrapped._mjx_model
    m = A.apply_model(base, jp.asarray(C.NEUTRAL))
    for f in ("body_inertia", "body_iquat", "body_ipos", "body_mass"):
        np.testing.assert_array_equal(np.asarray(getattr(m, f)), np.asarray(getattr(base, f)), err_msg=f)


# --- #3: no hidden Playground pushes in evaluation ---------------------------------------------

@SIM
def test_g1_eval_env_has_no_env_pushes(g1):
    from nemesis.perturb.wrapper import NemesisWrapper
    w = NemesisWrapper(g1, env_pushes=True)

    @jax.jit
    def kicks(s):
        def body(s, _):
            s = w.step(s, jp.zeros(w.action_size))
            return s, jp.linalg.norm(s.info["push"]) > 0
        return jax.lax.scan(body, s, None, length=500)[1]

    s = w.reset_with(jax.random.PRNGKey(3), jp.asarray(G1L.NEUTRAL))
    assert int(kicks(s).sum()) >= 1  # Playground's G1 kicks every 5-10 s
    assert int(kicks(w.without_env_pushes(s)).sum()) == 0
    assert NemesisWrapper(g1, base_dr=False)._env_pushes is False  # evaluation default
    assert NemesisWrapper(g1)._env_pushes is True  # training keeps Playground's recipe


# --- #4: G1 motor weakness caps the joint torque -----------------------------------------------

@SIM
def test_go1_joint_ids_match_hardcoded(go1):
    assert go1.unwrapped._nemesis_spec.joints == robots.GO1_SPEC.joints
    assert not go1.unwrapped._mj_model.jnt_actfrclimited.any()  # Go1: scaling a zero range is a no-op


@SIM
def test_g1_weak_knee_cannot_exceed_scaled_torque_limit(g1):
    from mujoco import mjx
    raw, spec = g1.unwrapped, g1.unwrapped._nemesis_spec
    mj = raw._mj_model
    k = G1L.JOINTS.index("L_knee")
    jid, act = spec.joints[k], spec.actuators[k]
    assert mj.jnt_actfrclimited[jid]
    limit = float(mj.jnt_actfrcrange[jid, 1])
    data = raw.reset(jax.random.PRNGKey(0)).data
    data = data.replace(ctrl=data.ctrl.at[act].set(float(mj.actuator_ctrlrange[act, 1])))
    dof = int(mj.jnt_dofadr[jid])

    def torque(strength):
        st = np.ones(len(G1L.JOINTS), np.float32)
        st[k] = strength
        m = A.apply_model(raw._mjx_model, theta_with(G1L, motor_strength=st), 0.0, spec)
        return abs(float(mjx.forward(m, data).qfrc_actuator[dof]))

    assert torque(1.0) > 0.5 * limit  # the command saturates a healthy knee
    assert torque(0.3) <= 0.3 * limit + 1e-3


# --- #5: the evaluator counts the env's own termination ----------------------------------------

def test_evaluator_ends_on_env_termination():
    from nemesis.sim.evaluate import ended
    s = lambda fall, done: SimpleNamespace(metrics={"nemesis_fall": jp.float32(fall)}, done=jp.float32(done))  # noqa: E731
    assert not bool(ended(s(0, 0)))
    assert bool(ended(s(1, 1))) and bool(ended(s(1, 0)))
    assert bool(ended(s(0, 1)))  # e.g. G1's feet touching: training ends the episode here too
