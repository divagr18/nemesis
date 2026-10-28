"""Export rollouts for the in-browser 3D replay (web/dist/js/replay.js).

Two JSON documents, both CPU-only (numpy + mujoco, no JAX):

  scene_assets(mj_model, robot=)              static: drawn bodies, visual geoms, meshes, floor (served once)
  trajectory(mj_model, qpos, θ, dt, robot=)   per rollout: body poses per frame + θ overlays + fall time

`robot` ("go1" by default, or "g1") picks the θ layout, the trunk, the foot sites and the fall
thresholds from nemesis/robots.py; Go1's output is what it was before the argument existed.

Arrays are packed as {"dtype", "shape", "b64"}: little-endian raw bytes in base64, about half the
size of rounded JSON lists and decoded in the browser with one typed-array view. Quaternions are
MuJoCo order (w, x, y, z); positions are world frame, z up.

Overlays follow nemesis/sim/overlays.py (the mp4 overlays) so both views show the same attack.
Terrain is in the start-heading frame (x = metres along the start heading from overlays.start.origin,
heights above the floor, `width` m across centred on the heading; perturb/terrain.py is the shared
geometry). overlays.terrain is null on flat ground, else
  {"steps": [{"x0", "x1", "height"}, ...], "ramps": [{"x0", "x1", "h0", "h1"}, ...], "width": 3.0}
  - steps: solid blocks from the floor up to `height`, spanning x0..x1 (a flight that comes back
    down lists its steps down with decreasing heights).
  - ramps: solids from the floor up to a top surface that rises linearly from h0 at x0 to h1 at x1:
    the ramp (h0 = 0), then its flat landing (h0 == h1). Empty list when there is no ramp.
overlays.ice is the first low-friction patch (null if none); overlays.ice_patches lists EVERY patch
(the first one included, same fields: center, half_size, yaw, mu, start, length), so a viewer that
knows ice_patches should draw only that list.

usage:
    python -m nemesis.sim.export --sample        # writes web/dist/assets/{go1_scene,sample_traj*}.json
    python -m nemesis.sim.export --scene g1 --out web/public/assets/g1_scene.json [--mesh-cell 0.004]
                                                 # a robot's scene asset (loads its env: needs JAX)
"""

import argparse
import base64
import importlib.util
import json
from pathlib import Path

import mujoco
import numpy as np

from nemesis import robots
from nemesis.perturb import canonical as C
from nemesis.perturb import terrain

VERSION = 1
TRUNK = 1
FEET_SITES = ("FR", "FL", "RR", "RL")
VISIBLE_GROUPS = 3  # MuJoCo's default visual options draw geom groups 0-2; collision geoms are group 3
# Same fall test as perturb/wrapper.py (copied: importing it pulls in JAX). Go1's values; other
# robots' come from nemesis/robots.py.
MIN_HEIGHT = 0.18
MIN_UP_Z = float(np.cos(np.deg2rad(45)))
GEOM_TYPES = {mujoco.mjtGeom.mjGEOM_PLANE: "plane", mujoco.mjtGeom.mjGEOM_SPHERE: "sphere",
              mujoco.mjtGeom.mjGEOM_CAPSULE: "capsule", mujoco.mjtGeom.mjGEOM_ELLIPSOID: "ellipsoid",
              mujoco.mjtGeom.mjGEOM_CYLINDER: "cylinder", mujoco.mjtGeom.mjGEOM_BOX: "box",
              mujoco.mjtGeom.mjGEOM_MESH: "mesh"}


def pack(a, dtype: str) -> dict:
    a = np.ascontiguousarray(a, dtype=np.dtype(dtype).newbyteorder("<"))
    return {"dtype": dtype, "shape": list(a.shape), "b64": base64.b64encode(a.tobytes()).decode("ascii")}


def unpack(d: dict) -> np.ndarray:
    return np.frombuffer(base64.b64decode(d["b64"]), dtype=np.dtype(d["dtype"]).newbyteorder("<")).reshape(d["shape"])


def _r(x, n=4):
    return np.round(np.asarray(x, np.float64), n).tolist()


def _name(m, obj, i):
    return mujoco.mj_id2name(m, obj, i) or ""


