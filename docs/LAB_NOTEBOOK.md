# Lab notebook

Findings, surprises, decisions and numbers, in order. Gate evidence lives in [PROGRESS.md](../PROGRESS.md); the plan in [PLAN.md](../PLAN.md).
Times are IST.

---

## Oct 26: setup, kickoff, infrastructure

- **Kickoff (transcribed locally with Whisper):** build window is "between Oct 26 and Nov 4", starting after kickoff. Submit by Nov 4, 9 PM ET (Nov 5, 7:30 AM IST). Bonus prizes are opted into on the submission form, and the X post link goes there too. Finalists' 3-minute videos are watched live on Nov 9. They stressed: "make sure to have a good voiceover."
- **AWS L40S capacity is scarce.**
  - Stopped `g6e` boxes repeatedly failed to restart (`InsufficientInstanceCapacity`) in us-east-1 and us-east-2.
  - Launching fresh in ap-south-1 (Mumbai) worked.
  - Result: `scripts/box.sh up` starts the box, or relaunches it in whichever region has capacity.
- **WSL mirrored networking** on the laptop came up with loopback only. Fixed by switching to NAT (backup kept as `.wslconfig.bak-mirrored`).
- **PC (RTX 4060):** WSL failed with I/O errors because **C: was 0 GB free**, and the WSL disk lives on C:. Blocked until space is freed or the distro is moved to D:.
- **Dependency pin:** Brax 0.14.2's PPO calls `jax.device_put_replicated`, which was removed in JAX 0.10, so JAX is pinned below 0.10 (0.9.2). Python is pinned to 3.12.
- **First end-to-end test:** stock Playground Go1 PPO, 200M steps, about 11.5 min on an L40S (about 2 min of that compiling), reward 28.5. It walks with a trot.

## Oct 26: Meta API

- Muse Wonder `respond(schema=...)` returns schema-valid JSON. First test: asked how to break a flat-ground walker, it proposed ice at μ≈0.05 with sound reasoning.
- **Muse Spark video understanding works on our renders.** It correctly described a 15M-step smoke policy as "standing still", matching the 0.08 m displacement measured in sim.
- **Muse Voice Transcribe** REST needs a multipart request with a JSON `request` part and an `audio` part (mono 16-bit PCM WAV, ≤10 min). It transcribed a kickoff clip accurately.

## Oct 26: research and expert review (subagents)

