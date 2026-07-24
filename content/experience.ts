export type Experience = {
  org: string;
  role: string;
  start: string;
  end: string | null;
  url?: string | null;
  note?: string | null;
  /** Mock track length, e.g. "3:00" */
  duration?: string;
  summary?: string;
  /** Org logo, shown as an album-cover tile on the right of the entry. */
  logo?: string;
  /** Stable anchor id for deep-links, e.g. the Liner Notes tape deck. */
  anchorId?: string | null;
};

// Order:
//   1. Capventis return placement — only entry with end: "present", so it's
//      the only one that renders the "Currently playing" pill + pulsing ring
//      in Discography.
//   2. Onwards in reverse chronological order from the CV.
export const experience: Experience[] = [
  {
    org: "Capventis",
    role: "Software Test Engineer Intern",
    start: "Jun 2026",
    end: "present",
    url: "https://www.capventis.com/",
    note: "Return placement",
    duration: "—:—",
    logo: "/experience/capventis.png",
    summary:
      "Building on the previous summer's work, currently focused on API testing in TypeScript and SQL.",
  },
  {
    org: "Trinity Student Managed Fund",
    role: "Analyst",
    start: "Jan 2026",
    end: "May 2026",
    url: "https://trinitysmf.com/",
    note: null,
    duration: "4:00",
    logo: "/experience/trinity-smf.png",
    anchorId: "trinity-smf",
    summary:
      "Analysed hardware-sector companies for Europe's largest student-managed fund.",
  },
  {
    org: "Capventis",
    role: "Software Test Engineer Intern",
    start: "Jul 2025",
    end: "Sep 2025",
    url: "https://www.capventis.com/",
    note: null,
    duration: "3:00",
    logo: "/experience/capventis.png",
    summary:
      "Wrote end-to-end test suites for Glu, a business data integration platform using Playwright in JavaScript, working within the existing codebase and shipping changes via GitHub. Built reusable functions and test utilities to reduce boilerplate and speed up test authoring across the engineering team. Participated in weekly engineering standups, contributing to planning and code review alongside full-time engineers. Analysed large client datasets to support reporting and client-facing deliverables.",
  },
  {
    org: "PureJewels",
    role: "Retail Assistant",
    start: "Jun 2023",
    end: "Aug 2023",
    url: "https://www.purejewels.com/",
    note: null,
    duration: "3:00",
    logo: "/experience/purejewels.png",
    summary:
      "High-value retail role: customer service, inventory and stock control, visual merchandising.",
  },
];

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export const links: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:miravvaitha@gmail.com",
    handle: "miravvaitha@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/MiravVaitha",
    handle: "MiravVaitha",
  },
  {
    label: "LinkedIn",
    href: "https://ie.linkedin.com/in/mirav-vaitha-26078b389",
    handle: "mirav-vaitha",
  },
];
