"""Robot registry and per-robot θ layouts: Go1 stays bit-for-bit, the G1 humanoid gets its own."""

import hashlib
import os

import jax
import jax.numpy as jp
import numpy as np
import pytest

from nemesis import robots
from nemesis.perturb import apply as A
from nemesis.perturb import canonical as C
from nemesis.perturb import dsl

SIM = pytest.mark.skipif(os.environ.get("NEMESIS_SKIP_SIM"), reason="needs MJX")
G1 = C.layout("g1")


def _layout_hash(L) -> str:
    h = hashlib.sha256()
    for a in (L.NEUTRAL, L.LO, L.HI, L.SPAN):
        h.update(np.asarray(a, np.float32).tobytes())
    h.update(repr([(k, v.start, v.stop) for k, v in L.INDEX.items()]).encode())
    return h.hexdigest()


def test_go1_layout_is_frozen():
    """Existing checkpoints, gauntlets and atlases depend on Go1's θ layout (commit a71c67f)."""
    assert _layout_hash(C.GO1) == "fdbcd0f6561f58d928bb3498403bb692d5daadf05ea8e74f5b7560fbef5fb695"
    assert C.D == 80 and C.USED == 63 and C.layout("go1") is C.GO1
    assert C.INDEX is C.GO1.INDEX and C.JOINTS[0] == "FR_hip" and C.FEET == ("FR", "FL", "RR", "RL")


def test_humanoid_layout():
    assert G1.D == C.D and G1.USED == C.USED - 2  # 2 feet instead of 4, 12 leg joints as before
    assert G1.FEET == ("L", "R") and len(G1.JOINTS) == 12 and G1.JOINTS[3] == "L_knee"
    assert np.all(G1.LO <= G1.NEUTRAL) and np.all(G1.NEUTRAL <= G1.HI)
    assert G1.describe(G1.neutral()) == {}
    assert G1.SLOT["foot_friction"].neutral == 0.6  # G1's foot-floor pair friction
    assert G1.SLOT["push1_force"].hi == robots.G1.push_max
    assert np.isfinite(G1.normalized(G1.NEUTRAL)).all()
    assert [s.name for s in G1.SLOTS] == [s.name for s in C.SLOTS]


def test_robot_lookup():
    assert robots.for_env("Go1JoystickRoughTerrain") is robots.GO1
    assert robots.for_env("G1JoystickFlatTerrain") is robots.G1
    assert robots.get("g1").joints[-1] == "R_ankle_roll"


HUMANOID = {
    "name": "slippery left foot, weak right knee, shove",
    "hypothesis": "single support on a slick foot cannot absorb a lateral shove",
    "ops": [
        {"op": "friction", "feet": ["L"], "mu": [0.05, 0.3]},
        {"op": "motor", "legs": ["R"], "joints": ["knee", "ankle_pitch"], "strength": 0.5},
        {"op": "encoder_offset", "legs": ["L", "R"], "joints": ["hip_roll"], "offset": 0.02},
        {"op": "push", "force_y": [-250, 250], "start": 2.0, "duration": 0.1},
        {"op": "command", "a": [0.8, 0, 0]},
    ],
}


def test_dsl_round_trip_humanoid_legs():
    c = dsl.compile_program(HUMANOID, "g1")
    assert c.names == ["0.friction.mu", "3.push.force_y"] and c.layout is G1
    th = np.asarray(c.theta_unit(np.full(dsl.K_MAX, 0.5, np.float32)))
    np.testing.assert_allclose(th[G1.INDEX["foot_friction"]], [0.175, 0.6], atol=1e-6)
    ms = th[G1.INDEX["motor_strength"]]
    weak = [G1.JOINTS.index("R_knee"), G1.JOINTS.index("R_ankle_pitch")]
    assert np.allclose(ms[weak], 0.5) and np.allclose(np.delete(ms, weak), 1.0)
    off = th[G1.INDEX["joint_offset"]]
    assert np.allclose(off[[G1.JOINTS.index("L_hip_roll"), G1.JOINTS.index("R_hip_roll")]], 0.02)
    assert th[G1.INDEX["push1_start"]][0] == 2.0 and th[G1.INDEX["command_a"]][0] == pytest.approx(0.8)
    # JSON round trip through the humanoid's own Program model
    lang = dsl.language("g1")
    again = dsl.compile_program(lang.Program.model_validate(HUMANOID).model_dump_json(), "g1")
    np.testing.assert_array_equal(again.base, c.base)
    np.testing.assert_array_equal(again.M, c.M)
    assert "hip_pitch" in str(lang.json_schema()) and "hip_pitch" not in str(dsl.json_schema())
    # Each robot rejects the other's legs.
    with pytest.raises(Exception):
        dsl.compile_program(HUMANOID)
    with pytest.raises(Exception):
        dsl.compile_program({"name": "x", "hypothesis": "y",
                             "ops": [{"op": "friction", "feet": ["FR"], "mu": 0.1}]}, "g1")


