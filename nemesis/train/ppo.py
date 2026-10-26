"""Brax PPO training with a checkpoint at every eval, plus policy loading.

Run layout:
  runs/<name>/config.json      env name, impl, PPO config (enough to rebuild the policy)
  runs/<name>/metrics.jsonl    one line per eval
  runs/<name>/ckpts/<step>.pkl (normalizer, policy, value) params at every eval
"""

import argparse
import functools
import json
import pickle
import time
from pathlib import Path

import jax
from brax.training.acme import running_statistics
from brax.training.agents.ppo import networks as ppo_networks
from brax.training.agents.ppo import train as ppo
from mujoco_playground import registry, wrapper
from mujoco_playground.config import locomotion_params

from nemesis import config
from nemesis.envs.base import load_env


def ppo_config(env_name: str, num_timesteps: int | None = None, num_evals: int | None = None):
    """Playground's tuned PPO config. Brax rounds the budget up to whole eval epochs."""
    params = locomotion_params.brax_ppo_config(env_name)
    if num_timesteps:
        params.num_timesteps = num_timesteps
    if num_evals:
        params.num_evals = num_evals
    params.num_envs = config.profile().num_envs
    return params


def train(
    env_name: str = config.BASE_ENV,
    run_dir: str | Path = "runs/baseline",
    num_timesteps: int | None = None,
    num_evals: int | None = None,
    seed: int = 0,
    domain_randomization: bool = True,
    restore_params=None,
    env=None,
    eval_env=None,
    nemesis: bool = True,
):
    """Trains a policy.

    nemesis=True trains through NemesisWrapper (body collisions, strict falls, unclipped reward,
    obs history, theta-aware critic, per-episode DR) on nominal scenarios unless `env` is given.
    Pass `env`/`eval_env` (already NemesisWrapper-wrapped) to train on a scenario bank.
    """
    from nemesis.perturb.wrapper import NemesisWrapper

    run_dir = Path(run_dir)
    (run_dir / "ckpts").mkdir(parents=True, exist_ok=True)
    if nemesis:
        env = env or NemesisWrapper(load_env(env_name)[0], nominal_frac=1.0)
        eval_env = eval_env or NemesisWrapper(load_env(env_name)[0], nominal_frac=1.0)
        domain_randomization = False  # applied per episode inside NemesisWrapper
    else:
        env = env or load_env(env_name, body_collisions=False)[0]
        eval_env = eval_env or load_env(env_name, body_collisions=False)[0]
    params = ppo_config(env_name, num_timesteps, num_evals)

    (run_dir / "config.json").write_text(json.dumps({
        "env_name": env_name, "impl": config.SIM_IMPL, "seed": seed, "nemesis": nemesis,
        "ppo": params.to_dict(),
    }, indent=1))

    t0 = time.time()
    metrics_f = open(run_dir / "metrics.jsonl", "a")

    def progress(step, metrics):
        row = {"step": int(step), "elapsed_s": round(time.time() - t0, 1)}
        row.update({k: float(v) for k, v in metrics.items() if k.startswith("eval/")})
        metrics_f.write(json.dumps(row) + "\n")
        metrics_f.flush()
        print(f"step {step:>12,}  reward {row.get('eval/episode_reward', float('nan')):8.2f}"
              f"  t={row['elapsed_s']:7.1f}s", flush=True)

    def save_ckpt(step, _make_policy, policy_params):
        with open(run_dir / "ckpts" / f"{int(step):012d}.pkl", "wb") as f:
            pickle.dump(jax.device_get(policy_params), f)

    kw = {k: v for k, v in params.items() if k != "network_factory"}
    make_inference_fn, policy_params, _ = ppo.train(
        environment=env,
        eval_env=eval_env,
        wrap_env_fn=wrapper.wrap_for_brax_training,
        network_factory=functools.partial(ppo_networks.make_ppo_networks, **params.network_factory),
        randomization_fn=registry.get_domain_randomizer(env_name) if domain_randomization else None,
        progress_fn=progress,
        policy_params_fn=save_ckpt,
        restore_params=restore_params,
        seed=seed,
        **kw,
    )
    metrics_f.close()  # Brax calls policy_params_fn after the final eval, so the last ckpt exists.
    print(f"done in {time.time() - t0:.0f}s -> {run_dir}", flush=True)
    return make_inference_fn, policy_params


def checkpoints(run_dir: str | Path) -> list[Path]:
    return sorted((Path(run_dir) / "ckpts").glob("*.pkl"))


def load_params(run_dir: str | Path, step: int | None = None):
    """Loads the checkpoint at `step` (default: latest)."""
    ckpts = checkpoints(run_dir)
    path = ckpts[-1] if step is None else Path(run_dir) / "ckpts" / f"{step:012d}.pkl"
    with open(path, "rb") as f:
        return pickle.load(f)


def make_policy(run_dir: str | Path, env, step: int | None = None, deterministic: bool = True):
    """Rebuilds a jitted policy fn `(obs, rng) -> (action, extras)` from a run directory."""
    cfg = json.loads((Path(run_dir) / "config.json").read_text())["ppo"]
    normalize = running_statistics.normalize if cfg.get("normalize_observations") else (lambda x, y: x)
    networks = ppo_networks.make_ppo_networks(
        env.observation_size, env.action_size,
        preprocess_observations_fn=normalize, **cfg["network_factory"],
    )
    make_inference_fn = ppo_networks.make_inference_fn(networks)
    return jax.jit(make_inference_fn(load_params(run_dir, step), deterministic=deterministic))


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--env", default=config.BASE_ENV)
    ap.add_argument("--out", default="runs/baseline")
    ap.add_argument("--steps", type=int, default=None, help="default: Playground's tuned budget")
    ap.add_argument("--evals", type=int, default=None, help="fewer evals = smaller minimum budget")
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--stock", action="store_true", help="Playground's stock env (no NemesisWrapper)")
    args = ap.parse_args()
    train(args.env, args.out, args.steps, args.evals, args.seed, nemesis=not args.stock)
