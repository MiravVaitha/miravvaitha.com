import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

// Placeholder cover gradients matching ProjectCard, indexed by project
// position so a project's cover looks the same on home + detail page.
const GRADIENTS = [
  "from-emerald-900 via-neutral-900 to-neutral-950",
  "from-purple-900 via-neutral-900 to-neutral-950",
  "from-sky-900 via-neutral-900 to-neutral-950",
  "from-rose-900 via-neutral-900 to-neutral-950",
  "from-amber-900 via-neutral-900 to-neutral-950",
  "from-teal-900 via-neutral-900 to-neutral-950",
];

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const index = projects.findIndex((p) => p.slug === params.slug);
  if (index === -1) notFound();
  const project = projects[index];
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <main className="px-6 py-16 sm:px-12 sm:py-24 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Back to home
        </Link>

        <div className="mt-10 grid gap-8 sm:grid-cols-[200px_1fr] sm:gap-10">
          <div
            className={cn(
              "relative aspect-square overflow-hidden rounded-md border border-neutral-800 bg-gradient-to-br",
              gradient,
            )}
          >
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-mono text-6xl font-bold text-neutral-700">
                {project.title.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {project.status === "placeholder"
                ? "Placeholder"
                : project.status === "in-progress"
                  ? "In progress"
                  : "Shipped"}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {project.title}
            </h1>
            {project.tech.length > 0 && (
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                {project.tech.join(" · ")}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 space-y-6 text-base leading-relaxed text-neutral-300">
          <p>{project.blurb}</p>
          {/* TBD: long-form write-up + screenshot gallery per MRD. Fill
              per project in content/projects.ts (extend the type with
              `body` and `screenshots`) and render here. */}
          <p className="italic text-muted-foreground">
            TBD — long-form write-up.
          </p>
        </div>

        {(project.links?.live || project.links?.github) && (
          <div className="mt-10 flex flex-wrap gap-3">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-spotify-green hover:text-spotify-green"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                Live
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-spotify-green hover:text-spotify-green"
              >
                <GithubIcon className="h-4 w-4" />
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
