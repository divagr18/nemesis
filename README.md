# Nemesis

**Every robot needs a nemesis.**

Nemesis lets anyone put a walking robot in a situation and watch it learn. Describe the situation in plain English, say it out loud, or photograph a real place. Meta's Muse models turn it into physics, and a Unitree Go1 faces it in MuJoCo. If the robot falls, one click retrains it: you watch every attempt, every fix is regression-tested before it goes live, and Muse Spark explains what changed.

**Try it: [nemesis.divagr.com](https://nemesis.divagr.com)**

| | What you do | What happens |
|---|---|---|
| **Break it** | Type or say *"wet tiles and a 3 kg backpack"*, or tap a sample | **Muse Voice Transcribe** hears it and **Muse Wonder** compiles it into a physics program: friction, payloads, shoves, slopes, weak motors, sensor lag, stairs and curbs. The original robot and the live version both run it on the same seeds, and you watch them side by side in an interactive **3D replay** (scrub, slow-mo, the push drawn as an arrow, ice as a glossy patch). The page shows each stage as it happens. A result takes about 10 s. |
| **Train it** | Click **Train it to survive this** | Nemesis fine-tunes the live robot with PPO on GPU, on your situation, 48 nearby variants and every earlier lesson. **Watch it learn:** after every million simulated steps the robot tries your situation again, and each attempt streams to the page ("1M · 9/16 falls"). Training stops as soon as it holds and still walks normally, capped at 8M steps. A **regression gate** then checks three things: the situation is fixed, the robot still walks, and nothing on a locked 52-scenario gauntlet got worse. Only then does it go live. **Muse Spark** watches the before/after clip with measured gait numbers and says what changed. A **safety map** (an 11 × 11 grid over the two conditions that matter most, 16 seeds per cell) shows how much more the new version can take. |
| **A real place** | Upload a photo or video of a place | **Muse Spark** reads the surface, slipperiness, slope and hazards ("packed ice and slush, μ≈0.2"). The robot is tested in that environment. |
| **Deploy it** | Describe where the robot will work: *"a hospital with polished corridors and carts"* | **Muse Wonder** writes 8–12 situations the robot would meet there, at the harsh end of realistic, and each one runs on the original and live robots as a grid that fills in as results land. Wonder then sees the results and rewrites the ones the original shrugged off as the hardest realistic version of that moment (kept only if it falls more). **Muse Spark** names the worst three. Click **Train it for this place** to retrain on the ones it fails (up to 5), then the grid re-grades before → after. |
| **Stairs and routes** | *"out the door, down three small steps, across an icy driveway, up a ramp"* | Real step and ramp geometry the feet collide with. One sentence becomes an ordered course: steps up and down, curbs, ramps, ice and wet patches. The replay draws every segment, and Break it lists the route in order ("3 steps up → ice → 8° ramp"). |
| **You vs Muse** | Start a game | You and Muse each describe a situation per round, without seeing each other's. Both run on the live robot with the same 8 seeds. Score = fall rate × subtlety, so the smallest realistic change that still knocks it over wins, and brute force scores 0. In **Hard** mode Muse writes six candidates and practises them in the simulator before committing to its best. |
| **Autopilot** | Give it a goal, or just start | Muse Wonder runs a live investigation with native tool calling. It forms hypotheses, searches each one with CMA-ES for the most plausible failure, and drops the ones that don't hold. Spark watches every fall, Nemesis measures the margin ("falls begin at 108 N"), and the robot is retrained. Laid out like a chat, with a replay pane. On the public site each investigation gets 5 tries (hypothesis tests), so the GPU is shared fairly; Muse says so up front (`NEMESIS_AUTOPILOT_TRIES`). |
| **Readiness report** | Open the Readiness report | A report for any robot version: failure families, top findings with clips, Spark's diagnoses, safety margins, and deployment recommendations written by Wonder ("do not deploy below μ 0.29 while turning"). |
| **Lineage** | Just use it | The robot learns from everyone: every few successful situations trigger a community retrain. Each version gets a two-line changelog written by Wonder (what it learned, what still knocks it over). The Hall of Fame shows which version each situation broke, and the leaderboard rewards the *subtlest* one. |
| **Two robots** | Pick Quadruped, Humanoid or Both on Break it | The same pipeline on a **Unitree G1 humanoid**: its own physics vocabulary, its own trained policy and lineage. *Both* runs one sentence on each robot side by side. *(Training the humanoid from the page is not built yet.)* |
| **Open weights** | `NEMESIS_OPEN=1` | The whole loop runs offline on **Muse Glimmer** on one 24 GB GPU, no API key needed ([details](#fully-open-weight-mode)). |

Every situation is also run against our toughest policy. If even that one falls almost every time, the page says *"Physics wins"* instead of pretending it can be trained away.

> Built for the Meta Global AI Developer Hackathon (Oct 26 – Nov 4, 2026), *Push the Frontier* theme. Everything in this repo was written during the event; see [What was built during the hackathon](#what-was-built-during-the-hackathon).

**Does the training actually help?** One round of counterexample training cut falls on held-out hand-written attacks from **27.5% → 13.5%** without making the robot timid (4.5 → 4.6 m walked in 5 s). We also ran a pre-registered study against domain randomization and random search; see [Results](#results). The short version:
- writing attacks as *programs* is what makes realistic failures findable;
- the LLM's edge is explanation and interface, not raw search;
- adversarial training matches hand-tuned DR, with no tuning needed.

---

## How it works: the attack engine

```
 "the gait relies on rear-foot grip            ┌──────────────┐  JSON program   ┌────────────────┐
  when the yaw command flips"  ◄───────────────│  Muse Wonder │ ──────────────► │  DSL → θ (80)  │
                                               └──────▲───────┘                 └───────┬────────┘
                                 Spark's observations │                                 │ free params
                                                      │                         ┌───────▼────────┐
 ┌──────────────┐   failure clips   ┌───────────────┐ │                         │ CMA-ES: most   │
 │  Muse Spark  │ ◄──────────────── │ failure atlas │◄┴──── shrink ◄──────────── │ plausible fall │
 └──────────────┘                   └───────┬───────┘                         └───────▲────────┘
                                            │ curated bank (learnability,             │ batched MJX
                                            ▼ feasibility, family balance)            │ rollouts
                                    ┌───────────────┐   fine-tuned policy     ┌───────┴────────┐
                                    │  PPO fine-tune │ ──────────────────────► │  Go1 in MJX    │
                                    └───────────────┘                          └────────────────┘
```

- **Perturbation vector θ** ([`nemesis/perturb/canonical.py`](nemesis/perturb/canonical.py)). Every attack compiles to one fixed-length vector of 80 slots, so the simulator is jitted once for every scenario. Slots cover:
  - per-foot friction and ice patches
  - payload (with correct inertia) and slope
  - motor strength (gain and torque limit) and joint friction
  - control latency and timed pushes
  - sensor noise and biases (encoders, IMU, velocity estimate)
  - command profiles
  - terrain: stairs (up, and back down after a landing), curbs, a ramp, a second ice patch. Eight mocap boxes are placed along the start heading each episode; the feet collide with them, and a leg or body hitting a riser counts as a trip
- **Attack DSL** ([`nemesis/perturb/dsl.py`](nemesis/perturb/dsl.py)). 16 composable ops, including `stairs`, `curb` and `course` (an ordered route of stairs up/down, curbs, ramps, ice and wet patches). Every number is either fixed or a `[lo, hi]` range for the optimizer. LLM output is validated JSON and is never executed.
- **NemesisWrapper** ([`nemesis/perturb/wrapper.py`](nemesis/perturb/wrapper.py)). Applies θ inside MuJoCo Playground's Brax training stack, per environment and per episode, together with:
  - body–floor collisions and a strict fall check
  - a 3-frame observation history and a θ-aware critic
  - domain randomization
- **Adversary** ([`nemesis/adversary/`](nemesis/adversary)): the Wonder proposer, batched multi-program CMA-ES, delta-debugging shrink, Spark observation, the failure atlas, and bank curation.
- **Evaluation** ([`experiments/`](experiments)):
  - a locked gauntlet (hash committed before any main-experiment result)
  - a 5-arm matched-compute comparison
  - cross-play

## Meta models used

| Model | Role |
|---|---|
| **Muse Wonder** (`muse-wonder-1.0`) | Turns visitors' plain-English situations into physics programs. Plays Muse in You vs Muse. Runs Autopilot as a native tool-calling agent (search, margin, watch, patch). Writes version changelogs, the hypotheses of the automated hunt and the Readiness reports. |
| **Muse Spark 1.3** (image + video input; the `-contributor` tier for every call) | Watches failure clips and names the mode ("lateral shove front-leg buckle"). Reads photos of real places into physical parameters. Explains what each retrain changed, citing measured gait numbers. Its observations steer Wonder. |
| **Muse Voice Transcribe** | Spoken situations on the page and in You vs Muse. |
| **Muse Glimmer** (open weights, self-hosted via llama.cpp) | Drop-in open-weight adversary (`--proposer glimmer`). With `NEMESIS_OPEN=1` it also translates attacks and watches clips (see [Fully open-weight mode](#fully-open-weight-mode)). |

## Results

**Single-round validation** (`baseline_v2` → `ft_v3`, 16 seeds per scenario, same seeds before and after):

| Suite | Falls before | Falls after |
|---|---|---|
| Its own counterexample bank (238 curated) | 80.3% | **15.2%** |
| Held-out hand-written attacks | 27.5% | **13.5%** |
| Held-out envelope, half width (DR-style) | 57.9% | **38.4%** |
| Nominal, 1 m/s forward | 0% (4.5 m) | **0% (4.6 m)** |

### Honest science: Nemesis vs domain randomization

We compared five arms at a matched env-step budget: DR, random search, full-union CMA-ES, blind random programs, and Nemesis. That's 3 seeds × 3 rounds each, evaluated on a gauntlet whose hash was committed before any result. Then we **pre-registered** six follow-up experiments mapping where LLM-written scenarios help and where they don't ([`docs/PREREGISTRATION.md`](docs/PREREGISTRATION.md)).

The arms:
- **dr**: uniform domain randomization over the envelope.
- **random**: uniform random θ.
- **box**: CMA-ES over every θ slot.
- **shuffled**: random attack programs from the same DSL.
- **nemesis**: Wonder's programs.

**Training: fall rate on the locked gauntlet** (52 hand-written and realistic scenarios × 16 seeds; mean over 3 seeds):

| Policy | Fall rate |
|---|---|
| Baseline (no robustness training) | 17.7% |
| DR, envelope width hand-tuned (w=0.5) | **5.6–5.9%** |
| Box CMA-ES adversary | **5.6%** |
| Random-program adversary | 6.0% |
| Uniform-random adversary | 7.1% |
| Nemesis | 7.7% |
| DR, width too narrow (w=0.25) | 10.1% |
| DR over the full physical envelope (w=1.0) | 12.7% |

Every policy still walks 4.4–4.6 m on flat ground.

**Finding plausible failures** (strict: ≤ 3 perturbation families, small total deviation, fails 50–95% of seeds):

| Adversary | Untrained | DR-trained | Nemesis-trained | Small space → full space |
|---|---|---|---|---|
| Random programs | **8.7** | **4.7** | **7.3** | 10.5 → 8.5 |
| Nemesis (Wonder) | 6.0 | 1.3 | 2.3 | 5.5 → 6.5 |
| Box CMA-ES | 0 | 0 | 0 | **10.5 → 0** |
| Uniform random | 0 | 0 | 0 | 0 → 0 |

The first three columns are the target policy.

**What this means:**
1. **The program DSL is the contribution that makes plausible failures findable.**
   - Searching the raw 80-dimensional parameter box finds nothing plausible unless a human first shrinks it to 3 perturbation families.
   - Programs, whether random or LLM-written, find realistic failures even against hardened policies.
2. **The LLM is not a better *searcher* than random programs.** Random programs find more failures at every budget. What Wonder adds is the *why*:
   - each failure comes with a physical hypothesis, a minimal counterexample, and Spark's video diagnosis;
   - anyone can attack the robot in plain English.
3. **Adversarial training needs no envelope tuning.** Given only the physical envelope, every adversarial arm beats DR over that envelope by about 2×. DR catches up only when a human tunes its width, and a mis-tuned width doubles its fall rate. Among the adversaries, Nemesis-trained policies are slightly worse and narrower than the box and random-program arms.
4. **Open weights suffice.** Muse Glimmer 30B (4-bit, one 24 GB GPU) proposes attack programs as productive as Wonder's: 10.0 vs 6.5 strict failures on the untrained target, within seed range.
5. **Not supported:**
   - Spark's feedback steering search (inconclusive).
   - Archive history helping (no).
   - Nemesis repairing a DR policy's residual failures better than more DR (no, though only 5–7 held-out failures).

Pre-registered verdicts:

| Hypothesis | Verdict |
|---|---|
| H-A: edge on hardened targets | ✗ |
| H-B: edge at small budgets | ✗ |
| H-C: robust to a larger search space | ✓ |
| H-D1: Spark feedback helps | ? |
| H-D2: history helps | ✗ |
| H-D3: Glimmer ≥ 50% of Wonder | ✓ |
| H-E: DR is width-sensitive | ✓ |
| H-F: residual repair | ✗ |

Full tables:
- [`docs/results/summary.md`](docs/results/summary.md): main experiment, including cross-play and CVaR
- [`docs/results/wide.md`](docs/results/wide.md): pre-registered A–E
- `docs/results/F_*`: F

The lab notebook records every bug, incident and decision along the way: [`docs/LAB_NOTEBOOK.md`](docs/LAB_NOTEBOOK.md).

## What was built during the hackathon

All of it. The repo was created after kickoff on Oct 26, 2026, and the commit history shows every step. Third-party components used as libraries:
- [MuJoCo / MJX](https://github.com/google-deepmind/mujoco) and [MuJoCo Playground](https://github.com/google-deepmind/mujoco_playground): the Go1 model, the Joystick task, and Brax PPO training.
- [evosax](https://github.com/RobertTLange/evosax) for CMA-ES.

The project log is in [`docs/LAB_NOTEBOOK.md`](docs/LAB_NOTEBOOK.md): findings, bugs, fixes and decisions in order. That includes several bugs we found in our own pipeline, and three behaviors in the upstream setup that we had to correct for:
- the Joystick scene's feet-only collisions
- a reward clipped at zero
- a floor-friction randomization that has no effect

## Related work

To our knowledge, no prior work uses an LLM to write adversarial physics programs for legged locomotion. The closest:
- **Q-DEG** ([2610.14415](https://arxiv.org/abs/2610.14415)): quality-diversity red-teaming of manipulation VLAs, with no LLM in the generator.
- **ChatScene** ([2405.14062](https://arxiv.org/abs/2405.14062)): an LLM writes a driving-scenario DSL for safety-critical scenarios, then the driver is fine-tuned.
- **DrEureka** and **Eurekaverse**: LLM-written randomization ranges and terrains, used once as a curriculum rather than as an adversarial loop.

See [`docs/literature_review.md`](docs/literature_review.md) and [`docs/finetune_review.md`](docs/finetune_review.md).

## Run it

Requirements: Linux with an NVIDIA GPU (WSL2 works), Python 3.12, `uv`, and a Meta Model API key in `.env` as `MODEL_API_KEY=...` (see `.env.example`).

```bash
bash scripts/setup_linux.sh                                   # deps (JAX 0.9.2, MuJoCo 3.17, Playground, Brax)
python -m nemesis.train.ppo --out runs/baseline_v2           # baseline walking policy (~15 min on an L40S)
python experiments/hunt.py --run runs/baseline_v2 --out runs/hunt
python experiments/finetune.py --base runs/baseline_v2 --atlas runs/hunt/atlas.jsonl --out runs/ft
python experiments/run_arm.py --arm nemesis --seed 0 --out runs/arms/nemesis_s0   # one experimental arm
bash scripts/serve.sh 8000                                   # the page: http://localhost:8000
```

The service ([`server/`](server)) is a FastAPI app:
- `app.py`: situations, Patch, the safety map, the hero showcase, versions, Hall of Fame and leaderboard.
- `patch_worker.py`: Patch training (an attempt per million steps, early stop, 8M cap) and the regression gate, run in a subprocess with its own GPU memory.
- `duel.py`: You vs Muse.
- `agent.py`: Autopilot.
- `world.py`: photos and videos of real places.
- `report.py`: Readiness reports and the safety map.
- `versions.py`: the lineage, changelogs and the community lesson bank.
- `jobs.py`: background jobs, streamed to the page as resumable server-sent events.

The web app ([`web/`](web)) is Vite + React + Tailwind with four pages: Break it, You vs Muse, Autopilot and Readiness. It builds to `web/dist`, which the server serves (`cd web && npm install && npm run build`). The 3D replay is three.js playing back poses exported from the simulator (`nemesis/sim/export.py`).

**The live site** runs on one always-on AWS g4dn.xlarge (a single T4), deployed with `scripts/deploy.sh up` (Elastic IP, Caddy with Let's Encrypt, systemd). Measured there:
- A typed situation takes 8–10 s end to end, about 4 s of it Muse Wonder. The mp4 clip that Spark and the cards use renders in the background, and every simulation shape is compiled at startup.
- Training stops as soon as an attempt holds. One million steps of PPO takes about 40 s on the T4.

## Fully open-weight mode

`NEMESIS_OPEN=1` runs the whole loop on self-hosted Meta open-weight models, with no Meta API key:

| Role | API mode | Open mode |
|---|---|---|
| Adversary, plain-English attack translation, report text | Muse Wonder | **Muse Glimmer 30B** (Q4_K_M GGUF, llama.cpp) |
| Watching failure clips, reading photos | Muse Spark 1.3 | **Muse Spark Open** if `NEMESIS_SPARK_OPEN_URL` is set, otherwise Glimmer's own vision encoder. Clips are sent as 12 sampled frames. |
| Spoken attacks | Muse Voice Transcribe | Whisper `base.en` on the CPU (`pip install faster-whisper`; Meta has no open speech model) |

```bash
scripts/open_up.sh    # Glimmer in llama.cpp (docker-compose.open.yml), then the server on :8000
```

Everything else stays the same: the call sites ask `config.text_model()` / `config.vision_model()`, and the disk cache and `runs/llm_log.jsonl` work identically.

**Hardware.** One 24 GB GPU is enough. Measured on a g5.2xlarge (A10G 24 GB):
- Glimmer with its vision projector and 24k context uses 17,671 MiB (of 23,028) once loaded.
- With the MJX simulator and renderer on the same GPU (`XLA_PYTHON_CLIENT_PREALLOCATE=false`), usage peaks at 19,061 MiB.
- Translating an attack takes 13–24 s, a proposal round of 4 programs 60 s, and watching a clip 30–37 s.

**Muse Spark Open** is an 816B mixture-of-experts model (42B active). It does not fit on any single GPU. The smallest community GGUF (`unsloth/Muse-Spark-Open-816B-A42B-GGUF`, UD-IQ1_S) is 175.6 GB, so it needs a host with at least 256 GB of RAM and a GPU, with the experts kept in RAM (for example, a g6e.8xlarge: one L40S plus 256 GiB). `SPARK_OPEN=1 scripts/open_up.sh` starts it through the compose `spark-open` profile. This path has not been run yet. Its license requires "Built with Muse Spark Open" to be shown wherever it is used.
