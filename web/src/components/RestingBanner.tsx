import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

type Mode = "normal" | "clamped" | "stopped";

const link = "text-ink/85 underline decoration-white/25 underline-offset-[3px] transition-colors hover:text-ink hover:decoration-white/60";

/** A quiet site-wide note when the model budget is clamped or used up (the spend ledger's mode, from
 *  /api/limits). Checked on load and every five minutes; nothing shows in normal mode. */
export default function RestingBanner() {
  const [mode, setMode] = useState<Mode>("normal");
  useEffect(() => {
    const load = () => api<{ mode?: Mode }>("/api/limits").then((l) => setMode(l.mode ?? "normal")).catch(() => {});
    load();
    const t = window.setInterval(load, 5 * 60_000);
    return () => window.clearInterval(t);
  }, []);
  if (mode !== "clamped" && mode !== "stopped") return null;
  return (
    <div className="flex justify-center px-3 pt-3">
      <p role="status" className="flex max-w-xl items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[.03] px-4 py-2.5 text-[13px] leading-snug text-mute">
        <i className="mt-[6px] size-1.5 shrink-0 rounded-full bg-faint" aria-hidden />
        {mode === "stopped" ? (
          <span>
            Muse is resting: this demo has used its model budget. The <Link to="/playground" className={link}>Playground</Link>,
            the replays and the <Link to="/" className={link}>Hall of Fame</Link> still work.
          </span>
        ) : (
          <span>
            Muse is limited right now, so new situations are capped for a while. The <Link to="/playground" className={link}>Playground</Link>,
            the replays and the Hall of Fame work as usual.
          </span>
        )}
      </p>
    </div>
  );
}
