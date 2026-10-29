#!/usr/bin/env bash
# Nemesis on open weights only, on one fresh 24 GB GPU box: Muse Glimmer 30B in llama.cpp, the Nemesis
# server with NEMESIS_OPEN=1, and no Meta API key anywhere. Verified Oct 30 on a g6.xlarge (L4 24 GB),
# Deep Learning Base OSS Nvidia AMI (Ubuntu 24.04, Docker with the NVIDIA runtime).
#
#   scripts/open_weight_demo.sh setup      once, off camera (~15 min): Python env, faster-whisper, llama.cpp's
#                                          CUDA server image and Glimmer's weights (16.8 GB + vision projector)
#   scripts/open_weight_demo.sh up         Glimmer, then the server (background), waits until the sim is compiled
#   scripts/open_weight_demo.sh attack "A gust shoves it sideways while it crosses black ice"
#                                          the terminal shot: one typed attack, every step streamed
#   scripts/open_weight_demo.sh retrain <attack id>
#                                          PPO retrain on that attack: gate, Glimmer's "what it learned", changelog
#   scripts/open_weight_demo.sh down       stop both
#
# Copy the Go1 policy to runs/baseline_v2 first (not in git). The site is on 127.0.0.1:8000; to see it,
# ssh -L 8000:localhost:8000 <box>. Logs: runs/open_demo/.
set -euo pipefail
cd "$(dirname "$0")/.."

VENV=${VENV:-$HOME/.venvs/nemesis}
B=http://127.0.0.1:${PORT:-8000}
LOGS=runs/open_demo
COMPOSE=(docker compose -f docker-compose.open.yml)
mkdir -p "$LOGS"

wait_for() {  # url, what, tries (5 s apart)
  printf 'waiting for %s ' "$2"
  for _ in $(seq 1 "$3"); do curl -sf "$1" >/dev/null && { echo ok; return 0; }; printf .; sleep 5; done
  echo " gave up (see $LOGS/)"; return 1
}

glimmer_up() {
  mkdir -p "$HOME/.cache/huggingface"
  "${COMPOSE[@]}" up -d glimmer
  wait_for http://127.0.0.1:8080/health "Muse Glimmer (first start downloads ~18 GB)" 360
}

follow() {  # job id: print its events as they arrive, until it ends; the last event goes to $LOGS/last.json
  local t0=$SECONDS line e stage
  curl -sN "$B/api/jobs/$1/events" | while IFS= read -r line; do
    [[ $line == data:* ]] || continue
    e=${line#data: }
    stage=$(jq -r .stage <<<"$e")
    printf '[%4ds] ' $((SECONDS - t0))
    case $stage in
      step) jq -r .step <<<"$e" ;;
      progress) jq -r '"training: \(.step / 1e6 | floor)M of \(.total / 1e6 | floor)M steps"' <<<"$e" ;;
      attempt) jq -r '"attempt \(.n) (\(.label)): falls on \(.falls * 100 | round)% of seeds, walks normally: \(.walks)"' <<<"$e" ;;
      learned) jq -r '"Glimmer watched the replay: \(.sentence)"' <<<"$e" ;;
      done) jq -c 'del(.t, .trajs, .clip, .result)' <<<"$e" | cut -c1-300 ;;
      *) jq -c 'del(.t, .trajs, .clip, .timelapse)' <<<"$e" | cut -c1-300 ;;
    esac
    if [[ $stage == done || $stage == failed || $stage == error ]]; then echo "$e" >"$LOGS/last.json"; break; fi
  done
}

case "${1:-}" in
setup)
  SKIP_TESTS=1 bash scripts/setup_linux.sh
  export PATH="$HOME/.local/bin:$PATH"
  uv pip install --python "$VENV/bin/python" faster-whisper  # spoken attacks (Meta has no open speech model)
  [ -f runs/baseline_v2/config.json ] || echo "!! copy the Go1 policy to runs/baseline_v2 before 'up'"
  glimmer_up
  ;;
