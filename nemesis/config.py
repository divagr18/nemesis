"""Run profiles and shared constants."""

import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()

# Reuse compiled XLA programs across runs (training compiles take ~2 min otherwise).
import jax  # noqa: E402

jax.config.update("jax_compilation_cache_dir", os.environ.get(
    "NEMESIS_JAX_CACHE", os.path.expanduser("~/.cache/nemesis_jax")))
jax.config.update("jax_persistent_cache_min_compile_time_secs", 1.0)

META_BASE_URL = os.environ.get("MODEL_API_BASE_URL", "https://api.meta.ai/v1")
WONDER = "muse-wonder-1.0"
SPARK = "muse-spark-1.3"
SPARK_CHEAP = "muse-spark-1.3-contributor"
SPARK_AUDIO = "muse-spark-1.2"
TRANSCRIBE = "muse-voice-transcribe-1.0"
SAM = "sam-3.1"

BASE_ENV = "Go1JoystickFlatTerrain"
# Playground's Go1 default is "warp"; pinned to "jax" until benchmarked (PLAN 1.2).
SIM_IMPL = os.environ.get("NEMESIS_IMPL", "jax")
THETA_LAYOUT_VERSION = 1


@dataclass(frozen=True)
class Profile:
    name: str
    num_envs: int
    eval_envs: int


PROFILES = {
    "local": Profile("local", num_envs=1024, eval_envs=256),  # RTX 3050 4GB / 4060 8GB
    "aws": Profile("aws", num_envs=8192, eval_envs=2048),  # L40S 48GB
}


def profile() -> Profile:
    return PROFILES[os.environ.get("NEMESIS_PROFILE", "local")]


def api_key() -> str:
    key = os.environ.get("MODEL_API_KEY")
    if not key:
        raise RuntimeError("MODEL_API_KEY is not set (see .env.example)")
    return key
