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

## P12: Forward plan, Oct 27 → submission (approved Oct 27; status Oct 30)

Features 1–8 were picked by the user, with 10 as a stretch. Positioning: describe a situation → the robot faces it → it learns. Build until Nov 3, 3 PM IST; video until Nov 5, 3 AM IST; then submit.

### Status (Oct 30)
All of features 1–8 and the #10 stretch are built and live at nemesis.divagr.com (g4dn.xlarge, one T4, us-east-1). What remains is one situation for the cold open, filming, the edit and the submission.

**Features: done**
| # | Feature | Commits | Checked |
|---|---|---|---|
| 1 | Watch it learn: an attempt per 1M steps, streamed; early stop; 8M cap | 7816f94, 4c478b5 | Playground retrain: 11/16 → 4/16 → 2/16 falls, early stop at 2M, accepted as v14 |
| 2 | Route from a sentence: course physics/DSL, replay draws every segment, route line on Break it | b478396, 067d850, 7e28ab8 | Live route check, Oct 30 (below) |
| 3 | Live deployment (was "Places", then "Deploy it"; route `/deploy`, `/places` redirects), with Wonder's hardening pass | 8fcc1f1, 8b41485, 4458604, 7b0293c, c9547a4 | Station stair climb 100% → 0% after "Train it for this place" (notebook, Oct 27 late) |
| 4 | Safety map: Break it after a patch; per finding on the Readiness report | a9abd26, 76cbf7b | — |
| 5 | Spark explains what changed | 7816f94 | — |
| 6 | Share links (`/a/<id>`, OG cards, fall GIF) and vertical clips; X post text written as a challenge | 7c9f9d9, 388708e, a7b0604, c0c1795, 4367563 | — |
| 7 | Humanoid on the page: Go1 / Humanoid / Both toggle, warmed at startup | 7305727, 2036fe5 | ~25 s per run on the T4. A G1 retrain from the page is not built |
| 8 | Version changelog | 7816f94 | — |
| 10 | Playground: the live robot in the browser (MuJoCo WASM), drag to shove, "Teach it this shove" | f0b12c1, be76c85, a1927e7 | Live, Oct 28: a 150 N shove from the right fell v13; retrain stopped at 2M; v14 held the same shove 3/3 in the browser |

**Core and fixes: done**
| Item | Commits |
|---|---|
| 0.1 terrain; 0.2 H-S (NOT SUPPORTED); 0.3 humanoid test bound; 0.5 tagline | 7d8d34a, d9fe617, 76cbf7b, 8564c8a |
| 0.4 stable server: superseded by the always-on public box (`deploy.sh up`) | 3eb777a |
| Dark clips and cards; live Autopilot check (5 tries per investigation) | d431cf0, 7e28ab8 |
| Stairs replay fix: the replay holds the fall pose on stairs and ramps | c9547a4 |
| Uploaded clips deleted from Meta's Files API after use | 8cdd9d4 |

**Public-site hardening: done**
| Item | What | Commits | Done when (met) |
|---|---|---|---|
| Spend ledger | Every billed call logged with its price to `runs/spend.jsonl` | 98c08eb | Live: one attack logged at $0.044 |
| Per-visitor limits | Per minute and per 6 hours, charged before any paid call; `GET /api/limits` | 98c08eb | Live quota read 39 of 40 after one attack |
| $100 clamp | From $100 tracked spend: clamped limits, ≤ $2/h site-wide; no paid calls from $125; calm banner on the site | 98c08eb, fc90ca1 | `python -m nemesis.llm.ledger` prints the totals |
| Prompt caching | Cache hints on every Wonder call and Autopilot turn | c970809 | 7,782 of 7,826 input tokens cached; ~$0.044 → ~$0.012 per attack |
| Queue caps | 503 at 12 simulation jobs in flight; retrains 1 running + 2 waiting, duplicates join | c970809 | — |
| SAM 3.1 in the photo flow | Steps, puddles, icy ground, ramps outlined; steps numbered from the nearest; SAM's step count goes to Wonder; skipped in open-weight mode | 6c6cbe6, 21ef78a | Doorway photo: 3 steps found (0.77–0.89), Wonder built 3 steps |
| Live route check | "Out the front door, down three small steps, across an icy driveway, then up a gentle ramp to the street" | 7e2ffb7 (notebook) | Full course built; original fell 75%, v14 held (0%) |
| Moderation | Visitor text and handles checked once by Spark; public lists fail closed | 5a2316d | — |
| Backups, watchdog, Nov 17 stop | Daily snapshots (keep 7); watchdog timer; EventBridge stop at 2026-11-17 18:00 UTC plus an on-box timer at 18:05 | 9a35662 | — |

