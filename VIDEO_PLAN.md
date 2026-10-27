# Nemesis: demo video plan

Video plus product are about half the score: Demo counts 25%, and judges use the video when scoring the other three criteria. The final round judges watch it live. The X cut also competes for the $20k Most Viral prize, and the live page drives the community vote.

## The idea (v2, after the main experiment: red-team framing)
**An AI red team for robots.** Before a robot ships, someone should try hard to break it, and explain what they found. Nemesis does that with Meta's models:
- **Wonder** forms physical hypotheses about why the robot works and writes attacks to test them.
- **Spark** watches every fall and says what went wrong.
- **Anyone** can attack the robot in plain English, typed or spoken.
- Then Nemesis **fixes** what it found.

Every clip is real system output. The tone is an investigation, not a fight: the robot is the subject, Nemesis is the investigator.

**What the video must never claim:** that Nemesis beats domain randomization as a training method. It doesn't at our budget (see the "Honest science" beat). Every number comes from `analyze.py` / `analyze_wide.py`.

**Three "wow" moments:**
1. **The diagnosis.** A slow-mo fall, then Spark's verbatim diagnosis typing out ("both hind feet slid backward and splayed on the ice…"), then Wonder's next hypothesis quoting it, then the hunt confirming it. The Meta-model loop, visible.
2. **Plain-language red teaming.** Live on the page, someone says "make the floor icy and shove it from the left". Wonder compiles it (μ = 0.08, 100 N from the left at t = 2 s), and the side-by-side clip shows the original robot fall and the hardened one.
3. **Before/after.** The same attacks, frame-synced: the original policy falls, the Nemesis-hardened policy catches itself. Held-out attacks: 27.5% → 13.5% falls, and no slower on flat ground.

## Script (target 2:55; under 3:00; about 400 words of VO)

| Time | Beat | Picture | VO / on-screen text |
|---|---|---|---|
| 0:00–0:07 | **Cold open** | 6 one-second slow-mo falls with visible perturbations (ice patch, payload box, push arrow, red-tinted weak leg). Each is labelled with **Spark's name** for that failure mode. | Text: *Each of these failures was found, named and explained by an AI.* |
| 0:07–0:12 | **Title** | **NEMESIS**: an AI red team for robots. | |
| 0:12–0:27 | **Problem** | A robot walking fine in sim, then a cut to a real-world montage (stock-free: sim scenes labelled "wet tile", "backpack", "worn motor"). | "Robots trained in simulation fail in the real world in ways nobody predicted, and when they fail, nobody can tell you why. Before a robot ships, someone should try to break it, and explain what they found." |
| 0:27–1:15 | **The investigation** (centerpiece) | **Wonder** thought stream types a hypothesis; it compiles to an attack card; the **hunt grid** shows candidates turning red; **shrink** reduces it to the most plausible failure. **Wow 1:** **Spark** watches the fall and types its diagnosis; Wonder's next hypothesis cites it; that one breaks the robot too. Failure atlas fills in, every entry named. | "Muse Wonder forms hypotheses about why the robot works and writes attacks to test them. An optimizer finds the most plausible way to make it fall. Muse Spark watches every failure and tells Wonder what it saw, and Wonder uses that to dig deeper." |
| 1:15–1:40 | **The fix** | **Wow 3:** before/after slow-mo on held-out attacks. Bars: held-out attacks 27.5% → 13.5%; DR-style held-out 58% → 38%; flat ground 4.5 → 4.6 m. | "Then Nemesis turns what it found into training. One round halves falls on attacks it never trained on, without making the robot timid." |
| 1:40–2:05 | **Honest science** | A clean chart: the matched-compute comparison. DR, the industry standard, is competitive or better as a *training* method; Nemesis is the only one that tells you *what* breaks and *why*. Pre-registration commit hash on screen. | "We tested this against the industry standard, domain randomization, with pre-registered experiments. As a training method it's just as strong, but it can't tell you what breaks. Nemesis can, even on DR-trained robots." [adjust to the final A–F verdicts] |
| 2:05–2:35 | **Try it** | **Wow 2:** the screen recording. Voice: "make the floor icy and shove it from the left" → Voice Transcribe caption → Wonder's compiled attack → side-by-side clip. Hall of Fame. | "And anyone can red-team it in plain English, typed or spoken. Every attack that still works becomes the robot's next lesson." URL. |
| 2:35–2:50 | **Open weights** | Glimmer logo card + terminal: the same loop running on Muse Glimmer on our own GPU. | "The whole red team also runs on Muse Glimmer, Meta's open-weight model, on a single GPU." |
| 2:50–2:55 | **Close** | The robot crossing an ice patch and catching itself. | "Robots shouldn't discover their weaknesses in the real world. Nemesis finds them first." |
| End card | | Built during the hackathon (all of it) · MuJoCo Playground (DeepMind), Brax, evosax · Muse Wonder, Muse Spark 1.3, Muse Voice Transcribe, Muse Glimmer · repo · live URL · @divagr1925 | |

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
