import { ArrowUp, Check, Loader2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import PatchPanelInline from "../components/PatchInline";
import Replay from "../components/Replay";
import { follow, pct, post } from "../lib/api";

type Ev = { stage: string; [k: string]: any };
type Output = { id: string; hypothesis: string; fall_rate: number; trajs: any[] | null; clip: string; diagnosis?: any; margin?: any };

const SUGGEST = ["Slipping while turning", "Carrying a heavy backpack", "Weak motors on one side"];

/** Agent mode: a chat with Muse on the left, the outputs it produces (3D replays, diagnoses, margins) on the right. */
export default function Agent() {
  const [prompt, setPrompt] = useState<string | null>(null);
  const [events, setEvents] = useState<Ev[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const start = async (goal: string) => {
    setPrompt(goal); setRunning(true); setError(""); setEvents([]); setSelected(null);
    try {
      const { job } = await post("/api/agent", { goal });
      await follow(job, (e) => setEvents((xs) => (e.stage === "progress" && xs.at(-1)?.stage === "progress" ? [...xs.slice(0, -1), e] : [...xs, e])));
    } catch (e: any) { setError(e.message); }
    setRunning(false);
  };

  useEffect(() => {  // /agent?q=… starts (or joins) an investigation directly: shareable, and handy for filming
    const q = new URLSearchParams(location.search).get("q");
    if (q) start(q);
  }, []);

  // Outputs: every failure the agent found, enriched with Spark's diagnosis and the measured margin.
  const outputs = useMemo(() => {
    const out: Record<string, Output> = {};
    for (const e of events) {
      if (e.stage === "failure") out[e.id] = { id: e.id, hypothesis: e.hypothesis, fall_rate: e.fall_rate, trajs: e.trajs, clip: e.clip };
      if (e.stage === "diagnosis" && out[e.id]) out[e.id].diagnosis = e;
      if (e.stage === "margin" && out[e.id]) out[e.id].margin = e;
    }
    return Object.values(out);
  }, [events]);
  const current = outputs.find((o) => o.id === selected) || outputs.at(-1);
  useEffect(() => { if (outputs.length) setSelected(outputs.at(-1)!.id); }, [outputs.length]);

  if (prompt === null) {
    return (
      <div className="mx-auto flex min-h-[calc(100dvh-10rem)] max-w-2xl flex-col justify-center pb-16">
        <h1 className="text-center text-[40px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[52px]">
          What should Muse test?
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-base leading-[1.55] text-ink/70">
          Muse forms hypotheses, simulates them on the live robot, watches every fall, and retrains it.
        </p>
        <div className="mt-10"><ChatInput onSend={start} /></div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {SUGGEST.map((s) => (
            <button key={s} onClick={() => start(s)}
              className="rounded-full border border-white/12 bg-white/[.04] px-3 py-1.5 text-[13px] text-ink/85 transition-colors hover:border-white/30 hover:bg-white/[.09]">{s}</button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:h-[calc(100dvh-8.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
      {/* chat */}
      <section className="flex min-h-[60dvh] flex-col overflow-hidden rounded-2xl border border-line bg-panel lg:min-h-0">
        <Chat prompt={prompt} events={events} running={running} error={error} selected={current?.id} onSelect={setSelected} />
        <div className="border-t border-line p-3"><ChatInput onSend={start} disabled={running} placeholder={running ? "Muse is working…" : "Ask Muse to test something else"} /></div>
      </section>

      {/* outputs */}
      <section className="flex min-h-[60dvh] flex-col overflow-hidden rounded-2xl border border-line bg-panel lg:min-h-0">
        {current ? <Viewer o={current} /> : (
          <div className="grid flex-1 place-items-center p-8 text-center">
            <div>
              {running ? <Loader2 size={20} className="mx-auto animate-spin text-faint" /> : null}
              <p className="mt-3 text-sm text-mute">{running ? "Failures Muse finds will play here." : "No failures found."}</p>
            </div>
          </div>
        )}
        {outputs.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-t border-line p-3">
            {outputs.map((o, i) => (
              <button key={o.id} onClick={() => setSelected(o.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] transition-colors ${o.id === current?.id ? "border-white/30 bg-white/10 text-ink" : "border-white/10 text-mute hover:text-ink"}`}>
                <span className="font-mono text-xs text-faint">{i + 1}</span> fell {pct(o.fall_rate)}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ChatInput({ onSend, disabled, placeholder = "e.g. slipping while turning" }: { onSend: (t: string) => void; disabled?: boolean; placeholder?: string }) {
  const [t, setT] = useState("");
  const send = () => { if (t.trim().length >= 2 && !disabled) { onSend(t.trim()); setT(""); } };
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/12 bg-bg py-2 pr-2 pl-4 focus-within:border-white/30">
      <input value={t} onChange={(e) => setT(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} disabled={disabled}
        placeholder={placeholder} className="min-w-0 flex-1 bg-transparent py-1.5 text-base outline-none placeholder:text-mute/80 disabled:opacity-60" />
      <button onClick={send} disabled={disabled || t.trim().length < 2}
        className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors ${t.trim().length >= 2 && !disabled ? "bg-ember text-black" : "bg-white/[.07] text-mute"}`}>
        <ArrowUp size={18} />
      </button>
    </div>
  );
}

/** The conversation: Muse's narration as messages, tool work as compact step rows. */
function Chat({ prompt, events, running, error, selected, onSelect }: { prompt: string; events: Ev[]; running: boolean; error: string; selected?: string; onSelect: (id: string) => void }) {
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [events.length]);

  // A hypothesis test is one row that resolves when its result arrives.
  const items: any[] = [];
  let pending: any = null;
  for (const e of events) {
    if (e.stage === "say") items.push({ kind: "say", text: e.text });
    else if (e.stage === "tool_call" && e.tool === "test_hypothesis") { pending = { kind: "test", text: e.args.hypothesis, state: "run" }; items.push(pending); }
    else if (e.stage === "failure" && pending) { pending.state = "fell"; pending.id = e.id; pending.rate = e.fall_rate; pending = null; }
    else if (e.stage === "tool_result" && e.tool === "test_hypothesis" && pending) {
      pending.state = e.result.error ? "error" : "held"; pending.rate = e.result.fall_rate; pending = null;
    }
    else if (e.stage === "diagnosis") items.push({ kind: "spark", e });
    else if (e.stage === "margin") items.push({ kind: "margin", e });
    else if (e.stage === "tool_call" && e.tool === "patch") items.push({ kind: "patch" });
    else if (["bank", "training", "progress", "gating", "verified", "rejected"].includes(e.stage)) items.push({ kind: "patchev", e });
    else if (e.stage === "done" && e.summary) items.push({ kind: "summary", text: e.summary });
    else if (e.stage === "failed") items.push({ kind: "error", text: e.error });
  }
  const patchEvents = items.filter((i) => i.kind === "patchev").map((i) => i.e);

  return (
    <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
      <div className="flex justify-end"><p className="max-w-[85%] rounded-2xl rounded-br-md bg-white/[.08] px-4 py-2.5 text-[15px]">{prompt}</p></div>
      {items.map((it, i) => {
        switch (it.kind) {
          case "say": case "summary":
            return <p key={i} className="rise whitespace-pre-line text-[15px] leading-[1.6] text-ink/90">{it.text}</p>;
          case "test":
            return (
              <button key={i} onClick={() => it.id && onSelect(it.id)} disabled={!it.id}
                className={`rise flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors ${it.id && it.id === selected ? "border-white/25 bg-white/[.05]" : "border-line"} ${it.id ? "hover:border-white/25" : ""}`}>
                <span className="mt-0.5 shrink-0">
                  {it.state === "run" ? <Loader2 size={15} className="animate-spin text-mute" /> :
                    it.state === "fell" ? <i className="block size-[15px] rounded-full bg-ember" /> :
                    it.state === "held" ? <Check size={15} className="text-acid" /> : <X size={15} className="text-faint" />}
                </span>
                <span className="min-w-0 flex-1 text-[14px] leading-snug text-mute">{it.text}</span>
                <span className={`shrink-0 font-mono text-xs ${it.state === "fell" ? "text-ember" : it.state === "held" ? "text-acid" : "text-faint"}`}>
                  {it.state === "run" ? "testing" : it.state === "fell" ? `fell ${pct(it.rate)}` : it.state === "held" ? `held ${pct(it.rate)}` : "retry"}
                </span>
              </button>
            );
          case "spark":
            return (
              <div key={i} className="rise border-l-2 border-peri/60 pl-4">
                <p className="text-[13px] text-peri">Muse Spark watched the fall</p>
                <p className="mt-1 text-[14px] leading-relaxed text-mute"><span className="text-ink">{it.e.mode}.</span> {it.e.likely_cause}</p>
              </div>
            );
          case "margin":
            return <p key={i} className="rise text-[14px] text-mute">Falls begin at <span className="font-mono text-ink">{fmt(it.e.starts_falling_at)}</span> {it.e.condition.replace(/_/g, " ")}.</p>;
          case "patch":
            return <PatchPanelInline key={i} events={patchEvents} />;
          case "error":
            return <p key={i} className="text-sm text-ember">{it.text}</p>;
          default:
            return null;
        }
      })}
      {running && <p className="flex items-center gap-2 text-sm text-faint"><span className="blink text-ember">●</span> thinking</p>}
      {error && <p className="text-sm text-ember">{error}</p>}
      <div ref={end} />
    </div>
  );
}

function Viewer({ o }: { o: Output }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative min-h-[300px] flex-1 bg-[#0b0d12]">
        {o.trajs ? <Replay key={o.id} trajs={o.trajs.map((t: any, i: number) => ({ url: t.url, label: i === 0 ? "original" : t.label }))} className="absolute inset-0" />
          : <video key={o.id} src={o.clip} autoPlay muted loop playsInline className="absolute inset-0 size-full object-contain" />}
      </div>
      <div className="space-y-3 border-t border-line px-5 py-4">
        <p className="text-[15px] leading-snug">{o.hypothesis}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-mute">
          <span>Fell in <span className="text-ember">{pct(o.fall_rate)}</span> of tries</span>
          {o.margin && (
            <span className="flex items-center gap-2">
              Margin
              <span className="flex h-4 items-end gap-[2px]">
                {o.margin.curve.map((c: any, i: number) => <i key={i} style={{ height: `${Math.max(15, c.fall_rate * 100)}%` }} className={`block w-1.5 ${c.fall_rate >= 0.5 ? "bg-ember" : "bg-white/20"}`} />)}
              </span>
              <span className="font-mono text-xs text-ink">{fmt(o.margin.starts_falling_at)}</span>
            </span>
          )}
        </div>
        {o.diagnosis && <p className="text-[14px] leading-relaxed text-mute"><span className="text-peri">Muse Spark · </span>{o.diagnosis.what_happened}</p>}
      </div>
    </div>
  );
}

function fmt(v: any): string {
  if (v == null) return "never";
  if (Array.isArray(v)) {
    if (v.every((x) => x === v[0])) return fmt(v[0]);
    const nz = v.filter((x: number) => Math.abs(x) > 1e-6);
    return nz.length === 1 ? fmt(nz[0]) : `[${v.map((x: number) => +(+x).toFixed(2)).join(", ")}]`;
  }
  return typeof v === "number" ? String(+v.toFixed(2)) : String(v);
}