**Not done, off the critical path:** the 0.6 mobile pass at 390 px (no record of it); Spark judging duel rounds (optional); a G1 retrain from the page.

### Left
| # | Task | Done when |
|---|---|---|
| L1 | **Cold-open stairs situation** (being tested). Candidates on v14: "3 × 5 cm wet steps + a 4 kg backpack", "3 × 6 cm wet steps" | Live robot falls ≥ 50%, the retrain holds within 8M steps, the gate accepts |
| L2 | **Filming box:** an L40S for real-time retraining, same build as the site | A retrain finishes on camera in about a minute |
| L3 | **Dry run** of every VIDEO_PLAN beat | Each beat recorded once; fixes listed |
| L4 | **Real photos:** 3–4 places (porch steps, wet tiles, a ramp) | SAM counts the steps correctly on each |
| L5 | **Glimmer open-weight terminal shot** | `NEMESIS_OPEN=1`, no API key, the loop running on one GPU, recorded |
| L6 | **Video edit:** judge cut and X cut | Judge cut ≤ 2:59, unlisted on YouTube, link tested logged-out |
| L7 | **README GIFs** and **thumbnail** | Three GIFs in the README; thumbnail uploaded |
| L8 | **Repo public, X post, submission** | Repo public; post live; confirmation received |

### Hard constraints
- θ stays **D = 80**. The critic's input includes θ, so changing D breaks every checkpoint. Go1 uses 63 slots, and terrain adds ~4, leaving ~13 free. New slots are appended in the padding with neutral = 0, then `THETA_LAYOUT_VERSION` is bumped.
- Normal Go1 rollouts must stay bit-identical after any physics change; the audit's `compare_rollouts.py`/`diff_rollouts.py` probe is the check.
- Subagents get disjoint file sets. Only the lead edits `server/app.py` and `web/src/pages/Lab.tsx`. Commit with explicit paths, never `-A`.
- The PC server runs from a background SSH session and dies when the connection drops. The scheduled task needs the user's approval; otherwise stability work moves to the L40S box (0.4).

---

### 0. Leftover core work (today + Oct 28 AM, ~1 day, mostly parallel)
| # | Task | Done when |
|---|---|---|
| 0.1 | Terrain agent lands. Then: verify the bit-identity numbers and the curb/stairs fall table, check that the replay draws `overlays.terrain`, and merge | Clips in `runs/terrain_clips/`; stairs render in the replay; tests pass |
| 0.2 | **H-S run** (pre-registered, `dc9344c`): `widesweep_jobs.py S 3` on 3 L40S/A10G boxes with `fleet.sh`. Analyze with `analyze_wide.py`. Notebook + README line | Verdict in `docs/results/wide.md`; boxes stopped |
| 0.3 | Fix the pre-existing failure in `tests/test_robots.py::test_humanoid_wrapper` (pelvis 0.077 vs 0.1 bound), or justify the bound | Full suite green on the PC |
| 0.4 | Stable dev server: a scheduled task on the PC (ask the user), **or** move the dev server to the L40S box with `deploy.sh up` and no public DNS yet | Survives an SSH drop |
| 0.5 | Tagline: user picks from the calm list → Lab hero; README headline and VIDEO_PLAN updated to the positioning | Copy consistent everywhere |
| 0.6 | Polish debt: a mobile pass on all four pages with real phone emulation (CDP device metrics, not a small window); Hall of Fame / agent clips in dark style (`render.py` dark scene, or replay thumbnails); verify the Agent chat view with a live run | Screenshots at 390 px and 1536 px look right |

