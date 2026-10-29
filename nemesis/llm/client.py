"""Meta Model API client: text/JSON calls, video and audio inputs, transcription.

With NEMESIS_OPEN=1 the same calls go to self-hosted open-weight models (Muse Glimmer, Muse Spark
Open) behind an OpenAI-compatible chat API (llama.cpp); video is sent as sampled frames.

Every call is cached on disk (keyed by the full request) and appended to
runs/llm_log.jsonl with a timestamp, so agent output can be replayed in the demo video.
"""

import base64
import hashlib
import json
import os
import time
from pathlib import Path

import httpx
import numpy as np
from openai import OpenAI

from nemesis import config
from nemesis.llm import ledger

LOG_PATH = Path("runs/llm_log.jsonl")
CACHE_DIR = Path("runs/llm_cache")

_client: OpenAI | None = None


def client() -> OpenAI:
    global _client
    if _client is None:
        _client = OpenAI(base_url=config.META_BASE_URL, api_key=config.api_key(), max_retries=2,
                         timeout=300)
    return _client


def _log(entry: dict) -> None:
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(LOG_PATH, "a") as f:
        f.write(json.dumps(entry) + "\n")


def _cache_key(payload: dict) -> str:
    return hashlib.sha256(json.dumps(payload, sort_keys=True).encode()).hexdigest()[:32]


_local: dict[str, OpenAI] = {}


def local_client(model: str) -> OpenAI:
    if model not in _local:
        url = config.LOCAL_MODELS[model]
        if not url:
            raise RuntimeError(f"no server for {model} (set NEMESIS_SPARK_OPEN_URL)")
        _local[model] = OpenAI(base_url=url, api_key="local", max_retries=2, timeout=900)
    return _local[model]


def glimmer_client() -> OpenAI:
    return local_client(config.GLIMMER)


def _chat_content(items: list) -> str | list:
    """Responses-API content items -> chat-completions content (frames become images)."""
    out = []
    for c in items:
        if c["type"] == "input_text":
            out.append({"type": "text", "text": c["text"]})
        elif c["type"] == "input_image":
            out.append({"type": "image_url", "image_url": {"url": c["image_url"]}})
        elif c["type"] == "input_frames":
            for t, url in c["frames"]:
                out += [{"type": "text", "text": f"[frame at t={t:.1f} s]"},
                        {"type": "image_url", "image_url": {"url": url}}]
        else:
            raise ValueError(f"{c['type']} is API-only; build it with video_item/image_item")
    if all(c["type"] == "text" for c in out):
        return "\n\n".join(c["text"] for c in out)
    return out


def _local_chat(req: dict) -> tuple[str, dict | None]:
    """Glimmer or Spark Open through an OpenAI-compatible chat API (llama.cpp, vLLM).
    Reasoning effort and sampling follow each model card: Glimmer reads the effort from the
    system prompt, Spark Open from a chat-template kwarg."""
    model = req["model"]
    effort = {"minimal": "low", "low": "low", "medium": "medium", "high": "high", "max": "xhigh"}
    effort = effort.get(req.get("reasoning", {}).get("effort", "high"), "high")
    system = f"Reasoning strength: {effort}" if model == config.GLIMMER else ""
    if req.get("instructions"):
        system = (system + "\n\n" + req["instructions"]).strip()
    kw = {}
    fmt = req.get("text", {}).get("format", {})
    if fmt.get("type") == "json_schema":
        kw["response_format"] = {"type": "json_schema", "json_schema": {
            "name": fmt["name"], "schema": fmt["schema"]}}
    elif fmt.get("type") == "json_object":
        kw["response_format"] = {"type": "json_object"}
    if model == config.GLIMMER:
        kw.update(temperature=1.0, top_p=0.95, extra_body={"top_k": 64})
    else:
        kw.update(temperature=1.0, top_p=1.0,
                  extra_body={"chat_template_kwargs": {"reasoning_effort": effort}})
    messages = ([{"role": "system", "content": system}] if system else []) + [
        {"role": "user", "content": _chat_content(req["input"][0]["content"])}]
    resp = local_client(model).chat.completions.create(model=model, messages=messages,
                                                       max_tokens=16384, **kw)
    return resp.choices[0].message.content, resp.usage.model_dump() if resp.usage else None


