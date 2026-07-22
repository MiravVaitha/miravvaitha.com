"use client";

import { useEffect, useRef, useState } from "react";

// Replaces the native browser scrollbar with a thin track on the right edge.
// Thumb is sized proportionally to viewport/document and draggable. Scroll
// updates are rAF-throttled and mutate the thumb's style directly, so
// scrolling never triggers a React re-render (the previous setState-per-scroll
// was a measurable jank source).
export function SideScrollbar() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const thumbH = useRef(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let raf = 0;

    function update() {
      raf = 0;
      const root = rootRef.current;
      const thumb = thumbRef.current;
      if (!root || !thumb) return;
      const vh = window.innerHeight;
      const dh = document.documentElement.scrollHeight;
      if (dh <= vh + 4) {
        root.style.display = "none";
        thumbH.current = 0;
        return;
      }
      root.style.display = "";
      const trackH = vh - 32;
      const h = Math.max(32, (vh / dh) * trackH);
      const max = dh - vh;
      const pos = (window.scrollY / max) * (trackH - h);
      if (h !== thumbH.current) {
        thumbH.current = h;
        thumb.style.height = h + "px";
      }
      thumb.style.transform = `translateY(${pos}px)`;
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
    };
  }, []);

  function onDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!trackRef.current) return;
    e.preventDefault();
    setActive(true);
    document.documentElement.classList.add("ss-dragging");
    const rect = trackRef.current.getBoundingClientRect();
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const trackH = rect.height;
    const h = thumbH.current;

    function moveTo(clientY: number) {
      const offsetY = clientY - rect.top - h / 2;
      const clamped = Math.max(0, Math.min(trackH - h, offsetY));
      const pct = clamped / (trackH - h);
      window.scrollTo({ top: max * pct, behavior: "auto" });
    }

    moveTo(e.clientY);
    const move = (ev: PointerEvent) => {
      ev.preventDefault();
      moveTo(ev.clientY);
    };
    const up = () => {
      setActive(false);
      document.documentElement.classList.remove("ss-dragging");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }

  return (
    <div
      ref={rootRef}
      className="side-scroll"
      style={{ display: "none" }}
      aria-hidden
    >
      <div
        ref={trackRef}
        className={"ss-track " + (active ? "ss-active" : "")}
        onPointerDown={onDown}
        data-magnetic
      >
        <div ref={thumbRef} className="ss-thumb" />
      </div>
    </div>
  );
}
