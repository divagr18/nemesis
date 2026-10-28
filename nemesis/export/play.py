"""Playground: the live robot in the browser (MuJoCo WASM + the policy in plain JS).

The browser runs the exact model the policy trains on (load_env's Go1: body collisions, feet with
their own contact, terrain boxes parked), saved as a binary .mjb. The npm @mujoco/mujoco build is
the same MuJoCo version as the Python bindings (3.17.0), so the model loads bit for bit. Next to it
a small JSON says how to drive it (sensor addresses, default pose, PD scale, dt, fall check), and
each policy version is a flat float32 binary: the observation normalizer plus the actor's four
dense layers (the critic is not needed).

`Stepper` is the reference controller on plain C MuJoCo, mirroring what the training env does at
neutral θ (Playground's Go1 Joystick under NemesisWrapper): 5 physics substeps per 50 Hz control
step, PD targets = default pose + 0.5 × action, the 48-number observation stacked over 3 frames
(newest first), and the wrapper's strict fall check. web/src/lib/play.js ports it line for line;
tests/test_play.py checks the JS port against it, and this module's own policy against Brax's.

  python -m nemesis.export.play --out web/public/play            model + v1 policy
  python -m nemesis.export.play --policy runs/x --name v9 --out ... one more policy version
"""

import argparse
import json
import struct
from pathlib import Path

import mujoco
import numpy as np

MAGIC = b"NPOL"
HISTORY = 3
OBS = 48
ACT = 12


# ---- policy ---------------------------------------------------------------------------------------

def policy_arrays(params) -> dict:
    """The actor's arrays from a Brax PPO checkpoint (normalizer, policy, value)."""
    norm, pol = params[0], params[1]
    layers = pol["params"]
    names = sorted(layers, key=lambda k: int(k.split("_")[-1]))
    return {
        "mean": np.asarray(norm.mean["state"], np.float32),
        "std": np.asarray(norm.std["state"], np.float32),
        "layers": [(np.asarray(layers[n]["kernel"], np.float32), np.asarray(layers[n]["bias"], np.float32))
                   for n in names],
    }


def write_policy(arrays: dict, path: Path, version: str = "") -> int:
    """NPOL binary: magic, u32 header length, JSON header, then float32 data in header order
    (mean, std, then each layer's kernel [in, out] row-major and bias). Returns the byte size."""
    header = {"version": version, "obs": int(arrays["mean"].size), "act": ACT,
              "layers": [[int(k.shape[0]), int(k.shape[1])] for k, _ in arrays["layers"]]}
    blob = [arrays["mean"], arrays["std"]] + [a for kb in arrays["layers"] for a in kb]
    h = json.dumps(header).encode()
    h += b" " * (-(len(MAGIC) + 4 + len(h)) % 4)  # float32 data starts 4-byte aligned
    data = MAGIC + struct.pack("<I", len(h)) + h + b"".join(np.ascontiguousarray(a, "<f4").tobytes() for a in blob)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    return len(data)


def read_policy(path: Path) -> dict:
    data = path.read_bytes()
    assert data[:4] == MAGIC
    n = struct.unpack("<I", data[4:8])[0]
    header = json.loads(data[8:8 + n])
    flat = np.frombuffer(data, "<f4", offset=8 + n)
    out, i = {}, 0

    def take(*shape):
        nonlocal i
        size = int(np.prod(shape))
        a = flat[i:i + size].reshape(shape)
        i += size
        return a
    out["mean"], out["std"] = take(header["obs"]), take(header["obs"])
    out["layers"] = [(take(a, b), take(b)) for a, b in header["layers"]]
    return out


def act(arrays: dict, obs: np.ndarray) -> np.ndarray:
    """Deterministic action: tanh of the mean of Brax's NormalTanh head (swish hidden layers)."""
    x = (obs.astype(np.float32) - arrays["mean"]) / arrays["std"]
    *hidden, last = arrays["layers"]
    for k, b in hidden:
        x = x @ k + b
        with np.errstate(over="ignore"):  # exp(-x) -> inf for very negative x gives swish -> -0
            x = x / (1.0 + np.exp(-x))  # swish
    out = x @ last[0] + last[1]
    return np.tanh(out[:ACT])


# ---- model ----------------------------------------------------------------------------------------

GEOM_CONTACT = ("geom_contype", "geom_conaffinity", "geom_condim", "geom_priority", "geom_friction",
                "geom_solref", "geom_solimp", "geom_solmix", "geom_margin", "geom_gap")
MODEL_EDITS = ("jnt_range", "actuator_ctrlrange", "dof_damping", "actuator_gainprm", "actuator_biasprm")
SAME = ("body_mass", "body_inertia", "body_ipos", "body_iquat", "body_pos", "body_quat", "jnt_pos",
        "geom_size", "geom_pos", "geom_quat", "geom_type", "geom_bodyid", "key_qpos", "sensor_adr")