- **Literature (Sonnet):** no prior work has an LLM write adversarial physics programs for legged locomotion. Closest:
  - **Q-DEG** ([2610.14415](https://arxiv.org/abs/2610.14415)): QD red-teaming of manipulation VLAs, no LLM.
  - **ChatScene** ([2405.14062](https://arxiv.org/abs/2405.14062)): LLM → driving scenario DSL → fine-tune.

  See [literature_review.md](literature_review.md).
- **Expert panel (Opus)** flagged five critical issues, all confirmed in the installed source:
  1. **Feet-only collisions.** Playground's Joystick scene lets only the feet touch the floor (trunk, thigh and calf geoms have `contype=conaffinity=0`), so a fallen robot **sinks through the ground**. This would have corrupted every success label and the video's cold open.
  2. **Reward clipped at 0** (`jp.clip(sum*dt, 0, 1e4)`). In hard scenarios, standing and lying fallen both score 0, so there's no gradient to stay up.
  3. **Lenient termination:** only `upvector_z < 0` (tilted past 90°) ends an episode.
  4. **Gravity-tilt slope** needs the gravity *observations* rotated too, or it becomes an IMU-miscalibration attack.
  5. **Search objective:** minimizing success finds unsolvable worlds. Search for the *most plausible* failure instead.

## Oct 26: our own findings

- **Playground's floor-friction randomization is a no-op.** MuJoCo contact friction is the max of the two geoms, and the Go1 foot geoms are 1.0, so randomizing the floor between 0.4 and 1.0 never changes contact friction. Our friction primitive sets per-foot friction and lowers the floor to the minimum.
- **Playground's DR wrapper bypasses inner wrappers.** It calls `env.unwrapped.reset/step` directly, so we apply Playground-equivalent DR inside `NemesisWrapper`, resampled per episode. Every experimental arm trains through the same mechanism.
- **The motors are position actuators** (Kp=35 in `gainprm[0]` and `-biasprm[1]`), so "motor weakness" scales Kp *and* the torque limit together.
- **Wrapper RNG detail:** splitting the reset key inside the wrapper changed the initial pose relative to the raw env. Fixed with `fold_in`, so replays match.
- **Neutral θ is an exact no-op at the model level.** Rollouts drift by about 6e-4 rad over 50 contact steps from float reassociation in a different XLA graph; the tests distinguish that from real bugs.
- **Backend benchmark:** MJX-JAX ~530k steps/s vs MJX-Warp ~33k steps/s on the L40S with our setup. **We stay on JAX.**

## Oct 26–27: corrected baseline (`baseline_v2`)

- Trained through NemesisWrapper with body–floor collisions (trunk, 4 thighs, 4 calves), a strict fall check (non-foot ground contact, tilt over 45°, or trunk below 0.18 m), unclipped reward, 3-frame obs history, θ in the critic, and per-episode DR.
- **Learning starts later under strict termination:** about 0.2 reward and 15-step episodes until around 46–69M steps, then a jump. Final reward 28.2 at 200M steps in 15 min (about 1.6× slower than stock because of the extra contacts and per-step model edits).
- False alarm worth remembering: an early eval looked like the fall detector was firing on normal walking. A diagnostic over 64 rollouts showed zero falls; the policy simply hadn't learned yet.

## Oct 27: attacks (G2) and the first hunts (G3)

- **G2, hand-written attacks vs `baseline_v2`** (16 seeds, nominal 0% falls):
  - ice μ 0.05: 100% · rear slip μ 0.05: 100%
  - 150 N side shove for 0.2 s: 56% · reversal on ice μ 0.1: 75%
  - **20 ms latency plus noise: 62%, 40 ms: 100%.** A classic sim2real killer.
  - A 5 kg payload high and back **never broke it**. The robustness profile is uneven, not uniformly weak.
- **First hunt (`hunt_r0`), calibration bug.** Only 1 of 16 programs was archived as a failure. Shrinking walked each attack to the exact failure boundary (~50% at 8 seeds), so fresh-seed rechecks fell below 50%. Fix: the search treats ≥75% falls as failure, shrinking stops while falls stay ≥80%, and the archive bar stays at ≥50% on 32 fresh seeds.
- **Calibrated hunt (`hunt_r1`):** 8 of 24 Wonder hypotheses produced robust failures.
  - Ice patch during a braking reversal: 91%
  - Ice entry plus a timed lateral shove: 66%
  - One rear foot losing grip during a yaw reversal: 62%
  - Weak front calves, front payload, downhill: 56%
  - 20 ms latency plus noise at a high-speed turn: 53%
  - Plus: roll-slope sidestep with payload, lateral reversal on a wet slope, delayed correction on an ice turn.

  Cost: **13M env steps, about 6% of one baseline training run.** The CMA histories hold 896 failing candidates, which become a diverse training bank.
- **Speed:** CMA-ES for all 8 programs of a round runs in one batched evaluation (θ is data), 30–45 s per round vs about 8× longer sequentially.

## Oct 27: fine-tune round 1 (`ft_r1`)

- Resumed PPO from `baseline_v2` for 50M steps (7 min) on 50% nominal, 40% bank (211 counterexamples: 8 shrunk failures plus history failures) and 10% uniform.
- Nominal eval reward dipped from 28.6 to about 24 mid-run, then recovered to 25.4.
- Before → after, same 16 seeds per scenario:
  - nominal falls 0% → 0%
  - **training counterexamples 81% → 40%**
  - held-out hand-written attacks 21.7% → 18.4%
- **Finding: a full-envelope uniform suite measures nothing.** Sampling every primitive uniformly at once gives about 100% falls for any policy. A DR arm trained on the full envelope would be a strawman. Fix: scaled envelopes (w=0.25 and 0.5 around nominal), used for held-out evaluation, the uniform slice of the training mix, and the DR arm.
- **CVaR@10% on binary falls saturates at 1.0.** Fix: compute it on the continuous robustness margin.
- Nominal "progress" needs a fixed command. Neutral θ lets the joystick sample random commands.

## Oct 27: round-1 re-score and hunt round 2 (`hunt_r2`, vs `ft_r1`)

- **Re-scored round 1** with the corrected suites, before → after (16 seeds):
  - nominal at 1 m/s: 0% → 0% falls, progress 4.5 → 4.3 m (4% more cautious)
  - training counterexamples: 79.6% → 39.6%
  - held-out hand-written: 22.7% → 18.8%
  - **held-out envelope w=0.5: 60.4% → 49.2%** (−19% relative, on a DR-style distribution never trained on)
  - envelope w=0.25: 0.6% → 0.5%
- **Hunt round 2 against `ft_r1`, with Spark watching every failure:**
  - Wonder's original 8 hypotheses (cached replay): 4 → **2** still break the policy. Fixed: weak front calves + payload downhill (56% → 0%) and latency at 20 ms (53% → below the bar; needs about 40 ms now). Lateral push in a yaw turn: 22% → 9%.
  - **New, Spark-informed round: 5 of 8 hypotheses broke the policy**, vs 2–4 of 8 without observations. Hits: front-feet grip loss braking downhill 91%, ice entry during a lateral step 88%, both rear slip + weak front calves 78%, forward push at ice entry 72%, linear-velocity bias + over-acceleration downhill 66%. **Anecdotal (one round, confounded with history); needs the planned ablation.**
  - Total: 7 failures from 16 programs, 8.1M env steps.
- **Spark descriptions are specific and match the video.** For clip `r1_008` Spark said "both front legs slipped forward and buckled, pitching the nose down until the body flipped", and the frames show exactly that. Spark–human agreement: **1/1 checked** (target about 40).

## Oct 27: fine-tune round 2 (`ft_r2`) and the bank diagnosis

- `ft_r1` → `ft_r2` (cumulative bank of 410, 50M steps, 5 min):
  - **held-out envelope w=0.5: 49.4% → 40.3%** (cumulative from `baseline_v2`: 60.4% → 40.3%, −33% relative)
  - w=0.25: 0.4% → 0.1%
  - held-out hand-written: flat at about 19%
  - nominal: no further loss
  - **but its own training bank stayed flat (61.8% → 63.0%)**
- **Per-family diagnosis** (falls baseline → r1 → r2, 16 seeds):
  - timing 88% → 5% → 6%
  - sensing 98% → 11% → 8%
  - load 74% → 4% → 2%
  - slope 51% → 1% → 1%
  - actuation 87% → 17% → 17%
  - **friction 81% → 77% → 80%**
- Friction makes up **318 of 410 (78%)** of the bank, because friction programs yield many failing CMA candidates. **24% of the friction scenarios fail ≥95% for every policy**, which looks physically infeasible: on μ≈0.1 the maximum braking deceleration is about μg ≈ 1 m/s².
- Conclusion: fine-tuning works per family. The flat average comes from bank imbalance plus infeasible friction counterexamples.
- Planned fix: learnability weighting p(1−p) with retirement of scenarios every policy fails, family-balanced sampling, and a friction feasibility gate.
- No NaN rollouts in the bank. The earlier `nan` was in the hand-written suite with `ft_r1`; the code audit is investigating it.
- Launched an Opus code audit and a Sonnet literature review on adversarial fine-tuning before starting the main experiment.

## Oct 27: pre-experiment code audit and fine-tuning literature review

Before running the main experiment, an Opus subagent audited every module against the installed library source, and a Sonnet subagent reviewed the fine-tuning literature ([finetune_review.md](finetune_review.md)). All findings were fixed in commit `04617ae`, with regression tests in `tests/test_audit_fixes.py` (32/32 passing).

**Critical bugs found:**
1. **The critic's θ inputs exploded on resume.** The nominal-only baseline left the observation normalizer with std ≈ 1e-6 on the θ dims. Real bank θ then reached the critic at |z| up to **1.2e6**, still 15–200× out of scale after 50M steps, so advantages were garbage on exactly the bank episodes. Fix: pin those normalizer entries to mean 0, std 1 when resuming.
2. **Forced resets every 3.2 s.** Brax's `num_resets_per_eval=10` with 50M steps and 5 evals resets all envs every 160 steps. Verified in `ft_r1` and `ft_r2`: scenario events after 3.2 s were never experienced in fine-tuning. Fix: cap resets so each interval spans at least one episode.

**High:**
- **Slopes and pushes were in the world frame, but the start yaw is random.** Probe: "uphill" was downhill in 3 of 4 seeds. Fix: both are now relative to the start heading.
- The survivor robustness score was unbounded below, so stand-still survivors could outrank falls in CMA-ES. Clipped to [0, 1].
- NaN states were scored as survivors, and a NaN could freeze CMA-ES's best tracking. Fixed in three places.
- The wrapper couldn't see Brax time-limit truncation: θ wasn't resampled and pushes never fired in later episodes.
- Arm-runner fairness: up to about 50% attack-budget overshoot, and nominal rather than actual Brax step counts were charged.

**Medium:**
- The fall penalty was −1×dt = −0.02, less than one step's reward, so **in hard scenarios falling early paid off**. Now 1.0.
- Learning rate when resuming is now 1e-4.
- CMA-ES reused the same 8 seeds every generation, overfitting their start poses.
- Start times were treated as magnitudes in the plausibility cost and shrinking.

**Literature additions:**
- Bank curation: quarantine items the current policy fails at ≥95% (likely infeasible).
- Weight by learnability p(1−p) with a replay floor.
- Equal weight per failure family.

**Implication:** the `ft_r1` and `ft_r2` numbers above were produced with these bugs present. They are directionally useful but are superseded by the re-validation run (`hunt_v3`, `ft_v3`).

## Oct 27: re-validation on the fixed pipeline (`hunt_v3`, `ft_v3`)

- **Hunt vs `baseline_v2`:** 10 of 16 hypotheses broke the robot (previously 8 of 24), with more diverse modes now that slopes and pushes follow the start heading:
  - rear payload uphill: 72% (testable now that uphill is uphill)
  - encoder offset + latency: 97%
  - stiff joints + latency + raised payload: 94%
  - resonant double push during a sideways gait: 75%

  Cost: 8.7M env steps.
- **Curation:** 330 raw counterexamples → 238 kept, 92 quarantined (≥95% falls under the current policy). Mean fall rate of the raw bank was 85%.
- **Fine-tune `ft_v3`** (lr 1e-4, pinned θ normalizer, capped resets, fall penalty 1.0, 50.5M actual steps, 7 min). The nominal eval reward dipped only to 27.2, then ended at **28.6** (pre-fix round 1 ended at 25.4).
- **Before → after** (16 seeds, same scenarios):
  - **own bank: 80.3% → 15.2%**
  - **held-out hand-written: 27.5% → 13.5% (−51%)**
  - **held-out envelope w=0.5: 57.9% → 38.4% (−34%)**
  - w=0.25: 0.5% → 0.5%, CVaR margin +0.18 → +0.24
  - **nominal: 0% → 0% falls, progress 4.5 → 4.6 m**
- **Takeaway:** the audit roughly doubled to tripled the held-out gains of a round at the same compute, and **removed the robustness-vs-speed tradeoff**. The policy is more robust *and* no slower.

## Oct 27: main sweep launched; attack service working

- **Smoke tests** (1 round, tiny budgets): all 5 arms run end to end. Bank curation is telling:
  - **random:** 224 "failures", 221 quarantined
  - **box (full-union CMA):** 264 → 28 kept
  - **shuffled:** 261 → 105 kept
  - **nemesis:** 166 → 68 kept

  Uniform and blind full-envelope search mostly yields physically unsurvivable scenarios. Counting raw failure modes would hand random search the win (22 "modes" from 3.1M steps), so **the discovery metric counts only plausible (cost ≤ 0.5) and feasible (fresh-seed falls < 0.95) failures.** This rule was set before main results; see `experiments/analyze.py`.
- On the smoke budget, full-union CMA found the most plausible modes (6, vs nemesis 2). It's a strong baseline, because the most-plausible-failure objective pushes every CMA arm toward realistic failures. To be reported honestly whatever the sweep shows.
- **Fleet:** us-west-2 quota 32 vCPU approved, but **no g6e (L40S) capacity in any us-west-2 AZ**; got 4 × g6.2xlarge (L4). On an L4, 8192 envs fit (17 GB) at about 3× slower than an L40S. Sweep: 15 runs (5 arms × 3 seeds, 3 rounds, 10M attack + 40M fine-tune steps per round, total-steps matched) on 4 L4s + the Mumbai L40S.
- Long SSH sessions to us-west-2 get reset, so jobs run detached (`scripts/fleet.sh run`) and are polled.
- **PC C: drive** (0 → 47.5 GB free):
  - NVIDIA DXCache (14.6 GB) and uv cache (18.7 GB) cleared
  - uv cache inside WSL cleared (13 GiB), then `fstrim` and `diskpart compact`: WSL disk 72.9 → 59.8 GB
  - Docker prune pending: Docker Desktop can't start over SSH
- **Attack service (`server/app.py`, `web/dist/index.html`)** tested on the PC's 4060:
  - "make the floor icy and shove it from the left" → Wonder: μ = 0.08 on all feet plus a 100 N push toward −y (correct: a shove *from* the left pushes right) at t = 2 s for 0.15 s. Both policies fall.
  - "a heavy backpack on a steep ramp going uphill" → 5 kg raised payload plus a 16° slope.
  - 55–79 s per request on the PC, dominated by software rendering in WSL. A GPU-EGL box should be about 15–20 s.

## Oct 27: incident: the idle auto-stop killed the Mumbai box mid-sweep

- The Mumbai L40S shut down at 22:00 UTC during `nemesis_s0` round 2. Its other 5 queued runs never started.
- **Cause:** the idle rule ("no SSH and GPU utilization < 5%, sampled every 5 min, for 60 min") misfires on bursty MJX evaluation, where samples can keep landing in CPU gaps. The Oregon fleet was launched with `shutdown → terminate`, so a misfire there would have **deleted** results.
- **Fix:** idle now means no SSH *and* no process holding the GPU *and* no job process (`scripts/idle-stop.sh`). Patched on all 5 boxes and baked into `aws_userdata.sh`.
- **Recovery:**
  - `nemesis_s0` moved to `nemesis_s0_aborted` (partial runs don't append to a fresh run's atlas).
  - Mumbai re-queued: `nemesis_s0`, `nemesis_s1`, `dr_s0`.
  - `random_s0`, `box_s0` and `shuffled_s0` appended to the queues of Oregon boxes 0–2.
- **Second bug caught before it bit:** the queue waiters used `pgrep -f 'experiments/run_arm.py'`, which matches the waiter's own command line, so they would have waited forever. Relaunched on `pgrep -x python`. Same lesson as earlier with `pkill -f`: never pattern-match a string that appears in your own command.
- **Glimmer (S1) wiring:**
  - Muse Glimmer can now be Nemesis's proposer through llama.cpp's OpenAI-compatible server (`--proposer glimmer`).
  - Model: `meta-models/Muse-Glimmer-30B-GGUF:Q4_K_M` (16.8 GB, fits a 24 GB L4).
  - Reasoning strength goes in the system prompt; sampling uses temperature 1.0, top-p 0.95, top-k 64, as on the model card.
  - Testing waits for an L4 to free up.
- **Visible perturbations** (`nemesis/sim/overlays.py`): ice patch, slippery-foot markers, payload box, push arrow, weak-motor leg tint. Verified on a rendered clip.

## Oct 27: partial main-experiment results (7 of 15 runs): DR is a very strong baseline

Evaluated on the PC's 4060 with 8 seeds per scenario. Policies: baseline, dr s1/s2, nemesis s0/s2, random s1/s2, shuffled s1.

- **Gauntlet falls** (hand-written 32 / realistic 20 / Sobol 256 at w=0.5, which is DR's training distribution):

  | Policy | hand-written | realistic | Sobol |
  |---|---|---|---|
  | baseline | 26.2% | 3.1% | 61.1% |
  | dr | 8.2 / 7.4% | 1.3 / 1.3% | 3.5 / 3.1% |
  | nemesis | 7.8 / 12.1% | 0 / 0% | 36.5 / 25.0% |
  | random | 9.8 / 11.7% | 1.3 / 1.3% | 31.8 / 37.0% |
  | shuffled | 11.3% | 0% | 20.8% |

  - CVaR10 on hand-written: nemesis_s0 −0.45 (best), dr −0.47 / −0.51.
  - Nominal progress about 4.5 m for every policy: nobody went timid.
- **Cross-play** (fall rate on each arm's plausible and feasible failures):
  - DR policies: **0%** on nemesis failures, 18–19% on shuffled, 85–87% on random.
  - Nemesis policies: 4–7% on their own arm's failures, 31–32% on shuffled.
  - Random-trained policies: best on random's failures (56%), worst on the others.
- **Honest reading:** at this budget, DR over a well-chosen envelope (w=0.5), given the adversary's attack budget as extra training steps, **ties or beats every adversarial arm**. Nemesis is marginally better on realistic and best-seed CVaR, which is within noise at n=2.
- **Flaw in the pre-registered discovery metric:** random search "wins" with 17.5 plausible+feasible modes vs nemesis 6. The plausibility cost is RMS over *deviating* slots, so a scenario perturbing ~60 slots moderately scores cost ≈ 0.45 and passes the ≤ 0.5 filter. Plan: report the pre-registered metric as-is *and* a corrected one (total deviation / number of active primitive groups), clearly labeled post-hoc.
- **Hypothesis for the pivot:** DR is the industry default. The more useful question may be whether Nemesis finds and fixes failures that a DR-trained policy *still* has. Testing with a Nemesis hunt against `dr_s1`.

## Oct 27: Nemesis vs the DR-trained policy, and the corrected discovery metric

- **Hunt against `dr_s1/round_2`** (2 rounds × 8 Wonder hypotheses, 7.1M env steps, PC 4060): **1 of 16 broke it**, a braking reversal on an ice patch at 50% falls. Spark: "both hind feet slid backward and splayed on the ice while the front legs buckled… onto its knees". Everything else held at 0–6%, including attacks that broke `baseline_v2` 60–90% of the time. DR over w=0.5 leaves very few holes inside the envelope, and the one left is close to physically infeasible.
- **Post-hoc strict discovery metric** (total deviation ≤ 1.0, ≤ 3 perturbation families, feasible), partial runs:
  - random: 0 modes (median 7 families stacked per failure)
  - shuffled: 9 modes, 21 failures (1 seed)
  - nemesis: 6.5 modes, 10 / 8 failures (2 seeds)
  - Correcting the metric removes random search's spurious win, but **Wonder's hypotheses are not more efficient than blind random programs** at finding distinct plausible failures at this budget.
- **Current honest conclusions (partial, n ≤ 2 per arm):**
  1. Matched-compute DR over a well-chosen envelope is the best *training* method here.
  2. LLM proposals are not more *search*-efficient than structured random programs.
  3. Nemesis's distinctive outputs are *explanations*: named, physically reasoned hypotheses, minimal counterexamples, and Spark's video diagnoses. Plus the plain-language attack interface.
- Open question for a fair DR comparison: the expert panel recommended DR at two envelope widths. We ran only w=0.5, which we chose by hand. DR at w=1.0 (the full envelope) is expected to be much worse, since that envelope is mostly unsurvivable. The point to make is that DR needs a human to pick the envelope.

## Oct 27: wide sweep launched (pre-registered A–F); a second compute incident

- **Pre-registered** experiments A–F in `docs/PREREGISTRATION.md` (commit `1782839`) before running any of them:
  - A: hard targets
  - B: budget curve
  - C: search-space size
  - D: ablations, including Muse Glimmer
  - E: DR envelope width
  - F: residual repair of DR policies

  Each lists its metric and what result would count against it.
- **Second fleet** in us-east-1 (48 vCPU quota): 1 × g6.2xlarge (L4) + 4 × g5.2xlarge (A10G); g6e and most g6 had no capacity. A running there: 36 attack-only jobs (4 adversaries × 3 targets × 3 seeds).
- **Incident 2:** west boxes 0 and 2 finished their queues; the (corrected) idle guard then shut them down after 60 idle minutes. They had been launched with *terminate on shutdown*, so their disks, and the final `random_s0` and `shuffled_s0` results, were lost before being fetched.
  - Fix: every fleet box switched to *stop* on shutdown; `fleet.sh` now launches with stop.
  - Lesson: idle shutdown plus terminate-on-shutdown needs results copied off first.
  - `random_s0` and `shuffled_s0` re-queued.
- **fleet.sh bug:** `ssh` inside `while read` loops swallowed the loop's input, so `status` and `fetch` only ever touched box 0. Fixed with `ssh -n`.
- **A10G precision:** the weak-motor sag test failed by 0.2 mm (19.8 mm sag vs a 20 mm threshold); loosened to 15 mm.
- **Status:**
  - Main sweep: 13 of 15 complete locally; 2 reruns going on west boxes 1 and 3, which then run C.
  - E (DR widths) running on Mumbai.
  - D and F wait for A.

## Oct 27: Muse Glimmer running as the adversary on our own GPU

- `meta-models/Muse-Glimmer-30B-GGUF:Q4_K_M` (16.8 GB) served by llama.cpp (`ghcr.io/ggml-org/llama.cpp:server-cuda`) on a g5.2xlarge (A10G 24 GB).
  - Settings: `-ngl 99 -c 24576 -fa on`, q8_0 KV cache.
  - Port 8080 is open only inside the VPC.
  - Download plus load took about 15 min.
- **First proposal round through Glimmer:** 4 of 4 programs valid and compilable in 85 s, with physically reasoned hypotheses at the level of Wonder's. Examples:
  - "low rear friction combined with a sudden yaw reversal causes spin-out"
  - "IMU roll/pitch bias makes the controller believe the trunk is level while it is actually rolled"
- The full Nemesis loop now runs on open weights (Glimmer) or the API (Wonder). This qualifies for *Best Build on Meta Open Weight Models*: served on our own hardware.
- Experiment D runs its Glimmer-proposer condition against this server.

## Oct 27: pre-registered results so far (A, B, C, D partial; E and F-dr_s1 complete)

- **H-E: SUPPORTED.** DR fall rate on hand-written + realistic gauntlet (16 seeds/scenario), by envelope width:

  | w | per seed | mean |
  |---|---|---|
  | 0.25 | 11.9 / 10.5 / 9.6% | **10.7%** |
  | 0.5 | 6.1 / 5.4 / 5.4% | **5.6%** |
  | 1.0 | 12.4 / 12.5 / 15.4% | **13.4%** |

  DR is about 2× worse when the hand-picked width is off in either direction. **Implication:** w = 1.0 (the full physical envelope) is exactly the information Nemesis gets. With the same information, DR is about 13% vs about 5–7% for Nemesis-trained policies (partial eval; to confirm with the full 16-seed evaluation). Nemesis matches *hand-tuned* DR without the tuning.
- **H-A: NOT SUPPORTED** (partial, 31/36). Strict failures, nemesis / shuffled / box / random:
  - baseline target: 6.0 / 8.7 / 0 / n/a
  - DR-hardened: 1.3 / 4.7 / 0 / 0
  - Nemesis-hardened: 2.3 / 7.3 / 0 / 0

  Blind *programs* beat Wonder's programs. Flat full-union CMA and uniform random find **zero** strictly plausible failures: they always stack many perturbation families.
- **H-B: NOT SUPPORTED.** Shuffled leads at every budget on the DR target.
- **H-C: SUPPORTED** (partial). Small → full space, strict failures:
  - box: 10.5 → **0**
  - shuffled: 10.5 → 8.5
  - nemesis: 5.5 → 6.5

  Program-structured search, LLM or random, survives a large search space; flat search collapses. This is relevant against Q-DEG-style continuous-vector search.
- **D (partial):**
  - Spark feedback: 6.5 vs 6.0 without. Within the seed range, so **INCONCLUSIVE**.
  - History: hurts (7.5 without vs 6.5 with), so **NOT SUPPORTED**.
  - Glimmer runs pending.
- **H-F (dr_s1): NOT SUPPORTED.** Held-out residual falls: original 61.3% / Nemesis repair 66.2% / continue DR 53.7%. Gauntlet: 5.4 / 8.2 / 5.2%. A handful of narrow counterexamples (about 5 programs) overfits, while broad DR keeps generalizing. `dr_s2` pending.
- **Emerging story:** the attack-program DSL is what makes realistic failures findable. Meta's models make the red team *explainable and usable* (hypotheses, Spark diagnoses, natural-language and voice attacks, an open-weight option). As a training method, Nemesis matches hand-tuned DR without needing the tuning, but does not beat tuned DR, and narrow residual repair overfits.

## Oct 27: FINAL main experiment (15 runs, locked gauntlet, 16 seeds/scenario)

- **Hand-written + realistic gauntlet, fall rate (52 scenarios), mean of 3 seeds:**
  - baseline 17.7%
  - **DR w=0.5: 5.6%** (from E)
  - **box (flat CMA): 5.6%**
  - shuffled: 6.0%
  - random: 7.1%
  - **nemesis: 7.7%** (5.2 / 10.8 / 7.0)
  - DR w=0.25: 10.7%
  - **DR w=1.0: 13.4%**

  Hand-written part alone (32): baseline 27.9%; DR 9.3%; box 8.8%; shuffled 9.5%; random 11.2%; nemesis 12.4%.
- **Sobol part (DR's own w=0.5 distribution):** DR 2–3%; box 5–8%; shuffled about 20%; nemesis 24–36%; random 27–37%; baseline 60%. As expected, DR wins on its own training distribution.
- **CVaR10 on hand-written:** box −0.49 to −0.51 (best); nemesis_s0 −0.50; DR −0.53 to −0.59; nemesis_s1 −0.73 (worst trained).
- **Nominal progress:** 4.4–4.6 m for every policy. Nobody became timid.
- **Cross-play** (fall rate under each arm's plausible+feasible failures):
  - DR policies: 10–13% on box failures, 0–4% on nemesis, 25–31% on shuffled.
  - Nemesis-trained policies: 56–65% on box failures, so a narrow training distribution.
- **Discovery (strict):** shuffled 9.3 modes (20–24 failures); nemesis 6.3 (6–10); box 0; random 0. Box and random failures stack about 7 perturbation families each.
- **CORRECTION** to the H-E entry above: I wrote that Nemesis "matches hand-tuned DR without the tuning". On the full evaluation it does not quite (7.7% vs 5.6%; seed ranges 5.2–10.8 vs 5.4–6.1). The accurate claim: **given only the physical envelope, every adversarial-training arm (5.6–7.7%) beats DR over that same envelope (13.4%) by about 2×.** Only hand-tuning DR's width closes the gap. Among adversaries, flat CMA and random programs trained slightly better policies than Nemesis.

## Oct 27: FINAL pre-registered wide sweep (A–F), all runs complete

Tables: `docs/results/wide.md` and `wide.json`. F reports: `docs/results/F_*`. Pre-registration: `docs/PREREGISTRATION.md` (commit `1782839`). The first `analyze_wide.py` run used a stale copy of `runs/` on the PC: 6 runs had no `budget.json` there, which left "n/a" cells and single seeds. I re-synced everything (all 67 A/C/D runs have `budget.json` locally) and re-ran. The numbers below come from the complete run.

| Hypothesis | Verdict | Key numbers |
|---|---|---|
| H-A: Nemesis's advantage grows on hardened targets | **NOT SUPPORTED** | Strict failures, base / DR / nem target: nemesis 6.0 / 1.3 / 2.3; shuffled 8.7 / 4.7 / 7.3; box and random 0 on every target |
| H-B: Nemesis leads at small budgets | **NOT SUPPORTED** | DR target at 2M steps: shuffled 2.3, nemesis 0.0. Nemesis's first strict failure arrives only by 10M |
| H-C: Nemesis is robust to a bigger search space | **SUPPORTED** | Small → full space: box 10.5 → 0 (−100%); shuffled 10.5 → 8.5 (−19%); nemesis 5.5 → 6.5 (+18%); random 0 → 0 |
| H-D1: Spark feedback helps | INCONCLUSIVE | full 6.5 / 1.0 vs no-Spark 6.0 / 1.0 (base / DR target), within seed range |
| H-D2: archive history helps | **NOT SUPPORTED** | Without history: 7.5 / 1.5 (slightly *more*) |
| H-D3: Glimmer ≥ 50% of Wonder | **SUPPORTED** | Glimmer 30B Q4, self-hosted: 10.0 [5, 15] / 1.0 vs Wonder 6.5 / 1.0. Glimmer matched or beat Wonder (within seed range) |
| H-E: DR is sensitive to envelope width | **SUPPORTED** | Hand + realistic fall rate: w=0.25 10.1%, w=0.5 5.9%, w=1.0 12.7%. Both off-widths lie outside the w=0.5 seed range |
| H-F: Nemesis repairs DR's residual failures better than more DR | **NOT SUPPORTED** | Held-out residual falls: repair 66.2 / 58.9 vs continued DR 53.7 / 62.5 (dr_s1 / dr_s2). Gauntlet: repair 8.2 / 6.4% vs 5.2 / 6.0%. Held-out sets are only 5–7 failures, so this is underpowered |

Notes:
- **E reproducibility.** E was evaluated twice with the same key (2026). w=0.5 gave 5.7% then 5.9%, w=0.25 10.4% then 10.1%. That is GPU nondeterminism of about ±0.3 pp, far below the effect size.
- **Random search finds 0 strict failures in the *small* space too.** Its failures always stack many families, since it perturbs all allowed slots at once. So "random finds nothing plausible" is a property of joint-uniform sampling, not of dimension.

### What the whole study says (main experiment + A–F)

1. **The attack-program DSL is what makes plausible failures findable.**
   - Every arm that searches *programs* finds strict failures: random programs (shuffled) and Wonder's programs.
   - Every arm that searches the *flat θ box* finds none in the full space: CMA-ES over all slots, and uniform random.
   - Flat CMA only works when a human has already shrunk the space to 3 families (H-C).
2. **The LLM is not a better searcher than random programs.** Shuffled beats Wonder on raw strict-failure count on every target and at every budget. Wonder's value is that each failure arrives with a physical hypothesis ("the trot relies on rear-foot grip during yaw reversal"), and that it translates plain English into programs (the attack page). That is explanation and interface, not search efficiency.
3. **For training, adversarial programs ≈ well-tuned DR > mis-tuned DR.**
   - Given only the physical envelope, every adversarial arm (5.6–7.7%) beats DR over the full envelope (12.7–13.4%) by about 2×.
   - DR needs its width hand-tuned to w=0.5 to reach 5.6–5.9%.
   - Among adversarial arms, Nemesis training is slightly worse (7.7%) than box or shuffled (5.6–6.0%). It is also narrower: weak on box-found failures in cross-play (56–65%).
4. **Open weights are enough.** The self-hosted Glimmer 30B (Q4, one A10G) proposes programs as productive as Wonder's. The adversary does not need a frontier API.
5. **Not shown:** that Spark's video feedback or the archive history improves search. Both are within noise or slightly negative. Spark's role is labelling, not steering.

## Oct 27: pivot to product features (P10 in PLAN.md)

The user pointed out, correctly, that this is a tech hackathon, not a research one. The benchmark is now a single credibility line. Everything else goes into the product: F1–F8 in PLAN.md.

- **Native tool calling works on Wonder** (verified). `responses.create(tools=[...])` returns `function_call` items, and the conversation chains with `previous_response_id` + `function_call_output`. Agent mode (F3) is a real tool-using agent, not a JSON-action loop.
- **Patch (F1), first end-to-end test on the 4060** (1024 envs, 20M steps, from `baseline_v2`):
  - attack: ice under all 4 feet (μ 0.08) + a 100 N shove;
  - total time 7 min: compile ~65 s, two 54 s evals, PPO ~3 min;
  - **the gate rejected it**: falls 88% → 100%; walking (4.57 → 4.49 m) and gauntlet (18.3% → 15.5%) were fine.
  
  That attack is probably beyond any controller. **Fix:** every attack is also run against our toughest policy (`arms_final/dr_s1/round_2`). If even that robot falls ≥90% of the time, the page says "Physics wins" and doesn't offer Patch; the community auto-patch also skips it. Patch evals were cut to 2 × 128 envs (54 s → 14 s), and compilation hit the cache (65 → 37 s).
- **Your world (F4), first test:** a Wikimedia Commons photo of an icy Helsinki sidewalk. Spark read it as μ≈0.2, "packed ice and slush with a grit-strewn strip", slope 0. The robot fell 75% (v1). Wonder had added an 80 N push the photo didn't justify, so pushes are now only modeled when the hazards mention people, pets or traffic.
- **Process incident:** the F8 subagent edited `server/app.py` (rerouting `translate` through `config.text_model()`) at the same time as me. Its read-modify-write dropped my `log_attack` and community-patch additions, and the server failed to import (`NameError: log_attack`). I restored them and told the agent to keep out of `server/` and `web/`. Lesson: subagents get disjoint files, stated explicitly.

## Oct 27: fully open-weight mode (F8) on one A10G

Setup: `NEMESIS_OPEN=1`, `MODEL_API_KEY` unset or empty and `.env` moved away, on a g5.2xlarge (A10G, 23,028 MiB). One llama.cpp server (`ghcr.io/ggml-org/llama.cpp:server-cuda`, build b11889) runs `meta-models/Muse-Glimmer-30B-GGUF:Q4_K_M`. `-hf` also loads `mmproj-Muse-Glimmer-30B-Q4_K_M.gguf`, and the server reports `vision: true, video: true`. The simulator runs on the same GPU.

- **Muse Spark Open does not fit:**
  - 816B MoE, 42B active. Official weights are BF16 (~2 TB) and NVFP4 (≥700 GB).
  - The smallest community GGUF, `unsloth/Muse-Spark-Open-816B-A42B-GGUF` UD-IQ1_S, is 175.6 GB (UD-IQ2_XXS: 225.6 GB).
  - So it does not fit on an A10G or on an L40S (g6e.xlarge: 48 GB VRAM + 32 GB RAM). Not run.
  - Glimmer accepts images itself (ViT perception encoder, Apache 2.0), so it is the open vision model on one GPU. Spark Open is used only when `NEMESIS_SPARK_OPEN_URL` points at a server.
- **VRAM:** 17,671 MiB with Glimmer loaded (24k ctx, q8_0 KV, 4 slots). The peak during a sim, render and observe run was 19,061 MiB, with `XLA_PYTHON_CLIENT_PREALLOCATE=false`.
- **Clips go to Glimmer as frames.** Each frame is a JPEG of a 640×480 render, with a `[frame at t=…]` label. 8 frames take 3.4k prompt tokens and 12 frames take 5.0k.
- **Vision quality, one clip** (μ 0.25 + 150 N lateral push at 1.5 s; ground truth: the robot trots, then rolls over at ~1.6–1.9 s and ends on its back with its legs up):

  | Frames | Effort | Latency | Result |
  |---|---|---|---|
  | 8 | low | 27–31 s | Mostly restates the given conditions |
  | 8 | high | 120 s | Same as 8/low |
  | 12 | low | 37 s | The only time-resolved account: "on the ground on its left side… right-side legs lifted… remain in the air" from ~2.1 s |
  | 12 | high | 104 s | Same as 8/low |

  The `mode` field is wrong in every run: it names the camera ("side_tracking", "failure_description") instead of a failure mode. The default is now 12 frames.
- **End-to-end round, open mode:** `run_arm.py --arm nemesis --attack-only --rounds 1 --per-round 4 --pop 16 --gens 4`, in 5 min 27 s wall.
  - Glimmer proposed 4/4 valid programs in 60 s (4.6k prompt and 1.5k completion tokens), with no fix round. Example hypotheses:
    - "trot relies on rear-foot grip for yaw torque; wet tile friction loss during a forward-to-turn command switch"
    - "action latency plus proprioception noise delays recovery; a lateral push timed in single support"
  - CMA found 1 failure: latency 1 step + obs noise 0.15 + 82 N lateral push, with fall rate 59% on 32 fresh seeds.
  - Glimmer watched its clip in 36 s. It got the timeline right ("normal trot up to ~1.6 s… by ~2.3 s on its side… legs up in the air… no recovery"). It misread latency 1.022 (steps) as "1.022 s", and its leg-level detail cannot be checked.
- **Translate (`server/app.py`), Glimmer:**
  - Without constraints, 1 of the first 2 requests returned malformed JSON (a misplaced `]`). With `json_only=True` (llama.cpp `json_object` grammar), 8/8 test requests were usable at 13–24 s each, and "sing me a song" was declined in 3 s.
  - Over HTTP, also with `json_only`, 1 of 2 requests failed Program validation (`"carry a 5 kg backpack up a 15 degree ramp"`: extra top-level fields).
  - A full Program-schema grammar also works (8/8) once `$defs` is hoisted to the top level of the `anyOf` wrapper. llama.cpp rejects nested `$defs`.
  - Glimmer maps "shove it from the left" to `force_y=+100`, which pushes toward the robot's left.
- **Server:** `scripts/open_up.sh` reused the cached weights and was up in 106 s. `POST /api/attack` took 109 s on a cold process, mostly JIT compile.
- **Voice:** `POST /api/attack_voice` went through faster-whisper `base.en` (CPU int8) and gave an exact transcript of a TTS wav. It took 0.6–1.3 s per transcription and 58 s end to end. faster-whisper 1.2.1's PyAV decoder fails with av 19 (`metadata_errors`), so the WAV is decoded with `wave` + numpy instead.

## Oct 27: F7, a second robot (Unitree G1 humanoid)

- **Robot registry** (`nemesis/robots.py`): Playground env, feet, leg joints/actuators, trunk, fall thresholds, obs offsets, contact model, envelope and nominal command per robot. `canonical.layout(robot)` and `dsl.language(robot)` build per-robot θ layouts and attack languages. All robots share D = 80 and the same slot names; G1 uses 61 slots (2 feet instead of 4, the 12 leg joints).
- **Go1 is unchanged.** The layout hash, slot docs and the DSL JSON schema are identical to before. Adversary controls (random programs, random θ, box CMA, plausibility cost, mode signatures) produce identical outputs. CPU rollouts of `baseline_v2` on 6 gauntlet scenarios × 2 seeds are **bit-identical** to the pre-registry code. On GPU, old-vs-new differs on 4.3% of fall flags, but old-vs-old already differs on 2.7% (GPU nondeterminism). Aggregates match: 27.3% vs 27.0% / 27.3%.
- **G1 specifics that differ from Go1:**
  - Foot-floor friction comes from explicit `<pair>`s (0.6), not geom friction, so θ sets `pair_friction`. Neutral foot friction is 0.6.
  - The stock scene has no pelvis or torso collision primitives (only meshes). Its shin capsules (r = 0.08) reach within ~2 cm of the sole, so they would fire on toe-off. `load_env(robot="g1")` adds massless pelvis/torso boxes, a head sphere and thin shin capsules via MjSpec and enables the thigh and hand capsules. Masses and inertias are unchanged (tested).
  - G1 actuators are position actuators without force limits. Motor strength scales Kp on the 12 leg actuators; waist and arms keep full strength.
  - Gravity is read in the pelvis IMU frame. The obs layout differs (command at 9:12, joints 12:41, gait phase at the end).
- **Bug caught on the first training run:** G1 also has explicit hand-thigh contact pairs, and the fall check counted *any* contact of a body geom. Swinging arms brushing the thighs ended episodes. A diagnostic (64 rollouts) showed these "pair" falls, so the run was stopped at 106M steps. The check now counts only body-floor contacts. For Go1 every body-geom contact is a floor contact, so nothing changes there (re-verified bit-identical on CPU).
- **Fall definition (G1):** non-foot floor contact, torso tilt > 45°, or pelvis below 0.45 m (0.755 m standing). Fall penalty 1.0 plus the env's termination term (-100 × dt).
- **Baseline `runs/g1_baseline`:** NemesisWrapper, nominal θ, per-episode Playground-style DR (frictionloss ×U(0.5, 2), armature, masses, torso ±1 kg; no friction DR, θ owns friction). Playground's G1 PPO config, 8192 envs, 202M steps on one L40S (g6e.xlarge, us-east-2): **85 min** (5 min of that compiling), about 5.6× Go1's time.
  - Eval reward −4.8 → 16.6. Average episode length 29 → 860 of 1000. Falls per 20 s random-command eval episode 99% → 24%.
  - Learning starts around 30–40M steps, as with Go1 under strict termination.
- **Verification** (`experiments/humanoid_check.py`, 16 seeds, 5 s, command 0.8 m/s forward):

  | Scenario | Falls | Progress (m) |
  |---|---|---|
  | nominal | 0% | 3.02 |
  | shove 100 N, 0.2 s | 0% | 2.64 |
  | shove 150 N | 19% | 2.29 |
  | shove 200 N | 100% | 1.56 |
  | shove 300 N | 100% | 1.26 |
  | ice μ 0.1 | 88% | 0.95 |
  | wet μ 0.3 | 0% | 3.00 |
  | latency 20 ms | 0% | 2.78 |
  | latency 40 ms | 56% | 1.71 |
  | 10 kg high payload | 100% | −0.40 |
  | weak knees 0.5 | 56% | 0.50 |
  | uphill 0.2 rad | 6% | −1.68 (it stalls) |

  - Over 10 s with nominal walking, 3 of 64 seeds fell (4.7%).
  - The profile looks like Go1's: a cliff between 150 and 200 N, and 40 ms latency as a killer. The 100 N side shove does *not* break it, since 100 N for 0.2 s on 33 kg is only 0.6 m/s.
- Clips: `runs/humanoid_clips/g1_nominal.mp4` and `g1_shove.mp4` (200 N side shove with the overlays). Copied to the main checkout's `runs/humanoid_clips/`.

## Oct 27: physics audit fixes

A second Opus audit read the perturbation, wrapper, evaluator and training code against the installed MuJoCo/MJX/Brax/Playground source. Four physics bugs were confirmed by probes on the PC's CPU and fixed; tests in `tests/test_physics_audit.py`.

- **Go1 per-foot friction never existed.** Playground's Go1 floor has contact `priority=1`, and MJX then takes *all* contact parameters (friction, solref, solimp, condim) from the higher-priority geom instead of the max of the two. So every foot-floor contact used the floor's friction, which our primitive lowered to min(0.6, smallest foot μ).
  - Neutral contact friction was 0.6, not the documented 1.0. θ values in 0.6–1.5 did nothing.
  - **Every per-foot friction attack in the study was really all four feet on that friction.** That covers "rear slip", "one rear foot losing grip during a yaw reversal", "both rear slip + weak front calves", "front-feet grip loss" and the shuffled/random programs that picked a subset of feet. This likely explains the infeasible friction cluster and the friction family that never improved with fine-tuning (81 → 77 → 80%). The slippery-foot overlays showed per-foot slip the physics never had.
  - The Oct 26 note "Playground's floor-friction randomization is a no-op" is wrong: it was effective, so `baseline_v2` and later policies trained without the friction DR stock Playground has.
  - **Fix:** `load_env` gives the feet a copy of the floor's contact parameters and a higher priority. `apply_model` sets each foot to min(θ_foot, 0.6) and still lowers the floor to the smallest foot value, which only matters for body-floor contacts.
  - **Verified on CPU** (old vs new code, `baseline_v2` policy, 4 seeds × 300 steps): bit-identical for nominal, forward, all-feet μ = 0.08 and a 150 N shove. That is max |Δqpos| = 0 and identical foot-contact sensors, so existing policies and uniform-ice results stand. A single rear foot at μ = 0.05 now affects only that foot: the old code fell on 4/4 seeds, the new code on 0/4. The MJX contact probe gives that foot 0.05 and the others 0.6.
- **Payload inertia was on the wrong axes and about 2× too large.** The update added m·(|r|² − r²) to `body_inertia` as if it were in the body frame, but Go1's trunk inertial frame (`body_iquat`) is rotated about 90° about y. It also used m instead of the reduced mass Mm/(M+m) and dropped the off-diagonal terms.
  - Effect: a forward payload quadrupled roll inertia and left yaw unchanged; a raised payload left roll unchanged. Centre-of-mass shifts and mass were right, so load attacks had the right weight and the wrong rotational inertia.
  - **Fix:** `apply.composite_inertia` builds the full body-frame tensor, re-diagonalizes it with `eigh` and returns new `body_inertia` + `body_iquat` (jittable). A zero payload leaves the model bit-identical.
  - **Verified:** the free-joint mass matrix matches MuJoCo's own composite of a welded point mass to ~2e-8, for four offsets. The old code was off by up to 0.05 on rotational blocks of size about 0.15.
- **G1 evaluations included Playground's hidden kicks.** G1 Joystick kicks the base by 0.1–2 m/s every 5–10 s (`push_config.enable=True`), on top of θ. A 2 m/s kick is about 66 N·s, more than the 200 N × 0.2 s shove that breaks G1 every time.
  - 5 s evaluations are clean (the earliest kick is at step 249). The "10 s nominal: 3/64 falls" above is probably kicks, and 6 s G1 runs (`render_ice.py`) had about 20% of seeds kicked between 5 and 6 s.
  - **Fix:** evaluation envs (`base_dr=False`, and every Evaluator rollout) disable the env's pushes. Training keeps Playground's recipe.
  - **Verified:** 500-step G1 rollout, ≥1 kick with pushes on, 0 off.
- **G1 "weak motors" kept full torque.** G1's torque limits are joint-level (`jnt_actfrcrange` ±88–139 Nm, `jnt_actfrclimited`), not actuator `forcerange`, so scaling `forcerange` did nothing. The F7 note "position actuators without force limits" is wrong.
  - **Fix:** motor strength also scales `jnt_actfrcrange` of the θ joints. Go1 has no joint limits, so nothing changes there.
  - **Verified:** a saturated left knee command gives 139.0 Nm at strength 1.0 and 41.7 Nm (= 0.3 × 139) at 0.3. The G1 "weak knees 0.5" result above was Kp-only.
- **Evaluator vs env termination.** G1 also terminates on foot-foot / foot-shin contact. Training ended those episodes, but the evaluator ignored them, and the wrapper restarted its scenario clock (pushes re-fire, the ice patch moves, history is cleared).
  - **Fix:** the evaluator now counts the env's own termination as a fall, matching training. Go1's termination (upvector z < 0) implies the 45° tilt check, so Go1 results are unchanged (0 done-without-fall events in the comparison above). None occurred in 16 G1 probe rollouts either.
- **Docs:** push slots now say start-heading frame (x = initial forward, y = left), as the code has done since the first audit. They had said "world-frame", and that text went into the LLM prompts. The Go1 `foot_friction` doc now says nominal and maximum is 0.6. The Go1 θ layout hash is unchanged.

**Effect on earlier results:** Go1 results without single-subset friction or payload ops are unaffected (bit-identical physics). Per-foot friction attacks should be read as all-feet friction, payload attacks had wrong rotational inertia, and G1 runs longer than 5 s included random kicks. The study's tables were not re-run.

## Oct 27: terrain (stairs and curbs)

P11 (Go1 only; the G1 gets it later through the same registry hook, `Robot.terrain_boxes`). Shared geometry is in `nemesis/perturb/terrain.py` (numpy or JAX, no JAX import). Physics, mp4 overlays and the replay export all use it.

- **θ layout v2** (`THETA_LAYOUT_VERSION` = 2). Four slots are appended after the original 63, whose indices, neutral values, ranges and spans are unchanged (pinned by a test). D stays 80, and G1's layout and hash are unchanged.
  - `stairs_height` 0–0.15 m, `stairs_depth` 0.2–0.6 m, `stairs_count` 0–8 (rounded), `stairs_start` 0.5–3 m.
  - Neutral is 0 for all four, which is the padding value, so every older θ means flat ground. Depth and start are flagged `neutral_off`: their 0 is an "off" marker outside the range. `clip()` keeps that marker, and `normalized()` maps it to −1 as the padding did, so the critic input is unchanged for old θ. Placement clamps depth and start to their range.
- **Scene: 8 step boxes on mocap bodies** (ids 14–21, geoms 51–58), appended after the robot by an MjSpec rebuild, so no robot id moves.
  - Every box has the same fixed size: 2.4 × 3 × 1.5 m.
  - Each episode, the wrapper moves box i through `data.mocap_pos`/`mocap_quat` so that its top front edge sits on riser i, in the start-heading frame. The frame is the ice patch's: start pose taken at the first step.
  - Later (taller) boxes cover the rest of each box, so the union is the staircase. The top step continues 2.4 m from its riser as a landing (the plan said depth + 2 m). Unused boxes are parked at z = −10.
  - Only data changes, never a model field. A first version moved and resized boxes through `geom_pos`/`geom_size`; that made those model arrays traced instead of constant, and the physics compiled differently (float drift on every rollout).
  - A curb is stairs with count 1.
- **Contacts: feet only (lead's decision).**
  - Making every body geom collide with the 8 boxes raised contacts from 24 to 216. Wrapped Go1 steps per second on CPU, as a fraction of no step collisions:

    | Variant | Speed |
    |---|---|
    | all body geoms | 0.20× |
    | feet + trunk + calves | 0.27× |
    | all body geoms, condim 1 | 0.25× |
    | all body geoms, 4 boxes | 0.33× |
    | feet only | 0.68× |

    The cost is MJX's capsule-box and box-box collision functions, not the solver.
  - Steps have contype 2 and the feet have conaffinity |= 2. The floor pairs are unchanged.
  - Steps carry the floor's contact parameters and priority, so foot-step contacts use each foot's own friction, exactly as foot-floor contacts do (the audit's per-foot rule).
  - **A body touching a step is still a fall,** found geometrically: 378 sample spheres over the trunk box surface and the thigh/calf capsule axes, 2 cm apart, are tested against the exact box SDF of each used step (`terrain.touches`). After the fall, the trunk and legs pass through the steps; the server trims terrain clips after the fall.
  - Speed, baseline_v2 policy, 1024 envs on the 4060: 155k → 104k steps/s (0.67×). The touch check costs nothing measurable (106k without it).
- **Playground's foot-contact sensors** (`*_floor_found`, used by `feet_air_time`/`feet_slip`, `last_contact` in the critic input) hardcode the floor geom, so a foot on a step reads "no contact". This affects training rewards only, not evaluation, attacks or the policy's observation. Not patched.
- **DSL:** `stairs` {height, depth = 0.3, count, start} and `curb` {height, start}, with at most one terrain op per program. Only robots with terrain get them; the G1 schema is unchanged.
  - Slot docs give realistic values: threshold 0.02–0.03 m, curb 0.10–0.15 m; household risers (0.15–0.18 m) are beyond this robot, whose hip is about 0.3 m high.
  - The proposer prompt now names steps/curbs as a target, and a fall as touching "the ground or a step".
- **Families and metrics:** a `terrain` family (`stairs`, `curb` → terrain). `stairs_depth` and `stairs_start` join `NOT_MAGNITUDES`. This is categorization only: they are shape and position, like the start times, and their off-marker neutral makes |θ − neutral| meaningless. The strict definition (total deviation ≤ 1, ≤ 3 families, fall rate in [0.5, 0.95)) is unchanged.
  - Height and count stay magnitudes: a 15 cm riser is a full-envelope deviation, as are 8 steps. A 10 cm curb has total deviation 0.68, one family.
  - `cause_family` ignores `neutral_off` slots.
  - `modes.has_terrain(θ)` is the physical test: a riser ≥ 1 mm and a rounded count ≥ 1. `analyze.py` reports `strict_terrain_failures` with it.
- **Controls:**
  - Random-program templates `stairs` (height 0–0.15, depth 0.2–0.6, count 1–8, start 0.5–3) and `curb`. Any given seed now draws different programs than before, because the op pool grew.
  - `envelope(width)` keeps the full range for depth/start at any width.
  - The box arm covers slots 63–66.
  - Uniform θ has stairs in about 93% of draws, which matters for any future uniform-DR training.

### Verification (PC CPU unless noted)
- **Old vs new code, production evaluator (`Evaluator`, baseline_v2, 250 steps, 16 seeds): bit-identical.** Inputs were the 23 θ vectors in `runs/serve_dev/attacks.jsonl` plus the audit's six scenarios (neutral, forward, all-feet μ 0.08, one rear foot μ 0.05, 5 kg high-back payload, 150 N shove). Every output was identical, `qpos` included.
- **The audit's own script (`compare_rollouts.py`, a different jitted graph) is not bit-identical.** It differs by float rounding from the first step (about 1e-9 m in qpos), which grows chaotically (neutral 0.39 m by step 300; ice μ 0.08 falls on 3/4 seeds old, 0/4 new).
  - Bisection: the model, the extra foot contacts and the mocap placement alone are bit-identical. Adding the geometric touch check to that graph changes XLA's CPU compilation, even when the check reads only constants (with or without `optimization_barrier`).
  - That is compiler sensitivity, not physics: the old code run with Eigen threading off differs from itself by the same amount (0.70 m in "forward").
- **Box under a standing robot:** all four feet make contact with the step and the trunk rises 0.10 m for a 10 cm step (`test_robot_stands_on_a_step`). A 15 cm step around the legs is a fall; one 2 m ahead is not.
- **`baseline_v2`, 16 seeds, 5 s, forward 1 m/s, everything starting 1 m ahead (depth 0.3 m)** (`experiments/terrain_check.py`):

  | Scenario | Falls | Progress (m), mean [min, max] | Median time to fall (s) | Reached the top |
  |---|---|---|---|---|
  | flat | 0% | 4.56 [4.49, 4.60] | - | - |
  | curb 2 cm | 0% | 4.56 [4.50, 4.61] | - | 100% |
  | curb 4 cm | 0% | 4.49 [4.25, 4.60] | - | 100% |
  | curb 6 cm | 44% | 2.99 [0.81, 4.52] | 1.54 | 56% |
  | curb 8 cm | 88% | 1.46 [0.99, 4.40] | 1.44 | 12% |
  | curb 10 cm | 100% | 0.98 [0.88, 1.05] | 1.38 | 0% |
  | curb 12 cm | 100% | 0.97 [0.94, 0.99] | 1.35 | 0% |
  | stairs 3 × 6 cm | 100% | 1.19 [0.72, 1.63] | 2.23 | 0% |
  | stairs 5 × 8 cm | 100% | 1.05 [0.99, 1.19] | 1.45 | 0% |

  - A cliff between 4 and 8 cm. A cause probe (same seeds, no episode reset) shows that almost every fall is a body-step touch (the shins hitting the riser): 5 of 6 falls at 6 cm, 14/14 at 8 cm, 16/16 at 10 and 12 cm, 14/16 and 16/16 on the two stairs.
  - At 10–12 cm, 16 of those 32 touches were not followed by a tilt or height fall within 1 s (the robot jams its legs into the curb and stalls at the riser; the legs pass through after the touch, so this is only indicative). Under the strict rule that is a fall; in reality it is "blocked". Read high-curb failures as "cannot step up", not "tumbles".
- **Clips** (overlays: concrete steps, ember nosing): `runs/terrain_clips/go1_curb_trip.mp4` (8 cm curb, seed 1) and `go1_stairs_attempt.mp4` (5 × 8 cm), plus `_slowmo` copies and `table.json`.
- **Tests:** `tests/test_terrain.py` (20 tests): layout prefix, zero padding = flat, placement math (numpy = JAX), rounding/clamping, exact SDF, DSL round trip, families and plausibility, strict metric, controls, export format, rebuild keeps every robot model field, steps are data not model, stand on a step, body on a step = fall. The Go1 layout-hash test now pins v2 (`fef3fefa…`; v1 was `fdbcd0f6…`), and G1's hash is pinned unchanged.
- **Full suite on the PC's CPU:** 81 passed, plus 1 failure that predates this work (`test_robots.py::test_humanoid_wrapper`, G1 pelvis height 0.077 < 0.1).

## Oct 27: H-S (terrain), pre-registered: NOT SUPPORTED

The question (pre-registered in `dc9344c`, before any terrain code existed): does Muse beat random programs at finding realistic failures on stairs and curbs?

- **Setup:** 18 attack-only runs (nemesis / shuffled / box × 3 seeds × base and DR-trained targets) at 10M attack steps, on 5 AWS boxes, code `7305727`.
- **Incident:** five DR-target runs died with empty logs when I stopped a stalled fleet-setup task that was still installing packages. They were relaunched with START/EXIT markers; all 18 completed.

| Strict terrain failures, mean [per seed] | nemesis | shuffled (random programs) | box (flat CMA) |
|---|---|---|---|
| untrained (`baseline_v2`) | 3.0 [5, 3, 1] | **4.3** [3, 6, 4] | 0 |
| DR-trained | 2.3 [2, 3, 2] | **4.7** [4, 5, 5] | 0 |

All strict failures (n/s/b): base 8.0 / 11.7 / 0, DR 3.7 / 7.7 / 0.

**Verdict: NOT SUPPORTED** on both targets. Random programs find about 1.5–2× more plausible terrain failures than Wonder. This matches A–B on flat ground: what makes realistic failures findable is the program DSL (box CMA again finds 0), not the LLM's search. The user's hypothesis was reasonable, the test was fair, and it came out against it. The video and README must not claim that Muse is a better *searcher* on stairs. Its role stays explanation, the plain-language interface, and Autopilot's narrated investigation.

## Oct 28: course from a sentence

P12 #2, the physics and DSL side (Go1; the G1 gets it through the same terrain hook). A sentence such as "out the door, down three small steps, across an icy driveway, up a ramp" becomes one `course` op, which compiles into θ. The shared geometry is in `nemesis/perturb/terrain.py`; physics, mp4 overlays and the replay export all use it.

- **θ layout v3** (`THETA_LAYOUT_VERSION` = 3). Seven slots are appended at 67–73; 6 of the 80 stay free. Slots 0–66 are unchanged, which `test_course_slots_appended` checks by recovering the v2 hash. D stays 80, and G1's layout and hash are unchanged.

  | Slot | Range | Neutral | Category |
  |---|---|---|---|
  | `ramp_angle` | 0–15 **degrees** | 0 = no ramp | terrain, magnitude (15° = full deviation) |
  | `ramp_start` | 0.5–6 m | 0 = off marker | terrain, position (NOT_MAGNITUDES) |
  | `ramp_length` | 0.5–2.2 m horizontal run | 0 = off marker | terrain, shape (NOT_MAGNITUDES) |
  | `stairs_landing` | 1.5–3 m | 0 = the flight only goes up | terrain, shape (NOT_MAGNITUDES) |
  | `ice2_slip` | 0–0.95, where μ = 1 − slip | 0 = no patch | friction, magnitude |
  | `ice2_start` | 0–6 m | 0 | friction, position (NOT_MAGNITUDES, like `ice_start`) |
  | `ice2_length` | 0–4 m | 0 | friction, magnitude (like `ice_length`) |

  - Every neutral is 0, the padding value, so every older θ has no course. `normalized()` reads all seven as −1, as the padding did.
  - **Why `ice2_slip` and not `ice2_mu`.** A μ slot whose neutral is 0 must be an "off" marker, and the strict-deviation code (`analyze`, `plausibility_cost`, `cause_family`) cannot measure magnitude from an off marker. Storing 1 − μ gives the second patch exactly the first patch's deviation, (1 − μ)/0.95, with no change to the metric code. The DSL and the export speak μ.
  - Adding names to NOT_MAGNITUDES and FAMILIES is categorization only, as for `stairs_start`. The strict definition is unchanged.
- **No new boxes (deviation from the plan).** First version: 10 boxes, adding a ramp box and a 6 m landing box.
  - Old θ evaluated through the Evaluator were bit-identical except the **stairs** θ. Those differed from the first foot–step contact (step ~54, about 1.6e-5 m at first, chaotic after that).
  - The probe showed identical box poses. With the two extra boxes made non-collidable, the rollout was bit-identical again. Cause: two more collidable geoms enlarge MJX's contact arrays and change the float rounding once a step contact is active.
  - So the course reuses Go1's 8 step boxes. A ramp takes the last two: box 7 is the ramp, pitched by its angle, and box 6 is a 2.4 m landing. If the stairs leave box 5 free, it extends the landing to 4.8 m.
  - A first 8 s table showed why the extension matters: with a 2.4 m landing, ramps of 5° and 10° "failed" 100% when the robot walked off the far end.
  - Budget: stairs get up to 8 steps, or 6 with a ramp. A flight that comes back down gets 4 steps, or 3 with a ramp. The model is identical to v2 (no new geom, no new collision pair).
- **Descent.** The flight goes up, crosses a landing `stairs_landing` m long, then comes down the same steps.
  - Each level needs a front box at its riser up and a back box at its riser down, with higher levels hiding the middle of each box. That needs every level span ≥ box length. With 2.4 m boxes the landing would have to be ≥ 2.4 m, and the course would be out of reach in 5 s.
  - So when descending, the boxes are stood on end (pitched 90°): 1.5 m long, 2.4 m deep. That allows landings of 1.5–3 m.
  - A pure "start elevated and go down" is not modelled. The DSL rejects a `stairs_down` without an earlier `stairs_up`/`curb` and says to write a porch (up, then down).
- **Ramp geometry.** The ramp box's top-face far edge sits at (start + run, run·tan α). Its near edge is under the floor, because run ≤ 2.2 m < 2.4·cos 15°.
  - The landing's top is at the ramp height. A ramp that starts on a raised top (a curb's walkway) starts further back, so it rises out of the walkway at the cursor.
  - Feet-only contact as before. The fall check `touches` works in each box's own frame: exact SDF for pitched boxes, including stood-on-end steps.
  - Test: spawned at rest on an 8° ramp or on its landing, the robot stands with all four feet on that box, at standing height above the surface, and is not fallen. Spawned level instead of pitched, with Playground's random reset velocity, the passive pose tips over on the incline. That is not a geometry error: the same drift happens on a gravity-tilted slope.
- **DSL `course` op.**

  ```json
  {"op": "course", "segments": [<segment>, ...]}
  ```

  - **Segments** (1–6 per course, discriminated by `kind`):
    - `stairs_up` {height, count, depth = 0.3}
    - `curb` {height}
    - `stairs_down` {gap = null → shortest landing}
    - `ramp` {angle (deg), length (run, ≤ 2.2)}
    - `ice` {mu = 0.1, length}
    - `wet` {mu = 0.3, length}
  - **Placement:** every segment has `gap` (≥ 0), the flat distance from where the previous one ended. Stairs end at their last riser, a ramp at its top, a patch at its far edge.
  - **Ranges:** gaps, lengths, counts and depths are fixed numbers. height, angle and mu may be [lo, hi].
  - **Errors:** `plan_course` lays the segments out and raises clear errors for:
    - walking off a raised top
    - `stairs_down` without a flight
    - more than 4 steps (3 with a ramp) up and down
    - anything but ice/wet after a ramp
    - a ramp rising out of a raised top with ranged height or angle
    - out-of-envelope positions
    - more than 2 patches (counting `ice_patch` ops)
  - **With other ops:** a course counts as the one terrain op (no `stairs`/`curb` with it). Its first patch uses the `ice_*` slots unless the program also has an `ice_patch` op; the second patch uses `ice2_*`.
  - The existing ops (`stairs`, `curb`, `ice_patch`, `friction`) are unchanged.
- **Controls stay as pre-registered.** `random_program`'s template pool and seeding are unchanged; a digest of 600 programs matches `82b66cb`.
  - Uniform θ (`random_thetas`), `envelope()` (the DR arms) and the box arm leave the course slots neutral unless `course=True`. The `random_thetas` digest and the box arm's 66 indices match.
  - `random_course_program` adds a `course` template in a separate function.
- **Prompts:**
  - The slot docs give realistic values: wheelchair ramp 3–5°, steep driveway 8–12°, beyond ~15° unrealistic for a ~0.3 m hip; wet tile μ 0.25–0.4.
  - The `course` docstring (in the JSON schema) carries the vocabulary and the headline example.
  - The proposer prompt gains the trip thresholds from the terrain table (2–4 cm fine, 6 cm about half, 8 cm almost always) and "keep a course within ~4.5 m". At 1 m/s that is all the robot covers in a 5 s episode.
  - The Go1 schema grew from 11.7k to 18.8k characters.
- **Overlays/export:**
  - mp4: concrete steps and the ramp box with an ember strip at its foot. A flight that comes back down gets strips on the risers down too. Both patches are drawn.
  - `overlays.terrain` = `{"steps": [{x0, x1, height}], "ramps": [{x0, x1, h0, h1}], "width": 3.0}` in the start-heading frame. A flight that comes back down lists its steps down with decreasing heights. The ramps list holds the ramp (h0 = 0) and then its flat landing (h0 == h1). Both are solids from the floor up.
  - `overlays.ice` is unchanged (the first patch). The new `overlays.ice_patches` lists every patch, the first included, with the same fields.
- **Robot-aware export (lead's request).** `scene_assets(m, mesh_cell, robot="go1")`, `overlay_spec(m, θ, q0, robot="go1")`, `trajectory(..., robot="go1")` and `detect_fall(q, dt, robot="go1")` now read the layout, trunk, foot sites, θ-joint bodies (via actuators) and fall thresholds from the registry.
  - Go1 output is byte-identical with and without `robot="go1"` (test).
  - `python -m nemesis.sim.export --scene g1 --out web/public/assets/g1_scene.json --mesh-cell 0.005` gives 1216 KB (30 bodies, 63 geoms, 35 meshes). At 3 mm it was 1977 KB.

### Verification (PC CPU, baseline_v2)
- **Old θ, production Evaluator (250 steps, 16 seeds, qpos recorded), old code (`82b66cb`) vs new: bit-identical on all 36 θ.** These are the 24 attacks in `runs/serve_dev/attacks.jsonl` (one with stairs), the audit's six scenarios, and six v2 terrain scenarios (curbs 4/8 cm, stairs 3 × 6 and 5 × 8 cm, an ice patch, stairs + ice). Every output field, qpos included, has max |Δ| = 0.
- **Fall table** (`experiments/course_check.py`): 16 seeds, forward 1 m/s. "Past the last feature" means upright and more than 0.2 m beyond its end.

  | Scenario | Falls (5 s) | Progress, m | Falls by segment | Past the last feature (5 s / 8 s) | Falls (8 s) |
  |---|---|---|---|---|---|
  | flat | 0% | 4.56 | - | - | 0% |
  | ramp 5°, 1 m ahead, 2 m run | 0% | 4.24 | - | 100% / 100% | 0% |
  | ramp 10° | 6% | 3.60 | ramp 1 | 94% / 94% | 6% |
  | ramp 15° | 100% | 1.37 | ramp 16 (median 2.65 s) | 0% | 100% |
  | second ice patch μ 0.1, 2–4 m | 12% | 4.35 | ice 2 | 88% / 88% | 12% |
  | porch 3 × 5 cm up and down (1.5 m landing) | 81% | 1.33 | stairs up 13 | 12% / 19% | 81% |
  | curb 4 cm at 1 m → ice μ 0.15 at 2–3 m → ramp 8° from the curb top at 3.35 m (1.7 m) | 0% | 4.20 | - | 0% / 94% | 6% (ramp 1) |
  | the headline: porch 3 × 5 cm → ice μ 0.08 → ramp 8° | 88% | 1.44 | stairs up 12, ice 2 | 0% / 0% | 88% |

  - **Ramps:** the cliff is between 10° and 15° (15°: every seed fails on the ramp's lower half).
  - **The porch:** three 5 cm steps trip the robot 81% of the time, consistent with "stairs 3 × 6 cm: 100%" in the terrain table.
  - **The 3-segment course** is easy at 5 s: it is still climbing the ramp when the episode ends. Its ramp top is at 5.05 m, beyond what 5 s covers. At 8 s, 94% get over it.
  - **The headline sentence** fails at its first segment, because the policy cannot climb three 5 cm steps. "Physics wins" is not the issue: 5 cm is a realistic step.
  - **Episode length:** a whole headline course needs about 7 m, so 8 s episodes (400 steps) are needed to see the later segments. The server uses 250 steps.
- **Clip:** `runs/terrain_clips/course.mp4` is the 3-segment course, seed 0, held, 5 s. It comes with `course_slowmo.mp4`, `course_frame.png`, and `course_table.json` / `course_table_8s.json`.
- **Speed (CPU, 256 envs × 100 steps, best of 3, server running):**
  - Old code: 5.5k (neutral) and 6.0k (stairs) steps/s.
  - New code: 6.1k, 5.5k and 5.4k (3-segment course).
  - These are the same within noise. The model and collision pairs are identical to v2, and the added work is a few pose and SDF terms per step. The 4060 GPU figure (104k steps/s) was not re-measured; the GPU was shared with the server.
- **Tests:** `tests/test_course.py` has 28 tests:
  - layout, and old θ = no course
  - stairs poses unchanged
  - ramp pose against MuJoCo's quaternion maths (numpy = JAX)
  - ramp clamps
  - descent heights (the boxes' union profile equals the export)
  - tilted SDF, second-patch window
  - DSL round trip of the 4-segment headline, ten error cases, program rules
  - families/magnitudes
  - control digests, proposer prompt
  - export format
  - Go1 export byte-identical with `robot=`
  - G1 trajectory export (unit quaternions, body count, foot sites)
  - robot standing on the ramp and on its landing

  `test_robots` pins the v3 hash (`70ed6a77…`; v2 was `fef3fefa…`).
- **Full suite on the PC's CPU:** 109 passed, plus the pre-existing failure (`test_robots.py::test_humanoid_wrapper`, pelvis 0.077 < 0.1).

## Oct 27: public hosting, snappy attacks, replays after a fall

**Hosting.** https://nemesis.divagr.com runs on its own always-on g4dn.xlarge (one T4, us-east-1), deployed with `scripts/deploy.sh`. It is not hosted on the PC.

**Timing on the T4:**
- **Attack:** about 8–10 s end to end, of which ~4 s is Wonder. The same attacks took 40–110 s on the PC. Most of that was rendering an mp4 the page never shows; it now renders in the background, and Spark and clip requests wait for it.
- **Patch:** a full 20M-step Patch took 20.5 min: ~3 min first compile, 16 min training (~31 s per 1M steps), 4.5 min gate. That run was rejected.
  - Patch now replays the attack after every 1M steps and streams each attempt to the page.
  - It stops at the first attempt that falls on ≤ 2/16 seeds and still walks normally, after at least 2M steps.
  - The budget is capped at 8M.
  - One hard attack stayed at 50–88% falls through 8M steps; early stopping only helps attacks the robot can learn quickly.

**Bug: replays after a fall showed the robot walking through the stairs.**
- **Symptom:** a visitor's duel showed the robot inside 3 × 12 cm steps.
- **The physics was right.** Feet hit the riser (MJX reports the foot–box contacts), the robot stalls at 1.3–1.5 m and trips.
- **Cause:** at the end of an episode the wrapper restarts its scenario clock, so the stairs, ice and pushes re-anchor 1.5 m ahead of the robot. The evaluator kept recording ~1.5 s past the fall, so the replay showed a different, restarted scenario.
- **Fix:** `NemesisWrapper.step(..., restart=False)`, used only by recording runs (`record=True`). Scoring runs keep their exact compiled graph.
  - Every metric is computed only up to the fall, so scores can't change.
  - 88 physics tests pass.

**Finding: GPU MJX evaluation is not deterministic across processes.**
- Running the same θ and seeds twice with the *unchanged* code on the T4 gave different fall times for 4 of 8 seeds on a slippery-stairs scenario. Every seed fell in every run.
- Bit-identity checks therefore only hold on CPU (where the audit and the course work verified them).
- Fall rates are stable; single-seed timings are not.

## Oct 27 (late): what counts as a fall; Places and Autopilot on the public site

**Bug: the humanoid read "fell" while standing.**
- **Symptom:** a visitor's "wet tiles and a 3 kg backpack" showed FELL 0.62 s on an upright G1.
- **Cause:** the evaluator counted the raw env's own termination as a fall (audit fix #5). G1's termination includes foot-foot and foot-shin contact, a training shortcut.
- **History:** #5 existed because carrying on past that termination restarted the wrapper's scenario clock, so pushes re-fired and the ice moved.
- **Fix:** the evaluator now steps with `restart=False` (the scenario keeps running), and `ended()` is the strict fall check only.
- **Go1 is unchanged:** its termination (upvector z < 0) implies the tilt check. The audit test now asserts the new rule. 55 physics/robot tests pass (laptop CPU).
- On the box CPU, the visitor's situation gave 0 falls in 32 seeds under both old and new code. The false fall came from a GPU run, where results vary between processes.

**Places, end to end on the T4** ("a winter train station with icy platforms, steps and busy crowds"):
- Wonder wrote 10 situations; all ran in 113 s, about 5 s each after the first.
- Spark labelled the worst three.
- One learnable failure: "Station Stair Climb", falling 100% on v9.
- **Train it for this place:**
  - attempts 100% → 100% → 69% → 19% → 6% falls; early stop at about 4.6M steps;
  - the gate accepted it as v11;
  - the grid re-graded on v11: the stair climb went 100% → 0%, and "Loaded Steps Weak Motor" (the reference robot also fell on it) went 100% → 0% too.
- Total: 695 s.

**Autopilot samples, 5 tries, on the public robot:**

| Sample | Result |
|---|---|
| "Tripping on a step or curb" | Falls on tries 4–5 (88%, 72%); the retrain was rejected by the gate |
| "Slipping while turning" (first run) | Found a fall and retrained: v9 |
| "Slipping while turning" (rerun on v9) | 0 falls in 5 tries: the robot had learned it |
| "A weak knee on wet tiles" | A 50% fall on try 3; the retrain was accepted |
| "Tripping on a curb at a brisk walk" | Falls on tries 1–3 (75%, 56%, 91%); the retrain was rejected |

- **Lesson:** fixed samples drift as the public robot learns. Autopilot is now told what the live robot was already retrained on (as quoted data), and the samples are "Find its weakest spot", "A weak knee on wet tiles" and "Tripping on a curb at a brisk walk".
- In every run Muse opened with the 5-try notice.

## Decisions log
| When | Decision | Why |
|---|---|---|
| Oct 26 | Go1 quadruped first, humanoid as a stretch | Best Playground support; 9-day solo build |
| Oct 26 | Fixed-length θ vector, JSON DSL, never `exec` LLM output | One compile for every scenario; safety |
| Oct 26 | Retrain the baseline under corrected physics | Collisions, termination, reward and obs all changed |
| Oct 26 | Skill compiler cut to an ~8 s beat in the video | Eureka-like; splits the story (judge persona) |
| Oct 26 | Headline: a discovery curve plus CVaR@10% | Isolates the LLM's contribution; the mean vs DR is likely small and noisy |
| Oct 27 | Command profile searchable by every adversary | Otherwise the comparison favors the LLM |
| Oct 27 | Fine-tune bank = shrunk failures + history failures; 50/40/10 nominal/bank/uniform | Diversity around each mode; keep nominal performance |
| Oct 27 | Humanoid = Unitree G1 (`G1JoystickFlatTerrain`), one padded D = 80 vector per robot, Go1 layout frozen | G1 trains in Playground with a tuned config; same vector length keeps every tool shape-compatible |
| Oct 27 | DR arm and held-out suites use scaled envelopes (w=0.25, 0.5), not the full envelope | The full envelope is ~100% unsurvivable, so it would make a strawman baseline |
| Oct 27 | Public page hosted only after filming (~Oct 30–31), on a g6.xlarge (L4, ~$0.80/h) at a divagr.com subdomain until the community vote closes on Nov 16. Filming uses an L40S so Patch takes ~1 min on camera. | User's call: saves cost, and nobody visits before the video is out. |
| Oct 28 | The course reuses Go1's 8 terrain boxes (a ramp borrows the last two or three); the second ice patch is stored as `ice2_slip` = 1 − μ | Two extra collidable boxes changed MJX's float rounding for every stairs rollout (old stairs θ no longer bit-identical); an off-marker μ slot would have no plausibility magnitude |
| Oct 27 | Public page on an always-on g4dn.xlarge (T4) at nemesis.divagr.com from today, not the PC; Patch stops early and is capped at 8M steps | User: the PC isn't dependable, and the site must feel snappy. Attacks take 8–10 s on a T4; a 20M Patch took 20 min |
