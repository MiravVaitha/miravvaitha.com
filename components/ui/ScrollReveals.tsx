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
        ".section-header, .liner-stage > *, " +
          ".tracks-grid > *, .tracks-listing > *, .tracks-mosaic > *, " +
          ".disco-list > *, .follow-list > *, " +
          ".proj-h2, .proj-prose > p, .proj-credits > *, .proj-shots > *",
      );
      kids.forEach((k, i) => {
        k.classList.add("reveal-child");
        (k as HTMLElement).style.setProperty(
          "--reveal-delay",
          i * 50 + "ms",
        );
      });
    });

    // Positive bottom rootMargin + threshold 0: reveals start just BEFORE an
    // element scrolls into view, so (a) sections are never sitting invisible
    // when the user reaches them and (b) the style/raster burst of starting
    // the transition happens ahead of visibility instead of mid-viewport,
    // which read as a scroll hitch (worst on project pages, where users
    // could stop scrolling thinking there was nothing below).
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 12% 0px" },
    );

    targets.forEach((t) => {
      // Sections and heroes are "stages": they never animate themselves —
      // transitioning a viewport-sized wrapper rasterizes it as one huge
      // compositor layer mid-scroll (a visible hitch) and its movement feeds
      // scroll anchoring. Stages only trigger .in-view for their small,
      // individually-staggered children. Thin bands still animate whole.
      const heavy = t.matches(".section, .proj-section, .hero, .proj-hero");
      t.classList.add(heavy ? "reveal-stage" : "reveal");
      io.observe(t);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
