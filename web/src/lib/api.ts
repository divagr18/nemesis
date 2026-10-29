export async function api<T = any>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.detail || res.statusText);
  return body as T;
}

export const post = <T = any>(url: string, data?: unknown) =>
  api<T>(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data ?? {}) });

export const upload = <T = any>(url: string, field: string, file: Blob, name: string) => {
  const fd = new FormData();
  fd.append(field, file, name);
  return api<T>(url, { method: "POST", body: fd });
};

/** Follows a server job's event stream until it ends; resolves with the final event. */
export function follow(job: string, onEvent: (e: any) => void): Promise<any> {
  return new Promise((resolve) => {
    const es = new EventSource(`/api/jobs/${job}/events`);
    es.onmessage = (m) => {
      const e = JSON.parse(m.data);
      onEvent(e);
      if (e.stage === "done" || e.stage === "failed") { es.close(); resolve(e); }
    };
  });
}

export const pct = (x?: number) => `${Math.round((x ?? 0) * 100)}%`;

/** Records the mic and returns 16 kHz mono 16-bit PCM WAV, what Muse Voice Transcribe expects. */
export async function toWav(blob: Blob): Promise<Blob> {
  const ctx = new AudioContext();
  const buf = await ctx.decodeAudioData(await blob.arrayBuffer());
  const off = new OfflineAudioContext(1, Math.ceil(buf.duration * 16000), 16000);
  const src = off.createBufferSource();
  src.buffer = buf; src.connect(off.destination); src.start();
  const pcm = (await off.startRendering()).getChannelData(0);
  const out = new DataView(new ArrayBuffer(44 + pcm.length * 2));
  const w = (o: number, s: string) => [...s].forEach((c, i) => out.setUint8(o + i, c.charCodeAt(0)));
  w(0, "RIFF"); out.setUint32(4, 36 + pcm.length * 2, true); w(8, "WAVEfmt ");
  out.setUint32(16, 16, true); out.setUint16(20, 1, true); out.setUint16(22, 1, true);
  out.setUint32(24, 16000, true); out.setUint32(28, 32000, true); out.setUint16(32, 2, true); out.setUint16(34, 16, true);
  w(36, "data"); out.setUint32(40, pcm.length * 2, true);
  pcm.forEach((v, i) => out.setInt16(44 + i * 2, Math.max(-1, Math.min(1, v)) * 0x7fff, true));
  return new Blob([out], { type: "audio/wav" });
}

/** Starts a streamed server job (an endpoint called with ?stream=1) and resolves with its result,
 *  reporting each step as it happens. */
export async function runJob(start: Promise<{ job: string }>, onStep: (step: string) => void,
                             onEvent?: (e: any) => void): Promise<any> {
  const { job } = await start;
  const end = await follow(job, (e) => { if (e.stage === "step") { onStep(e.step); onEvent?.(e); } });
  if (end.stage === "failed") throw new Error(end.error || "failed");
  return end.result;
}
