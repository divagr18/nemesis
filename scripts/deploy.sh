#!/usr/bin/env bash
# Deploy the public Nemesis page on its own always-on GPU box (default: g4dn.xlarge, one T4, us-east-1):
# fixed Elastic IP, HTTPS via Caddy (Let's Encrypt) on <ip>.sslip.io (or $NEMESIS_DOMAIN once a DNS
# record points at the IP), systemd services that restart on failure and survive reboots.
# No idle auto-stop on this box: it serves visitors.
#   scripts/deploy.sh up       start (or launch) the box, attach the Elastic IP, install everything
#   scripts/deploy.sh update   push code (and web/dist) and restart the service
#   scripts/deploy.sh ops      install the uptime watchdog and the one-off Nov 17 stop timer (scripts/ops)
#   scripts/deploy.sh logs     tail the service log
#   scripts/deploy.sh ssh      print the ssh command
#   scripts/deploy.sh down     stop the box (never terminates)
set -uo pipefail
export MSYS_NO_PATHCONV=1
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STATE=~/.nemesis_web        # "region instance-id"
EIP_STATE=~/.nemesis_web_eip  # "allocation-id ip"
REGION=${NEMESIS_REGION:-us-east-1}
TYPE=${NEMESIS_TYPE:-g4dn.xlarge}
SSH=(ssh -o BatchMode=yes -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o LogLevel=ERROR
     -o ConnectTimeout=15 -o ServerAliveInterval=30 -i ~/.ssh/id_ed25519)
# Policies the service needs: v1 (the original robot), the reference (toughest) policy, the humanoid.
RUNS=(runs/baseline_v2 runs/arms_final/dr_s1/round_2 runs/g1_baseline)
# The served lineage (versions, attack log, clips, duels). versions.json stores dirs under this path.
SERVE_DIR=${NEMESIS_SERVE_DIR:-runs/serve_dev}

[ -f "$STATE" ] && read -r REGION ID < "$STATE"

sg() {  # the web security group: 80/443 for everyone, 22 for this machine's current IP
  local vpc g
  vpc=$(aws ec2 describe-vpcs --region "$REGION" --filters Name=is-default,Values=true --query 'Vpcs[0].VpcId' --output text)
  g=$(aws ec2 describe-security-groups --region "$REGION" --filters Name=group-name,Values=nemesis-web Name=vpc-id,Values="$vpc" \
    --query 'SecurityGroups[0].GroupId' --output text)
  if [ "$g" = "None" ]; then
    g=$(aws ec2 create-security-group --region "$REGION" --group-name nemesis-web --description "Nemesis public page" \
      --vpc-id "$vpc" --query GroupId --output text)
    for port in 80 443; do
      aws ec2 authorize-security-group-ingress --region "$REGION" --group-id "$g" --protocol tcp --port "$port" --cidr 0.0.0.0/0 >/dev/null
    done
  fi
  aws ec2 authorize-security-group-ingress --region "$REGION" --group-id "$g" --protocol tcp --port 22 \
    --cidr "$(curl -s -m 10 https://checkip.amazonaws.com)/32" >/dev/null 2>&1
  echo "$g"
}

launch() {
  local ami g ud
  ami=$(aws ssm get-parameter --region "$REGION" --name /aws/service/deeplearning/ami/x86_64/base-oss-nvidia-driver-gpu-ubuntu-24.04/latest/ami-id \
    --query Parameter.Value --output text) || return 1
  aws ec2 import-key-pair --region "$REGION" --key-name nemesis \
    --public-key-material "fileb://$(cygpath -m ~/.ssh/id_ed25519.pub 2>/dev/null || echo ~/.ssh/id_ed25519.pub)" >/dev/null 2>&1
  g=$(sg)
  ud=$(mktemp)
  printf '#!/bin/bash\napt-get update -y && apt-get install -y rsync tmux libegl1 libgl1 ffmpeg\n' > "$ud"
  ID=$(aws ec2 run-instances --region "$REGION" --image-id "$ami" --instance-type "$TYPE" --key-name nemesis \
    --security-group-ids "$g" --instance-initiated-shutdown-behavior stop \
    --block-device-mappings 'DeviceName=/dev/sda1,Ebs={VolumeSize=100,VolumeType=gp3,DeleteOnTermination=true}' \
    --user-data "fileb://$(cygpath -m "$ud" 2>/dev/null || echo "$ud")" \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=nemesis-web},{Key=project,Value=nemesis}]' \
      'ResourceType=volume,Tags=[{Key=project,Value=nemesis}]' \
    --query 'Instances[0].InstanceId' --output text) || return 1
  rm -f "$ud"
  echo "$REGION $ID" > "$STATE"
  echo "launched $TYPE in $REGION: $ID"
}

start() {
  if [ -z "${ID:-}" ]; then launch || exit 1
  else sg >/dev/null; aws ec2 start-instances --region "$REGION" --instance-ids "$ID" >/dev/null || exit 1; fi
  aws ec2 wait instance-running --region "$REGION" --instance-ids "$ID"
}

