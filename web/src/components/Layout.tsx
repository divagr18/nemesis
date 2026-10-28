import { NavLink, Outlet } from "react-router-dom";
import { useVersions } from "../lib/live";

const links = [["/", "Break it"], ["/deploy", "Deploy it"], ["/arena", "You vs Muse"], ["/autopilot", "Autopilot"], ["/readiness", "Readiness"]] as const;

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
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-3 z-20 flex justify-center px-3 pt-4 sm:top-4 sm:pt-5">
        <div className="flex max-w-full items-center gap-1 rounded-full border border-white/10 bg-white/[.04] p-1.5 pl-5 shadow-[0_8px_32px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-xl backdrop-saturate-150">
          <NavLink to="/" className="mr-3 flex shrink-0 items-center gap-2.5 text-base font-medium tracking-tight">
            <Mark /> <span className="hidden sm:inline">nemesis</span>
          </NavLink>
          <nav className="flex min-w-0 gap-1 overflow-x-auto">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"}
                className={({ isActive }) => `whitespace-nowrap rounded-full px-3 py-2 text-[15px] transition-colors sm:px-4 ${isActive ? "bg-white/10 text-ink" : "text-mute hover:text-ink"}`}>
                {label}
              </NavLink>
            ))}
          </nav>
          {v && <span className="ml-2 hidden shrink-0 rounded-full bg-white/[.06] px-3.5 py-2 font-mono text-[13px] text-mute md:block">{v.live}</span>}
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 pt-8 pb-24 sm:px-8"><Outlet /></main>
      <footer className="mx-auto flex w-full max-w-7xl flex-wrap justify-between gap-4 border-t border-line px-5 py-8 text-xs text-faint sm:px-8">
        <span>Muse Wonder · Muse Spark · Muse Voice Transcribe · Muse Glimmer · MuJoCo MJX</span>
        <a className="hover:text-mute" href="https://github.com/divagr18/nemesis">source</a>
      </footer>
    </div>
  );
}
