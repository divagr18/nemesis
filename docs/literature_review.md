# Literature review (Oct 26, 2026)

Produced by a research subagent. **[V]** = paper or abstract opened during the review; **[M]** = cited from memory, so check the arXiv ID before citing.

## Novelty check: closest works
No paper found where an LLM writes parameterized physical perturbation programs, tunes them with CMA-ES, and runs counterexample-guided PPO fine-tuning for legged robots. Searched about 10 query variants, so the claim is "to our knowledge".

1. **Q-DEG**, red-teaming VLAs via quality-diversity environment generation, [2610.14415](https://arxiv.org/abs/2610.14415) [V]. **Closest loop shape.**
   - Method: CMA-MAE over a 25-D environment vector, MIQP feasibility repair, diversity from policy-embedding PCA, then fine-tunes on successful rollouts plus 10% of the original data.
   - Baselines: randomization and plain CMA-ES.
   - Differences from Nemesis: manipulation VLAs, no LLM generator, no program structure, no VLM naming. Our arm (c) is roughly Q-DEG without the QD archive.
2. **Q-DIG**, [2603.12510](https://arxiv.org/abs/2603.12510) [V]. VLM plus quality diversity searches over *instructions* to break VLAs, then fine-tunes. Not physics.
3. **Shi et al.**, adversarial attacks on quadrupedal locomotion (RSS'24), [2405.12424](https://arxiv.org/abs/2405.12424) [V].
   - Sequential attacks on actions and observations.
   - Finding: "robust" controllers fail under low-magnitude attacks, and fine-tuning on the found failures helps.
   - No LLM and no physical-parameter programs.
4. **DrEureka**, [2406.01967](https://arxiv.org/abs/2406.01967) [V]. The LLM writes domain-randomization ranges once; no adversarial loop. **Eurekaverse**, [2411.01775](https://arxiv.org/abs/2411.01775) [V]. The LLM writes terrain code with performance feedback, but as a capability curriculum, not a worst-case search.
5. **ChatScene**, [2405.14062](https://arxiv.org/abs/2405.14062) (CVPR'24) [V], and **LD-Scene**, [2505.11247](https://arxiv.org/abs/2505.11247). LLM → scenario DSL (Scenic) → safety-critical driving scenarios → fine-tune the RL driver (9% fewer collisions). **Closest conceptual precedent. Cite prominently.**
6. **ADD**, regret-guided diffusion for adversarial environment design, [2410.19715](https://arxiv.org/abs/2410.19715).
7. Adversarial synthetic scenarios for robot safety, [2606.05952](https://arxiv.org/abs/2606.05952). A position paper with no results.
8. **RARL** [1703.02702](https://arxiv.org/abs/1703.02702), **RAP** [2008.01825](https://arxiv.org/abs/2008.01825) [M], falsification-based RARL [2007.00691](https://arxiv.org/abs/2007.00691).

Before submitting, check the papers citing DrEureka on Google Scholar for anything unindexed. Also open GenTe ([2504.09997](https://arxiv.org/abs/2504.09997), VLM-generated terrains for legged robots).

## Top 10 improvements, ranked by value/effort
1. **Learnability filter for the bank.** Keep scenarios where 0.1 < p < 0.9 and weight them by p(1−p) (No Regrets, [2408.15099](https://arxiv.org/abs/2408.15099)). Regret proxies such as positive value loss mostly track success rate.
2. **Feasibility gate.** Accept a counterexample only if it's solvable, for example by a policy briefly fine-tuned on it, or if the nominal policy survives at least 10% of the time. PAIRED's pitfall is unsolvable adversarial scenarios.
3. **Regret-style objective.** Minimize return relative to a reference policy on the same scenario, not raw failure (PAIRED, Robust PLR [2110.02439](https://arxiv.org/abs/2110.02439)).
4. **Quality-diversity atlas.** CMA-MAE or MAP-Elites (pyribs) with descriptors such as program type, severity, and failure time or body part. Restart from archive elites when the search stagnates.
5. **Training mix.** 50% nominal / 40% counterexamples / 10% uniform DR, with a nominal floor: roll back if nominal success drops more than 3 points. Keep a replay of all earlier rounds to avoid cycling.
6. **Adversary-strength curriculum.** Widen the envelope as the policy improves (ADR, [1910.07113](https://arxiv.org/abs/1910.07113)).
7. **Strong, fair DR baseline.** Same envelope. If time allows, add an ADR- or DORAEMON-style adaptive DR arm.
8. **Program-type bandit.** The LLM sees archive occupancy, proposes for under-filled cells, and spends 20% of proposals mutating elites (ACCEL, [2203.01302](https://arxiv.org/abs/2203.01302)).
9. **Cheap-then-full evaluation.** Short rollouts with 64 envs for all CMA-ES candidates, full re-evaluation for the top 5%. Every step still counts toward the budget.
10. **VLM as auditor only.** It names and clusters failures and flags reward hacking, but never gates numbers. Report its agreement with about 30 human-labelled clips.

## Evaluation protocol
- **Metrics:** nominal success; success under held-out uniform DR; **CVaR@10%**; worst case over the gauntlet.
- **Robustness curves:** success vs. magnitude for each perturbation, shown as a heatmap of arm × perturbation.
- **Cross-play matrix** plus a **fresh adversary never used in training**, to catch overfitting to the training adversary.
- **Statistics:** IQM or mean with stratified bootstrap confidence intervals (Agarwal et al., [2108.13264](https://arxiv.org/abs/2108.13264)). Be explicit that 3 seeds limits the claims.
- **Budget table:** search plus fine-tune steps per arm. Also report a supplementary run with equal policy-training steps and no adversary.
- **Gauntlet:** locked and hashed before results, made of hand-authored scenarios plus a Sobol sample of the envelope that is independent of every arm.
- **Cheap ablations:** no-LLM (arm c), LLM without archive feedback, ± feasibility gate, ± learnability filter.
- **Human attacks:** report as exploratory, with counts, and only after the policies are frozen.

## Pitfalls
- Unconstrained adversaries produce unsolvable or implausible scenarios and make the policy conservative.
- Regret proxies are not regret.
- Regret-based UED needs many interactions at MuJoCo scale and may lose to DR at small budgets. Pre-register that this outcome is acceptable.
- Low-magnitude attacks find narrow weaknesses, so a fix for one may not transfer to others.
- Forgetting and cycling. Mitigations: replay, a nominal mix, rollback.
- LLM outputs vary a lot between samples, so log proposal seeds. Validate every program against the bounds.
- **The atlas goes stale as the policy changes.** Re-evaluate elites against the current policy every round.
- VLM judges are noisy.

## README positioning paragraph
> Nemesis casts policy hardening as a falsification-and-repair loop. An LLM proposes *programs* in a bounded physical-perturbation DSL (friction, payload, motor strength, pushes, latency, noise, slope), CMA-ES tunes each program's free parameters to minimize a Go1 policy's success under a plausibility penalty, and a VLM names and clusters the resulting failures into an atlas. The policy is then fine-tuned on a nominal-plus-counterexample bank, in the spirit of RARL and unsupervised environment design but with a language-model proposer in place of a learned adversary. Prior LLM work generates rewards, DR ranges (DrEureka), or terrains (Eurekaverse), and prior red-teaming of robot policies (Q-DIG, Q-DEG) targets VLA instructions and manipulation scenes. To our knowledge, no prior work uses an LLM to write adversarial physics programs for legged locomotion, and we compare it against uniform DR, random search, and parameter-only CMA-ES at matched environment-step budgets.

## More references
PAIRED [2012.02096](https://arxiv.org/abs/2012.02096) · PLR [2010.03934](https://arxiv.org/abs/2010.03934) · Active DR [1904.04762](https://arxiv.org/abs/1904.04762) · Stabilizing UED [2308.10797](https://arxiv.org/abs/2308.10797) · HJ-reachability disturbances [2409.19746](https://arxiv.org/abs/2409.19746) · Embodied Red Teaming [2411.18676](https://arxiv.org/abs/2411.18676) · OMNI-EPIC [2405.15568](https://arxiv.org/abs/2405.15568) · CurricuLLM [2409.18382](https://arxiv.org/abs/2409.18382) · RMA [2107.04034](https://arxiv.org/abs/2107.04034) · Walk These Ways [2212.03238](https://arxiv.org/abs/2212.03238) · Rudin et al. [2109.11978](https://arxiv.org/abs/2109.11978) · MAP-Elites [1504.04909](https://arxiv.org/abs/1504.04909) · Adaptive stress testing [1811.02188](https://arxiv.org/abs/1811.02188)
