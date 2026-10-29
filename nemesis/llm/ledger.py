"""Spend ledger: what every Meta Model API call cost, and the site's budget mode.

Every billed call (Responses, Autopilot turns, Voice Transcribe) is appended to runs/spend.jsonl with its
input, cached-input, output and reasoning tokens and the dollar cost from PRICES. The running total
sets the mode the public site works in:

  normal   below NEMESIS_CLAMP_AT ($100): the usual per-visitor limits
  clamped  from $100: much tighter per-visitor limits, plus a site-wide hourly spend cap
  stopped  from NEMESIS_STOP_AT ($125): no new paid calls (the API itself has no spend cap)

NEMESIS_SPEND_BASE adds dollars spent before tracking began (or on other machines) to the total.
`python -m nemesis.llm.ledger` prints a summary.
"""

import contextvars
import json
import os
import threading
import time
from pathlib import Path

# Per 1M tokens, from https://dev.meta.ai/docs/pricing-rate-limits (read 2026-10-29).
# Output tokens include reasoning tokens.
PRICES = {
    "muse-wonder-1.0": {"input": 4.00, "cached_input": 0.20, "output": 20.00},
    "muse-spark-1.3": {"input": 1.25, "cached_input": 0.15, "output": 4.25},
    "muse-spark-1.3-contributor": {"input": 0.10, "cached_input": 0.002, "output": 0.20},
    "muse-spark-1.2": {"input": 1.25, "cached_input": 0.15, "output": 4.25},
    "muse-spark-1.2-contributor": {"input": 0.10, "cached_input": 0.002, "output": 0.20},
    "muse-spark-1.1": {"input": 1.25, "cached_input": 0.15, "output": 4.25},
}
TRANSCRIBE_PER_HOUR = 0.18  # muse-voice-transcribe-1.0, billed per whole second of audio
SAM_PER_IMAGE = 2.50 / 1000  # sam-3.1
FALLBACK = PRICES["muse-wonder-1.0"]  # an unlisted model is charged at the most expensive rate
FREE = {"glimmer", "spark-open", "faster-whisper"}  # self-hosted

PATH = Path(os.environ.get("NEMESIS_SPEND_PATH", "runs/spend.jsonl"))
BASE = float(os.environ.get("NEMESIS_SPEND_BASE", "0"))
CLAMP_AT = float(os.environ.get("NEMESIS_CLAMP_AT", "100"))
STOP_AT = float(os.environ.get("NEMESIS_STOP_AT", "125"))
CLAMPED_PER_HOUR = float(os.environ.get("NEMESIS_CLAMPED_PER_HOUR", "2"))  # site-wide, once clamped

# Who the current request is for (a hashed IP, set by the server); asyncio tasks and to_thread copy it.
WHO: contextvars.ContextVar[str] = contextvars.ContextVar("nemesis_who", default="")

_lock = threading.Lock()
_rows: list[tuple[float, float]] | None = None  # (ts, cost), loaded once
_total = 0.0


class BudgetExhausted(RuntimeError):
    """`detail` is the visitor-facing message (the job runner and the server show it as is)."""

    @property
    def detail(self) -> str:
        return str(self)


def _load():
    global _rows, _total
    if _rows is not None:
        return
    _rows, _total = [], 0.0
    if PATH.exists():
        for line in PATH.read_text().splitlines():
            try:
                r = json.loads(line)
            except json.JSONDecodeError:
                continue
            _rows.append((r["ts"], r["cost"]))
            _total += r["cost"]


