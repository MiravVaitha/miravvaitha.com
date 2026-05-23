// Project detail page — single template that reads ?slug=… from the
// URL and renders the matching project from data.jsx.

const { useEffect, useState } = React;

function ProjectPage() {
  // Pull slug from URL (?slug=claritycast) or fall back to the first one.
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || PROJECTS[0].slug;

  const idx = Math.max(0, PROJECTS.findIndex((p) => p.slug === slug));
  const project = PROJECTS[idx];
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <React.Fragment>
      <BackgroundShader />
      <CustomCursor />
      <TopScrubber />
      <SideScrollbar />
      <ScrollReveals />

      <div className="shell">
        <nav className="proj-nav">
          <a href="desktop.html#tracks" className="proj-back" data-magnetic>
            <span className="proj-back-arrow">◁</span>
            <span>Back to Top Tracks</span>
          </a>
          <a href="desktop.html" className="proj-home mono" data-magnetic>
            Mirav Vaitha
          </a>
        </nav>

        <article className="proj">
          <ProjectHero project={project} index={idx} />
          <ProjectBody project={project} />
          <ProjectFooter prev={prev} next={next} />
        </article>

        <Footer />
      </div>
    </React.Fragment>
  );
}

function ProjectHero({ project, index }) {
  return (
    <header className="proj-hero" data-screen-label="Project hero">
      <div className="proj-hero-cover" style={{ "--h": project.hue }}>
        <div className="cover-grain" />
        <span className="proj-hero-num mono">
          TRACK {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="proj-hero-meta">
        <div className="proj-eyebrow">
          <span className="dot" /> <span>{project.year} · {project.status.replace("-", " ").toUpperCase()}</span>
        </div>
        <h1 className="proj-title">{project.title}</h1>
        <p className="proj-blurb">{project.blurb}</p>
        <dl className="proj-meta-grid">
          <div>
            <dt>Length</dt>
            <dd className="mono">{project.duration}</dd>
          </div>
          <div>
            <dt>Plays</dt>
            <dd className="mono">{project.plays}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
        </dl>
        {(project.links.live || project.links.github) && (
          <div className="proj-actions">
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="proj-cta" data-magnetic>
                <span>▷ Visit live</span>
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="proj-cta proj-cta-secondary" data-magnetic>
                <span>↗ Source</span>
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function ProjectBody({ project }) {
  return (
    <div className="proj-body">
      <section className="proj-section">
        <h2 className="proj-h2">
          <span className="mono proj-h2-num">A1</span>
          <span>Liner notes</span>
        </h2>
        <div className="proj-prose">
          {project.longform.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <section className="proj-section">
        <h2 className="proj-h2">
          <span className="mono proj-h2-num">A2</span>
          <span>Credits</span>
        </h2>
        <ul className="proj-credits">
          {project.tech.length === 0 ? (
            <li className="proj-credit"><em>TBD</em></li>
          ) : (
            project.tech.map((t) => (
              <li key={t} className="proj-credit">{t}</li>
            ))
          )}
        </ul>
      </section>

      <section className="proj-section">
        <h2 className="proj-h2">
          <span className="mono proj-h2-num">A3</span>
          <span>Screenshots</span>
        </h2>
        <div className="proj-shots">
          <figure className="proj-shot proj-shot-wide" style={{ "--h": project.hue }}>
            <div className="cover-grain" />
            <figcaption className="mono">Screenshot 1 · placeholder</figcaption>
          </figure>
          <figure className="proj-shot" style={{ "--h": (project.hue + 40) % 360 }}>
            <div className="cover-grain" />
            <figcaption className="mono">Screenshot 2 · placeholder</figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}

function ProjectFooter({ prev, next }) {
  return (
    <nav className="proj-pager" aria-label="Other tracks">
      <a className="proj-pager-card" href={`project.html?slug=${prev.slug}`} data-magnetic>
        <span className="mono proj-pager-label">◁ Previous</span>
        <span className="proj-pager-title">{prev.title}</span>
        <span className="mono proj-pager-meta">{prev.year} · {prev.duration}</span>
      </a>
      <a className="proj-pager-card proj-pager-next" href={`project.html?slug=${next.slug}`} data-magnetic>
        <span className="mono proj-pager-label">Next ▷</span>
        <span className="proj-pager-title">{next.title}</span>
        <span className="mono proj-pager-meta">{next.year} · {next.duration}</span>
      </a>
    </nav>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ProjectPage />);

// Apply default theme to root vars on load (no Tweaks panel on this page —
// the values just inherit whatever was last persisted, otherwise defaults).
const DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "stage",
  "dark": false,
  "fontPair": "editorial",
  "density": "dense",
  "metaphor": "medium"
}/*EDITMODE-END*/;
applyTheme(DEFAULTS);
