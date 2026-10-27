# Wide sweep: pre-registered verdicts

## A: hard targets (strict failures, mean [per seed])

| Target | nemesis | shuffled | box | random |
|---|---|---|---|---|
| base | 6.0 [5, 8, 5] | 8.7 [8, 9, 9] | 0.0 [0, 0, 0] | 0.0 [0, 0, 0] |
| dr | 1.3 [1, 1, 2] | 4.7 [2, 7, 5] | 0.0 [0, 0, 0] | 0.0 [0, 0, 0] |
| nem | 2.3 [3, 3, 1] | 7.3 [6, 9, 7] | 0.0 [0, 0, 0] | 0.0 [0, 0, 0] |

Strict modes:

| Target | nemesis | shuffled | box | random |
|---|---|---|---|---|
| base | 5.7 [5, 7, 5] | 6.7 [6, 7, 7] | 0.0 [0, 0, 0] | 0.0 [0, 0, 0] |
| dr | 1.0 [1, 1, 1] | 4.0 [2, 6, 4] | 0.0 [0, 0, 0] | 0.0 [0, 0, 0] |
| nem | 2.0 [2, 3, 1] | 4.3 [5, 3, 5] | 0.0 [0, 0, 0] | 0.0 [0, 0, 0] |

**H-A verdict:** NOT SUPPORTED (nemesis − best other: base -2.7, dr -3.3, nem -5.0)

## B: budget curve on the DR-hardened target (strict failures by attack steps)

| Adversary | 0.5M | 1M | 2M | 5M | 10M |
|---|---|---|---|---|---|
| nemesis | 0.0 | 0.0 | 0.0 | 0.0 | 0.7 |
| shuffled | 0.7 | 1.0 | 2.3 | 3.0 | 5.3 |
| box | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 |
| random | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 |

**H-B verdict:** NOT SUPPORTED (nemesis leads at every budget ≤ 2M)

## C: small (friction, push, load) vs full search space, baseline target

| Adversary | small | full (A, seeds 0-1) | relative drop |
|---|---|---|---|
| nemesis | 5.5 [9, 2] | 6.5 [5, 8] | -18% |
| shuffled | 10.5 [10, 11] | 8.5 [8, 9] | +19% |
| box | 10.5 [10, 11] | 0.0 [0, 0] | +100% |
| random | 0.0 [0, 0] | 0.0 [0, 0] | n/a |

**H-C verdict:** SUPPORTED (nemesis drop -18% vs blind median +60%)

## D: Nemesis ablations (strict failures; 'full' = A's nemesis seeds 0-1)

| Target | full | no Spark feedback | no history | Glimmer proposer |
|---|---|---|---|---|
| base | 6.5 [5, 8] | 6.0 [6, 6] | 7.5 [8, 7] | 10.0 [5, 15] |
| dr | 1.0 [1, 1] | 1.0 [1, 1] | 1.5 [1, 2] | 1.0 [1, 1] |

**H-D1 (Spark feedback helps):** INCONCLUSIVE (favorable but within the seed range)
**H-D2 (history helps):** NOT SUPPORTED
**H-D3 (Glimmer ≥ 50% of Wonder):** SUPPORTED

## E: DR envelope width (fall rate on hand-written + realistic gauntlet)

| w | per seed | mean |
|---|---|---|
| 0.25 | 0.112, 0.097, 0.094 | 0.101 |
| 0.5 | 0.064, 0.062, 0.052 | 0.059 |
| 1.0 | 0.115, 0.118, 0.147 | 0.127 |

**H-E verdict:** SUPPORTED (both widths outside and above the w=0.5 seed range)

