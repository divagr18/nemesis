"""Background jobs with live event streams (server-sent events).

A job is an append-only list of events: the page subscribes to
GET /api/jobs/<id>/events and receives every event so far, then each new one as it happens, so a
reload mid-job replays the whole story.
"""

import asyncio
import json
import time
import uuid
from dataclasses import dataclass, field


@dataclass
class Job:
    kind: str
    id: str = field(default_factory=lambda: uuid.uuid4().hex[:10])
    status: str = "queued"  # queued | running | done | failed
    events: list = field(default_factory=list)
    result: dict | None = None
    created: float = field(default_factory=time.time)
    async def emit(self, stage: str, **data):
        self.events.append({"stage": stage, "t": round(time.time(), 2), **data})

    async def finish(self, status: str, result: dict | None = None):
        self.status, self.result = status, result
        await self.emit(status, **(result or {}))

    def summary(self) -> dict:
        return {"id": self.id, "kind": self.kind, "status": self.status, "created": self.created,
                "events": len(self.events), "result": self.result}

    async def stream(self, start: int = 0):
        """Yields SSE frames: the backlog, then live events, until the job ends. Polls (cheap, and
        immune to the cancellation edge cases of waiting on a condition with a timeout)."""
        i, idle = start, 0.0
        yield "retry: 2000\n\n"
        while True:
            batch, first, i = self.events[i:], i, len(self.events)
            for n, e in enumerate(batch, first + 1):  # id = events delivered so far, for resuming
                yield f"id: {n}\ndata: {json.dumps(e)}\n\n"
            if self.status in ("done", "failed") and i >= len(self.events):
                return
            idle = 0.0 if batch else idle + 0.5
            if idle >= 15:
                idle = 0.0
                yield ": keep-alive\n\n"
            await asyncio.sleep(0.5)


JOBS: dict[str, Job] = {}


def new(kind: str) -> Job:
    job = Job(kind)
    JOBS[job.id] = job
    if len(JOBS) > 500:  # keep memory bounded on a long-running public server
        for k in sorted(JOBS, key=lambda k: JOBS[k].created)[:100]:
            JOBS.pop(k)
    return job


def spawn(job: Job, coro):
    """Runs `coro` in the background; an exception fails the job instead of vanishing."""
    async def run():
        job.status = "running"
        try:
            await coro
        except Exception as e:  # noqa: BLE001  (surface every failure to the page)
            await job.finish("failed", {"error": f"{type(e).__name__}: {str(e)[:300]}"})
    return asyncio.create_task(run())
