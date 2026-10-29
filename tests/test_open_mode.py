"""NEMESIS_OPEN=1: every model call goes to the self-hosted Glimmer server, never to Meta's API."""

from types import SimpleNamespace

import pytest

from nemesis import config
from nemesis.llm import client, ledger


@pytest.fixture
def open_mode(tmp_path, monkeypatch):
    """Open mode with a fake llama.cpp server; Meta's client raises if anything touches it."""
    monkeypatch.setattr(config, "OPEN", True)
    monkeypatch.setattr(config, "SPARK_OPEN_URL", None)
    monkeypatch.setattr(client, "LOG_PATH", tmp_path / "llm_log.jsonl")
    monkeypatch.setattr(client, "CACHE_DIR", tmp_path / "llm_cache")
    monkeypatch.setattr(ledger, "PATH", tmp_path / "spend.jsonl")
    monkeypatch.setattr(ledger, "_rows", None)
    monkeypatch.setattr(ledger, "_total", 0.0)

    def meta():
        raise AssertionError("Meta API client used in open mode")
    monkeypatch.setattr(client, "client", meta)
    calls = []

    def create(**req):
        calls.append(req)
        return SimpleNamespace(choices=[SimpleNamespace(message=SimpleNamespace(content='{"ok": true, "category": "none"}'))],
                               usage=SimpleNamespace(model_dump=lambda: {"prompt_tokens": 10, "completion_tokens": 5}))
    fake = SimpleNamespace(chat=SimpleNamespace(completions=SimpleNamespace(create=create)))
    monkeypatch.setattr(client, "_local", {config.GLIMMER: fake})
    return calls


def test_roles_go_to_glimmer(open_mode):
    assert config.text_model() == config.vision_model() == config.GLIMMER
    assert config.name(config.text_model()) == "Muse Glimmer"
    assert config.transcriber_name() == "Whisper"


def test_api_mode_names(monkeypatch):
    monkeypatch.setattr(config, "OPEN", False)
    assert config.name(config.text_model()) == "Muse Wonder"
    assert config.name(config.vision_model()) == "Muse Spark"
    assert config.transcriber_name() == "Muse Voice Transcribe"


def test_schema_call_is_local_and_free(open_mode):
    schema = {"title": "verdict", "type": "object", "properties": {"ok": {"type": "boolean"}}, "required": ["ok"]}
    out = client.respond("is this fine?", model=config.text_model(), instructions="Moderate.", schema=schema,
                         reasoning="low", tag="test/open")
    assert out == {"ok": True, "category": "none"}
    (req,) = open_mode
    assert req["model"] == config.GLIMMER
    assert req["messages"][0] == {"role": "system", "content": "Reasoning strength: low\n\nModerate."}
    assert req["response_format"]["json_schema"]["schema"] == schema
    assert ledger.total() == 0  # nothing billed, nothing guarded


def test_moderation_uses_glimmer(open_mode):
    from server import moderation

    assert moderation._model() == config.GLIMMER


def test_voice_uses_whisper_in_its_own_dir(open_mode, tmp_path, monkeypatch):
    """llama.cpp's container owns ~/.cache/huggingface/hub as root, so Whisper downloads elsewhere."""
    import sys
    import wave

    import numpy as np

    made = {}

    class Whisper:
        def __init__(self, name, **kw):
            made.update(name=name, **kw)

        def transcribe(self, audio, **kw):
            assert audio.dtype == np.float32 and len(audio) == 16000  # 1 s resampled to 16 kHz
            return [SimpleNamespace(text=" kick it ")], None
    monkeypatch.setitem(sys.modules, "faster_whisper", SimpleNamespace(WhisperModel=Whisper))
    monkeypatch.setattr(client, "_whisper_model", None)
    monkeypatch.setattr(client, "WHISPER_DIR", str(tmp_path / "whisper"))
    path = tmp_path / "v.wav"
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1), w.setsampwidth(2), w.setframerate(24000)
        w.writeframes(np.zeros(24000, np.int16).tobytes())
    assert client.transcribe(path) == "kick it"
    assert made["download_root"] == str(tmp_path / "whisper")
    assert ledger.total() == 0


def test_photo_skips_sam(open_mode, tmp_path):
    from server import world

    img = tmp_path / "place.jpg"
    img.write_bytes(b"not read")
    assert world.outline_place(img) is None
