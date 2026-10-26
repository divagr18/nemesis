# Nemesis: demo video plan

Video plus product are about half the score: Demo counts 25%, and judges use the video when scoring the other three criteria. The final round judges watch it live. The X cut also competes for the $20k Most Viral prize, and the live page drives the community vote.

## The idea
**Robot vs. the AI built to break it.** A fight in rounds. There are two characters, and every clip on screen is real system output:
- **The robot (cyan).** It learns, falls, adapts.
- **Nemesis (crimson).** You only see it through what it does: a stream of thoughts in monospace text (Muse Wonder's actual hypotheses), attacks rendered in red, and verdicts from Muse Spark.

**Three "wow" moments the whole edit builds toward:**
1. **The hunt grid.** 16 robots in a 4×4 grid, each running one CMA-ES candidate. Generation by generation, the grid turns red as the attack homes in.
2. **Before/after slow-mo.** The same attack, frame-synced: round 0 falls, round 3 catches itself.
3. **A live human attack.** Someone types or says an attack on the public page and the robot survives it. Then someone finds a failure, it goes into Nemesis's training pool, and the next round survives it too.

## Script (target 2:55; must be under 3:00, about 400 words of voiceover)

| Time | Beat | Picture | VO / on-screen text |
|---|---|---|---|
| 0:00–0:07 | **Cold open** | 7 one-second slow-mo falls. Each is labelled in red with the name Muse Spark gave that failure ("rear-foot slip on descent", "torque collapse under payload"…). A thud on each cut. | No VO. Text: *Every one of these failures was invented by an AI.* |
| 0:07–0:13 | **Reversal** | Hard cut to black, then the same 7 scenarios in a grid. The robot survives every one. | Text: *Then the robot learned to survive all of them.* Title: **NEMESIS**: robots that train against an AI built to break them. |
| 0:13–0:28 | **Problem** | Left: domain randomization as gray robots with random jitter, "guessing". Right: one targeted red attack. | "Robots trained in simulation break in the real world in ways nobody predicted. The standard fix is to throw random noise at them and hope. What if an AI went looking for the failures on purpose?" |
| 0:28–0:55 | **Teach** | The user says "walk backward up the slope" and a **Muse Voice Transcribe** caption appears. **Muse Wonder** writes the reward (3 highlighted lines, no scrolling walls of code). A training timelapse at 0 / 10M / 50M / 200M steps goes from flailing to walking while the reward curve draws. Then the **Muse Spark judge** moment: a reward-hacked candidate slides on its knees, stamped *REJECTED: "dragging torso, not walking"*. | "Teach it a skill in plain English. Muse Wonder writes the reward, the robot trains in minutes, and Muse Spark watches the video to make sure it's really doing the skill, not gaming the reward." |
| 0:55–1:35 | **The hunt** (centerpiece) | The UI turns crimson. Nemesis's thought stream types out a real Wonder hypothesis. It compiles to an attack program, shown as a pretty-printed card. **Wow 1: the hunt grid** with a generation counter. The result card reads e.g. *rear friction 0.31 + 38 N push → falls 94%*, with a green "physically plausible" meter. The failure atlas map lights up as clusters form, each named by Spark. HUD counter: *failures found: 0 → N*. | "Meet Nemesis. It doesn't add noise. It forms hypotheses about why the robot works, writes attacks to test them, and optimizes them until the robot falls. Every attack stays within physical limits. And Muse Spark watches every failure and names it." |
| 1:35–2:05 | **The comeback** | Fight-game round cards: ROUND 1 → 2 → 3. **Wow 2: before/after slow-mo.** Nemesis adapts ("round 2: Nemesis looks for something subtler") and finds a new failure, which then gets fixed. | "Every failure becomes training data. Then Nemesis attacks again, harder, and the robot keeps getting tougher." |
| 2:05–2:28 | **Proof** | Animated bars for the 4 arms at matched compute, with an *equal env steps* badge. Cross-play heatmap. Small print: 3 seeds · 95% CI · test set locked before any results · nominal performance unchanged. | "Same compute budget: [X]% fewer failures on held-out attacks than domain randomization, and it survives attacks from adversaries it never trained against." *(numbers come only from P8 results)* |
| 2:28–2:48 | **Try it** | Screen recording. **Wow 3: the live human attack**: someone types "icy floor + kick from the left" and the robot survives. Another visitor breaks it: *added to Nemesis's training pool*. Hall of Fame list. | "And you can join the attack. Break the robot and your attack becomes its next lesson." URL on screen. |
| 2:48–2:55 | **Close** | Slow push-in on the robot standing on hard terrain. | "Robots shouldn't discover their weaknesses in the real world. Nemesis finds them first." |
| End card | | Built during the hackathon: [list] · Built on MuJoCo Playground (DeepMind) and Brax · Meta models: Muse Wonder, Muse Spark 1.3, Muse Voice Transcribe, Muse Glimmer (open weights)[, SAM 3.1] · repo · live URL · @divagr1925 | |

**If the results are weaker than hoped:** reframe Proof around what is solid, for example "found N failures that domain randomization never surfaced" and "fixed X of N with no loss on normal walking". Never show a number that isn't in `analyze.py` output.

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

## Schedule (fits into PLAN.md)
| When | Task |
|---|---|
| D5 (Oct 31) | Script v1 with placeholder numbers; storyboard frames as stills |
| D6 (Nov 1) | Cinematic render mode and perturbation visuals (while the sweep runs) |
| D7 (Nov 2) | Remotion project skeleton: HUD, thought stream, round cards. Attack-page screen recordings |
| D8 (Nov 3) | Render all sim shots. Charts from real results. Record VO. **Rough cut by evening** |
| D9 (Nov 4) | Polish, sound, captions, X cut. **Lock by 9 AM ET.** Upload, test links, post on X, submit by noon ET |

## Quality bar (check every item before locking)
- [ ] Hook works with the sound off in the first 3 s
- [ ] Every Meta model is labelled on screen at the moment it acts
- [ ] Every claim has a visual; no slide-only sections
- [ ] No unreadable code; at most 3 highlighted lines at a time
- [ ] Every number traces back to `analyze.py` output
- [ ] Clear "built during the hackathon" end card; third-party pieces credited
- [ ] ≤ 2:59, 1080p60, audio at −14 LUFS, captions checked
- [ ] Live URL stays up through the community vote (Nov 16)
