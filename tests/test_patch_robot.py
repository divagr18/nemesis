"""Patch for both robots: the robot is passed to the worker, each robot trains its own lineage and bank,
the Go1 path is unchanged, and the humanoid is refused with a message when its Patch is turned off."""

import asyncio
import json
import sys
from pathlib import Path
from types import SimpleNamespace

import numpy as np
import pytest
from fastapi import HTTPException

from nemesis.perturb import canonical as C
from nemesis.perturb.dsl import compile_program
from server import patch_worker as W
from server.versions import Versions

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "experiments"))

GO1_SHOVE = {"name": "s", "hypothesis": "s", "ops": [{"op": "command", "a": [1.0, 0, 0]},
                                                     {"op": "push", "force_y": -120, "start": 2.0, "duration": 0.2}]}
G1_SHOVE = {"name": "s", "hypothesis": "s", "ops": [{"op": "command", "a": [0.8, 0, 0]},
                                                    {"op": "push", "force_y": -250, "start": 2.0, "duration": 0.2}]}
GATE = {"suites": {}, "checks": {"fixes the attack": True}}


# ---- worker -------------------------------------------------------------------------------------

def test_go1_jitter_unchanged():
    """The Go1 cloud is exactly what the Go1-only code produced (module-level layout)."""
    theta = np.asarray(compile_program(GO1_SHOVE).base, np.float32)
    rng = np.random.default_rng(3)
    active = np.abs(theta - C.NEUTRAL) > 1e-6
    active[C.INDEX["command_mode"]] = False
    old = np.stack([C.clip(theta + z) for z in rng.normal(0.0, W.JITTER, (8, C.D)) * C.SPAN * active])
    assert np.array_equal(W.jitter_cloud(theta, 8, np.random.default_rng(3)), old.astype(np.float32))


def test_g1_jitter_uses_the_humanoid_envelope():
    L = C.layout("g1")
    theta = np.asarray(compile_program(G1_SHOVE, "g1").base, np.float32)
    cloud = W.jitter_cloud(theta, 64, np.random.default_rng(0), "g1")
    push = cloud[:, L.INDEX["push1_force"]][:, 1]
    assert np.all(push >= -300) and push.min() < -150  # the Go1 envelope (150 N) would clip these
    assert np.all(cloud <= np.maximum(L.HI, L.NEUTRAL) + 1e-6) and np.all(cloud >= np.minimum(L.LO, L.NEUTRAL) - 1e-6)
    bank, weights, fresh = W.build_bank(theta[None], np.zeros((0, C.D), np.float32), np.random.default_rng(0), "g1")
    assert bank.shape == (W.BANK_SIZE, C.D) and len(fresh) == 1 + W.CLOUD and np.isclose(weights.sum(), 1.0)


def test_walking_and_regressions_per_robot():
    from finetune import forward_nominal

    assert np.array_equal(W.walking("go1"), forward_nominal())
    g1 = W.walking("g1")
    L = C.layout("g1")
    assert list(g1[L.INDEX["command_a"]]) == pytest.approx([0.8, 0, 0])
    assert W.regressions("go1").shape == (52, C.D)
    hum = W.regressions("g1")
    assert hum.shape == (20, C.D) and np.array_equal(hum, W.regressions("g1"))  # deterministic
    assert not np.array_equal(hum[0], L.NEUTRAL)


# ---- server -------------------------------------------------------------------------------------

@pytest.fixture
def A(tmp_path, monkeypatch):
    from server import app as A, jobs

    monkeypatch.setattr(jobs, "JOBS", {})
    monkeypatch.setattr(A, "_patch_jobs", {})
    monkeypatch.setattr(A, "ROOT", tmp_path)
    monkeypatch.setattr(A, "CLIPS", tmp_path / "clips")
    monkeypatch.setattr(A, "versions", Versions(tmp_path, "runs/baseline_v2"))
    monkeypatch.setattr(A, "versions_g1", Versions(tmp_path / "g1", "runs/g1_baseline"))
    monkeypatch.setattr(A, "_rate_limit", lambda *a, **k: None)
    return A


def test_patch_cmd_passes_the_robot(A):
    go1 = A.patch_cmd("runs/baseline_v2", Path("t.npy"), Path("o"), "tag")
    before = [sys.executable, "-m", "server.patch_worker", "--base", "runs/baseline_v2", "--thetas", "t.npy",
              "--bank", str(A.versions.bank_path), "--out", "o", "--steps", str(A.PATCH_STEPS),
              "--clips", str(A.CLIPS), "--tag", "tag"]  # the Go1-only command line
    assert go1 == before + ["--robot", "go1"]
    g1 = A.patch_cmd("runs/g1_baseline", Path("t.npy"), Path("o"), "tag", "g1")
    assert g1[g1.index("--bank") + 1] == str(A.versions_g1.bank_path) != str(A.versions.bank_path)
    assert g1[g1.index("--base") + 1] == "runs/g1_baseline" and g1[-2:] == ["--robot", "g1"]


def _attack(robot: str, **kw) -> dict:
    return {"id": f"{robot}atk", "robot": robot, "text": "a shove", "broke_trained": True, "survivable": True,
            "theta": [0.0] * C.D, **kw}


def _post(A, attack, monkeypatch):
    started = []
    monkeypatch.setattr(A, "_find", lambda _id: attack)
    monkeypatch.setattr(A, "start_patch", lambda job, attacks, coro=None, robot="go1": started.append(robot))
    req = SimpleNamespace(client=SimpleNamespace(host="203.0.113.5"))
    asyncio.run(A.patch(A.PatchIn(attack_id=attack["id"]), req))
    return started


