#!/usr/bin/env bash
# Run the public Nemesis service on a GPU box (or the PC): the server keeps ~30% of GPU memory
# for simulation and rendering; patch workers get the rest for PPO.
#   bash scripts/serve.sh [port]
cd "$(dirname "$0")/.."
export PATH="$HOME/.venvs/nemesis/bin:$PATH" MUJOCO_GL=egl
export XLA_PYTHON_CLIENT_MEM_FRACTION="${XLA_PYTHON_CLIENT_MEM_FRACTION:-0.3}"
export NEMESIS_PATCH_MEM_FRACTION="${NEMESIS_PATCH_MEM_FRACTION:-0.6}"
export NEMESIS_POLICY="${NEMESIS_POLICY:-runs/baseline_v2}"
export NEMESIS_REFERENCE="${NEMESIS_REFERENCE:-runs/arms_final/dr_s1/round_2}"
export NEMESIS_SERVE_DIR="${NEMESIS_SERVE_DIR:-runs/serve}"
exec uvicorn server.app:app --host 0.0.0.0 --port "${1:-8000}" --timeout-keep-alive 75