def visual_geoms(m: mujoco.MjModel) -> list[int]:
    """Geoms the default renderer draws on robot bodies. World geoms (the floor) and load_env's
    step boxes (mocap bodies, hidden; drawn from overlays.terrain instead) are not."""
    return [g for g in range(m.ngeom)
            if m.geom_bodyid[g] != 0 and m.body_mocapid[m.geom_bodyid[g]] < 0
            and m.geom_group[g] < VISIBLE_GROUPS and _rgba(m, g)[3] > 0]


def drawn_bodies(m: mujoco.MjModel) -> list[int]:
    return sorted({int(m.geom_bodyid[g]) for g in visual_geoms(m)})


def _rgba(m, g):
    # MuJoCo uses the material colour unless the geom overrides the default rgba.
    rgba = m.geom_rgba[g]
    if m.geom_matid[g] >= 0 and np.allclose(rgba, [0.5, 0.5, 0.5, 1.0]):
        return m.mat_rgba[m.geom_matid[g]]
    return rgba


def decimate(vert: np.ndarray, face: np.ndarray, cell: float) -> tuple[np.ndarray, np.ndarray]:
    """Vertex clustering: merge vertices sharing a `cell`-sized grid cell (at their mean) and drop
    collapsed and duplicate triangles. The Go1 STLs have ~200k faces; at 3 mm this keeps ~29k,
    which is indistinguishable at replay scale. cell <= 0 returns the mesh unchanged."""
    if cell <= 0:
        return vert, face
    _, inv = np.unique(np.floor(vert / cell).astype(np.int64), axis=0, return_inverse=True)
    inv = inv.reshape(-1)
    n = inv.max() + 1
    cnt = np.bincount(inv, minlength=n)[:, None]
    v = np.stack([np.bincount(inv, vert[:, k], n) for k in range(3)], axis=1) / cnt
    f = inv[face]
    f = f[(f[:, 0] != f[:, 1]) & (f[:, 1] != f[:, 2]) & (f[:, 0] != f[:, 2])]
    _, first = np.unique(np.sort(f, axis=1), axis=0, return_index=True)
    f = f[np.sort(first)]
    used = np.unique(f)
    remap = np.full(n, -1, np.int64)
    remap[used] = np.arange(len(used))
    return v[used], remap[f]


def scene_assets(mj_model: mujoco.MjModel, mesh_cell: float = 0.003, robot: "str | robots.Robot" = "go1") -> dict:
    """Everything static the browser needs to draw the robot and the floor. Meshes are decimated
    to `mesh_cell` metres (see decimate) to keep the download small. `sites` holds the robot's
    foot sites (Go1: FR FL RR RL; G1: left_foot right_foot)."""
    m = mj_model
    bodies = drawn_bodies(m)
    bidx = {b: i for i, b in enumerate(bodies)}
    meshes, mesh_idx, geoms = [], {}, []
    for g in visual_geoms(m):
        gtype = GEOM_TYPES.get(int(m.geom_type[g]))
        if gtype is None:
            continue
        mesh = None
        if gtype == "mesh":
            mid = int(m.geom_dataid[g])
            if mid not in mesh_idx:
                v0, nv = m.mesh_vertadr[mid], m.mesh_vertnum[mid]
                f0, nf = m.mesh_faceadr[mid], m.mesh_facenum[mid]
                vert, face = decimate(m.mesh_vert[v0:v0 + nv], m.mesh_face[f0:f0 + nf], mesh_cell)
                mesh_idx[mid] = len(meshes)
                meshes.append({"name": _name(m, mujoco.mjtObj.mjOBJ_MESH, mid),
                               "vert": pack(np.round(vert, 4), "float32"),
                               "face": pack(face, "uint16" if len(vert) < 65536 else "uint32")})
            mesh = mesh_idx[mid]
        geoms.append({"name": _name(m, mujoco.mjtObj.mjOBJ_GEOM, g), "body": bidx[int(m.geom_bodyid[g])],
                      "type": gtype, "size": _r(m.geom_size[g]), "pos": _r(m.geom_pos[g], 5),
                      "quat": _r(m.geom_quat[g], 5), "rgba": _r(_rgba(m, g), 3), "mesh": mesh})
    sites = {}
    for s in robots.get(robot).foot_sites:
        sid = mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_SITE, s)
        if sid >= 0 and int(m.site_bodyid[sid]) in bidx:
            sites[s] = {"body": bidx[int(m.site_bodyid[sid])], "pos": _r(m.site_pos[sid], 5)}
    floor = None
    for g in range(m.ngeom):
        if m.geom_bodyid[g] == 0 and m.geom_type[g] == mujoco.mjtGeom.mjGEOM_PLANE:
            floor = {"z": float(m.geom_pos[g][2]), "friction": round(float(m.geom_friction[g][0]), 3)}
            break
    return {
        "version": VERSION, "model": bytes(m.names).split(b"\0", 1)[0].decode(),
        "bodies": [{"name": _name(m, mujoco.mjtObj.mjOBJ_BODY, b), "id": b,
                    "parent": bidx.get(int(m.body_parentid[b]), -1)} for b in bodies],
        "geoms": geoms, "meshes": meshes, "sites": sites, "floor": floor or {"z": 0.0, "friction": 1.0},
    }


