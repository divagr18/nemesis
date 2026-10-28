"""Patch: fine-tune the live robot on attacks that broke it, then gate the result.

Runs as a subprocess of the server (it needs its own GPU memory for PPO) and prints one
`EVENT {json}` line per stage, which the server relays to the page.

  1. bank = each new attack + a jitter cloud around it (nearby variants, so the fix generalizes),
     plus the community bank of earlier patches (replayed, so old fixes are not forgotten),
     padded to a fixed size so the training graph compiles once and hits the JAX cache after;
  2. fine-tune from the current version: 50% nominal / 40% bank / 10% uniform over the
     quarter-width envelope, lr 1e-4 (the recipe validated in experiments/finetune.py), with an
     attempt at every checkpoint; training stops once the attack is handled and walking is intact;
  3. regression gate on fixed seeds: the new attacks must fall less, and nominal walking and the
     locked hand-written + realistic gauntlet must not get worse.

usage: python -m server.patch_worker --base runs/serve/versions/v1 --thetas new.npy \
           --bank runs/serve/bank.npy --out runs/serve/versions/v2 --steps 8000000
"""

import argparse
import json
import sys
import time
from pathlib import Path

import numpy as np

BANK_SIZE = 512
CLOUD = 48  # jittered variants per new attack
JITTER = 0.08  # std of the jitter, as a fraction of each slot's physical range
NO_JITTER = ("command_mode",)
GATE_SEEDS = 16
CKPT_EVERY = 1_000_000  # one attempt per million simulated steps
MIN_STEPS = 2_000_000   # practise at least this long, so the fix is not a lucky checkpoint
HELD = 2 / 16           # stop once the robot falls on at most this share of seeds (and walks normally)
TIMELAPSE_MAX = 6       # attempts shown in the timelapse (always the first and the last)


def event(stage: str, **kw):
    print("EVENT " + json.dumps({"stage": stage, "t": round(time.time(), 2), **kw}), flush=True)


def jitter_cloud(theta: np.ndarray, n: int, rng: np.random.Generator) -> np.ndarray:
    """Variants of one attack: only the slots the attack actually perturbs are jittered."""
    from nemesis.perturb import canonical as C

    active = np.abs(theta - C.NEUTRAL) > 1e-6
    for name in NO_JITTER:
        active[C.INDEX[name]] = False
    noise = rng.normal(0.0, JITTER, (n, C.D)) * C.SPAN * active
    return np.stack([C.clip(theta + z) for z in noise]).astype(np.float32)


def build_bank(new: np.ndarray, old: np.ndarray, rng: np.random.Generator):
    """Fixed-size bank and sampling weights: half the mass on the new attacks, half on replay."""
    fresh = np.concatenate([np.concatenate([t[None], jitter_cloud(t, CLOUD, rng)]) for t in new])
    if len(fresh) > BANK_SIZE // 2:
        fresh = fresh[rng.permutation(len(fresh))[:BANK_SIZE // 2]]
    room = BANK_SIZE - len(fresh)
    replay = old[rng.permutation(len(old))[:room]] if len(old) else np.zeros((0, fresh.shape[1]), np.float32)
    w_fresh = np.full(len(fresh), 0.5 / len(fresh) if len(replay) else 1.0 / len(fresh))
    w_replay = np.full(len(replay), 0.5 / max(len(replay), 1))
    pad = BANK_SIZE - len(fresh) - len(replay)
    bank = np.concatenate([fresh, replay, np.repeat(fresh[:1], pad, 0)]).astype(np.float32)
    weights = np.concatenate([w_fresh, w_replay, np.zeros(pad)])  # padding is never sampled
    return bank, weights, fresh


def gate(ev, old_params, new_params, attacks: np.ndarray) -> dict:
    sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "experiments"))
    from finetune import forward_nominal
    from gauntlet import load as load_gauntlet

    g = load_gauntlet()
    suites = {"attacks": attacks, "nominal": forward_nominal()[None],
              "gauntlet": np.concatenate([g["hand"], g["realistic"]])}
    out = {}
    for name, th in suites.items():
        o, n = (ev(p, th, seeds=GATE_SEEDS, key=4242) for p in (old_params, new_params))
        out[name] = {"before": float(o["fell"].mean()), "after": float(n["fell"].mean()),
                     "progress_before": float(o["progress"].mean()), "progress_after": float(n["progress"].mean())}
    a, nom, gt = out["attacks"], out["nominal"], out["gauntlet"]
    checks = {
        "fixes the attack": a["after"] < a["before"] and a["after"] <= max(0.5, a["before"] - 0.25),
        "still walks": nom["after"] == 0.0 and nom["progress_after"] >= 0.9 * nom["progress_before"],
        "no regressions": gt["after"] <= gt["before"] + 0.03,
    }
    return {"suites": out, "checks": checks, "accepted": all(checks.values())}