def test_patch_endpoint_routes_by_robot(A, monkeypatch):
    monkeypatch.setattr(A, "G1_PATCH", True)
    assert _post(A, _attack("go1"), monkeypatch) == ["go1"]
    assert _post(A, _attack("g1"), monkeypatch) == ["g1"]
    log_row = _attack("go1")
    del log_row["robot"]  # rows from before the humanoid are Go1's
    assert _post(A, log_row, monkeypatch) == ["go1"]


def test_patch_endpoint_refuses_the_humanoid_when_off(A, monkeypatch):
    monkeypatch.setattr(A, "G1_PATCH", False)
    with pytest.raises(HTTPException) as e:
        _post(A, _attack("g1"), monkeypatch)
    assert e.value.status_code == 400 and e.value.detail == A.G1_PATCH_OFF
    assert _post(A, _attack("go1"), monkeypatch) == ["go1"]  # the quadruped still trains
    with pytest.raises(HTTPException):  # the usual checks still apply to the humanoid
        monkeypatch.setattr(A, "G1_PATCH", True)
        _post(A, _attack("g1", broke_trained=False), monkeypatch)
    v = A.get_versions("g1")
    assert v["robot"] == "g1" and v["trainable"] is True and v["live"] == "v1"
    monkeypatch.setattr(A, "G1_PATCH", False)
    assert A.get_versions("g1")["trainable"] is False and A.get_versions("go1")["trainable"] is True


class FakeWorker:
    """Stands in for the patch subprocess: records the command, writes fresh.npy, prints the gate."""

    def __init__(self, accepted: bool):
        self.accepted, self.cmds = accepted, []

    async def __call__(self, *cmd, env=None, stdout=None, stderr=None):
        self.cmds.append(list(cmd))
        out = Path(cmd[cmd.index("--out") + 1])
        out.mkdir(parents=True, exist_ok=True)
        np.save(out / "fresh.npy", np.zeros((3, C.D), np.float32))
        lines = [f"EVENT {json.dumps({'stage': 'attempt', 'n': 0, 'falls': 1.0})}",
                 "step    1,000,000  reward    1.00  t=   10.0s",
                 f"EVENT {json.dumps({'stage': 'done', **GATE, 'accepted': self.accepted})}"]

        async def lines_out():
            for line in lines:
                yield (line + "\n").encode()

        async def wait():
            return 0
        return SimpleNamespace(stdout=lines_out(), wait=wait)


def _run(A, monkeypatch, robot: str, accepted: bool):
    from server import jobs

    fake = FakeWorker(accepted)
    monkeypatch.setattr(A.asyncio, "create_subprocess_exec", fake)
    reloaded, simulated, retests = [], [], []
    state = {"load": lambda d: d, "live": "new-params"}
    monkeypatch.setattr(A, "reload_live", lambda r="go1": reloaded.append(r))
    monkeypatch.setattr(A, "sim_for", lambda r="go1": state)
    monkeypatch.setattr(A, "simulate", lambda theta, left, right, robot="go1", **k: simulated.append(robot) or
                        {"clip": "/clips/x.mp4", "trajs": [], "fall_rates": {}})
    monkeypatch.setattr(A, "explain_learning", lambda *a: (_ for _ in ()).throw(RuntimeError("no model in tests")))

    async def retest(job, version, robot="go1"):
        retests.append((version, robot))
    monkeypatch.setattr(A, "_retest", retest)

    async def go():
        job = jobs.new("patch")
        out = await A.run_patch([_attack(robot)], job, robot) if robot != "go1" else await A.run_patch([_attack(robot)], job)
        await asyncio.sleep(0)  # let the retest task start
        return job, out
    job, out = asyncio.run(go())
    return fake.cmds[0], job, out, reloaded, simulated, retests


def test_run_patch_trains_the_humanoid_lineage(A, monkeypatch):
    cmd, job, out, reloaded, simulated, retests = _run(A, monkeypatch, "g1", accepted=True)
    assert cmd[cmd.index("--robot") + 1] == "g1"
    assert cmd[cmd.index("--base") + 1] == "runs/g1_baseline"
    assert Path(cmd[cmd.index("--out") + 1]) == A.versions_g1.root / "versions" / "v2"
    assert out["accepted"] and out["version"] == "v2" and out["robot"] == "g1"
    assert A.versions_g1.live()["name"] == "v2" and A.versions.live()["name"] == "v1"  # the Go1 is untouched
    assert len(np.load(A.versions_g1.bank_path)) == 3 and not A.versions.bank_path.exists()
    assert reloaded == ["g1"] and simulated == ["g1"] and retests == [("v2", "g1")]
    started = next(e for e in job.events if e["stage"] == "started")
    assert started["robot"] == "g1" and started["parent"] == "v1"
    assert any(e["stage"] == "attempt" for e in job.events) and any(e["stage"] == "progress" for e in job.events)


def test_run_patch_go1_unchanged(A, monkeypatch):
    cmd, job, out, reloaded, simulated, retests = _run(A, monkeypatch, "go1", accepted=True)
    assert cmd[cmd.index("--base") + 1] == "runs/baseline_v2" and cmd[-2:] == ["--robot", "go1"]
    assert A.versions.live()["name"] == "v2" and A.versions_g1.live()["name"] == "v1"
    assert reloaded == ["go1"] and simulated == ["go1"] and retests == [("v2", "go1")]


def test_rejected_humanoid_patch_keeps_its_version(A, monkeypatch):
    cmd, job, out, reloaded, *_ = _run(A, monkeypatch, "g1", accepted=False)
    assert not out["accepted"] and out["version"] == "v1" and out["robot"] == "g1"
    assert A.versions_g1.live()["name"] == "v1" and reloaded == []
    assert (A.versions_g1.root / "rejected").exists() and not (A.versions.root / "rejected").exists()