### 1–8. New features
Each lists its design, the existing code it reuses, and what's done.

### 1. Watch it learn (Patch timelapse), Oct 28, ~6 h
- **Worker:** `server/patch_worker.py` trains with `num_evals=6` and `num_eval_envs=16`. `ppo.train` already saves a checkpoint per eval through `save_ckpt` (the `policy_params_fn` hook).
- **Snapshots:** in the gate phase, the existing `Evaluator` (built for the gate) records a 1-seed rollout of the attack for each checkpoint. The seed is the one where the parent falls. Each rollout is exported with `nemesis/sim/export.trajectory`, and the worker emits `EVENT timelapse {snapshots:[{pct, fell, traj}]}`, relayed by `run_patch` in `app.py`.
- **UI:** `PatchPanel` / `PatchInline` show an attempt strip ("attempt 1 … 5", fell / held). Clicking one plays it in the main `Replay`; it autoplays through the attempts in order.
- **Done when:** an accepted patch shows ≥4 attempts that go from fall to hold.

### 5. Spark explains what it learned, Oct 28, ~3 h
- After an accepted patch, compute gait metrics from the parent and new trajectories: stance width, trunk height, step frequency, time to fall.
- Send the tiled before/after mp4 (from `simulate`) plus those numbers to Spark with a schema (`nemesis/adversary/observe.py` pattern, `client.video_item`), and emit `learned {sentence}`.
- One line under "Live", labelled Muse Spark.
- **Done when:** the sentence cites at least one measured number.

### 8. Version changelog, Oct 28, ~2 h
- In `Versions.add` (`server/versions.py`), Wonder writes `{learned, still_cant}` from the gate suites, the attack texts and the retest statuses.
- Stored in `versions.json`; shown in the Lab lineage and on the Report.
- **Done when:** every new version has two lines.

### 7. Same situation, two robots (humanoid on the site), Oct 28–29, ~6 h (agent; server parts by lead)
- **Server:** per-robot `sim()` state (evaluator, v1, live, reference) keyed by robot. The G1 policy is `runs/g1_baseline`, which also serves as its reference.
  - `translate` uses `C.layout(robot)` slots and `dsl.json_schema(robot)` with a G1 robot description.
  - `simulate`/`overlays`/`export` get `robot=`, plus a `g1_scene.json` asset from `export.scene_assets`.
  - `versions` per robot (separate lineage dirs). `patch_worker --robot`.
- **UI:** a robot toggle (Go1 / G1 / both) in the Break it hero. "Both" runs one sentence on each robot and shows two Replays side by side. `Replay` gets an `assetsUrl` prop per robot.
- **Done when:** "a hard shove from the left" shows the Go1 holding and the G1 falling (or the reverse), and a G1 patch completes.

### 4. Safety envelope map, Oct 29, ~4 h
- `/api/envelope {attack_id, versions:[a,b]}`: take the top-2 dominant slots (generalize `report.dominant_slot` to return a ranked list) and run an 11 × 11 grid × 16 seeds per version in one batched `ev()` call.
- Returns fall-rate grids. A `Heatmap` component draws them (SVG, ember = falls).
- Shown in Break it after a patch (before vs after) and per finding on the Report, with a "safe for μ ≥ … and pushes ≤ …" line.
- **Done when:** the red region visibly shrinks after an accepted patch.

