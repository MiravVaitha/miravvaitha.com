"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { experience, type Experience } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Discography() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  // Rail progress is rAF-throttled and written straight to the fill's
  // transform (compositor-only), so scrolling never triggers a React
  // re-render — the previous setState-per-scroll re-rendered this whole
  // section on every scroll event and was a measurable jank source.
  useEffect(() => {
    let raf = 0;

    function update() {
      raf = 0;
      const el = listRef.current;
      const fill = fillRef.current;
      if (!el || !fill) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.5;
      const seen = vh - rect.top;
      const p = Math.max(0, Math.min(1, seen / total));
      fill.style.transform = `scaleY(${p})`;
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

  return (
    <section className="section disco" data-screen-label="03 Discography">
      <SectionHeader
        number="03"
        title="Discography"
        sub="Roles & Experience to date"
      />
      <div className="disco-timeline" ref={listRef}>
        <div className="disco-rail" aria-hidden>
          <div className="disco-rail-fill" ref={fillRef} />
        </div>
        <ol className="disco-list">
          {experience.map((e, i) => (
            <DiscoEntry key={`${e.org}-${e.start}-${i}`} entry={e} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function DiscoEntry({ entry, index }: { entry: Experience; index: number }) {
  const isCurrent = entry.end === "present";
  return (
    <li className="disco-item">
      <div className="disco-marker" aria-hidden>
        <span className="disco-dot" />
        {isCurrent && <span className="disco-pulse" />}
      </div>
      <div className="disco-card">
        <div className="disco-card-body">
          <div className="disco-track-meta">
            <span className="disco-num mono">
              {String(index + 1).padStart(2, "0")}
            </span>
            {isCurrent && (
              <span className="disco-now-tag mono">
                <span className="disco-now-dot" /> Currently playing
              </span>
            )}
          </div>
          <h3 className="disco-role">
            {entry.role} <span className="disco-at">@</span>{" "}
            {entry.url ? (
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="disco-org-link"
              >
                {entry.org}
              </a>
            ) : (
              <span className="disco-org-link">{entry.org}</span>
            )}
          </h3>
          <div className="disco-meta-line">
            <span className="mono">
              {entry.start} → {entry.end ?? "—"}
            </span>
            {entry.note && <span className="disco-note">· {entry.note}</span>}
          </div>
          {entry.summary && <p className="disco-summary">{entry.summary}</p>}
        </div>
        {entry.logo && (
          <div className="disco-logo" aria-hidden>
            <Image
              src={entry.logo}
              alt=""
              width={48}
              height={48}
              className="disco-logo-img"
            />
          </div>
        )}
      </div>
    </li>
  );
}
