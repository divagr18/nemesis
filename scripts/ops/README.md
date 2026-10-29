# Ops for the public box

The files here run on the Nemesis box (i-0c84eb3c597c7d053, us-east-1, Elastic IP 54.224.236.215). `scripts/deploy.sh ops` installs them all. It copies the scripts to `/usr/local/bin/` and the units to `/etc/systemd/system/`, then enables the timers. It never restarts `nemesis`.

| Unit | What it does | Logs |
|---|---|---|
| `nemesis-watchdog.timer` | Every 3 min, curls `localhost:8000/api/limits`. Restarts `nemesis` after 3 failed checks in a row (see `docs/LAB_NOTEBOOK.md`, "Oct 29: before going public"). | `journalctl -u nemesis-watchdog` |
| `nemesis-cleanup.timer` | Daily disk cleanup at 04:30 UTC (up to 15 min later). See below. | `journalctl -u nemesis-cleanup` |
| `nemesis-autostop.timer` | One-off `shutdown -h now` on 2026-11-17 18:05 UTC. | `journalctl -u nemesis-autostop` |

## Disk cleanup (`nemesis-cleanup.sh`, added Oct 30)

It runs as `ubuntu` at idle I/O priority and deletes only scratch files:

| Path (under `~/muse/runs`) | Older than | What they are |
|---|---|---|
| `serve_dev/voice/*.wav` | 2 days | Voice attacks, already transcribed |
| `serve_dev/media/*_sam.jpg` | 2 days | Downscaled copies for SAM, rebuilt on demand |
| `serve_dev/patch_inputs/*` | 7 days | Theta files for each retrain, already read by the worker |
| `llm_cache/*.json` | 14 days | LLM response cache |

It never touches `clips/`, `versions/`, `attacks.jsonl`, `duels/`, `briefs/`, `moderation/`, `spend.jsonl`, `share/`, `showcase/`, `reports/` or original media photos, because public pages link to them. Every deleted path and its size goes to the journal, followed by a total and `df -h /`.

To dry-run it (lists what would go and deletes nothing):

```
sudo systemctl set-environment DRY_RUN=1
sudo systemctl start nemesis-cleanup
sudo systemctl unset-environment DRY_RUN
journalctl -u nemesis-cleanup -n 50 --no-pager -o cat
```

You can also run it directly with `sudo -u ubuntu DRY_RUN=1 bash /usr/local/bin/nemesis-cleanup.sh`.

Disk on Oct 29, before the first run:
- `/` was 68G used of 96G (71%).
- Most of that is `/usr` (49G, the Deep Learning AMI) and `~/.cache` (7.8G). The cleanup touches neither.
- `runs/serve_dev` was 285M: `versions` 116M, `clips` 92M, `rejected` 65M, `share` 6.7M, `play` 2.9M, everything else under 1.2M.
- `runs/llm_cache` was 352K.

The first dry run found nothing old enough to delete, because the box only went up on Oct 27. The 16 `patch_inputs` entries become eligible from Nov 3 and the 80 cache files from Nov 10. No `voice/` directory exists yet.

To undo it on the box:

```
sudo systemctl disable --now nemesis-cleanup.timer
sudo rm /etc/systemd/system/nemesis-cleanup.{service,timer} /usr/local/bin/nemesis-cleanup.sh
sudo systemctl daemon-reload
```

Then remove those files from this directory and `nemesis-cleanup.*` from the `ops()` function in `scripts/deploy.sh`, or the next `deploy.sh ops` will put them back.

## Alerts (added Oct 30): plumbing only, no subscribers yet

All of these are in account 905418101086, us-east-1, and tagged `Project=nemesis`.

| Resource | ID / ARN | Notes |
|---|---|---|
| SNS topic | `arn:aws:sns:us-east-1:905418101086:nemesis-alerts` | No subscriptions. |
| Alarm `nemesis-web-system-status-failed` (existed) | EC2 `StatusCheckFailed_System` ≥ 1 for 3 of 3 one-minute periods | Now has the topic as its alarm action. Previously it had no actions. Its description was also corrected: the EventBridge stop/start rule it mentioned was never created. |
| Route 53 health check `nemesis-web-https` | `5da18911-c089-5102-09c6-9522de08dda2` | HTTPS `nemesis.divagr.com:443/api/limits` with SNI, every 30 s from all checker regions. A checker marks it unhealthy after 3 failures. |
| Alarm `nemesis-web-https-down` (new) | `AWS/Route53 HealthCheckStatus` (HealthCheckId above), Minimum < 1 for 3 of 3 one-minute periods | Notifies the topic after about 3 minutes down. Missing data counts as down. |

Route 53 health checks bill globally but publish their metrics only in us-east-1, which is why the alarm lives there. The health check costs roughly $1 to $2 a month.

To get the alerts, subscribe your own address, then click the confirmation link that SNS emails you:

```
aws sns subscribe --region us-east-1 \
  --topic-arn arn:aws:sns:us-east-1:905418101086:nemesis-alerts \
  --protocol email --notification-endpoint you@example.com
```

To also hear when things recover, add the topic as an OK action. Re-run `put-metric-alarm` with every existing setting plus `--ok-actions <topic arn>`, because `put-metric-alarm` replaces the whole alarm.

To undo, in this order:

```
# 1. Remove the action from the existing alarm. This restates its settings with no actions; do not delete the alarm.
aws cloudwatch put-metric-alarm --region us-east-1 --alarm-name nemesis-web-system-status-failed \
  --alarm-description "nemesis-web (i-0c84eb3c597c7d053) failed the EC2 system status check for 3 min. No actions." \
  --namespace AWS/EC2 --metric-name StatusCheckFailed_System --dimensions Name=InstanceId,Value=i-0c84eb3c597c7d053 \
  --statistic Maximum --period 60 --evaluation-periods 3 --datapoints-to-alarm 3 --threshold 1 \
  --comparison-operator GreaterThanOrEqualToThreshold --treat-missing-data notBreaching
# 2. The health check and its alarm
aws cloudwatch delete-alarms --region us-east-1 --alarm-names nemesis-web-https-down
aws route53 delete-health-check --health-check-id 5da18911-c089-5102-09c6-9522de08dda2
# 3. The topic (this also removes any subscriptions)
aws sns delete-topic --region us-east-1 --topic-arn arn:aws:sns:us-east-1:905418101086:nemesis-alerts
```
