export type Experience = {
  org: string;
  role: string;
  start: string;
  end: string | null;
  note?: string;
};

export const experience: Experience[] = [
  {
    org: "Capventis",
    role: "Software Engineering Intern",
    start: "2026-06",
    end: "present",
    note: "Return placement.",
  },
  {
    org: "Capventis",
    role: "Software Engineering Intern",
    start: "2025-07",
    end: "2025-09",
  },
  {
    org: "Trinity College Dublin",
    role: "BAI Engineering",
    start: "2025",
    end: "2029",
  },
  {
    org: "Freelance",
    role: "Web Developer",
    start: "2025",
    end: "present",
  },
  {
    org: "Kroccustoms",
    role: "Co-founder",
    start: "TBD",
    end: null,
  },
];