up)
  glimmer_up
  if ! curl -sf "$B/api/versions" >/dev/null; then
    # An empty key (load_dotenv won't fill it from a .env) and an unreachable API URL: a stray Meta API
    # call would fail loudly instead of going out.
    env MODEL_API_KEY= NEMESIS_OPEN=1 NEMESIS_GLIMMER_URL=http://127.0.0.1:8080/v1 MODEL_API_BASE_URL=http://127.0.0.1:9/v1 \
      NEMESIS_SERVE_DIR="${NEMESIS_SERVE_DIR:-runs/serve_open}" NEMESIS_POLICY="${NEMESIS_POLICY:-runs/baseline_v2}" \
      XLA_PYTHON_CLIENT_PREALLOCATE=false MUJOCO_GL=egl \
      setsid nohup "$VENV/bin/uvicorn" server.app:app --host 127.0.0.1 --port "${PORT:-8000}" \
      >"$LOGS/server.log" 2>&1 </dev/null &
    echo $! >"$LOGS/server.pid"
  fi
  wait_for "$B/api/versions" "the Nemesis server" 60
  printf 'compiling the simulator (~2 min the first time) '
  curl -sf -m 900 "$B/api/preview" >/dev/null && echo ok
  nvidia-smi --query-gpu=name,memory.used,memory.total --format=csv,noheader
  ;;
attack)
  [ -n "${2:-}" ] || { echo "usage: $0 attack \"<situation>\""; exit 2; }
  pid=$(cat "$LOGS/server.pid" 2>/dev/null || pgrep -f "uvicorn server.app" | head -1)
  echo "server env: $(tr '\0' '\n' </proc/"$pid"/environ | grep -E '^(NEMESIS_OPEN|MODEL_API_KEY)=' | sed 's/=$/= (empty)/' | tr '\n' ' ')"
  echo "models served: $(curl -s http://127.0.0.1:8080/v1/models | jq -r '[.data[].id] | join(", ")') (llama.cpp, this GPU)"
  job=$(curl -sf "$B/api/attack?stream=1" -H 'content-type: application/json' \
    -d "$(jq -n --arg t "$2" '{text: $t}')" | jq -r .job)
  follow "$job"
  jq -r '.result // empty | "\nGlimmer wrote: \(.program.name): \([.program.ops[].op] | join(", "))",
    "Original robot fell on \(.fall_rate_baseline * 100 | round)% of seeds; live \(.version): \(.fall_rate_trained * 100 | round)%",
    if .broke_trained then "Retrain on it: \($me) retrain \(.id)" else "It held." end' --arg me "$0" "$LOGS/last.json"
  ;;
retrain)
  [ -n "${2:-}" ] || { echo "usage: $0 retrain <attack id>"; exit 2; }
  out=$(curl -s "$B/api/patch" -H 'content-type: application/json' -d "$(jq -n --arg a "$2" '{attack_id: $a}')")
  job=$(jq -r '.job // empty' <<<"$out")
  [ -n "$job" ] || { echo "$out"; exit 1; }
  follow "$job"
  version=$(jq -r '.version // empty' "$LOGS/last.json")
  if [ "$(jq -r .accepted "$LOGS/last.json")" = true ]; then
    printf 'retesting every past attack on %s; Glimmer writes the changelog ' "$version"
    for _ in $(seq 1 60); do
      note=$(curl -s "$B/api/versions" | jq -c --arg v "$version" '.versions[]? | select(.name == $v) | .changelog // empty')
      [ -n "$note" ] && { echo; jq -r '"learned:    \(.learned)\nstill can'"'"'t: \(.still_cant)"' <<<"$note"; break; }
      printf .; sleep 5
    done
  fi
  ;;
down)
  [ -f "$LOGS/server.pid" ] && kill "$(cat "$LOGS/server.pid")" 2>/dev/null || true
  rm -f "$LOGS/server.pid"
  "${COMPOSE[@]}" stop glimmer
  ;;
*)
  sed -n '2,17p' "$0" | sed 's/^# \{0,1\}//'
  exit 2
  ;;
esac
