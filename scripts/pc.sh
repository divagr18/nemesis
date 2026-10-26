#!/usr/bin/env bash
# Run project commands on the RTX 4060 PC (ssh alias `pc`, WSL distro Ubuntu-24.04).
#   scripts/pc.sh sync            copy the repo (incl. .env, excl. runs/) and run setup
#   scripts/pc.sh run <cmd...>    run a command in ~/muse inside the project venv
set -uo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DISTRO=Ubuntu-24.04
wsl_bash() { ssh -o BatchMode=yes pc "wsl -d $DISTRO -- bash -c \"$1\"" 2>&1 | tr -d '\000\r' | grep -v -iE 'post-quantum|store now|upgraded'; }

case "${1:-}" in
  sync)
    (cd "$ROOT" && tar --exclude=.git --exclude=runs --exclude=__pycache__ --exclude=.pytest_cache -czf - .) \
      | ssh -o BatchMode=yes pc "wsl -d $DISTRO -- bash -c \"mkdir -p ~/muse && tar -xzf - -C ~/muse\"" 2>/dev/null
    wsl_bash "cd ~/muse && bash scripts/setup_linux.sh 2>&1 | tail -2" ;;
  run)
    shift
    wsl_bash "cd ~/muse && export PATH=\\\$HOME/.venvs/nemesis/bin:\\\$PATH MUJOCO_GL=egl && $*" ;;
  *) echo "usage: $0 sync | run <cmd...>" >&2; exit 2 ;;
esac
