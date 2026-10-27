"""Robot registry: everything robot-specific the perturbation pipeline needs.

A Robot holds names and numbers only (no model ids); `Spec` resolves the names against the loaded
MuJoCo model. The θ layout for each robot is built from its Robot in perturb/canonical.py.

Go1 (quadruped) is the original robot and its values reproduce the hardcoded pipeline exactly.
G1 (Unitree humanoid, Playground's G1JoystickFlatTerrain) is the second.
"""

from dataclasses import dataclass, field

import numpy as np

# mjtGeom values (mujoco is imported lazily, so the layout works without it)
_SPH, _CAP, _BOX = 2, 3, 6


@dataclass(frozen=True)
class Robot:
    name: str
    env: str                      # Playground env name (also the PPO config lookup key)
    feet: tuple                   # θ labels of the feet (DSL "legs"), in foot_friction order
    joint_parts: tuple            # per-leg joint labels; θ joints are f"{foot}_{part}"
    actuators: tuple              # actuator names, in θ joint order (motor_strength, joint_offset)
    trunk: str                    # body that gets pushes and payloads, and whose tilt is checked
    foot_sites: tuple             # sites under each foot (overlays)
    min_height: float             # root height (qpos[2]) below which the robot has fallen
    max_tilt_deg: float = 45.0    # trunk tilt beyond which the robot has fallen
    # Contact friction. Either per-foot geoms (contact friction = max of the two geoms, so the floor
    # is lowered too) or explicit foot-floor <pair>s, whose friction is used as is.
    foot_geoms: tuple = ()
    foot_pairs: tuple = ()
    nominal_friction: float = 1.0
    # Per-foot geoms only: the contact friction can't exceed the floor's (the scene gives the floor
    # contact priority; envs.base hands that priority to the feet so each foot's friction applies on
    # its own, capped at this value to keep the trained nominal contact). None: no cap (pairs).
    foot_friction_cap: float | None = None
    # Body-floor collisions for strict falls: (body-name suffix -> geom type) picks the largest
    # existing geom of that type per body (Go1); `collision_geoms` enables named geoms; extra
    # primitive geoms are added to the model (bodies whose collision shapes are meshes only).
    collision_parts: dict = field(default_factory=dict)
    collision_geoms: tuple = ()
    extra_geoms: tuple = ()       # (body, name, type, size, pos or fromto)
    # Observation layout (indices into obs["state"] / obs["privileged_state"]).
    obs_size: int = 48
    obs_linvel: int = 0
    obs_gravity: int = 6
    obs_joints: int = 9           # start of the joint-position block (in qpos[7:] order)
    obs_command: int = 45
    obs_noisy: tuple = ((0, 33),)  # proprioception ranges that get sensor noise
    priv_gravity: int = 54
    imu_site: str | None = None   # frame of the gravity reading (None: the trunk body)
    linvel_frame: str | None = None  # argument of env.get_local_linvel, if it takes one
    # Envelope (physical bounds) and task.
    command_lo: tuple = (-1.5, -0.8, -1.2)
    command_hi: tuple = (1.5, 0.8, 1.2)
    nominal_command: tuple = (1.0, 0.0, 0.0)
    payload_max: float = 5.0
    payload_lo: tuple = (-0.1, -0.06, -0.05)
    payload_hi: tuple = (0.1, 0.06, 0.1)
    push_max: float = 150.0
    payload_note: str = "Go1 is ~12 kg; 5 kg is its spec limit"
    push_note: str = "60-120 N for 0.1 s is a strong shove"
    # Base domain randomization (Playground-equivalent).
    dr_frictionloss: tuple = (0.9, 1.1)

    @property
    def joints(self) -> tuple:
        return tuple(f"{f}_{p}" for f in self.feet for p in self.joint_parts)


GO1 = Robot(
    name="go1",
    env="Go1JoystickFlatTerrain",
    feet=("FR", "FL", "RR", "RL"),
    joint_parts=("hip", "thigh", "calf"),
    actuators=tuple(f"{f}_{p}" for f in ("FR", "FL", "RR", "RL") for p in ("hip", "thigh", "calf")),
    trunk="trunk",
    foot_sites=("FR", "FL", "RR", "RL"),
    min_height=0.18,
    foot_geoms=("FR", "FL", "RR", "RL"),
    foot_friction_cap=0.6,  # the floor geom's friction in Playground's Go1 scene
    collision_parts={"trunk": _BOX, "thigh": _CAP, "calf": _CAP},
)

G1_LEG = ("hip_pitch", "hip_roll", "hip_yaw", "knee", "ankle_pitch", "ankle_roll")

