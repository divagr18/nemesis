// 3D replay of exported rollouts (nemesis/sim/export.py). No physics here: the server sends body
// poses per frame and the browser interpolates them. Needs an import map for "three" and
// "three/addons/" (see replay.html).
//
//   const r = await mountReplay(el, {assetsUrl, trajUrls: [{label, url}, ...]});
//   r.play(); r.pause(); r.setTime(1.2); r.setSpeed(0.25); r.dispose();

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { toCreasedNormals } from 'three/addons/utils/BufferGeometryUtils.js';

const COL = { bg: 0x0b0d12, crimson: 0xe11d48, cyan: 0x22d3ee, ice: 0x7cc4ff, robot: 0xb4bbc8, floor: 0x0f1218 };
const DTYPES = { float32: Float32Array, uint16: Uint16Array, uint32: Uint32Array, int16: Int16Array, uint8: Uint8Array };
const Z = new THREE.Vector3(0, 0, 1), Y = new THREE.Vector3(0, 1, 0);
const assetCache = new Map();

function unpack(p) {
  const bin = atob(p.b64), bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new DTYPES[p.dtype](bytes.buffer);
}

async function getJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  return r.json();
}

function loadAssets(url) {
  if (!assetCache.has(url)) assetCache.set(url, getJSON(url).catch((e) => { assetCache.delete(url); throw e; }));
  return assetCache.get(url);
}

const CSS = `
.nr{position:relative;container-type:inline-size;background:#0b0d12;border:1px solid #222733;border-radius:14px;
  overflow:hidden;color:#e7e9ee;font:14px/1.4 Inter,system-ui,sans-serif;outline:none;user-select:none;-webkit-user-select:none}
.nr:focus-visible{border-color:#8b93a7}
.nr-stage{position:relative;aspect-ratio:16/9;min-height:240px;background:#0b0d12}
@container (max-width:560px){.nr-stage{aspect-ratio:4/5}.nr-chip{font-size:10px;padding:4px 6px}.nr-hud{gap:4px}.nr-label{font-size:11px;padding:3px 6px}}
.nr-stage>canvas{position:absolute;inset:0;width:100%!important;height:100%!important;display:block;touch-action:none;cursor:grab}
.nr-stage>canvas:active{cursor:grabbing}
.nr-labels{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.nr-flash{position:absolute;inset:0;pointer-events:none;opacity:0;
  background:radial-gradient(ellipse at center,rgba(225,29,72,0) 35%,rgba(225,29,72,.55) 100%)}
.nr-msg{position:absolute;inset:0;display:grid;place-items:center;color:#8b93a7;font:13px "JetBrains Mono",monospace;padding:16px;text-align:center}
.nr-hud{position:absolute;left:10px;top:10px;right:10px;display:flex;flex-wrap:wrap;gap:6px;pointer-events:none}
.nr-chip{font:600 11px/1 "JetBrains Mono",ui-monospace,monospace;padding:5px 8px;border-radius:999px;
  background:rgba(225,29,72,.12);border:1px solid rgba(225,29,72,.45);color:#fecdd3;white-space:nowrap}
.nr-chip.on{background:#e11d48;color:#fff;border-color:#e11d48}
.nr-label{display:flex;align-items:center;gap:6px;padding:4px 8px;border-radius:999px;background:rgba(18,21,28,.82);
  border:1px solid #222733;font:600 12px/1.2 Inter,system-ui,sans-serif;color:#e7e9ee;white-space:nowrap;position:relative;top:-6px}
.nr-pill{display:none;font:700 10px/1 "JetBrains Mono",monospace;letter-spacing:.04em;padding:3px 5px;border-radius:4px}
.nr-pill.fell{display:inline-block;background:#e11d48;color:#fff}
.nr-pill.held{display:inline-block;background:#22d3ee;color:#04141a}
.nr-tag{font:600 10px/1 "JetBrains Mono",monospace;color:#bfe3ff;background:rgba(15,40,70,.6);border:1px solid rgba(124,196,255,.5);
  padding:3px 6px;border-radius:4px;white-space:nowrap}
.nr-tag.red{color:#fff;background:rgba(225,29,72,.85);border-color:#e11d48}
.nr-bar{display:flex;align-items:center;gap:10px 12px;padding:10px 12px;border-top:1px solid #222733;background:#12151c;flex-wrap:wrap}
.nr-play{width:38px;height:38px;border-radius:50%;border:0;background:#e11d48;color:#fff;display:grid;place-items:center;
  cursor:pointer;flex:none;padding:0}
.nr-play svg{width:16px;height:16px;fill:currentColor}
.nr-track{position:relative;flex:1 1 180px;height:30px;min-width:140px}
.nr-rail{position:absolute;left:0;right:0;top:13px;height:4px;border-radius:2px;background:#222733;overflow:hidden}
.nr-fill{position:absolute;left:0;top:0;bottom:0;background:#8b93a7}
.nr-band{position:absolute;top:10px;height:10px;border-radius:2px;background:rgba(225,29,72,.45);min-width:3px}
.nr-mark{position:absolute;top:5px;width:3px;height:20px;margin-left:-1px;border-radius:2px;background:#e11d48}
.nr-range{position:absolute;inset:0;width:100%;height:100%;margin:0;background:transparent;-webkit-appearance:none;appearance:none;cursor:pointer}
.nr-range::-webkit-slider-runnable-track{height:30px;background:transparent}
.nr-range::-moz-range-track{height:30px;background:transparent}
.nr-range::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;margin-top:8px;border-radius:50%;background:#e7e9ee;
  border:0;box-shadow:0 0 0 4px rgba(231,233,238,.15)}
.nr-range::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:#e7e9ee;border:0;box-shadow:0 0 0 4px rgba(231,233,238,.15)}
.nr-time{font:12px "JetBrains Mono",ui-monospace,monospace;color:#8b93a7;min-width:92px;text-align:right;flex:none}
.nr-speed{display:flex;gap:2px;background:#0b0d12;border:1px solid #222733;border-radius:8px;padding:2px;flex:none}
.nr-speed button{border:0;background:transparent;color:#8b93a7;font:600 12px "JetBrains Mono",monospace;padding:5px 8px;border-radius:6px;cursor:pointer}
.nr-speed button.on{background:#222733;color:#e7e9ee}
@container (max-width:480px){.nr-track{flex-basis:100%;order:-1}.nr-time{min-width:0;margin-right:auto;text-align:left}}
`;

