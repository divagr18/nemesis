import { NavLink, Outlet } from "react-router-dom";
import { useVersions } from "../lib/live";

const links = [["/", "Break it"], ["/arena", "You vs Muse"], ["/agent", "Agent"], ["/report", "Report"]] as const;

export function Mark({ className = "" }) {
  return (
    <span className={`inline-grid gap-[3px] ${className}`} aria-hidden>
      <i className="block h-[3px] w-4 bg-ember" /><i className="ml-1 block h-[3px] w-3 bg-ember" /><i className="block h-[3px] w-4 bg-ember" />
    </span>
  );
}

export default function Layout() {
  const v = useVersions();
  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex max-w-6xl items-center gap-8 px-5 py-5 sm:px-8">
        <NavLink to="/" className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight">
          <Mark /> nemesis
        </NavLink>
        <nav className="flex min-w-0 gap-5 overflow-x-auto text-[13px] text-mute">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}
              className={({ isActive }) => `whitespace-nowrap transition-colors hover:text-ink ${isActive ? "text-ink" : ""}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        {v && <span className="ml-auto hidden font-mono text-xs text-faint sm:block">robot <span className="text-ink">{v.live}</span></span>}
      </header>
      <main className="mx-auto max-w-6xl px-5 pb-24 sm:px-8"><Outlet /></main>
      <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 border-t border-line px-5 py-8 text-xs text-faint sm:px-8">
        <span>Muse Wonder · Muse Spark · Muse Voice Transcribe · Muse Glimmer · MuJoCo MJX</span>
        <a className="hover:text-mute" href="https://github.com/divagr18/nemesis">source</a>
      </footer>
    </div>
  );
}
