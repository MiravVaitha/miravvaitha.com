"use client";

import { useEffect, useRef } from "react";

// Small dot + magnetic ring following the mouse via rAF. Ring grows over
// a/button/[data-magnetic]. Hidden on pointer: coarse via CSS.
export function CustomCursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function onMove(e: MouseEvent) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    }

    function onOver(e: MouseEvent) {
      const t = (e.target as Element | null)?.closest(
        "a, button, [data-magnetic]",
      );
      if (t && ring.current) {
        ring.current.classList.add("active");
      } else if (ring.current) {
        ring.current.classList.remove("active");
      }
    }

    let raf = 0;
    function loop() {
      cur.current.x += (target.current.x - cur.current.x) * 0.18;
      cur.current.y += (target.current.y - cur.current.y) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${cur.current.x}px, ${cur.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
