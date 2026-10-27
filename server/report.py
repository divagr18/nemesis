"""Red-team report for one robot version: what breaks it, why, by how much margin, and what got fixed.

Built like a penetration-test report, from everything the service has seen (typed, spoken and
photographed attacks, and the agent's findings):

  - headline numbers: attacks tested, how many break the original and the live robot, fall rate
    on the locked 52-scenario gauntlet for v1 vs this version
  - failure families (friction, load, slope, actuation, timing, sensing, command), worst first
  - top findings: conditions, fall rate per version, Muse Spark's diagnosis of the clip, and the
    safety margin along the finding's dominant condition (11-point sweep from nominal)
  - an executive summary and deployment recommendations written by Muse Wonder from that data
"""

import json
import sys
import time
from collections import defaultdict
from pathlib import Path

import numpy as np

from nemesis import config
from nemesis.llm import client
from nemesis.perturb import canonical as C

TOP = 6
SWEEP = np.linspace(0.0, 1.0, 11)

SUMMARY_SCHEMA = {
    "title": "report_summary",
    "type": "object",
    "properties": {
        "headline": {"type": "string", "description": "one sentence verdict on this robot's robustness"},
        "summary": {"type": "string", "description": "one paragraph for an engineering lead"},
        "recommendations": {"type": "array", "items": {"type": "string"},
                            "description": "3-5 concrete deployment guidelines or next training steps"},
    },
    "required": ["headline", "summary", "recommendations"],
    "additionalProperties": False,
}

SUMMARY_PROMPT = """You are writing the executive summary of a red-team report on a walking robot policy
(Unitree Go1 quadruped, simulated in MuJoCo). Below is the data: every attack tried, the failure
families, the top findings with their safety margins (the condition value where falls begin) and
Muse Spark's video diagnoses, and the robot's lineage (each version was retrained on attacks that
broke the previous one and passed a regression gate). Be specific and quantitative, cite margins,
and say plainly what is still unsafe. Recommendations should read like deployment guidance
("do not deploy on surfaces below friction 0.3 while carrying more than 3 kg") or concrete next
training steps. Answer as JSON.

DATA:
{data}"""


def dominant_slot(theta: np.ndarray) -> str | None:
    from nemesis.adversary.cmaes import NOT_MAGNITUDES

    best, name = 0.0, None
    for s in C.SLOTS:
        if s.name in NOT_MAGNITUDES:
            continue
        sl = C.INDEX[s.name]
        dev = float((np.abs(theta[sl] - C.NEUTRAL[sl]) / C.SPAN[sl]).max())
        if dev > best:
            best, name = dev, s.name
    return name


def margin(ev, params, theta: np.ndarray, slot: str) -> dict:
    sl = C.INDEX[slot]
    cands = np.repeat(theta[None], len(SWEEP), 0)
    for i, f in enumerate(SWEEP):
        cands[i, sl] = C.NEUTRAL[sl] + f * (theta[sl] - C.NEUTRAL[sl])
    fall = ev(params, cands, seeds=16, key=31)["fell"].mean(1)
    first = next((i for i, f in enumerate(fall) if f >= 0.5), None)
    return {"condition": slot, "nominal": np.round(C.NEUTRAL[sl], 3).tolist(),
            "failing_value": np.round(theta[sl], 3).tolist(),
            "starts_falling_at": np.round(cands[first, sl], 3).tolist() if first is not None else None,
            "curve": [round(float(f), 2) for f in fall]}


def build(sim: dict, versions, attacks: list[dict], diagnoses: dict, version: str) -> dict:
    """Runs the GPU parts (gauntlet, re-tests, margins); the caller holds the GPU lock."""
    sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "experiments"))
    from gauntlet import load as load_gauntlet

    from nemesis.adversary.modes import cause_family

    ev = sim["ev"]
    vs = {v["name"]: v for v in versions.all()}
    params = sim["load"](vs[version]["dir"])
    g = load_gauntlet()
    suite = np.concatenate([g["hand"], g["realistic"]])
    gauntlet = {name: float(ev(p, suite, seeds=8, key=2026)["fell"].mean())
                for name, p in (("v1", sim["original"]), (version, params))}

    thetas = np.array([a["theta"] for a in attacks], np.float32) if attacks else np.zeros((0, C.D), np.float32)
    fall_now = ev(params, thetas, seeds=8, key=99)["fell"].mean(1) if len(thetas) else np.zeros(0)
    families = defaultdict(lambda: {"tried": 0, "break_v1": 0, "break_now": 0})
    rows = []
    for a, f in zip(attacks, fall_now):
        fam = cause_family(np.asarray(a["theta"], np.float32))
        fam_row = families[fam]
        fam_row["tried"] += 1
        fam_row["break_v1"] += int(a["fall_rate_baseline"] >= 0.5)
        fam_row["break_now"] += int(f >= 0.5)
        rows.append({**{k: a.get(k) for k in ("id", "text", "clip", "conditions", "source", "handle", "score")},
                     "family": fam, "fall_v1": a["fall_rate_baseline"], "fall_now": round(float(f), 2),
                     "status": versions.status().get(a["id"], {})})

    # Top findings: still breaking this version first, then the most severe that were fixed.
    rows.sort(key=lambda r: (r["fall_now"] < 0.5, -(r["fall_now"] or 0), -(r["fall_v1"] or 0)))
    top = []
    for r in rows[:TOP]:
        theta = np.asarray(next(a["theta"] for a in attacks if a["id"] == r["id"]), np.float32)
        slot = dominant_slot(theta)
        top.append({**r, "diagnosis": diagnoses.get(r["id"]),
                    "margin": margin(ev, params, theta, slot) if slot and r["fall_now"] >= 0.5 else None})
    return {
        "version": version, "created": time.time(), "lineage": [
            {k: v[k] for k in ("name", "parent", "created")} | {"attacks": len(v["attacks"])} for v in versions.all()],
        "totals": {"attacks": len(attacks), "break_v1": sum(r["fall_v1"] >= 0.5 for r in rows),
                   "break_now": sum(r["fall_now"] >= 0.5 for r in rows)},
        "gauntlet": gauntlet,
        "families": sorted(({"family": k, **v} for k, v in families.items()), key=lambda x: -x["break_now"]),
        "findings": top,
    }


def summarize(report: dict) -> dict:
    slim = {k: report[k] for k in ("version", "totals", "gauntlet", "families", "lineage")}
    slim["findings"] = [{k: f.get(k) for k in ("text", "family", "conditions", "fall_v1", "fall_now", "diagnosis", "margin")}
                        for f in report["findings"]]
    for f in slim["findings"]:
        if f["margin"]:
            f["margin"] = {k: f["margin"][k] for k in ("condition", "nominal", "failing_value", "starts_falling_at")}
    return client.respond(SUMMARY_PROMPT.format(data=json.dumps(slim, default=float)), model=config.text_model(),
                          schema=SUMMARY_SCHEMA, reasoning="medium", tag="report/summary")
