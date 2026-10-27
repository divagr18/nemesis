"""The 'try to break the robot' service.

POST /api/attack {"text": "..."}         an attack in plain English
POST /api/attack_voice (wav upload)       the same, spoken (Muse Voice Transcribe)
POST /api/patch {"attack_id": "..."}      train the live robot against an attack that broke it
GET  /api/jobs/<id>/events                live progress of a background job (server-sent events)
GET  /api/versions                        the robot's lineage
GET  /api/hall_of_fame                    attacks that broke the robot, with their status per version
GET  /clips/<id>.mp4                      rendered rollouts

Muse Wonder turns the text into one attack program (fixed values, within the physical envelope),
the robot runs it in MJX, and the logged rollout is rendered. Every attack is run against the
original policy (v1) and the live version; Patch fine-tunes the live version on the attack and
promotes the result only if it passes a regression gate (server/patch_worker.py).

run: NEMESIS_POLICY=runs/baseline_v2 XLA_PYTHON_CLIENT_MEM_FRACTION=0.3 \
         uvicorn server.app:app --host 0.0.0.0 --port 8000
"""

import asyncio
import json
import os
import sys
import time
import uuid
from collections import defaultdict
from pathlib import Path

import numpy as np
from fastapi import FastAPI, File, HTTPException, Request, UploadFile
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, ValidationError

from nemesis import config
from nemesis.llm import client
from nemesis.perturb import canonical as C
from nemesis.perturb.dsl import Program, compile_program, json_schema
from server import jobs
from server.versions import Versions

ROOT = Path(os.environ.get("NEMESIS_SERVE_DIR", "runs/serve"))
CLIPS = ROOT / "clips"
LOG = ROOT / "attacks.jsonl"
POLICY = os.environ.get("NEMESIS_POLICY", "runs/baseline_v2")
# The toughest policy we trained (DR, best on the locked gauntlet): if even it falls almost every
# time, the attack is likely beyond what any controller could survive, and Patch is not offered.
REFERENCE = os.environ.get("NEMESIS_REFERENCE", "runs/arms_final/dr_s1/round_2")
UNSURVIVABLE = 0.9
RATE_PER_MIN = int(os.environ.get("NEMESIS_RATE_PER_MIN", "3"))
PATCH_STEPS = int(os.environ.get("NEMESIS_PATCH_STEPS", "20000000"))
PATCH_MEM = os.environ.get("NEMESIS_PATCH_MEM_FRACTION", "0.6")
COMMUNITY_BATCH = int(os.environ.get("NEMESIS_COMMUNITY_BATCH", "5"))  # auto-retrain after this many new breaks
SEEDS = 4
RETEST_SEEDS = 8

TRANSLATE = """Turn the user's attack on a Unitree Go1 quadruped (walking forward at 1 m/s for 5 s)
into ONE attack program as JSON. Use FIXED numbers only (no [lo, hi] ranges), stay inside the
physical envelope below, and keep the user's intent: if they say "ice" use friction ~0.08,
"wet floor" ~0.3, "shove"/"kick" a push of 60-150 N for 0.1-0.2 s, "backpack" a payload of
2-5 kg, and so on. Directions are the robot's: x forward, y LEFT; a shove FROM the left pushes it
toward the right (negative force_y), a shove from behind pushes it forward. Include a command op (default {{"op": "command", "a": [1.0, 0, 0]}}).
If the request is not a physical attack on the robot, return {{"error": "<short reason>"}}.

Envelope:
{slots}

Schema: {schema}

User attack: {text}"""

app = FastAPI(title="Nemesis")
app.add_middleware(GZipMiddleware, minimum_size=2048)
versions = Versions(ROOT, POLICY)
_gpu = asyncio.Lock()  # one simulation at a time; everyone else queues
_train = asyncio.Lock()  # one patch at a time
_hits: dict[str, list[float]] = defaultdict(list)
_sim = {}


