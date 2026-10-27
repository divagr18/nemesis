"""Apply θ to an MJX model (static physics), to each control step, and to observations.

All functions are pure and traceable, so they run per-env inside vmap. Robot-specific ids come
from a robots.Spec (default: Go1), and θ is read with that robot's layout.
"""

import jax
import jax.numpy as jp
from mujoco.mjx._src import math as mjx_math

from nemesis import robots
from nemesis.perturb import canonical as C
from nemesis.perturb import terrain

GO1 = robots.GO1_SPEC
TRUNK = GO1.trunk  # Go1 trunk body id (Playground's TORSO_BODY_ID)
FLOOR = GO1.floor  # floor geom id
FEET_GEOMS = jp.array(GO1.foot_geoms)  # FR FL RR RL foot spheres


def slot(theta, name, spec=GO1):
    return theta[C.layout(spec.robot).INDEX[name]]


# --- Base domain randomization (Playground-equivalent, resampled per episode) ---------------

def sample_base_dr(rng, model, spec=GO1):
    """Playground's domain randomization for the robot. Floor/foot friction is skipped: θ sets it
    (and for Go1 it is a no-op anyway, because contact friction is the max of the two geoms)."""
    k = jax.random.split(rng, 5)
    n = model.nv - 6
    lo, hi = spec.robot.dr_frictionloss
    # The terrain bodies (after the robot's) are not randomized; drawing only the robot's bodies
    # keeps the random stream identical to the model without them.
    nb = model.nbody - len(spec.terrain_geoms)
    mass_scale = jax.random.uniform(k[3], (nb,), minval=0.9, maxval=1.1)
    return {
        "frictionloss": jax.random.uniform(k[0], (n,), minval=lo, maxval=hi),
        "armature": jax.random.uniform(k[1], (n,), minval=1.0, maxval=1.05),
        "com": jax.random.uniform(k[2], (3,), minval=-0.05, maxval=0.05),
        "mass_scale": jp.concatenate([mass_scale, jp.ones(model.nbody - nb)]),
        "trunk_mass": jax.random.uniform(k[4], (), minval=-1.0, maxval=1.0),
    }


def neutral_base_dr(model):
    n = model.nv - 6
    return {"frictionloss": jp.ones(n), "armature": jp.ones(n), "com": jp.zeros(3),
            "mass_scale": jp.ones(model.nbody), "trunk_mass": jp.zeros(())}


def apply_base_dr(model, dr, spec=GO1):
    mass = (model.body_mass * dr["mass_scale"]).at[spec.trunk].add(dr["trunk_mass"])
    return model.replace(
        dof_frictionloss=model.dof_frictionloss.at[6:].multiply(dr["frictionloss"]),
        dof_armature=model.dof_armature.at[6:].multiply(dr["armature"]),
        body_ipos=model.body_ipos.at[spec.trunk].add(dr["com"]),
        body_mass=mass,
    )


# --- Static physics ---------------------------------------------------------------------------

def apply_model(model, theta, yaw=0.0, spec=GO1):
    """Returns `model` with the static perturbations in θ applied.

    `yaw` is the robot's heading at the start of the episode: slopes (and pushes, see
    push_force) are defined relative to it, so "uphill" is uphill whatever the random start yaw.
    """
    T = spec.trunk
    mu = slot(theta, "foot_friction", spec)
    fric, pair_fric = model.geom_friction, model.pair_friction
    if spec.foot_pairs:
        # Explicit foot-floor contact pairs (G1): their friction is the contact friction.
        pair_fric = pair_fric.at[jp.array(spec.foot_pairs), 0:2].set(mu[:, None])
    else:
        # Per-foot geoms (Go1): envs.base gives the feet contact priority over the floor, so each
        # foot-floor contact uses that foot's friction. It is capped at the floor's friction (0.6,
        # the nominal contact the policies were trained on; θ's neutral 1.0 means "nominal").
        # The floor is lowered to the smallest foot value as before, which only matters for
        # body-floor contacts (after a fall) and keeps uniform all-feet attacks bit-identical.
        cap = fric[spec.floor, 0]
        fric = fric.at[jp.array(spec.foot_geoms), 0].set(jp.minimum(mu, cap))
        fric = fric.at[spec.floor, 0].set(jp.minimum(cap, mu.min()))

    # Payload: point mass m at offset r (trunk frame) from the trunk CoM.
    m = slot(theta, "payload_mass", spec)[0]
    r = slot(theta, "payload_offset", spec)
    M = model.body_mass[T]
    ipos = model.body_ipos.at[T].add(m * r / (M + m))
    mass = model.body_mass.at[T].add(m)
    inertia_T, iquat_T = composite_inertia(M, model.body_iquat[T], model.body_inertia[T], m, r)
    payload = m > 0  # neutral θ leaves the inertia exactly as it was
    inertia = model.body_inertia.at[T].set(jp.where(payload, inertia_T, model.body_inertia[T]))
    iquat = model.body_iquat.at[T].set(jp.where(payload, iquat_T, model.body_iquat[T]))

    # Motor weakness: position actuators, so scale Kp (gain and bias) and the torque limit.
    # Actuators outside the θ joints (G1's waist and arms) keep full strength.
    s_theta = slot(theta, "motor_strength", spec)
    s = s_theta
    if spec.actuators != tuple(range(spec.nu)):
        s = jp.ones(spec.nu).at[jp.array(spec.actuators)].set(s)
    gain = model.actuator_gainprm.at[:, 0].multiply(s)
    bias = model.actuator_biasprm.at[:, 1].multiply(s).at[:, 2].multiply(s)
    frange = model.actuator_forcerange * s[:, None]
    # Joint-level actuator force limits (G1: jnt_actfrcrange, ±88-139 Nm) cap the torque too.
    # Unlimited joints (Go1) have a zero range, which scaling leaves at zero.
    afrange = model.jnt_actfrcrange
    if spec.joints:
        afrange = jp.asarray(afrange).at[jp.array(spec.joints)].multiply(s_theta[:, None])

    floss = model.dof_frictionloss.at[6:].multiply(slot(theta, "joint_friction", spec)[0])

    # Slope: tilt gravity instead of the ground (observations are rotated to match).
    gravity = 9.81 * slope_down(theta, yaw, spec)

    return model.replace(
        geom_friction=fric, pair_friction=pair_fric, body_mass=mass, body_ipos=ipos,
        body_inertia=inertia, body_iquat=iquat, actuator_gainprm=gain, actuator_biasprm=bias,
        actuator_forcerange=frange, jnt_actfrcrange=afrange, dof_frictionloss=floss,
        opt=model.opt.replace(gravity=gravity),
    )