def test_humanoid_controls():
    from nemesis.adversary.baselines import BoxProgram, random_program, random_thetas
    th = random_thetas(16, np.random.default_rng(0), robot="g1")
    assert np.all(th >= G1.LO - 1e-6) and np.all(th <= G1.HI + 1e-6)
    assert BoxProgram(robot="g1").k == BoxProgram().k - 2
    for seed in range(10):
        c = dsl.compile_program(random_program(3, seed, robot="g1"), "g1")
        assert 1 <= c.k <= dsl.K_MAX


@SIM
def test_go1_spec_matches_hardcoded_ids():
    from nemesis.envs.base import load_env
    raw = load_env()[0].unwrapped
    spec = raw._nemesis_spec
    for f in ("trunk", "floor", "foot_geoms", "actuators", "joint_qpos", "joint_bodies", "foot_sites",
              "imu_site", "nu", "nbody"):
        assert getattr(spec, f) == getattr(robots.GO1_SPEC, f), f


@pytest.fixture(scope="module")
def g1_env():
    from nemesis.envs.base import load_env
    return load_env(robot="g1")[0]


@SIM
def test_humanoid_neutral_model_is_unchanged(g1_env):
    from mujoco_playground import registry
    raw = g1_env.unwrapped
    spec = raw._nemesis_spec
    base = raw._mjx_model
    m = A.apply_model(base, jp.asarray(G1.NEUTRAL), spec=spec)
    for f in ("geom_friction", "pair_friction", "body_mass", "body_ipos", "body_inertia",
              "actuator_gainprm", "actuator_biasprm", "actuator_forcerange", "dof_frictionloss"):
        np.testing.assert_allclose(getattr(m, f), getattr(base, f), atol=1e-6, err_msg=f)
    np.testing.assert_allclose(m.opt.gravity, base.opt.gravity, atol=1e-5)
    # The added collision geoms are massless: same inertial model as Playground's G1.
    stock = registry.load("G1JoystickFlatTerrain", config_overrides={"impl": "jax"})._mj_model
    np.testing.assert_allclose(raw._mj_model.body_mass, stock.body_mass)
    np.testing.assert_allclose(raw._mj_model.body_inertia, stock.body_inertia)
    assert len(spec.body_geoms) == 9 and spec.foot_pairs == (0, 1) and spec.trunk == 16


@SIM
def test_humanoid_wrapper(g1_env):
    from nemesis.perturb.wrapper import NemesisWrapper
    w = NemesisWrapper(g1_env, base_dr=False)
    reset, step = jax.jit(w.reset_with), jax.jit(w.step)
    raw = g1_env.unwrapped
    rstep = jax.jit(raw.step)

    def run(theta, n, seed=1):
        s = reset(jax.random.PRNGKey(seed), jp.asarray(theta, jp.float32))
        out = []
        for _ in range(n):
            s = step(s, jp.zeros(w.action_size))
            out.append(s)
        return out

    # Neutral θ reproduces the raw env (same tolerance logic as the Go1 test).
    s = raw.reset(jax.random.PRNGKey(1))
    for _ in range(20):
        s = rstep(s, jp.zeros(w.action_size))
    nw = run(G1.neutral(), 20)[-1]
    np.testing.assert_allclose(s.data.qpos, nw.data.qpos, atol=1e-3)
    np.testing.assert_allclose(s.obs["state"], nw.obs["state"][:103], atol=1e-2)
    assert nw.obs["state"].shape == w.observation_size["state"]
    assert nw.obs["privileged_state"].shape == w.observation_size["privileged_state"]

    # A strong side shove knocks the (passive) humanoid over earlier, and the body lands on the
    # floor instead of sinking through it.
    t = G1.neutral()
    t[G1.INDEX["push1_force"]] = [0.0, 250.0, 0.0]
    t[G1.INDEX["push1_start"]], t[G1.INDEX["push1_duration"]] = 0.2, 0.3
    first = lambda tr: next(i for i, x in enumerate(tr) if float(x.metrics["nemesis_fall"]) > 0)  # noqa: E731
    neutral, pushed = run(G1.neutral(), 100), run(t, 100)
    assert first(pushed) < first(neutral)
    assert float(pushed[-1].data.qpos[2]) > 0.1
