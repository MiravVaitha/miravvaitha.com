"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function TopTracks() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cards = containerRef.current?.querySelectorAll<HTMLElement>(
      "[data-slug]",
    );
    if (!cards || cards.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const slug = entry.target.getAttribute("data-slug");
          if (!slug) continue;
          visibility.set(
            slug,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }
        let best: string | null = null;
        let bestRatio = 0;
        visibility.forEach((ratio, slug) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = slug;
          }
        });
        setActiveSlug(bestRatio > 0.55 ? best : null);
      },
      { threshold: [0, 0.25, 0.55, 0.75, 1] },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tracks" className="section tracks" data-screen-label="04 Top Tracks">
      <SectionHeader
        number="04"
        title="Top Tracks"
        sub="All my projects :)"
      />
      <div className="tracks-grid" ref={containerRef}>
        {projects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            index={i}
            active={activeSlug === p.slug}
          />
        ))}
      </div>
    </section>
  );
}