def composite_inertia(M, iquat, inertia, m, r):
    """Principal inertia and its frame for a body (mass M, inertia `inertia` in the frame `iquat`)
    plus a point mass m at offset r from the body's CoM, both expressed in the body frame.

    About the new CoM the added term is the reduced mass mu = M m / (M + m) times
    (|r|^2 I - r r^T), off-diagonals included; the result is re-diagonalized, so the inertial
    frame (body_iquat) rotates with it. Returns (inertia [3], iquat [4]); jittable.
    """
    R = mjx_math.quat_to_mat(iquat)
    mu = M * m / jp.maximum(M + m, 1e-9)
    full = R @ jp.diag(inertia) @ R.T + mu * (jp.dot(r, r) * jp.eye(3) - jp.outer(r, r))
    evals, evecs = jp.linalg.eigh(0.5 * (full + full.T))
    evecs = evecs * jp.where(jp.linalg.det(evecs) < 0, -1.0, 1.0)  # proper rotation
    return evals, _mat_to_quat(evecs)


def _mat_to_quat(R):
    """Unit quaternion (w, x, y, z) of a rotation matrix (Shepperd's method; jittable)."""
    t = jp.trace(R)
    d = jp.array([t, R[0, 0], R[1, 1], R[2, 2]])
    cands = jp.stack([
        jp.array([1 + t, R[2, 1] - R[1, 2], R[0, 2] - R[2, 0], R[1, 0] - R[0, 1]]),
        jp.array([R[2, 1] - R[1, 2], 1 + 2 * R[0, 0] - t, R[0, 1] + R[1, 0], R[0, 2] + R[2, 0]]),
        jp.array([R[0, 2] - R[2, 0], R[0, 1] + R[1, 0], 1 + 2 * R[1, 1] - t, R[1, 2] + R[2, 1]]),
        jp.array([R[1, 0] - R[0, 1], R[0, 2] + R[2, 0], R[1, 2] + R[2, 1], 1 + 2 * R[2, 2] - t]),
    ])
    q = cands[jp.argmax(d)]
    q = q / jp.linalg.norm(q)
    return q * jp.where(q[0] < 0, -1.0, 1.0)


def _rot_z(v, yaw):
    c, s = jp.cos(yaw), jp.sin(yaw)
    return jp.array([c * v[0] - s * v[1], s * v[0] + c * v[1], v[2]])


def slope_down(theta, yaw=0.0, spec=GO1):
    """Unit 'down' vector in the world frame for the slope in θ, relative to start heading `yaw`."""
    return _rot_z(_slope_down_local(theta, spec), yaw)


def _slope_down_local(theta, spec=GO1):
    pitch, roll = slot(theta, "slope", spec)
    # Walking +x uphill on a pitch incline == gravity rotated to pull toward -x.
    return jp.array([
        -jp.sin(pitch) * jp.cos(roll),
        jp.sin(roll),
        -jp.cos(pitch) * jp.cos(roll),
    ])


# --- Time- and position-varying effects -------------------------------------------------------

