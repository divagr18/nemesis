"""You vs Muse: a human and Muse Wonder take turns trying to break the same robot.

Each round both sides submit one attack at the same time (Muse never sees the human's attack for
that round, only earlier rounds, as does the human). Both run on the live robot with the same
seeds. Score = 100 x fall rate x subtlety (1 - implausibility), so the smallest realistic change
that still knocks the robot over wins; brute force, where even our toughest policy falls, scores 0.
Normal difficulty: Muse writes fixed values like the human. Hard: up to 3 of its numbers are tuned
by CMA-ES.
"""

import hashlib
import json
import time
import uuid
from pathlib import Path

import numpy as np

from nemesis import config
from nemesis.llm import client
from nemesis.perturb import canonical as C
from nemesis.perturb.dsl import Program, compile_program, json_schema

SEEDS = 8
UNSURVIVABLE = 0.9

MUSE_PROMPT = """You are Muse, playing "break the robot" against a human. Each round you and the human
each describe ONE physical attack on a simulated Unitree Go1 quadruped (12 kg, walking forward at
about 1 m/s for 5 seconds). Each attack runs {seeds} times on the same robot with the same seeds.

Scoring: score = 100 x fall rate x subtlety, where subtlety = 1 - implausibility, and implausibility
is the RMS of how far each changed condition is from normal relative to its physical range. Brute
force scores 0: if even our toughest robot falls on it 90% of the time, it doesn't count. So the
winning attack is the SMALLEST realistic change that still knocks the robot over. Usually that
means one or two well-timed, moderate conditions, not everything at once.

{difficulty}

Previous rounds (both sides' attacks and results):
{history}

Physical envelope:
{slots}

Program schema:
{schema}

Answer with JSON only: {{"say": "<your attack in plain English, at most 15 words>", "program": <Program>}}"""

NORMAL = "Use FIXED numbers only (no [lo, hi] ranges). Include a command op (e.g. {\"op\": \"command\", \"a\": [1.0, 0, 0]})."
HARD = ("You may leave up to 3 numbers as [lo, hi] ranges; an optimizer will tune them to the most subtle "
        "failure. Include a command op (e.g. {\"op\": \"command\", \"a\": [1.0, 0, 0]}).")

COMMENT_PROMPT = """You are the commentator of a "break the robot" duel between a human and Muse (an AI).
Round {n}. Human: "{h}" -> fell {hf:.0%} of tries, subtlety {hs:.0%}, score {hp}{hcheap}.
Muse: "{m}" -> fell {mf:.0%}, subtlety {ms:.0%}, score {mp}{mcheap}.
Write ONE playful, good-natured line (at most 25 words) about this round, like a sports commentator.
Be specific about the physics. No insults. Plain text only."""


class Duel:
    def __init__(self, rounds: int, hard: bool, version: str):
        self.id = uuid.uuid4().hex[:10]
        self.rounds, self.hard, self.version = rounds, hard, version
        self.history: list[dict] = []
        self.created = time.time()
        self.pending = None
        self.sealed = self.commit = None  # Muse's locked attack for the current round, and its sha256

    @property
    def score(self) -> dict:
        return {"you": sum(r["you"]["score"] for r in self.history),
                "muse": sum(r["muse"]["score"] for r in self.history)}

    @property
    def over(self) -> bool:
        return len(self.history) >= self.rounds

    def winner(self) -> str | None:
        if not self.over:
            return None
        s = self.score
        return "you" if s["you"] > s["muse"] else "muse" if s["muse"] > s["you"] else "draw"

    def public(self) -> dict:
        strip = lambda side: {k: v for k, v in side.items() if k != "theta"}  # noqa: E731
        return {"id": self.id, "rounds": self.rounds, "hard": self.hard, "version": self.version,
                "history": [{**r, "you": strip(r["you"]), "muse": strip(r["muse"])} for r in self.history],
                "score": self.score, "over": self.over, "winner": self.winner()}

    def history_text(self) -> str:
        if not self.history:
            return "(none yet: this is round 1)"
        return "\n".join(
            f"Round {i + 1}: human \"{r['you']['text']}\" -> fell {r['you']['fall_rate']:.0%}, "
            f"subtlety {r['you']['subtlety']:.0%}, score {r['you']['score']}; Muse \"{r['muse']['text']}\" "
            f"{json.dumps(r['muse']['conditions'])} -> fell {r['muse']['fall_rate']:.0%}, "
            f"subtlety {r['muse']['subtlety']:.0%}, score {r['muse']['score']}"
            for i, r in enumerate(self.history))


