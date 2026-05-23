"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Per LINER_NOTES_DELTA.md — polaroid + vintage hi-fi tape deck. The LED
// dot-matrix screen types in BIO_LINES when the .liner section gains
// .in-view (added by the ScrollReveals observer in app/layout.tsx).
//
// To edit the bio: change BIO_LINES below. Keep each line ≤ 36 chars so
// they don't wrap on the LED at desktop width. ALL CAPS is intentional —
// it's a dot-matrix readout.

const BIO_LINES = [
  "ENGINEERING @ TRINITY COLLEGE DUBLIN",
  "SWE INTERN @ CAPVENTIS · '25/'26",
  "STARTUPS · SOFTWARE · HARDWARE",
  "CO-FOUNDER · KROCCUSTOMS",
  "BUILT CLARITYCAST, PHARMSTABLE & MORE",
  "INTERESTED IN AI & AI ENGINEERING",
  "MIRAVVAITHA@GMAIL.COM · SAY HI!",
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
              {BIO_LINES.map((line, i) => {
                const lineStyle = { "--i": i } as CSSProperties;
                return (
                  <div key={i} className="screen-line" style={lineStyle}>
                    <span className="screen-line-num mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="screen-line-text mono">{line}</span>
                  </div>
                );
              })}
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
