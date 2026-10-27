# Nemesis: demo video plan

Video plus product are about half the score: Demo counts 25%, and judges use the video when scoring the other three criteria. The final round judges watch it live. The X cut also competes for the $20k Most Viral prize, and the live page drives the community vote.

## The idea (v3, Oct 27: product story)
**Try to break the robot. Then watch it learn.** Nemesis is a red team for robots that anyone can use:
- type it, say it, or photograph a place;
- Meta's models turn that into physics;
- the robot falls;
- one click retrains it until it doesn't.

An autonomous agent does the same thing on its own, and writes up what it found.

This is a tech hackathon, so the benchmark gets one credibility line, not a section. Every clip is real system output, recorded on an L40S so Patch takes about a minute on camera.

**Five "wow" moments:**
1. **It learns on camera.** A spoken attack ("a hard shove from the left while it walks") → the robot falls in the 3D replay → **Train it to survive this** → progress bar → regression gate ✓✓✓ → the same attack, same seed, and it catches itself.
2. **Your world.** A phone photo of a real place: a wet monsoon street, polished stairs landing or a ramp. Spark reads it ("packed ice and slush, μ≈0.2"), and the simulated robot is tested there.
3. **The investigator.** Agent mode: Wonder narrates hypotheses, tests them, rejects the ones that fail ("held, hypothesis refuted"), has Spark watch the falls, measures the margin ("falls begin at 108 N") and retrains the robot. All of it is live trace.
4. **The verdict.** The red-team report: "DO NOT DEPLOY on surfaces below μ 0.29 while turning faster than 1 rad/s."
5. **Any robot, any model.** The same pipeline on a humanoid, and the whole loop offline on Muse Glimmer on one GPU.

## Script (target 2:55; about 400 words of VO)

| Time | Beat | Picture | VO / on-screen text |
|---|---|---|---|
| 0:00–0:06 | **Cold open** | Rapid 3D-replay falls (Go1 and the humanoid), each captioned with the attack that caused it in the attacker's own words ("wet tiles and a backpack", "a shove mid-turn"). | Text: *Every one of these was caused by a sentence.* |
| 0:06–0:10 | **Title** | **NEMESIS**: try to break the robot. Then watch it learn. | |
| 0:10–0:22 | **Problem** | A robot walking perfectly in sim. | "Robots trained in simulation fall over in the real world in ways nobody predicted. Before a robot ships, someone should try hard to break it." |
| 0:22–0:55 | **Wow 1: break it, fix it** | Screen recording: mic → Voice Transcribe caption → Wonder's compiled physics → 3D replay, v1 falls (crimson ring) → **Train it to survive this** → gate checklist → same attack: falls → holds. | "Say an attack. Muse Wonder turns it into physics, and the robot falls. One click and Nemesis retrains it on that attack and dozens of variations, checks it didn't get worse anywhere else, and replays it. Now it holds." |
| 0:55–1:15 | **Wow 2: your world** | Phone photo of a real place, then Spark's reading types out, then the robot on that surface. | "Or show it a place. Muse Spark reads the surface and slope from a photo, and the robot is tested right there." |
| 1:15–1:55 | **Wow 3: the investigator** | Agent trace streaming next to the replay: hypothesis → CMA-ES search → refuted / broke it → Spark: "front legs buckle, torso pitches forward" → margin bars → patch → v3. | "Or let Nemesis attack on its own. Wonder forms hypotheses, tests them, throws out the wrong ones, has Spark watch every fall, measures exactly how much margin is left, and retrains the robot." |
| 1:55–2:10 | **Wow 4: the verdict** | Red-team report scrolls: headline, margins, "DO NOT DEPLOY below…". | "Then it writes the report a safety engineer would: what breaks it, why, and where it's safe to deploy." |
| 2:10–2:25 | **It learns from everyone** | Lineage v1→vN, leaderboard, Hall of Fame cards flipping from "fell" to "held". | "Every attack anyone finds becomes the next robot's lesson, and every version is regression-tested on a locked 52-scenario gauntlet." [number from the lineage] |
| 2:25–2:42 | **Wow 5: any robot, any model** | Humanoid shoved and falling, then retrained. Terminal: `NEMESIS_OPEN=1`, Glimmer running, no API key. | "It works on a humanoid too. And the whole red team runs offline on Muse Glimmer, Meta's open-weight model, on a single GPU." |
| 2:42–2:55 | **Close + CTA** | The robot crossing ice, catching itself. URL. | "Robots shouldn't discover their weaknesses in the real world. Try to break ours." |
| End card | | Built during the hackathon · MuJoCo Playground (DeepMind), Brax, evosax, three.js · Muse Wonder, Muse Spark, Muse Voice Transcribe, Muse Glimmer · repo · nemesis.divagr.com · @divagr1925 | One line: *validated in a pre-registered study (repo).* |

