#!/usr/bin/env bash
# Deploy the public Nemesis page on the L40S box: fixed Elastic IP, HTTPS via Caddy (Let's Encrypt)
# on <ip>.sslip.io (or $NEMESIS_DOMAIN if you point a domain at the IP), systemd services that
# restart on failure and survive reboots.
#   scripts/deploy.sh up       start the box, attach the Elastic IP, open 80/443, install everything
#   scripts/deploy.sh update   push code (and web/) and restart the service
#   scripts/deploy.sh logs     tail the service log
set -uo pipefail
export MSYS_NO_PATHCONV=1
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
EIP_STATE=~/.nemesis_eip
SSH=(ssh -o BatchMode=yes -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o LogLevel=ERROR
     -o ConnectTimeout=15 -i ~/.ssh/id_ed25519)
# Policies the service needs: v1 (the original robot) and the reference (toughest) policy.
RUNS=(runs/baseline_v2 runs/arms_final/dr_s1/round_2)

box() { read -r REGION ID < ~/.nemesis_box; }

eip() {  # allocate once, associate with the box, print the IP
  box
  if [ ! -f "$EIP_STATE" ]; then
    aws ec2 allocate-address --region "$REGION" --domain vpc \
      --tag-specifications 'ResourceType=elastic-ip,Tags=[{Key=project,Value=nemesis}]' \
      --query '[AllocationId,PublicIp]' --output text > "$EIP_STATE"
  fi
  read -r ALLOC IP < "$EIP_STATE"
  aws ec2 associate-address --region "$REGION" --instance-id "$ID" --allocation-id "$ALLOC" >/dev/null
  echo "$IP"
}

open_web() {
  box
  local sg
  sg=$(aws ec2 describe-instances --region "$REGION" --instance-ids "$ID" \
    --query 'Reservations[0].Instances[0].SecurityGroups[0].GroupId' --output text)
  for port in 80 443; do
    aws ec2 authorize-security-group-ingress --region "$REGION" --group-id "$sg" --protocol tcp \
      --port "$port" --cidr 0.0.0.0/0 >/dev/null 2>&1
  done
}

push_code() {  # $1 ip
  (cd "$ROOT" && tar --exclude=.git --exclude=runs --exclude=__pycache__ --exclude=.pytest_cache \
    --exclude='.venv*' -czf - .) | "${SSH[@]}" "ubuntu@$1" 'mkdir -p ~/muse && tar -xzf - -C ~/muse'
}

push_runs() {  # $1 ip; local runs/ live on the PC, so stream them from there
  for r in "${RUNS[@]}"; do
    ssh -o BatchMode=yes pc "wsl -d Ubuntu-24.04 -- bash -c \"cd ~/muse && tar -czf - $r/config.json \\\$(ls -d $r/ckpts/* | tail -1)\"" 2>/dev/null \
      | "${SSH[@]}" "ubuntu@$1" 'cd ~/muse && tar -xzf -'
  done
}

install() {  # $1 ip  $2 hostname
  "${SSH[@]}" "ubuntu@$1" "HOST=$2 bash -s" <<'EOF'
set -e
cd ~/muse
cloud-init status --wait >/dev/null 2>&1 || true
bash scripts/setup_linux.sh 2>&1 | tail -1
if ! command -v caddy >/dev/null; then
  sudo apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl >/dev/null
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor --yes -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list >/dev/null
  sudo apt-get update -y >/dev/null && sudo apt-get install -y caddy >/dev/null
fi
printf '%s {\n  encode gzip\n  reverse_proxy localhost:8000 {\n    flush_interval -1\n  }\n}\n' "$HOST" | sudo tee /etc/caddy/Caddyfile >/dev/null
sudo tee /etc/systemd/system/nemesis.service >/dev/null <<UNIT
[Unit]
Description=Nemesis attack service
After=network-online.target
[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/muse
Environment=NEMESIS_PROFILE=aws
ExecStart=/bin/bash scripts/serve.sh 8000
Restart=always
RestartSec=5
[Install]
WantedBy=multi-user.target
UNIT
sudo systemctl daemon-reload
sudo systemctl enable --now nemesis caddy
sudo systemctl restart nemesis caddy
EOF
}

case "${1:-}" in
  up)
    bash "$ROOT/scripts/box.sh" up || exit 1
    IP=$(eip)
    HOST=${NEMESIS_DOMAIN:-${IP//./-}.sslip.io}
    open_web
    for _ in $(seq 1 30); do "${SSH[@]}" "ubuntu@$IP" true 2>/dev/null && break; sleep 5; done
    push_code "$IP" && push_runs "$IP" && install "$IP" "$HOST"
    echo "live at https://$HOST (first request compiles for ~1-2 min)" ;;
  update)
    read -r _ IP < "$EIP_STATE"
    push_code "$IP" && "${SSH[@]}" "ubuntu@$IP" 'sudo systemctl restart nemesis' && echo "updated" ;;
  logs)
    read -r _ IP < "$EIP_STATE"
    "${SSH[@]}" "ubuntu@$IP" 'journalctl -u nemesis -n 80 --no-pager' ;;
  *) echo "usage: $0 up | update | logs" >&2; exit 2 ;;
esac