def _slot(theta, name, L=C.GO1):
    return np.asarray(theta, np.float64)[L.INDEX[name]]


def _rot_z(yaw):
    c, s = np.cos(yaw), np.sin(yaw)
    return np.array([[c, -s, 0], [s, c, 0], [0, 0, 1]])


def _ice(origin, heading, yaw0, mu, start, length) -> dict:
    c = origin + heading * (start + length / 2)
    return {"center": _r([c[0], c[1], 0.003]), "half_size": _r([length / 2, 0.9, 0.003]),
            "yaw": round(yaw0, 5), "mu": round(mu, 3), "start": round(start, 3), "length": round(length, 3)}


def overlay_spec(mj_model: mujoco.MjModel, theta, q0: np.ndarray, robot: "str | robots.Robot" = "go1") -> dict:
    """θ as drawable things, with the semantics of overlays.py. q0 is the first qpos (start pose).
    `robot` gives the θ layout, trunk, foot sites and the bodies the θ joints move."""
    m = mj_model
    rb, L = robots.get(robot), C.layout(robot)
    _slot_ = lambda th, name: _slot(th, name, L)  # noqa: E731
    bidx = {b: i for i, b in enumerate(drawn_bodies(m))}
    origin, yaw0 = np.asarray(q0[:2], np.float64), float(2 * np.arctan2(q0[6], q0[3]))
    heading = np.array([np.cos(yaw0), np.sin(yaw0)])
    R0 = _rot_z(yaw0)
    out = {"start": {"origin": _r(origin), "yaw": round(yaw0, 5)}, "ice": None, "slippery_feet": [],
           "payload": None, "pushes": [], "weak": [], "slope": None, "command": None, "terrain": None,
           "conditions": L.describe(np.asarray(theta, np.float32))}

    # Stairs, curbs and the course in the start-heading frame: x0/x1 along the heading from the
    # start origin.
    if terrain.has_terrain(L):
        out["terrain"] = terrain.export_terrain(theta, L, rb.terrain_boxes)

    ice_mu, ice_start, ice_len = (float(_slot_(theta, k)[0]) for k in ("ice_mu", "ice_start", "ice_length"))
    if ice_len > 0.01 and ice_mu < 0.6:
        out["ice"] = _ice(origin, heading, yaw0, ice_mu, ice_start, ice_len)
    if terrain.has_course(L):
        out["ice_patches"] = [_ice(origin, heading, yaw0, mu, start, length)
                              for mu, start, length in terrain.ice_patches(theta, L) if length > 0.01 and mu < 0.6]

    for name, mu in zip(rb.foot_sites, _slot_(theta, "foot_friction")):
        sid = mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_SITE, name)
        if mu < 0.5 and sid >= 0 and int(m.site_bodyid[sid]) in bidx:
            out["slippery_feet"].append({"site": name, "body": bidx[int(m.site_bodyid[sid])],
                                         "pos": _r(m.site_pos[sid], 5), "mu": round(float(mu), 3)})

    mass = float(_slot_(theta, "payload_mass")[0])
    trunk = mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_BODY, rb.trunk)
    if mass > 0.2 and trunk in bidx:
        side = 0.06 * (mass / 3.0) ** (1 / 3)
        offset = _slot_(theta, "payload_offset")
        out["payload"] = {"body": bidx[trunk], "pos": _r(offset + [0, 0, 0.06 + side]),
                          "half_size": _r([side * 1.3, side, side]), "mass": round(mass, 3)}

    for k in ("push1", "push2"):
        t0, dur = float(_slot_(theta, f"{k}_start")[0]), float(_slot_(theta, f"{k}_duration")[0])
        f = R0 @ _slot_(theta, f"{k}_force")  # start-heading frame -> world, as in apply.push_force
        if dur > 0 and np.linalg.norm(f) > 1.0:
            out["pushes"].append({"t0": round(t0, 4), "t1": round(t0 + dur, 4), "force": _r(f, 2),
                                  "magnitude": round(float(np.linalg.norm(f)), 2)})

    strength = _slot_(theta, "motor_strength")
    # The body each θ joint moves (Go1's bodies are named after its joints).
    joint_bodies = [int(m.jnt_bodyid[m.actuator_trnid[mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_ACTUATOR, a), 0]])
                    for a in rb.actuators]
    for j, name in enumerate(L.JOINTS):
        loss = 1.0 - float(strength[j])
        body = joint_bodies[j]
        if loss >= 0.05 and body in bidx:
            out["weak"].append({"body": bidx[body], "name": name, "strength": round(float(strength[j]), 3),
                                "amount": round(min(1.0, loss * 1.4), 3)})

    pitch, roll = (float(v) for v in _slot_(theta, "slope"))
    if abs(pitch) > 1e-4 or abs(roll) > 1e-4:
        # apply.slope_down: gravity is tilted (the floor is not); the viewer tilts the world instead.
        down = R0 @ np.array([-np.sin(pitch) * np.cos(roll), np.sin(roll), -np.cos(pitch) * np.cos(roll)])
        out["slope"] = {"pitch": round(pitch, 5), "roll": round(roll, 5), "down": _r(down, 5)}

    if _slot_(theta, "command_mode")[0] > 0.5:
        out["command"] = {"a": _r(_slot_(theta, "command_a"), 3), "b": _r(_slot_(theta, "command_b"), 3),
                          "switch": round(float(_slot_(theta, "command_switch")[0]), 3)}
    return out


