import { ArrowRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { follow, pct, post } from "../lib/api";

type Ev = { stage: string; [k: string]: any };

export default function Agent() {
  const [goal, setGoal] = useState("");
  const [events, setEvents] = useState<Ev[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [events.length]);

  const start = async () => {
    setRunning(true); setError(""); setEvents([]);
    try {
      const { job } = await post("/api/agent", { goal });
      await follow(job, (e) => setEvents((xs) => (e.stage === "progress" && xs.at(-1)?.stage === "progress" ? [...xs.slice(0, -1), e] : [...xs, e])));
    } catch (e: any) { setError(e.message); }
    setRunning(false);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <section className="pt-10 pb-12 sm:pt-16">
        <h1 className="text-[40px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[60px]">
          Let Muse attack
          <span className="block text-faint">on its own.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-mute">
          Muse Wonder forms hypotheses, searches for the most plausible way to make the robot fall, has Muse Spark watch
          what happened, measures the margin, and retrains it.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input value={goal} onChange={(e) => setGoal(e.target.value)} disabled={running} maxLength={300}
            placeholder="Anything to focus on? e.g. slipping while turning"
            className="flex-1 rounded-full border border-line bg-panel px-5 py-3 text-[15px] outline-none placeholder:text-faint focus:border-white/25" />
          <button onClick={start} disabled={running}
            className="flex items-center justify-center gap-2 rounded-full bg-ember px-6 py-3 text-[15px] font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-40">
            {running ? "Investigating…" : "Start"} {!running && <ArrowRight size={16} />}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-ember">{error}</p>}
      </section>

      {events.length > 0 && (
        <ol className="relative space-y-6 border-l border-line pb-4 pl-7">
          {events.map((e, i) => <Item key={i} e={e} />)}
          {running && <li className="text-sm text-faint"><span className="blink text-ember">●</span> working</li>}
          <div ref={end} />
        </ol>
      )}
    </div>
  );
}

function Dot({ tone = "bg-line" }) {
  return <i className={`absolute -left-[32px] mt-[9px] block size-[7px] rounded-full ${tone}`} />;
}

function Item({ e }: { e: Ev }) {
  switch (e.stage) {
    case "agent_start":
      return <li className="relative rise"><Dot /><p className="font-mono text-xs text-faint">testing robot {e.version}{e.goal ? ` · ${e.goal}` : ""}</p></li>;
    case "say":
      return <li className="relative rise"><Dot tone="bg-ink" /><p className="text-[17px] leading-relaxed">{e.text}</p></li>;
    case "tool_call":
      if (e.tool === "test_hypothesis") return <li className="relative rise"><Dot tone="bg-ember/50" /><p className="text-[15px] text-mute"><span className="text-faint">Hypothesis · </span>{e.args.hypothesis}</p></li>;
      if (e.tool === "watch") return <li className="relative rise"><Dot /><p className="font-mono text-xs text-faint">muse spark is watching the clip</p></li>;
      if (e.tool === "measure_margin") return <li className="relative rise"><Dot /><p className="font-mono text-xs text-faint">measuring the margin on {e.args.condition}</p></li>;
      if (e.tool === "patch") return <li className="relative rise"><Dot tone="bg-acid/60" /><p className="font-mono text-xs text-faint">retraining on {e.args.failure_ids.length} failure{e.args.failure_ids.length > 1 ? "s" : ""}</p></li>;
      return null;
    case "searching":
      return <li className="relative rise"><Dot /><p className="font-mono text-xs text-faint">searching {e.free_params} free parameter{e.free_params === 1 ? "" : "s"} for the most plausible fall</p></li>;
    case "tool_result":
      if (e.tool === "test_hypothesis" && !e.result.broke_robot)
        return <li className="relative rise"><Dot tone="bg-acid" /><p className="text-[15px] text-mute">{e.result.error ? "That program didn't compile; retrying." : <>It held ({pct(e.result.fall_rate)} falls). <span className="text-faint">Refuted.</span></>}</p></li>;
      return null;
    case "failure":
      return (
        <li className="relative rise"><Dot tone="bg-ember" />
          <p className="text-[15px]"><span className="text-ember">It fell</span> <span className="text-mute">in {pct(e.fall_rate)} of tries.</span></p>
          <video src={e.clip} autoPlay muted loop playsInline className="mt-3 w-full rounded-xl border border-line" />
        </li>
      );
    case "diagnosis":
      return (
        <li className="relative rise"><Dot tone="bg-peri" />
          <blockquote className="border-l-2 border-peri/60 pl-4 text-[15px] leading-relaxed text-mute">
            <span className="text-ink">{e.mode}.</span> {e.what_happened}
          </blockquote>
        </li>
      );
    case "margin":
      return (
        <li className="relative rise"><Dot />
          <p className="text-[15px] text-mute">Falls begin at <span className="font-mono text-ink">{fmt(e.starts_falling_at)}</span> <span className="text-faint">({e.condition}, nominal {fmt(e.nominal)})</span></p>
          <div className="mt-3 flex h-10 max-w-sm items-end gap-1">
            {e.curve.map((c: any, i: number) => <i key={i} style={{ height: `${Math.max(6, c.fall_rate * 100)}%` }} className={`block flex-1 ${c.fall_rate >= 0.5 ? "bg-ember" : "bg-white/15"}`} />)}
          </div>
        </li>
      );
    case "progress":
      return <li className="relative"><Dot /><div className="h-px max-w-sm overflow-hidden bg-line"><div className="h-full bg-ember transition-all" style={{ width: pct(e.step / e.total) }} /></div></li>;
    case "verified":
      return <li className="relative rise"><Dot tone="bg-acid" /><p className="flex items-center gap-2 text-[15px]"><Check size={16} className="text-acid" /> {e.version} passed the regression gate and is live.</p></li>;
    case "rejected":
      return <li className="relative rise"><Dot /><p className="text-[15px] text-mute">The retrained robot failed the regression gate, so the old one stays.</p></li>;
    case "done":
      return e.summary ? <li className="relative rise"><Dot tone="bg-ink" /><p className="whitespace-pre-line text-[15px] leading-relaxed text-mute">{e.summary}</p></li> : null;
    case "failed":
      return <li className="relative rise"><Dot tone="bg-ember" /><p className="text-sm text-ember">{e.error}</p></li>;
    default:
      return null;
  }
}

function fmt(v: any) {
  if (v == null) return "never";
  if (Array.isArray(v)) {
    if (v.every((x) => x === v[0])) return fmt(v[0]);
    const nz = v.filter((x: number) => Math.abs(x) > 1e-6);
    return nz.length === 1 ? fmt(nz[0]) : `[${v.map((x: number) => +x.toFixed(2)).join(", ")}]`;
  }
  return typeof v === "number" ? String(+v.toFixed(2)) : String(v);
}
