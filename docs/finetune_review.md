# Literature review: adversarial fine-tuning loops (Oct 27, 2026)

Produced by a research subagent after round 2 failed to learn its bank. [V] = paper opened during the review; [M] = from memory; (inference) = engineering judgement, not a published result.

## Top recommendations, ranked by expected impact
1. **Feasibility and learnability gate first.** SFL ("No Regrets", [2408.15099](https://arxiv.org/abs/2408.15099) [V]) scores each level by p(1−p) from the current policy's success rate (5000 levels sampled, top 1000 kept). Each batch is ρ=0.5 buffer and 0.5 fresh levels, and the buffer is rebuilt every 50 updates. For us: score every bank item with 16–32 rollouts under the *current* policy. Drop items at p_fall ≥ 0.95 (suspected infeasible), downweight items at ≤ 0.05, sample the rest ∝ p(1−p). Re-score every round.
2. **Feasibility check** (inference). Use a privileged oracle or teacher on the suspect items, or rescale each perturbation by 0.5× and 0.25×. An item that still fails about 100% at 0.25× is a bug, not a hard case. Cap how many primitives one scenario can stack.
3. **Anneal severity per item.** Reward-preserving attacks ([2601.07118](https://arxiv.org/abs/2601.07118) [V]): fixed-strength attacks are either destructive or too conservative, and the best range keeps 30–70% of the nominal-to-worst return gap. Start each item where p_fall is 50–75% and raise its severity only once p_fall drops below 20%. RARL also warns that an overly strong adversary blocks learning.
4. **Credit assignment.** With items that fail ≥80% of the time, advantages are mostly noise. Check that the fall penalty is meaningful, that terminations bootstrap 0, and the value function's explained variance on bank vs nominal envs.
5. **Keep the critic and normalizer, but warm up and freeze** (Wołczyk et al., [2402.02868](https://arxiv.org/abs/2402.02868) [V]; specifics are inference). Train the critic for 1–2M steps with the policy frozen. Freeze the observation normalizer early in the round, because slip and fall states shift it and silently change nominal behavior.
6. **Smaller learning rate plus a KL anchor** (Wołczyk [V]: lr 1e-4; BC-KL coefficient 2.0 on stored pre-training states, or kickstarting KL 0.5 with decay). For us: lr 1e-4, or 3e-4 decaying to 3e-5; entropy 1e-2 → 3e-3; KL to the previous round's policy, decayed if it blocks learning.
7. **Longer rounds or a curriculum.** Learning from scratch under strict termination took 46–69M steps. Use a Rudin-style promote/demote severity curriculum per item ([2109.11978](https://arxiv.org/abs/2109.11978) [M]).
8. **Replay older rounds with a floor**, about 25% of the bank slice regardless of score, so forgotten items return. Shift to 60/30/10 if nominal drops more than 3 points.
9. **Asymmetric critic.** Ours (history + privileged + θ) is on the safer side (Baisero & Amato, [2105.11674](https://arxiv.org/abs/2105.11674) [V]). Remaining risk: θ lets the critic predict a fall from the start, which flattens advantages. Test θ-dropout and the explained variance.
10. **Effective sample share.** Bank episodes end early, so 40% of envs gives far less than 40% of transitions. Weight by transitions, or reset some bank episodes at the onset of the perturbation.

## Diagnosis checklist for "round 2 didn't learn its bank"
Feasibility at 0.5× and 0.25× · per-item before/after (forgetting signature) · bank share of transitions · value explained variance on bank vs nominal · entropy, KL and clip fraction · normalizer drift · equal-steps DR-only control · bank clustering (dominated by one mode?) · bootstrap CI (62 vs 63% is noise).

## Pitfalls
- A bank defined by "the policy fails" selects for infeasible items more each round.
- A high adversarial share causes over-conservatism. Shi et al. ([2405.12424](https://arxiv.org/abs/2405.12424) [V]) used 5% adversarial encounters.
- There is no published precedent for 3+ rounds on legged robots.
- Adam moments are not restored on resume, so warm up the learning rate.
- Cycling between fixes. Held-out gains may partly come from extra steps alone, so include an equal-steps nominal+DR control.

## "Robust, not timid"
At a fixed command, report:
- progress, tracking error, cost of transport, foot slip, base height
- robustness curves (fall rate vs magnitude) with area under the curve
- CVaR on the margin

Use paired seeds and stratified bootstrap/IQM ([2108.13264](https://arxiv.org/abs/2108.13264) [M]).

## Related loops
Shi et al. (RSS'24): one attack → fine-tune round on quadrupeds. Ayabe et al. ([2510.13358](https://arxiv.org/abs/2510.13358)). LiRA ([2409.19617](https://arxiv.org/abs/2409.19617)). Q-DEG, Q-DIG, ChatScene (see literature_review.md).