### 2. Tell it where it's going (a route from a sentence), Oct 29–30, ~10 h (agent for the physics, lead for the UI)
- **Slots** (fits the 13-slot budget): build on the terrain agent's stairs. Add a **ramp** (`ramp_angle`, `ramp_start`, `ramp_length`: one tilted box, quat from θ), a **second ice patch** (`ice2_mu`, `ice2_start`, `ice2_length`) and a **descent** (`stairs_landing` > 0 ⇒ the flight goes down again after a landing). K grows to ~10 boxes if needed.
- **DSL:** a `course` op with an ordered list of segments, each `{kind: stairs_up | stairs_down | curb | ramp | ice | wet}` with a length or height and a start distance accumulated along the heading. It compiles to the slots above, and Wonder's prompt gets the segment vocabulary.
- **Physics checks:** the same bit-identity rule.
- **Overlays/export:** `overlays.terrain` gains `ramps` and `ice` lists. `replay.js` draws a sloped box and multiple ice slabs.
- **UI:** in Break it, a course sentence shows a small segment legend under the replay ("steps · ice · ramp"), and the HUD chip marks where it fell.
- **Done when:** "out the door, down three small steps, across an icy driveway, up a ramp" builds a visible course, the robot fails at one segment, and a patch gets it further or all the way. "Physics wins" stays honest for impossible step heights; the 0.1 fall table sets the realistic range.

