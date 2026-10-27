# Nemesis

**An AI red team for robots: it finds how your robot fails, explains why, and fixes it.**

Nemesis finds the physical conditions that make a walking robot fall, explains each failure in plain language, and trains the robot to survive them. Anyone can red-team it in plain English, typed or spoken.

1. **Muse Wonder** acts as an adversary. It writes *hypotheses* about why the robot works, such as "the trot relies on rear-foot grip when the yaw command flips", and turns each one into an attack program in a physics DSL.
2. **CMA-ES** searches each program's free parameters for the **most plausible** failure. It then shrinks that failure to its minimal form.
3. **Muse Spark** watches every failure on video, names the failure mode, and feeds what it saw back into Wonder's next round of hypotheses.
4. The robot is **fine-tuned** on a curated bank of these counterexamples. The bank is weighted by learnability, infeasible items are quarantined, and failure families are balanced.
5. Repeat.

On a Unitree Go1 in MuJoCo MJX, one round of this loop cut falls on held-out hand-written attacks from **27.5% → 13.5%**, and on a domain-randomization-style distribution it never trained on from **57.9% → 38.4%**. The robot did not become timid: on flat ground it walks as far as before (4.5 → 4.6 m in 5 s).

We then ran a pre-registered study of where this beats plain domain randomization and random search, and where it doesn't. The short version:
- **Attack programs are what make plausible failures findable.** Searching the raw parameter box finds none.
- **Random programs find more failures than the LLM.** The LLM adds the *why*.
- **Adversarial training needs no envelope tuning, and matches DR only when DR is hand-tuned.**

See [Results](#results).

> Built for the Meta Global AI Developer Hackathon (Oct 26 – Nov 4, 2026), *Push the Frontier* theme. Everything in this repo was written during the event; see [What was built during the hackathon](#what-was-built-during-the-hackathon).

---

## Why

Robots trained in simulation fail in the real world in ways nobody predicted, and when they fail, nobody can tell you why. The standard defense is **domain randomization (DR)**: perturb everything at random during training. It works well, and our experiments confirm it's a strong training method, but it's blind. It needs a human to choose what to randomize, and it never tells you what breaks.

Nemesis replaces guessing with a search for failures:
- an LLM proposes **structured, compositional** attacks a fixed randomization range can't express (ice you walk *onto*, a shove timed *during* a turn, a command reversal *while* slipping);
- an optimizer finds the most plausible version of each attack;
- a vision model explains what went wrong.

The robot then learns from exactly those failures.

## How it works

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
| **Muse Wonder** (`muse-wonder-1.0`) | The adversary. Writes hypotheses and attack programs, and translates visitors' plain-English attacks into physics. |
| **Muse Spark 1.3** (video input) | Watches failure clips and names the mode ("front-foot slip forward flip"). Its observations steer Wonder's next round. |
| **Muse Voice Transcribe** | Spoken attacks on the public page. |
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
uvicorn server.app:app --port 8000                           # the "try to break the robot" page
```

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
