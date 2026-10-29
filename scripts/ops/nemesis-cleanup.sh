#!/usr/bin/env bash
# Daily disk cleanup for the public box (run by nemesis-cleanup.timer, as ubuntu).
#
# Deletes only scratch files nothing public points at:
#   <serve>/voice/*.wav          older than 2 days   (uploaded voice attacks, already transcribed)
#   <serve>/media/*_sam.jpg      older than 2 days   (downscaled copies made for SAM; rebuilt on demand)
#   <serve>/patch_inputs/*       older than 7 days   (per-retrain theta files the worker already read)
#   runs/llm_cache/*.json        older than 14 days  (LLM response cache)
# Never touches clips/, versions/, attacks.jsonl, duels/, briefs/, moderation/, spend.jsonl, share/,
# showcase/, reports/, or original media photos: public pages link to them.
#
# DRY_RUN=1 lists what would go and deletes nothing. Everything goes to the journal:
#   journalctl -u nemesis-cleanup
set -uo pipefail
MUSE=${NEMESIS_HOME:-/home/ubuntu/muse}
SERVE="$MUSE/${NEMESIS_SERVE_DIR:-runs/serve_dev}"
CACHE="$MUSE/runs/llm_cache"
DRY=${DRY_RUN:-}
[ -n "$DRY" ] && echo "DRY_RUN: nothing will be deleted"

total_n=0; total_b=0
# sweep <dir> <age in minutes> <find tests...>: top-level entries of <dir> older than the age.
sweep() {
  local dir=$1 mins=$2; shift 2
  if [ ! -d "$dir" ] || [ -L "$dir" ]; then echo "$dir: not there, skipped"; return; fi
  local n=0 b=0 p s
  while IFS= read -r -d '' p; do
    s=$(du -sb -- "$p" 2>/dev/null | cut -f1); s=${s:-0}
    if [ -n "$DRY" ]; then
      echo "would delete $p ($s bytes)"
    elif rm -rf -- "$p"; then
      echo "deleted $p ($s bytes)"
    else
      echo "FAILED to delete $p"; continue
    fi
    n=$((n + 1)); b=$((b + s))
  done < <(find "$dir" -mindepth 1 -maxdepth 1 "$@" -mmin "+$mins" -print0)
  echo "$dir: $n entr$([ $n = 1 ] && echo y || echo ies), $((b / 1024)) KiB"
  total_n=$((total_n + n)); total_b=$((total_b + b))
}

sweep "$SERVE/voice"        $((2 * 1440))  -type f -name '*.wav'
sweep "$SERVE/media"        $((2 * 1440))  -type f -name '*_sam.jpg'
sweep "$SERVE/patch_inputs" $((7 * 1440))  \( -type f -o -type d \)
sweep "$CACHE"              $((14 * 1440)) -type f -name '*.json'

echo "$([ -n "$DRY" ] && echo 'would free' || echo 'freed') $((total_b / 1024 / 1024)) MiB in $total_n entries"
df -h / | tail -1
