"use client";

import { useEffect, useRef, useState } from "react";

export function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      className={`copy-btn mono${copied ? " is-copied" : ""}`}
      onClick={handleCopy}
      aria-label={copied ? "Copied to clipboard" : `Copy ${label ?? value}`}
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
  );
}