def sim():
    """Evaluator plus params for the original policy (v1) and the live version."""
    if not _sim:
        from nemesis.envs.base import load_env
        from nemesis.perturb.wrapper import NemesisWrapper
        from nemesis.sim.evaluate import Evaluator
        from nemesis.train.ppo import load_params
        v1, live = versions.all()[0], versions.live()
        _sim.update(ev=Evaluator(NemesisWrapper(load_env()[0], base_dr=False), v1["dir"], horizon=250),
                    load=load_params, original=load_params(v1["dir"]), live=load_params(live["dir"]),
                    live_name=live["name"],
                    reference=load_params(REFERENCE) if Path(REFERENCE, "ckpts").exists() else None)
    return _sim


def reload_live():
    s = sim()
    live = versions.live()
    s.update(live=s["load"](live["dir"]), live_name=live["name"])


def _rate_limit(ip: str, per_min: int = RATE_PER_MIN, bucket: str = "attack"):
    now = time.time()
    key = f"{bucket}:{ip}"
    _hits[key] = [t for t in _hits[key] if now - t < 60]
    if len(_hits[key]) >= per_min:
        raise HTTPException(429, f"Easy there: {per_min} per minute.")
    _hits[key].append(now)


def translate(text: str, limit: int = 500) -> Program:
    slots = "\n".join(f"- {s.name} [{s.unit}] {s.lo}..{s.hi}: {s.doc}" for s in C.SLOTS)
    raw = client.respond(TRANSLATE.format(slots=slots, schema=json.dumps(json_schema()), text=text[:limit]),
                         model=config.text_model(), reasoning="low", tag="serve/translate",
                         json_only=True)
    raw = raw.strip().strip("`")
    raw = raw[raw.find("{"):raw.rfind("}") + 1]
    data = json.loads(raw)
    if "error" in data:
        raise HTTPException(400, f"Nemesis declined: {data['error']}")
    data.setdefault("name", text[:60])
    data.setdefault("hypothesis", text[:200])
    return Program.model_validate(data)


def simulate(theta: np.ndarray, left: tuple[str, object], right: tuple[str, object]) -> dict:
    """Runs one θ against two policies and renders them side by side on a shared seed (the first
    seed where the right-hand policy falls, so a break is shown when there is one)."""
    from nemesis.sim.overlays import overlays
    from nemesis.sim.render import render_qpos, save_video, tile

    s = sim()
    ev = s["ev"]
    key = int(time.time()) % 10_000
    res = {name: ev(params, theta[None], seeds=SEEDS, key=key) for name, params in (left, right)}
    fell_r = res[right[0]]["fell"][0]
    fell_l = res[left[0]]["fell"][0]
    seed = int(np.flatnonzero(fell_r)[0]) if fell_r.any() else (int(np.flatnonzero(fell_l)[0]) if fell_l.any() else 0)
    recs = [ev(params, theta[None], seeds=np.array([seed]), key=key, record=True) for _, params in (left, right)]
    # End ~1.5 s after the later fall (no seconds of flailing on the floor); full length if either held.
    falls = [r["time_to_fall"][0, 0] / ev.env.dt for r in recs if r["fell"][0, 0]]
    T = recs[0]["qpos"].shape[2]
    t_end = int(min(T, max(falls) + 75)) if len(falls) == 2 else T
    from nemesis.sim import export

    clip_id = uuid.uuid4().hex[:10]
    CLIPS.mkdir(parents=True, exist_ok=True)
    clips, trajs = [], []
    for (name, _), r in zip((left, right), recs):
        q = r["qpos"][0, 0][:t_end]
        model, scene_fn = overlays(ev.env.mj_model, theta, q, ev.env.dt)  # make the attack visible
        clips.append(render_qpos(model, q, width=480, height=360, scene_fn=scene_fn))
        # Poses for the 3D replay; the evaluator's fall time (it also counts body contact).
        fell = bool(r["fell"][0, 0])
        tr = export.trajectory(ev.env.mj_model, q, theta, ev.env.dt, label=name,
                               fall_time=float(r["time_to_fall"][0, 0]) if fell else None)
        path = CLIPS / f"{clip_id}_{len(trajs)}.json"
        path.write_text(json.dumps(tr))
        trajs.append({"label": name, "url": f"/traj/{path.name}"})
    save_video(tile(clips, cols=2), CLIPS / f"{clip_id}.mp4", ev.env)
    return {"clip_id": clip_id, "clip": f"/clips/{clip_id}.mp4", "trajs": trajs,
            "fall_rates": {name: float(r["fell"][0].mean()) for name, r in res.items()}}


