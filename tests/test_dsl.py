import numpy as np
import pytest

from nemesis.perturb import canonical as C
from nemesis.perturb.dsl import K_MAX, Program, compile_program, json_schema

REAR_SLIP = {
    "name": "rear slip on turn",
    "hypothesis": "the gait relies on rear-foot grip when the yaw command flips",
    "ops": [
        {"op": "friction", "feet": ["RR", "RL"], "mu": [0.1, 0.5]},
        {"op": "command", "a": [0.8, 0, 0], "b": [0.8, 0, [-1.2, 1.2]], "switch": [1, 4]},
        {"op": "push", "force_y": [-120, 120], "start": 2.0, "duration": 0.1},
    ],
}


def test_compile_maps_free_params():
    c = compile_program(REAR_SLIP)
    assert c.names == ["0.friction.mu", "1.command.b2", "1.command.switch", "2.push.force_y"]
    th = np.asarray(c.theta_unit(np.full(K_MAX, 0.5, np.float32)))
    np.testing.assert_allclose(th[C.INDEX["foot_friction"]], [1.0, 1.0, 0.3, 0.3], atol=1e-6)
    assert th[C.INDEX["command_mode"]][0] == 1.0
    np.testing.assert_allclose(th[C.INDEX["command_a"]], [0.8, 0, 0], atol=1e-6)
    np.testing.assert_allclose(th[C.INDEX["command_b"]][2], 0.0, atol=1e-6)
    np.testing.assert_allclose(th[C.INDEX["push1_force"]], [0.0, 0.0, 0.0], atol=1e-6)
    assert th[C.INDEX["push1_start"]][0] == 2.0
    np.testing.assert_allclose(th[C.INDEX["command_switch"]][0], 2.5, atol=1e-6)


def test_ranges_are_clipped_to_the_envelope():
    c = compile_program({"name": "x", "hypothesis": "y",
                         "ops": [{"op": "payload", "mass": [0, 50]}]})
    assert c.hi[0] == C.SLOT["payload_mass"].hi


def test_fixed_values_and_neutral_unit():
    c = compile_program({"name": "x", "hypothesis": "y",
                         "ops": [{"op": "motor", "legs": ["FR"], "joints": ["calf"], "strength": [0.3, 1.0]},
                                 {"op": "latency", "steps": 2}]})
    th = np.asarray(c.theta_unit(c.neutral_unit()))
    assert th[C.INDEX["latency"]][0] == 2
    assert th[C.INDEX["motor_strength"]][C.JOINTS.index("FR_calf")] == pytest.approx(1.0)


def test_rejects_bad_programs():
    with pytest.raises(Exception):
        Program.model_validate({"name": "x", "hypothesis": "y", "ops": [{"op": "teleport"}]})
    with pytest.raises(ValueError):
        compile_program({"name": "x", "hypothesis": "y", "ops": [
            {"op": "friction", "feet": ["FR"], "mu": [0.1, 0.5]},
            {"op": "friction", "feet": ["FR"], "mu": [0.2, 0.6]}]})
    push = {"op": "push", "force_x": 50, "start": 1, "duration": 0.1}
    with pytest.raises(Exception):
        Program.model_validate({"name": "x", "hypothesis": "y", "ops": [push, push, push]})


def test_schema_lists_every_op():
    schema = str(json_schema())
    for op in ("friction", "ice_patch", "payload", "slope", "motor", "push", "command", "imu_bias"):
        assert op in schema


def test_control_adversaries():
    from nemesis.adversary.baselines import BoxProgram, random_program, random_thetas
    th = random_thetas(16, np.random.default_rng(0))
    assert th.shape == (16, C.D) and np.all(th >= C.LO - 1e-6) and np.all(th <= C.HI + 1e-6)
    box = BoxProgram()
    t = np.asarray(box.theta_unit(np.zeros(box.width, np.float32)))
    assert t[C.INDEX["command_mode"]][0] == 1.0 and box.k > K_MAX
    for seed in range(20):
        c = compile_program(random_program(3, seed))
        assert 1 <= c.k <= K_MAX


def test_mode_signature():
    from nemesis.adversary.modes import cause_family, fall_direction
    th = C.neutral()
    th[C.INDEX["foot_friction"]] = 0.1
    assert cause_family(th) == "friction"
    th2 = C.neutral()
    th2[C.INDEX["latency"]] = 2.0
    assert cause_family(th2) == "timing"
    assert fall_direction(np.array([0.9, 0.1, -0.4])) == "forward"
    assert fall_direction(np.array([0.1, -0.8, -0.5])) == "left"


def test_vectorized_theta_matches_scalar():
    from nemesis.adversary.baselines import BoxProgram
    c = compile_program(REAR_SLIP)
    U = np.random.default_rng(0).random((5, K_MAX)).astype(np.float32)
    np.testing.assert_allclose(c.theta_units(U), np.stack([np.asarray(c.theta_unit(u)) for u in U]), atol=1e-5)
    box = BoxProgram()
    U = np.random.default_rng(1).random((3, box.width)).astype(np.float32)
    np.testing.assert_allclose(box.theta_units(U), np.stack([np.asarray(box.theta_unit(u)) for u in U]), atol=1e-5)
