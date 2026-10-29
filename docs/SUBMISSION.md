# Nemesis: submission drafts

Ready to paste into the submission form and onto X. Nothing here has been posted. Before submitting: fill in the video link, make the repo public, and check every number against the README.

## Project name
Nemesis

## Tagline
**Every robot needs a nemesis.**

If the form wants a descriptive line instead (or as well):
> Describe a situation in plain English, and a simulated robot dog faces it, falls, and learns to handle it.

## Short description (~150 words)
Nemesis lets anyone put a walking robot in a situation and watch it learn. Describe the situation in plain English, say it out loud, or photograph a real place. Meta's Muse models turn it into physics: Muse Wonder writes a physics program, SAM 3.1 finds and counts the steps in your photo, and Muse Spark reads the surface. A Unitree Go1 faces it in MuJoCo, and you watch it in a 3D replay. If it falls, one click retrains it with PPO on a GPU. You see every attempt as it trains, and each new version has to pass a regression gate before it goes live: the situation is fixed, it still walks, and nothing on a locked 52-scenario gauntlet got worse. In the Playground, the live robot runs in your browser; shove it by hand and teach it that shove. It is live at nemesis.divagr.com, and the whole loop also runs offline on Muse Glimmer.

## Long description (~400 words)
Nemesis lets anyone put a walking robot in a situation and watch it learn.

You describe the situation in plain English ("wet tiles and a 3 kg backpack"), say it out loud, or photograph a real place. Meta's Muse models turn it into physics, and a simulated Unitree Go1 faces it in MuJoCo. The original robot and the live version run it on the same seeds, and you watch both in a 3D replay in the browser.

If the robot falls, one click retrains it. Nemesis fine-tunes the live policy with PPO on a GPU, on your situation, 48 nearby variants and every earlier lesson. Every million steps the robot tries your situation again, and you watch each attempt; training stops as soon as it holds. A regression gate then checks that the situation is fixed, the robot still walks normally, and nothing on a locked 52-scenario gauntlet got worse. Only then does the new version go live, and Muse Spark explains what changed. Every visitor's situations feed the same lineage, and each version keeps a changelog.

Six pages:
- **Break it:** type, say or photograph a situation. A whole route in one sentence ("out the front door, down three small steps, across an icy driveway, then up a gentle ramp") becomes an ordered course.
- **You vs Muse:** you and Muse each write a situation per round, scored on how small a change still knocks the robot over.
- **Playground:** the live robot runs in your browser on MuJoCo's WebAssembly build. Shove it; if it falls, teach it that shove, and the retrained version loads back into the page.
- **Live deployment:** describe where the robot will work. Muse Wonder writes the situations it would meet there, runs them, and trains for the ones it fails.
- **Autopilot:** Muse Wonder runs an investigation on its own, with native tool calling.
- **Readiness report:** what knocks a version over, why, and where it is safe to deploy.

We also ran a pre-registered study against domain randomization and random search. Writing situations as programs is what makes plausible failures findable; searching the raw parameter box finds none. The language model is not a better searcher than random programs: what it adds is the explanation and the plain-English interface. Training on these situations needs no envelope tuning and matches hand-tuned domain randomization. Muse Glimmer, Meta's open-weight model, does this job as well as Muse Wonder, and the whole loop runs offline on one 24 GB GPU.

Everything was built during the hackathon. The lab notebook in the repo records every bug, incident and decision.

## How it uses Meta AI
| Model | Its role in Nemesis |
|---|---|
| **Muse Wonder** (`muse-wonder-1.0`) | Compiles each plain-English situation into a JSON physics program in Nemesis's DSL (validated, never executed). Builds a real place from Spark's reading and SAM's step count. Plays Muse in You vs Muse; in Hard mode it writes six candidates and practises them in the simulator before committing. In Live deployment it writes 8–12 situations for a described place, then rewrites the ones the original robot held on into harder realistic versions (kept only if they fall more). Runs Autopilot as a native tool-calling agent. Writes version changelogs and the Readiness report. Every call carries prompt-cache hints (7,782 of 7,826 input tokens cached on a repeat translate). |
| **Muse Spark 1.3**, contributor tier on every call | Reads photos and videos of real places into surface, slipperiness, slope and hazards. Watches the before/after clip of each retrain with measured gait numbers and says what changed. Names the worst three situations in Live deployment. Watches falls for Autopilot. Checks visitor text and handles once before anyone else sees them. |
| **Muse Voice Transcribe** | Spoken situations on Break it and in You vs Muse. |
| **SAM 3.1** | Outlines steps, puddles, icy ground and ramps in a photo of a real place (one request per phrase, in parallel with Spark). Steps are numbered from the nearest, and SAM's step count becomes the number of stairs in the physics. Masks are decoded in the page with Meta's `@meta-sam/parser` and drawn over the photo. |
| **Muse Glimmer** (open weights, 30B Q4_K_M via llama.cpp) | With `NEMESIS_OPEN=1`, it replaces Wonder everywhere: translating situations, proposing programs, writing report text. It also watches clips through its own vision encoder. In the pre-registered study it proposed programs as productive as Wonder's. |

