# Nemesis

Robots that train against an AI that's trying to break them.

A Go1 quadruped learns a skill from natural language in MuJoCo. Muse Wonder writes perturbation programs that make the policy fail, CMA-ES tunes them, and Muse Spark watches the failure videos to name each failure mode. The policy is then fine-tuned on those counterexamples and compared with domain randomization at the same compute.

Built for the Meta Global AI Developer Hackathon. See [PLAN.md](PLAN.md) for the plan and [PROGRESS.md](PROGRESS.md) for progress.