def terrain_mocap(theta, origin, spec=GO1):
    """data.mocap_pos and data.mocap_quat placing the step boxes for θ and the start pose `origin`
    (x, y, yaw); see perturb/terrain.py. Only data changes, never the model."""
    return terrain.mocap_poses(theta, origin[:2], origin[2], C.layout(spec.robot),
                               len(spec.terrain_geoms), jp)


def with_ice(theta, distance, spec=GO1):
    """θ with the ice patch applied if the robot is `distance` m along its initial heading."""
    start, length = slot(theta, "ice_start", spec)[0], slot(theta, "ice_length", spec)[0]
    on_ice = (distance >= start) & (distance < start + length)
    mu = slot(theta, "foot_friction", spec)
    mu = jp.where(on_ice, jp.minimum(mu, slot(theta, "ice_mu", spec)[0]), mu)
    return theta.at[C.layout(spec.robot).INDEX["foot_friction"]].set(mu)


def push_force(theta, t, yaw=0.0, spec=GO1):
    """Force on the trunk at time t (seconds), given in the start-heading frame (x = the robot's
    initial forward direction) and returned in the world frame."""
    f = jp.zeros(3)
    for k in ("push1", "push2"):
        t0 = slot(theta, f"{k}_start", spec)[0]
        dur = slot(theta, f"{k}_duration", spec)[0]
        active = (t >= t0) & (t < t0 + dur)
        f = f + jp.where(active, slot(theta, f"{k}_force", spec), 0.0)
    return _rot_z(f, yaw)


def command(theta, t, current, spec=GO1):
    """The joystick command at time t: θ's profile if command_mode is set, else `current`."""
    cmd = jp.where(t < slot(theta, "command_switch", spec)[0], slot(theta, "command_a", spec),
                   slot(theta, "command_b", spec))
    return jp.where(slot(theta, "command_mode", spec)[0] > 0.5, cmd, current)


def delay_action(theta, buf, action, spec=GO1):
    """Pushes `action` into the ring buffer and returns (applied_action, new_buf)."""
    buf = jp.concatenate([action[None], buf[:-1]], axis=0)
    d = jp.clip(jp.round(slot(theta, "latency", spec)[0]), 0, C.MAX_LATENCY).astype(jp.int32)
    return buf[d], buf


# --- Observations -----------------------------------------------------------------------------

def _rot_xy(roll, pitch):
    cr, sr, cp, sp = jp.cos(roll), jp.sin(roll), jp.cos(pitch), jp.sin(pitch)
    rx = jp.array([[1, 0, 0], [0, cr, -sr], [0, sr, cr]])
    ry = jp.array([[cp, 0, sp], [0, 1, 0], [-sp, 0, cp]])
    return ry @ rx


def imu_frame(data, spec=GO1):
    """World-to-sensor rotation (transposed) of the frame the env reads gravity in."""
    return data.xmat[spec.trunk] if spec.imu_site < 0 else data.site_xmat[spec.imu_site]


def perturb_obs(theta, obs, data, rng, cmd, yaw=0.0, spec=GO1):
    """Slope-consistent gravity, sensor biases, extra noise, and the commanded profile.

    Go1 `state` layout: linvel 0:3, gyro 3:6, gravity 6:9, joints 9:21, joint vel 21:33,
    last action 33:45, command 45:48. privileged_state[:48] mirrors state; [54:57] is gravity.
    Other robots' offsets are in their robots.Robot.
    """
    r = spec.robot
    g0, j0, c0, n = r.obs_gravity, r.obs_joints, r.obs_command, r.obs_size
    R = imu_frame(data, spec)
    env_g = R.T @ jp.array([0.0, 0.0, -1.0])  # what the env's sensor assumes
    g_body = R.T @ slope_down(theta, yaw, spec)  # true sensor-frame gravity on the incline
    s = obs["state"]
    sensed_g = _rot_xy(*slot(theta, "imu_bias", spec)) @ g_body + (s[g0:g0 + 3] - env_g)
    joints = j0 + jp.array(spec.joint_qpos)
    s = (s.at[r.obs_linvel:r.obs_linvel + 3].add(slot(theta, "linvel_bias", spec))
          .at[g0:g0 + 3].set(sensed_g)
          .at[joints].add(slot(theta, "joint_offset", spec))
          .at[c0:c0 + 3].set(jp.where(slot(theta, "command_mode", spec)[0] > 0.5, cmd, s[c0:c0 + 3])))
    # Sensor noise on proprioception only (not on the last action or the command).
    std = slot(theta, "obs_noise", spec)[0]
    for k, (a, b) in enumerate(r.obs_noisy):
        s = s.at[a:b].add(std * jax.random.normal(jax.random.fold_in(rng, k) if k else rng, (b - a,)))
    priv = obs["privileged_state"]
    pg = r.priv_gravity
    priv = priv.at[:n].set(s).at[pg:pg + 3].set(g_body + (priv[pg:pg + 3] - env_g))
    return {**obs, "state": s, "privileged_state": priv}
