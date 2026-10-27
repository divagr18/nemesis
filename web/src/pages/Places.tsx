import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Composer from "../components/Composer";
import Falls from "../components/Falls";
import PatchPanel from "../components/PatchPanel";
import Replay from "../components/Replay";
import Steps from "../components/Steps";
import { api, follow, post } from "../lib/api";

const SAMPLES = [
  ["Hospital", "a hospital with polished corridors and carts"],
  ["Warehouse", "a warehouse with loading ramps, forklifts and a dusty concrete floor"],
  ["Campus in the rain", "a university campus in the rain, with steps, wet paths and students"],
] as const;

type Pair = { url: string; label: string }[];
type After = { version: string; parent: string; fall: number; fall_parent: number; trajs: Pair };
type Situation = {
  index: number; name: string; say: string; state: "pending" | "done" | "error";
  fall_v1?: number; fall_live?: number; survivable?: boolean; version?: string; trajs?: Pair; label?: string; after?: After;
};
type Train = { job: string; status: string; situations: number[]; from: string; version?: string; accepted?: boolean };
type Brief = { id: string; place: string; status: string; version: string; situations: Situation[]; job: string | null; train: Train | null };

const now = (s: Situation) => (s.after ? s.after.fall : s.fall_live ?? 0);
const learnable = (b: Brief) => b.situations.filter((s) => s.state === "done" && now(s) >= 0.5 && s.survivable !== false).slice(0, 5);

