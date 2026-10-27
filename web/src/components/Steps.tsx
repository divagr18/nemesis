import { Check, Loader2 } from "lucide-react";

/** Live progress: finished steps with a check, the current one with a spinner. */
export default function Steps({ steps, className = "" }: { steps: string[]; className?: string }) {
  if (!steps.length) return null;
  return (
    <ol className={`space-y-1.5 ${className}`}>
      {steps.map((s, i) => {
        const current = i === steps.length - 1;
        return (
          <li key={i} className={`rise flex items-center gap-2.5 text-[13px] ${current ? "text-ink" : "text-mute"}`}>
            {current ? <Loader2 size={13} className="shrink-0 animate-spin text-ember" /> : <Check size={13} className="shrink-0 text-acid" />}
            <span className="truncate">{s}</span>
          </li>
        );
      })}
    </ol>
  );
}
