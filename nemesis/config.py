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
# Muse Glimmer (open weights, Apache 2.0) served on our own GPU by llama.cpp:
#   meta-models/Muse-Glimmer-30B-GGUF:Q4_K_M (16.8 GB, fits a 24 GB L4)
GLIMMER = "glimmer"
GLIMMER_URL = os.environ.get("NEMESIS_GLIMMER_URL", "http://localhost:8080/v1")
# Muse Spark Open (open weights, Muse Model License; 816B MoE, 42B active, text/image/video/audio in).
# Smallest community GGUF (unsloth UD-IQ1_S) needs ~180 GB of RAM+VRAM, so it runs on its own box.
SPARK_OPEN = "spark-open"
SPARK_OPEN_URL = os.environ.get("NEMESIS_SPARK_OPEN_URL")

# NEMESIS_OPEN=1: no Meta API at all. Text roles go to Glimmer; vision goes to Spark Open when a
# server is configured, else to Glimmer itself (its llama.cpp server loads the vision projector).
OPEN = os.environ.get("NEMESIS_OPEN") == "1"
LOCAL_MODELS = {GLIMMER: GLIMMER_URL, SPARK_OPEN: SPARK_OPEN_URL}


def text_model() -> str:
    """Adversary, attack translation, report writing."""
    return GLIMMER if OPEN else WONDER


def vision_model() -> str:
    """Watching failure clips, reading photos."""
    if not OPEN:
        return SPARK
    return SPARK_OPEN if SPARK_OPEN_URL else GLIMMER

BASE_ENV = "Go1JoystickFlatTerrain"
# Playground's Go1 default is "warp"; pinned to "jax" until benchmarked (PLAN 1.2).
SIM_IMPL = os.environ.get("NEMESIS_IMPL", "jax")
THETA_LAYOUT_VERSION = 3  # 2: terrain slots (stairs_*) appended for Go1, Oct 27; 3: course slots (ramp, descent, ice2), Oct 28


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
