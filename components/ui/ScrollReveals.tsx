"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// IntersectionObserver-driven reveals. Adds .in-view to top-level sections
// and to their list/grid children with a small stagger delay. Respects
// prefers-reduced-motion via CSS rules in globals.css.
//
// Re-runs on every pathname change because this component lives in the root
// layout — when Next.js unmounts a route's subtree and mounts a new one, the
// previous observer's element refs are stale. Without re-binding, the LED
// dot-matrix animation in Liner Notes (which depends on .liner.in-view) never
// fires on the second visit to /.
export function ScrollReveals() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll(
      "[data-reveal], .section, .hero, .marquee, .footer, .proj-section, .proj-hero, .proj-pager",
    );

    targets.forEach((el) => {
      const kids = el.querySelectorAll(
        ".tracks-grid > *, .tracks-listing > *, .tracks-mosaic > *, " +
          ".disco-list > *, .follow-list > *, .proj-credits > *, .proj-shots > *",
      );
      kids.forEach((k, i) => {
        k.classList.add("reveal-child");
        (k as HTMLElement).style.setProperty(
          "--reveal-delay",
          i * 50 + "ms",
        );
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((t) => {
      t.classList.add("reveal");
      io.observe(t);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
