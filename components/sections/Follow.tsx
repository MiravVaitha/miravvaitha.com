import { links } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Follow() {
  return (
    <section className="section follow" data-screen-label="06 Follow">
      <SectionHeader
        number="06"
        title="Follow"
        sub="Stay in touch · reach out"
      />
      <ul className="follow-list">
        {links.map((l) => {
          const isMail = l.href.startsWith("mailto:");
          return (
            <li key={l.label}>
              <a
                href={l.href}
                target={isMail ? undefined : "_blank"}
                rel="noopener noreferrer"
                data-magnetic
              >
                <span className="follow-label">{l.label}</span>
                <span className="follow-handle mono">{l.handle}</span>
                <span className="follow-arrow" aria-hidden>
                  ↗
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