**What the video must never claim:** that adversarial training beats domain randomization. The study says it doesn't at our budget. Product claims (it fixes this attack, it passes the gate, it found this failure) are all shown live.

## Art direction
- **Palette:** robot and "defense" in cyan (#22D3EE); Nemesis, attacks and failures in crimson (#E11D48); neutral studio gray for everything else. A dark UI.
- **Type:** Inter for titles. JetBrains Mono for anything an agent wrote, with a typewriter reveal and a short cursor blink.
- **Sim look:** a clean studio scene, soft key light plus rim light, shadows on, 4× MSAA, 1080p at 60 fps. Slow-mo comes from rendering every physics step, not from frame interpolation.
- **Make every perturbation visible** (otherwise the attacks are invisible and the video falls flat):
  - Low friction → a glossy blue "ice" patch on the floor
  - Payload → a visible box strapped to the back, sized by mass
  - Push → a red arrow with a force label
  - Weak motor → that leg tinted red, with intensity proportional to the weakness
  - Latency → a faint ghost of the commanded pose
  - Sensor noise → a jittering HUD readout
  - Terrain → real geometry
- **Cameras:** a tracking cam by default, a low-angle hero cam for falls and recoveries, an orbit for the close.
- **Sound:** one licensed track that builds (YouTube Audio Library or Pixabay, keep the license file). Thuds on falls, soft typewriter clicks for Nemesis text, a riser into each round card. Master at −14 LUFS.

## Toolchain
- **Sim footage:** `nemesis/sim/render.py` in a new cinematic mode. Everything re-renders deterministically from atlas records (ckpt, θ, seed), so footage never has to be captured live and any shot can be re-rendered better later.
- **Motion graphics:** **Remotion** (React to video) in `video/`. It reads the JSON exports (reward curves, atlas, LLM logs, results), so charts and text are real data and update automatically when the numbers change.
- **Screen recording:** OBS at 1080p60 for the web page.
- **Edit and audio:** DaVinci Resolve (free). Voiceover is your own voice on a decent mic in a quiet room. Burned-in captions on the X cut.

## Deliverables
1. **Judge cut:** 16:9, 1080p60, ≤ 2:59, uploaded as unlisted YouTube with a public link that's been tested.
2. **X cut (45 s):**
   - 0–3 s: failure montage
   - 3–6 s: survival grid
   - 6–20 s: Nemesis thoughts plus the hunt grid
   - 20–32 s: before/after
   - 32–38 s: chart
   - 38–45 s: the "break my robot" CTA
   - Big captions, readable on mute. Posted with a hook line plus the live link, and the post link goes into the submission form.
3. **README GIFs:** the hunt grid, before/after, and the attack page.
4. **Thumbnail:** a robot mid-fall in red next to the same robot standing in cyan, captioned "AI vs robot".

## Capture-as-you-build (things you can't recreate later)
| Phase | Capture |
|---|---|
| P1 | Save a policy checkpoint at **every eval** (for the training timelapse). Keep the reward curve JSON. |
| P2 | The first hand-written attack that breaks the baseline: θ, seed and ckpt into the atlas. |
| P3 | **Per-generation CMA-ES populations** (θ for every candidate) for the hunt grid. Every Wonder hypothesis with a timestamp (`runs/llm_log.jsonl`). |
| P4/P6 | Keep **every round's checkpoint** for every arm (for round cards and before/after). |
| P5 | Keep at least one reward-hacking candidate and Spark's verbatim verdict. |
| P7 | Screen-record your own attacks. Ask 3–5 people (friends, Discord) to try breaking it, with consent to show their attacks. |
| P8 | Export all results JSON for Remotion. |

## Schedule
| When | Task |
|---|---|
| Oct 28–29 | Feature polish. Humanoid in the picker. Cinematic camera presets in the 3D replay for capture. |
| Oct 30 | Film on an L40S: voice → break → patch takes; Your-world photos (shoot real places on your phone); a full agent investigation; report scroll; lineage. Several takes of each. |
| Oct 31 | Public page live at nemesis.divagr.com (L4). Ask 3–5 people to break it, with consent to show their attacks. |
| Nov 1–2 | Remotion titles, captions, cold-open montage. Record VO. Rough cut. |
| Nov 3 | Polish, sound, X cut, thumbnail. |
| Nov 4 | Lock by 9 AM ET, upload, test links, X post, submit by noon ET. |

## Quality bar (check every item before locking)
- [ ] Hook works with the sound off in the first 3 s
- [ ] Every Meta model is labelled on screen at the moment it acts
- [ ] Every claim has a visual; no slide-only sections
- [ ] No unreadable code; at most 3 highlighted lines at a time
- [ ] Every number traces back to `analyze.py` output
- [ ] Clear "built during the hackathon" end card; third-party pieces credited
- [ ] ≤ 2:59, 1080p60, audio at −14 LUFS, captions checked
- [ ] Live URL stays up through the community vote (Nov 16)
