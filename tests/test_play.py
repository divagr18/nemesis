"""Playground export: the browser's physics model and policy match what the server trains and runs.

- Stripping the visual meshes changes no dynamics: a shoved rollout is bit-identical on both models.
- The policy binary round-trips, and its numpy forward pass matches Brax's inference fn.
- The JS port (web/src/lib/playcore.js) reproduces the Python stepper's rollout
  (web/scripts/play_parity.mjs, run with node when it is installed).
"""

import json
import shutil
import subprocess
from pathlib import Path

import mujoco
import numpy as np
import pytest

from nemesis import config
from nemesis.envs.base import load_env
from nemesis.export import play

ROOT = Path(__file__).resolve().parents[1]
POLICY = ROOT / "runs/baseline_v2"
needs_policy = pytest.mark.skipif(not (POLICY / "ckpts").exists(), reason="needs the v1 checkpoint")


@pytest.fixture(scope="module")
def env():
    return load_env(config.BASE_ENV)[0]


@pytest.fixture(scope="module")
def arrays():
    from nemesis.train.ppo import load_params

    return play.policy_arrays(load_params(POLICY))


def _rollout(model, info, arrays, steps=150):
    st = play.Stepper(model, info, arrays)
    st.reset(yaw=0.4)
    qs = []
    for i in range(steps):
        f = np.array([0.0, -140.0, 0.0]) if 50 <= i < 60 else None
        st.step([1.0, 0.0, 0.3], f)
        qs.append(st.d.qpos.copy())
    return np.array(qs)


@needs_policy
def test_stripped_model_has_identical_dynamics(env, arrays):
    full = env.unwrapped._mj_model
    m, new_id = play.physics_model(env)
    assert m.nmeshvert == 0 and m.ntex == 0
    a = _rollout(full, play.meta(env), arrays)
    b = _rollout(m, play.meta(env, m, new_id), arrays)
    assert np.array_equal(a, b)


@needs_policy
def test_policy_binary_round_trip(tmp_path, arrays):
    play.write_policy(arrays, tmp_path / "p.bin", "v1")
    back = play.read_policy(tmp_path / "p.bin")
    assert np.array_equal(back["mean"], arrays["mean"]) and np.array_equal(back["std"], arrays["std"])
    for (k0, b0), (k1, b1) in zip(arrays["layers"], back["layers"]):
        assert np.array_equal(k0, k1) and np.array_equal(b0, b1)


@needs_policy
def test_numpy_policy_matches_brax(env, arrays):
    import jax

    from nemesis.perturb.wrapper import NemesisWrapper
    from nemesis.train.ppo import make_policy

    wrapped = NemesisWrapper(env, nominal_frac=1.0)
    brax = make_policy(POLICY, wrapped)
    obs = np.random.default_rng(0).normal(0, 1, (64, play.OBS * play.HISTORY)).astype(np.float32)
    priv = np.zeros((64, wrapped.observation_size["privileged_state"][0]), np.float32)
    theirs = np.asarray(brax({"state": obs, "privileged_state": priv}, jax.random.PRNGKey(0))[0])
    ours = np.array([play.act(arrays, o) for o in obs])
    assert np.abs(ours - theirs).max() < 1e-5


@needs_policy
def test_policy_walks_on_plain_mujoco(env, arrays):
    m, new_id = play.physics_model(env)
    st = play.Stepper(m, play.meta(env, m, new_id), arrays)
    st.reset()
    for _ in range(250):
        st.step([1.0, 0.0, 0.0])
        assert not st.fallen()
    assert st.d.qpos[0] > 3.5  # ~0.9 m/s for 5 s


def test_shove_program_stays_in_the_training_envelope():
    from nemesis.perturb import canonical as C
    from nemesis.perturb.dsl import compile_program
    from server.play import ShoveIn, shove_program

    program, text = shove_program(ShoveIn(force_x=-40, force_y=-900, duration=2.0, command=(1.0, 0.0, 0.0)))
    theta = compile_program(program).base
    assert theta[C.INDEX["push1_force"]][1] == -150 and theta[C.INDEX["push1_duration"]][0] == 0.5
    assert "from its left" in text and "walking forward at 1.0 m/s" in text
    # turning left at 0.5 rad/s: by 2 s it has turned 1 rad, so a shove from its left is rotated with it
    program, _ = shove_program(ShoveIn(force_x=0, force_y=-100, duration=0.2, command=(0.5, 0.0, 0.5)))
    push = next(o for o in program.ops if o.op == "push")
    assert np.isclose(push.force_x, 100 * np.sin(1.0), atol=0.1) and np.isclose(push.force_y, -100 * np.cos(1.0), atol=0.1)


@needs_policy
@pytest.mark.skipif(shutil.which("node") is None, reason="needs node")
def test_js_port_matches_python(tmp_path, env, arrays):
    """The browser's stepper (playcore.js, on @mujoco/mujoco) against the Python reference."""
    m, new_id = play.physics_model(env)
    mujoco.mj_saveModel(m, str(tmp_path / "go1.mjb"), None)
    info = play.meta(env, m, new_id)
    (tmp_path / "go1.json").write_text(json.dumps(info))
    play.write_policy(arrays, tmp_path / "v1.bin", "v1")
    ref = _rollout(m, info, arrays)
    out = subprocess.run(["node", "scripts/play_parity.mjs", str(tmp_path)], capture_output=True,
                         text=True, cwd=ROOT / "web", timeout=300)
    assert out.returncode == 0, out.stderr[-2000:]
    js = np.array(json.loads(out.stdout))
    assert js.shape == ref.shape
    # JS sums the policy's dot products in float64, numpy in float32: ~1e-7 apart while walking,
    # growing to ~1e-4 once the shove has tipped it over (a fall amplifies any difference).
    assert np.abs(js[:50] - ref[:50]).max() < 1e-5
    assert np.abs(js - ref).max() < 1e-3