def muse_attack(duel: Duel) -> tuple[str, Program]:
    slots = "\n".join(f"- {s.name} [{s.unit}] {s.lo}..{s.hi}: {s.doc}" for s in C.SLOTS)
    prompt = MUSE_PROMPT.format(seeds=SEEDS, difficulty=HARD if duel.hard else NORMAL,
                                history=duel.history_text(), slots=slots, schema=json.dumps(json_schema()))
    last = None
    for _ in range(3):  # a malformed program gets the validation error back once or twice
        raw = client.respond(prompt + (f"\n\nYour previous answer was invalid: {last}" if last else ""),
                             model=config.text_model(), reasoning="medium", tag="duel/muse", cache=False,
                             json_only=True)
        raw = raw[raw.find("{"):raw.rfind("}") + 1]
        try:
            data = json.loads(raw)
            prog = dict(data["program"])
            prog.setdefault("name", "muse")
            prog.setdefault("hypothesis", data.get("say", ""))
            program = Program.model_validate(prog)
            compiled = compile_program(program)
            if not duel.hard and compiled.k:
                raise ValueError("ranges are not allowed on normal difficulty; use fixed numbers")
            if compiled.k > 3:
                raise ValueError("at most 3 ranges")
            say = str(data.get("say", ""))[:120]
            # Commitment: published before the human attacks, verifiable in the browser at the reveal.
            duel.sealed = json.dumps({"say": say, "program": program.model_dump(mode="json")}, sort_keys=True)
            duel.commit = hashlib.sha256(duel.sealed.encode()).hexdigest()
            return say, program
        except Exception as e:  # noqa: BLE001
            last = str(e)[:300]
    raise RuntimeError(f"Muse could not produce a valid attack: {last}")


def tune(ev, params, program: Program) -> np.ndarray:
    """Hard mode: CMA-ES over Muse's ranges for the highest-scoring (most subtle) failure."""
    from nemesis.adversary.cmaes import search_many

    compiled = compile_program(program)
    if compiled.k == 0:
        return np.asarray(compiled.base, np.float32)
    (r,) = search_many(ev, params, [compiled], pop=16, gens=6, seeds=8, slots=1, key=int(time.time()) % 1000)
    return np.asarray(r.best_theta, np.float32)


def play(sim: dict, theta_you: np.ndarray, theta_muse: np.ndarray, key: int) -> dict:
    """Both attacks on the live robot, same seeds; one recorded rollout each for the replay."""
    from nemesis.adversary.cmaes import plausibility_cost
    from nemesis.sim import export

    ev, live = sim["ev"], sim["live"]
    thetas = np.stack([theta_you, theta_muse]).astype(np.float32)
    res = ev(live, thetas, seeds=SEEDS, key=key)
    ref = ev(sim["reference"], thetas, seeds=SEEDS, key=key)["fell"].mean(1) if sim.get("reference") is not None \
        else np.zeros(2)
    implaus = plausibility_cost(thetas)
    out = []
    for i, (who, th) in enumerate((("you", theta_you), ("muse", theta_muse))):
        fell = res["fell"][i]
        seed = int(np.flatnonzero(fell)[0]) if fell.any() else 0
        rec = ev(live, th[None], seeds=np.array([seed]), key=key, record=True)
        f0 = bool(rec["fell"][0, 0])
        T = rec["qpos"].shape[2]
        t_end = int(min(T, rec["time_to_fall"][0, 0] / ev.env.dt + 75)) if f0 else T
        traj = export.trajectory(ev.env.mj_model, rec["qpos"][0, 0][:t_end], th, ev.env.dt, label=who,
                                 fall_time=float(rec["time_to_fall"][0, 0]) if f0 else None)
        fr, subtle = float(fell.mean()), float(max(0.0, 1.0 - implaus[i]))
        cheap = bool(ref[i] >= UNSURVIVABLE)
        out.append({"fall_rate": fr, "seeds": [bool(x) for x in fell], "subtlety": round(subtle, 3), "cheap": cheap,
                    "score": 0 if cheap else int(round(100 * fr * subtle)),
                    "reference_fall_rate": float(ref[i]), "conditions": C.describe(th),
                    "theta": th.round(5).tolist(), "traj": traj})
    return {"you": out[0], "muse": out[1]}


def commentary(n: int, you: dict, muse: dict) -> str:
    try:
        return client.respond(COMMENT_PROMPT.format(
            n=n, h=you["text"], hf=you["fall_rate"], hs=you["subtlety"], hp=you["score"],
            hcheap=" (brute force, scored 0)" if you["cheap"] else "",
            m=muse["text"], mf=muse["fall_rate"], ms=muse["subtlety"], mp=muse["score"],
            mcheap=" (brute force, scored 0)" if muse["cheap"] else ""),
            model=config.text_model(), reasoning="low", tag="duel/comment", cache=False).strip().strip('"')[:240]
    except Exception:  # noqa: BLE001  (commentary is decoration; never fail a round over it)
        return ""


class Tally:
    """Global human-vs-Muse record across all finished duels."""

    def __init__(self, path: Path):
        self.path = path

    def get(self) -> dict:
        return json.loads(self.path.read_text()) if self.path.exists() else {"you": 0, "muse": 0, "draw": 0, "log": []}

    def add(self, winner: str):
        t = self.get()
        t[winner] = t.get(winner, 0) + 1
        t["log"] = (t.get("log", []) + [winner])[-128:]  # most recent duels, oldest first
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.path.write_text(json.dumps(t))
