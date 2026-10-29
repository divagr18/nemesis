#!/usr/bin/env bash
# Uptime watchdog for the public service (run every 3 min by nemesis-watchdog.timer, as root).
#
# Restarts `nemesis` only when systemd thinks it is running but it has stopped answering: FAILS checks in
# a row that got a refused or reset connection, or a 5xx. A slow answer (a busy GPU, a long retrain) is
# never a failure, so the timeout is generous and a timeout resets the count. It leaves the service alone
# while it starts up (the simulator compiles for minutes), when it is stopped on purpose (systemd's
# Restart=always already handles crashes), and within an hour of its own last restart.
# Everything it does goes to the journal: journalctl -u nemesis-watchdog
set -u
URL=${NEMESIS_WATCHDOG_URL:-http://localhost:8000/api/limits}
FAILS=${NEMESIS_WATCHDOG_FAILS:-3}
TIMEOUT=${NEMESIS_WATCHDOG_TIMEOUT:-90}
GRACE=${NEMESIS_WATCHDOG_GRACE:-600}      # seconds after the service (re)started
COOLDOWN=${NEMESIS_WATCHDOG_COOLDOWN:-3600}  # at most one restart per hour
DIR=/var/lib/nemesis-watchdog
mkdir -p "$DIR"
count=$(cat "$DIR/fails" 2>/dev/null || echo 0)
now=$(date +%s)

state=$(systemctl is-active nemesis)
if [ "$state" != active ]; then
  echo "nemesis is $state: left to systemd"
  echo 0 > "$DIR/fails"; exit 0
fi
started=$(date -d "$(systemctl show nemesis -p ActiveEnterTimestamp --value)" +%s 2>/dev/null || echo 0)
if [ $((now - started)) -lt "$GRACE" ]; then
  exit 0  # still starting up
fi

code=$(curl -s -o /dev/null -w '%{http_code}' --max-time "$TIMEOUT" "$URL"); rc=$?
case "$rc" in
  0) if [ "$code" -ge 500 ]; then why="HTTP $code"; else why=""; fi ;;
  7|52|56) why="connection failed (curl $rc)" ;;
  28) echo "slow: no answer within ${TIMEOUT}s (busy, not counted)"; echo 0 > "$DIR/fails"; exit 0 ;;
  *) why="curl error $rc" ;;
esac

if [ -z "$why" ]; then
  [ "$count" -gt 0 ] && echo "healthy again (HTTP $code) after $count failed check(s)"
  echo 0 > "$DIR/fails"; exit 0
fi
count=$((count + 1))
echo "$count" > "$DIR/fails"
echo "check failed ($count of $FAILS): $why"
[ "$count" -lt "$FAILS" ] && exit 0

last=$(cat "$DIR/last_restart" 2>/dev/null || echo 0)
if [ $((now - last)) -lt "$COOLDOWN" ]; then
  echo "would restart, but the last restart was $(((now - last) / 60)) min ago; waiting"
  exit 0
fi
if [ -n "${DRY_RUN:-}" ]; then
  echo "DRY_RUN: would restart nemesis now"; exit 0
fi
echo "restarting nemesis after $count failed checks"
echo "$now" > "$DIR/last_restart"
echo 0 > "$DIR/fails"
systemctl restart nemesis