def run_attack(program: Program, theta: np.ndarray | None = None) -> dict:
    s = sim()
    theta = np.asarray(compile_program(program).base) if theta is None else np.asarray(theta, np.float32)
    live = s["live_name"]
    out = simulate(theta, ("v1", s["original"]), (live, s["live"]))
    fr = out["fall_rates"]
    ref = None
    if s["reference"] is not None and fr[live] > 0:
        ref = float(s["ev"](s["reference"], theta[None], seeds=8, key=4)["fell"].mean())
    from nemesis.adversary.cmaes import plausibility_cost
    implaus = float(plausibility_cost(theta[None])[0])
    return {
        "implausibility": round(implaus, 3),
        # Subtle attacks score higher: breaking the robot with a nudge beats breaking it with a sledgehammer.
        "score": int(round(100 * fr[live] * max(0.0, 1.0 - implaus))) if fr[live] >= 0.5 else 0,
        "id": out["clip_id"], "clip": out["clip"], "trajs": out["trajs"], "program": program.model_dump(),
        "conditions": C.describe(theta), "version": live,
        "reference_fall_rate": ref, "survivable": ref is None or ref < UNSURVIVABLE,
        "broke_trained": fr[live] >= 0.5, "fall_rate_trained": fr[live],
        "broke_baseline": fr["v1"] >= 0.5, "fall_rate_baseline": fr["v1"],
        "theta": theta.round(5).tolist(),
    }


def _attacks() -> list[dict]:
    return [json.loads(l) for l in LOG.read_text().splitlines()] if LOG.exists() else []


def _find(attack_id: str) -> dict:
    for r in _attacks():
        if r["id"] == attack_id:
            return r
    raise HTTPException(404, "unknown attack")


class AttackIn(BaseModel):
    text: str = Field(min_length=3, max_length=500)
    handle: str = Field(default="", max_length=24)


def _clean_handle(h: str) -> str:
    return "".join(c for c in h if c.isalnum() or c in "_-.").strip()[:24]


async def _handle(text: str, ip: str, handle: str = "") -> dict:
    _rate_limit(ip)
    try:
        program = await asyncio.to_thread(translate, text)
        compile_program(program)
    except (ValidationError, ValueError, json.JSONDecodeError) as e:
        raise HTTPException(400, f"Could not turn that into a physical attack: {str(e)[:200]}")
    result = await log_attack(program, text=text, handle=_clean_handle(handle))
    return {k: v for k, v in result.items() if k != "theta"}


async def log_attack(program: Program, theta: np.ndarray | None = None, text: str = "", source: str = "human",
                     handle: str = "") -> dict:
    """Simulates an attack (v1 vs live), renders it, and appends it to the attack log."""
    async with _gpu:
        result = await asyncio.to_thread(run_attack, program, theta)
    result.update(text=text, ts=time.time(), source=source, handle=handle)
    ROOT.mkdir(parents=True, exist_ok=True)
    with open(LOG, "a") as f:
        f.write(json.dumps(result) + "\n")
    versions.record({result["id"]: result["fall_rate_trained"]}, result["version"])
    if source != "agent":
        _maybe_community_patch()
    return result


def _maybe_community_patch():
    """The robot learns from everyone: after COMMUNITY_BATCH new attacks break the live version,
    retrain on all of them at once (same gate as a manual patch)."""
    if _train.locked() or COMMUNITY_BATCH <= 0:
        return
    trained = {a for v in versions.all() for a in v["attacks"]}
    live = versions.live()["name"]
    fresh = [r for r in _attacks() if r["broke_trained"] and r.get("survivable", True)
             and r.get("version") == live and r["id"] not in trained]
    if len(fresh) >= COMMUNITY_BATCH:
        job = jobs.new("patch")
        job.community = True
        jobs.spawn(job, _patch(job, fresh[-COMMUNITY_BATCH:]))


@app.post("/api/attack")
async def attack(body: AttackIn, request: Request):
    return await _handle(body.text, request.client.host, body.handle)


