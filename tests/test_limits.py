"""Spend ledger (price registry, budget modes) and per-visitor limits (per minute, per 6 hours, clamped)."""

import json

import pytest
from fastapi import HTTPException

from nemesis.llm import ledger
from server import limits


@pytest.fixture
def fresh(tmp_path, monkeypatch):
    monkeypatch.setattr(ledger, "PATH", tmp_path / "spend.jsonl")
    monkeypatch.setattr(ledger, "_rows", None)
    monkeypatch.setattr(ledger, "_total", 0.0)
    monkeypatch.setattr(ledger, "BASE", 0.0)
    monkeypatch.setattr(limits, "_hits", limits.defaultdict(limits.deque))
    clock = {"t": 1_000_000.0}
    monkeypatch.setattr(limits.time, "time", lambda: clock["t"])
    return clock


def test_token_cost_splits_cached_input():
    usage = {"input_tokens": 8000, "input_tokens_details": {"cached_tokens": 6000},
             "output_tokens": 700, "output_tokens_details": {"reasoning_tokens": 500}}
    cost, counts = ledger.token_cost("muse-wonder-1.0", usage)
    assert counts == {"input": 8000, "cached_input": 6000, "output": 700, "reasoning": 500}
    assert cost == pytest.approx((2000 * 4.00 + 6000 * 0.20 + 700 * 20.00) / 1e6)
    assert ledger.token_cost("glimmer", usage)[0] == 0
    assert ledger.token_cost("some-new-model", usage)[0] == pytest.approx(cost)  # unknown: priced as Wonder


def test_record_persists_and_sets_modes(fresh, monkeypatch):
    monkeypatch.setattr(ledger, "CLAMP_AT", 0.05)
    monkeypatch.setattr(ledger, "STOP_AT", 0.10)
    usage = {"input_tokens": 7838, "output_tokens": 684}  # one translate call, ~$0.045
    ledger.record("muse-wonder-1.0", usage, "serve/translate")
    assert ledger.mode() == "normal"
    ledger.record("muse-wonder-1.0", usage, "serve/translate")
    assert ledger.mode() == "clamped"
    ledger.record_audio(30.7, "serve/voice")  # billed on whole seconds
    rows = [json.loads(line) for line in ledger.PATH.read_text().splitlines()]
    assert rows[-1]["cost"] == pytest.approx(30 * 0.18 / 3600, abs=1e-6)
    ledger.record("muse-wonder-1.0", usage, "serve/translate")
    assert ledger.mode() == "stopped"
    with pytest.raises(ledger.BudgetExhausted):
        ledger.guard()
    monkeypatch.setattr(ledger, "_rows", None)  # a restart reloads the total from the file
    assert ledger.total() == pytest.approx(sum(r["cost"] for r in
                                               map(json.loads, ledger.PATH.read_text().splitlines())))


def test_clamped_hourly_cap(fresh, monkeypatch):
    monkeypatch.setattr(ledger, "CLAMP_AT", 0.0)
    monkeypatch.setattr(ledger, "CLAMPED_PER_HOUR", 0.06)
    ledger.record("muse-wonder-1.0", {"input_tokens": 7838, "output_tokens": 684})
    ledger.guard()  # $0.045 this hour: still allowed
    ledger.record("muse-wonder-1.0", {"input_tokens": 7838, "output_tokens": 684})
    with pytest.raises(ledger.BudgetExhausted):
        ledger.guard()


def test_per_minute_and_six_hour_quota(fresh):
    ip = "203.0.113.7"
    for _ in range(3):
        limits.check(ip, "attack")
    with pytest.raises(HTTPException) as e:
        limits.check(ip, "attack")
    assert e.value.status_code == 429 and "per minute" in e.value.detail
    limits.check("198.51.100.1", "attack")  # another visitor is unaffected
    for _ in range(37):  # 40 per 6 h: three per minute until the quota runs out
        fresh["t"] += 61
        limits.check(ip, "attack")
    fresh["t"] += 61
    with pytest.raises(HTTPException) as e:
        limits.check(ip, "attack")
    assert "every 6 hours" in e.value.detail
    assert limits.status(ip)["buckets"]["attack"]["left"] == 0
    fresh["t"] += 6 * 3600  # the window slides
    limits.check(ip, "attack")


def test_clamped_quotas_and_free_buckets(fresh, monkeypatch):
    monkeypatch.setattr(ledger, "CLAMP_AT", 0.0)
    monkeypatch.setattr(ledger, "CLAMPED_PER_HOUR", 100.0)
    ip = "203.0.113.8"
    with pytest.raises(HTTPException) as e:
        limits.check(ip, "agent")  # Autopilot pauses once clamped
    assert e.value.status_code == 503
    for _ in range(8):
        fresh["t"] += 61
        limits.check(ip, "attack")
    fresh["t"] += 61
    with pytest.raises(HTTPException):
        limits.check(ip, "attack")
    monkeypatch.setattr(ledger, "STOP_AT", 0.0)
    with pytest.raises(HTTPException) as e:
        limits.check(ip, "duel")
    assert e.value.status_code == 503
    limits.check(ip, "shove")  # no model call: the Playground keeps working when stopped
