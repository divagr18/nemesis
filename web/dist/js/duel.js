// You vs Muse: lobby, sealed Muse turn with a verifiable commitment, simultaneous reveal on two 3D replays,
// final verdict, and retraining the robot on the duel's attacks.
import { mountReplay } from "./replay.js";

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
const pct = (x) => `${Math.round((x ?? 0) * 100)}%`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const api = async (url, opts) => {
  const res = await fetch(url, opts);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.detail || res.statusText);
  return body;
};
const post = (url, data) => api(url, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data || {})});

const settings = {rounds: 3, hard: 0};
let duel = null, replays = [], musePoll = null;

// ---------------------------------------------------------------- lobby
document.querySelectorAll(".seg").forEach((seg) => seg.addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  seg.querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
  settings[seg.dataset.key] = +b.dataset.v;
}));

async function loadLobby() {
  try {
    const [t, v] = await Promise.all([api("/api/duel_tally"), api("/api/versions")]);
    $("t-you").textContent = t.you; $("t-muse").textContent = t.muse;
    $("s-human").textContent = t.you; $("s-muse-wins").textContent = t.muse;
    $("l-robot").textContent = $("s-robot").textContent = v.live;
    const log = t.log || [];
    $("l-rec").textContent = `${t.you + t.muse + t.draw} duels`;
    const cells = 64, shown = log.slice(-cells);
    $("matrix").innerHTML = shown.map((w) => `<i class="${w === "you" ? "you-bg" : w === "muse" ? "muse-bg" : ""}" title="${w}"></i>`).join("")
      + Array(cells - shown.length).fill('<i class="empty"></i>').join("");
  } catch (e) { /* lobby still works offline-ish */ }
}

$("start").onclick = startDuel;
async function startDuel() {
  $("start").disabled = true; $("lobby-err").textContent = "";
  try {
    duel = await post("/api/duel", {rounds: settings.rounds, hard: !!settings.hard});
  } catch (e) { $("lobby-err").textContent = "⚠ " + e.message; $("start").disabled = false; return; }
  $("start").disabled = false;
  $("lobby").hidden = true; $("final").hidden = true; $("match").hidden = false;
  window.scrollTo({top: 0, behavior: "smooth"});
  board();
  newTurn();
}

// ---------------------------------------------------------------- match
function board() {
  const h = duel.history || [];
  $("sc-you").textContent = duel.score.you; $("sc-muse").textContent = duel.score.muse;
  $("pips").innerHTML = Array.from({length: duel.rounds}, (_, i) => {
    const r = h[i];
    const cls = r ? (r.you.score > r.muse.score ? "you" : r.muse.score > r.you.score ? "muse" : "draw") : (i === h.length ? "now" : "");
    return `<i class="${cls}"></i>`;
  }).join("");
  const n = Math.min(h.length + 1, duel.rounds);
  $("round-lbl").textContent = `Round ${n} of ${duel.rounds}${duel.hard ? " · hard" : ""}`;
  $("robot-lbl").textContent = `robot ${duel.version}`;
}

const SUGGEST = ["a light shove from the right as it turns", "slightly wet tiles and a 3 kg backpack",
  "the back-left knee is a bit weak", "20 ms of control lag on a gentle downhill", "a sudden stop on polished wood"];
function chips() {
  $("chips").innerHTML = SUGGEST.map((s) => `<button>${esc(s)}</button>`).join("");
  $("chips").querySelectorAll("button").forEach((b) => (b.onclick = () => { $("attack").value = b.textContent; $("attack").focus(); }));
}

let termTimer = null;
function museTerminal(locked, commit) {
  const n = (duel.history || []).length + 1;
  const lines = [
    `<span class="o">›</span> muse.observe(robot="${duel.version}", round=${n})`,
    `<span class="o">›</span> muse.recall(previous_rounds=${n - 1})`,
    `<span class="o">›</span> muse.hypothesize()${duel.hard ? "  // may leave 3 numbers to the optimizer" : ""}`,
    `<span class="o">›</span> muse.write_attack()`,
  ];
  const done = `<span class="o">›</span> muse.commit()  <span class="ok">■ locked</span>\n\n<span class="dimtxt">Muse has sealed its attack. It cannot change it,\nand it will never see yours.</span>`;
  if (locked) { clearInterval(termTimer); termTimer = null; $("muse-term").innerHTML = lines.join("\n") + "\n" + done; $("commit").textContent = commit; return; }
  if (termTimer) return;
  let i = 0, dots = 0;
  $("commit").textContent = "pending…";
  termTimer = setInterval(() => {
    const shown = lines.slice(0, Math.min(i + 1, lines.length));
    dots = (dots + 1) % 4;
    $("muse-term").innerHTML = shown.join("\n") + (i >= lines.length - 1 ? `\n<span class="dimtxt">  thinking${".".repeat(dots)}</span>` : "");
    i++;
  }, 650);
}

