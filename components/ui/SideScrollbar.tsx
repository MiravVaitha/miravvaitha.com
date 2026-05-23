"use client";

import { useEffect, useRef, useState } from "react";

type Metrics = {
  thumb: number;
  pos: number;
  hidden: boolean;
};

// Replaces the native browser scrollbar with a thin track on the right edge.
// Thumb is sized proportionally to viewport/document and draggable.
export function SideScrollbar() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [metrics, setMetrics] = useState<Metrics>({
    thumb: 0,
    pos: 0,
    hidden: true,
  });
  const [active, setActive] = useState(false);

  useEffect(() => {
    function measure() {
      const vh = window.innerHeight;
      const dh = document.documentElement.scrollHeight;
      if (dh <= vh + 4) {
        setMetrics({ thumb: 0, pos: 0, hidden: true });
        return;
      }
      const trackH = vh - 32;
      const thumbH = Math.max(32, (vh / dh) * trackH);
      const max = dh - vh;
      const pos = (window.scrollY / max) * (trackH - thumbH);
      setMetrics({ thumb: thumbH, pos, hidden: false });
    }
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
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
    const thumbH = metrics.thumb;

    function moveTo(clientY: number) {
      const offsetY = clientY - rect.top - thumbH / 2;
      const clamped = Math.max(0, Math.min(trackH - thumbH, offsetY));
      const pct = clamped / (trackH - thumbH);
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

  if (metrics.hidden) return null;

  return (
    <div className="side-scroll" aria-hidden>
      <div
        ref={trackRef}
        className={"ss-track " + (active ? "ss-active" : "")}
        onPointerDown={onDown}
        data-magnetic
      >
        <div
          className="ss-thumb"
          style={{
            height: metrics.thumb,
            transform: `translateY(${metrics.pos}px)`,
          }}
        />
      </div>
    </div>
  );
}
