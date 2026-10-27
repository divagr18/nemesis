import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { follow, pct } from "../lib/api";

const STAGES = { bank: "Building lessons", training: "Retraining", gating: "Checking for regressions", verified: "Live", rejected: "Kept the old robot" } as const;

/** Live progress of a patch job: one status line, a progress bar, and the regression gate when it lands. */
export default function PatchPanel({ job, onDone, onTimelapse }: { job: string; onDone?: (e: any) => void; onTimelapse?: (a: any[]) => void }) {
  const [stage, setStage] = useState<string>("bank");
  const [prog, setProg] = useState(0);
  const [gate, setGate] = useState<any>(null);
  const [error, setError] = useState("");
  const [versions, setVersions] = useState<[string, string] | null>(null);
  const [learned, setLearned] = useState("");

  useEffect(() => {
    let alive = true;
    follow(job, (e) => {
      if (!alive) return;
      if (e.stage === "started") setVersions([e.parent, e.version]);
      if (e.stage === "timelapse") onTimelapse?.(e.attempts);
      if (e.stage in STAGES) setStage(e.stage);
      if (e.stage === "progress") { setStage("training"); setProg(Math.min(1, e.step / e.total)); }
      if (e.stage === "trained") setProg(1);
      if (e.stage === "verified" || e.stage === "rejected") setGate(e.gate);
      if (e.stage === "failed") setError(e.error || "failed");
      if (e.stage === "learned") setLearned(e.sentence);
    }).then((e) => alive && onDone?.(e));
    return () => { alive = false; };
  }, [job]);

  const done = stage === "verified" || stage === "rejected";
  const checks = gate && [
    ["Fixed", gate.checks["fixes the attack"], `${pct(gate.suites.attacks.before)} → ${pct(gate.suites.attacks.after)} falls`],
    ["Still walks", gate.checks["still walks"], `${gate.suites.nominal.progress_after.toFixed(1)} m in 5 s`],
    ["Nothing else broke", gate.checks["no regressions"], `${pct(gate.suites.gauntlet.before)} → ${pct(gate.suites.gauntlet.after)} on 52 scenarios`],
  ];
  return (
    <div className="rise rounded-2xl border border-line bg-panel p-5">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[15px]">
          {error ? <span className="text-ember">{error}</span> : STAGES[stage as keyof typeof STAGES]}
          {!done && !error && <span className="blink text-ember"> ●</span>}
        </p>
        {versions && <span className="font-mono text-xs text-faint">{versions[0]} → {stage === "rejected" ? versions[0] : versions[1]}</span>}
      </div>
      <div className="mt-4 h-px overflow-hidden bg-line">
        <div className="h-full bg-ember transition-[width] duration-700 ease-out-soft" style={{ width: `${(done ? 1 : stage === "bank" ? 0.04 : stage === "gating" ? 1 : prog) * 100}%` }} />
      </div>
      {checks && (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {checks.map(([name, ok, detail]) => (
            <div key={name as string} className="flex gap-2.5">
              {ok ? <Check size={16} className="mt-0.5 shrink-0 text-acid" /> : <X size={16} className="mt-0.5 shrink-0 text-ember" />}
              <div><p className="text-sm">{name}</p><p className="text-xs text-faint">{detail}</p></div>
            </div>
          ))}
        </div>
      )}
      {learned && <p className="rise mt-4 text-[14px] leading-relaxed text-mute"><span className="text-peri">Muse Spark · </span>{learned}</p>}
    </div>
  );
}
