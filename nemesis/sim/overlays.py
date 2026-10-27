"""Make perturbations visible in rendered clips (they are invisible physics otherwise).

  ice patches    translucent blue slabs on the floor along the start heading (both patches)
  slippery feet  blue marker under each foot whose friction is below 0.5
  payload        crimson box on the trunk at the payload offset, sized by mass
  push           crimson arrow into the trunk while a push is active, length ~ force
  weak motors    leg segments tinted crimson in proportion to the strength lost
  stairs/curb    concrete-grey steps where θ puts them, an ember strip along each riser's top edge
                 (a flight that comes back down: the landing, then the steps down)
  ramp           the tilted concrete ramp box (as the physics has it) and its flat top landing, with
                 an ember strip where the ramp leaves the floor

Clips use the site's dark look (dark floor and sky, light-grey robot) so they match the 3D replay.

usage:
    model, scene_fn = overlays(mj_model, theta, qpos, dt, robot="go1")
    frames = render_qpos(model, qpos, scene_fn=scene_fn)
"""

import copy

import mujoco
import numpy as np

from nemesis import robots
from nemesis.perturb import canonical as C
from nemesis.perturb import terrain

ICE = np.array([0.55, 0.82, 1.0, 0.45], np.float32)
CRIMSON = np.array([0.88, 0.11, 0.28, 0.95], np.float32)
CONCRETE = np.array([0.22, 0.23, 0.25, 1.0], np.float32)  # the replay's step grey
EMBER = np.array([0.96, 0.36, 0.12, 1.0], np.float32)
NOSING = 0.012  # half-thickness of the ember strip along each riser's top edge
TRUNK = robots.GO1_SPEC.trunk
FEET_SITES = robots.GO1.foot_sites


BG = np.array([11, 13, 18], np.float32)          # the replay's background, #0b0d12
FLOOR = np.array([15, 18, 24], np.float32)       # the replay's floor, #0f1218
GRID = np.array([44, 50, 62], np.float32)        # its grid lines
ROBOT = np.array([0.71, 0.73, 0.78, 1.0], np.float32)  # #b4bbc8


def dark_look(model):
    """Recolour a model copy to the site's dark scene: the skybox becomes the background colour, the
    floor's checker becomes a dark floor with faint lines, and the robot's visual geoms turn light grey."""
    for t in range(model.ntex):
        a, w, h, c = model.tex_adr[t], model.tex_width[t], model.tex_height[t], model.tex_nchannel[t]
        if c < 3:
            continue
        px = model.tex_data[a:a + w * h * c].reshape(-1, c).astype(np.float32)
        if model.tex_type[t] == mujoco.mjtTexture.mjTEXTURE_SKYBOX:
            px[:, :3] = BG
        else:  # light tiles -> dark floor, dark lines -> faint grid
            lum = px[:, :3].mean(1, keepdims=True) / 255.0
            px[:, :3] = FLOOR + (1.0 - lum) * (GRID - FLOOR)
        model.tex_data[a:a + w * h * c] = px.clip(0, 255).astype(np.uint8).reshape(-1)
    model.mat_reflectance[:] = 0.0
    model.vis.rgba.haze[:] = [*(BG / 255.0), 1.0]  # no bright band at the horizon
    for g in range(model.ngeom):
        if model.geom_bodyid[g] != 0 and model.geom_contype[g] == 0 and model.geom_conaffinity[g] == 0:
            model.geom_rgba[g] = ROBOT  # visual-only robot meshes (collision geoms are invisible anyway)
            model.geom_matid[g] = -1


def _slot(theta, name, L=C.GO1):
    return np.asarray(theta)[L.INDEX[name]]


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