@app.post("/api/attack_voice")
async def attack_voice(request: Request, audio: UploadFile = File(...)):
    path = ROOT / "voice" / f"{uuid.uuid4().hex}.wav"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(await audio.read())
    text = await asyncio.to_thread(client.transcribe, path, "serve/voice")
    return {"transcript": text, **(await _handle(text, request.client.host))}


# ---- Your world: a photo or video of a place becomes a scenario ------------------------------

MEDIA = ROOT / "media"
WORLD_TYPES = {".jpg", ".jpeg", ".png", ".webp", ".mp4", ".mov", ".webm", ".m4v"}


@app.post("/api/world")
async def world(request: Request, media: UploadFile = File(...)):
    from server import world as W

    _rate_limit(request.client.host)
    suffix = Path(media.filename or "x.jpg").suffix.lower()
    if suffix not in WORLD_TYPES:
        raise HTTPException(400, "Upload a photo (jpg/png/webp) or a short video (mp4/mov/webm).")
    data = await media.read()
    if len(data) > 25 * 2**20:
        raise HTTPException(400, "Keep it under 25 MB.")
    MEDIA.mkdir(parents=True, exist_ok=True)
    path = MEDIA / f"{uuid.uuid4().hex[:12]}{suffix}"
    path.write_bytes(data)
    reading = await asyncio.to_thread(W.read_place, path)
    text = W.as_attack_text(reading)
    try:
        program = await asyncio.to_thread(translate, text, 1200)
        compile_program(program)
    except (ValidationError, ValueError, json.JSONDecodeError) as e:
        raise HTTPException(400, f"Could not turn that place into physics: {str(e)[:200]}")
    result = await log_attack(program, text=f"Your world: {reading['place']}", source="world")
    result.update(reading=reading, media=f"/media/{path.name}")
    return {k: v for k, v in result.items() if k != "theta"}


@app.get("/media/{name}")
def media_file(name: str):
    path = MEDIA / Path(name).name
    if not path.exists():
        raise HTTPException(404)
    return FileResponse(path)


# ---- Patch: train the live robot against an attack ---------------------------------------------

class PatchIn(BaseModel):
    attack_id: str = Field(min_length=4, max_length=32)


async def _patch(job: jobs.Job, attacks: list[dict]):
    await job.finish("done", await run_patch(attacks, job))


async def run_patch(attacks: list[dict], job: jobs.Job) -> dict:
    """Trains a new version against `attacks`, emitting progress into `job`; returns the outcome."""
    if _train.locked():
        await job.emit("queued", message="Another patch is training; you're next.")
    async with _train:
        parent = versions.live()
        name, out = versions.next_dir()
        work = ROOT / "patch_inputs" / job.id
        work.mkdir(parents=True, exist_ok=True)
        np.save(work / "thetas.npy", np.array([a["theta"] for a in attacks], np.float32))
        cmd = [sys.executable, "-m", "server.patch_worker", "--base", parent["dir"], "--thetas",
               str(work / "thetas.npy"), "--bank", str(versions.bank_path), "--out", str(out),
               "--steps", str(PATCH_STEPS)]
        env = {**os.environ, "XLA_PYTHON_CLIENT_MEM_FRACTION": PATCH_MEM}
        await job.emit("started", version=name, parent=parent["name"], attacks=[a["text"] for a in attacks])
        proc = await asyncio.create_subprocess_exec(*cmd, env=env, stdout=asyncio.subprocess.PIPE,
                                                    stderr=asyncio.subprocess.STDOUT)
        final, tail = None, []
        async for raw in proc.stdout:
            line = raw.decode(errors="replace").rstrip()
            tail = (tail + [line])[-20:]
            if line.startswith("EVENT "):
                e = json.loads(line[6:])
                if e["stage"] == "done":
                    final = e
                else:
                    await job.emit(e.pop("stage"), **{k: v for k, v in e.items() if k != "t"})
            elif line.startswith("step "):  # PPO progress: "step   10,000,000  reward ..."
                parts = line.split()
                await job.emit("progress", step=int(parts[1].replace(",", "")), total=PATCH_STEPS)
        await proc.wait()
        if final is None:
            raise RuntimeError("patch worker died: " + " | ".join(tail[-5:]))
        gate = {k: final[k] for k in ("suites", "checks", "accepted")}
        if not gate["accepted"]:
            versions.reject(out)
            await job.emit("rejected", gate=gate)
            return {"accepted": False, "gate": gate, "version": parent["name"]}
        versions.add(name, out, parent["name"], [a["id"] for a in attacks], gate,
                     np.load(out / "fresh.npy"))
        async with _gpu:
            await asyncio.to_thread(reload_live)
            s = sim()
            theta = np.asarray(attacks[0]["theta"], np.float32)
            replay = await asyncio.to_thread(simulate, theta, (parent["name"], s["load"](parent["dir"])),
                                             (name, s["live"]))
        outcome = {"accepted": True, "gate": gate, "version": name, "parent": parent["name"],
                   "clip": replay["clip"], "trajs": replay["trajs"], "fall_rates": replay["fall_rates"]}
        await job.emit("verified", **outcome)
        retest = jobs.new("retest")
        jobs.spawn(retest, _retest(retest, name))
        return outcome


