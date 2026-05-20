import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function TopTracks() {
  return (
    <section className="section tracks" data-screen-label="04 Top Tracks">
      <SectionHeader
        number="04"
        title="Top Tracks"
        sub="Selected projects · click for the long version"
      />
      <div className="tracks-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
