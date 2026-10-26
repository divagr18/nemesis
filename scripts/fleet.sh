#!/usr/bin/env bash
# A fleet of L40S boxes for the main experiment sweep.
#   scripts/fleet.sh launch <n> [region]   launch n g6e.xlarge boxes (records ids in ~/.nemesis_fleet)
#   scripts/fleet.sh ips                    refresh and print "index ip" for every box
#   scripts/fleet.sh setup                  copy repo (+.env, +runs/baseline_v2) and install, in parallel
#   scripts/fleet.sh run <i> <cmd...>       run a detached command in ~/muse on box i
#   scripts/fleet.sh status                 running jobs and last log line per box
#   scripts/fleet.sh fetch                  copy runs/arms back from every box
#   scripts/fleet.sh down                   terminate every box in the fleet
set -uo pipefail
export MSYS_NO_PATHCONV=1
STATE=~/.nemesis_fleet
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SSH=(ssh -o BatchMode=yes -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o LogLevel=ERROR
     -o ConnectTimeout=10 -o ServerAliveInterval=30 -i ~/.ssh/id_ed25519)
REGION=$(head -1 "$STATE" 2>/dev/null | cut -d' ' -f1)

ips() {
  [ -f "$STATE" ] || { echo "no fleet" >&2; exit 1; }
  read -r REGION _ < "$STATE"
  ids=$(tail -n +2 "$STATE" | tr '\n' ' ')
  aws ec2 describe-instances --region "$REGION" --instance-ids $ids \
    --query 'Reservations[].Instances[].[InstanceId,PublicIpAddress,State.Name]' --output text > "$STATE.ips"
  i=0
  for id in $ids; do
    echo "$i $(grep "$id" "$STATE.ips" | awk '{print $2, $3}')"
    i=$((i + 1))
  done
}
ip_of() { ips | awk -v i="$1" '$1 == i {print $2}'; }

case "${1:-}" in
  launch)
    n=$2; region=${3:-us-west-2}
    ami=$(aws ssm get-parameter --region "$region" --name /aws/service/deeplearning/ami/x86_64/base-oss-nvidia-driver-gpu-ubuntu-24.04/latest/ami-id --query Parameter.Value --output text)
    aws ec2 import-key-pair --region "$region" --key-name nemesis --public-key-material "fileb://$(cygpath -m ~/.ssh/id_ed25519.pub)" >/dev/null 2>&1
    vpc=$(aws ec2 describe-vpcs --region "$region" --filters Name=is-default,Values=true --query 'Vpcs[0].VpcId' --output text)
    sg=$(aws ec2 describe-security-groups --region "$region" --filters Name=group-name,Values=nemesis-ssh Name=vpc-id,Values="$vpc" --query 'SecurityGroups[0].GroupId' --output text)
    [ "$sg" = "None" ] && sg=$(aws ec2 create-security-group --region "$region" --group-name nemesis-ssh --description "Nemesis SSH" --vpc-id "$vpc" --query GroupId --output text)
    aws ec2 authorize-security-group-ingress --region "$region" --group-id "$sg" --protocol tcp --port 22 --cidr "$(curl -s https://checkip.amazonaws.com)/32" >/dev/null 2>&1
    echo "$region" > "$STATE"
    got=0
    for sn in $(aws ec2 describe-subnets --region "$region" --filters Name=vpc-id,Values="$vpc" Name=default-for-az,Values=true --query 'Subnets[].SubnetId' --output text); do
      while [ $got -lt "$n" ]; do
        id=$(aws ec2 run-instances --region "$region" --image-id "$ami" --instance-type g6e.xlarge --key-name nemesis \
          --subnet-id "$sn" --security-group-ids "$sg" --instance-initiated-shutdown-behavior terminate \
          --block-device-mappings 'DeviceName=/dev/sda1,Ebs={VolumeSize=150,VolumeType=gp3,DeleteOnTermination=true}' \
          --user-data "fileb://$(cygpath -m "$ROOT/scripts/aws_userdata.sh")" \
          --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=nemesis-fleet},{Key=project,Value=nemesis}]' \
          --query 'Instances[0].InstanceId' --output text 2>/dev/null) || break
        case $id in i-*) echo "$id" >> "$STATE"; got=$((got + 1)); echo "launched $id in $sn";; *) break;; esac
      done
    done
    echo "$got of $n launched in $region" ;;
  ips) ips ;;
  setup)
    ips | while read -r i ip st; do
      [ "$st" = running ] || continue
      (for _ in $(seq 1 30); do "${SSH[@]}" "ubuntu@$ip" true 2>/dev/null && break; sleep 8; done
       (cd "$ROOT" && tar --exclude=.git --exclude=./runs --exclude=__pycache__ --exclude=./.venv-win -czf - .) \
         | "${SSH[@]}" "ubuntu@$ip" 'mkdir -p ~/muse && tar -xzf - -C ~/muse'
       (cd "$ROOT" && tar -czf - runs/baseline_v2/config.json $(ls runs/baseline_v2/ckpts/*.pkl | tail -1)) \
         | "${SSH[@]}" "ubuntu@$ip" 'tar -xzf - -C ~/muse && cloud-init status --wait >/dev/null; cd ~/muse && bash scripts/setup_linux.sh 2>&1 | tail -1' \
         | sed "s/^/[box $i] /") &
    done
    wait ;;
  run)
    i=$2; shift 2
    "${SSH[@]}" "ubuntu@$(ip_of "$i")" "cd ~/muse && (setsid nohup bash -c 'export NEMESIS_PROFILE=aws MUJOCO_GL=egl PATH=\$HOME/.venvs/nemesis/bin:\$PATH; $*' > /dev/null 2>&1 < /dev/null &) && echo started on box $i" ;;
  status)
    ips | while read -r i ip st; do
      [ "$st" = running ] || { echo "[box $i] $st"; continue; }
      echo "[box $i] $("${SSH[@]}" "ubuntu@$ip" 'n=$(ps -eo cmd | grep -c "[r]un_arm.py"); l=$(ls -t ~/muse/runs/arms/*.log 2>/dev/null | head -1); echo "jobs=$n $(basename "$l" 2>/dev/null): $(grep -E "round [0-9] done|Traceback|Error:" "$l" 2>/dev/null | tail -1 | cut -c1-110)"' 2>/dev/null)"
    done ;;
  fetch)
    mkdir -p "$ROOT/runs/arms"
    ips | while read -r i ip st; do
      [ "$st" = running ] || continue
      "${SSH[@]}" "ubuntu@$ip" 'cd ~/muse/runs && tar -czf - arms 2>/dev/null' | tar -xzf - -C "$ROOT/runs" && echo "[box $i] fetched"
    done ;;
  down)
    read -r region _ < "$STATE"
    aws ec2 terminate-instances --region "$region" --instance-ids $(tail -n +2 "$STATE") --query 'TerminatingInstances[].CurrentState.Name' --output text ;;
  *) sed -n '2,9p' "$0"; exit 2 ;;
esac
