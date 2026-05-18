import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

// Social/contact links from v1 site. X and Spotify profile left out per
// MRD (X marked optional, Spotify profile URL TBD).
const links = [
  {
    label: "Email",
    href: "mailto:mirav.vaitha@gmail.com",
    handle: "mirav.vaitha@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "GitHub",
    href: "https://github.com/MiravVaitha",
    handle: "MiravVaitha",
    icon: GithubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://ie.linkedin.com/in/mirav-vaitha-26078b389",
    handle: "mirav-vaitha",
    icon: LinkedinIcon,
    external: true,
  },
];

export function Follow() {
  return (
    <section className="px-6 py-16 sm:px-12 sm:py-24 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Follow
        </h2>
        <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Reach out · stay in touch
        </p>
        <ul className="mt-10 divide-y divide-neutral-800 border-y border-neutral-800">
          {links.map(({ label, href, handle, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 py-4 transition-colors hover:bg-neutral-900/40"
              >
                <div className="flex items-center gap-4">
                  <Icon
                    className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-spotify-green"
                    aria-hidden
                  />
                  <span className="text-base font-medium text-foreground">
                    {label}
                  </span>
                </div>
                <span className="truncate font-mono text-xs text-muted-foreground">
                  {handle}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
