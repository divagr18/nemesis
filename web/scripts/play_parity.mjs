// The Playground's JS stepper on node, for tests/test_play.py: the same shoved rollout as the
// Python reference (_rollout), printed as JSON {qpos per control step, fallen per step}. Usage: node play_parity.mjs <dir>
// where <dir> holds go1.mjb, go1.json and v1.bin (python -m nemesis.export.play --out <dir>).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import loadMujoco from '@mujoco/mujoco';
import { Stepper, loadModel, parsePolicy } from '../src/lib/playcore.js';

const dir = process.argv[2];
const mj = await loadMujoco();
const model = loadModel(mj, readFileSync(join(dir, 'go1.mjb')));
const info = JSON.parse(readFileSync(join(dir, 'go1.json'), 'utf8'));
const policy = parsePolicy(readFileSync(join(dir, 'v1.bin')));
const st = new Stepper(mj, model, info, policy);
st.reset(0.4);
const out = [], fell = [];
const t0 = performance.now();
for (let i = 0; i < 150; i++) {
  st.step([1.0, 0.0, 0.3], i >= 50 && i < 60 ? [0, -140, 0] : null);
  out.push(Array.from(st.data.qpos));
  fell.push(st.fallen());
}
const ms = performance.now() - t0;
process.stderr.write(`150 control steps in ${ms.toFixed(0)} ms (${(150 / ms * 1000).toFixed(0)} steps/s; real time needs 50)\n`);
process.stdout.write(JSON.stringify({ qpos: out, fell }));