def cache_hint(tag: str) -> dict:
    """Meta's prompt-cache hints. Caching is automatic, but without them two back-to-back translate calls
    cached nothing; with them the second served 7,782 of 7,826 input tokens from cache (Oct 29), at 1/20
    of the input price. Prompts keep their fixed part first and the visitor's text last."""
    return {"prompt_cache_key": f"nemesis-{tag}", "prompt_cache_retention": "24h"}


def respond(
    prompt: str | list,
    model: str | None = None,
    instructions: str | None = None,
    schema: dict | None = None,
    reasoning: str | None = None,
    tag: str = "",
    cache: bool = True,
    json_only: bool = False,
):
    """One Responses API call. Returns parsed JSON when `schema` is given, else text.

    `prompt` is a string or a list of content items (input_text / input_file / input_video ...).
    `model` defaults to config.vision_model() (Spark, or its open-weight stand-in).
    `json_only` grammar-constrains a local model to valid JSON (the 4-bit Glimmer occasionally
    mismatches brackets in long JSON); the API path ignores it.
    """
    model = model or config.vision_model()
    content = [{"type": "input_text", "text": prompt}] if isinstance(prompt, str) else prompt
    req = {"model": model, "input": [{"type": "message", "role": "user", "content": content}]}
    if instructions:
        req["instructions"] = instructions
    if schema:
        req["text"] = {"format": {"type": "json_schema", "name": schema.get("title", "output"),
                                  "schema": schema, "strict": True}}
    elif json_only and model in config.LOCAL_MODELS:
        req["text"] = {"format": {"type": "json_object"}}
    if reasoning:
        req["reasoning"] = {"effort": reasoning}

    key = _cache_key(req)
    path = CACHE_DIR / f"{key}.json"
    if model == config.WONDER and tag:
        req["extra_body"] = cache_hint(tag)
    if cache and path.exists():
        out = json.loads(path.read_text())
    else:
        t0 = time.time()
        if model in config.LOCAL_MODELS:
            text, usage = _local_chat(req)
        else:
            ledger.guard()
            resp = client().responses.create(**req)
            text, usage = resp.output_text, resp.usage.model_dump() if resp.usage else None
            ledger.record(model, usage, tag)
        out = {"text": text, "usage": usage, "latency_s": round(time.time() - t0, 2)}
        CACHE_DIR.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(out))
        _log({"ts": time.time(), "tag": tag, "model": model, "key": key,
              "prompt": prompt if isinstance(prompt, str) else "[multimodal]",
              "output": out["text"], "usage": out["usage"], "latency_s": out["latency_s"]})
    return json.loads(out["text"]) if schema else out["text"]


def segment(path: str | Path, concept: str, tag: str = "sam") -> dict:
    """SAM 3.1 on one image for one short noun phrase ("step"): every match as a pixel box with its
    confidence and its mask as sent (one-bit, base85, covering the box; the page decodes it with Meta's
    @meta-sam/parser), plus the image size."""
    import re

    ledger.guard()
    resp = client().responses.create(
        model=config.SAM, metadata={"include_confidence": "true", "mask_encoding": "one_bit"},
        input=[{"type": "message", "role": "user", "content": [
            {"type": "input_text", "text": concept}, image_item(path)]}])
    ledger.record(config.SAM, resp.usage.model_dump() if resp.usage else {"images_processed": 1}, tag)
    out = {"w": 0, "h": 0, "boxes": []}
    for box, mask in re.findall(r"<\|box;([^|]*)\|>(?:<\|mask;([^|]*)\|>)?", resp.output_text or ""):
        f = dict(kv.split("=", 1) for kv in box.split(";") if "=" in kv)
        out["w"], out["h"] = int(f["w"]), int(f["h"])
        item = {"box": [int(f["x1"]), int(f["y1"]), int(f["x2"]), int(f["y2"])], "c": round(float(f.get("c", 1.0)), 3)}
        data = dict(kv.split("=", 1) for kv in mask.split(";") if "=" in kv).get("data", "")
        if data.count(",") >= 2:  # "H,W,<payload>"; the payload is kept whole (a leading ~ means lossless)
            h, w, payload = data.split(",", 2)
            item["mask"] = {"encoding": "lossless" if payload.startswith("~") else "one_bit", "payload": payload,
                            "width": int(w), "height": int(h)}
        out["boxes"].append(item)
    _log({"ts": time.time(), "tag": tag, "model": config.SAM, "prompt": concept, "output": out})
    return out


