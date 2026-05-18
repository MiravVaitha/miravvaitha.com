import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function TopTracks() {
  return (
    <section className="px-6 py-16 sm:px-12 sm:py-24 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Top Tracks
        </h2>
        <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Projects · click for the long version
        </p>
        <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
