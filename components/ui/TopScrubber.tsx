"use client";

import { useEffect, useRef, useState } from "react";

// Top-of-page progress bar — scroll position as a track-progress, clickable
// to seek.
export function TopScrubber() {
  const [pct, setPct] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max <= 0 ? 0 : (window.scrollY / max) * 100);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function seekTo(clientX: number) {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * p, behavior: "smooth" });
  }

  return (
    <div
      className="top-scrubber"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        ref={trackRef}
        className="ts-track"
        onClick={(e) => seekTo(e.clientX)}
      >
        <div className="ts-fill" style={{ width: pct + "%" }} />
        <div className="ts-thumb" style={{ left: pct + "%" }} />
      </div>
    </div>
  );
}
