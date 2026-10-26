"""The 'try to break my robot' service.

POST /api/attack {"text": "..."}       an attack in plain English
POST /api/attack_voice (wav upload)     the same, spoken (Muse Voice Transcribe)
GET  /api/hall_of_fame                  attacks that broke the robot
GET  /clips/<id>.mp4                    rendered rollouts

Muse Wonder turns the text into one attack program (fixed values, within the physical
envelope), the robot runs it in MJX, and the logged rollout is rendered to a clip. Attacks that
break the current policy are kept as candidate counterexamples for the next training round.

run: NEMESIS_POLICY=runs/arms/nemesis_s0/round_2 uvicorn server.app:app --host 0.0.0.0 --port 8000
"""

import asyncio
import json
import os
import time
import uuid
from collections import defaultdict
from pathlib import Path

import numpy as np
from fastapi import FastAPI, File, HTTPException, Request, UploadFile
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, ValidationError

from nemesis import config
from nemesis.llm import client
from nemesis.perturb import canonical as C
from nemesis.perturb.dsl import Program, compile_program, json_schema

ROOT = Path(os.environ.get("NEMESIS_SERVE_DIR", "runs/serve"))
CLIPS = ROOT / "clips"
LOG = ROOT / "attacks.jsonl"
POLICY = os.environ.get("NEMESIS_POLICY", "runs/baseline_v2")
BASELINE = os.environ.get("NEMESIS_BASELINE", "runs/baseline_v2")
RATE_PER_MIN = int(os.environ.get("NEMESIS_RATE_PER_MIN", "3"))
SEEDS = 4

TRANSLATE = """Turn the user's attack on a Unitree Go1 quadruped (walking forward at 1 m/s for 5 s)
into ONE attack program as JSON. Use FIXED numbers only (no [lo, hi] ranges), stay inside the
physical envelope below, and keep the user's intent: if they say "ice" use friction ~0.08,
"wet floor" ~0.3, "shove"/"kick" a push of 60-150 N for 0.1-0.2 s, "backpack" a payload of
2-5 kg, and so on. Include a command op (default {{"op": "command", "a": [1.0, 0, 0]}}).
If the request is not a physical attack on the robot, return {{"error": "<short reason>"}}.

Envelope:
{slots}

Schema: {schema}

User attack: {text}"""

app = FastAPI(title="Nemesis")
_gpu = asyncio.Lock()  # one simulation at a time; everyone else queues
_hits: dict[str, list[float]] = defaultdict(list)
_ev = None


def evaluator():
    global _ev
    if _ev is None:
        from nemesis.envs.base import load_env
        from nemesis.perturb.wrapper import NemesisWrapper
        from nemesis.sim.evaluate import Evaluator
        from nemesis.train.ppo import load_params
        ev = Evaluator(NemesisWrapper(load_env()[0], base_dr=False), POLICY, horizon=250)
        _ev = (ev, load_params(POLICY), load_params(BASELINE))
    return _ev


def _rate_limit(ip: str):
    now = time.time()
    _hits[ip] = [t for t in _hits[ip] if now - t < 60]
    if len(_hits[ip]) >= RATE_PER_MIN:
        raise HTTPException(429, f"Easy there: {RATE_PER_MIN} attacks per minute.")
    _hits[ip].append(now)


def translate(text: str) -> Program:
    slots = "\n".join(f"- {s.name} [{s.unit}] {s.lo}..{s.hi}: {s.doc}" for s in C.SLOTS)
    raw = client.respond(TRANSLATE.format(slots=slots, schema=json.dumps(json_schema()), text=text[:500]),
                         model=config.WONDER, reasoning="low", tag="serve/translate")
    raw = raw.strip().strip("`")
    raw = raw[raw.find("{"):raw.rfind("}") + 1]
    data = json.loads(raw)
    if "error" in data:
        raise HTTPException(400, f"Nemesis declined: {data['error']}")
    data.setdefault("name", text[:60])
    data.setdefault("hypothesis", text[:200])
    return Program.model_validate(data)


