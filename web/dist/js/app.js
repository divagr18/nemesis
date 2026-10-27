// Nemesis page: attack (text / voice / photo), 3D replay, patch with live progress, agent mode trace,
// leaderboard, hall of fame, lineage.
import { mountReplay } from "./replay.js";

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
const pct = (x) => `${Math.round((x ?? 0) * 100)}%`;
let live = "v1";

// ---- robot badge + lineage --------------------------------------------------------------------
async function loadVersions() {
  try {
    const v = await (await fetch("/api/versions")).json();
    live = v.live;
    const patched = v.versions.reduce((n, x) => n + (x.attacks?.length || 0), 0);
    $("robot-badge").innerHTML = `live robot <b>${esc(v.live)}</b> · ${v.versions.length - 1} patches · ${patched} attacks learned`;
    $("label-right").textContent = `Live robot (${v.live})`;
    $("lineage").innerHTML = v.versions.map((x) => `
      <div class="node ${x.name === v.live ? "live" : ""}"><b>${esc(x.name)}</b>
        ${x.parent ? `from ${esc(x.parent)} · ${x.attacks.length} attack${x.attacks.length === 1 ? "" : "s"}` : "original policy"}<br>
        <span class="muted">${new Date(x.created * 1000).toLocaleString()}</span></div>`).join("");
  } catch (e) { $("robot-badge").textContent = "robot offline"; }
}

// ---- attack -----------------------------------------------------------------------------------
const EXAMPLES = ["make the floor icy", "a 5 kg backpack and a shove from behind",
  "weak back-left knee on a downhill ramp", "40 ms of control lag while it sprints",
  "slippery front feet when it suddenly brakes"];
EXAMPLES.forEach((t) => { const b = document.createElement("button"); b.className = "chip"; b.textContent = t;
  b.onclick = () => { $("text").value = t; }; $("chips").appendChild(b); });

const STEPS = ["Nemesis is reading your attack…", "Muse Wonder is writing the physics…",
  "Simulating the robot in MuJoCo…", "Rendering the rollout…"];
