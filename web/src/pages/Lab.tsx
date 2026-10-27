import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Composer from "../components/Composer";
import Steps from "../components/Steps";
import Envelope from "../components/Envelope";
import PatchPanel from "../components/PatchPanel";
import Replay from "../components/Replay";
import { api, pct, post, runJob, upload } from "../lib/api";
import { useVersions } from "../lib/live";

const EXAMPLES = [
  "Make the floor icy and shove it from the left",
  "Wet tiles and a 3 kg backpack",
  "The back-left knee is weak, on a gentle downhill",
  "40 ms of control lag while it walks",
  "Slippery front feet when it suddenly stops",
];

const HUMANOID_READY = false;  // flips on once the humanoid's 3D scene asset is published

const SAMPLES = [
  ["Icy shove", "Make the floor icy and shove it from the left"],
  ["Wet tiles + load", "Wet tiles and a 3 kg backpack"],
  ["Weak knee", "The back-left knee is weak, on a gentle downhill"],
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
  const [prefill, setPrefill] = useState({ text: "", n: 0 });
  const [showcase, setShowcase] = useState<any>(null);
  const [robot, setRobot] = useState<"go1" | "g1" | "both">("go1");
  const [pair, setPair] = useState<any[] | null>(null);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [attempt, setAttempt] = useState(0);
  const [cycling, setCycling] = useState(false);

  useEffect(() => {  // play the learning attempts in order once, then rest on the last
    if (!cycling || !attempts.length) return;
    if (attempt >= attempts.length - 1) { setCycling(false); return; }
    const t = setTimeout(() => setAttempt((i) => i + 1), attempts[attempt].fell ? 3200 : 4200);
    return () => clearTimeout(t);
  }, [cycling, attempt, attempts]);

  useEffect(() => {
    api("/api/hall_of_fame?limit=9").then(setRecent).catch(() => {});
    api("/api/leaderboard?limit=5").then(setBoard).catch(() => {});
    api("/api/showcase").then((s) => setShowcase(s?.trajs ? s : null)).catch(() => {});
  }, [tick]);

  const [steps, setSteps] = useState<string[]>([]);
  const run = async (first: string, start: (r: "go1" | "g1") => Promise<{ job: string }>) => {
    setBusy(first); setSteps([first]); setError(""); setPatchJob(null); setAfter(null); setAttempts([]); setPair(null);
    const step = (prefix: string) => (st: string) => setSteps((xs) => (xs.at(-1) === prefix + st ? xs : [...xs, prefix + st]));
    try {
      if (robot === "both") {  // the same situation for each robot, one after the other (the GPU queues them anyway)
        const a = await runJob(start("go1"), step("Quadruped · "));
        const b = await runJob(start("g1"), step("Humanoid · "));
        setResult(null); setPair([a, b]);
      } else {
        setResult(await runJob(start(robot), step("")));
      }
      setTick((t) => t + 1);
    } catch (e: any) { setError(e.message); }
    setBusy(""); setSteps([]);
  };

  const showing = attempts.length ? attempts[attempt] : null;
  const stage = showing ? [showing] : after?.trajs || result?.trajs || showcase?.trajs;
  const labels = showing ? [`attempt · ${showing.label}`] : after ? [`${after.parent}`, `${after.version}`] : result ? ["original", result.version]
    : showcase ? ["original", `trained · ${showcase.version}`] : null;

  return (
    <div>
      {/* Hero: one composed block (copy, samples, input) beside the live replay, 1/3 : 2/3, on the first screen. */}
      <div className="grid items-center gap-10 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14 lg:pt-12">
        <section className="w-full max-w-[440px]">
          <h1 className="font-medium leading-[1.02] tracking-[-0.04em]" style={{ fontSize: "clamp(28px, min(2.65vw, 6vh), 44px)" }}>
            <span className="block lg:whitespace-nowrap">Describe any situation.</span>
            <span className="block text-mute lg:whitespace-nowrap">Watch it fall, then adapt.</span>
          </h1>
          <p className="mt-5 text-base leading-[1.55] text-ink/75">
            Describe an attack in plain English, say it out loud, or show a photo of a real place. Muse turns it into
            physics. If the robot falls, retrain it until it doesn't.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {SAMPLES.map(([label, text]) => (
              <button key={label} onClick={() => setPrefill((p) => ({ text, n: p.n + 1 }))} disabled={!!busy}
                className="cursor-pointer rounded-full border border-white/12 bg-white/[.04] px-3 py-1.5 text-[13px] leading-none text-ink/85 transition-colors hover:border-white/30 hover:bg-white/[.09] hover:text-ink active:scale-[.98] disabled:opacity-40">
                {label}
              </button>
            ))}
          </div>
          <div className={`mt-8 flex items-center gap-1 text-[13px] ${HUMANOID_READY ? "" : "hidden"}`}>
            {([["go1", "Quadruped"], ["g1", "Humanoid"], ["both", "Both"]] as const).map(([k, label]) => (
              <button key={k} onClick={() => setRobot(k)} disabled={!!busy}
                className={`rounded-full px-3 py-1 transition-colors ${robot === k ? "bg-white/10 text-ink" : "text-mute hover:text-ink"}`}>{label}</button>
            ))}
          </div>
          <div className="mt-2.5">
            <Composer busy={!!busy} examples={["Describe an attack…"]} prefill={prefill}
              onText={(text) => run("Sending your attack", (r) => post("/api/attack?stream=1", { text, robot: r }))}
              onVoice={(wav) => run("Uploading your voice", (r) => upload(`/api/attack_voice?stream=1&robot=${r}`, "audio", wav, "attack.wav"))}
              onFile={(f) => run("Uploading your photo", (r) => upload(`/api/world?stream=1&robot=${r}`, "media", f, f.name))} />
          </div>
          {error && <p className="mt-3 text-sm text-ember">{error}</p>}
          {pair && !busy && (
            <div className="rise mt-6 space-y-1.5 text-[15px] text-mute">
              {pair.map((r: any, i: number) => (
                <p key={i}>{i === 0 ? "Quadruped" : "Humanoid"} {r.version}{" "}
                  <span className={r.fall_rate_trained >= 0.5 ? "text-ember" : "text-acid"}>{r.fall_rate_trained >= 0.5 ? "fell" : "held"}</span>
                  <span className="text-faint"> · {pct(r.fall_rate_trained)}</span></p>
              ))}
            </div>
          )}
          {result && !busy && <Verdict r={result} after={after} onPatch={async () => {
            try { setPatchJob((await post("/api/patch", { attack_id: result.id })).job); } catch (e: any) { setError(e.message); }
          }} patching={!!patchJob} />}
          {patchJob && (
            <div className="mt-4">
              <PatchPanel job={patchJob}
                onTimelapse={(a) => { setAttempts(a); setAttempt(0); setCycling(true); }}
                onDone={(e) => { if (e.accepted) setAfter(e); setTick((t) => t + 1); }} />
              {attempts.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 text-[13px] text-mute">Watch it learn</span>
                  {attempts.map((a, i) => (
                    <button key={i} onClick={() => { setCycling(false); setAttempt(i); }}
                      className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-xs transition-colors ${i === attempt ? "border-white/30 bg-white/10 text-ink" : "border-white/10 text-mute hover:text-ink"}`}>
                      <i className={`block size-1.5 rounded-full ${a.fell ? "bg-ember" : "bg-acid"}`} /> {a.label}
                    </button>
                  ))}
                  {after && <button onClick={() => setAttempts([])} className="ml-1 text-xs text-faint hover:text-mute">final comparison</button>}
                </div>
              )}
              {after && result && <Envelope attackId={result.id} versions={[versions?.versions[0]?.name || "v1", after.version]} />}
            </div>
          )}
        </section>

        <section className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-[#0b0d12] lg:aspect-[16/11] lg:max-h-[calc(100dvh-11rem)]">
          {pair && !showing ? (
            <div className="absolute inset-0 grid grid-cols-2 divide-x divide-line">
              {pair.map((r: any, i: number) => (
                <div key={i} className="relative">
                  <Replay robot={i === 0 ? "go1" : "g1"} trajs={[{ url: r.trajs[1].url, label: `${i === 0 ? "quadruped" : "humanoid"} · ${r.version}` }]}
                    className="absolute inset-0" />
                </div>
              ))}
            </div>
          ) : stage ? (
            <Replay key={JSON.stringify(stage)} robot={result?.robot || "go1"}
              trajs={stage.map((t: any, i: number) => ({ url: t.url, label: labels?.[i] || t.label }))} className="absolute inset-0" />
          ) : (
            <Replay trajs={[{ url: "/assets/sample_traj_held.json", label: "" }]} hud={false} className="absolute inset-0" />
          )}
          {busy && (
            <div className="absolute inset-0 grid place-items-center bg-black/60 backdrop-blur-[2px]">
              <div className="w-72">
                <Steps steps={steps} />
                <div className="mt-4 h-px overflow-hidden bg-line"><div className="sweep h-full w-1/3 bg-ember" /></div>
              </div>
            </div>
          )}
        </section>
      </div>

      {recent.length > 0 && (
        <section className="mt-28">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-medium tracking-tight">Recent breaks</h2>
            {versions && <Link to="/readiness" className="flex items-center gap-1.5 text-sm text-mute hover:text-ink">Readiness report <ArrowRight size={14} /></Link>}
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
                    {v.parent ? `learned ${v.attacks.length} situation${v.attacks.length === 1 ? "" : "s"}` : "original policy"}
                  </span>
                  {v.changelog && (
                    <p className="mt-1 line-clamp-3 max-w-md text-[13px] leading-relaxed text-mute">
                      {v.changelog.learned} <span className="text-faint">{v.changelog.still_cant}</span>
                    </p>
                  )}
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
  const canPatch = r.fall_rate_trained >= 0.5 && r.survivable !== false && !after && (r.robot || "go1") === "go1";
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
      <div className="flex flex-col items-start gap-4">
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
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-85 disabled:opacity-40">
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