## Technical depth
- **One fixed physics vector.** Every situation compiles to the same 80-slot vector θ: per-foot friction and ice patches, payload with correct inertia, slope, motor strength, joint friction, latency, timed pushes, sensor noise and bias, command profiles, and terrain (stairs up and back down, curbs, a ramp, a second ice patch, built from eight boxes the feet collide with). The MJX simulator is jitted once and runs thousands of different situations in one batch.
- **A DSL compiled from language.** 16 composable ops, including `stairs`, `curb` and an ordered `course`. Every number is fixed or a `[lo, hi]` range that CMA-ES can search. Model output is schema-validated JSON and is never executed.
- **PPO retraining with early stop and a regression gate.** Brax PPO on the situation, 48 nearby variants and the community lesson bank. An attempt every 1M steps is streamed to the page; training stops at the first attempt that falls on ≤ 2 of 16 seeds and still walks normally, capped at 8M steps (about 40 s per 1M on a T4). The gate checks the fix, nominal walking, and a locked 52-scenario gauntlet.
- **The Playground in the browser.** MuJoCo's official WebAssembly build (3.17.0, the same version as the server's Python bindings) loads the exact compiled training model, stripped of visual meshes to 55 KB; a stripped and a full model give bit-identical shoved rollouts. The policy runs in plain JS, within 3e-7 m of the Python reference stepper until a fall. Shoves are capped to the training envelope, and every shove is re-run on the server's MJX before any training.
- **Guardrails for a public site.** A spend ledger prices every model call. Per-visitor limits apply per minute and per 6 hours and are charged before any paid call. From $100 of tracked spend the site clamps to at most $2/h, and paid calls stop at $125. A GPU queue cap and a retrain queue that joins duplicates protect the GPU. Muse Spark moderates visitor text before it appears anywhere public, and public lists fail closed. Uploaded clips are deleted from Meta's Files API after use.

## Bonus categories
- **Most Viral on X.** Every situation has a share link with a preview card, a looping GIF of the fall and a vertical clip. The share post is written as a challenge ("I challenged @AIatMeta's Muse to keep its robot dog standing…"), so each post invites the next person to try. A 45-second X cut of the video goes with the launch post.
- **Best open-weight build.** `NEMESIS_OPEN=1` runs the whole loop on Muse Glimmer with no API key: translation, program proposals, report text and clip watching. On one A10G (24 GB), Glimmer with its vision projector uses 17.7 GB, and 19.1 GB at peak with the simulator on the same GPU. Voice uses Whisper on the CPU, since Meta has no open speech model; the SAM photo outlines are skipped in this mode. In the pre-registered study, Glimmer was as good as Wonder at proposing programs.
- **Community vote.** The site stays up through the vote (closes Nov 16). The robot learns from everyone: situations from visitors trigger community retrains, the lineage shows each version's changelog, the Hall of Fame shows which version each situation broke, and the leaderboard rewards the subtlest one.
- **Best agentic.** Autopilot is Muse Wonder with native tool calling (`test_hypothesis`, `measure_margin`, `watch`, `patch`, `finish`). It forms hypotheses, searches each one with CMA-ES for the most plausible failure, drops the ones that don't hold, has Spark watch the falls, measures where falls begin, and retrains through the same regression gate. On the public site each investigation gets 5 tries, and Muse says so up front.

## Links
- Live site: https://nemesis.divagr.com
- Repo: https://github.com/divagr18/nemesis (make public before submitting)
- Video: [YouTube link, unlisted, tested logged-out]
- X post: [link after posting]

## X launch post drafts
Each is under 280 characters with the link (X counts a link as 23). Pick one; attach the 45-second X cut.

**1. The route (verified live Oct 30)** (~262 characters)
> I told @AIatMeta's Muse: out the front door, down three small steps, across an icy driveway, then up a ramp. It built that course for a robot dog. The first version fell on the steps. The current one makes it to the street.
>
> Try your own: https://nemesis.divagr.com

**2. The loop** (~216 characters)
> For the Meta hackathon I made a robot dog you can describe situations to. Say "wet tiles and a backpack" and it walks into exactly that. If it falls, it practises until it doesn't.
>
> Your turn: https://nemesis.divagr.com

**3. The Playground** (~211 characters)
> You can shove this robot dog in your browser. If your shove knocks it over, teach it that shove, and a few minutes later the new version loads back in and takes the same hit.
>
> Go push it: https://nemesis.divagr.com
