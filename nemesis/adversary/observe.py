"""Muse Spark watches failures: renders a broken scenario and names what went wrong.

The observation is stored in the atlas and fed back into Wonder's next round of hypotheses,
so the adversary reasons from what actually happened on screen, not just from numbers.
"""

from pathlib import Path

import numpy as np

from nemesis import config
from nemesis.llm import client
from nemesis.perturb import canonical as C
from nemesis.sim.render import render_qpos, save_video

SCHEMA = {
    "title": "failure_observation",
    "type": "object",
    "properties": {
        "mode": {"type": "string", "description": "3-6 word name of the failure mode"},
        "what_happened": {"type": "string", "description": "1-2 sentences, what the robot did and how it fell"},
        "likely_cause": {"type": "string", "description": "1 sentence: the mechanical reason it fell"},
        "body_part": {"type": "string", "description": "which leg/foot/part failed first, or 'unclear'"},
        "fall_direction": {"type": "string", "enum": ["forward", "backward", "left", "right", "collapse", "unclear"]},
    },
    "required": ["mode", "what_happened", "likely_cause", "body_part", "fall_direction"],
    "additionalProperties": False,
}

PROMPT = """You are watching a simulated Unitree Go1 quadruped robot (side-tracking camera) during a
stress test. Conditions applied in this clip (hidden from the robot's controller): {conditions}.
The command was to walk as described by command_a/command_b (vx forward m/s, vy left m/s, yaw rate).
Watch the video and describe precisely how the robot fails. Be concrete about which legs slip,
buckle or lift, and when. Answer as JSON."""


def observe_failure(evaluator, params, theta: np.ndarray, out_path: str | Path, seed: int = 0,
                    model: str | None = None) -> dict:
    """Renders one failing rollout of θ (logged trajectory) and asks Spark to describe it.
    `model` defaults to config.vision_model() (Spark, or the open-weight vision model)."""
    model = model or config.vision_model()
    probe = evaluator(params, np.asarray(theta)[None], seeds=8)
    falls = np.flatnonzero(probe["fell"][0])
    seed = int(falls[0]) if len(falls) else seed
    rec = evaluator(params, np.asarray(theta)[None], seeds=np.array([seed]), record=True)
    qpos = rec["qpos"][0, 0]
    # Keep ~1.5 s after the fall: enough to see it, without minutes of flailing on the floor.
    t_end = int(min(len(qpos), rec["time_to_fall"][0, 0] / evaluator.env.dt + 75))
    frames = render_qpos(evaluator.env.mj_model, qpos[:t_end], width=640, height=480)
    save_video(frames, out_path, evaluator.env)
    obs = client.respond(
        [{"type": "input_text", "text": PROMPT.format(conditions=C.describe(theta))},
         client.video_item(out_path, model)],
        model=model, schema=SCHEMA, tag="spark/observe", reasoning="low")
    obs["clip"] = str(out_path)
    obs["fell"] = bool(rec["fell"][0, 0])
    return obs
