"""Your world: a photo or short video of a real place becomes a test scenario for the robot.

Muse Spark reads the place (surface material, how slippery, slope, hazards) and estimates the
physical parameters; Muse Wonder then writes the attack program for that environment, which the
robot runs like any other attack. No physical robot is needed: the place is real, the robot is
simulated.
"""

import base64
from pathlib import Path

from nemesis import config
from nemesis.llm import client

SCHEMA = {
    "title": "place_reading",
    "type": "object",
    "properties": {
        "place": {"type": "string", "description": "3-6 words naming the place, e.g. 'wet bathroom tiles'"},
        "surface": {"type": "string", "description": "the walking surface material and condition"},
        "friction": {"type": "number", "description": "estimated foot-ground Coulomb friction coefficient for "
                     "a rubber robot foot: dry concrete ~1.0, wood ~0.6, wet tile ~0.3, wet leaves ~0.25, ice ~0.08"},
        "slope_deg": {"type": "number", "description": "estimated incline the robot would walk on, degrees (0 if flat)"},
        "slippery_patches": {"type": "string", "description": "spots that are more slippery than the rest "
                             "(puddle, ice, leaves, rug edge), with rough size, or 'none'"},
        "hazards": {"type": "string", "description": "other things a small quadruped would struggle with "
                    "(steps, loose gravel, uneven ground, bumps from people or pets), or 'none'"},
        "reasoning": {"type": "string", "description": "1-2 sentences: what in the image supports these estimates"},
    },
    "required": ["place", "surface", "friction", "slope_deg", "slippery_patches", "hazards", "reasoning"],
    "additionalProperties": False,
}

PROMPT = """Look at this place as a robotics engineer about to deploy a 12 kg four-legged walking robot
(Unitree Go1, rubber feet, ~30 cm tall) here. Estimate the physical conditions it would walk on.
Be calibrated: only call something slippery if the image shows it (water, ice, polish, leaves).
Answer as JSON."""


def media_item(path: Path) -> dict:
    """Images go inline; videos go through the Files API like the failure clips."""
    suffix = path.suffix.lower()
    if suffix in (".mp4", ".mov", ".webm", ".m4v"):
        return client.video_item(path, config.vision_model())
    mime = {".png": "image/png", ".webp": "image/webp"}.get(suffix, "image/jpeg")
    data = base64.b64encode(path.read_bytes()).decode()
    return {"type": "input_image", "image_url": f"data:{mime};base64,{data}"}


# What SAM 3.1 outlines in a photo of a place: one request per concept ($0.0025 each). "icy ground"
# finds an icy path that "ice" misses.
CONCEPTS = {"step": "step", "puddle": "puddle", "icy ground": "icy ground", "ramp": "ramp"}
MIN_CONF = 0.5
IMAGES = {".jpg", ".jpeg", ".png", ".webp"}


def _upright(path: Path, out: Path, size: int = 1600) -> Path:
    """The photo as the page shows it (EXIF rotation applied), at most `size` px on a side."""
    from PIL import Image, ImageOps

    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        im.thumbnail((size, size))
        im.save(out, "JPEG", quality=88)
    return out


def outline_place(path: Path) -> dict | None:
    """What SAM 3.1 finds in a photo: steps, puddles, icy ground and ramps, each with its box (in pixels of
    the image SAM saw, `size`, and as fractions of it) and mask; steps numbered from the nearest (lowest
    in the photo). None for videos."""
    from concurrent.futures import ThreadPoolExecutor

    if path.suffix.lower() not in IMAGES:
        return None
    small = _upright(path, path.with_name(path.stem + "_sam.jpg"))
    with ThreadPoolExecutor(len(CONCEPTS)) as pool:
        found = dict(zip(CONCEPTS, pool.map(lambda c: client.segment(small, c, "world/sam"), CONCEPTS)))
    items = []
    for concept, res in found.items():
        w, h = res["w"] or 1, res["h"] or 1
        for b in res["boxes"]:
            if b["c"] >= MIN_CONF:
                x1, y1, x2, y2 = b["box"]
                items.append({"kind": concept, "label": CONCEPTS[concept], "c": b["c"], "px": [x1, y1, x2, y2],
                              "box": [round(x1 / w, 4), round(y1 / h, 4), round(x2 / w, 4), round(y2 / h, 4)],
                              **({"mask": b["mask"]} if "mask" in b else {})})
    steps = sorted((i for i in items if i["kind"] == "step"), key=lambda i: -i["box"][3])
    for n, st in enumerate(steps, 1):
        st["n"] = n
    size = next(([r["w"], r["h"]] for r in found.values() if r["w"]), [0, 0])
    return {"model": config.SAM, "size": size, "items": items, "steps": len(steps),
            "patches": sum(i["kind"] in ("puddle", "icy ground") for i in items), "ramps": sum(i["kind"] == "ramp" for i in items)}


def read_place(path: Path) -> dict:
    return client.respond([{"type": "input_text", "text": PROMPT}, media_item(path)],
                          model=config.vision_model(), schema=SCHEMA, reasoning="low", tag="world/read")


def as_attack_text(r: dict, outline: dict | None = None) -> str:
    """The reading (and SAM's count of what is in the photo) as an attack description for the same
    translator the text box uses."""
    parts = [f"The robot walks forward across {r['place']} ({r['surface']}): set foot friction to "
             f"{r['friction']:.2f} on all feet"]
    if outline and outline["steps"]:
        parts.append(f"segmentation of the photo counted exactly {outline['steps']} step"
                     f"{'s' if outline['steps'] > 1 else ''} up ahead: build exactly that many steps, at a "
                     "realistic height for this kind of place")
    if outline and outline["ramps"] and not outline["steps"]:
        parts.append("segmentation found a ramp ahead (model it as a gentle ramp)")
    if abs(r["slope_deg"]) >= 1:
        parts.append(f"an uphill slope of {r['slope_deg']:.0f} degrees")
    if r["slippery_patches"].strip().lower() not in ("none", ""):
        parts.append(f"slippery patches: {r['slippery_patches']} (model as an ice patch it walks onto)")
    hazards = r["hazards"].strip().lower()
    if hazards not in ("none", ""):
        bumps = any(w in hazards for w in BUMPERS)
        parts.append(f"hazards: {r['hazards']} (model uneven or loose ground as slightly lower friction and a "
                     "little sensor noise" + ("; bumps from people, pets or traffic as one moderate push)" if bumps
                                              else "; there is nobody to bump it, so NO pushes)"))
    return "; ".join(parts) + ". Model only what is described; do not add extra attacks."


BUMPERS = ("people", "person", "pedestrian", "crowd", "child", "kid", "dog", "cat", "pet", "bike", "cyclist",
           "traffic", "cart", "stroller")