eip() {  # allocate once, associate with the box, print the IP
  if [ ! -f "$EIP_STATE" ]; then
    aws ec2 allocate-address --region "$REGION" --domain vpc \
      --tag-specifications 'ResourceType=elastic-ip,Tags=[{Key=project,Value=nemesis}]' \
      --query '[AllocationId,PublicIp]' --output text > "$EIP_STATE"
  fi
  read -r ALLOC IP < "$EIP_STATE"
  aws ec2 associate-address --region "$REGION" --instance-id "$ID" --allocation-id "$ALLOC" >/dev/null
  echo "$IP"
}

push_code() {  # $1 ip
  (cd "$ROOT" && tar --exclude=.git --exclude=./runs --exclude=__pycache__ --exclude=.pytest_cache \
    --exclude='.venv*' --exclude=node_modules -czf - .) | "${SSH[@]}" "ubuntu@$1" 'mkdir -p ~/muse && tar -xzf - -C ~/muse'
}

push_runs() {  # $1 ip; local runs/ live on the PC, so stream them from there
  for r in "${RUNS[@]}"; do
    ssh -o BatchMode=yes pc "wsl -d Ubuntu-24.04 -- bash -c \"cd ~/muse && tar -czf - $r/config.json \\\$(ls -d $r/ckpts/* | tail -1)\"" 2>/dev/null \
      | "${SSH[@]}" "ubuntu@$1" 'mkdir -p ~/muse && cd ~/muse && tar -xzf -'
  done
}

push_state() {  # $1 ip; copy the PC's served lineage to the box (when missing on the box, or STATE_COPY=1)
  ssh -o BatchMode=yes pc "wsl -d Ubuntu-24.04 -- bash -c \"cd ~/muse && tar -czf - --exclude=server.log $SERVE_DIR\"" 2>/dev/null     | "${SSH[@]}" "ubuntu@$1" 'cd ~/muse && tar -xzf -'
}

install() {  # $1 ip  $2 hostname
  "${SSH[@]}" "ubuntu@$1" "HOST='$2' SERVE_DIR=$SERVE_DIR bash -s" <<'EOF'
set -e
cd ~/muse
cloud-init status --wait >/dev/null 2>&1 || true
SKIP_TESTS=1 bash scripts/setup_linux.sh 2>&1 | tail -1
if ! command -v caddy >/dev/null; then
  sudo apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl >/dev/null
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor --yes -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list >/dev/null
  sudo apt-get update -y >/dev/null && sudo apt-get install -y caddy >/dev/null
fi
# HTTP-01 only: TLS-ALPN cannot pass through a proxy in front of the box.
printf '%s {\n  tls {\n    issuer acme {\n      disable_tlsalpn_challenge\n    }\n  }\n  encode gzip\n  reverse_proxy localhost:8000 {\n    flush_interval -1\n  }\n}\n' "$HOST" | sudo tee /etc/caddy/Caddyfile >/dev/null
sudo tee /etc/systemd/system/nemesis.service >/dev/null <<UNIT
[Unit]
Description=Nemesis public service
After=network-online.target
[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/muse
Environment=NEMESIS_PROFILE=aws
Environment=NEMESIS_SERVE_DIR=$SERVE_DIR
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

ops() {  # $1 ip; the uptime watchdog and the Nov 17 stop timer (scripts/ops). Never restarts nemesis itself.
  (cd "$ROOT/scripts/ops" && tar -czf - .) | "${SSH[@]}" "ubuntu@$1" 'set -e; d=$(mktemp -d); tar -xzf - -C "$d"
    sudo install -m 755 "$d/nemesis-watchdog.sh" /usr/local/bin/nemesis-watchdog.sh
    sudo install -m 644 "$d"/nemesis-*.service "$d"/nemesis-*.timer /etc/systemd/system/
    rm -rf "$d"
    sudo systemctl daemon-reload
    sudo systemctl enable --now nemesis-watchdog.timer nemesis-autostop.timer
    systemctl list-timers --no-pager "nemesis-*"'
}

ip() { read -r _ IP < "$EIP_STATE"; echo "$IP"; }

case "${1:-}" in
  up)
    start
    IP=$(eip)
    # The domain (A record -> the Elastic IP, DNS only) plus an sslip.io fallback.
    HOST="${NEMESIS_DOMAIN:-nemesis.divagr.com}, ${IP//./-}.sslip.io"
    for _ in $(seq 1 40); do "${SSH[@]}" "ubuntu@$IP" true 2>/dev/null && break; sleep 5; done
    push_code "$IP" && push_runs "$IP" || exit 1
    "${SSH[@]}" "ubuntu@$IP" "test -d ~/muse/$SERVE_DIR" && [ -z "${STATE_COPY:-}" ] || push_state "$IP"
    install "$IP" "$HOST"
    echo "live at https://${HOST%%,*} (first request compiles for a minute or two)" ;;
  update)
    IP=$(ip); sg >/dev/null
    push_code "$IP" && "${SSH[@]}" "ubuntu@$IP" 'sudo systemctl restart nemesis' && echo "updated" ;;
  ops)
    ops "$(ip)" ;;
  logs)
    "${SSH[@]}" "ubuntu@$(ip)" 'journalctl -u nemesis -n 80 --no-pager' ;;
  ssh)
    echo "${SSH[*]} ubuntu@$(ip)" ;;
  down)
    aws ec2 stop-instances --region "$REGION" --instance-ids "$ID" --query 'StoppingInstances[0].CurrentState.Name' --output text ;;
  *) echo "usage: $0 up | update | ops | logs | ssh | down" >&2; exit 2 ;;
esac
