# Nemesis: build plan (Meta Global AI Developer Hackathon, Indie track)

## Context
Solo entry for "Push the Frontier". A Go1 quadruped learns a skill from natural language in MuJoCo/MJX. An LLM adversary (Muse Wonder, plus Glimmer later) writes **perturbation programs** that break the policy. CMA-ES tunes each program's numbers. Muse Spark 1.3 watches the failure videos to judge and name what went wrong. The policy is then fine-tuned on the counterexamples.

Headline claim: **more robust than domain randomization at matched compute**, shown by a 4-arm ablation. Public "try to break my robot" page.

Build window: from the end of kickoff on Oct 26 to Nov 4 (kickoff rules slide: "Build it between Oct 26 and Nov 4"). Submit by **Nov 4 9 PM ET (Nov 5 7:30 AM IST)**: public repo plus a 3-min video, with the bonus prizes entered and the X post link on the submission form. Fresh repo, nothing reused from FactorioGym.

**How to read this plan:**
- Phases (P0–P9) are ordered.
- Each phase has numbered sub-phases with a *done when* check.
- Each phase ends in a **gate**. Don't start the next phase until the gate passes, except where marked "overlaps".
- Stretch slots (S1–S7) are self-contained. Each has its own sub-steps and plugs in after a named gate.

---

## Core design rule
Every perturbation program compiles to **one fixed-length θ vector (~64 floats) plus a mask**. Unused primitives take neutral values. This means the MJX rollout is jitted once and reused by CMA-ES, fine-tuning, the gauntlet and the demo server.

The LLM emits **JSON only**, validated by pydantic, and that JSON is never exec'd. Only the skill reward code runs, and it goes through an AST whitelist in a subprocess.

## Key technical facts (verified)
- **Envs:** `Go1JoystickFlatTerrain`, `Go1JoystickRoughTerrain`, `Go1Handstand`, `Go1Getup`, `Go1Footstand`. Load with `registry.load(name, config_overrides={"impl": "jax"})`. The default impl is warp, so pin jax. PPO settings come from `locomotion_params.brax_ppo_config(name)`.
- **Training speed:** Go1 Joystick trains in about 7 min on an RTX 4090. Estimates: about 10 min on an L40S. The 4060 is fine for smoke tests at 1024 envs.
- **Scenario resampling:** the stock DR wrapper randomizes once, at init. `NemesisWrapper` swaps `_mjx_model = apply_model(base, info["theta"])` in step and resamples θ when `done` fires. Set `pert_config.enable=False`.
- **Primitive mapping:**
  - Friction → `geom_friction`
  - Payload → `body_mass` / `body_ipos`
  - Motor weakness → `actuator_gainprm[:,0]` **and** `actuator_biasprm[:,1:3]` together
  - Push → `xfrc_applied`
  - Latency → a ring buffer in `info`
  - Observation noise → added to `obs["state"]`
  - Terrain → `hfield_data` (vmappable; MJX supports hfield–sphere collisions)
- **CMA-ES:** evosax 0.3.2, `CMA_ES(population_size=64, solution=…)` with ask/tell. Map θ = lo + (hi−lo)·sigmoid(z).
- **Meta API:**
  - Endpoint: base `https://api.meta.ai/v1`, OpenAI SDK, Responses API. The key is in `D:\FactorioRL\.env` (`META_API_KEY`) and has been tested.
  - Spark video: upload the mp4 through the Files API, then pass it as `input_video`. Keep clips ≤10 s at 480p.
- **Browser:**
  - Sim: the official `@mujoco/mujoco` WASM package (marked WIP). It has no renderer, so use three.js.
  - Policy: Playground has a Brax→ONNX notebook and ships a pretrained `go1_policy.onnx`.
- **Glimmer:** `meta-models/Muse-Glimmer-30B`, BF16, needs an 80 GB GPU. Use vLLM structured outputs.

## Changes from the expert panel and literature review (Oct 26)
Sources: [docs/literature_review.md](docs/literature_review.md) and an expert-elicitation pass covering a locomotion practitioner, a UED researcher, an MJX engineer, an AV-falsification expert and a hackathon judge.

**Done in P2:**
- Body–floor collisions plus a strict fall definition.
- Unclipped reward.
- 3-frame obs history and θ in the critic.
- DR applied inside the wrapper.
- Realistic ranges.
- Structured primitives: command profile with reversal, spatial ice patch, encoder offsets, IMU bias, linvel bias.
- Payload inertia; slope-consistent gravity readings.
- **The baseline is retrained under all of this (`runs/baseline_v2`).**

