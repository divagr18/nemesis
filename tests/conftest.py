import os
from pathlib import Path

import jax

# Reuse compiled XLA programs across test runs (compilation dominates test time).
jax.config.update("jax_compilation_cache_dir", os.environ.get(
    "NEMESIS_JAX_CACHE", str(Path.home() / ".cache" / "nemesis_jax")))
jax.config.update("jax_persistent_cache_min_compile_time_secs", 1.0)
