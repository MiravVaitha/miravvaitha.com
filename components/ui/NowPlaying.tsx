"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { SpotifyTrack } from "@/lib/spotify";
import { cn } from "@/lib/utils";

const POLL_INTERVAL_MS = 30_000;

export function NowPlaying() {
  const [data, setData] = useState<SpotifyTrack | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function tick() {
      try {
        const res = await fetch("/api/now-playing", { cache: "no-store" });
        const next = (await res.json()) as SpotifyTrack | null;
        if (cancelled) return;
        setData(next);
        setLoaded(true);
      } catch {
        if (!cancelled) setLoaded(true);
      }
      if (!cancelled) {
        timer = setTimeout(tick, POLL_INTERVAL_MS);
      }
    }

    tick();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  const label = data?.isPlaying ? "Now playing" : "Last played";
  const showProgress =
    !!data?.isPlaying &&
    data.progressMs != null &&
    data.durationMs != null &&
    data.durationMs > 0;
  const progressPct = showProgress
    ? Math.min(100, (data!.progressMs! / data!.durationMs!) * 100)
    : 0;

  const trackText = loaded ? (data?.track ?? "—") : "—";
  const artistText = loaded ? (data?.artist ?? "—") : "—";

  return (
    <div
      className={cn(
        "flex h-[72px] w-full items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-2 backdrop-blur-sm",
        "sm:w-72",
      )}
      aria-live="polite"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
        {data?.albumArtUrl && (
          <Image
            src={data.albumArtUrl}
            alt={`${data.album} cover art`}
            fill
            sizes="48px"
            className="object-cover"
            unoptimized
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full bg-spotify-green",
              data?.isPlaying && "animate-pulse",
            )}
            aria-hidden
          />
          {loaded ? label : "Loading"}
        </div>
        {data?.songUrl ? (
          <a
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-sm font-medium text-foreground hover:underline hover:decoration-spotify-green hover:underline-offset-2"
          >
            {trackText}
          </a>
        ) : (
          <div className="truncate text-sm font-medium text-foreground">
            {trackText}
          </div>
        )}
        <div className="truncate text-xs text-muted-foreground">
          {artistText}
        </div>
        {showProgress && (
          <div className="mt-0.5 h-0.5 w-full overflow-hidden rounded-full bg-neutral-800">
            <div
              className="h-full bg-spotify-green transition-[width] duration-1000 ease-linear"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
