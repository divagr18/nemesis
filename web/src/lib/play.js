// Playground stage: the live Go1 stepping in MuJoCo WASM under its trained policy (playcore.js),
// drawn with the replay's look (replay.js). Drag anywhere to shove it; arrow keys / WASD steer.
//
//   const p = await mountPlay(el, {policyUrl, label, onFall, onShove, onStatus});
//   p.setPolicy(url, label); p.reset(); p.setWalking(false); p.shoveFrom('left'); p.dispose();
//
// The physics runs at a fixed 50 Hz control rate (5 substeps each) from a real-time accumulator; a
// device that can't keep up runs in slow motion and reports it through onStatus.

import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { COL, boxed, el, gridTexture, injectCSS, loadAssets, makeArrow, meshGeometry, primitive } from './replay.js';
import { Stepper, loadModel, parsePolicy } from './playcore.js';

const Z = new THREE.Vector3(0, 0, 1);
const PUSH_MAX = 150;        // N, the training envelope's push range (server/play.py clamps to it too)
const SHOVE_MAX_S = 0.5;     // s, longest trainable push
const DRAG_FULL = 0.6;       // m of drag on the ground for a full-strength shove
const QUICK = { left: [0, -1], right: [0, 1], behind: [1, 0], front: [-1, 0] };  // force direction, robot frame
const VIEW = new THREE.Vector3(-1.7, -2.4, 1.15);

async function bytes(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  return r.arrayBuffer();
}