def physics_model(env) -> tuple[mujoco.MjModel, np.ndarray]:
    """The env's final model without its visual meshes and textures (49 MB -> well under 1 MB).

    Those geoms never collide (contype = conaffinity = 0) and the Go1's bodies have explicit inertia,
    so removing them changes no dynamics; tests/test_play.py checks rollouts stay bit-identical.
    The model is rebuilt from the same spec as load_env's, minus the mesh geoms, and every field
    Playground and load_env edit after compiling is copied from the full model (geoms through the
    old->new id map). Returns (model, new id of each full-model geom, -1 if removed)."""
    from nemesis import robots
    from nemesis.envs.base import build_spec

    raw = env.unwrapped
    full = raw._mj_model
    spec = build_spec(raw, robots.get(raw._nemesis_spec.robot.name))
    for g in spec.geoms:
        g.material = ""
        if g.type == mujoco.mjtGeom.mjGEOM_MESH:
            spec.delete(g)
    for items in (spec.meshes, spec.materials, spec.textures, spec.skins):
        for x in list(items):
            spec.delete(x)
    m = spec.compile()

    keep = np.flatnonzero(full.geom_type != mujoco.mjtGeom.mjGEOM_MESH)
    assert len(keep) == m.ngeom, (len(keep), m.ngeom)
    new_id = np.full(full.ngeom, -1)
    new_id[keep] = np.arange(m.ngeom)
    m.opt.timestep, m.opt.ccd_iterations = full.opt.timestep, full.opt.ccd_iterations
    for f in MODEL_EDITS:
        getattr(m, f)[:] = getattr(full, f)
    for f in GEOM_CONTACT:
        getattr(m, f)[:] = getattr(full, f)[keep]
    for f in SAME:
        a, b = getattr(m, f), getattr(full, f)
        b = b[keep] if f.startswith("geom_") else b
        assert np.array_equal(a, b), f"{f} differs after stripping visuals"
    body_filters(m)
    return m, new_id


def body_filters(m: mujoco.MjModel) -> mujoco.MjModel:
    """Recomputes each body's collision bitmasks from its geoms.

    C MuJoCo's broad phase first filters body pairs by body_contype / body_conaffinity, which the
    compiler sets to the OR over each body's geoms. load_env turns on the body-floor collisions by
    editing geom_conaffinity after compiling, so those body masks stay 0 and plain MuJoCo never
    tests the trunk, thighs and calves against the floor: a fallen robot sinks through it. MJX has
    no body-level filter, so training and the server never saw this. Fixing the masks changes
    nothing until a body touches the floor (which is already a fall)."""
    for b in range(m.nbody):
        geoms = np.flatnonzero(m.geom_bodyid == b)
        m.body_contype[b] = np.bitwise_or.reduce(m.geom_contype[geoms]) if len(geoms) else 0
        m.body_conaffinity[b] = np.bitwise_or.reduce(m.geom_conaffinity[geoms]) if len(geoms) else 0
    return m


def meta(env, m: mujoco.MjModel | None = None, new_id: np.ndarray | None = None) -> dict:
    """Everything the browser needs to drive the model the way the training env does."""
    raw = env.unwrapped
    m = raw._mj_model if m is None else m
    gid = (lambda g: int(g)) if new_id is None else (lambda g: int(new_id[g]))  # noqa: E731
    cfg = raw._config
    sensor = lambda name: int(m.sensor_adr[m.sensor(name).id])  # noqa: E731
    spec = raw._nemesis_spec
    from nemesis import robots

    return {
        "ctrl_dt": float(cfg.ctrl_dt), "sim_dt": float(cfg.sim_dt),
        "substeps": int(round(cfg.ctrl_dt / cfg.sim_dt)),
        "action_scale": float(cfg.action_scale),
        "home_qpos": [float(v) for v in m.keyframe("home").qpos],
        "default_pose": [float(v) for v in m.keyframe("home").qpos[7:]],
        "sensors": {"gyro": sensor("gyro"), "local_linvel": sensor("local_linvel")},
        "imu_site": int(m.site("imu").id),
        "trunk": int(spec.trunk), "floor": gid(spec.floor),
        "body_geoms": [gid(g) for g in raw._nemesis_body_geoms],
        "min_height": float(robots.GO1.min_height),
        "min_up_z": float(spec.min_up_z),
        "history": HISTORY, "obs": OBS,
        "command_max": [float(v) for v in cfg.command_config.a],
        "noise": {k: float(v) * float(cfg.noise_config.level) for k, v in cfg.noise_config.scales.items()},
        "nq": int(m.nq), "nv": int(m.nv), "nu": int(m.nu), "nbody": int(m.nbody),
    }


