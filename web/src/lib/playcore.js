// Playground core: the live Go1 on MuJoCo WASM, driven by the trained policy in plain JS.
// A line-for-line port of nemesis/export/play.py's Stepper (web/scripts/play_parity.mjs checks it
// against the Python reference): 5 physics substeps per 50 Hz control step, PD targets =
// default pose + 0.5 × action, the 48-number observation stacked over 3 frames (newest first),
// and the training wrapper's strict fall check. No three.js here, so node can run it too.

const MAGIC = 'NPOL';
export const ACT = 12;

/** Parses a policy binary (play.py write_policy): normalizer + dense layers, float32. */
export function parsePolicy(buf) {
  const bytes = new Uint8Array(buf);
  if (String.fromCharCode(...bytes.slice(0, 4)) !== MAGIC) throw new Error('not a policy file');
  const n = new DataView(bytes.buffer, bytes.byteOffset + 4, 4).getUint32(0, true);
  const header = JSON.parse(new TextDecoder().decode(bytes.slice(8, 8 + n)));
  const flat = new Float32Array(bytes.buffer.slice(bytes.byteOffset + 8 + n, bytes.byteOffset + bytes.byteLength));
  let i = 0;
  const take = (size) => { const a = flat.subarray(i, i + size); i += size; return a; };
  const mean = take(header.obs), std = take(header.obs);
  const layers = header.layers.map(([nIn, nOut]) => ({ nIn, nOut, W: take(nIn * nOut), b: take(nOut) }));
  const widest = Math.max(header.obs, ...header.layers.map((l) => l[1]));
  return { ...header, mean, std, layers, scratch: [new Float64Array(widest), new Float64Array(widest)] };
}

/** Deterministic action: tanh of the mean of the NormalTanh head (swish hidden layers). */
export function act(policy, obs, out = new Float64Array(ACT)) {
  let [x, y] = policy.scratch;
  const { mean, std, layers } = policy;
  for (let k = 0; k < policy.obs; k++) x[k] = (Math.fround(obs[k]) - mean[k]) / std[k];
  layers.forEach(({ nIn, nOut, W, b }, li) => {
    for (let j = 0; j < nOut; j++) y[j] = b[j];
    for (let k = 0; k < nIn; k++) {  // W is [in, out] row-major
      const xk = x[k], row = k * nOut;
      if (xk === 0) continue;
      for (let j = 0; j < nOut; j++) y[j] += xk * W[row + j];
    }
    if (li < layers.length - 1) for (let j = 0; j < nOut; j++) y[j] = y[j] / (1 + Math.exp(-y[j]));  // swish
    [x, y] = [y, x];
  });
  for (let j = 0; j < ACT; j++) out[j] = Math.tanh(x[j]);
  return out;
}

/** Loads the .mjb bytes into a MuJoCo model. */
export function loadModel(mj, bytes) {
  const vfs = new mj.MjVFS();
  try {
    vfs.addBuffer('go1.mjb', new Uint8Array(bytes));
    return mj.MjModel.from_binary_path('go1.mjb', vfs);
  } finally {
    vfs.delete();
  }
}

function quatMul(a, b) {
  return [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0],
  ];
}

export class Stepper {
  /** `info`: the model's play JSON (sensor addresses, default pose, dt, fall thresholds). */
  constructor(mj, model, info, policy, { noise = false, random = Math.random } = {}) {
    Object.assign(this, { mj, model, info, policy, noise, random });
    this.data = new mj.MjData(model);
    this.default = Float64Array.from(info.default_pose);
    this.obsLen = info.obs;
    this.hist = new Float64Array(info.history * info.obs);
    this.lastAct = new Float64Array(ACT);
    this.action = new Float64Array(ACT);
    this.command = [0, 0, 0];
    this.bodyGeoms = new Set(info.body_geoms);
    this.reset();
  }

  setPolicy(policy) { this.policy = policy; }