async def _retest(job: jobs.Job, version: str):
    """Re-runs every attack that ever broke the robot against a new version."""
    broke = [r for r in _attacks() if r["broke_trained"] or r["broke_baseline"]]
    if not broke:
        await job.finish("done", {"retested": 0})
        return
    async with _gpu:
        s = sim()
        res = await asyncio.to_thread(s["ev"], s["live"], np.array([r["theta"] for r in broke], np.float32),
                                      RETEST_SEEDS, 99)
    versions.record({r["id"]: float(f) for r, f in zip(broke, res["fell"].mean(1))}, version)
    await job.finish("done", {"retested": len(broke)})


@app.post("/api/patch")
async def patch(body: PatchIn, request: Request):
    _rate_limit(request.client.host, per_min=1, bucket="patch")
    attack = _find(body.attack_id)
    if attack["fall_rate_trained"] == 0.0:
        raise HTTPException(400, "The live robot already survives this attack.")
    if not attack.get("survivable", True):
        raise HTTPException(400, "Physics wins: even our toughest robot falls on this one, so there is nothing to learn.")
    job = jobs.new("patch")
    jobs.spawn(job, _patch(job, [attack]))
    return {"job": job.id}


DIAG = ROOT / "diagnoses.json"


def diagnoses() -> dict:
    return json.loads(DIAG.read_text()) if DIAG.exists() else {}


def save_diagnosis(attack_id: str, obs: dict):
    d = diagnoses()
    d[attack_id] = {k: v for k, v in obs.items() if k not in ("clip",)}
    DIAG.write_text(json.dumps(d))


class Ctx:
    """What the agent may touch on the server."""
    save_diagnosis = staticmethod(save_diagnosis)
    gpu = _gpu
    sim = staticmethod(sim)
    log_attack = staticmethod(log_attack)
    find = staticmethod(_find)
    patch = staticmethod(run_patch)

    @staticmethod
    def live_name() -> str:
        return versions.live()["name"]

    @staticmethod
    def clip_path(url: str) -> Path:
        return CLIPS / Path(url).name


class AgentIn(BaseModel):
    goal: str = Field(default="", max_length=300)


_agent_running = asyncio.Lock()


@app.post("/api/agent")
async def agent(body: AgentIn, request: Request):
    from server.agent import Agent

    if config.OPEN:
        raise HTTPException(503, "Agent mode uses Muse Wonder's native tool calling; it is off in open-weight mode.")
    _rate_limit(request.client.host, per_min=1, bucket="agent")
    if _agent_running.locked():
        running = [j for j in jobs.JOBS.values() if j.kind == "agent" and j.status == "running"]
        if running:
            return {"job": running[-1].id, "joined": True}  # watch the investigation in progress
    job = jobs.new("agent")

    async def go():
        async with _agent_running:
            await Agent(job, Ctx, body.goal).run()
    jobs.spawn(job, go())
    return {"job": job.id, "joined": False}


# ---- Red-team report ---------------------------------------------------------------------------

REPORTS = ROOT / "reports"


class ReportIn(BaseModel):
    version: str = Field(default="", max_length=8)


