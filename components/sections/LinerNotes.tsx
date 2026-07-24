"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Per LINER_NOTES_DELTA.md — polaroid + vintage hi-fi tape deck. The LED
// dot-matrix screen types in the tracklist when the .liner section gains
// .in-view (added by the ScrollReveals observer in app/layout.tsx).
//
// Each "track" is selectable, like picking a track on the deck: the row jumps
// to the matching part of the site (an in-page anchor scroll, a project page,
// or an external link). The email row copies the address on desktop and opens
// a mail client on touch, mirroring the Follow section. Hover / keyboard focus
// highlights the row and swaps the track number for a ▶ (or a copy glyph on
// the email row) — see a.screen-line / .sl-glyph in globals.css.
//
// To edit the bio: change BIO_TRACKS below. Budget: ~34 chars fit at 390px
// viewports, ~30 at 360px. Longer lines fade out at the LED's right edge on
// phones (mask on .screen-line-text in globals.css), so overruns are graceful
// but still lost on small screens. ALL CAPS is intentional — it's a dot-matrix
// readout.

type TrackTarget =
  | { kind: "external"; href: string }
  | { kind: "anchor"; href: string }
  | { kind: "project"; slug: string }
  | { kind: "email"; address: string };

type DeckTrack = { text: string; target: TrackTarget };

const BIO_TRACKS: DeckTrack[] = [
  {
    text: "ENGINEERING @ TRINITY COLLEGE DUBLIN",
    target: { kind: "external", href: "https://www.tcd.ie/" },
  },
  {
    text: "SOFTWARE TEST ENGINEER @ CAPVENTIS",
    target: { kind: "anchor", href: "#now-playing" },
  },
  {
    text: "JUNIOR ANALYST @ TRINITY SMF",
    target: { kind: "anchor", href: "#trinity-smf" },
  },
  {
    text: "CO-FOUNDER · KROCCUSTOMS",
    target: { kind: "project", slug: "kroccustoms" },
  },
  {
    text: "BUILT CLARITYCAST, PHARMSTABLE & MORE",
    target: { kind: "anchor", href: "#tracks" },
  },
  {
    text: "CURRENTLY BUILDING ZENEMIC",
    target: { kind: "project", slug: "zenemic" },
  },
  {
    text: "MIRAVVAITHA@GMAIL.COM · SAY HI!",
    target: { kind: "email", address: "miravvaitha@gmail.com" },
  },
];

export function LinerNotes() {
  return (
    <section className="section liner" data-screen-label="02 Liner Notes">
      <SectionHeader
        number="02"
        title="Liner Notes"
        sub="A few words from the artist"
      />
      <div className="liner-stage">
        <div className="liner-photo">
          <div className="liner-photo-frame">
            <div className="liner-photo-tape" />
            <div className="liner-photo-window">
              <Image
                src="/mirav.jpg"
                alt="Mirav Vaitha"
                fill
                sizes="(min-width: 900px) 296px, 80vw"
                className="liner-photo-img"
              />
            </div>
            <div className="liner-photo-caption mono">
              Mirav Vaitha · 2026
            </div>
          </div>
        </div>
        <TapeDeck />
      </div>
    </section>
  );
}

