"use client";

import { useEffect, useRef, useState } from "react";
import { links } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";

function EmailItem({ label, email }: { label: string; email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function flashCopied() {
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      flashCopied();
    } catch {
      /* no-op */
    }
  }

  function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }
    e.preventDefault();
    copy();
  }

  return (
    <li className="follow-li-mail">
      <a
        href={`mailto:${email}`}
        onClick={handleLinkClick}
        data-magnetic
      >
        <span className="follow-label">{label}</span>
        <span className="follow-handle mono">{email}</span>
        <span className="follow-arrow" aria-hidden>
          ↗
        </span>
      </a>
      <button
        type="button"
        className={`copy-btn mono${copied ? " is-copied" : ""}`}
        onClick={copy}
        aria-label={copied ? "Copied to clipboard" : "Copy email address"}
      >
        <span className="copy-btn-icon" aria-hidden>
          {copied ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 6.2L4.8 8.5L9.5 3.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect
                x="3.25"
                y="3.25"
                width="6"
                height="6"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M2 7.5V2.75A0.75 0.75 0 0 1 2.75 2H7.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
        <span className="copy-btn-text">{copied ? "Copied" : "Copy"}</span>
      </button>
    </li>
  );
}

export function Follow() {
  return (
    <section className="section follow" data-screen-label="06 I love to chat, say hi!">
      <SectionHeader
        number="06"
        title="I love to chat, say hi!"
        sub="TRACK 06 · OUTRO"
      />
      <ul className="follow-list">
        {links.map((l) => {
          if (l.href.startsWith("mailto:")) {
            return <EmailItem key={l.label} label={l.label} email={l.handle} />;
          }
          return (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
              >
                <span className="follow-label">{l.label}</span>
                <span aria-hidden />
                <span className="follow-arrow" aria-hidden>
                  ↗
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
