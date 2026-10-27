# Nemesis

**Try to break the robot. Then watch it learn.**

Nemesis is a red team for walking robots that anyone can use. Describe an attack in plain English, say it out loud, or photograph a real place. Meta's Muse models turn it into physics, and a Unitree Go1 runs it in MuJoCo. If the robot falls, one click retrains it until it doesn't, and every fix is regression-tested before it goes live. An autonomous agent does the same on its own and writes up what it found.

| | What you do | What happens |
|---|---|---|
| **Attack** | Type or say *"wet tiles and a 3 kg backpack"* | **Muse Voice Transcribe** hears it, **Muse Wonder** compiles it into a physics program (friction, payloads, shoves, slopes, weak motors, sensor lag…), and the robot runs it. You watch the original and the live robot in an interactive **3D replay**. |
| **Patch it** | Click **Train it to survive this** | Nemesis fine-tunes the live robot (PPO on GPU) on your attack, 48 nearby variants and every earlier lesson. A **regression gate** then checks three things: the attack is fixed, the robot still walks, and nothing on a locked 52-scenario gauntlet got worse. Only then does it become the new live version and replay your attack. |
| **Your world** | Upload a photo or video of a place | **Muse Spark** reads the surface, slipperiness and slope ("packed ice and slush, μ≈0.2"). The robot is tested in that environment. |
| **Agent mode** | Click **Start investigation** | Wonder runs a tool-using investigation live. It forms hypotheses, searches each attack program with CMA-ES for the most plausible failure, and drops the ones that don't hold. Spark watches every fall, Nemesis measures the safety margin ("falls begin at 108 N"), and the robot is retrained. |
| **Report** | Open the red-team report | A pentest-style report for any robot version: failure families, top findings with clips, Spark's diagnoses, safety margins, and deployment recommendations written by Wonder ("do not deploy below μ 0.29 while turning"). |
| **Community** | Just attack it | The robot learns from everyone. Every few successful attacks trigger a community retrain. A lineage view tracks versions, the Hall of Fame shows which version each attack broke, and the leaderboard rewards the *subtlest* attack. |
| **Open weights** | `NEMESIS_OPEN=1` | The whole loop runs offline on **Muse Glimmer** on one 24 GB GPU, no API key needed ([details](#fully-open-weight-mode)). |

Every attack is also run against our toughest policy. If even that one falls almost every time, the page says *"Physics wins"* instead of pretending it can be trained away.

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
- **Attack DSL** ([`nemesis/perturb/dsl.py`](nemesis/perturb/dsl.py)). 13 composable ops. Every number is either fixed or a `[lo, hi]` range for the optimizer. LLM output is validated JSON and is never executed.
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
| **Muse Wonder** (`muse-wonder-1.0`) | Turns visitors' plain-English attacks into physics programs. Runs agent mode as a native tool-calling agent (search, margin, watch, patch). Writes the hypotheses of the automated hunt and the red-team reports. |
| **Muse Spark 1.3** (image + video input) | Watches failure clips and names the mode ("lateral shove front-leg buckle"). Reads photos of real places into physical parameters (Your world). Its observations steer Wonder. |
| **Muse Voice Transcribe** | Spoken attacks on the page. |
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

We compared five arms at a matched env-step budget: DR, random search, full-union CMA-ES, blind random programs, and Nemesis. That's 3 seeds × 3 rounds each, evaluated on a gauntlet whose hash was committed before any result. Then we **pre-registered** six follow-up experiments mapping where an LLM red team helps and where it doesn't ([`docs/PREREGISTRATION.md`](docs/PREREGISTRATION.md)).

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
- `app.py`: attacks, versions, Hall of Fame and leaderboard.
- `patch_worker.py`: Patch training and the regression gate, run in a subprocess with its own GPU memory.
- `agent.py`: agent mode.
- `world.py`: Your world.
- `report.py`: red-team reports.
- `jobs.py`: background jobs, streamed to the page as resumable server-sent events.

The page ([`web/dist/`](web/dist)) is build-free ES modules. The 3D replay is three.js playing back poses exported from the simulator (`nemesis/sim/export.py`).

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