def overlays(mj_model, theta, qpos: np.ndarray, dt: float, robot: "str | robots.Robot" = "go1"):
    """Returns (model with weak-motor tints, scene_fn(scene, data, t))."""
    spec = robots.resolve(robot, mj_model)
    L = C.layout(robot)
    _s = lambda name: _slot(theta, name, L)  # noqa: E731
    theta = np.asarray(theta, np.float32)
    model = copy.deepcopy(mj_model)
    dark_look(model)
    trunk = spec.trunk

    # Weak motors: tint the visual geoms of the body each weakened joint moves.
    strength = _s("motor_strength")
    for j, body in enumerate(spec.joint_bodies):
        loss = 1.0 - float(strength[j])
        if loss < 0.05:
            continue
        for g in np.flatnonzero(model.geom_bodyid == body):
            base = model.geom_rgba[g].copy()
            model.geom_rgba[g, :3] = (1 - min(1.0, loss * 1.4)) * base[:3] + min(1.0, loss * 1.4) * CRIMSON[:3]

    q0 = qpos[0]
    origin, yaw0 = q0[:2], 2 * np.arctan2(q0[6], q0[3])
    heading = np.array([np.cos(yaw0), np.sin(yaw0)])
    R0 = _rot_z(yaw0)
    patches = [(mu, start, length) for mu, start, length in terrain.ice_patches(theta, L)
               if length > 0.01 and mu < 0.6]
    mu = _s("foot_friction")
    mass = float(_s("payload_mass")[0])
    offset = _s("payload_offset")
    foot_sites = spec.foot_sites
    push_max = L.SLOT["push1_force"].hi

    def push_at(t):
        f = np.zeros(3)
        for k in ("push1", "push2"):
            t0, dur = float(_s(f"{k}_start")[0]), float(_s(f"{k}_duration")[0])
            if t0 <= t < t0 + dur:
                f += _s(f"{k}_force")
        return R0 @ f  # start-heading frame -> world, as in apply.push_force

    # Stairs: drawn from θ as non-overlapping blocks (the physics boxes are hidden mocap boxes
    # that overlap below each step's top), with an ember strip along each riser's top edge.
    steps = []
    half_w = terrain.STEP_WIDTH / 2
    if terrain.has_terrain(L):
        cols = terrain.columns(theta, L, robots.get(robot).terrain_boxes)
        for k, (x0, x1, h) in enumerate(cols):
            mid = origin + heading * (x0 + x1) / 2
            steps.append(([(x1 - x0) / 2, half_w, h / 2], [mid[0], mid[1], h / 2], R0, CONCRETE))
            if k == 0 or h > cols[k - 1][2]:  # a riser up: ember strip along its top edge
                nose = origin + heading * (x0 + NOSING - 0.001)
            else:  # a riser down: the strip runs along the edge of the step above it
                nose = origin + heading * (x0 - NOSING + 0.001)
                h = cols[k - 1][2]
            steps.append(([NOSING, half_w + 0.001, 0.004], [nose[0], nose[1], h - 0.003], R0, EMBER))
        if terrain.descends(np.asarray(theta, np.float64), L) and cols:  # the last riser down
            x0, h = cols[-1][1], cols[-1][2]
            nose = origin + heading * (x0 - NOSING + 0.001)
            steps.append(([NOSING, half_w + 0.001, 0.004], [nose[0], nose[1], h - 0.003], R0, EMBER))
    if terrain.has_course(L):
        for x0, x1, h0, h1 in terrain.ramps(theta, L, robots.get(robot).terrain_boxes):
            if h1 > h0:  # the ramp: the physics box itself (its lower part is under the floor)
                a = np.arctan2(h1 - h0, x1 - x0)
                hx, _, hz = terrain.BOX
                cx, cz = x1 - hx * np.cos(a) + hz * np.sin(a), h1 - hx * np.sin(a) - hz * np.cos(a)
                c = origin + heading * cx
                Ry = np.array([[np.cos(a), 0, -np.sin(a)], [0, 1, 0], [np.sin(a), 0, np.cos(a)]])
                steps.append((list(terrain.BOX), [c[0], c[1], cz], R0 @ Ry, CONCRETE))
                foot = origin + heading * (x0 + NOSING)
                steps.append(([NOSING, half_w + 0.001, 0.004], [foot[0], foot[1], 0.004], R0, EMBER))
            else:  # its landing, a block from the floor
                mid = origin + heading * (x0 + x1) / 2
                steps.append(([(x1 - x0) / 2, half_w, h1 / 2], [mid[0], mid[1], h1 / 2], R0, CONCRETE))

    def scene_fn(scene, data, t):
        time = t * dt
        for size, pos, mat, rgba in steps:
            _add(scene, mujoco.mjtGeom.mjGEOM_BOX, size, pos, mat, rgba)
        for _, ice_start, ice_len in patches:
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
            R = data.xmat[trunk].reshape(3, 3)
            pos = data.xpos[trunk] + R @ (offset + np.array([0, 0, 0.06 + side]))
            _add(scene, mujoco.mjtGeom.mjGEOM_BOX, [side * 1.3, side, side], pos, R, CRIMSON)
        f = push_at(time)
        n = np.linalg.norm(f)
        if n > 1.0:
            tip = data.xpos[trunk]
            tail = tip - f / n * (0.15 + 0.35 * n / push_max)
            g = _add(scene, mujoco.mjtGeom.mjGEOM_ARROW, [0.02, 0.02, 0.2], tail, np.eye(3), CRIMSON)
            if g is not None:
                mujoco.mjv_connector(g, mujoco.mjtGeom.mjGEOM_ARROW, 0.012 + 0.02 * n / push_max, tail, tip)

    return model, scene_fn