let tick;
function busy(on) {
  $("go").disabled = on; $("mic").disabled = on; $("world-btn").classList.toggle("disabled", on);
  clearInterval(tick);
  if (on) { let i = 0; $("thinking").textContent = STEPS[0];
    tick = setInterval(() => { i = Math.min(i + 1, STEPS.length - 1); $("thinking").textContent = STEPS[i]; }, 4000); }
  else $("thinking").textContent = "";
}
function verdict(el, fell, rate, who) {
  el.className = "v " + (fell ? "fell" : "held");
  el.innerHTML = `<b>${fell ? "Fell" : "Held"}</b>${who}: fell in ${pct(rate)} of 4 tries`;
}
let replay = null;
async function stage(clip, trajs, labels) {
  if (replay) { replay.dispose(); replay = null; }
  $("mp4").href = clip;
  const el = $("stage");
  el.innerHTML = "";
  if (trajs && trajs.length) {
    el.className = "";
    replay = await mountReplay(el, {assetsUrl: "/assets/go1_scene.json",
      trajUrls: trajs.map((t, i) => ({label: labels?.[i] || t.label, url: t.url}))});
    if (!replay.error) return;
    replay = null;
  }
  el.className = "video";  // fallback: the rendered mp4
  el.innerHTML = `<video src="${clip}" autoplay muted loop playsinline controls></video>`;
}
let current = null;
function worldView(r) {
  const el = $("world-reading");
  if (!r.reading) { el.hidden = true; return; }
  const m = r.reading, isVid = /\.(mp4|mov|webm|m4v)$/i.test(r.media);
  el.hidden = false;
  el.innerHTML = `${isVid ? `<video src="${r.media}" autoplay muted loop playsinline></video>` : `<img src="${r.media}" alt="your place">`}
    <div><span class="k mono muted" style="font-size:11px;letter-spacing:.12em">MUSE SPARK READ YOUR PLACE</span>
    <h3 style="margin:4px 0 10px">${esc(m.place)}</h3><dl>
    <dt>surface</dt><dd>${esc(m.surface)}</dd><dt>friction</dt><dd>μ ≈ ${(+m.friction).toFixed(2)}</dd>
    <dt>slope</dt><dd>${(+m.slope_deg).toFixed(0)}°</dd><dt>slippery</dt><dd>${esc(m.slippery_patches)}</dd>
    <dt>hazards</dt><dd>${esc(m.hazards)}</dd><dt>why</dt><dd class="muted">${esc(m.reasoning)}</dd></dl></div>`;
}
function show(r) {
  current = r;
  $("result").hidden = false;
  worldView(r);
  $("patch-panel").hidden = true;
  stage(r.clip, r.trajs, ["Original robot (v1)", `Live robot (${r.version})`]);
  $("label-left").textContent = "Original robot (v1)";
  $("label-right").textContent = `Live robot (${r.version})`;
  verdict($("vb"), r.broke_baseline, r.fall_rate_baseline, "Original robot");
  verdict($("va"), r.broke_trained, r.fall_rate_trained, `Live robot ${r.version}`);
  if (r.score) $("va").innerHTML += `<br><span class="mono">+${r.score} points</span> <span class="muted">(subtlety ${pct(1 - r.implausibility)})</span>`;
  $("patch").hidden = !(r.fall_rate_trained > 0) || r.survivable === false;
  if (r.survivable === false) $("va").innerHTML += `<br><span class="muted">Physics wins: even our toughest robot falls ${pct(r.reference_fall_rate)} of the time here. Try something subtler.</span>`;
  $("patch").disabled = false;
  $("prog").textContent = (r.transcript ? `heard: "${r.transcript}"\n\n` : "") + JSON.stringify(r.conditions, null, 2);
  $("share").onclick = () => {
    const msg = r.broke_trained ? `I broke the Nemesis robot (${r.version}) with: "${r.text}"`
                                : `I tried "${r.text}" and the Nemesis robot ${r.version} survived.`;
    window.open("https://x.com/intent/post?text=" + encodeURIComponent(msg + " Try it:") + "&url=" + encodeURIComponent(location.href), "_blank");
  };
  $("result").scrollIntoView({behavior: "smooth", block: "start"});
  loadHof();
}
async function send(url, opts) {
  busy(true);
  try {
    const res = await fetch(url, opts);
    const body = await res.json();
    if (!res.ok) throw new Error(body.detail || res.statusText);
    busy(false);
    show(body);
  } catch (e) { busy(false); $("thinking").textContent = "⚠ " + e.message; }
}
$("go").onclick = () => {
  const text = $("text").value.trim(); if (text.length < 3) return;
  const handle = $("handle").value.trim();
  try { localStorage.setItem("nemesis-handle", handle); } catch (e) {}
  send("/api/attack", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({text, handle})});
};

$("world").onchange = () => {
  const f = $("world").files[0]; if (!f) return;
  const fd = new FormData(); fd.append("media", f, f.name);
  STEPS.splice(0, 2, "Muse Spark is reading your place…", "Muse Wonder is turning it into physics…");
  send("/api/world", {method: "POST", body: fd}).finally(() => {
    STEPS.splice(0, 2, "Nemesis is reading your attack…", "Muse Wonder is writing the physics…"); $("world").value = ""; });
};

// Voice: record, downsample to 16 kHz mono 16-bit PCM WAV (what Muse Voice Transcribe expects).
let rec, chunks = [];
$("mic").onclick = async () => {
  if (rec && rec.state === "recording") { rec.stop(); return; }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    rec = new MediaRecorder(stream); chunks = [];
    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = async () => {
      stream.getTracks().forEach((t) => t.stop()); $("mic").classList.remove("rec"); $("mic").textContent = "🎙 Speak";
      const fd = new FormData(); fd.append("audio", await toWav(new Blob(chunks)), "attack.wav");
      send("/api/attack_voice", {method: "POST", body: fd});
    };
    rec.start(); $("mic").classList.add("rec"); $("mic").textContent = "■ Stop";
  } catch (e) { $("thinking").textContent = "⚠ microphone unavailable"; }
};
async function toWav(blob) {
  const ctx = new AudioContext();
  const buf = await ctx.decodeAudioData(await blob.arrayBuffer());
  const off = new OfflineAudioContext(1, Math.ceil(buf.duration * 16000), 16000);
  const src = off.createBufferSource(); src.buffer = buf; src.connect(off.destination); src.start();
  const pcm = (await off.startRendering()).getChannelData(0);
  const out = new DataView(new ArrayBuffer(44 + pcm.length * 2));
  const w = (o, s) => [...s].forEach((c, i) => out.setUint8(o + i, c.charCodeAt(0)));
  w(0, "RIFF"); out.setUint32(4, 36 + pcm.length * 2, true); w(8, "WAVEfmt ");
  out.setUint32(16, 16, true); out.setUint16(20, 1, true); out.setUint16(22, 1, true);
  out.setUint32(24, 16000, true); out.setUint32(28, 32000, true); out.setUint16(32, 2, true); out.setUint16(34, 16, true);
  w(36, "data"); out.setUint32(40, pcm.length * 2, true);
  pcm.forEach((v, i) => out.setInt16(44 + i * 2, Math.max(-1, Math.min(1, v)) * 0x7fff, true));
  return new Blob([out], {type: "audio/wav"});
}