function injectCSS() {
  if (document.getElementById('nr-style')) return;
  const s = document.createElement('style');
  s.id = 'nr-style';
  s.textContent = CSS;
  document.head.appendChild(s);
}

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}

const ICON_PLAY = '<svg viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z"/></svg>';
const ICON_PAUSE = '<svg viewBox="0 0 16 16"><path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z"/></svg>';

function gridTexture(renderer) {
  const n = 512, c = document.createElement('canvas');
  c.width = c.height = n;
  const g = c.getContext('2d');
  g.fillStyle = '#0f1218';
  g.fillRect(0, 0, n, n);
  g.strokeStyle = 'rgba(139,147,167,0.10)';
  g.lineWidth = 2;
  for (let i = 1; i < 4; i++) { const p = (i * n) / 4; g.beginPath(); g.moveTo(p, 0); g.lineTo(p, n); g.moveTo(0, p); g.lineTo(n, p); g.stroke(); }
  g.strokeStyle = 'rgba(139,147,167,0.24)';
  g.lineWidth = 3;
  g.strokeRect(0, 0, n, n);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function primitive(g) {
  const s = g.size;
  switch (g.type) {
    case 'box': return new THREE.BoxGeometry(2 * s[0], 2 * s[1], 2 * s[2]);
    case 'sphere': return new THREE.SphereGeometry(s[0], 24, 16);
    case 'ellipsoid': return new THREE.SphereGeometry(1, 24, 16).scale(s[0], s[1], s[2]);
    case 'capsule': return new THREE.CapsuleGeometry(s[0], 2 * s[1], 8, 16).rotateX(Math.PI / 2);
    case 'cylinder': return new THREE.CylinderGeometry(s[0], s[0], 2 * s[1], 24).rotateX(Math.PI / 2);
    default: return null;
  }
}

function meshGeometry(m) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(unpack(m.vert), 3));
  geo.setIndex(new THREE.BufferAttribute(unpack(m.face), 1));
  const out = toCreasedNormals(geo, THREE.MathUtils.degToRad(40));
  geo.dispose();
  out.computeBoundingSphere();
  return out;
}

