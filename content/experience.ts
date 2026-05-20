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
};

export const experience: Experience[] = [
  {
    org: "Capventis",
    role: "Software Engineering Intern",
    start: "Jun 2026",
    end: "present",
    url: "https://www.capventis.com/",
    note: "Return placement",
    duration: "—:—",
    summary:
      "Returning to Capventis for a second SWE internship this summer — building on the work from last year, with more ownership over delivery this time around.",
  },
  {
    org: "Trinity College Dublin",
    role: "BAI Engineering",
    start: "2025",
    end: "2029",
    url: "https://www.tcd.ie/engineering/",
    note: null,
    duration: "—:—",
    summary:
      "Four-year Bachelor of Engineering. First-year curriculum spans mechanical, electrical, computer, and chemical engineering; specialising in computer / software in years three and four.",
  },
  {
    org: "Capventis",
    role: "Software Engineering Intern",
    start: "Jul 2025",
    end: "Sep 2025",
    url: "https://www.capventis.com/",
    note: null,
    duration: "3:00",
    summary:
      "First internship: shipped features into a CRM integration platform, wrote SQL and back-end glue for a customer-data product, and learned the rhythm of working inside a real engineering team.",
  },
  {
    org: "Freelance",
    role: "Web Developer",
    start: "2025",
    end: "present",
    url: null,
    note: null,
    duration: "—:—",
    summary:
      "Building Next.js websites for small businesses in Dublin — restaurants, service shops, individual professionals. Fast, mobile-first, easy to update.",
  },
  {
    org: "Kroccustoms",
    role: "Co-founder",
    start: "2024",
    end: "present",
    url: "https://www.instagram.com/kroccustoms/",
    note: null,
    duration: "—:—",
    summary:
      "Co-founded a custom-clothing brand based in Dublin. Built the Shopify storefront, set the brand voice, liaised with printers, ran social. First sale taught me more than the next ten prototypes.",
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
    href: "mailto:mirav.vaitha@gmail.com",
    handle: "mirav.vaitha@gmail.com",
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
