import { ArrowRight, Check, Lock, RotateCcw, Share } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Composer from "../components/Composer";
import PatchPanel from "../components/PatchPanel";
import Replay from "../components/Replay";
import Seeds from "../components/Seeds";
import { api, post, upload } from "../lib/api";

type Side = { text: string; score: number; seeds: boolean[]; subtlety: number; cheap: boolean; reference_fall_rate: number; traj: any };
type Round = { round: number; you: Side; muse: Side; comment: string; sealed: string; commit: string };
type Duel = { id: string; rounds: number; hard: boolean; version: string; history: Round[]; score: { you: number; muse: number }; over: boolean; winner: string | null; last?: Round };
type Tally = { you: number; muse: number; draw: number; log?: string[] };

const EXAMPLES = ["A light shove from the right as it turns", "Slightly wet tiles and a 3 kg backpack", "The back-left knee is a bit weak", "20 ms of lag on a gentle downhill"];

export default function Arena() {
  const [tally, setTally] = useState<Tally | null>(null);
  const [rounds, setRounds] = useState(3);
  const [hard, setHard] = useState(false);
  const [duel, setDuel] = useState<Duel | null>(null);
  const [phase, setPhase] = useState<"lobby" | "turn" | "running" | "reveal" | "final">("lobby");
  const [commit, setCommit] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadTally = () => api<Tally>("/api/duel_tally").then(setTally).catch(() => {});
  useEffect(() => { loadTally(); }, []);

  // Muse locks in its attack at the start of every turn; we only ever see its hash until the reveal.
  useEffect(() => {
    if (phase !== "turn" || !duel) return;
    setCommit(null);
    const t = setInterval(async () => {
      const m = await api(`/api/duel/${duel.id}/muse`).catch(() => null);
      if (m?.locked) { setCommit(m.commit); clearInterval(t); }
    }, 1200);
    return () => clearInterval(t);
  }, [phase, duel?.history.length]);

  const start = async () => {
    setError("");
    try { setDuel(await post<Duel>("/api/duel", { rounds, hard })); setPhase("turn"); window.scrollTo({ top: 0 }); }
    catch (e: any) { setError(e.message); }
  };

  const play = async (req: () => Promise<Duel>) => {
    setPhase("running"); setError("");
    try { setDuel(await req()); setPhase("reveal"); }
    catch (e: any) { setError(e.message); setPhase("turn"); }
  };

  if (phase === "lobby" || !duel) {
    return (
      <div className="grid gap-16 pt-10 sm:pt-16 lg:grid-cols-[1.3fr_1fr]">
        <section>
          <h1 className="text-[48px] font-medium leading-[1] tracking-[-0.04em] sm:text-[84px]">
            <span className="text-peri">You</span> <span className="text-faint">vs</span> <span className="text-ember">Muse</span>
          </h1>
          <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-mute">
            You both write an attack on the same robot, at the same time. The subtlest one that still knocks it over wins.
            Brute force scores nothing.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Toggle options={[["3", "Best of 3"], ["5", "Best of 5"]]} value={String(rounds)} onChange={(v) => setRounds(+v)} />
            <Toggle options={[["0", "Normal"], ["1", "Hard"]]} value={hard ? "1" : "0"} onChange={(v) => setHard(v === "1")} />
          </div>
          <button onClick={start} className="mt-6 flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-black transition-opacity hover:opacity-85">
            Start <ArrowRight size={16} />
          </button>
          {error && <p className="mt-3 text-sm text-ember">{error}</p>}
        </section>
        <Record tally={tally} />
      </div>
    );
  }

  const last = duel.history.at(-1);
  return (
    <div className="pt-8">
      <Scoreboard duel={duel} />

      {phase === "turn" && (
        <div className="rise mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Composer accent="bg-peri" examples={EXAMPLES}
              onText={(text) => play(() => post(`/api/duel/${duel.id}/round`, { text }))}
              onVoice={(wav) => play(() => upload(`/api/duel/${duel.id}/round_voice`, "audio", wav, "attack.wav"))} />
            {error && <p className="mt-3 text-sm text-ember">{error}</p>}
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-line px-5 py-4">
            <div className={`grid size-10 shrink-0 place-items-center rounded-full ${commit ? "bg-ember/15 text-ember" : "bg-white/5 text-faint"}`}>
              <Lock size={16} strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <p className="text-[15px]">{commit ? "Muse has sealed its attack" : <>Muse is writing its attack<span className="blink">…</span></>}</p>
              <p className="truncate font-mono text-xs text-faint">{commit ? `sha256 ${commit}` : "it never sees yours"}</p>
            </div>
          </div>
        </div>
      )}

      {phase === "running" && (
        <div className="mx-auto mt-24 w-64 text-center">
          <p className="text-sm text-mute">Running both attacks on the same robot</p>
          <div className="mt-4 h-px overflow-hidden bg-line"><div className="sweep h-full w-1/3 bg-ember" /></div>
        </div>
      )}

      {phase === "reveal" && last && (
        <Reveal r={last} over={duel.over} onNext={() => (duel.over ? (setPhase("final"), loadTally()) : setPhase("turn"))} />
      )}

      {phase === "final" && <Final duel={duel} onRematch={start} />}
    </div>
  );
}

