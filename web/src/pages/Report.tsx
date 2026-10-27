import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, follow, pct, post } from "../lib/api";

const fmt = (v: any): string => {
  if (v == null) return "never";
  if (Array.isArray(v)) {
    if (v.every((x) => x === v[0])) return fmt(v[0]);
    const nz = v.filter((x: number) => Math.abs(x) > 1e-6);
    return nz.length === 1 ? fmt(nz[0]) : `[${v.map((x: number) => +(+x).toFixed(2)).join(", ")}]`;
  }
  return typeof v === "number" ? String(+v.toFixed(2)) : String(v);
};

export default function Report() {
  const { version: param } = useParams();
  const [version, setVersion] = useState(param || "");
  const [rep, setRep] = useState<any>(null);
  const [missing, setMissing] = useState(false);
  const [status, setStatus] = useState("");

  const [loadError, setLoadError] = useState("");
  useEffect(() => {
    let alive = true;
    (async () => {
      for (let attempt = 0; attempt < 5 && alive; attempt++) {  // the server may be restarting; retry briefly
        try {
          const v = param || (await api("/api/versions")).live;
          if (!alive) return;
          setVersion(v); setLoadError("");
          try { setRep(await api(`/api/report/${v}`)); } catch { setMissing(true); }
          return;
        } catch (e: any) {
          setLoadError(e.message || "can't reach the server");
          await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
        }
      }
    })();
    return () => { alive = false; };
  }, [param]);

  const generate = async () => {
    setStatus("Starting…");
    try {
      const { job } = await post("/api/report", { version });
      await follow(job, (e) => e.message && setStatus(e.message));
      setRep(await api(`/api/report/${version}`)); setMissing(false);
    } catch (e: any) { setStatus(e.message); }
  };

  if (!rep) {
    return (
      <div className="mx-auto max-w-3xl pt-16">
        <h1 className="text-[40px] font-medium tracking-[-0.03em] sm:text-[56px]">Readiness report <span className="text-faint">{version}</span></h1>
        {!missing && (loadError
          ? <p className="mt-8 text-mute">Can't reach the robot right now. <span className="text-faint">{loadError}</span></p>
          : <p className="mt-8 text-sm text-faint"><span className="blink text-ember">●</span> Loading…</p>)}
        {missing && (
          <div className="mt-8">
            <p className="text-mute">Re-tests every attack and the 52-scenario gauntlet against {version}, measures safety margins, and has Muse Wonder write it up.</p>
            <button onClick={generate} disabled={!!status} className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-black disabled:opacity-40">Generate</button>
            {status && <p className="mt-4 text-sm text-mute"><span className="blink text-ember">●</span> {status}</p>}
          </div>
        )}
      </div>
    );
  }

  const s = rep.summary || {}, t = rep.totals;
  return (
    <article className="mx-auto max-w-4xl pt-14">
      <p className="font-mono text-xs text-faint">Unitree Go1 · {rep.version} · {new Date(rep.created * 1000).toLocaleDateString()}</p>
      <h1 className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.025em] sm:text-[44px]">{s.headline}</h1>
      <p className="mt-6 text-[17px] leading-relaxed text-mute">{s.summary}</p>

      <div className="mt-12 grid grid-cols-2 border-y border-line sm:grid-cols-4">
        {[[t.attacks, "attacks tested"], [t.break_v1, "broke the original"], [t.break_now, `still break ${rep.version}`],
          [`${pct(rep.gauntlet.v1)} → ${pct(rep.gauntlet[rep.version])}`, "gauntlet falls"]].map(([n, l], i) => (
          <div key={i} className={`py-5 ${i ? "sm:border-l sm:border-line sm:pl-5" : ""}`}>
            <p className="text-2xl font-medium tracking-tight">{n}</p><p className="mt-1 text-sm text-faint">{l}</p>
          </div>
        ))}
      </div>

      {s.recommendations?.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-medium">Recommendations</h2>
          <ol className="mt-5 space-y-3">
            {s.recommendations.map((x: string, i: number) => (
              <li key={i} className="flex gap-4 text-[15px] leading-relaxed text-mute"><span className="font-mono text-xs text-faint pt-1">{i + 1}</span>{x}</li>
            ))}
          </ol>
        </section>
      )}

      <section className="mt-16">
        <h2 className="text-xl font-medium">Findings</h2>
        <div className="mt-6 space-y-12">
          {rep.findings.map((f: any) => (
            <div key={f.id} className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
              <video src={f.clip} muted loop playsInline controls preload="metadata" className="w-full rounded-xl border border-line" />
              <div>
                <p className={`font-mono text-xs ${f.fall_now >= 0.5 ? "text-ember" : "text-acid"}`}>{f.fall_now >= 0.5 ? "open" : "fixed"} · {f.family}</p>
                <p className="mt-2 text-[17px] leading-snug">{f.text}</p>
                <p className="mt-3 text-sm text-faint">
                  {Object.entries(f.status || {}).map(([v, x]: any) => `${v} ${pct(x)}`).join(" · ")} · now {pct(f.fall_now)}
                </p>
                {f.diagnosis && <p className="mt-4 border-l-2 border-peri/60 pl-4 text-sm leading-relaxed text-mute"><span className="text-ink">{f.diagnosis.mode}.</span> {f.diagnosis.what_happened}</p>}
                {f.margin && (
                  <div className="mt-5">
                    <p className="text-sm text-mute">Falls begin at <span className="font-mono text-ink">{fmt(f.margin.starts_falling_at)}</span> <span className="text-faint">{f.margin.condition}</span></p>
                    <div className="mt-2 flex h-8 max-w-xs items-end gap-1">
                      {f.margin.curve.map((c: number, i: number) => <i key={i} style={{ height: `${Math.max(6, c * 100)}%` }} className={`block flex-1 ${c >= 0.5 ? "bg-ember" : "bg-white/15"}`} />)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
