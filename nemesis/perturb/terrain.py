"""Terrain geometry (stairs, curbs, descents and ramps) shared by the physics, the mp4 overlays and
the replay export.

Pure array math with no JAX import: every function takes `xp` (numpy by default, jax.numpy inside
the jitted step), so the CPU-only export draws exactly what the simulation collides with.

Geometry lives in the START-HEADING frame (x along the robot's initial heading from its start
position, y to its left, z up). envs.base adds K boxes of one fixed size (BOX half-sizes) on K
mocap bodies; each episode the wrapper moves them (data.mocap_pos/quat) and parks the unused ones
under the floor. Only poses change, never a model field: the jitted physics is the same program as
without terrain (neutral rollouts stay bit-identical), and nothing has to be recompiled.

Every box reaches far below the floor, so the terrain is the union of solids: wherever two
overlap, the higher one is what the feet meet.

Stairs: step i (i < count, rounded) has its riser at start + i*depth and its top at (i+1)*height.
Box i spans BOX_LENGTH m from its riser; later (taller) boxes cover the rest of it, so the union
is the staircase, and the top step continues BOX_LENGTH m from its riser as a landing. A curb is
count = 1.

Descent (stairs_landing > 0): the top of the flight is a landing `stairs_landing` m long (1.5-3,
measured from the last riser up), after which the same steps go back down to the floor. Every step
box is then stood on end (pitched 90 deg about y), which makes it DESCENT_BOX_LENGTH = 1.5 m long
and 2.4 m deep. Each level gets a front box starting at its riser up and a back box ending at its
riser down; higher levels hide the middle of every box, and the landing's two boxes cover 1.5-3 m.
That takes 2*count boxes, so a flight that comes back down has at most K // 2 steps.

Ramp (ramp_angle > 0, degrees): an uphill plane that leaves the floor `ramp_start` m ahead and
rises over `ramp_length` m (horizontal run, at most 2.2 m) to H = ramp_length * tan(angle); then a
flat landing at H, after which it drops back to the floor. It takes the last two boxes: box K-1
pitched by the angle, whose top face's far edge is the ramp's top (the rest of the box is under the
floor or under the landing), and box K-2 as the landing (2.4 m). The stairs then have K - 2 boxes
(at most K - 2 steps up, or (K - 2) // 2 up and down); if they leave box K-3 free too, it extends
the landing to 4.8 m, out of reach of a 5 s episode at 1 m/s (`landing_length`).

No box was added for the course (Go1 keeps 8): two more collidable geoms change MJX's contact
arrays, and with them the float rounding of every rollout where a foot touches a step, so stairs
scenarios from layout v2 would no longer replay bit for bit.

For drawing, `columns` cuts the stairs into non-overlapping blocks and `export_terrain` lists the
steps and ramps (no coincident faces to flicker in a renderer).
"""

import numpy as np

BOX = (1.2, 1.5, 0.75)          # half-sizes of every terrain box: 2.4 m long, 3 m wide, 1.5 m tall
N_RAMP_BOXES = 2                # a ramp takes the last two boxes (landing, ramp)
BOX_LENGTH = 2 * BOX[0]         # top step + landing, from the last riser
DESCENT_BOX_LENGTH = 2 * BOX[2]  # a step box stood on end (flights that come back down)
LANDING_LENGTH = BOX_LENGTH     # the ramp's top landing per box (one or two boxes)
MAX_RAMP_RUN = 2.2              # the top face (2.4 m) must reach below the floor at 15 deg: 2.4 cos 15 = 2.32
STEP_WIDTH = 2 * BOX[1]         # across the walking direction, centred on the start position
PARK_POS = (0.0, 0.0, -10.0)    # unused boxes: far below the floor, never touched
MIN_RISER = 1e-3                # risers below 1 mm are flat ground
MIN_ANGLE = 0.1                 # ramps below 0.1 deg are flat ground
SLOTS = ("stairs_height", "stairs_depth", "stairs_count", "stairs_start")
# Added Oct 28 (layout v3): the course (ramp, descent, second ice patch).
COURSE_SLOTS = ("ramp_angle", "ramp_start", "ramp_length", "stairs_landing",
                "ice2_slip", "ice2_start", "ice2_length")


def has_terrain(layout) -> bool:
    return "stairs_height" in layout.INDEX


def has_course(layout) -> bool:
    return "ramp_angle" in layout.INDEX


