import { useEffect, useRef } from "react";
// @ts-ignore  (plain JS module: three.js playback of poses exported by nemesis/sim/export.py)
import { mountReplay } from "../lib/replay.js";

type Traj = { url?: string; label?: string; [k: string]: any };

/** 3D replay of one or more recorded rollouts. `trajs` are URLs ({url, label}) or inline trajectories. */
export default function Replay({ trajs, className = "", hud = true, robot = "go1" }:
  { trajs: Traj[]; className?: string; hud?: boolean; robot?: string }) {
  const el = useRef<HTMLDivElement>(null);
  const key = JSON.stringify(trajs.map((t) => t.url || t.label || t.n_frames));
  useEffect(() => {
    if (!el.current || !trajs.length) return;
    let handle: any, dead = false;
    const inline = trajs.every((t) => !t.url);
    mountReplay(el.current, {
      assetsUrl: `/assets/${robot}_scene.json`, hud,
      ...(inline ? { trajs } : { trajUrls: trajs.map((t) => ({ url: t.url, label: t.label })) }),
    }).then((h: any) => { if (dead) h.dispose(); else handle = h; });
    return () => { dead = true; handle?.dispose(); };
  }, [key, robot]);
  return <div ref={el} className={`replay-fill overflow-hidden ${className}`} />;
}
