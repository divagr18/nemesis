import { useEffect, useState } from "react";
import { api } from "./api";

export type Versions = { live: string; versions: { name: string; parent: string | null; created: number; attacks: string[]; changelog?: { learned: string; still_cant: string } | null }[]; bank: number };

/** The robot lineage, refreshed when `tick` changes. */
export function useVersions(tick = 0) {
  const [v, setV] = useState<Versions | null>(null);
  useEffect(() => { api<Versions>("/api/versions").then(setV).catch(() => {}); }, [tick]);
  return v;
}
