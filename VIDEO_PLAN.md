# Nemesis: demo video plan (v5, Oct 30)

The demo is 25% of the score, and judges use the video to score the other three criteria (impact, use of Meta AI tooling, technical depth). The X cut competes for Most Viral. The live page at nemesis.divagr.com drives the community vote.

## The story
**Every robot needs a nemesis.** Describe any situation in plain language: type it, say it, or show a photo of a real place. Meta's models turn it into physics, and the simulated robot faces it. If it falls, it practises until it doesn't, and you watch every attempt.

Order of importance:
1. **The loop:** describe → fall → learn. It opens the video and gets the most time.
2. **Ways in:** your hands (the Playground), voice, a photo of a real place, a whole route in one sentence.
3. **Playing and autonomy:** You vs Muse, Autopilot, the Readiness report.
4. **Reach:** a humanoid; the whole loop on open weights.

**Tone:** calm, hook first, no drama. This is a tech hackathon, so the study gets one credibility line on the end card and nothing more. Hunting for failures isn't the frame: Autopilot and Readiness appear as features, not as the pitch.

**Never claim:**
- that training on these situations beats domain randomization (the study says it matches hand-tuned DR, without the tuning);
- that Muse finds failures better than random programs (its value is the language interface and the explanations);
- anything the video doesn't show happening.

Every clip is real system output. Every Spark/Wonder quote on screen is verbatim from that take.

## Script (target 2:55; ~360 words of VO)
Status: **built** = works on the live site today; **needs** = what has to land before filming.

