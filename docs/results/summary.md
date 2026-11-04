# Main experiment summary

Discovery counts only plausible (cost <= 0.5) and feasible (fall < 0.95) failures.

## Discovery (distinct plausible+feasible failure modes, cumulative by round)

| Arm | per seed | mean after last round | plausible+feasible failures | attack steps |
|---|---|---|---|---|
| dr | [0, 0, 0], [0, 0, 0], [0, 0, 0] | 0.0 | 0, 0, 0 | 0.0M, 0.0M, 0.0M |
| random | [3, 12, 15], [4, 11, 18], [4, 10, 17] | 16.7 | 58, 79, 56 | 30.7M, 30.7M, 30.7M |
| box | [9, 10, 10], [6, 9, 12], [5, 8, 11] | 11.0 | 40, 37, 41 | 33.3M, 33.4M, 32.8M |
| shuffled | [7, 8, 9], [5, 7, 8], [6, 8, 10] | 9.0 | 23, 19, 22 | 29.5M, 29.9M, 30.2M |
| nemesis | [5, 6, 6], [4, 4, 5], [5, 6, 6] | 5.7 | 6, 5, 7 | 29.4M, 29.3M, 29.4M |

## Discovery, post-hoc strict plausibility (total deviation <= 1.0, <= 3 perturbation families, feasible)

Added after partial results exposed a flaw in the pre-registered cost.

| Arm | modes per round (per seed) | mean after last round | strict failures | median families per failure |
|---|---|---|---|---|
| dr | [0, 0, 0], [0, 0, 0], [0, 0, 0] | 0.0 | 0, 0, 0 | None, None, None |
| random | [0, 0, 0], [0, 0, 0], [0, 0, 0] | 0.0 | 0, 0, 0 | 7, 7, 7 |
| box | [0, 0, 0], [0, 0, 0], [0, 0, 0] | 0.0 | 0, 0, 0 | 7, 7, 7 |
| shuffled | [8, 9, 10], [6, 8, 9], [5, 8, 9] | 9.3 | 20, 21, 24 | 2, 2, 2 |
| nemesis | [5, 6, 6], [5, 5, 6], [5, 6, 7] | 6.3 | 10, 6, 8 | 2, 1, 2 |

## Gauntlet (fall rate; lower is better) and nominal

| Policy | hand | realistic | sobol (DR distribution) | CVaR10 hand | nominal progress (m) |
|---|---|---|---|---|---|
| baseline | 0.279 | 0.025 | 0.603 | -0.834 | 4.56 |
| box_s0 | 0.088 | 0.006 | 0.051 | -0.509 | 4.49 |
| box_s1 | 0.090 | 0.006 | 0.080 | -0.510 | 4.47 |
| box_s2 | 0.086 | 0.000 | 0.070 | -0.489 | 4.57 |
| dr_s0 | 0.098 | 0.003 | 0.021 | -0.588 | 4.50 |
| dr_s1 | 0.090 | 0.000 | 0.031 | -0.535 | 4.50 |
| dr_s2 | 0.092 | 0.000 | 0.032 | -0.528 | 4.46 |
| nemesis_s0 | 0.084 | 0.000 | 0.356 | -0.500 | 4.53 |
| nemesis_s1 | 0.174 | 0.003 | 0.319 | -0.725 | 4.46 |
| nemesis_s2 | 0.113 | 0.000 | 0.242 | -0.589 | 4.56 |
| random_s0 | 0.111 | 0.013 | 0.270 | -0.559 | 4.55 |
| random_s1 | 0.111 | 0.009 | 0.301 | -0.549 | 4.52 |
| random_s2 | 0.115 | 0.009 | 0.368 | -0.610 | 4.50 |
| shuffled_s0 | 0.094 | 0.000 | 0.207 | -0.521 | 4.50 |
| shuffled_s1 | 0.098 | 0.006 | 0.206 | -0.530 | 4.43 |
| shuffled_s2 | 0.092 | 0.009 | 0.199 | -0.527 | 4.45 |

## Cross-play (fall rate of each policy under each arm's failures)

| Policy | box (118) | nemesis (18) | random (193) | shuffled (64) |
|---|---|---|---|---|
| baseline | 0.887 | 0.444 | 0.990 | 0.734 |
| box_s0 | 0.218 | 0.021 | 0.669 | 0.346 |
| box_s1 | 0.319 | 0.049 | 0.723 | 0.383 |
| box_s2 | 0.279 | 0.014 | 0.694 | 0.309 |
| dr_s0 | 0.131 | 0.042 | 0.833 | 0.252 |
| dr_s1 | 0.103 | 0.014 | 0.837 | 0.264 |
| dr_s2 | 0.110 | 0.000 | 0.851 | 0.312 |
| nemesis_s0 | 0.647 | 0.021 | 0.916 | 0.432 |
| nemesis_s1 | 0.609 | 0.104 | 0.953 | 0.510 |
| nemesis_s2 | 0.559 | 0.028 | 0.951 | 0.463 |
| random_s0 | 0.619 | 0.083 | 0.624 | 0.553 |
| random_s1 | 0.663 | 0.083 | 0.550 | 0.545 |
| random_s2 | 0.671 | 0.271 | 0.607 | 0.670 |
| shuffled_s0 | 0.568 | 0.090 | 0.935 | 0.246 |
| shuffled_s1 | 0.553 | 0.028 | 0.909 | 0.252 |
| shuffled_s2 | 0.531 | 0.014 | 0.932 | 0.287 |