// ---- live job events (SSE) --------------------------------------------------------------------
function follow(jobId, onEvent) {
  return new Promise((resolve) => {
    const es = new EventSource(`/api/jobs/${jobId}/events`);
    es.onmessage = (m) => {
      const e = JSON.parse(m.data);
      onEvent(e);
      if (e.stage === "done" || e.stage === "failed") { es.close(); resolve(e); }
    };
    es.onerror = () => { /* the browser reconnects; the server replays the backlog */ };
  });
}

// ---- patch ------------------------------------------------------------------------------------
const PATCH_STEPS = [["bank", "Building a training set: your attack + 48 nearby variants + past lessons"],
  ["training", "Retraining the robot (PPO, GPU)"], ["gating", "Regression gate: still walks? fixed? nothing else broke?"],
  ["verified", "Replaying your attack on the new robot"]];
function patchPanel() {
  const p = $("patch-panel");
  p.hidden = false;
  p.innerHTML = `<b>Training a new robot against this attack</b><ul class="steps">${
    PATCH_STEPS.map(([k, t]) => `<li id="ps-${k}">${t}</li>`).join("")}</ul>
    <div class="bar"><div id="pbar"></div></div><div class="mono muted" id="pnote" style="font-size:12px"></div><div class="gate" id="pgate"></div>`;
}
function mark(k, cls) {
  const order = PATCH_STEPS.map(([s]) => s);
  order.forEach((s, i) => { const el = $(`ps-${s}`); if (!el) return;
    if (i < order.indexOf(k)) el.className = "ok"; else if (s === k) el.className = cls || "active"; });
}
function gateView(gate) {
  if (!gate) return "";
  const s = gate.suites, c = gate.checks;
  const row = (name, ok, detail) => `<div class="${ok ? "pass" : "fail"}">${ok ? "✓" : "✗"} ${name}<br><span class="muted">${detail}</span></div>`;
  return row("fixes the attack", c["fixes the attack"], `falls ${pct(s.attacks.before)} → ${pct(s.attacks.after)}`) +
    row("still walks", c["still walks"], `${s.nominal.progress_before.toFixed(1)} m → ${s.nominal.progress_after.toFixed(1)} m in 5 s`) +
    row("no regressions", c["no regressions"], `52-scenario gauntlet: falls ${pct(s.gauntlet.before)} → ${pct(s.gauntlet.after)}`);
}
function patchEvent(e) {
  if (e.stage === "queued") $("pnote").textContent = e.message;
  if (e.stage === "bank") { mark("bank", "ok"); $("pnote").textContent = `${e.variants} variants, ${e.replayed} replayed lessons`; }
  if (e.stage === "training") mark("training");
  if (e.stage === "progress") { mark("training"); $("pbar").style.width = pct(Math.min(1, e.step / e.total));
    $("pnote").textContent = `${(e.step / 1e6).toFixed(0)}M / ${(e.total / 1e6).toFixed(0)}M simulated steps`; }
  if (e.stage === "trained") { $("pbar").style.width = "100%"; $("pnote").textContent = `trained in ${Math.round(e.seconds)} s`; }
  if (e.stage === "gating") mark("gating");
  if (e.stage === "rejected") { mark("gating", "bad"); $("pgate").innerHTML = gateView(e.gate);
    $("pnote").textContent = "The new robot did not pass the gate, so the live robot stays as it was."; }
  if (e.stage === "verified") {
    mark("verified", "ok"); $("pgate").innerHTML = gateView(e.gate);
    stage(e.clip, e.trajs, [`Before (${e.parent})`, `After (${e.version})`]);
    $("label-left").textContent = `Before (${e.parent})`; $("label-right").textContent = `After (${e.version})`;
    const fr = e.fall_rates;
    verdict($("vb"), fr[e.parent] >= 0.5, fr[e.parent], `Robot ${e.parent}`);
    verdict($("va"), fr[e.version] >= 0.5, fr[e.version], `Robot ${e.version}`);
    $("pnote").textContent = `${e.version} is now the live robot.`;
    loadVersions(); setTimeout(loadHof, 4000);
  }
  if (e.stage === "failed") $("pnote").textContent = "⚠ " + (e.error || "patch failed");
}
$("patch").onclick = async () => {
  if (!current) return;
  $("patch").disabled = true;
  patchPanel();
  try {
    const res = await fetch("/api/patch", {method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({attack_id: current.id})});
    const body = await res.json();
    if (!res.ok) throw new Error(body.detail || res.statusText);
    await follow(body.job, patchEvent);
  } catch (e) { $("pnote").textContent = "⚠ " + e.message; $("patch").disabled = false; }
};