def box_sizes(K: int) -> np.ndarray:
    """Half-sizes [K, 3] of the K terrain boxes, in mocap order (all BOX)."""
    return np.tile(np.asarray(BOX, np.float64), (K, 1))


def _val(theta, L, k):
    return theta[L.INDEX[k]][0]


def _clamp(theta, L, k, xp):
    sl = L.INDEX[k]
    return xp.clip(_val(theta, L, k), float(L.LO[sl][0]), float(L.HI[sl][0]))


def descends(theta, L, xp=np):
    """θ's flight comes back down (stairs_landing is on; its neutral 0 means up only)."""
    if "stairs_landing" not in L.INDEX:
        return xp.asarray(False)
    return _val(theta, L, "stairs_landing") > 1e-3


def has_ramp(theta, L, xp=np):
    """θ has a ramp (ramp_angle >= MIN_ANGLE degrees)."""
    if not has_course(L):
        return xp.asarray(False)
    return _val(theta, L, "ramp_angle") >= MIN_ANGLE


def stairs(theta, L, K, xp=np):
    """The stairs' boxes among the K terrain boxes: near edge x0, top height and `used`, each
    [K]. Depth and start are clamped to their envelope (their neutral 0 is an "off" marker).

    Without a descent box i < count sits on riser i and is BOX_LENGTH long. With one (see
    `descends`), every box is DESCENT_BOX_LENGTH long (stood on end), count is capped at half the
    boxes, and boxes count..2*count-1 are the back boxes, ending at the risers down. A ramp takes
    the last N_RAMP_BOXES boxes away from the stairs."""
    h, d, x = _val(theta, L, "stairs_height"), _clamp(theta, L, "stairs_depth", xp), _clamp(theta, L, "stairs_start", xp)
    i = xp.arange(K)
    if not has_course(L):
        n = xp.clip(xp.floor(_val(theta, L, "stairs_count") + 0.5), 0, K)
        return x + i * d, (i + 1) * h, (i < n) & (h >= MIN_RISER)
    avail = xp.where(has_ramp(theta, L, xp), K - N_RAMP_BOXES, K)
    n = xp.clip(xp.floor(_val(theta, L, "stairs_count") + 0.5), 0, avail)
    used = (i < n) & (h >= MIN_RISER)
    x0, top = x + i * d, (i + 1) * h
    down = descends(theta, L, xp)
    land = _clamp(theta, L, "stairs_landing", xp)
    nd = xp.minimum(n, avail // 2)
    j = 2 * nd - 1 - i  # level of back box i (i >= nd): j = nd-1 is the landing's back box
    back = i >= nd
    y = x + (nd - 1) * d + land + (nd - 1 - j) * d  # riser down of level j
    x0_d = xp.where(back, y - DESCENT_BOX_LENGTH, x0)
    top_d = xp.where(back, (j + 1) * h, top)
    used_d = (i < 2 * nd) & (h >= MIN_RISER)
    return xp.where(down, x0_d, x0), xp.where(down, top_d, top), xp.where(down, used_d, used)


def segments(theta, L, K, xp=np):
    """The stairs' boxes for θ (K terrain boxes): near edge x0, top, used, each [K]."""
    return stairs(theta, L, K, xp)


def ramp(theta, L, xp=np):
    """The ramp: (x_start, x_top, top height H, angle in rad, used). The plane leaves the floor
    at x_start and reaches H at x_top = x_start + run."""
    a = xp.deg2rad(_clamp(theta, L, "ramp_angle", xp))
    x = _clamp(theta, L, "ramp_start", xp)
    run = _clamp(theta, L, "ramp_length", xp)
    return x, x + run, run * xp.tan(a), a, has_ramp(theta, L, xp)


def local_boxes(theta, L, K, xp=np):
    """Box centers [K, 3] and pitch about y [K] in the start-heading frame, and `used` [K]
    (half-sizes BOX). A positive pitch tilts the box's +x axis up (the ramp; pi/2 stands a step
    box on end)."""
    x0, top, used = stairs(theta, L, K, xp)
    if not has_course(L):
        center = xp.stack([x0 + BOX[0], xp.zeros(K), top - BOX[2]], axis=-1)
        return center, xp.zeros(K), used
    land2 = has_ramp(theta, L, xp) & ~used[K - 3]  # the stairs leave box K-3 free: a longer landing
    down = descends(theta, L, xp)
    center = xp.stack([x0 + xp.where(down, BOX[2], BOX[0]), xp.zeros(K),
                       top - xp.where(down, BOX[0], BOX[2])], axis=-1)
    pitch = xp.where(down, np.pi / 2, 0.0) * xp.ones(K)
    # The ramp (box K-1) and its landing (box K-2).
    xs, x1, H, a, on = ramp(theta, L, xp)
    c, s = xp.cos(a), xp.sin(a)
    hx, _, hz = BOX
    ramp_c = xp.stack([x1 - hx * c + hz * s, 0.0 * a, H - hx * s - hz * c])
    land_c = xp.stack([x1 + BOX[0], 0.0 * a, H - BOX[2]])
    land2_c = xp.stack([x1 + BOX_LENGTH + BOX[0], 0.0 * a, H - BOX[2]])
    i = xp.arange(K)[:, None]
    is_ramp, is_land, is_land2 = on & (i == K - 1), on & (i == K - 2), land2 & (i == K - 3)
    center = xp.where(is_ramp, ramp_c, xp.where(is_land, land_c, xp.where(is_land2, land2_c, center)))
    pitch = xp.where(is_ramp[:, 0], a, xp.where(is_land[:, 0] | is_land2[:, 0], 0.0, pitch))
    used = used | is_ramp[:, 0] | is_land[:, 0] | is_land2[:, 0]
    return center, pitch, used


def landing_length(theta, L, K) -> float:
    """Length of the ramp's top landing (numpy): two boxes if the stairs leave box K-3 free."""
    th = np.asarray(theta, np.float64)
    return 2 * LANDING_LENGTH if not stairs(th, L, K)[2][K - 3] else LANDING_LENGTH


def mocap_poses(theta, origin, yaw, L, K, xp=np):
    """World mocap_pos [K, 3] and mocap_quat [K, 4] of the K terrain boxes for θ, the start
    position `origin` (x, y) and heading `yaw`. Unused boxes are parked."""
    center, pitch, used = local_boxes(theta, L, K, xp)
    c, s = xp.cos(yaw), xp.sin(yaw)
    pos = xp.stack([origin[0] + c * center[:, 0] - s * center[:, 1],
                    origin[1] + s * center[:, 0] + c * center[:, 1], center[:, 2]], axis=-1)
    q = xp.broadcast_to(xp.stack([xp.cos(yaw / 2), 0.0 * yaw, 0.0 * yaw, xp.sin(yaw / 2)]), (K, 4))
    if has_course(L):
        # Yaw about z, then a rotation about y by -pitch (tilts +x upward): the ramp and its
        # landing, and the boxes of a flight that comes back down. Otherwise the pure-yaw
        # quaternion above, value for value as before the course existed.
        cy, sy = xp.cos(yaw / 2), xp.sin(yaw / 2)
        cp, sp = xp.cos(-pitch / 2), xp.sin(-pitch / 2)
        qp = xp.stack([cy * cp, -sy * sp, cy * sp, sy * cp], axis=-1)
        tilted = descends(theta, L, xp) | (has_ramp(theta, L, xp) & (xp.arange(K) >= K - N_RAMP_BOXES - 1))
        q = xp.where(tilted[:, None], qp, q)
    u = used[:, None]
    return (xp.where(u, pos, xp.asarray(PARK_POS)),
            xp.where(u, q, xp.asarray([1.0, 0.0, 0.0, 0.0])))


def touches(points, radius, theta, origin, yaw, L, K, xp=np):
    """Whether any sphere (world center `points` [P, 3], `radius` [P]) penetrates the terrain:
    the exact signed distance from its center to a used box (tilted ones included) is below its
    radius.

    The physics only lets the feet touch the terrain boxes (body-box collision functions would
    cost ~4x the whole step in MJX); the fall check uses this instead, on points sampled over the
    body's collision geoms (wrapper.body_samples)."""
    center, pitch, used = local_boxes(theta, L, K, xp)
    c, s = xp.cos(yaw), xp.sin(yaw)
    rx, ry = points[:, 0] - origin[0], points[:, 1] - origin[1]
    local = xp.stack([c * rx + s * ry, -s * rx + c * ry, points[:, 2]], axis=-1)  # [P, 3]
    rel = local[:, None, :] - center[None]  # [P, K, 3]
    if has_course(L):
        # Into each box's frame: its x axis is (cos p, 0, sin p), its z axis (-sin p, 0, cos p).
        cp, sp = xp.cos(pitch), xp.sin(pitch)
        rel = xp.stack([rel[..., 0] * cp + rel[..., 2] * sp, rel[..., 1],
                        -rel[..., 0] * sp + rel[..., 2] * cp], axis=-1)
    q = xp.abs(rel) - xp.asarray(BOX)
    outside = xp.sqrt(xp.sum(xp.maximum(q, 0.0) ** 2, axis=-1))
    sd = outside + xp.minimum(xp.max(q, axis=-1), 0.0)
    return xp.any(used[None] & (sd < radius[:, None]))


def columns(theta, L, K) -> list[tuple[float, float, float]]:
    """The stairs as non-overlapping blocks (x0, x1, top) in the start-heading frame, from the
    floor up: each step runs to the next riser; the last one BOX_LENGTH m from its riser, or, for
    a flight that comes back down, the landing and then the steps down (decreasing tops). K is the
    total number of terrain boxes."""
    th = np.asarray(theta, np.float64)
    x0, top, used = stairs(th, L, K)
    if not used.any():
        return []
    h = float(_val(th, L, "stairs_height"))
    if not descends(th, L):
        x0, top = x0[used], top[used]
        x1 = np.append(x0[1:], x0[-1] + BOX_LENGTH)
        return [(float(a), float(b), float(t)) for a, b, t in zip(x0, x1, top)]
    n = int(used.sum()) // 2
    d = float(_clamp(th, L, "stairs_depth", np))
    up = [float(v) for v in x0[:n]]
    y_top = up[-1] + float(_clamp(th, L, "stairs_landing", np))  # first riser down
    downs = [y_top + k * d for k in range(n)]
    out = [(up[i], up[i + 1], (i + 1) * h) for i in range(n - 1)]
    out.append((up[-1], y_top, n * h))
    out += [(downs[k], downs[k + 1], (n - 1 - k) * h) for k in range(n - 1)]  # the last riser down
    return [(float(a), float(b), float(t)) for a, b, t in out]


def ramps(theta, L, K) -> list[tuple[float, float, float, float]]:
    """The ramp and its landing as (x0, x1, h0, h1): a solid from the floor up to a top surface
    rising linearly from h0 at x0 to h1 at x1 (the landing has h0 == h1). Empty without a ramp."""
    if not has_course(L):
        return []
    xs, x1, H, _, used = (np.asarray(v, np.float64) for v in ramp(np.asarray(theta, np.float64), L))
    if not used:
        return []
    xs, x1, H = float(xs), float(x1), float(H)
    return [(xs, x1, 0.0, H), (x1, x1 + landing_length(theta, L, K), H, H)]


def export_terrain(theta, L, K) -> dict | None:
    """Terrain for the replay, start-heading frame (x along the heading from the start position,
    heights above the floor), or None on flat ground:

        {"steps": [{"x0", "x1", "height"}], "ramps": [{"x0", "x1", "h0", "h1"}], "width": 3.0}

    steps are solid blocks from the floor up to `height` (a flight that comes back down lists its
    steps down with decreasing heights); ramps are solids from the floor up to a top surface
    rising linearly from h0 at x0 to h1 at x1 (the ramp, then its flat landing with h0 == h1)."""
    steps = [{"x0": round(a, 4), "x1": round(b, 4), "height": round(h, 4)} for a, b, h in columns(theta, L, K)]
    rs = [{"x0": round(a, 4), "x1": round(b, 4), "h0": round(h0, 4), "h1": round(h1, 4)}
          for a, b, h0, h1 in ramps(theta, L, K)]
    if not steps and not rs:
        return None
    out = {"steps": steps, "width": STEP_WIDTH}
    if has_course(L):
        out["ramps"] = rs
    return out


def export_steps(theta, L, K) -> dict | None:
    """Back-compatible name of export_terrain."""
    return export_terrain(theta, L, K)


def ice_patches(theta, L) -> list[tuple[float, float, float]]:
    """Every low-friction patch on the ground as (mu, start, length) along the start heading:
    the ice patch (ice_*) and, with the course slots, the second one (μ = 1 - ice2_slip). Patches
    with no length are left out (friction above the foot cap has no effect but is listed)."""
    th = np.asarray(theta, np.float64)
    out = []
    mu, start, length = (float(_val(th, L, k)) for k in ("ice_mu", "ice_start", "ice_length"))
    if length > 0:
        out.append((mu, start, length))
    if has_course(L):
        slip, start, length = (float(_val(th, L, k)) for k in ("ice2_slip", "ice2_start", "ice2_length"))
        if length > 0 and slip > 0:
            out.append((1.0 - slip, start, length))
    return out