def token_cost(model: str, usage: dict | None) -> tuple[float, dict]:
    """Dollar cost of one token-billed call and the token counts it was billed on."""
    u = usage or {}
    inp = u.get("input_tokens", u.get("prompt_tokens", 0)) or 0
    out = u.get("output_tokens", u.get("completion_tokens", 0)) or 0
    cached = ((u.get("input_tokens_details") or u.get("prompt_tokens_details") or {}).get("cached_tokens") or 0)
    reasoning = ((u.get("output_tokens_details") or u.get("completion_tokens_details") or {}).get("reasoning_tokens") or 0)
    counts = {"input": inp, "cached_input": cached, "output": out, "reasoning": reasoning}
    if model in FREE:
        return 0.0, counts
    if model == "sam-3.1":  # billed per image, not per token
        counts["images"] = int(u.get("images_processed") or 1)
        return counts["images"] * SAM_PER_IMAGE, counts
    p = PRICES.get(model, FALLBACK)
    cost = ((inp - cached) * p["input"] + cached * p["cached_input"] + out * p["output"]) / 1e6
    return cost, counts


def _append(entry: dict):
    global _total
    with _lock:
        _load()
        PATH.parent.mkdir(parents=True, exist_ok=True)
        with open(PATH, "a") as f:
            f.write(json.dumps(entry) + "\n")
        _rows.append((entry["ts"], entry["cost"]))
        _total += entry["cost"]


def record(model: str, usage: dict | None, tag: str = "") -> float:
    """Logs a token-billed call; returns its cost."""
    cost, counts = token_cost(model, usage)
    _append({"ts": time.time(), "tag": tag, "model": model, **counts, "cost": round(cost, 6),
             "who": WHO.get(), **({} if usage else {"usage_missing": True})})
    return cost


def record_audio(seconds: float, tag: str = "") -> float:
    cost = int(seconds) * TRANSCRIBE_PER_HOUR / 3600
    _append({"ts": time.time(), "tag": tag, "model": "muse-voice-transcribe-1.0", "audio_s": round(seconds, 1),
             "cost": round(cost, 6), "who": WHO.get()})
    return cost


def total() -> float:
    """Dollars spent so far, NEMESIS_SPEND_BASE included."""
    with _lock:
        _load()
        return BASE + _total


def spent_since(t: float) -> float:
    with _lock:
        _load()
        return sum(c for ts, c in reversed(_rows) if ts >= t) if _rows else 0.0


def mode() -> str:
    t = total()
    return "stopped" if t >= STOP_AT else "clamped" if t >= CLAMP_AT else "normal"


def guard():
    """Raises BudgetExhausted when no new paid call may start."""
    m = mode()
    if m == "stopped":
        raise BudgetExhausted("Muse is resting: this demo has used its model budget. Replays and the Playground still work.")
    if m == "clamped" and spent_since(time.time() - 3600) >= CLAMPED_PER_HOUR:
        raise BudgetExhausted("Muse is busy right now: try again in a little while. Replays and the Playground still work.")


def summary(path: Path = PATH) -> dict:
    rows = [json.loads(l) for l in path.read_text().splitlines() if l.strip()] if path.exists() else []
    out = {"total": round(BASE + sum(r["cost"] for r in rows), 4), "base": BASE, "calls": len(rows), "mode": mode(),
           "clamp_at": CLAMP_AT, "stop_at": STOP_AT, "by_tag": {}, "by_model": {}, "by_day": {}, "top_who": {}}
    for r in rows:
        for key, name in (("by_tag", r.get("tag") or "?"), ("by_model", r["model"]),
                          ("by_day", time.strftime("%Y-%m-%d", time.gmtime(r["ts"]))), ("top_who", r.get("who") or "-")):
            a = out[key].setdefault(name, {"calls": 0, "cost": 0.0, "input": 0, "cached_input": 0, "output": 0})
            a["calls"] += 1
            a["cost"] = round(a["cost"] + r["cost"], 6)
            for k in ("input", "cached_input", "output"):
                a[k] += r.get(k, 0)
    out["top_who"] = dict(sorted(out["top_who"].items(), key=lambda kv: -kv[1]["cost"])[:10])
    return out


if __name__ == "__main__":
    print(json.dumps(summary(), indent=1))
