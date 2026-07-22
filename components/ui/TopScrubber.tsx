"use client";

import { useEffect, useRef } from "react";

// Top-of-page progress bar showing scroll position as track-progress, clickable
// to seek. Scroll updates are rAF-throttled and write styles directly on refs,
// so scrolling never triggers a React re-render (setState per scroll event was
// a measurable jank source).
export function TopScrubber() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;

    function update() {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max <= 0 ? 0 : (window.scrollY / max) * 100;
      if (fillRef.current) fillRef.current.style.width = pct + "%";
      if (thumbRef.current) thumbRef.current.style.left = pct + "%";
      if (barRef.current) {
        barRef.current.setAttribute("aria-valuenow", String(Math.round(pct)));
      }
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
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
      ref={barRef}
      className="top-scrubber"
      role="progressbar"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        ref={trackRef}
        className="ts-track"
        onClick={(e) => seekTo(e.clientX)}
      >
        <div ref={fillRef} className="ts-fill" />
        <div ref={thumbRef} className="ts-thumb" />
      </div>
    </div>
  );
}
