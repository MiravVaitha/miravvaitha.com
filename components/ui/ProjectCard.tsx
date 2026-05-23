import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";

type Props = {
  project: Project;
  index: number;
  active?: boolean;
};

export function ProjectCard({ project, index, active = false }: Props) {
  const isPlaceholder = project.status === "placeholder";
  const coverStyle = { "--h": project.hue } as CSSProperties;
  const className = [
    "track-card",
    isPlaceholder ? "is-placeholder" : null,
    active ? "is-active" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      className={className}
      href={`/projects/${project.slug}`}
      data-slug={project.slug}
      data-magnetic
    >
      <div className="track-cover" style={coverStyle}>
        {project.cover && (
          <>
            <Image
              src={project.cover}
              alt={`${project.title} cover`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              unoptimized={project.cover.endsWith(".svg")}
              className="track-cover-img"
            />
            <div className="track-cover-shade" aria-hidden />
          </>
        )}
        <div className="cover-grain" />
        <div className="cover-glyph mono">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="cover-title">{project.title}</div>
        <div className="cover-hover">
          <div className="cover-eq" aria-hidden>
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="cover-play">▷ Preview</div>
        </div>
        {project.status === "shipped" && (
          <span className="cover-badge">DONE</span>
        )}
        {project.status === "in-progress" && (
          <span className="cover-badge">IN PROGRESS</span>
        )}
        {project.status === "placeholder" && (
          <span className="cover-badge">TBD</span>
        )}
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
    </Link>
  );
}
