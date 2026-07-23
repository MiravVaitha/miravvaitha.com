"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import type { ProjectScreenshot } from "@/content/projects";

type Props = {
  shots: ProjectScreenshot[];
  coverStyle: CSSProperties;
  coverAltStyle: CSSProperties;
};

// Grid of project images that opens a fullscreen lightbox on click.
// Lives in /components/ui so any project page that has project.screenshots
// populated gets the same behaviour automatically.
export function ProjectImages({ shots, coverStyle, coverAltStyle }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const close = useCallback(() => setActiveIdx(null), []);
  const goTo = useCallback(
    (idx: number) => setActiveIdx(((idx % shots.length) + shots.length) % shots.length),
    [shots.length],
  );

  return (
    <>
      {shots.map((shot, i) => {
        const wide = shot.wide || i === 0;
        const tileStyle = i % 2 === 0 ? coverStyle : coverAltStyle;
        const className =
          "proj-shot-button" + (wide ? " proj-shot-wide" : "");
        return (
          <button
            key={shot.src + i}
            type="button"
            className={className}
            onClick={() => setActiveIdx(i)}
            aria-label={`View image: ${shot.caption}`}
          >
            <figure className="proj-shot" style={tileStyle}>
              <Image
                src={shot.src}
                alt={shot.caption}
                fill
                sizes={
                  wide
                    ? "(min-width: 720px) 66vw, 100vw"
                    : "(min-width: 720px) 33vw, 100vw"
                }
                unoptimized={shot.src.endsWith(".svg")}
                className="proj-shot-img"
              />
              <figcaption className="mono">{shot.caption}</figcaption>
            </figure>
          </button>
        );
      })}
      {activeIdx !== null && (
        <Lightbox
          shots={shots}
          index={activeIdx}
          onClose={close}
          onChange={goTo}
        />
      )}
    </>
  );
}

function Lightbox({
  shots,
  index,
  onClose,
  onChange,
}: {
  shots: ProjectScreenshot[];
  index: number;
  onClose: () => void;
  onChange: (idx: number) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // Lock the ROOT scroller. body's overflow never reaches the viewport
    // (html has overflow-x: clip, which blocks body→viewport propagation),
    // so setting it on body wouldn't lock anything — and must not be set
    // anyway: an overflow on body turns it into a nested scroll container
    // (see the body comment in globals.css).
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onChange(index - 1);
      else if (e.key === "ArrowRight") onChange(index + 1);
    }
    window.addEventListener("keydown", onKey);

    return () => {
      root.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onClose, onChange]);

  if (!mounted) return null;

  const shot = shots[index];
  const hasMany = shots.length > 1;

  return createPortal(
    <div
      className="lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close image viewer"
      >
        ×
      </button>

      {hasMany && (
        <>
          <button
            type="button"
            className="lightbox-nav lightbox-nav-prev"
            onClick={() => onChange(index - 1)}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-nav-next"
            onClick={() => onChange(index + 1)}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      <figure className="lightbox-fig" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shot.src}
          alt={shot.caption}
          className="lightbox-img"
        />
        <figcaption className="lightbox-caption mono">
          {shot.caption}
        </figcaption>
      </figure>

      {hasMany && (
        <div className="lightbox-counter mono">
          {index + 1} / {shots.length}
        </div>
      )}
    </div>,
    document.body,
  );
}
