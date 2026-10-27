import { ArrowUp, Camera, Loader2, Mic, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toWav } from "../lib/api";

type Props = {
  onText: (text: string) => void;
  onVoice?: (wav: Blob) => void;
  onFile?: (file: File) => void;
  busy?: boolean;
  examples?: string[];
  accent?: string; // tailwind bg class for the send button
  prefill?: { text: string; n: number }; // set the text from outside (e.g. a clicked sample)
};

/** One input for an attack: type it, say it, or (optionally) show a photo of a place. */
export default function Composer({ onText, onVoice, onFile, busy, examples = [], accent = "bg-ember", prefill }: Props) {
  const [text, setText] = useState("");
  const [hint, setHint] = useState(0);
  const [rec, setRec] = useState<MediaRecorder | null>(null);
  const area = useRef<HTMLTextAreaElement>(null);
  const file = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (examples.length < 2) return;
    const t = setInterval(() => setHint((h) => (h + 1) % examples.length), 3200);
    return () => clearInterval(t);
  }, [examples.length]);

  useEffect(() => { if (prefill) { setText(prefill.text); area.current?.focus(); } }, [prefill?.n]);

  useEffect(() => {  // grow with the text
    const a = area.current; if (!a) return;
    a.style.height = "0px"; a.style.height = `${Math.min(a.scrollHeight, 200)}px`;
  }, [text]);

  const submit = () => { const t = text.trim(); if (t.length >= 3 && !busy) onText(t); };

  const mic = async () => {
    if (rec) { rec.stop(); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const r = new MediaRecorder(stream), chunks: Blob[] = [];
      r.ondataavailable = (e) => chunks.push(e.data);
      r.onstop = async () => { stream.getTracks().forEach((t) => t.stop()); setRec(null); onVoice?.(await toWav(new Blob(chunks))); };
      r.start(); setRec(r);
    } catch { /* no microphone */ }
  };

  return (
    <div className={`flex items-end gap-1 rounded-2xl border bg-panel py-2 pr-2 pl-4 transition-colors ${rec ? "border-ember/60" : "border-white/12 focus-within:border-white/30"}`}>
      <textarea ref={area} rows={1} value={text} disabled={busy}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
        placeholder={rec ? "Listening… tap stop when done" : examples[hint] || "Describe an attack"}
        className="block min-w-0 flex-1 resize-none self-center bg-transparent py-1.5 text-base leading-6 text-ink outline-none placeholder:text-mute/80 disabled:opacity-60" />
      <div className="flex shrink-0 items-center gap-0.5">
        {onVoice && (
          <button onClick={mic} disabled={busy} title={rec ? "Stop" : "Say it"}
            className={`grid size-9 place-items-center rounded-full transition-colors ${rec ? "bg-ember/15 text-ember" : "text-mute hover:bg-white/5 hover:text-ink"}`}>
            {rec ? <Square size={14} fill="currentColor" /> : <Mic size={17} strokeWidth={1.6} />}
          </button>
        )}
        {onFile && (
          <>
            <button onClick={() => file.current?.click()} disabled={busy} title="A photo of a real place"
              className="grid size-9 place-items-center rounded-full text-mute transition-colors hover:bg-white/5 hover:text-ink">
              <Camera size={17} strokeWidth={1.6} />
            </button>
            <input ref={file} type="file" accept="image/*,video/*" hidden
              onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ""; }} />
          </>
        )}
        <button onClick={submit} disabled={busy || text.trim().length < 3}
          className={`ml-1 grid size-9 place-items-center rounded-full transition-all ${text.trim().length >= 3 && !busy ? `${accent} text-black` : "bg-white/[.07] text-mute"}`}>
          {busy ? <Loader2 size={17} className="animate-spin" /> : <ArrowUp size={18} strokeWidth={2} />}
        </button>
      </div>
    </div>
  );
}