async def _report(job: jobs.Job, version: str):
    from server import report as R

    await job.emit("testing", message=f"Re-testing every attack and the 52-scenario gauntlet against {version}…")
    async with _gpu:
        rep = await asyncio.to_thread(R.build, sim(), versions, _attacks(), diagnoses(), version)
    await job.emit("writing", message="Muse Wonder is writing the summary…")
    rep["summary"] = await asyncio.to_thread(R.summarize, rep)
    REPORTS.mkdir(parents=True, exist_ok=True)
    (REPORTS / f"{version}.json").write_text(json.dumps(rep, default=float))
    await job.finish("done", {"version": version, "url": f"/report.html?v={version}"})


@app.post("/api/report")
async def make_report(body: ReportIn, request: Request):
    _rate_limit(request.client.host, per_min=1, bucket="report")
    version = body.version or versions.live()["name"]
    if version not in {v["name"] for v in versions.all()}:
        raise HTTPException(404, "unknown version")
    job = jobs.new("report")
    jobs.spawn(job, _report(job, version))
    return {"job": job.id}


@app.get("/api/report/{version}")
def get_report(version: str):
    path = REPORTS / f"{Path(version).name}.json"
    if not path.exists():
        raise HTTPException(404, "no report yet")
    return json.loads(path.read_text())


@app.get("/api/jobs/{job_id}")
def job_info(job_id: str):
    if job_id not in jobs.JOBS:
        raise HTTPException(404)
    return jobs.JOBS[job_id].summary()


@app.get("/api/jobs/{job_id}/events")
async def job_events(job_id: str, request: Request):
    if job_id not in jobs.JOBS:
        raise HTTPException(404)
    last = request.headers.get("last-event-id", "0")  # the browser resumes after a dropped connection
    start = int(last) if last.isdigit() else 0
    return StreamingResponse(jobs.JOBS[job_id].stream(start), media_type="text/event-stream",
                             headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})


@app.get("/api/versions")
def get_versions():
    vs = versions.all()
    return {"live": versions.live()["name"],
            "versions": [{k: v[k] for k in ("name", "parent", "created", "attacks", "gate")} for v in vs],
            "bank": int(len(np.load(versions.bank_path))) if versions.bank_path.exists() else 0}


HOF_KEYS = ("id", "text", "clip", "trajs", "fall_rate_trained", "conditions", "ts", "version", "score", "handle", "source")


@app.get("/api/hall_of_fame")
def hall_of_fame(limit: int = 20):
    status = versions.status()
    broke = [r for r in _attacks() if r["broke_trained"]]
    return [{**{k: r.get(k) for k in HOF_KEYS}, "status": status.get(r["id"], {})} for r in broke[-limit:][::-1]]


@app.get("/api/leaderboard")
def leaderboard(limit: int = 10):
    """Most subtle successful attacks; one entry per attacker (their best)."""
    best = {}
    for r in _attacks():
        if not r.get("score"):
            continue
        who = r.get("handle") or ("Nemesis agent" if r.get("source") == "agent" else "anonymous")
        if who == "anonymous":
            who = f"anonymous-{r['id'][:4]}"
        if who not in best or r["score"] > best[who]["score"]:
            best[who] = {"who": who, **{k: r.get(k) for k in ("id", "text", "score", "version", "clip", "implausibility")}}
    return sorted(best.values(), key=lambda x: -x["score"])[:limit]


@app.get("/api/patching")
def patching():
    """The patch in progress, if any (so every visitor can watch community retraining live)."""
    running = [j for j in jobs.JOBS.values() if j.kind == "patch" and j.status in ("queued", "running")]
    return {"job": running[-1].id, "community": getattr(running[-1], "community", False)} if running else {}


@app.get("/traj/{name}")
def traj(name: str):
    path = CLIPS / Path(name).name
    if path.suffix != ".json" or not path.exists():
        raise HTTPException(404)
    return FileResponse(path, media_type="application/json")


@app.get("/clips/{name}")
def clip(name: str):
    path = CLIPS / Path(name).name
    if not path.exists():
        raise HTTPException(404)
    return FileResponse(path, media_type="video/mp4")


if Path("web/dist").exists():
    app.mount("/", StaticFiles(directory="web/dist", html=True), name="web")