**Adopted for P3 onward:**
1. **Objective = most plausible failure.** Minimize plausibility cost subject to failure, not raw failure, which finds unsolvable worlds. Score failure with an STL-style robustness margin over height/tilt/tracking. Shrink every counterexample toward nominal (delta debugging).
2. **Feasibility gate:** a counterexample enters the bank only if it is solvable, i.e. a short fine-tune on it reaches p ≥ 0.3. Otherwise label it "infeasible" and show it in the atlas but don't train on it.
3. **Bank sampling by learnability p(1−p)** (No Regrets). Retire scenarios above 95%, quarantine those below 5%. Mix 50% nominal / 40% counterexamples / 10% uniform. Run a **cumulative regression suite** every round and report forgetting. Roll back if nominal success drops more than 3 points.
4. **Isolate the LLM's contribution.** Add controls: CMA-ES over the **full DSL union**, and **shuffled-LLM** (same number of primitives, chosen at random). Headline metric: a **discovery curve**, i.e. distinct failure clusters (behavioral signatures) per env-step, at equal plausibility.
5. **Spark → Wonder feedback loop.** Spark's failure descriptions go into Wonder's next proposals. Ablate with vs. without Spark feedback (new clusters found). Report Spark–human agreement on about 40 labelled clips.
6. **Search budget:** 250-step attack episodes, population 16–32 × 8 common-random-number seeds, early stop. Report both training-steps-matched and total-steps-matched comparisons.
7. **Cluster on behavioral signatures:** first slipping foot, fall axis, time to fall, last-0.5 s contact pattern. Spark only names the clusters.
8. **Strong DR:** two envelope widths, report the better one, fine-tuned from the same baseline. Use a **fresh, never-trained adversary** in eval. Present the human attacks as in-envelope (they compile to the same DSL).
9. **Render video from logged batched trajectories**, not re-simulation, because chaotic contact dynamics aren't bit-exact across batch sizes. "Reproducible" means fail rate within its CI over N seeds.
10. **Demo:** the skill compiler shrinks to an ≤8 s beat (it's Eureka-like and splits the story). Headline the discovery curve, with CVaR@10% as the robustness number. Run the full pipeline at 1 seed on D4 and lock `analyze.py` before the D6 sweep.

**Positioning:** to our knowledge, no prior work has an LLM write adversarial physics programs for legged robots. The closest are Q-DEG (QD red-teaming of manipulation VLAs, no LLM) and ChatScene (LLM → driving scenario DSL → fine-tune). Cite both.

## Repo layout (`D:\muse`)
```
nemesis/config.py   nemesis/llm/{client.py,prompts/}   nemesis/envs/{base,skill_env}.py
nemesis/perturb/{canonical,dsl,compile,apply,wrapper,plausibility}.py
nemesis/sim/{rollout,render}.py   nemesis/skill/{compiler,sandbox,judge}.py
nemesis/adversary/{proposer,cmaes,baselines,archive,cluster}.py
nemesis/train/{ppo,budget}.py   nemesis/export/onnx.py
experiments/{run_arm,gauntlet,crossplay,analyze}.py   server/{app,modal_app}.py   web/   tests/
```

---

## P0: Setup (Oct 26 → Oct 27 morning)
| # | Task | Done when |
|---|---|---|
| 0.1 | Accounts: Meta key ✅ found and tested. AWS G quota ✅ 48 vCPU. P quota of 16 filed (pending). Spot G of 48 pending. Apply for Modal and Baseten credits. Join Discord. Claim the $150 when the link drops. | Credit applications sent |
| 0.2 | Local: WSL2 Ubuntu on the 4060 PC, NVIDIA driver, `uv`. Install `jax[cuda12]`. | `jax.devices()` shows the GPU |
| 0.3 | AWS: launch one g6e.xlarge on the Deep Learning AMI (Ubuntu), VS Code Remote-SSH, auto-stop script. | Same JAX check passes on the L40S |
| 0.4 | Repo: `git init`, public GitHub repo, `pyproject.toml` with pinned versions, `.env` (`MODEL_API_KEY`), `.gitignore`, skeleton packages, `pytest` running. | First commit dated Oct 27 |

**Gate G0:** the same repo installs and runs `pytest` both locally and on AWS.

## P1: Simulation foundation (D1, Oct 27)
| # | Task | Done when |
|---|---|---|
| 1.1 | `envs/base.py`: load Go1 (rough XML, impl=jax). Locally run 1024-env PPO for about 5M steps. | Reward goes up locally |
| 1.2 | `train/ppo.py`: wrap `ppo.train` with checkpoint save/restore and progress logging. Full Flat baseline on AWS. Benchmark jax vs warp steps/sec. | Baseline ckpt reaches the stock reward. Backend chosen. |
| 1.3 | `sim/render.py`: mp4 from a trajectory, tracking camera, 2×2 tiling. | Video of the baseline walking |
| 1.4 | `llm/client.py`: Responses API, Files upload, cache, retries. Smoke-test Wonder (JSON output), Spark (video in) and Transcribe (wav). | All three return sensible output. Confirm the video size limits. |
| 1.5 | Video capture: save a checkpoint at every eval via `policy_params_fn`. Log every LLM call with a timestamp to `runs/llm_log.jsonl`. | Timelapse checkpoints exist for the baseline |

**Gate G1:** baseline policy, rendered video, and all three Meta models callable.

## P2: Perturbation engine (D1 evening → D2, Oct 28)
| # | Task | Done when |
|---|---|---|
| 2.1 | `perturb/canonical.py`: θ layout (named slices, neutral values, hard physical bounds). | Layout documented and versioned |
| 2.2 | `perturb/apply.py`, model-level: friction, payload, motor weakness (gain plus bias). | Unit test: neutral θ reproduces the unperturbed model exactly |
| 2.3 | `apply.py`, step-level: time-windowed push, K-step latency buffer, observation noise. | A hand-set push knocks the robot over in video |
| 2.4 | `apply.py`, terrain: hfield generator (slope, steps, bumps) with a flat spawn pad. | Robot walks on generated terrain. Renderer re-uploads the hfield. |
| 2.5 | `perturb/wrapper.py`: NemesisWrapper with per-episode θ from a bank and resampling on `done`. | PPO runs with the wrapper and a bank of 2 scenarios |
| 2.6 | `perturb/dsl.py` + `compile.py`: pydantic union, JSON Schema export, program → (index map, bounds, mask). | Round-trip tests pass; out-of-bounds programs rejected |
| 2.7 | `sim/rollout.py`: jitted `evaluate(params, θ[B,D], rng)` returning soft success and metrics. Perturbed rendering. | Evaluating 2k envs × 500 steps takes seconds; compiles only once |

**Gate G2:** a hand-written DSL program reliably breaks the baseline, visible in both metrics and video.

## P3: Adversary (D3, Oct 29)
| # | Task | Done when |
|---|---|---|
| 3.1 | `adversary/cmaes.py`: evosax loop over z with padded d_max. Fitness = soft success over 32 rngs. | It finds a failure in a 3-parameter friction+push program |
| 3.2 | `perturb/plausibility.py`: normalized deviation, envelope checks, λ penalty. | A huge push is penalized below a subtle combined failure |
| 3.3 | `adversary/proposer.py`: Wonder gets the archive summary and the DSL schema and returns 8–16 hypotheses. | ≥80% of proposals validate against the schema |
| 3.4 | `adversary/archive.py`: atlas JSONL plus a replay tool. | Every entry reproduces from its stored θ and seed |
| 3.5 | `adversary/baselines.py`: random search and param-only CMA-ES under the same envelope. | All 3 adversaries run behind one interface |
| 3.6 | Video capture: save every CMA-ES generation's population (θ for every candidate) for the hunt-grid shot. | One full hunt can be replayed generation by generation |

**Gate G3:** ≥20 archived counterexamples that can be reproduced.

## P4: Counterexample training (D4, Oct 30)
| # | Task | Done when |
|---|---|---|
| 4.1 | Scenario bank builder: ≥50% nominal, the rest counterexamples, saved as `.npy`. | Bank loads into the wrapper |
| 4.2 | Fine-tune loop: restore ckpt → train on the bank → re-attack → repeat. | One full round: the old counterexamples mostly pass, nominal success holds |
| 4.3 | `train/budget.py`: env-step accounting that includes adversary search steps. | All arms report comparable totals |
| 4.4 | `experiments/run_arm.py` for arms a–d. Launch arms (a) DR and (c) param-only **overnight** on AWS. | Runs going and logging |

**Gate G4:** a single-seed Nemesis round beats the baseline on a small set of held-out scenarios.

## P5: Skill compiler and attack API (D5, Oct 31). Ends at the MVD gate.
| # | Task | Done when |
|---|---|---|
| 5.1 | `envs/skill_env.py`: feature dict and LLM reward hook. `skill/sandbox.py`: AST whitelist in a subprocess. | Malicious reward code is rejected by tests |
| 5.2 | `skill/compiler.py`: Wonder writes 3–4 reward candidates → short warm-started runs. | One text skill (e.g. "walk backward") trains |
| 5.3 | `skill/judge.py`: Spark scores the video for success and reward hacking. Sim metrics remain ground truth. | The judge picks the right candidate in the loop |
| 5.4 | `server/app.py`: FastAPI attack text → Wonder → DSL → evaluate → mp4. | `curl` returns a video in under 30 s |

**Gate G5 = MVD:**
- One skill policy.
- A typed attack runs end to end.
- ≥20 counterexamples.
- Fine-tuning beats the baseline, with nominal success reported.

## P6: Main experiment (D6, Nov 1)
| # | Task | Done when |
|---|---|---|
| 6.1 | Lock the gauntlet: about 50 hand-authored scenarios, committed **before** any results. | Hash committed |
| 6.2 | Sweep: 4 arms × 3 seeds × 3 rounds across 3–4 g6e boxes. | All runs finished |
| 6.3 | `adversary/cluster.py`: Spark names failure modes; θ-based clustering as the fallback. | The atlas has labelled clusters |

**Gate G6:** checkpoints and atlases from all 12 runs are on disk.

## P7: Demo product (D7, Nov 2). Overlaps P6 while the sweep runs.
| # | Task | Done when |
|---|---|---|
| 7.1 | `export/onnx.py`: Brax → ONNX. Parity test against JAX. | Max action diff < 1e-4 |
| 7.2 | `web/` attack page with server-rendered video (the core path). | Typing an attack plays the video |
| 7.3 | Rate limits (per-IP token bucket plus a global queue). Human failures are re-verified in MJX, then go into the pool. | A spam test is throttled; a human failure lands in the atlas |
| 7.4 | Deploy on Modal or AWS with a public URL. | Works from a phone |
| 7.5 | Virality: every attack gets a shareable clip page plus an "I broke the robot" / "it survived" share-to-X button. Hall of Fame of attacks that broke the robot. | A shared link shows the clip and the attack text |

**Gate G7:** public page live.

## P8: Evaluation and assets (D8, Nov 3)
| # | Task | Done when |
|---|---|---|
| 8.1 | Run the gauntlet, the cross-play matrix, and the human red-team set across all arms. | Results JSON |
| 8.2 | `experiments/analyze.py`: success, CVaR, nominal success, 95% CIs, equal-budget check. | Plots generated |
| 8.3 | Atlas page and dashboard in `web/`. | Linked from the attack page |
| 8.4 | Side-by-side videos: baseline vs Nemesis on the same scenarios. | 4–6 clips ready |
| 8.5 | Cinematic render mode: 1080p60, shadows/MSAA, hero and orbit cams, every-step slow-mo, **visible perturbations** (ice patch, payload box, force arrows, red-tinted weak legs, latency ghost). Remotion project in `video/` driven by results JSON. Built on D6–D7 while the sweep runs. | Every VIDEO_PLAN shot can be rendered from atlas records |

**Gate G8:** every number and clip the video needs exists.

## P9: Ship (D9, Nov 4)
| # | Task | Done when |
|---|---|---|
| 9.1 | Judge cut and 45 s X cut, following [VIDEO_PLAN.md](VIDEO_PLAN.md) (script, art direction, quality bar). Lock by 9 AM ET. | Uploaded; links tested while logged out |
| 9.2 | README: what was built during the hackathon, architecture, results table, how to run. | Repo is public |
| 9.3 | X post with the demo clip; link it in the submission (viral prize). | Posted |
| 9.4 | Submit on Cerebral Valley by **~noon ET**. Freeze. | Confirmation received |

---

## P10: Product features (decided Oct 27, after the science was finished)

This is a tech hackathon, so the product is the story. The benchmark is a one-line credibility note in the README, not the pitch. The rubric is Impact, Meta tooling, Technical depth and Demo. The Indie track is judged on "creativity, technical ambition, and whether it works". Bonus prizes: Viral, Open-weight, Agentic, Creative and Community vote.

| # | Feature | What it is | Serves | Done when |
|---|---|---|---|---|
| F1 | **Patch it** | After a break, one click fine-tunes the live robot on that attack: the attack's θ plus a jitter cloud, mixed with nominal and the community bank, for ~10–20M steps. It then re-runs the attack, and the robot survives. The new version must pass a regression gate (nominal walking + hand-written gauntlet no worse) before it goes live. Progress streams to the page. | Demo, depth | Break → patch → survive, in one take, in about 3 min on an L40S |
| F2 | **The robot learns from everyone** | Versioned robots (`v1, v2…`) with lineage, each trained on community attacks. Hall of Fame shows "broke v2 · survived since v3". Attack score = how subtle it was: higher for less force or deviation. Leaderboard. Auto-retrains every N new successful attacks. | Community vote, viral | Versions page, leaderboard, auto-retrain job |
| F3 | **Agent mode** | Wonder as a tool-calling agent (native `function_call`, verified on Oct 27). Tools: `test_attack` (CMA-ES over a program's ranges), `shrink`, `sweep` (safety margin), `watch` (Spark on the clip), `patch`, `verify`. Its reasoning trace streams live: hypothesis → test → refine → diagnose → fix → verify. | Best Agentic, depth, demo | "Let Nemesis attack" streams a full campaign in a few minutes |
| F4 | **Your world** | Upload a photo or short video of a place (stairs, wet tiles, gravel, a ramp). Spark estimates the surface, friction, slope and hazards; Wonder writes the attack program; the robot runs it. This simulates your environment, so no physical robot is needed. | Meta tooling (Spark vision), viral | Photo → scenario → clip with Spark's reading shown |
| F5 | **3D replay in the browser** | The server exports per-frame body poses plus a one-off mesh asset. three.js renders an orbit camera, a timeline scrubber, before/after robots side by side, and overlays (ice slab, push arrows, payload, tinted weak motors, a tilted floor for slopes). No browser physics, so there's no porting risk. | Demo quality, every video shot | Orbit/scrub replay of any attack; mp4 kept as fallback |
| F6 | **Red-team report** | A pentest-style report for a policy version: failure modes ranked by severity, and for each one the hypothesis, minimal counterexample, clip, Spark diagnosis and **safety margin** (bisection along the key parameter), before/after patch. Wonder writes the executive summary. HTML page plus Markdown. | Impact ("who benefits") | `/report/<version>` renders |
| F7 | **Humanoid** | A second robot from Playground (G1 or Berkeley Humanoid joystick). Generalize the θ layout to N feet and N joints, train a baseline on AWS, and add a robot picker on the page. | Viral, generality | A humanoid attack runs end to end on the page |
| F8 | **Fully open-weight mode** | `NEMESIS_OPEN=1`: Glimmer is the adversary/translator and Muse Spark Open does vision, both self-hosted (llama.cpp). One `docker compose up` gives an offline red team on one GPU. | Best open-weight build ($10k) | The whole loop runs with no Meta API key |

Architecture changes:
- `server/` is split into modules: `jobs.py` (background jobs + SSE event streams), `versions.py` (policy registry + regression gate), `traj.py` (3D export), `agent.py`, `world.py`, `report.py`.
- The frontend stays build-free: ES modules with three.js from a CDN via an import map. Each feature lives in its own file under `web/dist/js/`.

Deployment:
- one g5/g6e box with HTTPS, needed for the microphone and camera (Caddy + a domain, or a Cloudflare tunnel);
- it stays up through the community vote (announced Nov 16), about $1–2/h;
- the regression gate and rate limits guard against abuse.

Schedule:
- Oct 27–28: F1, F5, deploy.
- Oct 29–30: F3, F4.
- Oct 31: F2, F6.
- Nov 1: F7 and F8 (in parallel worktrees).
- Nov 2–3: video.
- Nov 4: ship.

## P11: Terrain (stairs and curbs), Oct 27

**Why:** "Can it handle my stairs?" is the most relatable scenario. It makes "Your world" photos of real steps convincing, and it gives the description-to-learning loop a visible, intuitive failure. It also tests the user's hypothesis that structured scenarios like stairs are where Muse beats random search (pre-registered as H-S in docs/PREREGISTRATION.md).

**Design:** K = 8 static **box geoms** added to the scene (MjSpec in `load_env`), repositioned per episode from θ.
- **Neutral:** the boxes are parked 10 m below the floor.
- **Stairs:** step i is a box rising from the ground to height (i+1)·h, from `start + i·depth` to the end of the run, along the start heading and 3 m wide. A curb is stairs with count = 1.
- **Why boxes:** MJX supports sphere–box, capsule–box and box–box collisions natively, and box poses are model fields, so each env in a batch gets its own stairs with no recompile and no heightfield memory (a heightfield per env at 8192 envs is GBs).

| # | Task | Done when |
|---|---|---|
| 11.1 | Add K boxes to the Go1 scene (contype/conaffinity like the floor); treat them as "floor" for the fall check (a body touching a step is a fall) and for foot contact | Neutral θ rollouts bit-identical to today; a box placed under the robot is stood on |
| 11.2 | θ slots appended in the padding: `stairs_height` (0–0.15 m), `stairs_depth` (0.2–0.6 m), `stairs_count` (0–8), `stairs_start` (0.5–3 m). Neutral = no stairs. Bump THETA_LAYOUT_VERSION; existing slot indices unchanged, so old atlases stay valid | Layout test updated; old θ vectors still compile and evaluate the same |
| 11.3 | `apply_model`: set geom_pos/size/quat for the K boxes in the start-heading frame (same convention as the ice patch) | Box-placement unit test; render shows the stairs where θ says |
| 11.4 | DSL ops `stairs` and `curb`; a random-program template for the baselines; a `terrain` family in modes and plausibility | DSL round trip; random programs sometimes produce stairs |
| 11.5 | Overlays (mp4 render) and `export.py` → the 3D replay draws the steps | Clip and replay both show stairs |
| 11.6 | Verify on `baseline_v2`: curbs of 2/4/6/8/10/12 cm and stairs of 3 × 6 cm; fall rates and clips | Table in LAB_NOTEBOOK |
| 11.7 | Training: add small random steps to base DR for future policies (optional); Patch should learn curbs it can physically climb | A patched robot climbs a curb that tripped v1 |
| 11.8 | H-S experiment (below) on AWS | Verdict in docs/results |

Go1 only for now; the G1 gets terrain later via the same registry hook.

## Stretch slots (pick up after the named gate, in priority order)
| Slot | Sub-steps | Est. | After | Serves |
|---|---|---|---|---|
| **S1 Glimmer adversary** | a) vLLM on a Modal H100 · b) JSON-schema structured output · c) add as a proposer, compare its hit-rate with Wonder's | 4–6 h | G3 | Open-weight prize |
| **S2 Browser sim** | a) load Go1 in `@mujoco/mujoco` · b) three.js render · c) ONNX policy loop (obs layout from sim2sim) · d) DSL → browser θ for the simple primitives · e) **6 h timebox** | 6 h | G7 | Community vote, viral |
| **S3 Voice attacks** | a) mic capture · b) Transcribe → attack text · c) UI | 2–3 h | G7 | Demo |
| **S4 Second skill** | a) compile handstand or slope-backward · b) run one Nemesis round on it | 4 h | G5 | Impact |
| **S5 Humanoid** | a) Playground G1/Berkeley baseline · b) θ layout for the humanoid · c) one Nemesis round | 1 day | G6 | Viral |
| **S6 SAM 3.1 real→sim** | a) phone video → SAM text-prompt masks · b) Spark estimates slope and material · c) build an hfield and friction scenario · d) test the policy | 6–8 h | G2 | Meta tooling, "real world" |
| **S7 GRPO Glimmer** | a) reward = plausible failure found · b) LoRA GRPO on Modal multi-H100 · c) fallback: one rejection-sampling SFT step | 1–2 days | S1 | Depth, open-weight |

**Cut order if behind:**
1. Stretch slots: S7 → S5 → S6 → S2 → S3.
2. Then within core: 5.2 multi-candidate loop (use the stock reward), then 6.3 Spark naming (θ clusters instead), then 2.4 terrain.

**Never cut:** arms (a) and (d), 3 seeds, the atlas (3.4), and the side-by-side videos (8.4).

## Compute
- **Local 4060:** P1.1, all unit tests, smoke runs, web dev.
- **AWS L40S:** P1.2, P4.4, P6.2, P8.1.
- **Modal:** S1, S7, optionally the demo server.
- **Budget:** about $300–350 AWS (+$150–450 if S7) and about $50–100 of Meta credit.

## Verification
- **`pytest`:**
  - neutral θ reproduces the unperturbed rollout exactly
  - DSL round-trips through compile
  - out-of-bounds programs are rejected
  - the sandbox rejects imports, attributes and IO
  - ONNX parity with JAX
- **Gates G0–G8:** each has an observable check (above). Record it in `PROGRESS.md` when it passes.
- **Final:** `analyze.py` shows per-arm env-step totals equal within 1%. The deployed attack returns video in under 30 s. A human-found failure appears in the atlas.