// ---- agent mode -------------------------------------------------------------------------------
function addEv(cls, kind, html) {
  const d = document.createElement("div"); d.className = `ev ${cls}`;
  d.innerHTML = `<span class="k">${kind}</span>${html}`;
  $("trace").appendChild(d); $("trace").scrollTop = $("trace").scrollHeight;
  return d;
}
function agentEvent(e) {
  switch (e.stage) {
    case "agent_start": addEv("say", "investigation", `Red-teaming live robot <b>${esc(e.version)}</b>${e.goal ? ` · focus: ${esc(e.goal)}` : ""}`); break;
    case "say": addEv("say", "nemesis", esc(e.text).replace(/\n/g, "<br>")); break;
    case "tool_call":
      if (e.tool === "test_hypothesis") addEv("tool", "test", `<b>Hypothesis:</b> ${esc(e.args.hypothesis)}`);
      else if (e.tool === "measure_margin") addEv("tool", "measure", `Safety margin on <span class="mono">${esc(e.args.condition)}</span>`);
      else if (e.tool === "watch") addEv("tool", "muse spark", "Watching the failure clip…");
      else if (e.tool === "patch") { addEv("tool", "patch", `Retraining the robot on ${e.args.failure_ids.length} failure(s)…`); patchPanel(); $("result").hidden = false; }
      break;
    case "searching": addEv("tool", "cma-es", `Searching ${e.free_params} free parameter(s) for the most plausible failure…`); break;
    case "tool_result":
      if (e.tool === "test_hypothesis" && !e.result.broke_robot)
        addEv("ok", "survived", e.result.error ? `Program error: ${esc(e.result.error)}` : `Robot held (falls ${pct(e.result.fall_rate)}). Hypothesis refuted.`);
      break;
    case "failure": addEv("fail", `broke it · falls ${pct(e.fall_rate)}`, `<pre class="mono">${esc(JSON.stringify(e.conditions))}</pre><video src="${e.clip}" autoplay muted loop playsinline></video>`); loadHof(); break;
    case "diagnosis": addEv("diag", "muse spark saw", `<b>${esc(e.mode)}</b>: ${esc(e.what_happened)}<br><span class="muted">Cause: ${esc(e.likely_cause)}</span>`); break;
    case "margin": {
      const bars = e.curve.map((c) => `<span class="${c.fall_rate >= 0.5 ? "f" : ""}" style="height:${Math.max(4, c.fall_rate * 100)}%" title="${esc(JSON.stringify(c.value))}: ${pct(c.fall_rate)}"></span>`).join("");
      addEv("diag", "safety margin", `<span class="mono">${esc(e.condition)}</span>: nominal ${esc(JSON.stringify(e.nominal))}, starts falling at <b>${esc(JSON.stringify(e.starts_falling_at))}</b><div class="spark">${bars}</div><span class="muted" style="font-size:12px">nominal → failing value</span>`);
      break; }
    case "bank": case "training": case "progress": case "trained": case "gating": case "rejected": case "queued": patchEvent(e); break;
    case "verified": patchEvent(e); addEv("ok", `patched → ${esc(e.version)}`, `New live robot <b>${esc(e.version)}</b> passed the regression gate.`); break;
    case "done": if (e.summary) addEv("say", "summary", esc(e.summary).replace(/\n/g, "<br>")); $("agent-go").disabled = false; loadVersions(); break;
    case "failed": addEv("fail", "error", esc(e.error)); $("agent-go").disabled = false; break;
  }
}
$("agent-go").onclick = async () => {
  $("agent-go").disabled = true; $("trace").hidden = false; $("trace").innerHTML = "";
  try {
    const res = await fetch("/api/agent", {method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({goal: $("goal").value.trim()})});
    const body = await res.json();
    if (!res.ok) throw new Error(body.detail || res.statusText);
    if (body.joined) addEv("say", "live", "An investigation is already running. You're watching it live.");
    await follow(body.job, agentEvent);
  } catch (e) { addEv("fail", "error", esc(e.message)); $("agent-go").disabled = false; }
};