def run_attack(program: Program) -> dict:
    from nemesis.sim.render import render_qpos, save_video, tile

    ev, params, base_params = evaluator()
    theta = np.asarray(compile_program(program).base)
    res = ev(params, theta[None], seeds=SEEDS, key=int(time.time()) % 10_000)
    base = ev(base_params, theta[None], seeds=SEEDS, key=int(time.time()) % 10_000)
    seed = int(np.flatnonzero(res["fell"][0])[0]) if res["fell"][0].any() else 0
    rec_new = ev(params, theta[None], seeds=np.array([seed]), record=True)
    rec_old = ev(base_params, theta[None], seeds=np.array([seed]), record=True)
    clip_id = uuid.uuid4().hex[:10]
    # End ~1.5 s after the later fall (no seconds of flailing on the floor); full length if both held.
    falls = [r["time_to_fall"][0, 0] / ev.env.dt for r in (rec_old, rec_new) if r["fell"][0, 0]]
    T = rec_new["qpos"].shape[2]
    t_end = int(min(T, max(falls) + 75)) if len(falls) == 2 else T
    clips = [render_qpos(ev.env.mj_model, r["qpos"][0, 0][:t_end], width=480, height=360)
             for r in (rec_old, rec_new)]
    CLIPS.mkdir(parents=True, exist_ok=True)
    save_video(tile(clips, cols=2), CLIPS / f"{clip_id}.mp4", ev.env)
    return {
        "id": clip_id, "clip": f"/clips/{clip_id}.mp4", "program": program.model_dump(),
        "conditions": C.describe(theta),
        "broke_trained": bool(res["fell"][0].mean() >= 0.5), "fall_rate_trained": float(res["fell"][0].mean()),
        "broke_baseline": bool(base["fell"][0].mean() >= 0.5), "fall_rate_baseline": float(base["fell"][0].mean()),
        "theta": theta.round(5).tolist(),
    }


class AttackIn(BaseModel):
    text: str = Field(min_length=3, max_length=500)


async def _handle(text: str, ip: str) -> dict:
    _rate_limit(ip)
    try:
        program = await asyncio.to_thread(translate, text)
        compile_program(program)
    except (ValidationError, ValueError, json.JSONDecodeError) as e:
        raise HTTPException(400, f"Could not turn that into a physical attack: {str(e)[:200]}")
    async with _gpu:
        result = await asyncio.to_thread(run_attack, program)
    result.update(text=text, ts=time.time())
    ROOT.mkdir(parents=True, exist_ok=True)
    with open(LOG, "a") as f:
        f.write(json.dumps(result) + "\n")
    return {k: v for k, v in result.items() if k != "theta"}


@app.post("/api/attack")
async def attack(body: AttackIn, request: Request):
    return await _handle(body.text, request.client.host)


@app.post("/api/attack_voice")
async def attack_voice(request: Request, audio: UploadFile = File(...)):
    path = ROOT / "voice" / f"{uuid.uuid4().hex}.wav"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(await audio.read())
    text = await asyncio.to_thread(client.transcribe, path, "serve/voice")
    return {"transcript": text, **(await _handle(text, request.client.host))}


@app.get("/api/hall_of_fame")
def hall_of_fame(limit: int = 20):
    if not LOG.exists():
        return []
    rows = [json.loads(l) for l in LOG.read_text().splitlines()]
    broke = [r for r in rows if r["broke_trained"]]
    return [{k: r[k] for k in ("text", "clip", "fall_rate_trained", "conditions", "ts")} for r in broke[-limit:][::-1]]


@app.get("/clips/{name}")
def clip(name: str):
    path = CLIPS / Path(name).name
    if not path.exists():
        raise HTTPException(404)
    return FileResponse(path, media_type="video/mp4")


if Path("web/dist").exists():
    app.mount("/", StaticFiles(directory="web/dist", html=True), name="web")