| Time | Beat | Picture | VO / on-screen text | Status |
|---|---|---|---|---|
| 0:00–0:07 | **Cold open: the whole idea in 7 s** | A sentence types itself: *"three wet steps"* (3 × 6 cm, μ 0.35: v14 falls 69% → 25% after the full 8M retrain, gate accepts; ~5 min on the L40S, so speed up the chips; or swap in the Playground shove, which stops at 2M). The robot walks into it and trips (ember ring). Hard cut to the attempt chips filling in (before ● 1M ● 2M ● 3M ●) and the same robot climbing the steps. | No VO. Caption chips only, so it reads on mute: *it fell* → *it practised* → *it holds*. | needs: a stairs situation that retrains within 8M steps. Being tested on v14: "3 × 5 cm wet steps + a 4 kg backpack" and "3 × 6 cm wet steps". Pick the one that falls ≥ 50% and stops earliest |
| 0:07–0:12 | **Title** | **Every robot needs a nemesis.** | — | built (hero) |
| 0:12–0:24 | **Why** | One robot walking cleanly, then quick cuts of everyday situations as text over it: a wet step, a backpack, a shove in a hallway, a weak knee. | "Robots learn to walk in simulation. Then the world hands them a wet step, a backpack, a shove in a crowded hallway: situations nobody wrote down. Nemesis lets you write them down, in plain English." | built |
| 0:24–1:05 | **The loop** (the centre of the video) | Screen recording of the hero. Mic → *Muse Voice Transcribe* caption → the step list ("Muse Wonder is turning your words into physics…") → 3D replay, the robot falls → **Train it to survive this** → attempts stream in live (falls 14/16 → 9/16 → 1/16) → gate ✓ Fixed ✓ Still walks ✓ Nothing else broke → the same situation, the new version holds → *Muse Spark* line appears → the safety map's red region shrinks. | "Say a situation. Muse Wonder turns your words into physics: the friction, the load, the push, the exact steps. The robot walks into it, and falls. So it practises. Every million steps it tries again, and you can watch each attempt. When it holds, Nemesis checks it didn't get worse anywhere else before the new version goes live. Muse Spark watches the before and after and says what changed. And the safety map shows how much more it can take now." | built. needs: the L40S box for real-time retraining (else mark the training stretch "sped up" on screen); a Spark line that cites a number |
| 1:05–1:17 | **Playground: your hands** | The Playground page. The live robot walking in the browser; a drag from its right, the red arrow, it falls ("Your shove: 150 N from its right…"). **Teach it this shove** → the server's verdict → attempt chips → gate → the new version loads into the page by itself. The same shove again: it staggers and holds. | "Or skip the words. The live robot runs right in your browser. Shove it. If it falls, teach it that shove, and the new version loads straight back in. Same shove. It holds." | built (verified live Oct 28: a 150 N shove from the right fell v13; the retrain stopped at 2M steps; v14 held the same shove 3 of 3). At ~40 s per 1M steps plus the gate, the retrain is minutes on the T4: film on the L40S or label it "sped up" |
| 1:17–1:35 | **A real place** | A phone photo of a real porch or wet stairs. *SAM 3.1* outlines snap on: each step numbered from the nearest, puddles and icy ground shaded, a ramp if there is one. *Muse Spark's* reading types out (verbatim from the take). Cut to the robot on that course, with the same number of steps. | "Or show it a real place. SAM 3.1 finds and counts the steps and the wet patches, Muse Spark reads the surface, and the robot is tested on exactly those steps." | built (6c6cbe6): SAM 3.1 outlines steps, puddles, icy ground and ramps; steps are numbered from the nearest; SAM's step count becomes the stairs in the physics. Checked on a doorway photo: 3 steps found, Wonder built 3. needs: 3–4 real photos |
| 1:35–1:47 | **A whole route** | Typed: *"Out the front door, down three small steps, across an icy driveway, then up a gentle ramp to the street"*. The course builds in the replay; the route line reads "3 steps up → 3 steps down → ice → 5° ramp". The original falls coming down the steps; the live version makes it to the street. | "Describe a whole route, and it builds the course in order: the steps, the ice, the ramp. The original robot falls on the way down. The current one makes it." | built, and verified live Oct 30 with exactly this sentence: the full course built (3 × 5 cm steps, a landing and back down, ice μ 0.08, a 5° ramp); the original fell 75%, v14 held (0%). "Down three steps" is modelled as up-then-down (the robot starts at ground level), so the VO doesn't describe leaving a doorway |
| 1:47–2:03 | **You vs Muse** | Arena: a person types a situation, Muse "practises" its candidates (step list), the reveal, both replays side by side, score. | "Or play against Muse. You each describe a situation; Muse practises its ideas in the simulator first. Whoever knocks the robot over wins, and every fall becomes a lesson." | built |
| 2:03–2:25 | **Autopilot → Readiness** | Autopilot chat: Wonder's hypotheses, tool calls, "held: hypothesis refuted", *Spark* watching a fall, margin bars. Then the Readiness report scrolls to its headline. | "Autopilot does it on its own. Muse Wonder forms hypotheses, tests them, drops the wrong ones, and measures exactly where falls begin. Then it writes a readiness report: what knocks this robot over, and where it's safe to send it." | built |
| 2:25–2:40 | **Any robot, any model** | The humanoid facing the same sentence as the quadruped, side by side (Both). Terminal: `NEMESIS_OPEN=1`, Glimmer serving, no API key, the same loop running. | "It works on a humanoid too. And the whole loop runs on Muse Glimmer, Meta's open-weight model, on a single GPU." | built (humanoid on the site with the Both toggle; it can't be retrained from the page, so don't show that). needs: the Glimmer terminal shot |
| 2:40–2:55 | **Close** | The lineage v1 → vN with each version's changelog ("learned: …", "still can't: …"), then the hero with the URL. | "Every version keeps a changelog: what it learned, and what still knocks it over. Try your own at nemesis.divagr.com. Every robot needs a nemesis." | built |
| End card | | Built during the hackathon · Muse Wonder · Muse Spark · Muse Voice Transcribe · SAM 3.1 · Muse Glimmer · MuJoCo Playground (Google DeepMind) · Brax · three.js · repo · nemesis.divagr.com | One line: *In a pre-registered study (repo), training on situations written in language matched hand-tuned domain randomization, with no tuning.* | built |

**On screen, every Meta model is labelled at the moment it acts** (a small chip: *Muse Wonder*, *Muse Spark*, *Voice Transcribe*, *SAM 3.1*, *Glimmer*).

## X cut (45 s, 1:1, burned-in captions)
| Time | Picture |
|---|---|
| 0–3 s | The sentence → the fall. Caption: *I described this. It fell.* |
| 3–15 s | Attempt chips filling in, then it holds. Caption: *Then it practised until it didn't.* |
| 15–25 s | Photo → SAM outlines → the robot on that porch. |
| 25–35 s | You vs Muse: the reveal and the score. |
| 35–45 s | The hero and the URL. Caption: *Describe your own: nemesis.divagr.com* |

Posted with one calm hook line plus the live link; the post link goes in the submission form.

