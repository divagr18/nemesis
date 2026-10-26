#!/usr/bin/env bash
# Run a command inside the project venv from Windows: wsl.exe -d <distro> -- bash scripts/wsl_run.sh <cmd...>
cd "$(dirname "$0")/.."
export PATH="$HOME/.venvs/nemesis/bin:$HOME/.local/bin:/usr/bin:/bin" MUJOCO_GL=egl
exec "$@"
