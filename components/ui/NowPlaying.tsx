"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { SpotifyTrack } from "@/lib/spotify";

const POLL_INTERVAL_MS = 30_000;
const STORAGE_KEY = "np-last-known";

function fmt(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

type Props = {
  compact?: boolean;
};

export function NowPlaying({ compact = false }: Props) {
  const [data, setData] = useState<SpotifyTrack | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    // Hydrate from localStorage immediately so the widget never starts blank
    // on a cold visit (covers the case where the API also returns null
    // briefly, e.g. cold serverless instance with no cached data).
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setData(JSON.parse(stored) as SpotifyTrack);
        setLoaded(true);
      }
    } catch {
      // ignore localStorage failures (private mode, quota, etc.)
    }

    async function tick() {
      try {
        const res = await fetch("/api/now-playing", { cache: "no-store" });
        const next = (await res.json()) as SpotifyTrack | null;
        if (cancelled) return;
        // Only overwrite with a real response — never blank out the widget
        // because of a transient null from the API.
        if (next) {
          setData(next);
          try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          } catch {
            // ignore
          }
        }
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

  const playing = !!data?.isPlaying;
  const label = playing ? "NOW PLAYING" : "LAST PLAYED";
  const track = loaded ? (data?.track ?? "—") : "—";
  const artist = loaded ? (data?.artist ?? "—") : "—";
  const album = data?.album ?? "";
  const songUrl = data?.songUrl ?? null;
  const albumArt = data?.albumArtUrl ?? null;

  const durationMs = data?.durationMs ?? 0;
  const progressMs = data?.progressMs ?? 0;
  const pct = durationMs > 0 ? (progressMs / durationMs) * 100 : 0;
  const elapsedSec = progressMs / 1000;
  const remainingSec = Math.max(0, (durationMs - progressMs) / 1000);

  return (
    <div className={"np " + (compact ? "np-compact" : "")} aria-live="polite">
      <div className="np-art" data-magnetic>
        {albumArt ? (
          <Image
            src={albumArt}
            alt={album ? `${album} cover` : "Album art"}
            fill
            sizes="64px"
            className="np-art-img"
            unoptimized
          />
        ) : (
          <div className="np-art-inner">
            <div className="np-art-ring r1" />
            <div className="np-art-ring r2" />
            <div className="np-art-ring r3" />
            <div className="np-art-center" />
          </div>
        )}
        <div className={"np-eq" + (playing ? "" : " np-eq-paused")} aria-hidden>
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="np-meta">
        <div className="np-label">
          <span className="np-pulse" />
          <span>{label}</span>
        </div>
        <div className="np-track">
          {songUrl ? (
            <a href={songUrl} target="_blank" rel="noopener noreferrer">
              {track}
            </a>
          ) : (
            track
          )}
        </div>
        <div className="np-artist">{artist}</div>
        <div className="np-bar">
          <div className="np-bar-fill" style={{ width: pct + "%" }} />
        </div>
        <div className="np-times">
          <span>{fmt(elapsedSec)}</span>
          <span>−{fmt(remainingSec)}</span>
        </div>
      </div>
    </div>
  );
}