export default function Places() {
  const [params, setParams] = useSearchParams();
  const [brief, setBrief] = useState<Brief | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [running, setRunning] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [prefill, setPrefill] = useState({ text: "", n: 0 });
  const [pick, setPick] = useState<number | null>(null);  // the situation the visitor clicked
  const [view, setView] = useState<"before" | "after">("after");
  const [trainJob, setTrainJob] = useState<string | null>(null);
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(() => !!params.get("b"));  // a shared ?b= link: don't flash the hero
  const stage = useRef<HTMLDivElement>(null);
  const alive = useRef(0);

  const patch = (i: number, f: (s: Situation) => Situation) =>
    setBrief((b) => b && { ...b, situations: b.situations.map((s) => (s.index === i ? f(s) : s)) });

  const watch = (job: string, n: number) => follow(job, (e) => {
    if (alive.current !== n) return;
    if (e.stage === "step") {
      setSteps((xs) => (xs.at(-1) === e.step ? xs : [...xs, e.step]));
      if (e.plan) setBrief((b) => b && { ...b, status: "running", situations: e.plan });
      if (e.running !== undefined) setRunning(e.running);
      if (e.situation) patch(e.situation.index, () => e.situation);
      if (e.ready) { setBrief(e.ready); setRunning(null); }
      if (e.label) patch(e.label.index, (s) => ({ ...s, label: e.label.text }));
    }
    if (e.stage === "done") { setBrief(e.result); setRunning(null); }
    if (e.stage === "failed") { setError(e.error || "Something went wrong."); setBrief((b) => b && { ...b, status: "failed" }); }
  });

  const watchTrain = (job: string, id: string, n: number) => {
    setTrainJob(job);
    follow(job, (e) => {
      if (alive.current !== n) return;
      if (e.stage === "regraded") { patch(e.index, (s) => ({ ...s, after: e.after })); setView("after"); }
    }).then(() => alive.current === n && api<Brief>(`/api/brief/${id}`).then(setBrief).catch(() => {}));
  };

  const open = async (id: string) => {
    const n = ++alive.current;
    try {
      const b = await api<Brief>(`/api/brief/${id}`);
      if (alive.current !== n) return;
      setBrief(b);
      if ((b.status === "writing" || b.status === "running") && b.job) watch(b.job, n);
      if (b.train?.status === "running") watchTrain(b.train.job, b.id, n);
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  };

  const loadPreview = () => api("/api/preview").then((p) => setPreview(p?.trajs ? p : null)).catch(() => {});

  useEffect(() => {
    const id = params.get("b");
    if (id) open(id); else loadPreview();
  }, []);

  const start = async (place: string) => {
    const n = ++alive.current;
    setError(""); setSteps(["Sending your place"]); setPick(null); setTrainJob(null); setRunning(null);
    try {
      const r = await post<{ job: string; brief: string }>("/api/brief", { place: place.slice(0, 300) });
      setParams({ b: r.brief });
      setBrief({ id: r.brief, place, status: "writing", version: "", situations: [], job: r.job, train: null });
      watch(r.job, n);
    } catch (e: any) { setError(e.message); setSteps([]); }
  };

  const reset = () => {
    alive.current++; setBrief(null); setParams({}); setSteps([]); setError(""); setTrainJob(null); setPick(null); setLoading(false);
    if (!preview) loadPreview();
  };

  const train = async () => {
    if (!brief) return;
    setError("");
    try {
      const r = await post<{ job: string }>(`/api/brief/${brief.id}/train`);
      setBrief({ ...brief, train: { job: r.job, status: "running", situations: learnable(brief).map((s) => s.index), from: brief.version } });
      watchTrain(r.job, brief.id, alive.current);
    } catch (e: any) { setError(e.message); }
  };

  const select = (i: number) => {
    setPick(i);
    if (window.innerWidth < 1024) stage.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // What the stage plays: the clicked situation, else the hardest finished one (so the replay follows the brief).
  const done = brief?.situations.filter((s) => s.state === "done") ?? [];
  const shown = (pick !== null && brief?.situations.find((s) => s.index === pick && s.state === "done"))
    || [...done].sort((a, b) => now(b) - now(a))[0];
  const showAfter = !!shown?.after && view === "after";
  const trajs = shown && (showAfter
    ? shown.after!.trajs.map((t, i) => ({ url: t.url, label: i === 0 ? shown.after!.parent : `${shown.after!.version} · after` }))
    : shown.version === "v1"  // the live robot is the original: one robot, not two identical ones
      ? [{ url: shown.trajs![1].url, label: "v1" }]
      : shown.trajs!.map((t, i) => ({ url: t.url, label: i === 0 ? "original" : shown.version || t.label })));

  return (
    <div className="grid items-start gap-10 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-14 lg:pt-12">
      <section className="w-full min-w-0">
        {loading ? null : !brief ? (
          <div className="max-w-[460px] lg:pt-10">
            <h1 className="font-medium leading-[1.02] tracking-[-0.04em]" style={{ fontSize: "clamp(36px, min(3.5vw, 7vh), 54px)" }}>
              Where will it work?
            </h1>
            <p className="mt-5 text-base leading-[1.55] text-ink/75">
              Describe the place. Muse writes the situations the robot would meet there and runs every one. Then train it for
              that place.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SAMPLES.map(([label, text]) => (
                <button key={label} onClick={() => setPrefill((p) => ({ text, n: p.n + 1 }))}
                  className="cursor-pointer rounded-full border border-white/12 bg-white/[.04] px-3 py-1.5 text-[13px] leading-none text-ink/85 transition-colors hover:border-white/30 hover:bg-white/[.09] hover:text-ink active:scale-[.98]">
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-8">
              <Composer examples={["a hospital with polished corridors and carts"]} prefill={prefill} onText={start} />
            </div>
            {error && <p className="mt-3 text-sm text-ember">{error}</p>}
          </div>
        ) : (
          <BriefView brief={brief} running={running} steps={steps} error={error} shown={shown?.index ?? null}
            onSelect={select} onReset={reset} onTrain={train} trainJob={trainJob} />
        )}
      </section>

      <section className="lg:sticky lg:top-28">
        <div ref={stage} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-[#0b0d12] lg:aspect-[16/11] lg:max-h-[calc(100dvh-13rem)]">
          {trajs ? (
            <Replay key={JSON.stringify(trajs)} trajs={trajs} className="absolute inset-0" />
          ) : preview && !brief ? (
            <Replay trajs={preview.trajs} hud={false} className="absolute inset-0" />
          ) : (
            <Replay trajs={[{ url: "/assets/sample_traj_held.json", label: "" }]} hud={false} className="absolute inset-0" />
          )}
          {brief && !done.length && (brief.status === "writing" || brief.status === "running") && (
            <div className="absolute inset-0 grid place-items-center bg-black/60 backdrop-blur-[2px]">
              <div className="w-72">
                <Steps steps={steps.slice(-4)} />
                <div className="mt-4 h-px overflow-hidden bg-line"><div className="sweep h-full w-1/3 bg-ember" /></div>
              </div>
            </div>
          )}
        </div>
        {shown && (
          <div className="mt-4 flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p className="text-[15px]">{shown.name}</p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-faint">{shown.say}</p>
            </div>
            {shown.after && (
              <div className="flex shrink-0 gap-1 text-[13px]">
                {(["before", "after"] as const).map((k) => (
                  <button key={k} onClick={() => setView(k)}
                    className={`rounded-full px-3 py-1 transition-colors ${view === k ? "bg-white/10 text-ink" : "text-mute hover:text-ink"}`}>{k}</button>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function BriefView({ brief, running, steps, error, shown, onSelect, onReset, onTrain, trainJob }: {
  brief: Brief; running: number | null; steps: string[]; error: string; shown: number | null;
  onSelect: (i: number) => void; onReset: () => void; onTrain: () => void; trainJob: string | null;
}) {
  const sits = brief.situations;
  const done = sits.filter((s) => s.state === "done");
  const busy = brief.status === "writing" || brief.status === "running";
  const tr = brief.train;
  const afterVersion = sits.find((s) => s.after)?.after?.version || (tr?.accepted ? tr.version : undefined);
  const showAfter = !!tr && tr.status !== "rejected" && tr.status !== "failed" && tr.status !== "interrupted";
  const fellBefore = done.filter((s) => (s.fall_live ?? 0) >= 0.5).length;
  const fellAfter = done.filter((s) => s.after && s.after.fall >= 0.5).length;
  const graded = done.filter((s) => s.after).length;
  const learn = learnable(brief);
  const physics = done.filter((s) => s.survivable === false && (s.fall_live ?? 0) > 0).length;
  const training = tr?.status === "running";
  const place = brief.place.charAt(0).toUpperCase() + brief.place.slice(1);
  const cols = showAfter ? "grid-cols-[minmax(0,1fr)_auto_auto]" : "grid-cols-[minmax(0,1fr)_auto]";

  return (
    <div>
      <button onClick={onReset} className="flex items-center gap-1.5 text-[13px] text-mute transition-colors hover:text-ink">
        <ArrowLeft size={14} /> Another place
      </button>
      <h1 className={`mt-4 font-medium leading-[1.15] tracking-[-0.03em] ${place.length > 60 ? "text-[22px] sm:text-[24px]" : "text-[28px] sm:text-[32px]"}`}>{place}</h1>
      <p className="mt-3 text-[15px] text-mute">
        {brief.status === "writing" ? "Muse Wonder is writing the situations the robot would meet here."
          : busy ? `${done.length} of ${sits.length} situations run.`
          : brief.status === "failed" ? "This brief didn't finish."
          : brief.status === "interrupted" ? "The server restarted before this brief finished."
          : <>{brief.version} falls in <span className={fellBefore ? "text-ember" : "text-acid"}>{fellBefore} of {done.length}</span> situations
            {afterVersion && graded === done.length && <>; {afterVersion} falls in <span className={fellAfter ? "text-ember" : "text-acid"}>{fellAfter}</span></>}.</>}
      </p>
      {busy && steps.length > 0 && (
        <p className="mt-2 flex items-center gap-2 text-[13px] text-faint">
          <Loader2 size={13} className="shrink-0 animate-spin text-ember" /><span className="truncate">{steps.at(-1)}</span>
        </p>
      )}
      {error && <p className="mt-3 text-sm text-ember">{error}</p>}

      {sits.length > 0 && (
        <div className="mt-7">
          <div className={`grid ${cols} items-end gap-x-5 pb-2.5 font-mono text-xs text-faint`}>
            <span />
            <span className="w-[52px] whitespace-nowrap">{brief.version || "now"}</span>
            {showAfter && <span className="w-[52px] whitespace-nowrap">{afterVersion || "after"}</span>}
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {sits.map((s) => {
              const ok = s.state === "done";
              return (
                <li key={s.index} className="rise" style={{ animationDelay: `${s.index * 40}ms` }}>
                  <button onClick={() => ok && onSelect(s.index)} disabled={!ok}
                    className={`-mx-3 grid w-[calc(100%+1.5rem)] ${cols} items-center gap-x-5 rounded-lg px-3 py-3 text-left transition-colors ${shown === s.index ? "bg-white/[.05]" : ok ? "hover:bg-white/[.03]" : ""}`}>
                    <div className="min-w-0">
                      <p className={`truncate text-[15px] ${ok ? "text-ink" : "text-mute"}`}>{s.name}</p>
                      <p className="truncate text-[13px] text-faint">
                        {s.state === "error" ? "Couldn't run this one." : s.say}
                        {ok && s.survivable === false && (s.fall_live ?? 0) > 0 && <span className="text-mute"> · physics wins</span>}
                      </p>
                      {s.label && <p className="rise mt-1 text-[13px] leading-snug text-mute"><span className="text-peri">Muse Spark · </span>{s.label}</p>}
                    </div>
                    <Falls rate={ok ? s.fall_live : undefined} active={running === s.index} />
                    {showAfter && <Falls rate={s.after?.fall} active={training && !s.after && ok} dim={!ok} />}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {brief.status === "done" && (
        <div className="mt-7">
          {tr?.status === "rejected" && (
            <p className="mb-4 text-[15px] text-mute">The retrained robot didn't pass the regression check, so {tr.from} stays live and the grid is unchanged.</p>
          )}
          {tr?.status === "failed" && <p className="mb-4 text-[15px] text-mute">Training stopped before it finished; {tr.from} stays live.</p>}
          {!training && learn.length > 0 && (
            <div className="flex flex-col items-start gap-3">
              <button onClick={onTrain}
                className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-85">
                Train it for this place <ArrowRight size={15} />
              </button>
              <p className="text-[13px] text-faint">
                Retrains on the {learn.length === 1 ? "one" : learn.length} it can learn
                {physics > 0 ? `; ${physics === 1 ? "one is" : `${physics} are`} beyond what any robot here survives` : ""}. Takes a few minutes.
              </p>
            </div>
          )}
          {!training && !learn.length && !tr && done.length > 0 && (
            <p className="text-[15px] text-mute">
              {fellBefore === 0 ? `${brief.version} handles every situation here.` : "Nothing here knocks it over in a way it can learn from."}
            </p>
          )}
          {trainJob && <div className="mt-5"><PatchPanel job={trainJob} /></div>}
        </div>
      )}
    </div>
  );
}
