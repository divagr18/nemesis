import { useEffect, useState } from "react";
import { api } from "../lib/api";

const NICE: Record<string, string> = {
  foot_friction: "friction", ice_mu: "ice friction", push1_force: "shove (N)", push2_force: "second shove (N)",
  payload_mass: "load (kg)", motor_strength: "motor strength", latency: "lag (steps)", obs_noise: "sensor noise",
  slope: "slope (rad)", joint_friction: "joint friction", stairs_height: "step height (m)",
};
const nice = (c: string) => NICE[c] || c.replace(/_/g, " ");

/** Safety envelope: fall rate over the two conditions that matter most for an attack, per version. */
export default function Envelope({ attackId, versions }: { attackId: string; versions: string[] }) {
  const [env, setEnv] = useState<any>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    setEnv(null); setError("");
    api(`/api/envelope?attack_id=${attackId}&versions=${versions.join(",")}`).then(setEnv).catch((e) => setError(e.message));
  }, [attackId, versions.join(",")]);

  if (error) return null;
  if (!env) return <p className="mt-4 text-[13px] text-faint"><span className="blink text-ember">●</span> Mapping the safety envelope…</p>;
  const names = Object.keys(env.grids);
  const safe = (g: number[][]) => g.flat().filter((f) => f < 0.5).length / g.flat().length;
  return (
    <div className="rise mt-5">
      <p className="text-[14px] text-mute">
        Safe region, from normal to this attack:{" "}
        {names.map((n, i) => (
          <span key={n}>{i > 0 && " → "}<span className={i === names.length - 1 ? "text-acid" : "text-ink"}>{Math.round(safe(env.grids[n]) * 100)}%</span> <span className="text-faint">{n}</span></span>
        ))}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-4">
        {names.map((n) => <Grid key={n} label={n} grid={env.grids[n]} x={env.x} y={env.y} />)}
      </div>
    </div>
  );
}

function Grid({ label, grid, x, y }: { label: string; grid: number[][]; x: any; y: any }) {
  const n = grid.length, cell = 100 / n;
  return (
    <figure>
      <svg viewBox="0 0 100 100" className="aspect-square w-full overflow-visible rounded-md">
        {grid.map((row, i) => row.map((f, j) => (
          // x axis = first condition (rows i), y axis = second condition (cols j), origin bottom-left = normal
          <rect key={`${i}-${j}`} x={i * cell} y={100 - (j + 1) * cell} width={cell + 0.05} height={cell + 0.05}
            fill={f >= 0.5 ? `rgba(255,91,53,${0.35 + 0.65 * f})` : `rgba(215,242,93,${0.06 + 0.14 * (1 - f)})`} />
        )))}
      </svg>
      <figcaption className="mt-1.5 flex justify-between font-mono text-[11px] text-faint">
        <span>{label}</span><span>{nice(x.condition)} → · {nice(y.condition)} ↑</span>
      </figcaption>
    </figure>
  );
}
