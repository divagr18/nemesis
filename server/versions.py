"""The live robot's lineage: v1 is the starting policy, every accepted patch adds a version.

runs/serve/versions.json   {"live": "v3", "versions": [{name, dir, parent, created, attacks, gate}, ...]}
runs/serve/bank.npy        every attack (and its jitter cloud) a patch was trained on, replayed by
                           later patches so old fixes are not forgotten
runs/serve/status.json     {attack_id: {version: fall_rate}}: each broken attack re-tested against
                           every new version ("broke v2 · survived since v3")
"""

import json
import shutil
import time
from pathlib import Path

import numpy as np


class Versions:
    def __init__(self, root: Path, initial_policy: str):
        self.root = root
        self.path = root / "versions.json"
        self.bank_path = root / "bank.npy"
        self.status_path = root / "status.json"
        if not self.path.exists():
            root.mkdir(parents=True, exist_ok=True)
            self._write({"live": "v1", "versions": [{
                "name": "v1", "dir": str(initial_policy), "parent": None, "created": time.time(),
                "attacks": [], "gate": None}]})

    def _read(self) -> dict:
        return json.loads(self.path.read_text())

    def _write(self, data: dict):
        tmp = self.path.with_suffix(".tmp")
        tmp.write_text(json.dumps(data, indent=1))
        tmp.replace(self.path)

    def all(self) -> list[dict]:
        return self._read()["versions"]

    def live(self) -> dict:
        data = self._read()
        return next(v for v in data["versions"] if v["name"] == data["live"])

    def next_dir(self) -> tuple[str, Path]:
        name = f"v{len(self.all()) + 1}"
        return name, self.root / "versions" / name

    def add(self, name: str, run_dir: Path, parent: str, attacks: list[str], gate: dict, fresh: np.ndarray):
        """Registers an accepted patch, makes it live, and grows the replay bank."""
        data = self._read()
        data["versions"].append({"name": name, "dir": str(run_dir), "parent": parent, "created": time.time(),
                                 "attacks": attacks, "gate": gate})
        data["live"] = name
        self._write(data)
        bank = np.load(self.bank_path) if self.bank_path.exists() else np.zeros((0, fresh.shape[1]), np.float32)
        np.save(self.bank_path, np.concatenate([bank, fresh]).astype(np.float32))

    def reject(self, run_dir: Path):
        """A patch that failed its gate is kept for inspection under rejected/, never served."""
        dest = self.root / "rejected" / f"{run_dir.name}_{int(time.time())}"
        dest.parent.mkdir(parents=True, exist_ok=True)
        if run_dir.exists():
            shutil.move(str(run_dir), dest)
        return dest

    # ---- per-attack status across versions ------------------------------------------------------
    def status(self) -> dict:
        return json.loads(self.status_path.read_text()) if self.status_path.exists() else {}

    def record(self, results: dict[str, float], version: str):
        st = self.status()
        for attack_id, fall in results.items():
            st.setdefault(attack_id, {})[version] = round(float(fall), 3)
        self.status_path.write_text(json.dumps(st))
