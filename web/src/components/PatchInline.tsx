import { Check, X } from "lucide-react";
import { pct } from "../lib/api";

/** Patch progress rendered from events that arrive inside another job's stream (agent mode). */
export default function PatchInline({ events }: { events: any[] }) {
  const last = events.at(-1);
  const prog = events.filter((e) => e.stage === "progress").at(-1);
  const end = events.find((e) => e.stage === "verified" || e.stage === "rejected");
  const label = end ? (end.stage === "verified" ? `${end.version} is live` : "Kept the old robot")
    : last?.stage === "gating" ? "Checking for regressions" : last?.stage === "bank" ? "Building lessons" : "Retraining";
  const frac = end || last?.stage === "gating" ? 1 : prog ? prog.step / prog.total : 0.04;
  const g = end?.gate;
  return (
    <div className="rise rounded-xl border border-line px-4 py-3.5">
      <p className="text-[14px]">{label}{!end && <span className="blink text-ember"> ●</span>}</p>
      <div className="mt-3 h-px overflow-hidden bg-line"><div className="h-full bg-ember transition-[width] duration-700" style={{ width: `${frac * 100}%` }} /></div>
      {g && (
        <div className="mt-3 space-y-1.5 text-[13px] text-mute">
          {[["Fixed", g.checks["fixes the attack"], `${pct(g.suites.attacks.before)} → ${pct(g.suites.attacks.after)} falls`],
            ["Still walks", g.checks["still walks"], `${g.suites.nominal.progress_after.toFixed(1)} m in 5 s`],
            ["Nothing else broke", g.checks["no regressions"], `${pct(g.suites.gauntlet.before)} → ${pct(g.suites.gauntlet.after)}`]].map(([n, ok, d]) => (
            <p key={n as string} className="flex items-center gap-2">
              {ok ? <Check size={13} className="text-acid" /> : <X size={13} className="text-ember" />} {n} <span className="text-faint">· {d}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
