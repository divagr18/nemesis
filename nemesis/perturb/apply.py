"""Apply θ to an MJX model (static physics), to each control step, and to observations.

All functions are pure and traceable, so they run per-env inside vmap.
"""

import jax
import jax.numpy as jp

from nemesis.perturb import canonical as C

TRUNK = 1  # Go1 trunk body id (Playground's TORSO_BODY_ID)
FLOOR = 0  # floor geom id
FEET_GEOMS = jp.array([15, 26, 38, 50])  # FR FL RR RL foot spheres


def slot(theta, name):
    return theta[C.INDEX[name]]


# --- Base domain randomization (Playground-equivalent, resampled per episode) ---------------

def sample_base_dr(rng, model):
    """Playground's Go1 domain randomization. Floor friction is skipped: with the feet at 1.0 it
    is a no-op, because contact friction is the max of the two geoms."""
    k = jax.random.split(rng, 5)
    return {
        "frictionloss": jax.random.uniform(k[0], (12,), minval=0.9, maxval=1.1),
        "armature": jax.random.uniform(k[1], (12,), minval=1.0, maxval=1.05),
        "com": jax.random.uniform(k[2], (3,), minval=-0.05, maxval=0.05),
        "mass_scale": jax.random.uniform(k[3], (model.nbody,), minval=0.9, maxval=1.1),
        "trunk_mass": jax.random.uniform(k[4], (), minval=-1.0, maxval=1.0),
    }


def neutral_base_dr(model):
    return {"frictionloss": jp.ones(12), "armature": jp.ones(12), "com": jp.zeros(3),
            "mass_scale": jp.ones(model.nbody), "trunk_mass": jp.zeros(())}


def apply_base_dr(model, dr):
    mass = (model.body_mass * dr["mass_scale"]).at[TRUNK].add(dr["trunk_mass"])
    return model.replace(
        dof_frictionloss=model.dof_frictionloss.at[6:].multiply(dr["frictionloss"]),
        dof_armature=model.dof_armature.at[6:].multiply(dr["armature"]),
        body_ipos=model.body_ipos.at[TRUNK].add(dr["com"]),
        body_mass=mass,
    )


# --- Static physics ---------------------------------------------------------------------------

def apply_model(model, theta, yaw=0.0):
    """Returns `model` with the static perturbations in θ applied.

    `yaw` is the robot's heading at the start of the episode: slopes (and pushes, see
    push_force) are defined relative to it, so "uphill" is uphill whatever the random start yaw.
    """
    # Contact friction is max(geom1, geom2): set each foot to its target and lower the floor
    # to the smallest target, so every foot's effective friction is exactly its target.
    mu = slot(theta, "foot_friction")
    fric = model.geom_friction.at[FEET_GEOMS, 0].set(mu)
    fric = fric.at[FLOOR, 0].set(jp.minimum(fric[FLOOR, 0], mu.min()))

    # Payload: point mass at an offset from the trunk CoM (parallel-axis inertia update).
    m = slot(theta, "payload_mass")[0]
    r = slot(theta, "payload_offset")
    M = model.body_mass[TRUNK]
    ipos = model.body_ipos.at[TRUNK].add(m * r / (M + m))
    inertia = model.body_inertia.at[TRUNK].add(m * (jp.sum(r**2) - r**2))
    mass = model.body_mass.at[TRUNK].add(m)

    # Motor weakness: position actuators, so scale Kp (gain and bias) and the torque limit.
    s = slot(theta, "motor_strength")
    gain = model.actuator_gainprm.at[:, 0].multiply(s)
    bias = model.actuator_biasprm.at[:, 1].multiply(s).at[:, 2].multiply(s)
    frange = model.actuator_forcerange * s[:, None]

    floss = model.dof_frictionloss.at[6:].multiply(slot(theta, "joint_friction")[0])

    # Slope: tilt gravity instead of the ground (observations are rotated to match).
    gravity = 9.81 * slope_down(theta, yaw)

    return model.replace(
        geom_friction=fric, body_mass=mass, body_ipos=ipos, body_inertia=inertia,
        actuator_gainprm=gain, actuator_biasprm=bias, actuator_forcerange=frange,
        dof_frictionloss=floss, opt=model.opt.replace(gravity=gravity),
    )


