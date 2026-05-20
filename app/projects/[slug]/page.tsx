import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { projects, type Project } from "@/content/projects";
import { Footer } from "@/components/ui/Footer";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const idx = projects.findIndex((p) => p.slug === params.slug);
  if (idx === -1) notFound();

  const project = projects[idx];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="shell">
      <nav className="proj-nav">
        <Link href="/#tracks" className="proj-back" data-magnetic>
          <span className="proj-back-arrow">◁</span>
          <span>Back to Top Tracks</span>
        </Link>
        <Link href="/" className="proj-home mono" data-magnetic>
          Mirav Vaitha
        </Link>
      </nav>

      <article className="proj">
        <ProjectHero project={project} index={idx} />
        <ProjectBody project={project} />
        <ProjectFooter prev={prev} next={next} />
      </article>

      <Footer />
    </div>
  );
}

function ProjectHero({ project, index }: { project: Project; index: number }) {
  const coverStyle = { "--h": project.hue } as CSSProperties;
  return (
    <header className="proj-hero" data-screen-label="Project hero">
      <div className="proj-hero-cover" style={coverStyle}>
        <div className="cover-grain" />
        <span className="proj-hero-num mono">
          TRACK {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="proj-hero-meta">
        <div className="proj-eyebrow">
          <span className="dot" />{" "}
          <span>
            {project.year} · {project.status.replace("-", " ").toUpperCase()}
          </span>
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
        {(project.links?.live || project.links?.github) && (
          <div className="proj-actions">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-cta"
                data-magnetic
              >
                <span>▷ Visit live</span>
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-cta proj-cta-secondary"
                data-magnetic
              >
                <span>↗ Source</span>
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function ProjectBody({ project }: { project: Project }) {
  const altHue = (project.hue + 40) % 360;
  const coverStyle = { "--h": project.hue } as CSSProperties;
  const coverAltStyle = { "--h": altHue } as CSSProperties;

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
            <li className="proj-credit">
              <em>TBD</em>
            </li>
          ) : (
            project.tech.map((t) => (
              <li key={t} className="proj-credit">
                {t}
              </li>
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
          {/* Placeholder tiles per HANDOFF — swap for real next/image when
              project.screenshots is populated. */}
          <figure
            className="proj-shot proj-shot-wide"
            style={coverStyle}
          >
            <div className="cover-grain" />
            <figcaption className="mono">
              Screenshot 1 · placeholder
            </figcaption>
          </figure>
          <figure className="proj-shot" style={coverAltStyle}>
            <div className="cover-grain" />
            <figcaption className="mono">
              Screenshot 2 · placeholder
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}

function ProjectFooter({ prev, next }: { prev: Project; next: Project }) {
  return (
    <nav className="proj-pager" aria-label="Other tracks">
      <Link
        className="proj-pager-card"
        href={`/projects/${prev.slug}`}
        data-magnetic
      >
        <span className="mono proj-pager-label">◁ Previous</span>
        <span className="proj-pager-title">{prev.title}</span>
        <span className="mono proj-pager-meta">
          {prev.year} · {prev.duration}
        </span>
      </Link>
      <Link
        className="proj-pager-card proj-pager-next"
        href={`/projects/${next.slug}`}
        data-magnetic
      >
        <span className="mono proj-pager-label">Next ▷</span>
        <span className="proj-pager-title">{next.title}</span>
        <span className="mono proj-pager-meta">
          {next.year} · {next.duration}
        </span>
      </Link>
    </nav>
  );
}