function TapeDeck() {
  return (
    <div className="deck">
      <div className="deck-bezel">
        <div className="deck-header">
          <div className="deck-brand mono">MV — ABOUT ME</div>
          <div className="deck-lights">
            <span className="deck-light is-on" />
            <span className="deck-light" />
            <span className="deck-light" />
          </div>
        </div>

        <div className="deck-vu">
          <VUMeter channel="L" />
          <VUMeter channel="R" />
        </div>

        <div className="deck-screen">
          <div className="screen-scanlines" aria-hidden />
          <div className="screen-glow" aria-hidden />
          <div className="screen-content">
            <div className="screen-header mono">
              <span>
                <span className="screen-play">▶</span> NOW PLAYING
              </span>
              <span>SIDE A · TRK 02</span>
              <span className="screen-time">00:42</span>
            </div>
            <div className="screen-lines">
              {BIO_TRACKS.map((track, i) => (
                <TrackRow key={i} track={track} index={i} />
              ))}
            </div>
          </div>
        </div>

        <div className="deck-controls">
          <Knob label="BASS" rot={-40} />
          <Knob label="TREB" rot={20} />
          <Knob label="VOL" rot={60} />
          <div className="deck-buttons">
            <button className="deck-btn" aria-label="Previous">
              ◁◁
            </button>
            <button className="deck-btn deck-btn-play" aria-label="Play">
              ▶
            </button>
            <button className="deck-btn" aria-label="Next">
              ▷▷
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Two-digit track number, always visible. Clickability is signalled by the
// dotted underline on the row text plus the ↗ arrow at the right (both mirror
// the Follow section) — see a.screen-line / .screen-line-arrow in globals.css.
function TrackNum({ index }: { index: number }) {
  return (
    <span className="screen-line-num mono">
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

// The ↗ link arrow pinned to the right of every row — same glyph and nudge as
// the Follow section, restyled for the LED. Dim but always visible (so it
// reads as a link on touch too), brightening + nudging on hover / focus.
const LINK_ARROW = (
  <span className="screen-line-arrow" aria-hidden>
    ↗
  </span>
);

function TrackRow({ track, index }: { track: DeckTrack; index: number }) {
  const lineStyle = { "--i": index } as CSSProperties;
  const { target } = track;

  if (target.kind === "email") {
    return (
      <EmailTrackRow
        index={index}
        text={track.text}
        address={target.address}
        style={lineStyle}
      />
    );
  }

  const inner = (
    <>
      <TrackNum index={index} />
      <span className="screen-line-text mono">{track.text}</span>
      {LINK_ARROW}
    </>
  );

  if (target.kind === "project") {
    return (
      <Link
        className="screen-line"
        style={lineStyle}
        href={`/projects/${target.slug}`}
      >
        {inner}
      </Link>
    );
  }

  // "external" opens in a new tab; "anchor" is an in-page smooth scroll
  // (scroll-behavior: smooth is set on <html>).
  const external = target.kind === "external";
  return (
    <a
      className="screen-line"
      style={lineStyle}
      href={target.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {inner}
    </a>
  );
}

// Email row: on a fine pointer the click copies the address (with a brief LED
// "COPIED" readout); on touch it falls through to the mailto: so the mail app
// opens. Same dual behaviour as the Follow section's email item.
function EmailTrackRow({
  index,
  text,
  address,
  style,
}: {
  index: number;
  text: string;
  address: string;
  style: CSSProperties;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      /* no-op */
    }
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return; // let the mailto: open a mail client on touch devices
    }
    e.preventDefault();
    copy();
  }

  return (
    <a
      className="screen-line screen-line-mail"
      style={style}
      href={`mailto:${address}`}
      onClick={handleClick}
      aria-label={
        copied
          ? "Email address copied to clipboard"
          : `Copy email address ${address}`
      }
    >
      <TrackNum index={index} />
      <span className="screen-line-text mono">
        {copied ? "COPIED TO CLIPBOARD!" : text}
      </span>
      {LINK_ARROW}
    </a>
  );
}

function VUMeter({ channel }: { channel: "L" | "R" }) {
  return (
    <div className="vu-row">
      <span className="vu-label mono">{channel}</span>
      <div className="vu-bar">
        {Array.from({ length: 22 }).map((_, i) => {
          const segStyle = { "--i": i } as CSSProperties;
          const cls =
            "vu-seg " +
            (i >= 17 ? "vu-seg-red" : i >= 13 ? "vu-seg-amber" : "");
          return <span key={i} className={cls.trim()} style={segStyle} />;
        })}
      </div>
    </div>
  );
}

function Knob({ label, rot }: { label: string; rot: number }) {
  return (
    <div className="knob">
      <div className="knob-dial" style={{ transform: `rotate(${rot}deg)` }}>
        <span className="knob-indicator" />
      </div>
      <span className="knob-label mono">{label}</span>
    </div>
  );
}
