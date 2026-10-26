#!/bin/bash
# EC2 user-data: stop the box after 60 idle minutes (no SSH connections and GPU under 5%).
cat > /usr/local/bin/idle-stop.sh <<'EOF'
#!/bin/bash
F=/var/run/idle-minutes
util=$(nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits | sort -n | tail -1)
ssh_conns=$(ss -Htn state established '( sport = :22 )' | wc -l)
if [ "$ssh_conns" -eq 0 ] && [ "${util:-0}" -lt 5 ]; then
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
