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
| Oct 27 | DR arm and held-out suites use scaled envelopes (w=0.25, 0.5), not the full envelope | The full envelope is ~100% unsurvivable, so it would make a strawman baseline |