def _fill_nonfinite(qpos):
    """Diverged rollouts can end in NaNs; hold the last finite pose instead."""
    q = np.array(qpos, np.float64)
    ok = np.isfinite(q).all(axis=1)
    if not ok[0]:
        q[0] = q[np.argmax(ok)] if ok.any() else 0.0
    for t in range(1, len(q)):
        if not ok[t]:
            q[t] = q[t - 1]
    return q


def detect_fall(qpos: np.ndarray, dt: float, robot: "str | robots.Robot" = "go1") -> float | None:
    """First time the root is too low or tilted past the robot's limit (wrapper.fallen without
    contacts; the root's orientation stands in for the trunk's)."""
    rb = robots.get(robot)
    min_height = MIN_HEIGHT if rb.name == "go1" else rb.min_height
    min_up_z = MIN_UP_Z if rb.name == "go1" else float(np.cos(np.deg2rad(rb.max_tilt_deg)))
    q = np.asarray(qpos, np.float64)
    w, x, y = q[:, 3], q[:, 4], q[:, 5]
    up_z = 1 - 2 * (x * x + y * y)  # root z axis . world z
    fell = (q[:, 2] < min_height) | (up_z < min_up_z)
    return float(np.argmax(fell) * dt) if fell.any() else None


def hold_after_fall(qpos: np.ndarray, theta, fall_time: float | None, dt: float, robot: str = "go1") -> np.ndarray:
    """On stairs, curbs and ramps only the feet collide with the terrain boxes (envs.base: body-box
    contacts would make MJX ~5x slower), and a body touching a box is found geometrically and ends
    the episode as a fall. Recorded past the fall, the body sinks into the step it landed on, so
    on terrain the pose is held from the fall on. Flat ground keeps the real tumble (bodies do
    collide with the floor)."""
    if fall_time is None:
        return qpos
    rb, L = robots.get(robot), C.layout(robot)
    if not rb.terrain_boxes or not terrain.has_terrain(L) or terrain.export_terrain(theta, L, rb.terrain_boxes) is None:
        return qpos
    k = min(len(qpos) - 1, int(round(fall_time / dt)) + 1)
    out = np.array(qpos, copy=True)
    out[k:] = out[k]
    return out


