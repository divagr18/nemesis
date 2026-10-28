"""Playground: the live robot in the visitor's browser (MuJoCo WASM + the policy in plain JS).

GET  /api/play/info                  how to drive the model, the original and live version names
GET  /api/play/go1.mjb               the training model without its visual meshes (nemesis/export/play.py)
GET  /api/play/policy/<version>.bin  that version's actor (normalizer + dense layers), immutable
POST /api/play/shove                 a shove that knocked it over in the browser, replayed on the server:
                                     a streamed job like /api/attack (original vs live, a replay); the
                                     page then offers the usual POST /api/patch {attack_id}

The model and policies are exported once into <serve dir>/play/ by the server's own MuJoCo, so the
.mjb always matches the version that loads it (the npm build and the Python bindings are both 3.17).
Shoves are logged with source="play" and kept out of the Hall of Fame, leaderboard and community
retrain (app.PRIVATE): they are measured, not written.
"""

import asyncio
import json
import math
import re
from pathlib import Path

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

router = APIRouter()

SOURCE = "play"
PUSH_MAX = 150.0      # N per axis: the Go1's push1_force range (canonical.py), so every shove is trainable
DURATION_MAX = 0.5    # s: push1_duration's range
SHOVE_AT = 2.0        # s: when the replayed shove lands (the robot is walking steadily by then)
_export = asyncio.Lock()


def _app():
    from server import app
    return app


def _dir() -> Path:
    return _app().ROOT / "play"


async def _model() -> Path:
    """The stripped model and its metadata, exported on first use."""
    d = _dir()
    if (d / "go1.mjb").exists() and (d / "go1.json").exists():
        return d
    async with _export:
        if not (d / "go1.mjb").exists():
            from nemesis.export import play

            await asyncio.to_thread(play.export_model, d)
    return d


def _version_dir(name: str) -> str:
    A = _app()
    for v in A.versions.all():
        if v["name"] == name:
            return v["dir"]
    raise HTTPException(404, "unknown version")


async def _policy(name: str) -> Path:
    if not re.fullmatch(r"v\d{1,4}", name):
        raise HTTPException(404, "unknown version")
    path = _dir() / f"{name}.bin"
    if path.exists():
        return path
    run = _version_dir(name)
    async with _export:
        if not path.exists():
            from nemesis.export import play
            from nemesis.train.ppo import load_params

            def write():
                tmp = path.with_suffix(".tmp")
                play.write_policy(play.policy_arrays(load_params(run)), tmp, name)
                tmp.replace(path)
            await asyncio.to_thread(write)
    return path


@router.get("/api/play/info")
async def info():
    A = _app()
    d = await _model()
    return {"model": json.loads((d / "go1.json").read_text()), "original": A.versions.all()[0]["name"],
            "live": A.versions.live()["name"], "push_max": PUSH_MAX, "duration_max": DURATION_MAX}


@router.get("/api/play/go1.mjb")
async def model():
    d = await _model()
    return FileResponse(d / "go1.mjb", media_type="application/octet-stream",
                        headers={"Cache-Control": "public, max-age=3600"})


@router.get("/api/play/policy/{name}.bin")
async def policy(name: str):
    path = await _policy(name)
    return FileResponse(path, media_type="application/octet-stream",
                        headers={"Cache-Control": "public, max-age=31536000, immutable"})


class ShoveIn(BaseModel):
    force_x: float = Field(ge=-1000, le=1000)   # N, robot frame at the shove: x forward
    force_y: float = Field(ge=-1000, le=1000)   # N, y to the robot's left
    duration: float = Field(gt=0, le=5)          # s
    command: tuple[float, float, float] = (1.0, 0.0, 0.0)  # what it was doing: vx, vy, yaw rate


def _side(fx: float, fy: float) -> str:
    a = math.degrees(math.atan2(fy, fx))  # direction the force points, robot frame
    if -45 <= a <= 45:
        return "from behind"
    if a >= 135 or a <= -135:
        return "from the front"
    return "from its right" if a > 0 else "from its left"


def _doing(cmd) -> str:
    vx, vy, wz = cmd
    parts = []
    if abs(vx) >= 0.1:
        parts.append(f"walking {'forward' if vx > 0 else 'backward'} at {abs(vx):.1f} m/s")
    if abs(vy) >= 0.1:
        parts.append(f"sidestepping {'left' if vy > 0 else 'right'}")
    if abs(wz) >= 0.15:
        parts.append(f"turning {'left' if wz > 0 else 'right'}")
    return " and ".join(parts) or "standing still"


def shove_program(body: ShoveIn):
    """The shove as a DSL program in the training envelope; returns (program, its sentence)."""
    from nemesis.perturb.dsl import Program

    fx = max(-PUSH_MAX, min(PUSH_MAX, body.force_x))
    fy = max(-PUSH_MAX, min(PUSH_MAX, body.force_y))
    dur = max(0.05, min(DURATION_MAX, body.duration))
    cmd = [round(max(-1.5, min(1.5, body.command[0])), 2), round(max(-0.8, min(0.8, body.command[1])), 2),
           round(max(-1.2, min(1.2, body.command[2])), 2)]
    text = (f"A {math.hypot(fx, fy):.0f} N shove {_side(fx, fy)} for {dur:.2f} s while {_doing(cmd)}"
            " (from the Playground)")
    # The shove is in the robot's frame when it lands; the DSL's push is in the start-heading frame,
    # so a turning robot's shove is rotated by the turn it has made by then (yaw rate × time).
    turn = cmd[2] * SHOVE_AT
    sx = fx * math.cos(turn) - fy * math.sin(turn)
    sy = fx * math.sin(turn) + fy * math.cos(turn)
    sx, sy = max(-PUSH_MAX, min(PUSH_MAX, sx)), max(-PUSH_MAX, min(PUSH_MAX, sy))
    program = Program.model_validate({
        "name": "Playground shove", "hypothesis": text,
        "ops": [{"op": "command", "a": cmd},
                {"op": "push", "force_x": round(sx, 1), "force_y": round(sy, 1), "start": SHOVE_AT,
                 "duration": round(dur, 2)}],
    })
    return program, text


@router.post("/api/play/shove")
async def shove(body: ShoveIn, request: Request):
    A = _app()
    A._rate_limit(request.client.host)
    program, text = shove_program(body)

    async def run(report):
        report("Replaying your shove on the training simulator")
        result = await A.log_attack(program, text=text, source=SOURCE, report=report)
        return {k: v for k, v in result.items() if k != "theta"}
    return A.stream("attack", run)
