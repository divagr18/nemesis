"""Terrain geometry (stairs and curbs) shared by the physics, the mp4 overlays and the replay export.

Pure array math with no JAX import: every function takes `xp` (numpy by default, jax.numpy inside
the jitted step), so the CPU-only export draws exactly what the simulation collides with.

Geometry lives in the START-HEADING frame (x along the robot's initial heading from its start
position, y to its left, z up). envs.base adds K boxes of one fixed size (BOX half-sizes) on K
mocap bodies; each episode the wrapper moves them (data.mocap_pos/quat) so box i's top front edge
sits on riser i, and parks the unused ones under the floor. Only positions change, never a model
field: the jitted physics is the same program as without terrain (neutral rollouts stay
bit-identical), and nothing has to be recompiled. New features (a ramp, a descending flight) add
segments in `segments` and, if needed, boxes (robots.Robot.terrain_boxes).

Stairs: step i (i < count, rounded) has its riser at start + i*depth and its top at (i+1)*height.
Box i spans BOX_LENGTH m from its riser and reaches far below the floor; later (taller) boxes
cover the rest of it, so the union is the staircase, and the top step continues BOX_LENGTH m from
its riser as a landing. A curb is count = 1. For drawing, `columns` cuts the union into
non-overlapping blocks (no coincident faces to flicker in a renderer).
"""

import numpy as np

BOX = (1.2, 1.5, 0.75)        # half-sizes of every step box: 2.4 m long, 3 m wide, 1.5 m tall
BOX_LENGTH = 2 * BOX[0]       # top step + landing, from the last riser
STEP_WIDTH = 2 * BOX[1]       # across the walking direction, centred on the start position
PARK_POS = (0.0, 0.0, -10.0)  # unused boxes: far below the floor, never touched
MIN_RISER = 1e-3              # risers below 1 mm are flat ground
SLOTS = ("stairs_height", "stairs_depth", "stairs_count", "stairs_start")


def has_terrain(layout) -> bool:
    return "stairs_height" in layout.INDEX


def stairs(theta, L, K, xp=np):
    """The steps θ describes: riser position x0, top height and `used`, each [K]. Depth and start
    are clamped to their envelope (their neutral 0 is an "off" marker, not a value)."""
    def val(k):
        return theta[L.INDEX[k]][0]

    def clamp(k):
        sl = L.INDEX[k]
        return xp.clip(val(k), float(L.LO[sl][0]), float(L.HI[sl][0]))

    h, d, x = val("stairs_height"), clamp("stairs_depth"), clamp("stairs_start")
    n = xp.clip(xp.floor(val("stairs_count") + 0.5), 0, K)
    i = xp.arange(K)
    used = (i < n) & (h >= MIN_RISER)
    return x + i * d, (i + 1) * h, used


def segments(theta, L, K, xp=np):
    """All terrain boxes for θ (only stairs so far): riser x0, top, used, each [K]."""
    return stairs(theta, L, K, xp)


def local_boxes(theta, L, K, xp=np):
    """Box centers [K, 3] in the start-heading frame and `used` [K] (half-sizes are BOX)."""
    x0, top, used = segments(theta, L, K, xp)
    center = xp.stack([x0 + BOX[0], xp.zeros(K), top - BOX[2]], axis=-1)
    return center, used


def mocap_poses(theta, origin, yaw, L, K, xp=np):
    """World mocap_pos [K, 3] and mocap_quat [K, 4] of the K step boxes for θ, the start position
    `origin` (x, y) and heading `yaw`. Unused boxes are parked."""
    center, used = local_boxes(theta, L, K, xp)
    c, s = xp.cos(yaw), xp.sin(yaw)
    pos = xp.stack([origin[0] + c * center[:, 0] - s * center[:, 1],
                    origin[1] + s * center[:, 0] + c * center[:, 1], center[:, 2]], axis=-1)
    q = xp.stack([xp.cos(yaw / 2), 0.0 * yaw, 0.0 * yaw, xp.sin(yaw / 2)])
    u = used[:, None]
    return (xp.where(u, pos, xp.asarray(PARK_POS)),
            xp.where(u, xp.broadcast_to(q, (K, 4)), xp.asarray([1.0, 0.0, 0.0, 0.0])))


def touches(points, radius, theta, origin, yaw, L, K, xp=np):
    """Whether any sphere (world center `points` [P, 3], `radius` [P]) penetrates the terrain:
    the exact signed distance from its center to a used box is below its radius.

    The physics only lets the feet touch the steps (body-box collision functions would cost ~4x
    the whole step in MJX); the fall check uses this instead, on points sampled over the body's
    collision geoms (wrapper.body_samples)."""
    center, used = local_boxes(theta, L, K, xp)
    c, s = xp.cos(yaw), xp.sin(yaw)
    rx, ry = points[:, 0] - origin[0], points[:, 1] - origin[1]
    local = xp.stack([c * rx + s * ry, -s * rx + c * ry, points[:, 2]], axis=-1)  # [P, 3]
    q = xp.abs(local[:, None, :] - center[None]) - xp.asarray(BOX)  # [P, K, 3]
    outside = xp.sqrt(xp.sum(xp.maximum(q, 0.0) ** 2, axis=-1))
    sd = outside + xp.minimum(xp.max(q, axis=-1), 0.0)
    return xp.any(used[None] & (sd < radius[:, None]))


def columns(theta, L, K) -> list[tuple[float, float, float]]:
    """The staircase as non-overlapping blocks (x0, x1, top) in the start-heading frame, from the
    floor up: each step runs to the next riser, the last one BOX_LENGTH m from its riser."""
    x0, top, used = segments(np.asarray(theta, np.float64), L, K)
    x0, top = x0[used], top[used]
    x1 = np.append(x0[1:], x0[-1] + BOX_LENGTH) if len(x0) else x0
    return [(float(a), float(b), float(h)) for a, b, h in zip(x0, x1, top)]


def export_steps(theta, L, K) -> dict | None:
    """Steps for the replay: {"steps": [{"x0", "x1", "height"}], "width"} in the start-heading frame
    (x0/x1 along the heading from the start position, height above the floor), or None."""
    steps = [{"x0": round(a, 4), "x1": round(b, 4), "height": round(h, 4)} for a, b, h in columns(theta, L, K)]
    return {"steps": steps, "width": STEP_WIDTH} if steps else None
