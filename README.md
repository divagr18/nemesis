# Nemesis

**Every robot needs a nemesis. Real-to-sim red-teaming and reinforcement learning for walking robots.**

[Try Nemesis live](https://nemesis.divagr.com) · [Watch the demo](https://youtu.be/JirwnL-4Ed8)

---

Nemesis turns red-teaming into an interactive real-to-sim feedback loop for quadruped and humanoid robots.

Today, stress-testing a locomotion policy means hand-writing physics configurations and guessing domain-randomization ranges. Nemesis replaces that trial and error with multimodal AI: describe an attack in plain English, say it out loud, or upload a photo of a real place. Meta's Muse models and SAM 3.1 turn the scenario into a physics program, run it against the robot in MuJoCo, and, if it falls, retrain the policy with PPO until it survives.

Every update is regression-tested against a locked test gauntlet before it goes live. On Autopilot, Muse hunts for failure modes on its own; Live deployment tests the robot against a place you describe; and the Readiness report audits any version. The core loop also runs fully self-hosted on a single 24 GB GPU with Muse Glimmer.

---

## System capability matrix

| Component | Model / library | Runtime | Capability |
| :--- | :--- | :--- | :--- |
| **Natural-language compiler** | **Muse Wonder** (`muse-wonder-1.0`) | Meta Model API, native tool calling | Turns typed or spoken situations into a validated JSON physics program that compiles to a fixed 80-slot perturbation vector. Also runs Autopilot, plays Muse in You vs Muse, and writes Live deployment situations, changelogs and reports. |
| **Vision and surface estimator** | **Muse Spark 1.3** + **SAM 3.1** | Meta Model API (image and video input) | SAM outlines and numbers the steps, puddles, ice and ramps in a photo; Spark estimates the surface (friction μ, slope, hazards) and watches fall clips to diagnose them. |
| **Voice interface** | **Muse Voice Transcribe** | Recorded in the browser, transcribed on the server | Spoken situations on Break it and in You vs Muse. |
| **Self-hosted mode** | **Muse Glimmer 30B** | Q4_K_M GGUF on `llama.cpp` | Replaces Wonder and Spark on one 24 GB GPU with no API key (`NEMESIS_OPEN=1`). |
| **Physics and training** | **MuJoCo / MJX + Brax** (MuJoCo Playground) | JAX on GPU | Batched rollouts, PPO fine-tuning, contact physics. |
| **Interactive client** | **three.js + MuJoCo WebAssembly** | In the browser | 3D replays, and a Playground where the policy runs live in the page and you shove it yourself. |

---

## Core workflows

### 1. Attack, then harden the policy
* **From words to physics:** a user enters a scenario such as *"wet tiles and a 3 kg backpack"* or *"a 110 N shove from the right for half a second"*. Muse Wonder writes it as a program over 16 composable ops, which compiles to the 80-slot vector θ (friction, payload, pushes, slopes, motor strength, latency, sensor noise, commands, stairs, curbs, ramps, ice).
* **Simulation:** the original robot and the live version both run it on the same seeds in MuJoCo, side by side in an interactive 3D replay. The same works on a Unitree G1 humanoid, or on both robots at once.
* **Retraining:** **Train it to survive this** fine-tunes the live Go1 policy with PPO on the situation, 48 nearby variants and every earlier lesson. After every million steps the robot retries the situation and the attempt streams to the page; training stops as soon as it holds (capped at 8M steps).
* **Gated deployment:** before the new policy goes live, the gate checks that:
  1. the robot falls less in that situation;
  2. it still walks normally;
  3. nothing on a locked 52-scenario gauntlet got worse.
* **Lineage:** an accepted policy becomes the new live version with a changelog written by Muse Wonder, and Muse Spark watches the before-and-after replay and describes what changed, citing measured gait numbers. If even our toughest policy falls almost every time, the page says *"Physics wins"* instead of training.

### 2. Real places with SAM 3.1 and Muse Spark
* **Upload:** a photo or video of a real place, such as front steps, an icy driveway or a ramp.
* **Segmentation:** SAM 3.1 outlines the steps, puddles, icy ground and ramps, and numbers the steps from the nearest. Its masks are drawn over the photo in the page.
* **Surface reading:** Muse Spark reads the surface, slipperiness, slope and hazards (for example *"packed ice and slush, μ ≈ 0.2"*).
* **Sim scene:** Muse Wonder builds that place, with exactly the steps SAM counted, and the robot is tested there. If it falls, it can be retrained on it like any other situation.

### 3. Autopilot, Live deployment and Readiness reports
* **Autopilot:** Muse Wonder runs an investigation with native tool calling. It forms hypotheses, searches each with CMA-ES for the most plausible failure, drops the ones that don't hold, measures the margin (*"falls begin at 108 N"*), and Spark watches every fall. On the public site each investigation gets 5 hypothesis tests so the GPU is shared fairly.
* **Live deployment:** describe where the robot will work, such as *"a hospital with polished corridors and carts"*. Muse Wonder writes 8–12 situations the robot would meet there; each runs on the original and live robots; Muse Spark names the worst three; **Train it for this place** retrains on the ones it fails, then the grid re-grades.
* **Readiness report:** for any robot version: failure families, top findings with clips, Spark's diagnoses, safety margins, and deployment recommendations written by Wonder (*"do not deploy below μ 0.29 while turning"*).

---

## The attack specification (θ)

Every attack compiles into one 80-slot perturbation vector θ, so MJX compiles the simulator once and runs any number of scenarios in a batch:

* **Surfaces:** per-foot friction, two ice or wet patches, ground slope (pitch and roll).
* **Terrain:** stairs up and back down after a landing, curbs, a ramp; the feet collide with them.
* **Payload:** a mass strapped to the trunk (up to 5 kg on the Go1, 10 kg on the G1) at an offset from the trunk's centre of mass, with its inertia.
* **Actuation:** per-motor strength (gain and torque limit), joint friction from wear.
* **Latency and sensors:** control delay of 0–40 ms (0–2 steps of 20 ms), proprioceptive noise, encoder offsets, IMU tilt bias, velocity-estimate bias.
* **Pushes:** two timed shoves with force vector, start time and duration (up to 150 N on the Go1, 300 N on the G1).
* **Commands:** a joystick profile that switches speed or turn rate mid-walk.

---

## Measured performance

### Single-round retraining
`baseline_v2` → `ft_v3`, 16 seeds per scenario, the same seeds before and after:

| Evaluation suite | Falls before | Falls after | Change |
| :--- | :--- | :--- | :--- |
| **Its own counterexample bank** (238 curated) | 80.3% | **15.2%** | −65.1 points |
| **Held-out hand-written attacks** | 27.5% | **13.5%** | −14.0 points |
| **Held-out envelope, half width** | 57.9% | **38.4%** | −19.5 points |
| **Nominal forward walking** (1.0 m/s) | 0% (4.5 m) | **0% (4.6 m)** | No gait loss |

### Adversarial retraining vs domain randomization (DR)
Fall rate on the locked gauntlet (52 scenarios × 16 seeds, hash committed before any result; mean over 3 training seeds at a matched simulation budget). DR needs a human to choose the width of its randomization envelope:

| Robustness method | Fall rate on gauntlet | Tuning needed |
| :--- | :--- | :--- |
| **Baseline** (no robustness training) | 17.7% | None |
| **Nemesis adversarial retraining** | **7.7%** | None |
| DR, hand-tuned width (w = 0.5) | 5.6–5.9% | Envelope width tuned by a human |
| DR, width too narrow (w = 0.25) | 10.1% | Mis-tuned |
| DR over the full physical envelope (w = 1.0) | 12.7% | Untuned |

*Takeaway:* without any envelope tuning, Nemesis falls less than half as often as DR over the same physical envelope (7.7% vs 12.7%) and gets most of the way to hand-tuned DR. Every policy still walks 4.4–4.6 m on flat ground. Full tables: [`docs/results/summary.md`](docs/results/summary.md).

---

## Try it (for judges)

Everything below runs at [nemesis.divagr.com](https://nemesis.divagr.com):

### 1. Attack and retrain
1. Open **Break it**.
2. Type or say an attack, for example: `a 120 N shove from the left for half a second on wet tiles`, and press Enter.
3. Watch the original robot and the live version take the hit in the 3D replay.
4. If it falls, click **Train it to survive this** and watch each training attempt stream in. A full retrain takes several minutes on the site's single T4, and the gate keeps the old robot if the new one isn't better.

### 2. A real place
1. Click the camera icon in the Break it box and upload a photo of steps or uneven ground.
2. Watch SAM 3.1 outline the steps and Muse Spark read the surface.
3. See whether the robot gets through the scene built from your photo.

### 3. You vs Muse
1. Open **You vs Muse** (try **Hard**, where Muse practises six candidates in the simulator first).
2. Write your situation while Muse writes its own.
3. Both run on the live robot; the smallest realistic change that knocks it over wins.

### 4. Playground
1. Open **Playground**. The robot walks live in your browser on MuJoCo WebAssembly.
2. Drag on the stage or use **Quick shove**, and switch between **Original** and **Latest** to feel the difference.
3. If your shove knocks it over, **Teach it this shove** retrains it on the server and loads the new version back into the page.

---

## Where to look in the code

| Subsystem | File / directory | What it does |
| :--- | :--- | :--- |
| **Attack DSL** | [`nemesis/perturb/dsl.py`](nemesis/perturb/dsl.py) | 16 composable ops, including `stairs`, `curb` and `course`; validated JSON, never executed. |
| **Perturbation vector** | [`nemesis/perturb/canonical.py`](nemesis/perturb/canonical.py) | The fixed 80-slot θ layout per robot. |
| **Environment wrapper** | [`nemesis/perturb/wrapper.py`](nemesis/perturb/wrapper.py) | Applies θ in MJX per episode; collisions and the fall check. |
| **Model calls** | [`nemesis/llm/`](nemesis/llm/) | Muse Wonder, Spark, Voice Transcribe, SAM 3.1, and Glimmer in open mode. |
| **Search engine** | [`nemesis/adversary/`](nemesis/adversary/) | Wonder's proposer, batched CMA-ES, delta-debugging shrink, Spark observation, bank curation. |
| **Retraining and gate** | [`server/patch_worker.py`](server/patch_worker.py) | PPO fine-tune with streamed attempts, early stop, regression gate. |
| **Autopilot** | [`server/agent.py`](server/agent.py) | The tool-calling investigation agent. |
| **Experiments** | [`experiments/`](experiments/) | The locked gauntlet, matched-compute arms, pre-registered follow-ups. |
| **Web client** | [`web/src/`](web/src/) | three.js replays, the MuJoCo WebAssembly Playground, voice capture. |

---

## Run it locally

Requirements: Linux with an NVIDIA GPU (WSL2 works), Python 3.12, [`uv`](https://docs.astral.sh/uv/), Node.js, and a Meta Model API key in `.env` as `MODEL_API_KEY=...` (see [`.env.example`](.env.example)). Trained policies are not in the repo, so train the baseline first.

```bash
git clone https://github.com/divagr18/nemesis.git
cd nemesis
bash scripts/setup_linux.sh                          # JAX 0.9.2, MuJoCo 3.17, MuJoCo Playground, Brax
cp .env.example .env                                 # add MODEL_API_KEY
python -m nemesis.train.ppo --out runs/baseline_v2   # baseline walking policy (~15 min on an L40S)
(cd web && npm install && npm run build)             # the server serves web/dist
bash scripts/serve.sh 8000                           # http://localhost:8000
```

### Fully self-hosted mode

`NEMESIS_OPEN=1` runs the loop on Muse Glimmer 30B (Q4_K_M, llama.cpp via [`docker-compose.open.yml`](docker-compose.open.yml)) on one 24 GB GPU, with no Meta API key. Spoken attacks use Whisper on the CPU, since Meta has no open speech model. Autopilot and SAM 3.1 outlines are off in this mode.

```bash
scripts/open_up.sh                         # Glimmer in llama.cpp, then the server on :8000
# or, on a fresh box:
scripts/open_weight_demo.sh setup          # once: Python env, faster-whisper, llama.cpp image, Glimmer's weights
scripts/open_weight_demo.sh up
scripts/open_weight_demo.sh attack "A gust shoves it sideways while it crosses black ice"
scripts/open_weight_demo.sh retrain <attack id>
```

---

## Architecture choices

- **Fixed perturbation vector θ:** every scenario compiles to the same 80-slot vector, so JAX/MJX compiles the physics once and runs thousands of batched rollouts without recompiling.
- **Physical fall check:** a fall is a non-foot contact with the floor or a step, a trunk tilt over 45°, or the root dropping too low. It comes from the simulator, not from a model's judgment.
- **Regression gate:** a new policy never goes live just because it passes the scenario it trained on; it must also keep walking and not get worse on the locked gauntlet.
- **"Physics wins":** if even our toughest policy falls almost every time, Nemesis says so instead of training on an impossible scenario.

Built on [MuJoCo / MJX](https://github.com/google-deepmind/mujoco), [MuJoCo Playground](https://github.com/google-deepmind/mujoco_playground) (the Go1 and G1 models and Brax PPO), [evosax](https://github.com/RobertTLange/evosax) for CMA-ES, [`@mujoco/mujoco`](https://www.npmjs.com/package/@mujoco/mujoco) and three.js.
