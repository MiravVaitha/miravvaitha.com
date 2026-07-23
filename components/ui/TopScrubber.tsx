"use client";

import { useEffect, useRef } from "react";

// Top-of-page progress bar showing scroll position as track-progress, clickable
// to seek. Scroll updates are rAF-throttled and write styles directly on refs,
// so scrolling never triggers a React re-render (setState per scroll event was
// a measurable jank source). Position is written as transform/translate —
// compositor-only — because width/left writes re-layout on every scroll frame.
export function TopScrubber() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    let lastAria = -1;

    function update() {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max <= 0 ? 0 : Math.min(1, window.scrollY / max);
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${p})`;
      }
      if (thumbRef.current && trackRef.current) {
        // translate (not transform) so the :hover scale in CSS still applies.
        thumbRef.current.style.setProperty(
          "translate",
          p * trackRef.current.clientWidth + "px 0",
        );
      }
      const rounded = Math.round(p * 100);
      if (barRef.current && rounded !== lastAria) {
        lastAria = rounded;
        barRef.current.setAttribute("aria-valuenow", String(rounded));
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