## Shot list
| Shot | Where | Notes |
|---|---|---|
| Hero loop: voice → fall → Patch → holds | L40S dev server (real-time Patch), same build as the site | 3+ takes; pick a situation that stops early in ≤ 4M steps |
| Attempt chips + gate + Spark line | same take | Keep the Spark sentence verbatim; it must cite a number |
| Safety map before/after | same take | — |
| Playground shove → teach → shove again | the L40S box (real-time retrain), same build | A side shove that fells the live version ≥ 50% on the server; record the browser and the retrain in one take |
| Real-place photos | your phone | Porch steps, wet tiles, a ramp; well lit, no people. Check that SAM counts the steps right before using a photo |
| Route sentence | public site | Verified live Oct 30 (original 75%, v14 0%); re-take on the current live version |
| You vs Muse | public site | A full 3-round game; one take where you win, one where Muse wins |
| Autopilot investigation | public site | One full run recorded uncut, cut down in the edit |
| Readiness report scroll | public site | Smooth scroll, 1080p |
| Humanoid side by side | public site | Both toggle on Break it |
| Open-weight terminal | an A10G/L4 box running Glimmer | `NEMESIS_OPEN=1`, the same Patch loop |
| Cold open | re-render of the hero take's trajectories | Low-angle camera, slow-mo on the trip |

## Look
- **Match the site:** background #0a0a0a, text #ededeb. **Ember (#ff5b35)** for falls and the situation. **Acid (#d7f25d)** for "held" and passed checks. **Peri (#8b93f8)** for Spark's words.
- **Type:** Inter for titles and captions; IBM Plex Mono for anything a model wrote (typewriter reveal).
- **Sim:** the site's 3D replay for screen shots. For the cold open and the close, a cinematic render: low hero camera, soft key + rim light, shadows, slow-mo from every physics step (not interpolation).
- **Every perturbation visible:**
  - steps and ramps as real geometry;
  - ice as a glossy patch;
  - pushes as a red arrow with the force;
  - load as a box on the back;
  - a weak motor as a tinted leg.
- **Sound:** one licensed track that builds quietly (keep the license file); soft thuds on falls; a light tick per attempt chip. Master at −14 LUFS.

## Toolchain
- **Screen:** OBS, 1080p60, browser at 1920×1080, cursor highlighted.
- **Sim renders:** `nemesis/sim/render.py` re-renders any take from its saved trajectory.
- **Titles and captions:** Remotion (`video/`) if time allows, otherwise Resolve's text tools.
- **Edit and audio:** DaVinci Resolve. VO in your own voice, quiet room, decent mic.

## Deliverables
1. **Judge cut:** 16:9, 1080p60, ≤ 2:59, unlisted YouTube, link tested logged-out.
2. **X cut:** 45 s, 1:1, captions burned in.
3. **README GIFs:** the loop (fall → attempts → holds), photo + SAM, You vs Muse.
4. **Thumbnail:** the same robot twice on the same steps: falling (ember) and holding (acid).

## Schedule (IST)
| When | Task |
|---|---|
| Now → Nov 3, 3 PM | Cold-open situation (testing on v14). The L40S box for real-time retraining; a dry run of every beat; real-place photos; the Glimmer terminal shot; hero, Playground, You vs Muse and Autopilot takes. **Build freeze Nov 3, 3 PM** |
| Nov 3, 3 PM → Nov 5, 3 AM | VO, rough cut, cold-open render, titles; polish, sound, X cut, thumbnail, README GIFs |
| **Nov 5, 3 AM** | Upload, test links, repo public, X post, **submit**. The official deadline is Nov 4, 9 PM ET (Nov 5, 7:30 AM IST) |
| Nov 5 → Nov 16 | The site stays up through the community vote (closes Nov 16) and stops on Nov 17 |

## Quality bar (check before locking)
- [ ] The first 7 s tell the whole idea with the sound off
- [ ] Every Meta model is labelled on screen when it acts
- [ ] Every claim is shown happening; no slide-only sections
- [ ] Every Spark/Wonder line on screen is verbatim from the take
- [ ] Any sped-up footage is labelled as sped up
- [ ] No claim that this beats domain randomization or that Muse out-searches random
- [ ] Clear "built during the hackathon" end card; third-party pieces credited
- [ ] ≤ 2:59, 1080p60, −14 LUFS, captions checked
- [ ] nemesis.divagr.com stays up through the community vote (Nov 16)
