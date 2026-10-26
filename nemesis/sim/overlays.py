"""Make perturbations visible in rendered clips (they are invisible physics otherwise).

  ice patch      translucent blue slab on the floor along the start heading
  slippery feet  blue marker under each foot whose friction is below 0.5
  payload        crimson box on the trunk at the payload offset, sized by mass
  push           crimson arrow into the trunk while a push is active, length ~ force
  weak motors    leg segments tinted crimson in proportion to the strength lost

usage:
    model, scene_fn = overlays(mj_model, theta, qpos, dt)
    frames = render_qpos(model, qpos, scene_fn=scene_fn)
"""

import copy

import mujoco
import numpy as np

from nemesis.perturb import canonical as C

ICE = np.array([0.55, 0.82, 1.0, 0.45], np.float32)
CRIMSON = np.array([0.88, 0.11, 0.28, 0.95], np.float32)
TRUNK = 1
FEET_SITES = ("FR", "FL", "RR", "RL")


def _slot(theta, name):
    return np.asarray(theta)[C.INDEX[name]]


def _rot_z(yaw):
    c, s = np.cos(yaw), np.sin(yaw)
    return np.array([[c, -s, 0], [s, c, 0], [0, 0, 1]])


def _add(scene, gtype, size, pos, mat, rgba):
    if scene.ngeom >= scene.maxgeom:
        return None
    g = scene.geoms[scene.ngeom]
    mujoco.mjv_initGeom(g, gtype, np.asarray(size, np.float64), np.asarray(pos, np.float64),
                        np.asarray(mat, np.float64).reshape(-1), np.asarray(rgba, np.float32))
    scene.ngeom += 1
    return g


def overlays(mj_model, theta, qpos: np.ndarray, dt: float):
    """Returns (model with weak-motor tints, scene_fn(scene, data, t))."""
    theta = np.asarray(theta, np.float32)
    model = copy.deepcopy(mj_model)

    # Weak motors: tint the visual geoms of each weakened leg segment.
    strength = _slot(theta, "motor_strength")
    for j, name in enumerate(C.JOINTS):
        loss = 1.0 - float(strength[j])
        if loss < 0.05:
            continue
        leg, part = name.split("_")
        body = mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_BODY, f"{leg}_{part}")
        for g in np.flatnonzero(model.geom_bodyid == body):
            base = model.geom_rgba[g].copy()
            model.geom_rgba[g, :3] = (1 - min(1.0, loss * 1.4)) * base[:3] + min(1.0, loss * 1.4) * CRIMSON[:3]

    q0 = qpos[0]
    origin, yaw0 = q0[:2], 2 * np.arctan2(q0[6], q0[3])
    heading = np.array([np.cos(yaw0), np.sin(yaw0)])
    R0 = _rot_z(yaw0)
    ice_mu, ice_start, ice_len = (float(_slot(theta, k)[0]) for k in ("ice_mu", "ice_start", "ice_length"))
    mu = _slot(theta, "foot_friction")
    mass = float(_slot(theta, "payload_mass")[0])
    offset = _slot(theta, "payload_offset")
    foot_sites = [mujoco.mj_name2id(model, mujoco.mjtObj.mjOBJ_SITE, f) for f in FEET_SITES]

    def push_at(t):
        f = np.zeros(3)
        for k in ("push1", "push2"):
            t0, dur = float(_slot(theta, f"{k}_start")[0]), float(_slot(theta, f"{k}_duration")[0])
            if t0 <= t < t0 + dur:
                f += _slot(theta, f"{k}_force")
        return R0 @ f  # start-heading frame -> world, as in apply.push_force

    def scene_fn(scene, data, t):
        time = t * dt
        if ice_len > 0.01 and ice_mu < 0.6:
            center = origin + heading * (ice_start + ice_len / 2)
            _add(scene, mujoco.mjtGeom.mjGEOM_BOX, [ice_len / 2, 0.9, 0.003],
                 [center[0], center[1], 0.003], R0, ICE)
        for i, s in enumerate(foot_sites):
            if s >= 0 and mu[i] < 0.5:
                p = data.site_xpos[s]
                _add(scene, mujoco.mjtGeom.mjGEOM_CYLINDER, [0.05, 0.002, 0],
                     [p[0], p[1], 0.002], np.eye(3), ICE)
        if mass > 0.2:
            side = 0.06 * (mass / 3.0) ** (1 / 3)
            R = data.xmat[TRUNK].reshape(3, 3)
            pos = data.xpos[TRUNK] + R @ (offset + np.array([0, 0, 0.06 + side]))
            _add(scene, mujoco.mjtGeom.mjGEOM_BOX, [side * 1.3, side, side], pos, R, CRIMSON)
        f = push_at(time)
        n = np.linalg.norm(f)
        if n > 1.0:
            tip = data.xpos[TRUNK]
            tail = tip - f / n * (0.15 + 0.35 * n / 150.0)
            g = _add(scene, mujoco.mjtGeom.mjGEOM_ARROW, [0.02, 0.02, 0.2], tail, np.eye(3), CRIMSON)
            if g is not None:
                mujoco.mjv_connector(g, mujoco.mjtGeom.mjGEOM_ARROW, 0.012 + 0.02 * n / 150.0, tail, tip)

    return model, scene_fn