// ---- hall of fame -----------------------------------------------------------------------------
async function loadHof() {
  try {
    const rows = await (await fetch("/api/hall_of_fame")).json();
    if (!rows.length) return;
    $("hof").innerHTML = "";
    rows.forEach((r) => {
      const st = Object.entries(r.status || {}).sort((a, b) => +a[0].slice(1) - +b[0].slice(1));
      const score = r.score ? `<span class="pill f">+${r.score}</span>` : "";
      const pills = score + st.map(([v, f]) => `<span class="pill ${f >= 0.5 ? "f" : "s"}" title="falls ${pct(f)}">${esc(v)} ${f >= 0.5 ? "fell" : "held"}</span>`).join("");
      const c = document.createElement("div"); c.className = "card";
      c.innerHTML = `<video src="${r.clip}#t=1.2" preload="metadata" muted loop playsinline></video><p>"${esc(r.text)}"</p><div class="pills">${pills}</div>`;
      const v = c.querySelector("video"); c.onmouseenter = () => v.play(); c.onmouseleave = () => v.pause();
      $("hof").appendChild(c);
    });
  } catch (e) {}
}

// ---- leaderboard + community retraining -------------------------------------------------------
async function loadBoard() {
  try {
    const rows = await (await fetch("/api/leaderboard")).json();
    if (!rows.length) return;
    $("board").innerHTML = rows.map((r) => `<li><div><span class="who">${esc(r.who)}</span> · "${esc(r.text)}"
      <span class="muted">(broke ${esc(r.version)})</span></div><span class="pts">${r.score}</span></li>`).join("");
  } catch (e) {}
}
let watching = null;
async function watchCommunity() {
  try {
    const p = await (await fetch("/api/patching")).json();
    if (!p.job || p.job === watching) return;
    watching = p.job;
    const el = $("community"); el.hidden = false;
    el.textContent = p.community ? "The robot is learning from the community's attacks right now…" : "A new robot is training right now…";
    await follow(p.job, (e) => {
      if (e.stage === "progress") el.textContent = `${p.community ? "Learning from the community" : "Training"}: ${(e.step / 1e6).toFixed(0)}M / ${(e.total / 1e6).toFixed(0)}M steps`;
      if (e.stage === "gating") el.textContent = "Regression gate: checking the new robot didn't get worse anywhere…";
      if (e.stage === "verified") el.textContent = `New live robot ${e.version}: hardened against ${p.community ? "the community's latest attacks" : "a new attack"}.`;
      if (e.stage === "rejected") el.textContent = "The new robot failed the regression gate; the live robot stays.";
    });
    loadVersions(); loadHof(); setTimeout(() => { $("community").hidden = true; }, 15000);
  } catch (e) {}
}
try { $("handle").value = localStorage.getItem("nemesis-handle") || ""; } catch (e) {}
loadVersions();
loadHof();
loadBoard();
watchCommunity();
setInterval(watchCommunity, 20000);
setInterval(loadBoard, 60000);
