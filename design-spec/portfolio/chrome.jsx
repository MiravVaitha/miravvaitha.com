// Chrome — pieces that frame the page: top scrubber, custom cursor,
// floating mini-player, marquee.

const { useEffect, useRef, useState } = React;

// Top-of-page progress bar. Shows scroll position as a music-app track
// progress, with a draggable scrubber thumb. Dragging jumps the scroll.
function TopScrubber() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max <= 0 ? 0 : (window.scrollY / max) * 100);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const trackRef = useRef(null);
  function seekTo(clientX) {
    const rect = trackRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * p, behavior: "smooth" });
  }

  return (
    <div className="top-scrubber" role="progressbar" aria-valuenow={Math.round(pct)}>
      <div
        ref={trackRef}
        className="ts-track"
        onClick={(e) => seekTo(e.clientX)}
      >
        <div className="ts-fill" style={{ width: pct + "%" }} />
        <div className="ts-thumb" style={{ left: pct + "%" }} />
      </div>
    </div>
  );
}

// Custom cursor: small dot + magnetic ring that grows over interactive elements.
// Disabled on touch devices.
function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;

    function onMove(e) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    }

    function onOver(e) {
      const t = e.target.closest("a, button, [data-magnetic]");
      if (t && ring.current) {
        ring.current.classList.add("active");
      } else if (ring.current) {
        ring.current.classList.remove("active");
      }
    }

    let raf;
    function loop() {
      cur.current.x += (target.current.x - cur.current.x) * 0.18;
      cur.current.y += (target.current.y - cur.current.y) * 0.18;
      if (dot.current) {
        dot.current.style.transform =
          `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      }
      if (ring.current) {
        ring.current.style.transform =
          `translate3d(${cur.current.x}px, ${cur.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <React.Fragment>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </React.Fragment>
  );
}

// Marquee strip — horizontally scrolling text band. Reused between sections.
function Marquee({ items, sep = "✦" }) {
  // duplicate items so the loop is seamless
  const stream = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {stream.map((s, i) => (
          <span key={i} className="marquee-item">
            <span>{s}</span>
            <span className="marquee-sep">{sep}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Floating mini-player at the bottom. Only shows when metaphor === "full".
function MiniPlayer({ track }) {
  const [progress, setProgress] = useState(42);
  useEffect(() => {
    const i = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.4));
    }, 1000);
    return () => clearInterval(i);
  }, []);

  const fmt = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="mini-player">
      <div className="mp-art" style={{ "--h": track.hue || 30 }} />
      <div className="mp-meta">
        <div className="mp-track">{track.track}</div>
        <div className="mp-artist">{track.artist}</div>
      </div>
      <div className="mp-controls">
        <button aria-label="Previous">◁◁</button>
        <button aria-label="Play/pause" className="mp-play">▷</button>
        <button aria-label="Next">▷▷</button>
      </div>
      <div className="mp-progress">
        <span className="mp-time">{fmt((progress / 100) * track.duration)}</span>
        <div className="mp-bar">
          <div className="mp-fill" style={{ width: progress + "%" }} />
        </div>
        <span className="mp-time">{fmt(track.duration)}</span>
      </div>
    </div>
  );
}

// Side scrollbar — replaces the native browser scrollbar with a thin
// custom track on the right edge. Thumb is sized proportionally to
// viewport/document and is draggable. Pairs well with the custom cursor.
function SideScrollbar() {
  const trackRef = useRef(null);
  const [metrics, setMetrics] = useState({ thumb: 0, pos: 0, hidden: true });
  const [active, setActive] = useState(false);

  useEffect(() => {
    function measure() {
      const vh = window.innerHeight;
      const dh = document.documentElement.scrollHeight;
      if (dh <= vh + 4) {
        setMetrics({ thumb: 0, pos: 0, hidden: true });
        return;
      }
      const trackH = vh - 32; // 16px margin top + bottom
      const thumbH = Math.max(32, (vh / dh) * trackH);
      const max = dh - vh;
      const pos = (window.scrollY / max) * (trackH - thumbH);
      setMetrics({ thumb: thumbH, pos, hidden: false, trackH });
    }
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    // also remeasure on content size changes
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  function onDown(e) {
    if (!trackRef.current) return;
    e.preventDefault();
    setActive(true);
    document.documentElement.classList.add("ss-dragging");
    const rect = trackRef.current.getBoundingClientRect();
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const trackH = rect.height;
    const thumbH = metrics.thumb;

    function moveTo(clientY) {
      const offsetY = clientY - rect.top - thumbH / 2;
      const clamped = Math.max(0, Math.min(trackH - thumbH, offsetY));
      const pct = clamped / (trackH - thumbH);
      window.scrollTo({ top: max * pct, behavior: "auto" });
    }

    moveTo(e.clientY);
    const move = (ev) => { ev.preventDefault(); moveTo(ev.clientY); };
    const up = () => {
      setActive(false);
      document.documentElement.classList.remove("ss-dragging");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }

  if (metrics.hidden) return null;

  return (
    <div className="side-scroll" aria-hidden>
      <div
        ref={trackRef}
        className={"ss-track " + (active ? "ss-active" : "")}
        onPointerDown={onDown}
        data-magnetic
      >
        <div
          className="ss-thumb"
          style={{ height: metrics.thumb, transform: `translateY(${metrics.pos}px)` }}
        />
      </div>
    </div>
  );
}

// Reveal-on-scroll — adds .in-view to elements with [data-reveal] (or the
// default targets) as they enter the viewport. Sections fade + translate
// up; lists/grids stagger their children for a sequenced reveal.
function ScrollReveals() {
  useEffect(() => {
    // Find targets. Manual data-reveal wins; otherwise default to top-level
    // section-like blocks.
    const targets = document.querySelectorAll(
      "[data-reveal], .section, .hero, .marquee, .footer, .proj-section, .proj-hero, .proj-pager"
    );

    // Stagger children inside any grids / lists so items cascade in.
    targets.forEach((el) => {
      const kids = el.querySelectorAll(
        ".tracks-grid > *, .tracks-listing > *, .tracks-mosaic > *, " +
        ".disco-list > *, .follow-list > *, .proj-credits > *, .proj-shots > *"
      );
      kids.forEach((k, i) => {
        k.classList.add("reveal-child");
        k.style.setProperty("--reveal-delay", (i * 50) + "ms");
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((t) => {
      t.classList.add("reveal");
      io.observe(t);
    });

    return () => io.disconnect();
  }, []);

  return null;
}

Object.assign(window, { TopScrubber, SideScrollbar, CustomCursor, Marquee, MiniPlayer, ScrollReveals });
