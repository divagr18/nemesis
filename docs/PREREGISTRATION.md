# Pre-registration: where does Nemesis help? (written Oct 27, before running these experiments)

Context: the main sweep showed that matched-compute DR (w=0.5) ties or beats adversarial fine-tuning, and that Wonder's hypotheses were not more efficient than structured random programs at finding plausible failures against the *baseline* policy (see `LAB_NOTEBOOK.md`). These experiments map the boundary. Every hypothesis below states its metric and what would count **against** it. Results are reported whichever way they come out.

## Shared definitions
- **Adversaries:**
  - **nemesis:** Wonder programs + CMA-ES + shrink + Spark feedback
  - **shuffled:** blind random programs + CMA-ES
  - **box:** CMA-ES over every θ slot
  - **random:** uniform θ over the envelope
- **Strict failure** (the metric introduced after the main sweep; used here from the start):
  - fresh-seed fall rate ≥ 0.5 and < 0.95
  - total normalized deviation ≤ 1.0
  - ≤ 3 perturbation families active
- **Mode:** (fall direction, cause family).
- **Budget:** env steps charged to the attack, including search, shrink, fresh-seed checks and Spark probes.
- **Statistics:** per-seed values shown; mean ± range; no claim from a difference smaller than the seed-to-seed range.

## A: hard targets (attack-only, no training)
- **Setup:** each adversary attacks fixed target policies: `dr_s1/round_2` (DR-hardened), `nemesis_s0/round_2` (Nemesis-hardened), and `baseline_v2` (fragile reference). Budget 10M attack steps per run, 3 seeds per (adversary, target).
- **H-A:** against hardened targets, nemesis finds **more strict failures** than shuffled, box and random (mean over seeds), and the gap is larger than against `baseline_v2`.
- **Against H-A:** nemesis's mean strict failures on DR-hardened targets ≤ the best other adversary's mean.

## B: budget curve (from A's logs)
- **Metric:** cumulative strict failures and modes as a function of attack steps, at 0.5M, 1M, 2M, 5M and 10M.
- **H-B:** nemesis's advantage (ratio of strict failures vs the best other adversary) is largest at the smallest budgets.
- **Against H-B:** at ≤ 2M steps, nemesis does not lead.

## C: search-space size
- **Setup:** attack `baseline_v2` with the allowed perturbation families restricted to a *small space* (friction, push, load) vs the *full space* (all 8 families). 4 adversaries × 2 spaces × 2 seeds, 10M steps.
- **H-C:** going from the small to the full space, blind adversaries (random, box, shuffled) lose a larger fraction of their strict-failure count than nemesis does.
- **Against H-C:** nemesis's relative drop ≥ the blind adversaries' median relative drop.

## D: ablations and the open-weight proposer
- **Setup:** nemesis variants attacking `baseline_v2` and `dr_s1/round_2`, 2 seeds, 10M steps:
  - full
  - no Spark feedback (`--no-observe`)
  - no attack history in the prompt (`--no-history`)
  - **Muse Glimmer** as proposer (`--proposer glimmer`, self-hosted Q4_K_M)
- **H-D1:** Spark feedback increases strict failures (full > no-observe).
- **H-D2:** history increases strict failures (full > no-history).
- **H-D3:** Glimmer reaches at least 50% of Wonder's strict-failure count. This is a feasibility claim, not superiority.
- **Against:** each H-D is falsified if the stated inequality fails on the seed mean.

## E: DR envelope width (training)
- **Setup:** DR arm with w = 0.25 and w = 1.0 (w = 0.5 comes from the main sweep). 3 rounds, same budget as the main sweep, 3 seeds. Evaluated on the locked gauntlet.
- **H-E:** both w=0.25 and w=1.0 are worse than w=0.5 on the hand-written + realistic gauntlet (fall rate). That is, DR's performance depends on a well-chosen, hand-picked envelope.
- **Against H-E:** either width is within the w=0.5 seed range or better.

## F: residual repair of a DR-trained policy
- **Setup:** starting from `dr_s1/round_2` and `dr_s2/round_2`:
  - (i) fine-tune on the curated bank of failures Nemesis found against that policy in A, 40M steps;
  - (ii) continue DR (w=0.5) for 40M steps.

  Evaluate on (a) the residual failures Nemesis found, using a held-out half not trained on, and (b) the locked gauntlet.
- **H-F:** (i) reduces falls on held-out residual failures more than (ii), with gauntlet falls no worse than (ii) + 2 points.
- **Against H-F:** (i) is not better than (ii) on the held-out residuals, or it is worse on the gauntlet by more than 2 points.

## Not changing after seeing results
These definitions, thresholds, targets and seeds are fixed by this commit. Any metric added later is labeled post-hoc and reported alongside these.