### 3. Deployment brief (describe a place → risk grid → train for it), Oct 30, ~7 h
- `/api/brief {place, robot}`: Wonder (`proposer.propose`-style prompt with fixed values; world.py's rule of only pushes when people/pets/traffic) writes 8–12 named scenarios.
- Batch-evaluate them on v1 and live (8 seeds), export a trajectory for each, then Spark labels the worst three.
- "Train it for this place" runs `run_patch` on the top learnable, survivable scenarios. Raise the cap from 3 to 5, then fall back by learnability if the gate fails. After the patch, re-run the grid.
- Stored in `runs/serve/briefs/<id>.json`. The Report takes `?brief=<id>` for a deployment header.
- **New page `/places`:** a "Where will it work?" input, a scenario grid (name, fall squares before → after), click to replay, and the envelope map from #4 for the worst scenario.
- The Agent can be seeded with a brief (Fable's #11, optional, ~2 h).
- **Done when:** "a hospital with polished corridors and carts" produces a grid, a patch, and a re-graded grid.

### 6. Shareable clips and link previews, Oct 30–31, ~5 h
- **Server route `/a/<id>`:** an HTML shell with OG/Twitter tags (`summary_large_image`). The image is a PNG frame at the fall moment, extracted from the attack mp4 with ffmpeg and cached. The SPA then loads the attack by id: Lab reads `?a=` or the route param and fetches `/api/attack/<id>` (new GET).
- **Vertical 9:16 lesson clip** (ffmpeg composite): the sentence as a caption, then the fall (parent), the timelapse attempts from #1, then the hold (new version), with the lineage label. A "Share" button gives an X intent with the `/a/<id>` URL, plus a download.
- **Done when:** pasting `/a/<id>` into an X composer shows the card, and the vertical clip plays on a phone.

### 10. Playground: shove the live robot in your browser (Oct 28, done)
The live robot walks in your browser in real time: MuJoCo compiled to WebAssembly runs the exact model it trains on, and its policy runs in plain JS. Drag to shove it, steer it, switch between the original and the latest version. If your shove knocks it over, "Teach it this shove" replays the shove on the server, the usual Patch retrains it, and the new version loads straight back into the page: shove it again. The same loop as Break it, with your hands instead of words. Page `/playground`, nav "Playground" (third, after You vs Muse).

**Phase 0, de-risk: done, all green (Oct 28).**
- **Exact model:** npm `@mujoco/mujoco` 3.17.0 = the Python bindings' 3.17.0, so the browser loads load_env's compiled Go1 as a binary `.mjb` (body collisions, feet with their own contact, terrain boxes parked, Playground's PD gains and timestep). The visual meshes and textures are stripped (49 MB → 55 KB, 6 KB gzipped); they never collide and the bodies have explicit inertia, and a shoved rollout is bit-identical on both models (`tests/test_play.py`).
- **Policy:** the actor (144 → 512 → 256 → 128 → 24, swish, tanh of the mean) plus the observation normalizer as a flat float32 binary, 0.97 MB per version. numpy forward vs Brax's own inference fn: max |diff| 7.7e-7 (v1), 9.4e-7 (v7).
- **sim2sim on plain C MuJoCo** (the engine the browser runs), `nemesis/export/play.py` Stepper: v1 and v7 both walk 10 s at 1 m/s from 10 headings with 0 falls (0.94-0.96 m/s), with and without sensor noise.
- **Shoves on plain MuJoCo** (8 headings each): v1 falls from 150 N side shoves held 0.2 s (6/8) and always from 0.4 s; v7 holds 250 N for 0.2 s sideways (0/8). So training carries over to the browser. The browser robot is sturdier than MJX (a 150 N / 0.15 s shove fells v1 1/8 here vs 50-75% on MJX), which is the safe direction: a shove that fells it in the browser fells it on the server too.
- **JS port** (`web/src/lib/playcore.js`) vs the Python Stepper on node: 2e-7 m apart over 50 walking steps, 1e-4 after a fall (float32 vs float64 dot products, amplified by the fall). 1,856 control steps/s on node: 37x real time.

**Phase 1: server (`server/play.py`, a router like brief/share).**
- `GET /api/play/info`: the model metadata (sensor addresses, default pose, dt, fall thresholds), the live version, the original (v1).
- `GET /api/play/go1.mjb`: the stripped model, exported once into `<serve dir>/play/` (the server's own MuJoCo writes it, so it always matches the box's version).
- `GET /api/play/policy/<version>.bin`: each version's actor, exported once and cached (immutable).
- `POST /api/play/shove {force_x, force_y, duration, command}`: the shove in the robot's heading frame, clamped to the training envelope (≤ 150 N per axis, ≤ 0.5 s; the same caps the DSL has). Becomes a DSL program (command + one push at 2 s), runs as a streamed job through `log_attack` (`source="play"`): original vs live on the evaluator's seeds, a server replay, the fall rates. Kept out of the Hall of Fame, leaderboard and community retrain like `brief`.
- Training reuses `POST /api/patch {attack_id}` unchanged (same gates: live must fall ≥ 50%, survivable).

**Phase 2: the stage (`web/src/lib/play.js`).**
- Loads the WASM (dynamic import, its own chunk, 2.7 MB gzipped, only on this page), the model, the info and a policy; one `Stepper` on the main thread (a control step costs < 1 ms).
- Fixed-step loop: real time accumulator at 50 Hz, at most 4 control steps per frame; if the device can't keep up it runs in slow motion and says so ("0.5x").
- Renders with the replay's look (`replay.js` exports its helpers: scene assets, materials, grid floor, arrow, CSS): body poses from `data.xpos/xquat` each frame, a chase camera, the floor recentred under the robot.
- **Shove:** press and drag anywhere on the stage; the drag on the ground plane sets direction and strength (150 N at full stretch), held while you hold, up to 0.5 s (the trainable range); a red arrow pushes into the trunk while it acts. Quick buttons for phones: from the left, from the right, from behind (150 N, 0.3 s).
- **Steer:** arrow keys / WASD (forward 0-1.5 m/s, turn ±1.2 rad/s); a Walk/Stop button. Default: walking forward at 1 m/s.
- **Fall:** the wrapper's check; the stage dims, "It fell" with your shove in words (peak and mean force, from which side, how long, what it was doing). Reset puts it back on its feet.
- Version toggle: Original (v1) / Latest (vN), so you can feel the difference.

**Phase 3: teach it (`web/src/pages/Playground.tsx`).**
- After a fall: "Teach it this shove" posts the shove; the steps stream; then the server's verdict with its replay (original vs live, same seeds). If the live version falls there too: "Train it to survive this" (the existing PatchPanel: attempts, gate). On accept the new policy loads into the stage: "v14 is live. Shove it again."
- If the server's robot holds (the browser robot fell, MJX's didn't): say so plainly and suggest a harder shove; no training.

**Phase 4: polish.**
- Loading state with progress (WASM, model, policy); WebGL/WASM unsupported message.
- Break it hero link: "or shove it yourself".
- README row, notebook entry, VIDEO_PLAN beat (a 10 s shove-learn-shove clip), memory.

**Verification.** `tests/test_play.py` (stripping, policy round-trip, numpy vs Brax, walking, JS vs Python when node is present); headless Chrome on the live site: the page loads, the robot walks (trunk x increases), a scripted shove fells v1 and not the latest; one full teach loop on the box (shove → patch → new policy loads).

**Risks:** phone performance (WASM + policy is cheap; the renderer is the same as the replay's); the server's MJX disagreeing with the browser (handled in the copy); a Patch on a shove can be rejected by the gate (the PatchPanel already explains rejections).

### Unscheduled backlog (not picked; only if everything above is green)
- Fable's big swing A, **reproduce a real fall from video** (de-risk: Spark on 3 real clips).
- Big swing B, **bring your own policy / `nemesis check` CLI** (de-risk: Playground's stock Go1 checkpoint through the evaluator).
- Teach a new skill in words (old S4 / skill compiler).
- Glimmer LoRA distillation (old S7).
- Multilingual voice attacks.

The old stretches S1 (Glimmer), S3 (voice) and S5 (humanoid) are done or folded into #7, and S6 is subsumed by Your world.

---

### Schedule (IST)
| When | Task |
|---|---|
| Done (Oct 27–30) | Features 1–8, #10 Playground, public-site hardening (see Status) |
| Now → Nov 3, 3 PM | L1 cold-open situation; L2–L5 filming (L40S box, dry run, real photos, Glimmer shot); fixes from the dry run. **Build freeze Nov 3, 3 PM** |
| Nov 3, 3 PM → Nov 5, 3 AM | L6 video edit, L7 README GIFs and thumbnail |
| By Nov 5, 7:30 AM | L8 repo public, X post, submission. Official deadline: **Nov 4, 9 PM ET (Nov 5, 7:30 AM IST)** |
| Nov 5 → Nov 16 | The site stays up through the community vote (closes Nov 16) |
| Nov 17, 23:30 | The box stops (EventBridge, 18:00 UTC; on-box timer at 18:05). To keep it up, see the notebook's Oct 29 entry |

### Files touched (representative)
- **Server:** `server/app.py` (lead only), `server/patch_worker.py` (#1, #5, #7), `server/versions.py` (#8, #7), new `server/brief.py` (#3), new `server/share.py` (#6), `server/report.py` (#4).
- **Physics:** `nemesis/perturb/{canonical,apply,dsl}.py`, `nemesis/envs/base.py`, `nemesis/sim/{overlays,export}.py` (#2, terrain), `nemesis/adversary/{modes,baselines}.py`.
- **Web:**
  - `web/src/pages/{Lab,Agent,Report}.tsx` and new `Places.tsx`
  - `web/src/components/{PatchPanel,PatchInline}.tsx` and new `Heatmap.tsx` / `Timelapse.tsx`
  - `web/src/lib/replay.js` (ramps, multi-ice)
- **Docs:** `PLAN.md` (P12 section mirroring this), `VIDEO_PLAN.md` (new arc), `docs/LAB_NOTEBOOK.md`, `README.md`.

### Verification
- **Physics changes (terrain, course):** neutral-θ Go1 rollouts bit-identical (audit probe); old θ vectors evaluate the same; full `pytest` on the PC CPU green; new tests per op (placement math, DSL round trip, export format).
- **Server features:** an API smoke script per feature against the dev server (curl + SSE follow, like this session's `t2`–`t5` scripts): the patch emits `timelapse` and `learned`; `/api/envelope` returns 11×11 grids; `/api/brief` returns scenarios and trains; `/a/<id>` serves OG tags.
- **UI:** headless Chrome screenshots at 1536×713 (the user's 125% scale), 1920×1080 and 390 px with device emulation, plus a real browser pass by the user through `localhost:8799`.
- **End to end:** the Oct 31 L40S run of every feature in sequence, timed: Patch ≤ 2 min, brief ≤ 3 min, and the agent investigation recorded.
- **Gates** in `PROGRESS.md` (G6 → new G9–G12 for features), notebook entries per feature with numbers.

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
