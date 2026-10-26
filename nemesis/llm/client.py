"""Meta Model API client: text/JSON calls, video and audio inputs, transcription.

Every call is cached on disk (keyed by the full request) and appended to
runs/llm_log.jsonl with a timestamp, so agent output can be replayed in the demo video.
"""

import base64
import hashlib
import json
import time
from pathlib import Path

import httpx
from openai import OpenAI

from nemesis import config

LOG_PATH = Path("runs/llm_log.jsonl")
CACHE_DIR = Path("runs/llm_cache")

_client: OpenAI | None = None


def client() -> OpenAI:
    global _client
    if _client is None:
        _client = OpenAI(base_url=config.META_BASE_URL, api_key=config.api_key(), max_retries=4,
                         timeout=300)
    return _client


def _log(entry: dict) -> None:
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(LOG_PATH, "a") as f:
        f.write(json.dumps(entry) + "\n")


def _cache_key(payload: dict) -> str:
    return hashlib.sha256(json.dumps(payload, sort_keys=True).encode()).hexdigest()[:32]


def respond(
    prompt: str | list,
    model: str = config.SPARK,
    instructions: str | None = None,
    schema: dict | None = None,
    reasoning: str | None = None,
    tag: str = "",
    cache: bool = True,
):
    """One Responses API call. Returns parsed JSON when `schema` is given, else text.

    `prompt` is a string or a list of content items (input_text / input_file / input_video ...).
    """
    content = [{"type": "input_text", "text": prompt}] if isinstance(prompt, str) else prompt
    req = {"model": model, "input": [{"type": "message", "role": "user", "content": content}]}
    if instructions:
        req["instructions"] = instructions
    if schema:
        req["text"] = {"format": {"type": "json_schema", "name": schema.get("title", "output"),
                                  "schema": schema, "strict": True}}
    if reasoning:
        req["reasoning"] = {"effort": reasoning}

    key = _cache_key(req)
    path = CACHE_DIR / f"{key}.json"
    if cache and path.exists():
        out = json.loads(path.read_text())
    else:
        t0 = time.time()
        resp = client().responses.create(**req)
        out = {"text": resp.output_text,
               "usage": resp.usage.model_dump() if resp.usage else None,
               "latency_s": round(time.time() - t0, 2)}
        CACHE_DIR.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(out))
        _log({"ts": time.time(), "tag": tag, "model": model, "key": key,
              "prompt": prompt if isinstance(prompt, str) else "[multimodal]",
              "output": out["text"], "usage": out["usage"], "latency_s": out["latency_s"]})
    return json.loads(out["text"]) if schema else out["text"]


def upload(path: str | Path) -> str:
    """Uploads a file (e.g. an mp4) for use as input_file; returns its file id."""
    with open(path, "rb") as f:
        return client().files.create(file=f, purpose="user_data").id


def video_item(path: str | Path) -> dict:
    return {"type": "input_file", "file_id": upload(path)}


def audio_item(path: str | Path) -> dict:
    """Inline audio (wav/mp3) for Spark 1.2, which handles audio best."""
    data = base64.b64encode(Path(path).read_bytes()).decode()
    fmt = Path(path).suffix.lstrip(".")
    return {"type": "input_audio", "input_audio": {"data": data, "format": fmt}}


def transcribe(path: str | Path, tag: str = "voice") -> str:
    """Muse Voice Transcribe on a mono 16-bit PCM WAV (16 or 24 kHz, at most 10 min)."""
    request = {"mode": "PUSH_TO_TALK", "model": config.TRANSCRIBE, "audioEncoding": "WAV"}
    with open(path, "rb") as f:
        r = httpx.post(f"{config.META_BASE_URL}/asr/transcribe",
                       headers={"Authorization": f"Bearer {config.api_key()}"},
                       files={"request": (None, json.dumps(request), "application/json"),
                              "audio": (Path(path).name, f, "audio/wav")},
                       timeout=120)
    if r.status_code >= 400:
        raise RuntimeError(f"transcribe failed ({r.status_code}): {r.text[:300]}")
    text = r.json()["transcript"]
    _log({"ts": time.time(), "tag": tag, "model": config.TRANSCRIBE, "output": text})
    return text
