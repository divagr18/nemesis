import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Composer from "../components/Composer";
import PatchPanel from "../components/PatchPanel";
import Replay from "../components/Replay";
import { api, pct, post, upload } from "../lib/api";
import { useVersions } from "../lib/live";

const EXAMPLES = [
  "Make the floor icy and shove it from the left",
  "Wet tiles and a 3 kg backpack",
  "The back-left knee is weak, on a gentle downhill",
  "40 ms of control lag while it walks",
  "Slippery front feet when it suddenly stops",
];

type Attack = any;

export default function Lab() {
  const [tick, setTick] = useState(0);
  const versions = useVersions(tick);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Attack | null>(null);
  const [patchJob, setPatchJob] = useState<string | null>(null);
  const [after, setAfter] = useState<any>(null);
  const [recent, setRecent] = useState<Attack[]>([]);
  const [board, setBoard] = useState<any[]>([]);

  useEffect(() => {
    api("/api/hall_of_fame?limit=9").then(setRecent).catch(() => {});
    api("/api/leaderboard?limit=5").then(setBoard).catch(() => {});
  }, [tick]);

  const run = async (label: string, req: () => Promise<Attack>) => {
    setBusy(label); setError(""); setPatchJob(null); setAfter(null);
    try { setResult(await req()); setTick((t) => t + 1); }
    catch (e: any) { setError(e.message); }
    setBusy("");
  };

  const stage = after?.trajs || result?.trajs || recent[0]?.trajs;
  const labels = after ? [`${after.parent}`, `${after.version}`] : result ? ["original", result.version] : null;

  return (
    <div>
      {/* Hero: headline, replay and input all fit the first screen. */}
      <div className="flex h-[calc(100dvh-8.5rem)] min-h-[540px] flex-col">
      <section className="shrink-0 pb-6 sm:pb-8">
        <h1 className="text-[34px] font-medium leading-[1.02] tracking-[-0.035em] sm:text-[52px] lg:text-[60px]">
          Try to break the robot.
          <span className="block text-faint">Then watch it learn.</span>
        </h1>
      </section>

      <section className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-line bg-[#0b0d12]">
        {stage ? (
          <Replay key={JSON.stringify(stage)} trajs={stage.map((t: any, i: number) => ({ url: t.url, label: labels?.[i] || t.label }))} className="absolute inset-0" />
        ) : (
          <Replay trajs={[{ url: "/assets/sample_traj_held.json", label: "" }]} hud={false} className="absolute inset-0" />
        )}
        {busy && (
          <div className="absolute inset-0 grid place-items-center bg-black/60 backdrop-blur-[2px]">
            <div className="w-56">
              <p className="text-center text-sm text-mute">{busy}</p>
              <div className="mt-3 h-px overflow-hidden bg-line"><div className="sweep h-full w-1/3 bg-ember" /></div>
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto mt-4 w-full max-w-3xl shrink-0">
        <Composer busy={!!busy} examples={EXAMPLES}
          onText={(text) => run("Muse Wonder is turning that into physics…", () => post("/api/attack", { text }))}
          onVoice={(wav) => run("Listening, then simulating…", () => upload("/api/attack_voice", "audio", wav, "attack.wav"))}
          onFile={(f) => run("Muse Spark is reading your place…", () => upload("/api/world", "media", f, f.name))} />
      </section>
      </div>

      <section className="mx-auto max-w-3xl">
        {error && <p className="mt-3 text-sm text-ember">{error}</p>}

        {result && !busy && <Verdict r={result} after={after} onPatch={async () => {
          try { setPatchJob((await post("/api/patch", { attack_id: result.id })).job); } catch (e: any) { setError(e.message); }
        }} patching={!!patchJob} />}

        {patchJob && (
          <div className="mt-4">
            <PatchPanel job={patchJob} onDone={(e) => { if (e.accepted) setAfter(e); setTick((t) => t + 1); }} />
          </div>
        )}
      </section>

      {recent.length > 0 && (
        <section className="mt-28">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-medium tracking-tight">Recent breaks</h2>
            {versions && <Link to="/report" className="flex items-center gap-1.5 text-sm text-mute hover:text-ink">Red-team report <ArrowRight size={14} /></Link>}
          </div>
          <div className="mt-6 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((r) => <BreakCard key={r.id} r={r} />)}
          </div>
        </section>
      )}

      <section className="mt-28 grid gap-16 lg:grid-cols-2">
        {board.length > 0 && (
          <div>
            <h2 className="text-2xl font-medium tracking-tight">Subtlest attacks</h2>
            <p className="mt-2 text-sm text-faint">Points for breaking it with as little as possible.</p>
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {board.map((b, i) => (
                <li key={b.who} className="flex items-baseline gap-4 py-3.5">
                  <span className="w-4 font-mono text-xs text-faint">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px]">{b.text}</p>
                    <p className="text-xs text-faint">{b.who}</p>
                  </div>
                  <span className="font-mono text-sm text-ember">{b.score}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
        {versions && versions.versions.length > 1 && (
          <div>
            <h2 className="text-2xl font-medium tracking-tight">Lineage</h2>
            <p className="mt-2 text-sm text-faint">Every version passed the regression gate before going live.</p>
            <ol className="mt-6 border-l border-line">
              {[...versions.versions].reverse().map((v) => (
                <li key={v.name} className="relative py-2.5 pl-6">
                  <i className={`absolute top-[17px] -left-[4px] block size-[7px] rounded-full ${v.name === versions.live ? "bg-acid" : "bg-line"}`} />
                  <span className="font-mono text-sm">{v.name}</span>
                  <span className="ml-3 text-sm text-faint">
                    {v.parent ? `learned ${v.attacks.length} attack${v.attacks.length === 1 ? "" : "s"}` : "original policy"}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>
    </div>
  );
}

function Verdict({ r, after, onPatch, patching }: { r: Attack; after: any; onPatch: () => void; patching: boolean }) {
  const fell = r.fall_rate_trained >= 0.5;
  const canPatch = r.fall_rate_trained >= 0.5 && r.survivable !== false && !after;
  return (
    <div className="rise mt-6">
      {r.reading && (
        <div className="mb-5 flex gap-4">
          <img src={r.media} alt="" className="size-20 shrink-0 rounded-lg object-cover" />
          <p className="text-sm leading-relaxed text-mute">
            <span className="text-ink">{r.reading.place}.</span> {r.reading.surface}, friction ≈ {(+r.reading.friction).toFixed(2)}
            {Math.abs(r.reading.slope_deg) >= 1 ? `, ${(+r.reading.slope_deg).toFixed(0)}° slope` : ""}.
          </p>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <p className="text-[15px] text-mute">
          Original robot <span className={r.broke_baseline ? "text-ember" : "text-acid"}>{r.broke_baseline ? "fell" : "held"}</span>
          <span className="text-faint"> · {pct(r.fall_rate_baseline)}</span>
          <span className="mx-3 text-line">/</span>
          {r.version} <span className={fell ? "text-ember" : "text-acid"}>{fell ? "fell" : "held"}</span>
          <span className="text-faint"> · {pct(r.fall_rate_trained)}</span>
          {r.score > 0 && <span className="ml-3 font-mono text-sm text-ember">+{r.score}</span>}
        </p>
        {canPatch && (
          <button onClick={onPatch} disabled={patching}
            className="ml-auto flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-85 disabled:opacity-40">
            Train it to survive this <ArrowRight size={15} />
          </button>
        )}
      </div>
      {r.survivable === false && r.fall_rate_trained > 0 && (
        <p className="mt-3 text-sm text-faint">Physics wins: even our toughest robot falls {pct(r.reference_fall_rate)} of the time here. Try something subtler.</p>
      )}
      {after && <p className="mt-3 text-sm text-mute">Replaying it on <span className="text-acid">{after.version}</span>, now live.</p>}
    </div>
  );
}

function BreakCard({ r }: { r: Attack }) {
  const st = Object.entries(r.status || {}).sort((a, b) => +a[0].slice(1) - +b[0].slice(1));
  return (
    <article className="group">
      <div className="overflow-hidden rounded-xl border border-line bg-[#0b0d12]">
        <video src={`${r.clip}#t=1.2`} preload="metadata" muted loop playsInline
          onMouseEnter={(e) => e.currentTarget.play()} onMouseLeave={(e) => e.currentTarget.pause()}
          className="aspect-[2/1] w-full object-cover opacity-90 transition-opacity group-hover:opacity-100" />
      </div>
      <p className="mt-3 line-clamp-2 text-[15px] leading-snug">{r.text}</p>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
        {st.map(([v, f]: any) => <span key={v} className={f >= 0.5 ? "text-ember" : "text-acid"}>{v} {f >= 0.5 ? "fell" : "held"}</span>)}
      </div>
    </article>
  );
}
