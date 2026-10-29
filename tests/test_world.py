"""Photo of a place: SAM 3.1 parsing and billing, step numbering, and the attack text it feeds Wonder."""

from pathlib import Path
from types import SimpleNamespace

import pytest
from PIL import Image

from nemesis.llm import client, ledger
from server import world as W

# Two steps as SAM 3.1 sends them (one-bit masks; payloads keep their leading length prefix, `=` included).
SAM_TEXT = ("<0f>0<|box;x1=85;y1=510;x2=382;y2=546;w=480;h=640;c=0.77|><|mask;x=0;y=0;c=0.77;data=37,298,!!!!#'Cy{IHLrN=&9|>,"
            "1<|box;x1=57;y1=587;x2=412;y2=627;w=480;h=640;c=0.86|><|mask;x=0;y=0;c=0.86;data=41,356,~!!!M[#K{|>")


@pytest.fixture
def fake_sam(tmp_path, monkeypatch):
    monkeypatch.setattr(ledger, "PATH", tmp_path / "spend.jsonl")
    monkeypatch.setattr(ledger, "_rows", None)
    monkeypatch.setattr(ledger, "_total", 0.0)
    monkeypatch.setattr(client, "LOG_PATH", tmp_path / "llm_log.jsonl")
    calls = []

    def create(**req):
        calls.append(req)
        text = SAM_TEXT if req["input"][0]["content"][0]["text"] == "step" else ""
        return SimpleNamespace(output_text=text, usage=SimpleNamespace(model_dump=lambda: {"images_processed": 1}))
    monkeypatch.setattr(client, "client", lambda: SimpleNamespace(responses=SimpleNamespace(create=create)))
    img = tmp_path / "place.jpg"
    Image.new("RGB", (480, 640), (90, 90, 90)).save(img)
    return img, calls


def test_segment_parses_boxes_masks_and_bills_per_image(fake_sam):
    img, calls = fake_sam
    out = client.segment(img, "step", "test/sam")
    assert calls[0]["model"] == "sam-3.1" and calls[0]["metadata"]["mask_encoding"] == "one_bit"
    assert (out["w"], out["h"]) == (480, 640)
    a, b = out["boxes"]
    assert a["box"] == [85, 510, 382, 546] and a["c"] == 0.77
    assert a["mask"] == {"encoding": "one_bit", "payload": "!!!!#'Cy{IHLrN=&9", "width": 298, "height": 37}
    assert b["mask"]["encoding"] == "lossless" and b["mask"]["payload"].startswith("~")
    assert ledger.total() == pytest.approx(ledger.SAM_PER_IMAGE)


def test_outline_numbers_steps_from_the_nearest(fake_sam):
    img, calls = fake_sam
    o = W.outline_place(img)
    assert len(calls) == len(W.CONCEPTS)  # one request per concept
    assert o["steps"] == 2 and o["patches"] == 0 and o["size"] == [480, 640]
    nearest = max(o["items"], key=lambda i: i["box"][3])
    assert nearest["n"] == 1 and nearest["px"] == [57, 587, 412, 627]
    assert W.outline_place(Path(str(img).replace(".jpg", ".mp4"))) is None  # videos skip SAM


def test_attack_text_carries_the_step_count():
    reading = {"place": "porch steps", "surface": "painted wood", "friction": 0.5, "slope_deg": 0,
               "slippery_patches": "none", "hazards": "none"}
    text = W.as_attack_text(reading, {"steps": 3, "ramps": 0, "patches": 0, "items": []})
    assert "exactly 3 steps" in text
    assert "segmentation" not in W.as_attack_text(reading, None)
