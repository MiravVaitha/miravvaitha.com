"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { experience, type Experience } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Discography() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = listRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.5;
      const seen = vh - rect.top;
      const p = Math.max(0, Math.min(1, seen / total));
      setProgress(p);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const railStyle = {
    "--rail-progress": progress,
  } as CSSProperties;

  return (
    <section className="section disco" data-screen-label="03 Discography">
      <SectionHeader
        number="03"
        title="Discography"
        sub="Roles & Experience to date"
      />
      <div className="disco-timeline" ref={listRef} style={railStyle}>
        <div className="disco-rail" aria-hidden>
          <div className="disco-rail-fill" />
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
    </li>
  );
}
