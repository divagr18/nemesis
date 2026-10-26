# Progress log

All project code was written during the Meta Global AI Developer Hackathon build window, from the end of kickoff on Oct 26 to Nov 4, 2026 ("Build it between Oct 26 and Nov 4"). The gates are defined in [PLAN.md](PLAN.md).

| Gate | Passed | Evidence |
|---|---|---|
| G0 Setup | Oct 26 | WSL2 on the RTX 3050 and AWS L40S: both on JAX with CUDA, `pytest` passing on each. First commit made after kickoff on Oct 26. |
| G1 Sim foundation | Oct 26 | Stock baseline: reward 28.5 at 200M steps in 11.5 min on an L40S. `baseline_v2` (NemesisWrapper: body collisions, strict falls, unclipped reward, obs history, θ-aware critic): reward 28.2 in 15 min. Checkpoint at every eval, render from checkpoint, and Wonder (JSON), Spark (video) and Voice Transcribe all verified from our client. Backend: JAX at ~530k steps/s vs MJX-Warp at ~33k steps/s, so we stay on JAX. |
| G2 Perturbation engine | | |
| G3 Adversary | | |
| G4 Counterexample training | | |
| G5 MVD | | |
| G6 Main experiment | | |
| G7 Demo live | | |
| G8 Eval assets | | |
