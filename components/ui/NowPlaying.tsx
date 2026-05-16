"use client";

import { useEffect, useState } from "react";
import type { SpotifyTrack } from "@/lib/spotify";
import { cn } from "@/lib/utils";

export function NowPlaying() {
  const [data, setData] = useState<SpotifyTrack | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/now-playing")
      .then((r) => r.json())
      .then((d: SpotifyTrack | null) => {
        if (cancelled) return;
        setData(d);
        setLoaded(true);
      })
      .catch(() => {
        if (cancelled) return;
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const label = data?.isPlaying ? "Now playing" : "Last played";

  return (
    <div
      className={cn(
        "flex h-[68px] w-full items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-2 backdrop-blur-sm",
        "sm:w-72"
      )}
      aria-live="polite"
    >
      <div className="h-12 w-12 shrink-0 rounded-md bg-muted" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full bg-spotify-green",
              data?.isPlaying && "animate-pulse"
            )}
            aria-hidden
          />
          {loaded ? label : "Loading"}
        </div>
        <div className="truncate text-sm font-medium text-foreground">
          {loaded ? data?.track ?? "—" : "—"}
        </div>
        <div className="truncate text-xs text-muted-foreground">
          {loaded ? data?.artist ?? "—" : "—"}
        </div>
      </div>
    </div>
  );
}