class Attempts:
    """Each checkpoint replays the attack (16 seeds, recorded, same batch shape every time: MJX rollouts
    are not bit-exact across batch sizes) and checks normal walking. Streams one `attempt` event per
    checkpoint and decides when training can stop."""

    def __init__(self, ev, new: np.ndarray, nominal: np.ndarray):
        self.ev, self.new, self.nominal = ev, new, nominal
        self.recs: list[tuple[str, dict]] = []

    def __call__(self, step: int, params, label: str | None = None) -> bool:
        rec = self.ev(params, self.new[:1], seeds=16, key=777, record=True)
        falls = float(rec["fell"].mean())
        if len(self.new) > 1:  # community patches: every attack must be handled
            falls = max(falls, float(self.ev(params, self.new, seeds=16, key=777)["fell"].mean()))
        walks = float(self.ev(params, self.nominal, seeds=16, key=4242)["fell"].mean()) == 0.0
        label = label or f"{step / 1e6:.0f}M"
        self.recs.append((label, rec))
        event("attempt", n=len(self.recs) - 1, label=label, step=step, falls=round(falls, 3), walks=walks)
        return step >= MIN_STEPS and falls <= HELD and walks

    def timelapse(self, theta: np.ndarray, clips: Path, tag: str) -> list[dict]:
        """The attack replayed by the attempts on one seed where the original falls: the robot learning."""
        from nemesis.sim import export

        ev, recs = self.ev, self.recs
        if len(recs) > TIMELAPSE_MAX:  # evenly spaced, keeping the first and the last
            keep = np.unique(np.linspace(0, len(recs) - 1, TIMELAPSE_MAX).round().astype(int))
            recs = [recs[i] for i in keep]
        fell0 = recs[0][1]["fell"][0]
        held_end = ~recs[-1][1]["fell"][0]
        pick = np.flatnonzero(fell0 & held_end)  # the clearest lesson: the original falls, the final holds
        pick = pick if len(pick) else np.flatnonzero(fell0)
        j = int(pick[0]) if len(pick) else 0
        clips.mkdir(parents=True, exist_ok=True)
        out = []
        for i, (label, rec) in enumerate(recs):
            fell = bool(rec["fell"][0, j])
            q = rec["qpos"][0, j]
            if fell:  # end ~1 s after the fall, like the server's clips
                q = q[: int(min(len(q), rec["time_to_fall"][0, j] / ev.env.dt + 50))]
                q = export.hold_after_fall(q, theta, float(rec["time_to_fall"][0, j]), ev.env.dt)
            tr = export.trajectory(ev.env.mj_model, q, theta, ev.env.dt, label=label,
                                   fall_time=float(rec["time_to_fall"][0, j]) if fell else None)
            name = f"{tag}_tl{i}.json"
            (clips / name).write_text(json.dumps(tr))
            out.append({"label": label, "fell": fell, "url": f"/traj/{name}"})
        return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", required=True, help="current version dir")
    ap.add_argument("--thetas", required=True, help=".npy [N, D] attacks to fix")
    ap.add_argument("--bank", default="", help=".npy community bank to replay")
    ap.add_argument("--out", required=True)
    ap.add_argument("--steps", type=int, default=8_000_000)
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--clips", default="", help="where to write timelapse trajectories (served at /traj/)")
    ap.add_argument("--tag", default="patch", help="file prefix for this patch's timelapse")
    args = ap.parse_args()

    event("loading")
    from nemesis.adversary.baselines import envelope
    from nemesis.envs.base import load_env
    from nemesis.perturb.wrapper import NemesisWrapper
    from nemesis.sim.evaluate import Evaluator
    from nemesis.train.ppo import load_params, train

    rng = np.random.default_rng(args.seed)
    new = np.load(args.thetas).astype(np.float32)
    old = np.load(args.bank).astype(np.float32) if args.bank and Path(args.bank).exists() else np.zeros((0, new.shape[1]), np.float32)
    bank, weights, fresh = build_bank(new, old, rng)
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    np.save(out / "fresh.npy", fresh)
    event("bank", new=len(new), variants=len(fresh), replayed=int((weights > 0).sum() - len(fresh)))

    base = load_params(args.base)
    sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "experiments"))
    from finetune import forward_nominal

    ev = Evaluator(NemesisWrapper(load_env()[0], base_dr=False), args.base, horizon=250)
    attempts = Attempts(ev, new, forward_nominal()[None])
    attempts(0, base, label="before")
    lo, hi = envelope(0.25)
    env = NemesisWrapper(load_env()[0], bank=bank, bank_weights=weights, nominal_frac=0.5,
                         uniform_frac=0.1, lo=lo, hi=hi)
    eval_env = NemesisWrapper(load_env()[0], nominal_frac=1.0)
    event("training", steps=args.steps)
    t0 = time.time()
    # A checkpoint every CKPT_EVERY steps (few eval envs: the attempts and the gate are the real checks);
    # training stops at the first attempt that handles the attack and still walks.
    stop = lambda step, params: step > 0 and attempts(step, params)  # noqa: E731
    _, _, steps = train(run_dir=out, num_timesteps=args.steps, num_evals=args.steps // CKPT_EVERY + 1, seed=args.seed,
                        restore_params=base, env=env, eval_env=eval_env, learning_rate=1e-4, num_eval_envs=16,
                        stop_fn=stop)
    event("trained", seconds=round(time.time() - t0, 1), steps=steps)

    event("gating")
    if args.clips:
        event("timelapse", attempts=attempts.timelapse(new[0], Path(args.clips), args.tag))
    result = gate(ev, base, load_params(out), new)
    (out / "gate.json").write_text(json.dumps(result, indent=1))
    event("done", **result)


if __name__ == "__main__":
    main()