function Toggle({ options, value, onChange }: { options: [string, string][]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="inline-flex rounded-full border border-line p-1">
      {options.map(([v, label]) => (
        <button key={v} onClick={() => onChange(v)}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${value === v ? "bg-white/10 text-ink" : "text-faint hover:text-mute"}`}>{label}</button>
      ))}
    </div>
  );
}

function Record({ tally }: { tally: Tally | null }) {
  const log = tally?.log?.slice(-60) || [];
  return (
    <aside className="self-end">
      <div className="grid grid-cols-12 gap-1.5">
        {log.map((w, i) => <i key={i} className={`block aspect-square ${w === "you" ? "bg-peri" : w === "muse" ? "bg-ember" : "bg-white/25"}`} />)}
        {Array.from({ length: Math.max(0, 60 - log.length) }, (_, i) => <i key={`e${i}`} className="block aspect-square border border-white/[.07]" />)}
      </div>
      <p className="mt-4 text-sm text-mute">
        Humans <span className="text-peri">{tally?.you ?? 0}</span>
        <span className="mx-2 text-faint">·</span>
        Muse <span className="text-ember">{tally?.muse ?? 0}</span>
      </p>
    </aside>
  );
}

function Scoreboard({ duel }: { duel: Duel }) {
  const n = Math.min(duel.history.length + 1, duel.rounds);
  return (
    <div className="flex items-center justify-between border-b border-line pb-6">
      <div><p className="text-sm text-mute">You</p><p className="text-5xl font-medium tracking-tight text-peri tabular-nums">{duel.score.you}</p></div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-1.5">
          {Array.from({ length: duel.rounds }, (_, i) => {
            const r = duel.history[i];
            const tone = !r ? (i === duel.history.length ? "bg-white/40" : "bg-white/10") : r.you.score > r.muse.score ? "bg-peri" : r.muse.score > r.you.score ? "bg-ember" : "bg-white/40";
            return <i key={i} className={`block h-1 w-7 ${tone}`} />;
          })}
        </div>
        <p className="font-mono text-xs text-faint">{duel.over ? "final" : `round ${n} of ${duel.rounds}`}</p>
      </div>
      <div className="text-right"><p className="text-sm text-mute">Muse</p><p className="text-5xl font-medium tracking-tight text-ember tabular-nums">{duel.score.muse}</p></div>
    </div>
  );
}

function Reveal({ r, over, onNext }: { r: Round; over: boolean; onNext: () => void }) {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [typed, setTyped] = useState("");
  useEffect(() => {
    crypto.subtle?.digest("SHA-256", new TextEncoder().encode(r.sealed)).then((b) =>
      setVerified([...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("") === r.commit));
    let i = 0;
    const t = setInterval(() => { i += 2; setTyped(r.comment.slice(0, i)); if (i >= r.comment.length) clearInterval(t); }, 18);
    return () => clearInterval(t);
  }, [r.round]);
  return (
    <div className="rise mt-10">
      <div className="grid gap-5 md:grid-cols-2">
        <SideCard who="You" s={r.you} other={r.muse} color="bg-peri" text="text-peri" />
        <SideCard who="Muse" s={r.muse} other={r.you} color="bg-ember" text="text-ember" />
      </div>
      {r.comment && <p className="mx-auto mt-10 max-w-2xl text-center text-[17px] leading-relaxed text-mute">{typed}</p>}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <p className="flex items-center gap-2 font-mono text-xs text-faint">
          {verified && <><Check size={13} className="text-acid" /> Muse's attack matches the hash it sealed before you wrote yours</>}
        </p>
        <button onClick={onNext} className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-black hover:opacity-85">
          {over ? "Result" : "Next round"} <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

function SideCard({ who, s, other, color, text }: { who: string; s: Side; other: Side; color: string; text: string }) {
  const won = s.score > other.score;
  const falls = s.seeds.filter(Boolean).length;
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-[#0b0d12]">
        <Replay trajs={[{ ...s.traj, label: who.toUpperCase() }]} className="absolute inset-0" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="text-sm text-faint">{who}</p>
          <p className="mt-1 text-[17px] leading-snug">{s.text}</p>
        </div>
        <p className={`text-4xl font-medium tabular-nums tracking-tight ${won ? text : "text-faint"}`}>{s.score}</p>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <Seeds seeds={s.seeds} color={color} />
        <p className="text-xs text-faint">
          {s.cheap ? <span className="text-ember">brute force, scores 0</span> : `${falls}/8 falls · ${Math.round(s.subtlety * 100)}% subtle`}
        </p>
      </div>
    </div>
  );
}

function Final({ duel, onRematch }: { duel: Duel; onRematch: () => void }) {
  const [job, setJob] = useState<string | null>(null);
  const [error, setError] = useState("");
  const w = duel.winner;
  const learnable = duel.history.some((r) => (["you", "muse"] as const).some((k) => r[k].seeds.filter(Boolean).length >= 4 && !r[k].cheap));
  const share = () => {
    const { you, muse } = duel.score;
    const msg = w === "you" ? `I beat Meta's Muse ${you}–${muse} at breaking a robot.` : w === "muse" ? `Meta's Muse beat me ${muse}–${you} at breaking a robot.` : `I drew with Meta's Muse at breaking a robot.`;
    window.open(`https://x.com/intent/post?text=${encodeURIComponent(msg + " Subtle beats brutal.")}&url=${encodeURIComponent(location.origin + "/arena")}`, "_blank");
  };
  const top = useRef<HTMLDivElement>(null);
  useEffect(() => top.current?.scrollIntoView({ behavior: "smooth" }), []);
  return (
    <div ref={top} className="rise mt-14">
      <h2 className={`text-[64px] font-medium leading-none tracking-[-0.045em] sm:text-[120px] ${w === "you" ? "text-peri" : w === "muse" ? "text-ember" : ""}`}>
        {w === "you" ? "You win." : w === "muse" ? "Muse wins." : "Draw."}
      </h2>
      <div className="mt-12 divide-y divide-line border-y border-line">
        {duel.history.map((r) => (
          <div key={r.round} className="grid gap-x-8 gap-y-2 py-4 text-[15px] sm:grid-cols-2">
            {(["you", "muse"] as const).map((k) => (
              <div key={k} className="flex items-baseline justify-between gap-4">
                <p className="text-mute"><span className="mr-3 font-mono text-xs text-faint">{k === "you" ? "you" : "muse"}</span>{r[k].text}</p>
                <span className={`font-mono text-sm ${r[k].score > r[k === "you" ? "muse" : "you"].score ? (k === "you" ? "text-peri" : "text-ember") : "text-faint"}`}>{r[k].score}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        {learnable && !job && (
          <button onClick={async () => { try { setJob((await post(`/api/duel/${duel.id}/patch`)).job); } catch (e: any) { setError(e.message); } }}
            className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-black hover:opacity-85">
            Teach the robot what broke it <ArrowRight size={15} />
          </button>
        )}
        <button onClick={share} className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm hover:border-white/25"><Share size={14} /> Share</button>
        <button onClick={onRematch} className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm hover:border-white/25"><RotateCcw size={14} /> Rematch</button>
      </div>
      {error && <p className="mt-3 text-sm text-ember">{error}</p>}
      {job && <div className="mt-6"><PatchPanel job={job} /></div>}
    </div>
  );
}