export async function mountPlay(container, opts = {}) {
  const { infoUrl = '/api/play/info', modelUrl = '/api/play/go1.mjb', assetsUrl = '/assets/go1_scene.json',
    policyUrl, label = '', onFall = () => {}, onShove = () => {}, onStatus = () => {} } = opts;
  injectCSS();
  const wrap = el('div', 'nr');
  wrap.tabIndex = 0;
  const stage = el('div', 'nr-stage');
  const msg = el('div', 'nr-msg', 'loading the simulator…');
  stage.appendChild(msg);
  wrap.appendChild(stage);
  container.appendChild(wrap);

  let mj, model, info, assets, policy;
  try {
    const [mod, infoJson, mjb, a, pol] = await Promise.all([
      import('@mujoco/mujoco'), fetch(infoUrl).then((r) => r.json()), bytes(modelUrl), loadAssets(assetsUrl), bytes(policyUrl),
    ]);
    msg.textContent = 'starting MuJoCo…';
    mj = await mod.default();
    info = infoJson.model;
    // a .mjb only loads in the MuJoCo version that wrote it (package.json pins the npm build)
    if (info.mujoco && info.mujoco !== mj.mj_versionString()) {
      throw new Error(`the server's MuJoCo is ${info.mujoco}, this page's is ${mj.mj_versionString()}`);
    }
    model = loadModel(mj, mjb);
    assets = a;
    policy = parsePolicy(pol);
  } catch (e) {
    msg.textContent = `The simulator couldn't start in this browser (${e.message}).`;
    return { setPolicy() {}, reset() {}, setWalking() {}, shoveFrom() {}, dispose() { wrap.remove(); }, error: e };
  }
  msg.remove();
  const sim = new Stepper(mj, model, info, policy, { noise: true });

  // --- renderer, scene (the replay's look) ------------------------------------------------------
  const disposables = new Set();
  const track = (x) => { if (x) disposables.add(x); return x; };
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(COL.bg, 1);
  renderer.domElement.style.touchAction = 'none';
  renderer.domElement.style.cursor = 'crosshair';
  stage.appendChild(renderer.domElement);
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.className = 'nr-labels';
  stage.appendChild(labelRenderer.domElement);
  const hudEl = el('div', 'nr-hud');
  const flashEl = el('div', 'nr-flash');
  const verChip = el('span', 'nr-chip');
  const cmdChip = el('span', 'nr-chip');
  const shoveChip = el('span', 'nr-chip');
  shoveChip.style.display = 'none';
  const srcEl = el('span', 'nr-src');
  srcEl.textContent = 'Real physics · MuJoCo, live';
  hudEl.append(verChip, cmdChip, shoveChip, srcEl);
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

  const floorTex = track(gridTexture(renderer));
  const FLOOR = 60;
  floorTex.repeat.set(FLOOR, FLOOR);
  const floor = new THREE.Mesh(track(new THREE.PlaneGeometry(FLOOR, FLOOR)),
    track(new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.92, metalness: 0, envMapIntensity: 0.25 })));
  floor.position.z = (assets.floor && assets.floor.z) || 0;
  floor.receiveShadow = true;
  scene.add(floor);

  // Robot: the scene assets' geoms on one group per MuJoCo body, posed from data.xpos / xquat.
  const meshGeos = assets.meshes.map((m) => track(meshGeometry(m)));
  const bodyMat = track(new THREE.MeshStandardMaterial({ color: COL.robot, metalness: 0.35, roughness: 0.42, envMapIntensity: 0.9 }));
  const bodies = assets.bodies.map((b) => { const g = new THREE.Group(); g.userData.id = b.id; scene.add(g); return g; });
  for (const g of assets.geoms) {
    const geo = g.type === 'mesh' ? meshGeos[g.mesh] : track(primitive(g));
    if (!geo) continue;
    const mesh = new THREE.Mesh(geo, bodyMat);
    mesh.position.fromArray(g.pos);
    mesh.quaternion.set(g.quat[1], g.quat[2], g.quat[3], g.quat[0]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    bodies[g.body].add(mesh);
  }
  const trunk = bodies[Math.max(0, assets.bodies.findIndex((b) => b.name === 'trunk'))];
  const pushMat = track(new THREE.MeshStandardMaterial({ color: COL.crimson, emissive: COL.crimson, emissiveIntensity: 0.6 }));
  const arrow = makeArrow(pushMat);
  scene.add(arrow);
  const tagEl = el('div', 'nr-tag red');
  const tag = new CSS2DObject(boxed(tagEl));
  tag.visible = false;
  scene.add(tag);

  // Fall marker: a ring where it went down.
  const ringMat = track(new THREE.MeshBasicMaterial({ color: COL.crimson, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
  const ring = new THREE.Mesh(track(new THREE.RingGeometry(0.92, 1, 64)), ringMat);
  ring.renderOrder = 3;
  scene.add(ring);

  function pose() {
    const xpos = sim.data.xpos, xquat = sim.data.xquat;
    for (const b of bodies) {
      const id = b.userData.id;
      b.position.set(xpos[3 * id], xpos[3 * id + 1], xpos[3 * id + 2]);
      b.quaternion.set(xquat[4 * id + 1], xquat[4 * id + 2], xquat[4 * id + 3], xquat[4 * id]);
    }
  }

  // --- control state ----------------------------------------------------------------------------
  let walking = true, fell = false, fellAt = 0, frozen = false;
  const keys = new Set();
  let shove = null;       // the shove in progress: {force (world, N), t0, samples, cmd, source}
  let lastShove = null;   // the most recent finished shove, for "teach it"

  function command() {
    let vx = walking ? 1.0 : 0, vy = 0, wz = 0;
    if (keys.has('up')) vx = 1.5;
    if (keys.has('down')) vx = walking ? 0.3 : -0.5;
    if (keys.has('left')) wz = 1.0;
    if (keys.has('right')) wz = -1.0;
    if (keys.has('sl')) vy = 0.5;
    if (keys.has('sr')) vy = -0.5;
    return [vx, vy, wz];
  }

  function describeCmd(c) {
    if (fell) return 'fell';
    const parts = [];
    if (Math.abs(c[0]) >= 0.1) parts.push(`${c[0] > 0 ? 'walking' : 'backing up'} ${Math.abs(c[0]).toFixed(1)} m/s`);
    if (Math.abs(c[2]) >= 0.1) parts.push(`turning ${c[2] > 0 ? 'left' : 'right'}`);
    if (Math.abs(c[1]) >= 0.1) parts.push(`sidestepping ${c[1] > 0 ? 'left' : 'right'}`);
    return parts.join(', ') || 'standing';
  }

  // World-frame force -> the robot's frame (x forward, y left) at this moment.
  function toRobot(f) {
    const h = sim.heading(), c = Math.cos(h), s = Math.sin(h);
    return [c * f[0] + s * f[1], -s * f[0] + c * f[1]];
  }

  function startShove(source) {
    shove = { force: [0, 0], t0: sim.t, samples: [], cmd: command(), source, active: 0 };
  }

  function endShove() {
    if (!shove) return;
    const s = shove;
    shove = null;
    const used = s.samples.filter((x) => Math.hypot(x[0], x[1]) > 15);
    if (!used.length) return;
    const mean = used.reduce((a, x) => [a[0] + x[0], a[1] + x[1]], [0, 0]).map((v) => v / used.length);
    const peak = Math.max(...used.map((x) => Math.hypot(x[0], x[1])));
    lastShove = { force_x: mean[0], force_y: mean[1], peak, duration: used.length * info.ctrl_dt,
      command: s.cmd, at: sim.t, source: s.source };
    onShove(lastShove);
  }

  function controlStep() {
    let f = null;
    if (shove) {
      const mag = Math.hypot(shove.force[0], shove.force[1]);
      if (mag > 15) shove.active += info.ctrl_dt;
      if (shove.active >= SHOVE_MAX_S || (shove.quick && sim.t - shove.t0 >= shove.quick)) endShove();
      else if (mag > 0) {
        f = [shove.force[0], shove.force[1], 0];
        shove.samples.push(toRobot(shove.force));
      }
    }
    sim.step(command(), f);
    if (!fell && sim.fallen()) {
      fell = true;
      fellAt = sim.t;
      endShove();
      const recent = lastShove && sim.t - lastShove.at < 4 ? lastShove : null;
      onFall({ shove: recent, time: sim.t });
    }
    if (fell && sim.t - fellAt > 1.6) frozen = true;  // let it settle on the floor, then hold the frame
    return f;
  }

  // --- input: drag to shove ---------------------------------------------------------------------
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), plane = new THREE.Plane(Z, 0), hit = new THREE.Vector3();
  let drag = null;
  function ground(e) {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    plane.constant = -trunk.position.z;  // the plane through the trunk
    return ray.ray.intersectPlane(plane, hit) ? hit.clone() : null;
  }
  function onDown(e) {
    if (fell || e.button > 0) return;
    const p = ground(e);
    if (!p) return;
    renderer.domElement.setPointerCapture(e.pointerId);
    drag = { p0: p, id: e.pointerId };
    startShove('drag');
    wrap.focus({ preventScroll: true });
  }
  function onMove(e) {
    if (!drag || e.pointerId !== drag.id || !shove) return;
    const p = ground(e);
    if (!p) return;
    const dx = p.x - drag.p0.x, dy = p.y - drag.p0.y, len = Math.hypot(dx, dy);
    const mag = Math.min(PUSH_MAX, (len / DRAG_FULL) * PUSH_MAX);
    shove.force = len > 1e-6 ? [(dx / len) * mag, (dy / len) * mag] : [0, 0];
  }
  function onUp(e) {
    if (!drag || e.pointerId !== drag.id) return;
    drag = null;
    endShove();
  }
  renderer.domElement.addEventListener('pointerdown', onDown);
  renderer.domElement.addEventListener('pointermove', onMove);
  renderer.domElement.addEventListener('pointerup', onUp);
  renderer.domElement.addEventListener('pointercancel', onUp);

  const KEYMAP = { ArrowUp: 'up', w: 'up', ArrowDown: 'down', s: 'down', ArrowLeft: 'left', a: 'left', ArrowRight: 'right', d: 'right', q: 'sl', e: 'sr' };
  const onKey = (down) => (e) => {
    const k = KEYMAP[e.key] || KEYMAP[e.key.toLowerCase?.()];
    if (!k) return;
    e.preventDefault();
    down ? keys.add(k) : keys.delete(k);
  };
  const kd = onKey(true), ku = onKey(false);
  wrap.addEventListener('keydown', kd);
  wrap.addEventListener('keyup', ku);
  wrap.addEventListener('blur', () => keys.clear());

  // --- loop -------------------------------------------------------------------------------------
  let raf = 0, last = performance.now(), acc = 0, visible = true, disposed = false;
  let simClock = 0, wallClock = 0, slow = false, lastStatus = '';
  const focus = new THREE.Vector3(), want = new THREE.Vector3(), tmp = new THREE.Vector3();
  const dirV = new THREE.Vector3(), tailV = new THREE.Vector3();

  function frameCamera(snap) {
    want.copy(trunk.position);
    want.z = 0.25;
    if (snap) focus.copy(want); else focus.lerp(want, 0.08);
    const k = camera.aspect < 1.2 ? (1.2 / camera.aspect) ** 0.6 : 1;
    camera.position.copy(focus).addScaledVector(VIEW, k);
    camera.lookAt(focus);
  }

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    labelRenderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    frameCamera(true);
  }

  function status() {
    const s = { fell, slow, walking, label: verChip.textContent };
    const key = JSON.stringify(s);
    if (key !== lastStatus) { lastStatus = key; onStatus(s); }
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.max(0, Math.min(0.1, (now - last) / 1000));
    last = now;
    if (!visible || document.hidden) return;
    let force = null;
    if (!frozen) {
      acc += dt;
      let n = 0;
      while (acc >= info.ctrl_dt && n < 4) { force = controlStep() || force; acc -= info.ctrl_dt; n++; }
      if (acc >= info.ctrl_dt) acc = 0;  // behind: drop the backlog (slow motion) rather than spiral
      simClock += n * info.ctrl_dt;
      wallClock += dt;
      if (wallClock > 2) { slow = simClock / wallClock < 0.8; simClock = wallClock = 0; }
    }
    pose();
    // the push arrow: into the trunk along the force, longer for a harder shove
    const f = shove && Math.hypot(shove.force[0], shove.force[1]) > 1 ? shove.force : null;
    arrow.visible = !!f;
    tag.visible = !!f;
    if (f) {
      const mag = Math.hypot(f[0], f[1]);
      dirV.set(f[0] / mag, f[1] / mag, 0);
      const len = 0.18 + 0.32 * (mag / PUSH_MAX);
      tailV.copy(trunk.position).addScaledVector(dirV, -(len + 0.12));
      arrow.set(tailV, dirV, len, 0.012 + 0.02 * (mag / PUSH_MAX));
      tag.position.copy(tailV).add(tmp.set(0, 0, 0.12));
      tagEl.textContent = `${Math.round(mag)} N`;
    }
    shoveChip.style.display = f ? '' : 'none';
    if (f) shoveChip.textContent = `shove ${Math.round(Math.hypot(f[0], f[1]))} N`;
    flashEl.style.opacity = fell ? Math.max(0, 0.6 - (sim.t - fellAt) * 0.5).toFixed(3) : '0';
    ringMat.opacity = fell ? Math.max(0, 0.9 - (sim.t - fellAt) * 0.6) : 0;
    if (fell) {
      const s = 0.2 + (sim.t - fellAt) * 1.4;
      ring.scale.set(s, s, 1);
      ring.position.set(trunk.position.x, trunk.position.y, 0.006);
    }
    cmdChip.textContent = describeCmd(command());
    // keep the floor (1 m tiles) under the robot
    floor.position.x = Math.round(trunk.position.x);
    floor.position.y = Math.round(trunk.position.y);
    frameCamera(false);
    sun.target.position.copy(focus);
    sun.position.copy(focus).add(tmp.set(1.8, -2.4, 5));
    rim.target.position.copy(focus);
    rim.position.copy(focus).add(tmp.set(-3, 3, 1.5));
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
    status();
  }

  function reset() {
    shove = null; lastShove = null; fell = false; frozen = false; acc = 0;
    sim.reset(0);
    pose();
    frameCamera(true);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(stage);
  const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; last = performance.now(); });
  io.observe(wrap);
  verChip.textContent = label;
  reset();
  resize();
  raf = requestAnimationFrame(frame);

  return {
    reset,
    get lastShove() { return lastShove; },
    /** For tests and the console: where the trunk is, the sim clock, whether it has fallen. */
    get state() { const q = sim.data.qpos; return { t: sim.t, x: q[0], y: q[1], z: q[2], fell, slow, shoving: !!shove, arrow: arrow.visible }; },
    async setPolicy(url, name) {
      const p = parsePolicy(await bytes(url));
      sim.setPolicy(p);
      verChip.textContent = name;
      reset();
    },
    setWalking(on) { walking = on; },
    /** A quick shove for buttons and phones: full strength from one side for 0.3 s. */
    shoveFrom(side) {
      if (fell || shove) return;
      const [x, y] = QUICK[side];
      const h = sim.heading(), c = Math.cos(h), s = Math.sin(h);
      startShove('button');
      shove.quick = 0.3;
      shove.force = [PUSH_MAX * (c * x - s * y), PUSH_MAX * (s * x + c * y)];
    },
    focus() { wrap.focus({ preventScroll: true }); },
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener('keydown', kd);
      wrap.removeEventListener('keyup', ku);
      for (const d of disposables) d.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      sim.dispose();
      model.delete();
      wrap.remove();
    },
  };
}
