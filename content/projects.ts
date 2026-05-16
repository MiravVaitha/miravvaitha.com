export type ProjectStatus = "shipped" | "in-progress" | "placeholder";

export type Project = {
  slug: string;
  title: string;
  tech: string[];
  blurb: string;
  status: ProjectStatus;
  cover?: string;
  links?: {
    live?: string;
    github?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "claritycast",
    title: "ClarityCast",
    tech: ["Next.js", "TypeScript", "Tailwind", "Gemini API"],
    blurb:
      "AI-powered web app that turns scrambled thoughts into structured communication.",
    status: "shipped",
  },
  {
    slug: "kroccustoms",
    title: "Kroccustoms",
    tech: ["Shopify", "Branding", "E-commerce"],
    blurb:
      "Co-founded custom clothing brand, ran the storefront end-to-end.",
    status: "shipped",
  },
  {
    slug: "freelance",
    title: "Freelance Web Development",
    tech: ["Next.js", "React", "Vercel"],
    blurb: "Websites for local Dublin businesses.",
    status: "in-progress",
  },
  {
    slug: "rc-vehicle",
    title: "RC Vehicle",
    tech: ["Onshape", "Hardware", "JavaScript"],
    blurb:
      "Built and programmed a remote-controlled vehicle from scratch.",
    status: "shipped",
  },
  {
    slug: "line-follower",
    title: "Line-Following Vehicle",
    tech: ["Micro:bit", "Embedded", "Onshape", "Electronics"],
    blurb:
      "Autonomous line-follower with sensor-tuned motor control.",
    status: "shipped",
  },
  {
    slug: "next",
    title: "What I'm working on next",
    tech: [],
    blurb: "TBD — open slot for ARIA or the next project.",
    status: "placeholder",
  },
];
