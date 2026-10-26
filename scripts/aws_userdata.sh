#!/bin/bash
# EC2 user-data: stop the box after 60 idle minutes (no SSH and no GPU/job processes; see scripts/idle-stop.sh).
cat > /usr/local/bin/idle-stop.sh <<'EOF'
#!/bin/bash
# Stop the box after 60 idle minutes. Idle = no SSH session AND no process holding the GPU.
# (Sampling GPU utilization every 5 min misfired: bursty MJX evaluation can read ~0% for an hour.)
F=/var/run/idle-minutes
gpu_procs=$(nvidia-smi --query-compute-apps=pid --format=csv,noheader 2>/dev/null | grep -c .)
ssh_conns=$(ss -Htn state established '( sport = :22 )' | wc -l)
jobs=$(pgrep -fc "python.*(run_arm|hunt|finetune|nemesis\.train|uvicorn)" || true)
if [ "$ssh_conns" -eq 0 ] && [ "$gpu_procs" -eq 0 ] && [ "${jobs:-0}" -eq 0 ]; then
  n=$(( $(cat "$F" 2>/dev/null || echo 0) + 5 ))
  echo "$n" > "$F"
  if [ "$n" -ge 60 ]; then shutdown -h now; fi
else
  echo 0 > "$F"
fi
EOF
chmod +x /usr/local/bin/idle-stop.sh
echo "*/5 * * * * root /usr/local/bin/idle-stop.sh" > /etc/cron.d/idle-stop
apt-get update -y && apt-get install -y rsync tmux libegl1 libgl1 ffmpeg
