# Progress log

All project code was written during the Meta Global AI Developer Hackathon build window, from the end of kickoff on Oct 26 to Nov 4, 2026 ("Build it between Oct 26 and Nov 4"). The gates are defined in [PLAN.md](PLAN.md).

| Gate | Passed | Evidence |
|---|---|---|
| G0 Setup | Oct 26 | WSL2 on the RTX 3050 and AWS L40S: both on JAX with CUDA, `pytest` passing on each. First commit made after kickoff on Oct 26. |
| G1 Sim foundation | Oct 26 | Stock baseline: reward 28.5 at 200M steps in 11.5 min on an L40S. `baseline_v2` (NemesisWrapper: body collisions, strict falls, unclipped reward, obs history, θ-aware critic): reward 28.2 in 15 min. Checkpoint at every eval, render from checkpoint, and Wonder (JSON), Spark (video) and Voice Transcribe all verified from our client. Backend: JAX at ~530k steps/s vs MJX-Warp at ~33k steps/s, so we stay on JAX. |
| G2 Perturbation engine | Oct 27 | Hand-written DSL attacks break `baseline_v2` (nominal: 0% falls). Ice μ 0.05: 100% · rear slip μ 0.05: 100% · 150 N side shove: 56% · reversal on ice μ 0.1: 75% · **20 ms latency + noise: 62%, 40 ms: 100%**. A 5 kg payload never broke it. Failures render from logged trajectories with real floor contact (`runs/g2/worst_failures.mp4`). |
| G3 Adversary | Oct 27 | First Nemesis hunt (`runs/hunt_r1`): Wonder proposed 24 hypotheses in 3 rounds; batched CMA-ES (8 programs in parallel, ~30-45 s per round); 8 robust failures (≥50% falls on 32 fresh seeds after shrinking). Top: ice patch during a braking reversal 91%, ice entry plus timed shove 66%, single rear-foot grip loss on a yaw reversal 62%. 896 failing candidates in the search histories. Total cost 13M env steps (~6% of one baseline training). |
| G4 Counterexample training | Oct 27 | Fixed pipeline (after the code audit), one round from `baseline_v2`: hunt `hunt_v3` broke 10 of 16 hypotheses (8.7M steps); curated bank of 238 (92 quarantined as likely infeasible); 50M-step fine-tune `ft_v3`. Before → after (16 seeds): **own bank 80.3% → 15.2%**, **held-out hand-written 27.5% → 13.5%**, **held-out envelope w=0.5 57.9% → 38.4%**, nominal 0% → 0% falls with progress 4.5 → 4.6 m (no timidity), nominal reward back to 28.6. |
| G5 MVD | | |
| G6 Main experiment | | |
| G7 Demo live | | |
| G8 Eval assets | | |