def trajectory(mj_model: mujoco.MjModel, qpos: np.ndarray, theta, dt: float, stride: int = 2,
               fall_time: float | None | str = "auto", label: str | None = None,
               robot: "str | robots.Robot" = "go1") -> dict:
    """Body poses for every `stride`-th frame of qpos [T, nq] (one row per `dt` seconds).

    fall_time: seconds, None if the robot held, or "auto" to detect it from the root pose.
    robot: whose θ layout, trunk, foot sites and fall thresholds to use (mj_model is that robot's).
    """
    m = mj_model
    q = _fill_nonfinite(qpos)
    if fall_time == "auto":
        fall_time = detect_fall(q, dt, robot)
    bodies = drawn_bodies(m)
    frames = range(0, len(q), stride)
    data = mujoco.MjData(m)
    pos = np.empty((len(frames), len(bodies), 3), np.float32)
    quat = np.empty((len(frames), len(bodies), 4), np.float32)
    for i, t in enumerate(frames):
        data.qpos[:] = q[t]
        mujoco.mj_kinematics(m, data)
        pos[i] = data.xpos[bodies]
        quat[i] = data.xquat[bodies]
    quat /= np.linalg.norm(quat, axis=-1, keepdims=True)
    return {
        "version": VERSION, "label": label, "bodies": [_name(m, mujoco.mjtObj.mjOBJ_BODY, b) for b in bodies],
        "dt": round(dt * stride, 6), "sim_dt": dt, "stride": stride, "n_frames": len(frames),
        "duration": round((len(frames) - 1) * dt * stride, 6),
        "fall_time": None if fall_time is None else round(float(fall_time), 4),
        "pos": pack(np.round(pos, 4), "float32"), "quat": pack(np.round(quat, 5), "float32"),
        "overlays": overlay_spec(m, theta, q[0], robot),
    }


# --- Go1 without JAX, and a synthetic rollout for developing the viewer --------------------------

def go1_model(xml: str = "scene_mjx_feetonly_flat_terrain.xml") -> mujoco.MjModel:
    """Playground's Go1 scene (the one Go1JoystickFlatTerrain uses), loaded without importing
    mujoco_playground (whose import pulls in JAX). Same asset lookup as go1/base.get_assets."""
    spec = importlib.util.find_spec("mujoco_playground")
    if spec is None:
        raise ImportError("mujoco_playground is not installed")
    root = Path(spec.submodule_search_locations[0])
    go1 = root / "_src" / "locomotion" / "go1" / "xmls"
    menagerie = root / "external_deps" / "mujoco_menagerie" / "unitree_go1"
    assets = {}
    for d, pat in ((go1, "*.xml"), (go1 / "assets", "*"), (menagerie, "*.xml"), (menagerie / "assets", "*")):
        assets.update({p.name: p.read_bytes() for p in d.glob(pat) if p.is_file()})
    return mujoco.MjModel.from_xml_string((go1 / xml).read_text(), assets)


def _quat(yaw=0.0, pitch=0.0, roll=0.0):
    """wxyz quaternion for R = Rz(yaw) Ry(pitch) Rx(roll)."""
    cy, sy, cp, sp, cr, sr = (f(a / 2) for a in (yaw, pitch, roll) for f in (np.cos, np.sin))
    return np.array([cr * cp * cy + sr * sp * sy, sr * cp * cy - cr * sp * sy,
                     cr * sp * cy + sr * cp * sy, cr * cp * sy - sr * sp * cy])