def export_model(out: Path) -> dict:
    from nemesis import config
    from nemesis.envs.base import load_env

    env, _ = load_env(config.BASE_ENV)
    out.mkdir(parents=True, exist_ok=True)
    m, new_id = physics_model(env)
    mujoco.mj_saveModel(m, str(out / "go1.mjb"), None)
    info = meta(env, m, new_id)
    info["mujoco"] = mujoco.__version__
    (out / "go1.json").write_text(json.dumps(info, indent=1))
    return info


# ---- reference stepper ----------------------------------------------------------------------------

class Stepper:
    """The policy walking on plain C MuJoCo, built the way the training env builds observations."""

    def __init__(self, model: mujoco.MjModel, info: dict, arrays: dict, noise: bool = False, seed: int = 0):
        self.m, self.info, self.arrays = model, info, arrays
        self.d = mujoco.MjData(model)
        self.noise = noise
        self.rng = np.random.default_rng(seed)
        self.default = np.array(info["default_pose"])
        self.reset()

    def reset(self, yaw: float = 0.0, qvel0=None):
        m, d = self.m, self.d
        mujoco.mj_resetData(m, d)
        d.qpos[:] = self.info["home_qpos"]
        q = np.zeros(4)
        mujoco.mju_axisAngle2Quat(q, np.array([0.0, 0.0, 1.0]), yaw)
        out = np.zeros(4)
        mujoco.mju_mulQuat(out, d.qpos[3:7].copy(), q)
        d.qpos[3:7] = out
        if qvel0 is not None:
            d.qvel[:6] = qvel0
        d.ctrl[:] = self.default
        mujoco.mj_forward(m, d)
        self.last_act = np.zeros(ACT)
        self.command = np.zeros(3)
        self.hist = np.zeros((HISTORY, OBS))
        self.push(self.observe())
        self.t = 0.0

    def _noisy(self, x, key):
        if not self.noise:
            return x
        return x + (2 * self.rng.random(x.shape) - 1) * self.info["noise"][key]

    def observe(self) -> np.ndarray:
        d, s = self.d, self.info["sensors"]
        gyro = d.sensordata[s["gyro"]:s["gyro"] + 3]
        linvel = d.sensordata[s["local_linvel"]:s["local_linvel"] + 3]
        R = d.site_xmat[self.info["imu_site"]].reshape(3, 3)
        gravity = R.T @ np.array([0.0, 0.0, -1.0])
        return np.concatenate([
            self._noisy(linvel, "linvel"), self._noisy(gyro, "gyro"), self._noisy(gravity, "gravity"),
            self._noisy(d.qpos[7:], "joint_pos") - self.default, self._noisy(d.qvel[6:], "joint_vel"),
            self.last_act, self.command,
        ])

    def push(self, obs):
        self.hist = np.concatenate([obs[None], self.hist[:-1]])

    def step(self, command=None, force=None):
        """One 50 Hz control step. `force`: world-frame force on the trunk (N) during this step."""
        if command is not None:
            self.command = np.asarray(command, float)
        a = act(self.arrays, self.hist.reshape(-1))
        self.d.ctrl[:] = self.default + a * self.info["action_scale"]
        self.d.xfrc_applied[self.info["trunk"], :3] = 0.0 if force is None else force
        for _ in range(self.info["substeps"]):
            mujoco.mj_step(self.m, self.d)
        self.last_act = a
        self.push(self.observe())
        self.t += self.info["ctrl_dt"]
        return a

    def fallen(self) -> bool:
        d, info = self.d, self.info
        body = set(info["body_geoms"])
        for i in range(d.ncon):
            c = d.contact[i]
            g = {int(c.geom1), int(c.geom2)}
            if info["floor"] in g and (g - {info["floor"]}) & body and c.dist < 0:
                return True
        up_z = d.xmat[info["trunk"]].reshape(3, 3)[2, 2]
        return bool(up_z < info["min_up_z"] or d.qpos[2] < info["min_height"]
                    or not np.isfinite(d.qpos).all())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="web/public/play")
    ap.add_argument("--policy", default="runs/baseline_v2", help="run dir (default: the v1 policy)")
    ap.add_argument("--name", default="v1")
    ap.add_argument("--no-model", action="store_true")
    args = ap.parse_args()
    from nemesis.train.ppo import load_params

    out = Path(args.out)
    if not args.no_model:
        info = export_model(out)
        print(f"model -> {out / 'go1.mjb'} (MuJoCo {info['mujoco']})")
    n = write_policy(policy_arrays(load_params(args.policy)), out / f"{args.name}.bin", args.name)
    print(f"policy {args.name} -> {out / f'{args.name}.bin'} ({n / 1e6:.2f} MB)")


if __name__ == "__main__":
    main()
