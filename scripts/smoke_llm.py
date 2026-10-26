"""Smoke-test the Meta models used by Nemesis (costs a few cents).

usage: python scripts/smoke_llm.py <video.mp4> <audio.wav>
"""

import sys

from nemesis import config
from nemesis.llm import client

video, audio = sys.argv[1], sys.argv[2]

schema = {
    "title": "hypothesis",
    "type": "object",
    "properties": {
        "weakness": {"type": "string"},
        "attack": {"type": "string"},
        "severity": {"type": "number"},
    },
    "required": ["weakness", "attack", "severity"],
    "additionalProperties": False,
}
print("== Wonder (JSON schema)")
print(client.respond(
    "A quadruped robot policy was trained on flat ground with mild friction randomization. "
    "Propose one physically plausible condition most likely to make it fall.",
    model=config.WONDER, schema=schema, reasoning="low", tag="smoke/wonder", cache=False))

print("== Spark (video)")
print(client.respond(
    [{"type": "input_text", "text": "Describe what the robot in this video does in two sentences. "
                                    "Is it walking forward, standing still, or falling?"},
     client.video_item(video)],
    model=config.SPARK, tag="smoke/spark-video", cache=False))

print("== Voice Transcribe")
print(client.transcribe(audio, tag="smoke/transcribe"))