def upload(path: str | Path) -> str:
    """Uploads a file (e.g. an mp4) for use as input_file; returns its file id."""
    with open(path, "rb") as f:
        return client().files.create(file=f, purpose="user_data").id


def video_frames(path: str | Path, n: int = 12) -> list[tuple[float, str]]:
    """n evenly spaced frames of a clip as (time in s, JPEG data URL)."""
    import io

    import mediapy
    from PIL import Image

    video = mediapy.read_video(str(path))
    fps = video.metadata.fps if video.metadata else 25.0
    out = []
    for i in np.linspace(0, len(video) - 1, min(n, len(video))).round().astype(int):
        buf = io.BytesIO()
        Image.fromarray(video[i]).save(buf, format="JPEG", quality=85)
        out.append((i / fps, "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()))
    return out


def video_item(path: str | Path, model: str | None = None, frames: int = 12) -> dict:
    """A clip as input for `model`: an uploaded file for the API, sampled frames for a local
    model (every OpenAI-compatible server takes images; native video support varies)."""
    if (model or config.vision_model()) in config.LOCAL_MODELS:
        return {"type": "input_frames", "frames": video_frames(path, frames)}
    return {"type": "input_file", "file_id": upload(path)}


def image_item(path: str | Path) -> dict:
    """An inline image (jpg/png/webp), for the API or a local model."""
    ext = Path(path).suffix.lstrip(".").lower()
    data = base64.b64encode(Path(path).read_bytes()).decode()
    return {"type": "input_image", "image_url": f"data:image/{'jpeg' if ext == 'jpg' else ext};base64,{data}"}


def audio_item(path: str | Path) -> dict:
    """Inline audio (wav/mp3) for Spark 1.2, which handles audio best."""
    data = base64.b64encode(Path(path).read_bytes()).decode()
    fmt = Path(path).suffix.lstrip(".")
    return {"type": "input_audio", "input_audio": {"data": data, "format": fmt}}


def transcribe(path: str | Path, tag: str = "voice") -> str:
    """Muse Voice Transcribe on a mono 16-bit PCM WAV (16 or 24 kHz, at most 10 min).
    Open mode has no Meta speech model to self-host, so it uses Whisper (faster-whisper, CPU)."""
    if config.OPEN:
        return _whisper(path, tag)
    ledger.guard()
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
    ledger.record_audio(wav_seconds(path), tag)
    _log({"ts": time.time(), "tag": tag, "model": config.TRANSCRIBE, "output": text})
    return text


def wav_seconds(path: str | Path) -> float:
    """Length of a WAV file in seconds (0 if it can't be read)."""
    import wave

    try:
        with wave.open(str(path)) as w:
            return w.getnframes() / float(w.getframerate())
    except Exception:  # noqa: BLE001  (billing estimate only)
        return 0.0


_whisper_model = None


def _whisper(path: str | Path, tag: str) -> str:
    global _whisper_model
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        raise RuntimeError("voice in open mode needs `pip install faster-whisper` (or unset NEMESIS_OPEN)")
    if _whisper_model is None:
        _whisper_model = WhisperModel(os.environ.get("NEMESIS_WHISPER", "base.en"), device="cpu",
                                      compute_type="int8")
    import wave

    # Decode the PCM WAV ourselves: faster-whisper 1.2.1's PyAV decoder breaks with av 19.
    with wave.open(str(path)) as w:
        rate, ch = w.getframerate(), w.getnchannels()
        pcm = np.frombuffer(w.readframes(w.getnframes()), np.int16).reshape(-1, ch).mean(1) / 32768
    audio = np.interp(np.arange(0, len(pcm), rate / 16000), np.arange(len(pcm)), pcm).astype(np.float32)
    t0 = time.time()
    segments, _ = _whisper_model.transcribe(audio, beam_size=1)
    text = " ".join(seg.text.strip() for seg in segments)
    _log({"ts": time.time(), "tag": tag, "model": "faster-whisper", "output": text,
          "latency_s": round(time.time() - t0, 2)})
    return text
