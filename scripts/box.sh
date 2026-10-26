#!/usr/bin/env bash
# Get an L40S dev box under the `nemesis` SSH alias, wherever there is capacity.
#   scripts/box.sh up     start the known box, else launch a fresh one in the first region with capacity
#   scripts/box.sh sync   copy the repo (incl. .env) to ~/muse on the box and run setup
#   scripts/box.sh down   stop the current box
# State (region + instance id) lives in ~/.nemesis_box.
set -uo pipefail
export MSYS_NO_PATHCONV=1
STATE=~/.nemesis_box
REGIONS=(ap-south-1 us-east-1 us-east-2 us-west-2 eu-central-1 ap-northeast-1 eu-north-1)
TYPES=(g6e.xlarge g6e.2xlarge)
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

myip() { curl -s -m 10 https://checkip.amazonaws.com; }

allow_ip() {  # $1 region
  local vpc sg
  vpc=$(aws ec2 describe-vpcs --region "$1" --filters Name=is-default,Values=true --query 'Vpcs[0].VpcId' --output text)
  sg=$(aws ec2 describe-security-groups --region "$1" --filters Name=group-name,Values=nemesis-ssh Name=vpc-id,Values="$vpc" --query 'SecurityGroups[0].GroupId' --output text)
  if [ "$sg" = "None" ]; then
    sg=$(aws ec2 create-security-group --region "$1" --group-name nemesis-ssh --description "Nemesis dev box SSH" --vpc-id "$vpc" --query GroupId --output text)
  fi
  aws ec2 authorize-security-group-ingress --region "$1" --group-id "$sg" --protocol tcp --port 22 --cidr "$(myip)/32" >/dev/null 2>&1
  echo "$sg"
}

set_alias() {  # $1 region $2 id
  aws ec2 wait instance-running --region "$1" --instance-ids "$2"
  local ip
  ip=$(aws ec2 describe-instances --region "$1" --instance-ids "$2" --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)
  sed -i "/^Host nemesis$/,/^Host /{s/^  HostName .*/  HostName $ip/}" ~/.ssh/config
  echo "$1 $2" > "$STATE"
  for _ in $(seq 1 30); do ssh -o ConnectTimeout=5 -o BatchMode=yes nemesis true 2>/dev/null && break; sleep 8; done
  echo "box up: $1 $2 $ip"
}

try_start() {  # $1 region $2 id
  allow_ip "$1" >/dev/null
  for t in "${TYPES[@]}"; do
    aws ec2 modify-instance-attribute --region "$1" --instance-id "$2" --instance-type "{\"Value\":\"$t\"}" 2>/dev/null
    out=$(aws ec2 start-instances --region "$1" --instance-ids "$2" --query 'StartingInstances[0].CurrentState.Name' --output text 2>&1 | tail -1)
    case $out in pending|running) set_alias "$1" "$2"; return 0;; esac
  done
  return 1
}

try_launch() {  # $1 region
  local r=$1 ami sg vpc sn out
  ami=$(aws ssm get-parameter --region "$r" --name /aws/service/deeplearning/ami/x86_64/base-oss-nvidia-driver-gpu-ubuntu-24.04/latest/ami-id --query Parameter.Value --output text 2>/dev/null) || return 1
  aws ec2 import-key-pair --region "$r" --key-name nemesis --public-key-material "fileb://$(cygpath -m ~/.ssh/id_ed25519.pub 2>/dev/null || echo ~/.ssh/id_ed25519.pub)" >/dev/null 2>&1
  sg=$(allow_ip "$r")
  vpc=$(aws ec2 describe-vpcs --region "$r" --filters Name=is-default,Values=true --query 'Vpcs[0].VpcId' --output text)
  for t in "${TYPES[@]}"; do
    for sn in $(aws ec2 describe-subnets --region "$r" --filters Name=vpc-id,Values="$vpc" Name=default-for-az,Values=true --query 'Subnets[].SubnetId' --output text); do
      out=$(aws ec2 run-instances --region "$r" --image-id "$ami" --instance-type "$t" --key-name nemesis \
        --subnet-id "$sn" --security-group-ids "$sg" --instance-initiated-shutdown-behavior stop \
        --block-device-mappings 'DeviceName=/dev/sda1,Ebs={VolumeSize=200,VolumeType=gp3,DeleteOnTermination=true}' \
        --user-data "fileb://$(cygpath -m "$ROOT/scripts/aws_userdata.sh" 2>/dev/null || echo "$ROOT/scripts/aws_userdata.sh")" \
        --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=nemesis-dev},{Key=project,Value=nemesis}]' 'ResourceType=volume,Tags=[{Key=project,Value=nemesis}]' \
        --query 'Instances[0].InstanceId' --output text 2>&1 | tail -1)
      case $out in i-*) echo "launched $t in $r: $out"; set_alias "$r" "$out"; return 0;; esac
    done
  done
  return 1
}

case "${1:-up}" in
  up)
    if [ -f "$STATE" ]; then
      read -r r id < "$STATE"
      state=$(aws ec2 describe-instances --region "$r" --instance-ids "$id" --query 'Reservations[0].Instances[0].State.Name' --output text 2>/dev/null)
      if [ "$state" = "running" ]; then allow_ip "$r" >/dev/null; set_alias "$r" "$id"; exit 0; fi
      try_start "$r" "$id" && exit 0
      echo "no capacity for $id in $r; launching fresh"
    fi
    for r in "${REGIONS[@]}"; do try_launch "$r" && exit 0; done
    echo "no L40S capacity in any region" >&2; exit 1 ;;
  sync)
    (cd "$ROOT" && tar --exclude=.git --exclude=runs --exclude=__pycache__ --exclude=.pytest_cache -czf - .) \
      | ssh nemesis 'mkdir -p ~/muse && tar -xzf - -C ~/muse && cloud-init status --wait >/dev/null; cd ~/muse && bash scripts/setup_linux.sh 2>&1 | tail -1' ;;
  down)
    read -r r id < "$STATE" && aws ec2 stop-instances --region "$r" --instance-ids "$id" --query 'StoppingInstances[0].CurrentState.Name' --output text ;;
  *) echo "usage: $0 up|sync|down" >&2; exit 2 ;;
esac
