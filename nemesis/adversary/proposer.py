"""Muse Wonder as Nemesis: proposes attack programs (hypotheses about why the robot works).

Each round it sees the DSL, realistic physical ranges, every program tried so far with its
outcome, and Muse Spark's descriptions of the failures it has watched. It returns new programs
as JSON; invalid ones are sent back once with the validation errors.
"""

import json

from pydantic import ValidationError

from nemesis import config
from nemesis.llm import client
from nemesis.perturb import canonical as C
from nemesis.perturb.dsl import K_MAX, Program, compile_program, json_schema

SYSTEM = """You are Nemesis, an adversary whose job is to find the most PLAUSIBLE physical conditions
under which a quadruped robot's walking policy fails, so that it can be retrained to survive them.

Robot: Unitree Go1 (12 kg, 12 position-controlled motors, Kp=35, torque limits 23.7 Nm hip/thigh,
35.5 Nm calf), trained with PPO in MuJoCo to track a joystick command (forward/sideways velocity and
yaw rate) on flat ground with mild domain randomization. It observes 3 frames of: body linear
velocity estimate, gyro, gravity direction, joint angles and velocities, last action, command.
Each attack episode lasts 5 seconds (250 control steps at 50 Hz). A failure is a fall: any body
part other than the feet touching the ground, tilt beyond 45 degrees, or trunk below 0.18 m.

How to attack well:
- Think like a robotics engineer: form a specific HYPOTHESIS about a weakness (e.g. "the trot relies
  on rear-foot grip during yaw changes"), then write the smallest program that tests it.
- Leave the parameters you are unsure about as ranges [lo, hi]; an optimizer will search them for
  the most plausible failure. At most {k_max} searched parameters per program.
- Prefer realistic conditions over extreme ones. A failure that needs ice plus a 150 N shove plus a
  30% slope teaches nothing; a failure at wet-tile friction with a 3 kg backpack does.
- Combine primitives in time and space: command reversals, pushes timed during a turn, ice patches
  the robot walks onto, sensor biases while carrying load.
- Do not repeat programs that already failed to break the robot, and do not re-find a failure
  family that is already in the archive unless you have a sharper hypothesis about it.

Physical envelope (realistic values in the descriptions):
{slots}

Answer with JSON only: {{"programs": [<Program>, ...]}} where each Program follows this schema:
{schema}"""


def _slot_docs() -> str:
    return "\n".join(f"- {s.name} [{s.unit}] range {s.lo}..{s.hi}: {s.doc}" for s in C.SLOTS)


def system_prompt() -> str:
    return SYSTEM.format(k_max=K_MAX, slots=_slot_docs(), schema=json.dumps(json_schema()))


def _round_prompt(n: int, history: list[dict], observations: list[str]) -> str:
    parts = [f"Propose {n} new attack programs."]
    if history:
        lines = [f"- {h['name']}: {h['hypothesis']} -> "
                 + (f"FAILED the robot (fall rate {h['fail_rate']:.0%}, cost {h['cost']:.2f}): {h['theta']}"
                    if h["found"] else f"robot survived (best fall rate {h['fail_rate']:.0%})")
                 for h in history[-40:]]
        parts.append("Programs tried so far:\n" + "\n".join(lines))
    if observations:
        parts.append("What Muse Spark saw when watching the failures (use this to form sharper "
                     "hypotheses):\n" + "\n".join(f"- {o}" for o in observations[-20:]))
    return "\n\n".join(parts)


def propose(n: int = 8, history: list[dict] | None = None, observations: list[str] | None = None,
            model: str = config.WONDER, seed: int = 0, families=None) -> list[Program]:
    """Returns up to n valid, compilable programs (only ops from `families` if given)."""
    from nemesis.adversary.modes import OP_FAMILY
    prompt = _round_prompt(n, history or [], observations or [])
    if families is not None:
        ops = sorted(op for op, f in OP_FAMILY.items() if f is None or f in families)
        prompt += f"\n\nIn this session you may ONLY use these ops: {', '.join(ops)}."
    prompt += f"\n\n(proposal round seed {seed})"
    raw = client.respond(prompt, model=model, instructions=system_prompt(), reasoning="medium",
                         tag="nemesis/propose")
    programs, errors = _parse(raw)
    if errors:
        fix = (prompt + "\n\nYour previous answer had invalid programs:\n" + "\n".join(errors)
               + "\n\nPrevious answer:\n" + raw + "\n\nReturn the corrected JSON only.")
        raw = client.respond(fix, model=model, instructions=system_prompt(), reasoning="low",
                             tag="nemesis/propose-fix")
        fixed, _ = _parse(raw)
        names = {p.name for p in programs}
        programs += [p for p in fixed if p.name not in names]
    if families is not None:
        programs = [p for p in programs if all(OP_FAMILY[o.op] is None or OP_FAMILY[o.op] in families
                                               for o in p.ops)]
    return programs[:n]


def _parse(raw: str) -> tuple[list[Program], list[str]]:
    text = raw.strip()
    if text.startswith("```"):
        text = text.strip("`").split("\n", 1)[1].rsplit("```", 1)[0]
    try:
        items = json.loads(text)
        items = items.get("programs", items) if isinstance(items, dict) else items
    except json.JSONDecodeError as e:
        return [], [f"not valid JSON: {e}"]
    programs, errors = [], []
    for i, item in enumerate(items):
        try:
            p = Program.model_validate(item)
            compile_program(p)
            programs.append(p)
        except (ValidationError, ValueError) as e:
            errors.append(f"program {i} ({item.get('name', '?') if isinstance(item, dict) else '?'}): "
                          f"{str(e)[:400]}")
    return programs, errors