function newTurn() {
  disposeReplays();
  $("reveal").hidden = true; $("running").hidden = true; $("turn").hidden = false;
  $("attack").value = ""; $("lock").disabled = false; $("mic").disabled = false;
  $("you-hint").textContent = `round ${(duel.history || []).length + 1}`;
  chips();
  museTerminal(false);
  pollMuse();
  setTimeout(() => $("attack").focus(), 200);
}

function pollMuse() {
  clearInterval(musePoll);
  const check = async () => {
    try {
      const m = await api(`/api/duel/${duel.id}/muse`);
      if (m.error) { clearInterval(musePoll); $("muse-term").innerHTML += `\n<span class="o">✕ ${esc(m.error)}</span>`; }
      else if (m.locked) { clearInterval(musePoll); museTerminal(true, m.commit); }
    } catch (e) {}
  };
  musePoll = setInterval(check, 1500);
  check();
}

$("lock").onclick = () => {
  const text = $("attack").value.trim();
  if (text.length < 3) { $("attack").focus(); return; }
  playRound(post(`/api/duel/${duel.id}/round`, {text}));
};
$("attack").addEventListener("keydown", (e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) $("lock").click(); });

async function playRound(request) {
  $("lock").disabled = true; $("mic").disabled = true;
  $("turn").hidden = true; $("running").hidden = false;
  const msgs = ["muse wonder is translating your attack into physics", "simulating both attacks · same robot · same 8 seeds",
    "checking each attack against our toughest robot", "muse is writing the commentary"];
  let k = 0; $("run-txt").textContent = msgs[0];
  const t = setInterval(() => { k = Math.min(k + 1, msgs.length - 1); $("run-txt").textContent = msgs[k]; }, 4500);
  try {
    const out = await request;
    clearInterval(t);
    duel = out;
    await reveal(out.last);
  } catch (e) {
    clearInterval(t);
    $("running").hidden = true; $("turn").hidden = false;
    $("lock").disabled = false; $("mic").disabled = false;
    $("you-hint").innerHTML = `<span class="muse-c">⚠ ${esc(e.message)}</span>`;
  }
}

// ---------------------------------------------------------------- reveal
function resultCard(side, r, other) {
  const won = r.score > other.score;
  const falls = r.seeds.filter(Boolean).length;
  return `
    <div class="said"><span class="q">“</span>${esc(r.text)}<span class="q">”</span></div>
    <div class="seeds">${r.seeds.map((f) => `<i class="${f ? "f" : ""}"></i>`).join("")}</div>
    ${r.cheap ? `<span class="stamp">brute force · even our toughest robot falls ${pct(r.reference_fall_rate)}</span>` : ""}
    <div class="spec-row">
      <div><span class="mono lbl">falls</span><b>${falls}/8</b></div>
      <div><span class="mono lbl">subtlety</span><b>${pct(r.subtlety)}</b></div>
      <div class="score"><span class="mono lbl">score ${won ? '<span class="winner-flag">round</span>' : ""}</span><b data-to="${r.score}">0</b></div>
    </div>`;
}

function disposeReplays() { replays.forEach((r) => r && r.dispose && r.dispose()); replays = []; ["stage-you", "stage-muse"].forEach((id) => ($(id).innerHTML = "")); }

async function reveal(r) {
  $("running").hidden = true; $("reveal").hidden = false;
  board();
  for (const side of ["you", "muse"]) {
    const x = r[side];
    const tag = x.cheap ? `<span class="verdict-tag fell">brute force</span>` :
      `<span class="verdict-tag ${x.fall_rate >= 0.5 ? "fell" : "held"}">${x.fall_rate >= 0.5 ? "it fell" : "it held"}</span>`;
    $(`${side}-verdict`).innerHTML = tag;
    $(`res-${side}`).innerHTML = resultCard(side, x, r[side === "you" ? "muse" : "you"]);
    $(`res-${side}`).classList.remove("rise"); void $(`res-${side}`).offsetWidth; $(`res-${side}`).classList.add("rise");
  }
  window.scrollTo({top: $("match").offsetTop - 8, behavior: "smooth"});
  replays = await Promise.all(["you", "muse"].map((side) => mountReplay($(`stage-${side}`), {
    assetsUrl: "/assets/go1_scene.json", trajs: [{...r[side].traj, label: side === "you" ? "YOU" : "MUSE"}], hud: true})));
  // seeds fill in one by one, then scores count up
  for (const side of ["you", "muse"]) {
    $(`res-${side}`).querySelectorAll(".seeds i").forEach((el, i) => setTimeout(() => el.classList.add("in"), 120 * i));
    const b = $(`res-${side}`).querySelector(".score b");
    countUp(b, +b.dataset.to, 1100 + 0);
  }
  typewrite($("comment"), r.comment || "");
  verifyCommit(r);
  $("next").firstChild.textContent = duel.over ? "See the result " : "Next round ";
}

