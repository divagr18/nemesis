"""Patch: fine-tune the live robot on attacks that broke it, then gate the result.

Runs as a subprocess of the server (it needs its own GPU memory for PPO) and prints one
`EVENT {json}` line per stage, which the server relays to the page.

  1. bank = each new attack + a jitter cloud around it (nearby variants, so the fix generalizes),
     plus the community bank of earlier patches (replayed, so old fixes are not forgotten),
     padded to a fixed size so the training graph compiles once and hits the JAX cache after;
  2. fine-tune from the current version: 50% nominal / 40% bank / 10% uniform over the
     quarter-width envelope, lr 1e-4 (the recipe validated in experiments/finetune.py);
  3. regression gate on fixed seeds: the new attacks must fall less, and nominal walking and the
     locked hand-written + realistic gauntlet must not get worse.

usage: python -m server.patch_worker --base runs/serve/versions/v1 --thetas new.npy \
           --bank runs/serve/bank.npy --out runs/serve/versions/v2 --steps 20000000
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


def timelapse(ev, base_params, run_dir: Path, theta: np.ndarray, clips: Path, tag: str) -> list[dict]:
    """The attack replayed by every training checkpoint on one seed where the original falls:
    the robot learning, attempt by attempt. Every attempt is recorded at the same batch shape
    (16 seeds), because MJX rollouts are not bit-exact across batch sizes; then one seed is kept."""
    from nemesis.sim import export
    from nemesis.train.ppo import checkpoints, load_params

    seeds = np.arange(16)
    ckpts = checkpoints(run_dir)[1:]  # the step-0 checkpoint is the starting policy again
    runs = [("before", base_params)] + [(f"{round(100 * (i + 1) / len(ckpts))}%", load_params(run_dir, int(c.stem)))
                                        for i, c in enumerate(ckpts)]
    recs = [ev(params, theta[None], seeds=seeds, key=777, record=True) for _, params in runs]
    fell0 = recs[0]["fell"][0]
    # Prefer a seed where the original falls and the final policy holds: the clearest lesson.
    held_end = ~recs[-1]["fell"][0]
    pick = np.flatnonzero(fell0 & held_end)
    pick = pick if len(pick) else np.flatnonzero(fell0)
    j = int(pick[0]) if len(pick) else 0
    clips.mkdir(parents=True, exist_ok=True)
    out = []
    for i, ((label, _), rec) in enumerate(zip(runs, recs)):
        fell = bool(rec["fell"][0, j])
        q = rec["qpos"][0, j]
        if fell:  # end ~1 s after the fall, like the server's clips
            q = q[: int(min(len(q), rec["time_to_fall"][0, j] / ev.env.dt + 50))]
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
    ap.add_argument("--steps", type=int, default=20_000_000)
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
    lo, hi = envelope(0.25)
    env = NemesisWrapper(load_env()[0], bank=bank, bank_weights=weights, nominal_frac=0.5,
                         uniform_frac=0.1, lo=lo, hi=hi)
    eval_env = NemesisWrapper(load_env()[0], nominal_frac=1.0)
    event("training", steps=args.steps)
    t0 = time.time()
    # Six evals on few envs: each saves a checkpoint for the timelapse; the gate below is the real check.
    train(run_dir=out, num_timesteps=args.steps, num_evals=6, seed=args.seed, restore_params=base,
          env=env, eval_env=eval_env, learning_rate=1e-4, num_eval_envs=16)
    event("trained", seconds=round(time.time() - t0, 1))

    event("gating")
    ev = Evaluator(NemesisWrapper(load_env()[0], base_dr=False), args.base, horizon=250)
    if args.clips:
        event("timelapse", attempts=timelapse(ev, base, out, new[0], Path(args.clips), args.tag))
    result = gate(ev, base, load_params(out), new)
    (out / "gate.json").write_text(json.dumps(result, indent=1))
    event("done", **result)


if __name__ == "__main__":
    main()
