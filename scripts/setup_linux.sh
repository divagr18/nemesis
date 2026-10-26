#!/usr/bin/env bash
# One-shot env setup for WSL2 or an AWS GPU box. Run from the repo root.
set -euo pipefail

command -v uv >/dev/null || curl -LsSf https://astral.sh/uv/install.sh | sh
# ffmpeg writes the rendered clips (mediapy); EGL libraries let MuJoCo render headless.
if ! command -v ffmpeg >/dev/null; then
  SUDO=$([ "$(id -u)" = 0 ] && echo "" || echo sudo)
  $SUDO apt-get update -qq && DEBIAN_FRONTEND=noninteractive $SUDO apt-get install -y -qq ffmpeg libegl1 >/dev/null
fi
export PATH="$HOME/.local/bin:$PATH"
# Keep the venv on the Linux filesystem: /mnt/d is slow for site-packages.
export UV_PROJECT_ENVIRONMENT="${UV_PROJECT_ENVIRONMENT:-$HOME/.venvs/nemesis}"
export UV_LINK_MODE=copy

uv sync --frozen --all-extras
"$UV_PROJECT_ENVIRONMENT/bin/python" -c "import jax; print('jax', jax.__version__, jax.devices())"
MUJOCO_GL=egl "$UV_PROJECT_ENVIRONMENT/bin/python" -m pytest -q