function countUp(el, to, ms) {
  const t0 = performance.now() + 900;
  const step = (now) => {
    const k = Math.min(1, Math.max(0, (now - t0) / ms));
    el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

async function typewrite(el, text) {
  el.classList.remove("done"); el.textContent = "";
  await sleep(1400);
  for (let i = 0; i <= text.length; i += 2) { el.textContent = text.slice(0, i); await sleep(18); }
  el.textContent = text; el.classList.add("done");
}

async function verifyCommit(r) {
  if (!r.sealed || !r.commit || !crypto.subtle) { $("verify").textContent = ""; return; }
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(r.sealed));
  const hex = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  $("verify").innerHTML = hex === r.commit
    ? `<span style="color:var(--acid)">✓</span> Muse's attack matches the hash it sealed before you typed · ${r.commit.slice(0, 12)}…`
    : `<span class="muse-c">✕ commitment mismatch</span>`;
}

$("next").onclick = () => (duel.over ? showFinal() : newTurn());

// ---------------------------------------------------------------- voice
let rec, chunks = [];
$("mic").onclick = async () => {
  if (rec && rec.state === "recording") { rec.stop(); return; }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    rec = new MediaRecorder(stream); chunks = [];
    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = async () => {
      stream.getTracks().forEach((t) => t.stop()); $("mic").classList.remove("rec"); $("mic").textContent = "● Speak";
      const fd = new FormData(); fd.append("audio", await toWav(new Blob(chunks)), "attack.wav");
      playRound(api(`/api/duel/${duel.id}/round_voice`, {method: "POST", body: fd}));
    };
    rec.start(); $("mic").classList.add("rec"); $("mic").textContent = "■ Stop";
  } catch (e) { $("you-hint").innerHTML = '<span class="muse-c">⚠ microphone unavailable</span>'; }
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

// ---------------------------------------------------------------- final
function showFinal() {
  disposeReplays();
  $("match").hidden = true; $("final").hidden = false;
  const w = duel.winner, s = duel.score;
  $("verdict").className = "verdict " + (w === "draw" ? "" : w);
  $("verdict").textContent = w === "you" ? "You win." : w === "muse" ? "Muse wins." : "Draw.";
  $("final-lbl").textContent = `Final · best of ${duel.rounds}${duel.hard ? " · hard" : ""} · robot ${duel.version}`;
  $("final-board").innerHTML = `<span>you <b class="you-c">${s.you}</b></span><span>muse <b class="muse-c">${s.muse}</b></span>`;
  $("recap").innerHTML = `<tr><th>Round</th><th>Your attack</th><th>Falls</th><th>Score</th><th>Muse's attack</th><th>Falls</th><th>Score</th></tr>` +
    duel.history.map((r, i) => {
      const y = r.you, m = r.muse, yw = y.score > m.score, mw = m.score > y.score;
      return `<tr><td>${i + 1}</td><td class="t">${esc(y.text)}</td><td>${y.seeds.filter(Boolean).length}/8</td>
        <td class="${yw ? "w" : ""}">${y.cheap ? "0 · brute" : y.score}</td><td class="t">${esc(m.text)}</td>
        <td>${m.seeds.filter(Boolean).length}/8</td><td class="${mw ? "w" : ""}">${m.cheap ? "0 · brute" : m.score}</td></tr>`;
    }).join("");
  const learnable = duel.history.some((r) => ["you", "muse"].some((k) => r[k].fall_rate >= 0.5 && !r[k].cheap));
  $("train").hidden = !learnable;
  $("train-panel").hidden = true;
  window.scrollTo({top: 0, behavior: "smooth"});
  loadLobby();

// ?watch=<duel id>[&round=n]: replay a round's reveal (sharing, filming).
const watch = new URLSearchParams(location.search);
if (watch.get("watch")) {
  api(`/api/duel/${watch.get("watch")}`).then((d) => {
    duel = d;
    const n = +(watch.get("round") || d.history.length);
    const shown = {...d, history: d.history.slice(0, n)};
    duel = {...shown, over: d.over && n === d.history.length, score: {
      you: shown.history.reduce((a, r) => a + r.you.score, 0), muse: shown.history.reduce((a, r) => a + r.muse.score, 0)}};
    $("lobby").hidden = true; $("match").hidden = false; $("turn").hidden = true;
    reveal(d.history[n - 1]);
    if (watch.get("final")) { duel = d; showFinal(); }
  }).catch((e) => { $("lobby-err").textContent = "⚠ " + e.message; });
}
}

$("share").onclick = () => {
  const s = duel.score, w = duel.winner;
  const msg = w === "you" ? `I beat Meta's Muse ${s.you}–${s.muse} at breaking a robot.` :
    w === "muse" ? `Meta's Muse beat me ${s.muse}–${s.you} at breaking a robot. Rematch incoming.` :
    `I drew with Meta's Muse at breaking a robot (${s.you}–${s.muse}).`;
  window.open("https://x.com/intent/post?text=" + encodeURIComponent(msg + " Subtle beats brutal. Try it:") +
    "&url=" + encodeURIComponent(location.origin + "/duel.html"), "_blank");
};
$("rematch").onclick = startDuel;

const TRAIN_STEPS = [["bank", "training set: the duel's attacks + nearby variants + past lessons"],
  ["training", "retraining the live robot (PPO on GPU)"], ["gating", "regression gate: fixed? still walks? nothing else broke?"],
  ["verified", "new robot is live"]];
$("train").onclick = async () => {
  $("train").disabled = true;
  $("train-panel").hidden = false;
  $("train-steps").innerHTML = TRAIN_STEPS.map(([k, t]) => `<div id="ts-${k}">${t}</div>`).join("");
  $("train-gate").innerHTML = ""; $("train-bar").style.width = "0";
  const mark = (k, cls) => { const order = TRAIN_STEPS.map(([s]) => s);
    order.forEach((s, i) => { const el = $(`ts-${s}`); if (i < order.indexOf(k)) el.className = "ok"; else if (s === k) el.className = cls || "on"; }); };
  try {
    const {job} = await post(`/api/duel/${duel.id}/patch`);
    const es = new EventSource(`/api/jobs/${job}/events`);
    es.onmessage = (m) => {
      const e = JSON.parse(m.data);
      if (e.stage === "started") $("train-ver").textContent = `${e.parent} → ${e.version}`;
      if (e.stage === "bank") mark("bank", "ok");
      if (e.stage === "training" || e.stage === "progress") { mark("training"); if (e.total) $("train-bar").style.width = pct(Math.min(1, e.step / e.total)); }
      if (e.stage === "trained") $("train-bar").style.width = "100%";
      if (e.stage === "gating") mark("gating");
      if (e.stage === "verified" || e.stage === "rejected") {
        const g = e.gate, ok = e.stage === "verified";
        mark(ok ? "verified" : "gating", ok ? "ok" : "bad");
        if (!ok) $("ts-verified").textContent = "gate failed: the live robot stays as it was";
        const s = g.suites, c = g.checks;
        const cell = (name, pass, detail) => `<div class="${pass ? "pass" : "fail"}"><b>${pass ? "✓" : "✕"}</b> ${name}<br><span class="dimtxt">${detail}</span></div>`;
        $("train-gate").innerHTML = cell("fixes the attacks", c["fixes the attack"], `falls ${pct(s.attacks.before)} → ${pct(s.attacks.after)}`) +
          cell("still walks", c["still walks"], `${s.nominal.progress_before.toFixed(1)} → ${s.nominal.progress_after.toFixed(1)} m in 5 s`) +
          cell("no regressions", c["no regressions"], `52-scenario gauntlet ${pct(s.gauntlet.before)} → ${pct(s.gauntlet.after)}`);
      }
      if (e.stage === "done" || e.stage === "failed") { es.close(); if (e.error) $("ts-training").textContent = "⚠ " + e.error; loadLobby(); }
    };
  } catch (e) { $("train-steps").innerHTML = `<div class="bad">${esc(e.message)}</div>`; $("train").disabled = false; }
};

loadLobby();

// ?watch=<duel id>[&round=n]: replay a round's reveal (sharing, filming).
const watch = new URLSearchParams(location.search);
if (watch.get("watch")) {
  api(`/api/duel/${watch.get("watch")}`).then((d) => {
    duel = d;
    const n = +(watch.get("round") || d.history.length);
    const shown = {...d, history: d.history.slice(0, n)};
    duel = {...shown, over: d.over && n === d.history.length, score: {
      you: shown.history.reduce((a, r) => a + r.you.score, 0), muse: shown.history.reduce((a, r) => a + r.muse.score, 0)}};
    $("lobby").hidden = true; $("match").hidden = false; $("turn").hidden = true;
    reveal(d.history[n - 1]);
    if (watch.get("final")) { duel = d; showFinal(); }
  }).catch((e) => { $("lobby-err").textContent = "⚠ " + e.message; });
}
