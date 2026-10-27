"""3D replay export (nemesis/sim/export.py): CPU only, no JAX in the code under test."""

import json

import numpy as np
import pytest

mujoco = pytest.importorskip("mujoco")

from nemesis.perturb import canonical as C  # noqa: E402
from nemesis.sim import export as E  # noqa: E402

DT = 0.02


@pytest.fixture(scope="module")
def model():
    try:
        return E.go1_model()
    except ImportError as e:
        pytest.skip(str(e))


def test_scene_assets_compact_and_consistent(model):
    a = E.scene_assets(model)
    size = len(json.dumps(a, separators=(",", ":")))
    assert size < 1_000_000, size
    assert [b["name"] for b in a["bodies"]][0] == "trunk" and len(a["bodies"]) == 13
    for m in a["meshes"]:
        v, f = E.unpack(m["vert"]), E.unpack(m["face"])
        assert v.shape[1] == 3 and f.shape[1] == 3 and len(f) > 100
        assert f.max() < len(v)
    for g in a["geoms"]:
        assert 0 <= g["body"] < len(a["bodies"])
        assert g["type"] != "mesh" or 0 <= g["mesh"] < len(a["meshes"])
        assert abs(np.linalg.norm(g["quat"]) - 1) < 1e-3
    # Collision-only geoms (group 3) are not drawn.
    assert len(a["geoms"]) == sum(model.geom_group[g] < 3 and model.geom_bodyid[g] > 0 for g in range(model.ngeom))
    assert set(a["sites"]) == set(E.FEET_SITES)


def test_trajectory_shapes_and_unit_quats(model):
    q = E.synthetic_qpos(model, seconds=3.0, fall_at=1.5)
    tr = E.trajectory(model, q, C.neutral(), DT, stride=2)
    json.dumps(tr)
    pos, quat = E.unpack(tr["pos"]), E.unpack(tr["quat"])
    F, B = (len(q) + 1) // 2, len(tr["bodies"])
    assert pos.shape == (F, B, 3) and quat.shape == (F, B, 4) and tr["n_frames"] == F
    assert np.allclose(np.linalg.norm(quat, axis=-1), 1, atol=1e-4)
    assert tr["dt"] == pytest.approx(2 * DT)
    # The trunk is the free joint, so its pose is qpos[:7] (wxyz) at every exported frame.
    assert np.allclose(pos[:, 0], q[::2, :3], atol=2e-4)
    assert np.allclose(np.abs((quat[:, 0] * q[::2, 3:7]).sum(-1)), 1, atol=1e-4)
    assert tr["fall_time"] is not None and 1.5 < tr["fall_time"] < 2.5


def test_neutral_theta_has_no_overlays(model):
    q = E.synthetic_qpos(model, seconds=1.0, fall_at=None)
    ov = E.trajectory(model, q, C.neutral(), DT)["overlays"]
    assert ov["ice"] is None and ov["payload"] is None and ov["slope"] is None and ov["command"] is None
    assert ov["slippery_feet"] == [] and ov["pushes"] == [] and ov["weak"] == []
    assert ov["conditions"] == {}


def test_overlays_follow_theta(model):
    th = E.sample_theta()
    q = E.synthetic_qpos(model, seconds=1.0, fall_at=None, yaw0=0.5)
    tr = E.trajectory(model, q, th, DT, fall_time=None)
    ov = tr["overlays"]
    assert tr["fall_time"] is None
    assert [f["site"] for f in ov["slippery_feet"]] == ["FR", "FL"]
    assert ov["ice"]["mu"] == pytest.approx(0.08) and ov["payload"]["mass"] == pytest.approx(3.0)
    assert [w["name"] for w in ov["weak"]] == ["RL_calf"]
    # Push forces are given in the start-heading frame and exported in the world frame.
    yaw = ov["start"]["yaw"]
    assert yaw == pytest.approx(0.5, abs=0.05)
    f = np.array(ov["pushes"][0]["force"])
    assert np.allclose(f, E._rot_z(yaw) @ np.array([0.0, -120.0, 0.0]), atol=0.05)
    assert np.allclose(np.linalg.norm(ov["slope"]["down"]), 1, atol=1e-4)


def test_nonfinite_frames_are_held(model):
    q = E.synthetic_qpos(model, seconds=1.0, fall_at=None)
    q[30:] = np.nan
    tr = E.trajectory(model, q, C.neutral(), DT, stride=1)
    pos = E.unpack(tr["pos"])
    assert np.isfinite(pos).all() and np.allclose(pos[-1], pos[29])