G1 = Robot(
    name="g1",
    env="G1JoystickFlatTerrain",
    feet=("L", "R"),
    joint_parts=G1_LEG,
    actuators=tuple(f"{s}_{p}_joint" for s in ("left", "right") for p in G1_LEG),
    trunk="torso_link",
    foot_sites=("left_foot", "right_foot"),
    min_height=0.45,  # pelvis; 0.755 standing with bent knees
    foot_pairs=("left_foot_floor", "right_foot_floor"),
    nominal_friction=0.6,
    # Thighs and hands have collision capsules already. The shin capsules (r=0.08) reach within
    # ~2 cm of the sole, so they would fire on toe-off; thinner ones are added instead, plus
    # pelvis, torso and head (meshes only in the stock model).
    collision_geoms=("left_thigh", "right_thigh", "left_hand_collision", "right_hand_collision"),
    extra_geoms=(
        ("pelvis", "nemesis_pelvis", _BOX, (0.07, 0.11, 0.06), (0.0, 0.0, -0.07)),
        ("torso_link", "nemesis_torso", _BOX, (0.08, 0.11, 0.16), (0.005, 0.0, 0.15)),
        ("torso_link", "nemesis_head", _SPH, (0.09, 0, 0), (0.01, 0.0, 0.40)),
        ("left_knee_link", "nemesis_left_shin", _CAP, (0.04, 0, 0), (0.02, 0, 0.0, 0.02, 0, -0.2)),
        ("right_knee_link", "nemesis_right_shin", _CAP, (0.04, 0, 0), (0.02, 0, 0.0, 0.02, 0, -0.2)),
    ),
    # state: linvel 0:3, gyro 3:6, gravity 6:9, command 9:12, joints 12:41, joint vel 41:70,
    # last action 70:99, gait phase 99:103. privileged: state, then gyro, accel, gravity 109:112...
    obs_size=103,
    obs_gravity=6,
    obs_joints=12,
    obs_command=9,
    obs_noisy=((0, 9), (12, 70)),
    priv_gravity=109,
    imu_site="imu_in_pelvis",
    linvel_frame="pelvis",
    command_lo=(-1.0, -0.5, -1.0),
    command_hi=(1.0, 0.5, 1.0),
    nominal_command=(0.8, 0.0, 0.0),
    payload_max=10.0,
    payload_lo=(-0.15, -0.1, -0.1),
    payload_hi=(0.15, 0.1, 0.3),
    push_max=300.0,
    payload_note="G1 is ~33 kg; 10 kg is a heavy backpack",
    push_note="100-250 N for 0.1 s is a strong shove",
    dr_frictionloss=(0.5, 2.0),
)

ROBOTS = {r.name: r for r in (GO1, G1)}


def get(robot: "str | Robot") -> Robot:
    return robot if isinstance(robot, Robot) else ROBOTS[robot]


def for_env(env_name: str) -> Robot:
    """The robot a Playground env belongs to (Go1 for any Go1* env)."""
    for r in ROBOTS.values():
        if env_name == r.env or env_name.lower().startswith(r.name):
            return r
    raise KeyError(f"no robot registered for {env_name}")


@dataclass(frozen=True)
class Spec:
    """A Robot resolved against its loaded MuJoCo model (static ints, safe to close over in jit)."""
    robot: Robot
    trunk: int
    floor: int
    foot_geoms: tuple
    foot_pairs: tuple
    actuators: tuple        # actuator index per θ joint
    joint_qpos: tuple       # index into qpos[7:] per θ joint
    joint_bodies: tuple     # body moved by each θ joint (overlay tint)
    foot_sites: tuple
    imu_site: int           # -1: use the trunk body frame
    nu: int
    nbody: int
    body_geoms: tuple = ()
    joints: tuple = ()      # joint id per θ joint (joint-level actuator force limits)

    @property
    def min_up_z(self) -> float:
        return float(np.cos(np.deg2rad(self.robot.max_tilt_deg)))


def resolve(robot: "str | Robot", m, body_geoms=()) -> Spec:
    import mujoco

    r = get(robot)
    oid = lambda kind, name: mujoco.mj_name2id(m, kind, name)  # noqa: E731
    acts = [oid(mujoco.mjtObj.mjOBJ_ACTUATOR, a) for a in r.actuators]
    jnts = [int(m.actuator_trnid[a, 0]) for a in acts]
    return Spec(
        robot=r,
        trunk=oid(mujoco.mjtObj.mjOBJ_BODY, r.trunk),
        floor=oid(mujoco.mjtObj.mjOBJ_GEOM, "floor"),
        foot_geoms=tuple(oid(mujoco.mjtObj.mjOBJ_GEOM, g) for g in r.foot_geoms),
        foot_pairs=tuple(oid(mujoco.mjtObj.mjOBJ_PAIR, p) for p in r.foot_pairs),
        actuators=tuple(acts),
        joint_qpos=tuple(int(m.jnt_qposadr[j]) - 7 for j in jnts),
        joint_bodies=tuple(int(m.jnt_bodyid[j]) for j in jnts),
        foot_sites=tuple(oid(mujoco.mjtObj.mjOBJ_SITE, s) for s in r.foot_sites),
        imu_site=oid(mujoco.mjtObj.mjOBJ_SITE, r.imu_site) if r.imu_site else -1,
        nu=m.nu,
        nbody=m.nbody,
        body_geoms=tuple(int(g) for g in body_geoms),
        joints=tuple(jnts),
    )


# Go1's ids in Playground's Go1 Joystick model (what the pipeline hardcoded before the registry);
# tests check that resolve() reproduces them. Used as the default when no env is at hand.
GO1_SPEC = Spec(
    robot=GO1, trunk=1, floor=0, foot_geoms=(15, 26, 38, 50), foot_pairs=(),
    actuators=tuple(range(12)), joint_qpos=tuple(range(12)),
    joint_bodies=(2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13),
    foot_sites=(2, 3, 4, 5), imu_site=-1, nu=12, nbody=14, joints=tuple(range(1, 13)),
)