def _rot_z(v, yaw):
    c, s = jp.cos(yaw), jp.sin(yaw)
    return jp.array([c * v[0] - s * v[1], s * v[0] + c * v[1], v[2]])


def slope_down(theta, yaw=0.0):
    """Unit 'down' vector in the world frame for the slope in θ, relative to start heading `yaw`."""
    return _rot_z(_slope_down_local(theta), yaw)


def _slope_down_local(theta):
    pitch, roll = slot(theta, "slope")
    # Walking +x uphill on a pitch incline == gravity rotated to pull toward -x.
    return jp.array([
        -jp.sin(pitch) * jp.cos(roll),
        jp.sin(roll),
        -jp.cos(pitch) * jp.cos(roll),
    ])


# --- Time- and position-varying effects -------------------------------------------------------

def with_ice(theta, distance):
    """θ with the ice patch applied if the robot is `distance` m along its initial heading."""
    start, length = slot(theta, "ice_start")[0], slot(theta, "ice_length")[0]
    on_ice = (distance >= start) & (distance < start + length)
    mu = slot(theta, "foot_friction")
    mu = jp.where(on_ice, jp.minimum(mu, slot(theta, "ice_mu")[0]), mu)
    return theta.at[C.INDEX["foot_friction"]].set(mu)


def push_force(theta, t, yaw=0.0):
    """Force on the trunk at time t (seconds), given in the start-heading frame (x = the robot's
    initial forward direction) and returned in the world frame."""
    f = jp.zeros(3)
    for k in ("push1", "push2"):
        t0 = slot(theta, f"{k}_start")[0]
        dur = slot(theta, f"{k}_duration")[0]
        active = (t >= t0) & (t < t0 + dur)
        f = f + jp.where(active, slot(theta, f"{k}_force"), 0.0)
    return _rot_z(f, yaw)


def command(theta, t, current):
    """The joystick command at time t: θ's profile if command_mode is set, else `current`."""
    cmd = jp.where(t < slot(theta, "command_switch")[0], slot(theta, "command_a"), slot(theta, "command_b"))
    return jp.where(slot(theta, "command_mode")[0] > 0.5, cmd, current)


def delay_action(theta, buf, action):
    """Pushes `action` into the ring buffer and returns (applied_action, new_buf)."""
    buf = jp.concatenate([action[None], buf[:-1]], axis=0)
    d = jp.clip(jp.round(slot(theta, "latency")[0]), 0, C.MAX_LATENCY).astype(jp.int32)
    return buf[d], buf


# --- Observations -----------------------------------------------------------------------------

def _rot_xy(roll, pitch):
    cr, sr, cp, sp = jp.cos(roll), jp.sin(roll), jp.cos(pitch), jp.sin(pitch)
    rx = jp.array([[1, 0, 0], [0, cr, -sr], [0, sr, cr]])
    ry = jp.array([[cp, 0, sp], [0, 1, 0], [-sp, 0, cp]])
    return ry @ rx


def perturb_obs(theta, obs, data, rng, cmd, yaw=0.0):
    """Slope-consistent gravity, sensor biases, extra noise, and the commanded profile.

    `state` layout: linvel 0:3, gyro 3:6, gravity 6:9, joints 9:21, joint vel 21:33,
    last action 33:45, command 45:48. privileged_state[:48] mirrors state; [54:57] is gravity.
    """
    env_g = data.xmat[TRUNK].T @ jp.array([0.0, 0.0, -1.0])  # what the env's sensor assumes
    g_body = data.xmat[TRUNK].T @ slope_down(theta, yaw)  # true body-frame gravity on the incline
    s = obs["state"]
    sensed_g = _rot_xy(*slot(theta, "imu_bias")) @ g_body + (s[6:9] - env_g)
    s = (s.at[0:3].add(slot(theta, "linvel_bias"))
          .at[6:9].set(sensed_g)
          .at[9:21].add(slot(theta, "joint_offset"))
          .at[45:48].set(jp.where(slot(theta, "command_mode")[0] > 0.5, cmd, s[45:48])))
    # Sensor noise on proprioception only (not on the last action or the command).
    s = s.at[:33].add(slot(theta, "obs_noise")[0] * jax.random.normal(rng, (33,)))
    priv = obs["privileged_state"]
    priv = priv.at[:48].set(s).at[54:57].set(g_body + (priv[54:57] - env_g))
    return {**obs, "state": s, "privileged_state": priv}
