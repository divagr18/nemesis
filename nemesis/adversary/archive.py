"""The failure atlas: one JSON line per searched program, reproducible from (θ, policy, seeds)."""

import json
import time
import uuid
from pathlib import Path

import numpy as np

from nemesis.perturb import canonical as C


class Archive:
    def __init__(self, path: str | Path):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.records = [json.loads(l) for l in self.path.read_text().splitlines()] if self.path.exists() else []

    def add(self, **rec) -> dict:
        rec = {"id": uuid.uuid4().hex[:8], "ts": time.time(), **rec}
        for k, v in list(rec.items()):
            if isinstance(v, np.ndarray):
                rec[k] = v.round(5).tolist()
        self.records.append(rec)
        with open(self.path, "a") as f:
            f.write(json.dumps(rec) + "\n")
        return rec

    def failures(self) -> list[dict]:
        return [r for r in self.records if r.get("found")]

    def thetas(self, failures_only: bool = True) -> np.ndarray:
        recs = self.failures() if failures_only else self.records
        return np.array([r["theta"] for r in recs], np.float32).reshape(-1, C.D)

    def history_for_prompt(self) -> list[dict]:
        """Compact summary of every attempt, for the proposer's next round."""
        return [{"name": r["name"], "hypothesis": r["hypothesis"], "found": r["found"],
                 "fail_rate": r["fail_rate"], "cost": r["cost"], "theta": r["theta_desc"]}
                for r in self.records]