  reset(yaw = 0, qvel0 = null) {
    const { mj, model, data, info } = this;
    mj.mj_resetData(model, data);
    const qpos = data.qpos;
    qpos.set(info.home_qpos);
    const h = yaw / 2, q = quatMul([qpos[3], qpos[4], qpos[5], qpos[6]], [Math.cos(h), 0, 0, Math.sin(h)]);
    qpos.set(q, 3);
    if (qvel0) data.qvel.set(qvel0.slice(0, 6));
    data.ctrl.set(this.default);
    mj.mj_forward(model, data);
    this.lastAct.fill(0);
    this.command = [0, 0, 0];
    this.hist.fill(0);
    this.push(this.observe());
    this.t = 0;
  }

  noisy(v, key) {
    if (!this.noise) return v;
    const s = this.info.noise[key];
    for (let i = 0; i < v.length; i++) v[i] += (2 * this.random() - 1) * s;
    return v;
  }

  observe() {
    const { data, info } = this, s = info.sensors;
    const sd = data.sensordata, R = data.site_xmat, r = 9 * info.imu_site;
    const linvel = this.noisy([sd[s.local_linvel], sd[s.local_linvel + 1], sd[s.local_linvel + 2]], 'linvel');
    const gyro = this.noisy([sd[s.gyro], sd[s.gyro + 1], sd[s.gyro + 2]], 'gyro');
    const gravity = this.noisy([-R[r + 6], -R[r + 7], -R[r + 8]], 'gravity');  // R^T [0, 0, -1]
    const qpos = data.qpos, qvel = data.qvel;
    const joints = this.noisy(Array.from(qpos.subarray(7, 19)), 'joint_pos').map((v, i) => v - this.default[i]);
    const jvel = this.noisy(Array.from(qvel.subarray(6, 18)), 'joint_vel');
    return [...linvel, ...gyro, ...gravity, ...joints, ...jvel, ...this.lastAct, ...this.command];
  }

  push(obs) {
    this.hist.copyWithin(this.obsLen, 0, this.hist.length - this.obsLen);
    this.hist.set(obs, 0);
  }

  /** One 50 Hz control step. `force`: world-frame force on the trunk (N), held for this step. */
  step(command = null, force = null) {
    const { mj, model, data, info } = this;
    if (command) this.command = command.slice(0, 3);
    const a = act(this.policy, this.hist, this.action);
    const ctrl = data.ctrl;
    for (let i = 0; i < ACT; i++) ctrl[i] = this.default[i] + a[i] * info.action_scale;
    const xf = data.xfrc_applied, k = 6 * info.trunk;
    xf[k] = force ? force[0] : 0; xf[k + 1] = force ? force[1] : 0; xf[k + 2] = force ? force[2] : 0;
    for (let i = 0; i < info.substeps; i++) mj.mj_step(model, data);
    this.lastAct.set(a);
    this.push(this.observe());
    this.t += info.ctrl_dt;
    return a;
  }

  /** Heading of the trunk (yaw), from the free joint's quaternion. */
  heading() {
    const q = this.data.qpos;
    return 2 * Math.atan2(q[6], q[3]);
  }

  /** The training wrapper's fall check: a body geom touching the floor, tilt past 45°, too low. */
  fallen() {
    const { data, info } = this;
    const qpos = data.qpos;
    const upZ = data.xmat[9 * info.trunk + 8];
    if (upZ < info.min_up_z || qpos[2] < info.min_height || !Number.isFinite(qpos[2])) return true;
    const n = data.ncon;
    if (!n) return false;
    const contacts = data.contact;
    try {
      for (let i = 0; i < n; i++) {
        const c = contacts.get(i);
        const g1 = c.geom1, g2 = c.geom2, d = c.dist;
        c.delete();
        const other = g1 === info.floor ? g2 : g2 === info.floor ? g1 : -1;
        if (other >= 0 && this.bodyGeoms.has(other) && d < 0) return true;
      }
    } finally {
      contacts.delete();
    }
    return false;
  }

  dispose() { this.data.delete(); }
}
