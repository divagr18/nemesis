"""Per-visitor limits: a per-minute burst limit and a 6-hour quota for each kind of request.

A visitor is an IP address (the site has no accounts). Once the spend ledger is clamped (see
nemesis/llm/ledger.py) the 6-hour quotas drop to the CLAMPED column, and requests that call a
paid model are turned away while the site-wide hourly cap or the stop line is reached.
"""

import hashlib
import math
import time
from collections import defaultdict, deque

from fastapi import HTTPException

from nemesis.llm import ledger

WINDOW = 6 * 3600

# bucket: (per minute, per 6 h, per 6 h once clamped, calls a paid model)
LIMITS = {
    "attack": (3, 40, 8, True),       # typed, spoken or photo: one Muse Wonder call (+ Transcribe / Spark)
    "duel": (2, 6, 2, True),          # a new duel: Muse writes its first attack straight away
    "duel-round": (6, 30, 6, True),   # your attack, Muse's next one and the commentary
    "brief": (1, 3, 1, True),         # Live deployment: two Wonder passes, three Spark labels, ~20 sims
    "agent": (1, 2, 0, True),         # Autopilot: up to 12 Wonder turns
    "report": (1, 2, 1, True),        # a full retest plus a Wonder summary
    "patch": (1, 4, 2, True),         # 6-20 min of training, then a Wonder changelog and a Spark line
    "envelope": (4, 30, 10, False),   # an 11 x 11 grid on the GPU, no model call
    "shove": (6, 120, 120, False),    # Playground: no model call
}

_hits: dict[str, deque] = defaultdict(deque)
_last_sweep = 0.0


def who(ip: str) -> str:
    return hashlib.sha256(f"nemesis:{ip}".encode()).hexdigest()[:12]


def _wait(seconds: float) -> str:
    m = max(1, math.ceil(seconds / 60))
    return f"{m} min" if m < 60 else f"{m // 60} h {m % 60:02d} min" if m % 60 else f"{m // 60} h"


def _sweep(now: float):
    global _last_sweep
    if now - _last_sweep < 600:
        return
    _last_sweep = now
    for k in [k for k, q in _hits.items() if not q or now - q[-1] >= WINDOW]:
        _hits.pop(k, None)


def check(ip: str, bucket: str = "attack"):
    """Counts one request from `ip` against `bucket`, or raises 429/503 with a message for the page."""
    per_min, per_window, clamped, paid = LIMITS[bucket]
    ledger.WHO.set(who(ip))
    mode = ledger.mode()
    if paid:
        try:
            ledger.guard()
        except ledger.BudgetExhausted as e:
            raise HTTPException(503, str(e))
        if mode != "normal":
            per_window = clamped
        if per_window == 0:
            raise HTTPException(503, "This is paused for now to save the model budget. "
                                     "Break it, the replays and the Playground still work.")
    now = time.time()
    _sweep(now)
    q = _hits[f"{bucket}:{ip}"]
    while q and now - q[0] >= WINDOW:
        q.popleft()
    recent = [t for t in q if now - t < 60]
    if len(recent) >= per_min:
        raise HTTPException(429, f"Easy there: {per_min} per minute. Try again in {_wait(60 - (now - recent[0]))}.")
    if len(q) >= per_window:
        raise HTTPException(429, f"You've used all {per_window} for now (the limit is {per_window} every 6 hours). "
                                 f"More in {_wait(WINDOW - (now - q[0]))}. The replays and the Playground still work.")
    q.append(now)


def status(ip: str) -> dict:
    """What `ip` has left in each bucket (for the page)."""
    now, mode, out = time.time(), ledger.mode(), {}
    for bucket, (_, per_window, clamped, paid) in LIMITS.items():
        cap = clamped if paid and mode != "normal" else per_window
        used = sum(1 for t in _hits.get(f"{bucket}:{ip}", ()) if now - t < WINDOW)
        out[bucket] = {"left": max(0, cap - used), "of": cap}
    return {"mode": mode, "window_hours": WINDOW // 3600, "buckets": out}