function makeArrow(mat) {
  const group = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 16).translate(0, 0.5, 0), mat);
  const head = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 24).translate(0, 0.5, 0), mat);
  shaft.castShadow = head.castShadow = true;
  group.add(shaft, head);
  group.visible = false;
  group.set = (tail, dir, len, r) => {
    const hl = Math.min(len * 0.38, 0.1);
    shaft.scale.set(r, len - hl, r);
    head.scale.set(r * 2.6, hl, r * 2.6);
    head.position.y = len - hl;
    group.position.copy(tail);
    group.quaternion.setFromUnitVectors(Y, dir);
  };
  return group;
}

// CSS2DRenderer owns the element's transform, so offsets go on an inner element.
function boxed(inner) {
  const outer = document.createElement('div');
  outer.appendChild(inner);
  return outer;
}

function easeOut(x) { return 1 - (1 - x) * (1 - x); }

// One robot: flat body list posed from the trajectory, plus its per-robot overlays.
function buildRobot(ctx, traj, label, offsetY, ghost) {
  const { assets, meshGeos, track } = ctx;
  const ov = traj.overlays || {};
  const root = new THREE.Group();
  // Normalize to the start pose: start point at the origin, start heading along +x.
  const yaw0 = ov.start ? ov.start.yaw : 0, o = ov.start ? ov.start.origin : [0, 0];
  root.quaternion.setFromAxisAngle(Z, -yaw0);
  root.position.set(-o[0], -o[1], 0).applyQuaternion(root.quaternion).add(new THREE.Vector3(0, offsetY, 0));

  const P = unpack(traj.pos), Q = unpack(traj.quat);
  const nB = traj.bodies.length, nF = traj.n_frames;
  const byName = new Map(traj.bodies.map((n, i) => [n, i]));
  const tint = new Map((ov.weak || []).map((w) => [w.body, w.amount]));
  const bodies = assets.bodies.map((b, i) => {
    const obj = new THREE.Group();
    obj.userData.k = byName.has(b.name) ? byName.get(b.name) : -1;
    root.add(obj);
    return obj;
  });
  const base = new THREE.Color(COL.robot), red = new THREE.Color(COL.crimson);
  const bodyMat = assets.bodies.map((b, i) => {
    const a = tint.get(i) || 0;
    const m = new THREE.MeshStandardMaterial({
      color: ctx.modelColors ? new THREE.Color().fromArray(assets.geoms.find((g) => g.body === i)?.rgba || [0.7, 0.7, 0.7]) : base.clone(),
      metalness: 0.35, roughness: 0.42, envMapIntensity: 0.9,
    });
    if (a > 0) { m.color.lerp(red, a); m.emissive = red.clone(); m.emissiveIntensity = 0.35 * a; }
    if (ghost) { m.transparent = true; m.opacity = 0.3; m.depthWrite = false; }
    return track(m);
  });
  for (const g of assets.geoms) {
    const geo = g.type === 'mesh' ? meshGeos[g.mesh] : track(primitive(g));
    if (!geo) continue;
    const mesh = new THREE.Mesh(geo, bodyMat[g.body]);
    mesh.position.fromArray(g.pos);
    mesh.quaternion.set(g.quat[1], g.quat[2], g.quat[3], g.quat[0]);
    mesh.castShadow = !ghost;
    mesh.receiveShadow = true;
    bodies[g.body].add(mesh);
  }
  const trunkIdx = Math.max(0, assets.bodies.findIndex((b) => b.name === 'trunk'));
  const trunk = bodies[trunkIdx];

  // Payload: crimson box riding on the trunk.
  if (ov.payload) {
    const p = ov.payload, h = p.half_size;
    const box = new THREE.Mesh(track(new THREE.BoxGeometry(2 * h[0], 2 * h[1], 2 * h[2])),
      track(new THREE.MeshStandardMaterial({ color: COL.crimson, roughness: 0.55, metalness: 0.1, emissive: COL.crimson, emissiveIntensity: 0.25 })));
    box.position.fromArray(p.pos);
    box.castShadow = true;
    bodies[p.body].add(box);
  }

  // Slippery feet: blue discs under each low-friction foot.
  const iceMat = track(new THREE.MeshBasicMaterial({ color: COL.ice, transparent: true, opacity: 0.55, depthWrite: false }));
  const discGeo = track(new THREE.CircleGeometry(0.055, 32));
  const feet = (ov.slippery_feet || []).map((f) => {
    const d = new THREE.Mesh(discGeo, iceMat);
    d.renderOrder = 2;
    root.add(d);
    return { mesh: d, body: bodies[f.body], local: new THREE.Vector3().fromArray(f.pos) };
  });

  // Pushes: crimson arrow into the trunk while active (with a short fade after).
  const pushMat = track(new THREE.MeshStandardMaterial({ color: COL.crimson, emissive: COL.crimson, emissiveIntensity: 0.6, transparent: true }));
  const arrow = makeArrow(pushMat);
  root.add(arrow);
  // Children of root live in sim world coordinates, so the world-frame force is used as is.
  const pushes = (ov.pushes || []).map((p) => ({ ...p, f: new THREE.Vector3().fromArray(p.force) }));
  const pushTag = el('div', 'nr-tag red');
  const pushLabel = new CSS2DObject(boxed(pushTag));
  pushLabel.visible = false;
  root.add(pushLabel);

  // Fall: expanding ring at the moment of the fall, then a marker where it went down.
  const fallT = traj.fall_time;
  const fall = { t: fallT };
  if (fallT != null) {
    const ringMat = track(new THREE.MeshBasicMaterial({ color: COL.crimson, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
    const markMat = track(new THREE.MeshBasicMaterial({ color: COL.crimson, transparent: true, opacity: 0, depthWrite: false }));
    fall.ring = new THREE.Mesh(track(new THREE.RingGeometry(0.92, 1, 64)), ringMat);
    fall.mark = new THREE.Mesh(track(new THREE.RingGeometry(0.1, 0.13, 48)), markMat);
    fall.ring.renderOrder = fall.mark.renderOrder = 3;
    root.add(fall.ring, fall.mark);
  }

  // Label above the trunk (does not rotate with it).
  const lab = el('div', 'nr-label', `<span></span><span class="nr-pill"></span>`);
  lab.firstChild.textContent = label;
  const pill = lab.lastChild;
  const anchor = new CSS2DObject(boxed(lab));
  root.add(anchor);

  const q0 = new THREE.Quaternion(), q1 = new THREE.Quaternion(), tmp = new THREE.Vector3();
  const tailV = new THREE.Vector3(), dirV = new THREE.Vector3();
  const duration = traj.duration;

  function pose(t) {
    const f = THREE.MathUtils.clamp(t / traj.dt, 0, nF - 1);
    const i0 = Math.floor(f), i1 = Math.min(i0 + 1, nF - 1), a = f - i0;
    for (const b of bodies) {
      const k = b.userData.k;
      if (k < 0) continue;
      const p0 = (i0 * nB + k) * 3, p1 = (i1 * nB + k) * 3;
      b.position.set(P[p0] + (P[p1] - P[p0]) * a, P[p0 + 1] + (P[p1 + 1] - P[p0 + 1]) * a, P[p0 + 2] + (P[p1 + 2] - P[p0 + 2]) * a);
      const r0 = (i0 * nB + k) * 4, r1 = (i1 * nB + k) * 4;
      q0.set(Q[r0 + 1], Q[r0 + 2], Q[r0 + 3], Q[r0]);
      q1.set(Q[r1 + 1], Q[r1 + 2], Q[r1 + 3], Q[r1]);
      b.quaternion.slerpQuaternions(q0, q1, a);
    }
  }

  if (fallT != null) {  // where it went down
    pose(fallT);
    fall.ring.position.set(trunk.position.x, trunk.position.y, 0.006);
    fall.mark.position.copy(fall.ring.position);
  }

  function update(t) {
    pose(t);
    for (const f of feet) {
      tmp.copy(f.local).applyQuaternion(f.body.quaternion).add(f.body.position);
      f.mesh.position.set(tmp.x, tmp.y, 0.004);
    }
    // Sum of active pushes; fade over 0.25 s after the last one ends so it's visible at 1x.
    let alpha = 0;
    dirV.set(0, 0, 0);
    for (const p of pushes) {
      if (t >= p.t0 && t < p.t1) { dirV.add(p.f); alpha = 1; }
      else if (t >= p.t1 && t < p.t1 + 0.25 && alpha < 1) { dirV.add(p.f); alpha = Math.max(alpha, 1 - (t - p.t1) / 0.25); }
    }
    const n = dirV.length();
    arrow.visible = pushLabel.visible = n > 1 && alpha > 0;
    if (arrow.visible) {
      dirV.divideScalar(n);
      const len = 0.25 + 0.45 * Math.min(n, 300) / 150;
      const tip = tmp.copy(trunk.position).addScaledVector(dirV, -0.1);
      tailV.copy(tip).addScaledVector(dirV, -len);
      arrow.set(tailV, dirV, len, 0.012 + 0.02 * Math.min(n, 300) / 150);
      pushMat.opacity = alpha;
      pushLabel.position.copy(tailV).add(tmp.set(0, 0, 0.08));
      pushTag.textContent = `PUSH ${Math.round(n)} N`;
      pushTag.style.opacity = alpha;
    }
    anchor.position.copy(trunk.position).add(tmp.set(0, 0, 0.36));
    let flash = 0;
    if (fallT != null) {
      const k = t - fallT;
      const on = k >= 0;
      pill.className = on ? 'nr-pill fell' : 'nr-pill';
      pill.textContent = on ? `FELL ${fallT.toFixed(2)} s` : '';
      if (on) {
        const u = Math.min(1, k / 0.8);
        fall.ring.scale.setScalar(0.12 + 0.85 * easeOut(u));
        fall.ring.material.opacity = 0.9 * (1 - u);
        fall.mark.material.opacity = 0.9;
        flash = 0.8 * Math.max(0, 1 - k / 0.45);
      } else {
        fall.ring.material.opacity = fall.mark.material.opacity = 0;
      }
    } else {
      const held = t >= duration - 1e-3;
      pill.className = held ? 'nr-pill held' : 'nr-pill';
      pill.textContent = held ? 'HELD' : '';
    }
    return flash;
  }

  return { root, trunk, update, duration, fallT, label, labelEl: lab };
}

export async function mountReplay(container, opts = {}) {
  const {
    assetsUrl = 'assets/go1_scene.json', trajUrls = [], trajs: given = null, layout = 'side',
    spacing = 1.1, autoplay = true, loop = true, speed: speed0 = 1, startTime = 0, hud = true,
    modelColors = false, onTime = null,
  } = opts;
  injectCSS();
  const wrap = el('div', 'nr');
  wrap.tabIndex = 0;
  const stage = el('div', 'nr-stage');
  const msg = el('div', 'nr-msg', 'loading replay…');
  stage.appendChild(msg);
  wrap.appendChild(stage);
  container.appendChild(wrap);

  let assets, trajs;
  try {
    [assets, trajs] = await Promise.all([
      opts.assets ? Promise.resolve(opts.assets) : loadAssets(assetsUrl),
      given ? Promise.resolve(given) : Promise.all(trajUrls.map((t) => getJSON(typeof t === 'string' ? t : t.url))),
    ]);
  } catch (e) {
    msg.textContent = `replay unavailable: ${e.message}`;
    return { setTime() {}, play() {}, pause() {}, setSpeed() {}, dispose() { wrap.remove(); }, error: e };
  }
  msg.remove();
  const labels = trajs.map((t, i) => (trajUrls[i] && trajUrls[i].label) || t.label || ['Original', 'Nemesis-trained'][i] || `Robot ${i + 1}`);

  // --- renderer, scene, camera ---------------------------------------------------------------
  const disposables = new Set();
  const track = (x) => { if (x) disposables.add(x); return x; };
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(COL.bg, 1);
  stage.appendChild(renderer.domElement);
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.className = 'nr-labels';
  stage.appendChild(labelRenderer.domElement);
  const hudEl = el('div', 'nr-hud');
  const flashEl = el('div', 'nr-flash');
  stage.append(flashEl, hudEl);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COL.bg);
  scene.fog = new THREE.Fog(COL.bg, 5, 16);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(38, 16 / 9, 0.05, 60);
  camera.up.copy(Z);
  scene.add(new THREE.HemisphereLight(0xc7d2fe, 0x0b0d12, 0.55));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -2.5, right: 2.5, top: 2.5, bottom: -2.5, near: 0.5, far: 14 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  sun.shadow.radius = 4;
  sun.shadow.camera.updateProjectionMatrix();
  scene.add(sun, sun.target);
  const rim = new THREE.DirectionalLight(0x93c5fd, 0.9);
  scene.add(rim, rim.target);

  // World: tilted so θ's gravity points down (the sim tilts gravity, not the floor).
  const world = new THREE.Group();
  scene.add(world);
  const ov0 = trajs[0].overlays || {};
  if (ov0.slope) {
    const { pitch, roll } = ov0.slope;
    const down = new THREE.Vector3(-Math.sin(pitch) * Math.cos(roll), Math.sin(roll), -Math.cos(pitch) * Math.cos(roll));
    world.quaternion.setFromUnitVectors(down, new THREE.Vector3(0, 0, -1));
  }
  const floorTex = track(gridTexture(renderer));
  const FLOOR = 60;
  floorTex.repeat.set(FLOOR, FLOOR);
  const floor = new THREE.Mesh(track(new THREE.PlaneGeometry(FLOOR, FLOOR)),
    track(new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.92, metalness: 0, envMapIntensity: 0.25 })));
  floor.position.set(FLOOR / 2 - 6, 0, (assets.floor && assets.floor.z) || 0);
  floor.receiveShadow = true;
  world.add(floor);

  const n = trajs.length;
  const ghost = layout === 'ghost' && n > 1;
  const offsets = trajs.map((_, i) => (ghost ? 0 : ((n - 1) / 2 - i) * spacing));

  // Ice: θ's patch is a band across the whole floor along the start heading (apply.with_ice
  // only tests distance), so draw one slab under all robots.
  if (ov0.ice) {
    const ice = ov0.ice, width = 1.8 + (ghost ? 0 : spacing * (n - 1));
    const slab = new THREE.Mesh(track(new THREE.BoxGeometry(ice.length, width, 0.006)),
      track(new THREE.MeshStandardMaterial({ color: 0x3b9cff, transparent: true, opacity: 0.26, roughness: 0.15, metalness: 0, envMapIntensity: 0.2,
        emissive: 0x1d6fd6, emissiveIntensity: 0.45, depthWrite: false })));
    slab.position.set(ice.start + ice.length / 2, 0, 0.004);
    slab.renderOrder = 1;
    const edges = new THREE.LineSegments(track(new THREE.EdgesGeometry(slab.geometry)),
      track(new THREE.LineBasicMaterial({ color: COL.ice, transparent: true, opacity: 0.7 })));
    slab.add(edges);
    world.add(slab);
    const tagEl = el('div', 'nr-tag');
    tagEl.textContent = `ICE μ ${ice.mu}`;
    tagEl.style.marginLeft = '60px';
    const tag = new CSS2DObject(boxed(tagEl));
    tag.position.set(ice.start + 0.05, width / 2 - 0.15, 0.02);
    world.add(tag);
  }

  const meshGeos = assets.meshes.map((m) => track(meshGeometry(m)));
  const ctx = { assets, meshGeos, track, modelColors };
  const robots = trajs.map((t, i) => buildRobot(ctx, t, labels[i], offsets[i], ghost && i === 0));
  robots.forEach((r) => world.add(r.root));
  if (ghost) robots.forEach((r, i) => { r.labelEl.style.transform = `translateX(${i ? 'calc(50% + 4px)' : 'calc(-50% - 4px)'})`; });
  const duration = Math.max(...robots.map((r) => r.duration));

  // HUD: what the attack is.
  if (hud) {
    const chips = [];
    const add = (text, key) => { const c = el('span', 'nr-chip'); c.textContent = text; if (key) c.dataset.key = key; hudEl.appendChild(c); chips.push(c); };
    if (ov0.ice) add(`ice μ${ov0.ice.mu} @ ${ov0.ice.start}–${+(ov0.ice.start + ov0.ice.length).toFixed(2)} m`);
    if ((ov0.slippery_feet || []).length) add(`slippery ${ov0.slippery_feet.map((f) => f.site).join(' ')} μ${Math.min(...ov0.slippery_feet.map((f) => f.mu))}`);
    if (ov0.payload) add(`payload ${ov0.payload.mass} kg`);
    (ov0.pushes || []).forEach((p, i) => add(`push ${Math.round(p.magnitude)} N @ ${p.t0}s`, `push${i}`));
    for (const w of ov0.weak || []) add(`weak ${w.name} ${Math.round(w.strength * 100)}%`);
    if (ov0.slope) {
      const deg = (x) => Math.round(THREE.MathUtils.radToDeg(x) * 10) / 10;
      if (Math.abs(ov0.slope.pitch) > 1e-4) add(`slope ${deg(Math.abs(ov0.slope.pitch))}° ${ov0.slope.pitch > 0 ? 'uphill' : 'downhill'}`);
      if (Math.abs(ov0.slope.roll) > 1e-4) add(`side slope ${deg(ov0.slope.roll)}°`);
    }
    const c = ov0.conditions || {};
    if (c.latency) add(`latency ${Math.round(c.latency) * 20} ms`);
    if (c.obs_noise) add(`sensor noise ${c.obs_noise}`);
    if (c.joint_friction) add(`joint friction ×${c.joint_friction}`);
    if (ov0.command) add(`cmd ${ov0.command.a.join(',')} → ${ov0.command.b.join(',')} @ ${ov0.command.switch}s`);
    hudEl.chips = chips;
  }

  // --- controls bar ---------------------------------------------------------------------------
  const bar = el('div', 'nr-bar');
  const playBtn = el('button', 'nr-play', ICON_PLAY);
  playBtn.setAttribute('aria-label', 'Play');
  const trackEl = el('div', 'nr-track');
  const rail = el('div', 'nr-rail');
  const fill = el('div', 'nr-fill');
  rail.appendChild(fill);
  trackEl.appendChild(rail);
  for (const p of ov0.pushes || []) {
    const b = el('div', 'nr-band');
    b.style.left = `${(100 * p.t0) / duration}%`;
    b.style.width = `${(100 * (p.t1 - p.t0)) / duration}%`;
    b.title = `push ${Math.round(p.magnitude)} N`;
    trackEl.appendChild(b);
  }
  robots.forEach((r) => {
    if (r.fallT == null) return;
    const m = el('div', 'nr-mark');
    m.style.left = `${(100 * r.fallT) / duration}%`;
    m.title = `${r.label} fell at ${r.fallT.toFixed(2)} s`;
    trackEl.appendChild(m);
  });
  const range = el('input', 'nr-range');
  Object.assign(range, { type: 'range', min: 0, max: duration, step: 0.001, value: 0 });
  range.setAttribute('aria-label', 'Replay time');
  trackEl.appendChild(range);
  const timeEl = el('div', 'nr-time');
  const speedEl = el('div', 'nr-speed');
  const speeds = [0.25, 0.5, 1];
  const speedBtns = speeds.map((s) => { const b = el('button', '', `${s}×`); b.onclick = () => handle.setSpeed(s); speedEl.appendChild(b); return b; });
  bar.append(playBtn, trackEl, timeEl, speedEl);
  wrap.appendChild(bar);

  // --- state and loop --------------------------------------------------------------------------
  let t = THREE.MathUtils.clamp(startTime, 0, duration), playing = false, speed = speed0, hold = 0;
  let raf = 0, last = performance.now(), visible = true, disposed = false, userMoved = false;
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.6;
  controls.maxDistance = 12;
  controls.maxPolarAngle = THREE.MathUtils.degToRad(86);
  controls.addEventListener('start', () => { userMoved = true; });

  const focus = new THREE.Vector3(), tmp = new THREE.Vector3(), wp = new THREE.Vector3();
  function desiredFocus(out) {
    out.set(0, 0, 0);
    for (const r of robots) out.add(r.trunk.getWorldPosition(wp));
    return out.divideScalar(robots.length);
  }
  const VIEW = new THREE.Vector3(-1.55, -2.25, 1.05);  // 3/4 rear-left view
  function frameCamera() {
    const aspect = camera.aspect;
    const k = (aspect < 1.2 ? 1.2 / aspect : 1) ** 0.6 * (ghost || n === 1 ? 0.85 : 1);
    controls.target.copy(focus);
    camera.position.copy(focus).addScaledVector(VIEW, k);
  }

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    labelRenderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (!userMoved) frameCamera();
  }

  function setPlaying(p) {
    playing = p;
    playBtn.innerHTML = p ? ICON_PAUSE : ICON_PLAY;
    playBtn.setAttribute('aria-label', p ? 'Pause' : 'Play');
  }

  function apply() {
    let flash = 0;
    for (const r of robots) flash = Math.max(flash, r.update(t));
    world.updateMatrixWorld(true);
    flashEl.style.opacity = flash.toFixed(3);
    range.value = t;
    fill.style.width = `${(100 * t) / duration}%`;
    timeEl.textContent = `${t.toFixed(2)} / ${duration.toFixed(2)} s`;
    if (hudEl.chips) {
      for (const c of hudEl.chips) {
        const k = c.dataset.key;
        if (!k) continue;
        const p = ov0.pushes[+k.slice(4)];
        c.classList.toggle('on', t >= p.t0 && t < p.t1 + 0.25);
      }
    }
    if (onTime) onTime(t);
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.25, (now - last) / 1000);  // cap: no jump after a stalled tab
    last = now;
    if (!visible) return;
    if (playing) {
      if (t >= duration) {
        hold += dt;
        if (!loop) setPlaying(false);
        else if (hold > 1.2) { t = 0; hold = 0; }
      } else {
        t = Math.min(duration, t + dt * speed);
      }
      apply();
    }
    desiredFocus(tmp);
    const before = focus.clone();
    focus.lerp(tmp, 1 - Math.exp(-dt * 3.5));
    const delta = before.sub(focus).negate();
    camera.position.add(delta);
    controls.target.copy(focus);
    controls.update();
    // Shadow-casting light follows the robots.
    sun.target.position.copy(focus);
    sun.position.copy(focus).add(tmp.set(1.8, -2.4, 5));
    rim.target.position.copy(focus);
    rim.position.copy(focus).add(tmp.set(-3, 3, 1.5));
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }

  const handle = {
    get time() { return t; },
    duration,
    setTime(s) { t = THREE.MathUtils.clamp(+s || 0, 0, duration); hold = 0; apply(); },
    play() { if (t >= duration) t = 0; hold = 0; setPlaying(true); },
    pause() { setPlaying(false); },
    toggle() { playing ? handle.pause() : handle.play(); },
    setSpeed(s) { speed = s; speedBtns.forEach((b, i) => b.classList.toggle('on', speeds[i] === s)); },
    resetCamera() { userMoved = false; frameCamera(); },
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener('keydown', onKey);
      controls.dispose();
      for (const d of disposables) d.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      wrap.remove();
    },
  };

  playBtn.onclick = () => handle.toggle();
  let wasPlaying = false;
  range.addEventListener('pointerdown', () => { wasPlaying = playing; setPlaying(false); });
  range.addEventListener('input', () => handle.setTime(range.value));
  range.addEventListener('change', () => { if (wasPlaying) { wasPlaying = false; setPlaying(true); } });
  const onKey = (e) => {
    if (e.target === range && e.key.startsWith('Arrow')) return;
    if (e.key === ' ' || e.key === 'k') { e.preventDefault(); handle.toggle(); }
    else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      handle.pause();
      handle.setTime(t + (e.key === 'ArrowRight' ? 1 : -1) * trajs[0].dt);
    }
  };
  wrap.addEventListener('keydown', onKey);
  const ro = new ResizeObserver(resize);
  ro.observe(stage);
  const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; last = performance.now(); });
  io.observe(wrap);

  handle.setSpeed(speed0);
  apply();
  desiredFocus(focus);
  resize();
  frameCamera();
  if (autoplay) handle.play();
  raf = requestAnimationFrame(frame);
  return handle;
}
