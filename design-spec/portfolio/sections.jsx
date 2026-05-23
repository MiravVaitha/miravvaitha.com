// Page sections: Hero, NowPlaying, LinerNotes, Discography, TopTracks, Bsides, Follow, Footer.

const { useEffect, useRef, useState, useMemo } = React;

// ── NowPlaying ──────────────────────────────────────────────────────────────
// Faux live player. Rotates through NOW_PLAYING_QUEUE every 18s and ticks a
// progress bar each second so it feels alive in the prototype.
function NowPlaying({ compact = false }) {
  const [idx, setIdx] = useState(0);
  const [t, setT] = useState(12);
  const track = NOW_PLAYING_QUEUE[idx % NOW_PLAYING_QUEUE.length];

  useEffect(() => {
    const tick = setInterval(() => {
      setT((prev) => {
        if (prev + 1 >= track.duration) {
          setIdx((i) => i + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [track.duration]);

  const pct = (t / track.duration) * 100;
  const fmt = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className={"np " + (compact ? "np-compact" : "")} aria-live="polite">
      <div className="np-art" data-magnetic>
        <div className="np-art-inner">
          <div className="np-art-ring r1" />
          <div className="np-art-ring r2" />
          <div className="np-art-ring r3" />
          <div className="np-art-center" />
        </div>
        <div className="np-eq">
          <span /><span /><span /><span />
        </div>
      </div>
      <div className="np-meta">
        <div className="np-label">
          <span className="np-pulse" />
          <span>NOW PLAYING</span>
        </div>
        <div className="np-track">{track.track}</div>
        <div className="np-artist">{track.artist}</div>
        <div className="np-bar">
          <div className="np-bar-fill" style={{ width: pct + "%" }} />
        </div>
        <div className="np-times">
          <span>{fmt(t)}</span>
          <span>−{fmt(track.duration - t)}</span>
        </div>
      </div>
    </div>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero({ variant }) {
  if (variant === "centered") return <HeroCentered />;
  if (variant === "stack") return <HeroStack />;
  return <HeroSplit />;
}

function HeroSplit() {
  return (
    <section className="hero hero-split" data-screen-label="01 Hero">
      <div className="hero-text">
        <div className="hero-eyebrow">
          <span className="dot" /> <span>SIDE A · TRACK 01</span>
        </div>
        <h1 className="hero-name">
          Mirav<br />Vaitha
        </h1>
        <p className="hero-tag">
          <em>Engineer, builder, occasional shipper of small things.</em>
        </p>
        <p className="hero-credits">
          Engineering @ Trinity College Dublin &nbsp;·&nbsp; SWE Intern @ Capventis &nbsp;·&nbsp; Based in Dublin
        </p>
      </div>
      <div className="hero-aside">
        <NowPlaying />
      </div>
    </section>
  );
}

function HeroCentered() {
  return (
    <section className="hero hero-centered" data-screen-label="01 Hero">
      <div className="hero-eyebrow">
        <span className="dot" /> <span>SIDE A · TRACK 01</span>
      </div>
      <h1 className="hero-name hero-name-center">Mirav Vaitha</h1>
      <p className="hero-tag">
        <em>Engineer, builder, occasional shipper of small things.</em>
      </p>
      <p className="hero-credits">
        Engineering @ Trinity College Dublin &nbsp;·&nbsp; SWE Intern @ Capventis &nbsp;·&nbsp; Based in Dublin
      </p>
      <div className="hero-np-center">
        <NowPlaying compact />
      </div>
    </section>
  );
}

function HeroStack() {
  return (
    <section className="hero hero-stack" data-screen-label="01 Hero">
      <div className="hero-stack-np">
        <NowPlaying compact />
      </div>
      <div className="hero-eyebrow">
        <span className="dot" /> <span>SIDE A · TRACK 01</span>
      </div>
      <h1 className="hero-name">Mirav<br />Vaitha.</h1>
      <p className="hero-tag">
        <em>Engineer, builder, occasional shipper of small things.</em>
      </p>
      <p className="hero-credits">
        Trinity College Dublin · Capventis · Dublin
      </p>
    </section>
  );
}

// ── Liner Notes ─────────────────────────────────────────────────────────────
function LinerNotes() {
  return (
    <section className="section liner" data-screen-label="02 Liner Notes">
      <SectionHeader number="02" title="Liner Notes" sub="A few words from the artist" />
      <div className="liner-grid">
        <div className="liner-photo">
          <div className="liner-photo-frame">
            <img src="mirav.jpg" alt="Mirav Vaitha" className="liner-photo-img" />
          </div>
          <div className="liner-photo-caption">
            <span className="mono">Side A · Photo · 2025</span>
          </div>
        </div>
        <div className="liner-copy">
          <p>
            I'm an engineering student at <a href="#">Trinity College Dublin</a>, and a
            software-engineering intern at <a href="#">Capventis</a> — returning this
            summer for round two. Grew up in Dublin. Build things in Dublin. Plan to
            keep building things in Dublin.
          </p>
          <p>
            Lately that's meant <strong>ClarityCast</strong> — an AI tool that turns
            scrambled thoughts into something coherent enough to send — alongside a
            string of freelance websites for small businesses around the city. Before
            that: a remote-controlled vehicle, a line-following autonomous one, a
            Shopify-based clothing brand (<strong>Kroccustoms</strong>) I co-founded.
            The connecting thread is that I like starting from a blank file (or a bare
            circuit board), getting something working, and shipping it.
          </p>
          <p>
            Off the keyboard: three languages on rotation (English, Irish, Gujarati),
            a music habit visible at the top of this page, and a working theory that
            <em> shipped</em> beats <em>perfect</em> almost every time.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Discography ─────────────────────────────────────────────────────────────
// Timeline-style experience list. Vertical rail on the left, accent dots
// for each entry, role + org + dates + a short writeup. The rail progress
// fills based on scroll position, like a track progress bar.
function Discography() {
  const listRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = listRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top of the list is at the bottom of the viewport,
      // 1 when the bottom of the list crosses the middle.
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

  return (
    <section className="section disco" data-screen-label="03 Discography">
      <SectionHeader
        number="03"
        title="Discography"
        sub="Roles & places, in chronological reverse"
      />
      <div
        className="disco-timeline"
        ref={listRef}
        style={{ "--rail-progress": progress }}
      >
        <div className="disco-rail" aria-hidden>
          <div className="disco-rail-fill" />
        </div>
        <ol className="disco-list">
          {EXPERIENCE.map((e, i) => (
            <DiscoEntry key={`${e.org}-${e.start}-${i}`} entry={e} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function DiscoEntry({ entry, index }) {
  const isCurrent = entry.end === "present";
  return (
    <li className="disco-item">
      <div className="disco-marker" aria-hidden>
        <span className="disco-dot" />
        {isCurrent && <span className="disco-pulse" />}
      </div>
      <div className="disco-card">
        <div className="disco-track-meta">
          <span className="disco-num mono">{String(index + 1).padStart(2, "0")}</span>
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
            {entry.start} → {entry.end}
          </span>
          {entry.note && <span className="disco-note">· {entry.note}</span>}
        </div>
        {entry.summary && (
          <p className="disco-summary">{entry.summary}</p>
        )}
      </div>
    </li>
  );
}

// ── Top Tracks (Projects) ───────────────────────────────────────────────────
function TopTracks({ variant }) {
  return (
    <section className="section tracks" data-screen-label="04 Top Tracks">
      <SectionHeader
        number="04"
        title="Top Tracks"
        sub="Selected projects · click for the long version"
      />
      {variant === "list" ? <TracksList /> : variant === "mosaic" ? <TracksMosaic /> : <TracksGrid />}
    </section>
  );
}

function TracksGrid() {
  return (
    <div className="tracks-grid">
      {PROJECTS.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [hov, setHov] = useState(false);
  const isPlaceholder = project.status === "placeholder";
  return (
    <a
      className={"track-card " + (isPlaceholder ? "is-placeholder " : "") + (hov ? "is-hov" : "")}
      href={`project.html?slug=${project.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-magnetic
    >
      <div className="track-cover" style={{ "--h": project.hue }}>
        <div className="cover-grain" />
        <div className="cover-glyph mono">{String(index + 1).padStart(2, "0")}</div>
        <div className="cover-title">{project.title}</div>
        <div className="cover-hover">
          <div className="cover-eq" aria-hidden>
            <span /><span /><span /><span /><span />
          </div>
          <div className="cover-play">▷ Preview</div>
        </div>
        {project.status === "in-progress" && <span className="cover-badge">IN PROGRESS</span>}
        {project.status === "placeholder" && <span className="cover-badge">TBD</span>}
      </div>
      <div className="track-meta">
        <div className="track-row">
          <span className="track-name">{project.title}</span>
          <span className="track-dur mono">{project.duration}</span>
        </div>
        <p className="track-blurb">{project.blurb}</p>
        <div className="track-tech">
          {project.tech.length ? project.tech.join(" · ") : "—"}
        </div>
      </div>
    </a>
  );
}

function TracksList() {
  return (
    <ol className="tracks-listing">
      {PROJECTS.map((p, i) => (
        <li key={p.slug} className="tl-row" data-magnetic>
          <a href={`project.html?slug=${p.slug}`} className="tl-link">
            <span className="tl-num mono">{String(i + 1).padStart(2, "0")}</span>
            <div className="tl-thumb" style={{ "--h": p.hue }}>
              <span className="mono">{p.title.charAt(0)}</span>
            </div>
            <div className="tl-meta">
              <div className="tl-title">{p.title}</div>
              <div className="tl-blurb">{p.blurb}</div>
            </div>
            <div className="tl-tech mono">{p.tech.length ? p.tech.join(" · ") : "—"}</div>
            <span className="tl-dur mono">{p.duration}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

function TracksMosaic() {
  return (
    <div className="tracks-mosaic">
      {PROJECTS.map((p, i) => (
        <a
          key={p.slug}
          className={"tm-tile tm-" + i}
          href={`project.html?slug=${p.slug}`}
          style={{ "--h": p.hue }}
          data-magnetic
        >
          <div className="tm-cover">
            <div className="cover-grain" />
            <span className="mono tm-num">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <div className="tm-info">
            <div className="tm-title">{p.title}</div>
            <div className="tm-blurb">{p.blurb}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

// ── B-sides (gallery) ───────────────────────────────────────────────────────
function Bsides() {
  return (
    <section className="section bsides" data-screen-label="05 B-sides">
      <SectionHeader number="05" title="B-sides" sub="Photos & ephemera · drop your own here" />
      <div className="bsides-grid">
        {GALLERY.map((g) => (
          <figure key={g.id} className="bs-tile" style={{ aspectRatio: g.ratio, "--h": g.hue }}>
            <div className="bs-tile-inner">
              <div className="photo-placeholder" data-label={g.caption.toUpperCase()} />
            </div>
            <figcaption className="mono">{g.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

// ── Follow ──────────────────────────────────────────────────────────────────
function Follow() {
  return (
    <section className="section follow" data-screen-label="06 Follow">
      <SectionHeader number="06" title="Follow" sub="Stay in touch · reach out" />
      <ul className="follow-list">
        {LINKS.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              data-magnetic
            >
              <span className="follow-label">{l.label}</span>
              <span className="follow-handle mono">{l.handle}</span>
              <span className="follow-arrow" aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="mono">© 2026 Mirav Vaitha</span>
        <span className="mono">All rights reserved</span>
      </div>
    </footer>
  );
}

// ── Shared section header ───────────────────────────────────────────────────
function SectionHeader({ number, title, sub }) {
  return (
    <div className="section-header">
      <div className="sh-left">
        <span className="sh-num mono">{number}</span>
        <h2 className="sh-title">{title}</h2>
      </div>
      <span className="sh-sub mono">{sub}</span>
    </div>
  );
}

Object.assign(window, {
  NowPlaying, Hero, LinerNotes, Discography, TopTracks,
  Bsides, Follow, Footer, SectionHeader,
});
