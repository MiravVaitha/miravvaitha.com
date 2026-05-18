import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

// Gradient palette for placeholder covers. Cycled by index so cards have
// some visual variety without us having to ship real cover art yet.
const GRADIENTS = [
  "from-emerald-900 via-neutral-900 to-neutral-950",
  "from-purple-900 via-neutral-900 to-neutral-950",
  "from-sky-900 via-neutral-900 to-neutral-950",
  "from-rose-900 via-neutral-900 to-neutral-950",
  "from-amber-900 via-neutral-900 to-neutral-950",
  "from-teal-900 via-neutral-900 to-neutral-950",
];

type Props = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: Props) {
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const initial = project.title.charAt(0).toUpperCase();
  const isPlaceholder = project.status === "placeholder";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-lg p-3 transition-colors hover:bg-neutral-900/60"
    >
      <div
        className={cn(
          "relative aspect-square overflow-hidden rounded-md border border-neutral-800 bg-gradient-to-br",
          gradient,
        )}
      >
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.title} cover`}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-5xl font-bold text-neutral-700 sm:text-6xl">
              {initial}
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3
            className={cn(
              "truncate text-base font-medium text-foreground",
              isPlaceholder && "italic text-muted-foreground",
            )}
          >
            {project.title}
          </h3>
        </div>
        <p className="truncate font-mono text-xs text-muted-foreground">
          {project.tech.length > 0 ? project.tech.join(" · ") : "—"}
        </p>
      </div>
    </Link>
  );
}
