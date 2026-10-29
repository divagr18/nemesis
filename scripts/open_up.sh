#!/usr/bin/env bash
# Fully open-weight Nemesis on one GPU box, with no Meta API key.
#   scripts/open_up.sh                     Glimmer (text + vision) in llama.cpp, then the server on :8000
#   SPARK_OPEN=1 scripts/open_up.sh        also Muse Spark Open for vision (~200 GB RAM + a GPU)
#   NEMESIS_SPARK_OPEN_URL=http://host:8081/v1 scripts/open_up.sh   use a Spark Open server elsewhere
# Needs Docker with the NVIDIA runtime and the project venv (scripts/setup_linux.sh).
set -euo pipefail
cd "$(dirname "$0")/.."

profiles=()
if [ "${SPARK_OPEN:-0}" = 1 ]; then
  profiles=(--profile spark-open)
  export NEMESIS_SPARK_OPEN_URL="${NEMESIS_SPARK_OPEN_URL:-http://localhost:8081/v1}"
fi
mkdir -p "$HOME/.cache/huggingface"
docker compose -f docker-compose.open.yml "${profiles[@]}" up -d

wait_for() {  # first start downloads the weights: ~18 GB for Glimmer, ~200 GB for Spark Open
  echo "waiting for $1 ..."
  until curl -sf "$1/health" >/dev/null; do sleep 10; done
}
wait_for http://localhost:8080
[ "${SPARK_OPEN:-0}" = 1 ] && wait_for http://localhost:8081

export NEMESIS_OPEN=1 NEMESIS_GLIMMER_URL=http://localhost:8080/v1
# An empty key (load_dotenv will not override it) makes any stray Meta API call fail loudly.
export MODEL_API_KEY=
# llama.cpp holds ~18 GB of the GPU, so JAX allocates on demand instead of grabbing 75% up front.
export XLA_PYTHON_CLIENT_PREALLOCATE=false MUJOCO_GL=egl
exec "${VENV:-$HOME/.venvs/nemesis}/bin/uvicorn" server.app:app --host 0.0.0.0 --port "${PORT:-8000}"
