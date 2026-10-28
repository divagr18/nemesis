import { ArrowRight, Footprints, Hand, Pause, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PatchPanel from "../components/PatchPanel";
import Replay from "../components/Replay";
import Steps from "../components/Steps";
import { api, pct, post, runJob } from "../lib/api";
// @ts-ignore  (plain JS module: MuJoCo WASM + the policy, drawn with three.js)
import { mountPlay } from "../lib/play.js";

type Shove = { force_x: number; force_y: number; peak: number; duration: number; command: number[] };
type Info = { original: string; live: string };

const chip =
  "inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[.04] px-3 py-1.5 text-[13px] leading-none text-ink/85 transition-colors hover:border-white/30 hover:bg-white/[.09] hover:text-ink active:scale-[.98] disabled:opacity-40";
const seg = (on: boolean) =>
  `rounded-full px-3 py-1.5 text-[13px] leading-none transition-colors ${on ? "bg-white/[.1] text-ink" : "text-mute hover:text-ink"}`;

function side(s: Shove) {
  const a = (Math.atan2(s.force_y, s.force_x) * 180) / Math.PI;  // where the force points, robot frame
  if (Math.abs(a) <= 45) return "from behind";
  if (Math.abs(a) >= 135) return "from the front";
  return a > 0 ? "from its right" : "from its left";
}

function describe(s: Shove) {
  const n = Math.round(Math.hypot(s.force_x, s.force_y));
  const [vx, , wz] = s.command;
  const doing = Math.abs(vx) < 0.1 ? "standing" : `walking at ${Math.abs(vx).toFixed(1)} m/s${Math.abs(wz) >= 0.1 ? ", turning" : ""}`;
  return `${n} N ${side(s)} for ${s.duration.toFixed(2)} s, while ${doing}`;
}

export default function Playground() {
  const stageRef = useRef<HTMLDivElement>(null);
  const play = useRef<any>(null);
  const [info, setInfo] = useState<Info | null>(null);
  const [which, setWhich] = useState<"live" | "original">("live");
  const [version, setVersion] = useState("");  // the live version loaded in the stage
  const [walking, setWalking] = useState(true);
  const [fall, setFall] = useState<{ shove: Shove | null } | null>(null);
  const [slow, setSlow] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [verdict, setVerdict] = useState<any>(null);
  const [patchJob, setPatchJob] = useState<string | null>(null);
  const [learnt, setLearnt] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let dead = false;
    api<Info>("/api/play/info").then(async (i) => {
      if (dead) return;
      setInfo(i);
      setVersion(i.live);
      const p = await mountPlay(stageRef.current, {
        policyUrl: `/api/play/policy/${i.live}.bin`, label: `latest · ${i.live}`,
        onFall: (e: any) => setFall(e),
        onStatus: (s: any) => setSlow(s.slow),
      });
      if (dead) p.dispose(); else { play.current = p; (window as any).playground = p; }
    }).catch((e) => setError(`The Playground couldn't start: ${e.message}`));
    return () => { dead = true; play.current?.dispose(); play.current = null; };
  }, []);

  const clear = () => { setFall(null); setSteps([]); setVerdict(null); setPatchJob(null); setError(""); };
  const reset = () => { clear(); play.current?.reset(); play.current?.focus(); };

  const choose = async (w: "live" | "original") => {
    if (!info || w === which) return;
    setWhich(w);
    clear();
    const name = w === "live" ? version : info.original;
    await play.current?.setPolicy(`/api/play/policy/${name}.bin`, w === "live" ? `latest · ${name}` : `original · ${name}`);
    play.current?.focus();
  };

  const teach = async () => {
    if (!fall?.shove) return;
    const s = fall.shove;
    setSteps(["Sending your shove"]); setVerdict(null); setError("");
    try {
      const r = await runJob(post("/api/play/shove?stream=1", { force_x: s.force_x, force_y: s.force_y, duration: s.duration, command: s.command }),
        (step) => setSteps((xs) => (xs.at(-1) === step ? xs : [...xs, step])));
      setVerdict(r);
    } catch (e: any) { setError(e.message); }
  };

  const train = async () => {
    try { setPatchJob((await post("/api/patch", { attack_id: verdict.id })).job); } catch (e: any) { setError(e.message); }
  };

  const learned = async (e: any) => {
    if (!e?.accepted || !e.version) return;
    setVersion(e.version);
    setWhich("live");
    await play.current?.setPolicy(`/api/play/policy/${e.version}.bin`, `latest · ${e.version}`);
    setFall(null);
    setLearnt(`${e.version} is live in the stage. Shove it the same way again.`);
  };

  const liveFell = verdict && verdict.fall_rate_trained >= 0.5;
  const canTrain = liveFell && verdict.survivable !== false && !patchJob;

  return (
    <div>
      <div className="grid items-start gap-10 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14 lg:pt-12">
        <section className="w-full max-w-[440px] lg:pt-6">
          <h1 className="font-medium leading-[1.02] tracking-[-0.04em]" style={{ fontSize: "clamp(36px, min(3.5vw, 7vh), 54px)" }}>
            Shove it yourself.
          </h1>
          <p className="mt-5 text-base leading-[1.55] text-ink/75">
            The robot is walking in your browser right now, on the same physics engine and the same trained policy as the server.
            Drag on it to shove it. If it falls, teach it that shove and try again.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <div className="flex rounded-full border border-white/10 p-0.5">
              <button className={seg(which === "live")} onClick={() => choose("live")}>Latest{version && ` · ${version}`}</button>
              <button className={seg(which === "original")} onClick={() => choose("original")}>Original{info && ` · ${info.original}`}</button>
            </div>
            <button className={chip} onClick={() => { const w = !walking; setWalking(w); play.current?.setWalking(w); play.current?.focus(); }}>
              {walking ? <Pause size={13} /> : <Footprints size={13} />} {walking ? "Stop" : "Walk"}
            </button>
            <button className={chip} onClick={reset}><RotateCcw size={13} /> Reset</button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[13px] text-faint">Quick shove</span>
            {(["left", "right", "behind"] as const).map((s) => (
              <button key={s} className={chip} disabled={!!fall} onClick={() => { play.current?.shoveFrom(s); play.current?.focus(); }}>
                <Hand size={13} /> from {s === "behind" ? "behind" : `the ${s}`}
              </button>
            ))}
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-faint">
            Drag anywhere on the stage: the direction you drag is the direction it's pushed, up to 150 N for half a second.
            Arrow keys or WASD steer.{slow && " Your device is running it in slow motion."}
          </p>

          {learnt && !fall && <p className="mt-5 text-[15px] text-acid">{learnt}</p>}

          {fall && (
            <div className="rise mt-6 rounded-2xl border border-line bg-white/[.02] p-5">
              <p className="text-[17px] font-medium">It fell.</p>
              {fall.shove ? (
                <>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-mute">Your shove: {describe(fall.shove)}.</p>
                  {!steps.length && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button onClick={teach} className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-black hover:opacity-85">
                        Teach it this shove <ArrowRight size={15} />
                      </button>
                      <button onClick={reset} className={chip}>Try again</button>
                    </div>
                  )}
                </>
              ) : (
                <div className="mt-4"><button onClick={reset} className={chip}>Try again</button></div>
              )}
              {steps.length > 0 && !verdict && <Steps steps={steps} className="mt-4" />}
              {verdict && (
                <div className="mt-4 space-y-3 text-[15px] leading-relaxed">
                  <p className="text-mute">
                    Replayed on the training simulator: the original falls {pct(verdict.fall_rate_baseline)} of the time,{" "}
                    {verdict.version} {pct(verdict.fall_rate_trained)}.
                  </p>
                  {canTrain && (
                    <button onClick={train} className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-black hover:opacity-85">
                      Train it to survive this <ArrowRight size={15} />
                    </button>
                  )}
                  {liveFell && verdict.survivable === false && (
                    <p className="text-mute">Even our toughest reference robot falls from this one, so there's nothing fair to train. Physics wins.</p>
                  )}
                  {!liveFell && (
                    <p className="text-mute">
                      {which === "original"
                        ? `${verdict.version} already handles this shove there. Switch to Latest and try it.`
                        : "The training simulator's robot held this one, so there's nothing reliable to train. Shove harder, or for longer."}
                    </p>
                  )}
                  {!patchJob && <button onClick={reset} className={chip}>Try again</button>}
                </div>
              )}
              {patchJob && <div className="mt-5"><PatchPanel job={patchJob} onDone={learned} /></div>}
            </div>
          )}
          {error && <p className="mt-3 text-sm text-ember">{error}</p>}
        </section>

        <section className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-[#0b0d12] lg:aspect-[16/11] lg:max-h-[calc(100dvh-11rem)]">
          <div ref={stageRef} className="replay-fill absolute inset-0" />
        </section>
      </div>

      {verdict?.trajs && (
        <section className="mt-12">
          <h2 className="text-[13px] uppercase tracking-[0.14em] text-faint">Your shove on the training simulator</h2>
          <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-[#0b0d12]">
            <Replay trajs={verdict.trajs.map((t: any, i: number) => ({ url: t.url, label: i ? verdict.version : "original" }))} className="absolute inset-0" />
          </div>
        </section>
      )}
    </div>
  );
}