def synthetic_qpos(m: mujoco.MjModel, seconds=4.0, dt=0.02, fall_at: float | None = 2.0, yaw0=0.3,
                   speed=0.8) -> np.ndarray:
    """A plausible-looking trot from the home pose; if fall_at is set, a shove from the left at
    that time tips the robot onto its right side. Kinematic only (feet can slide or clip)."""
    home = m.key_qpos[mujoco.mj_name2id(m, mujoco.mjtObj.mjOBJ_KEY, "home")].copy()
    T = int(round(seconds / dt))
    R = _rot_z(yaw0)
    q = np.tile(home, (T, 1))
    xy, roll, lateral, z_drop = np.zeros(2), 0.0, 0.0, 0.0
    for t in range(T):
        time = t * dt
        falling = fall_at is not None and time >= fall_at
        tau = time - fall_at if falling else 0.0
        v = speed * (max(0.0, 1 - tau / 0.5) if falling else min(1.0, time / 0.4))
        xy = xy + R[:2, :2] @ np.array([v * dt, 0.0])
        if falling:
            roll = -min(1.45, 4.0 * tau ** 2)  # rolls onto its right side, accelerating like a topple
            lateral = -min(0.18, 0.35 * tau)
            z_drop = min(0.17, 0.5 * tau ** 2 + 0.1 * tau)
        off = R[:2, :2] @ np.array([0.0, lateral])
        phase = 2 * np.pi * 2.2 * time
        q[t, 0:2] = xy + off
        q[t, 2] = home[2] + 0.008 * np.sin(2 * phase) - z_drop
        q[t, 3:7] = _quat(yaw0 + 0.03 * np.sin(phase), 0.02 * np.sin(2 * phase), roll)
        for leg in range(4):
            ph = phase + (np.pi if leg in (1, 2) else 0.0)  # trot: FR+RL, FL+RR
            amp = 0.0 if falling else min(1.0, time / 0.4)
            swing = max(0.0, np.sin(ph))
            j = 7 + 3 * leg
            q[t, j + 1] = home[j + 1] + amp * 0.3 * np.cos(ph)
            q[t, j + 2] = home[j + 2] - amp * 0.45 * swing
            if falling:  # legs go limp and splay
                k = min(1.0, tau / 0.6)
                q[t, j] = home[j] + k * (0.35 if leg in (1, 3) else -0.35)
                q[t, j + 2] = home[j + 2] + k * 0.6
    return q


def sample_theta() -> np.ndarray:
    """Every overlay at once: icy patch, slippery front feet, backpack, shove, weak knee, slope."""
    th = C.neutral()
    th[C.INDEX["foot_friction"]] = [0.2, 0.2, 1.0, 1.0]
    th[C.INDEX["ice_mu"]], th[C.INDEX["ice_start"]], th[C.INDEX["ice_length"]] = 0.08, 0.6, 1.4
    th[C.INDEX["payload_mass"]], th[C.INDEX["payload_offset"]] = 3.0, [-0.05, 0.02, 0.0]
    th[C.INDEX["push1_force"]], th[C.INDEX["push1_start"]], th[C.INDEX["push1_duration"]] = [0, -120, 0], 1.9, 0.2
    th[C.INDEX["motor_strength"]][C.JOINTS.index("RL_calf")] = 0.45
    th[C.INDEX["slope"]] = [0.08, 0.0]
    return th


def write_sample(out_dir: str | Path = "web/dist/assets") -> list[Path]:
    m = go1_model()
    th, dt = sample_theta(), 0.02
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    docs = {"go1_scene.json": scene_assets(m),
            "sample_traj.json": trajectory(m, synthetic_qpos(m, fall_at=2.0), th, dt, label="Original"),
            "sample_traj_held.json": trajectory(m, synthetic_qpos(m, fall_at=None), th, dt, label="Nemesis-trained")}
    paths = []
    for name, doc in docs.items():
        p = out / name
        p.write_text(json.dumps(doc, separators=(",", ":")), encoding="utf-8")
        paths.append(p)
    return paths


def write_scene(robot: str, out: str | Path, mesh_cell: float = 0.003) -> Path:
    """The robot's scene asset, from the model load_env builds (the one the evaluator renders)."""
    from nemesis.envs.base import load_env
    m = load_env(robot=robot)[0].unwrapped._mj_model
    p = Path(out)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(scene_assets(m, mesh_cell, robot=robot), separators=(",", ":")), encoding="utf-8")
    return p


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="Export replay assets / a synthetic sample trajectory.")
    ap.add_argument("--sample", nargs="?", const="web/dist/assets", metavar="DIR",
                    help="write go1_scene.json + sample trajectories to DIR (default web/dist/assets)")
    ap.add_argument("--scene", metavar="ROBOT", help="write ROBOT's scene asset to --out")
    ap.add_argument("--out", help="output path for --scene")
    ap.add_argument("--mesh-cell", type=float, default=0.003, help="mesh decimation cell (m) for --scene")
    args = ap.parse_args()
    if args.sample is None and args.scene is None:
        ap.error("nothing to do (try --sample or --scene g1 --out PATH)")
    paths = write_sample(args.sample) if args.sample is not None else []
    if args.scene is not None:
        paths.append(write_scene(args.scene, args.out or f"web/dist/assets/{args.scene}_scene.json", args.mesh_cell))
    for p in paths:
        print(f"{p}  {p.stat().st_size / 1024:.1f} KB")
