export type ProjectStatus = "shipped" | "in-progress" | "placeholder";

export type ProjectScreenshot = {
  src: string;
  caption: string;
  wide?: boolean;
};

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
    media?: string;
  };
  /** Mock track length, used in cards + project hero */
  duration: string;
  year: string;
  /** 0–360, drives the album-cover radial gradient */
  hue: number;
  role: string;
  /** Play count or "—" */
  plays: string;
  /** Paragraphs for the project page body */
  longform: string[];
  screenshots?: ProjectScreenshot[];
};

// UI order is: current → done → next. The sort at the end of `projects`
// enforces this regardless of declaration order — drop new entries anywhere
// in the array and they'll slot into the right group at render time.
const STATUS_ORDER: Record<ProjectStatus, number> = {
  "in-progress": 0,
  shipped: 1,
  placeholder: 2,
};

const projectsRaw: Project[] = [
  // ── Current ─────────────────────────────────────────────────────────────
  {
    slug: "zenemic",
    title: "Zenemic",
    tech: ["React Native", "Expo", "Swift"],
    blurb:
      "An AI event planning mobile app and extension that simplifies organising and managing events.",
    duration: "3:42",
    status: "in-progress",
    year: "2026",
    hue: 165,
    role: "Design and build",
    plays: "1.4K",
    longform: [
      "Currently building an AI-powered mobile app extension with [Shaurya Kapoor](https://www.shauryakapoor.com/) that integrates into your keyboard and can be used in messaging apps to simplify event organising.",
      "Automatically creates an event roadmap, payment splitters, Google Calendar invites, shared photo albums, location links, and more.",
      "Public beta launching on the App Store and Google Play soon. Stay tuned!",
    ],
    cover: "/projects/zenemic/cover.png",
    links: {},
  },
  {
    slug: "team-myles-odonoghue",
    title: "Team Myles O'Donoghue",
    tech: ["Wix", "Daft API", "TypeScript"],
    blurb: "Freelance web development work for teammylesodonoghue.ie.",
    duration: "4:18",
    status: "in-progress",
    year: "2026",
    hue: 200,
    role: "Design and build",
    plays: "847",
    longform: [
      "Currently working with Team Myles O'Donoghue to upgrade their current site. Implementing three main areas of improvement: UI/UX refresh and redesign, Daft API integration for automated listings and building an AI powered chatbot for users to consult about listings or general questions when on the website.",
    ],
    cover: "/projects/team-myles-odonoghue/cover.png",
    links: { live: "https://www.teammylesodonoghue.ie/" },
  },

  // ── Done ────────────────────────────────────────────────────────────────
  {
    slug: "claritycast",
    title: "ClarityCast",
    tech: ["Next.js", "TypeScript", "Tailwind", "Gemini API"],
    blurb:
      "ClarityCast is an AI tool that converts complex thoughts into clear, structured decisions and communication.",
    duration: "4:12",
    status: "shipped",
    year: "2026",
    hue: 18,
    role: "Solo · design + build",
    plays: "1.2K",
    // DRAFT generated from the v2 README + live site walkthrough; edit freely.
    longform: [
      "ClarityCast is a web app for thoughts you haven't finished thinking yet. It has two characters, Zulu the bear and Tango the parrot, who handle two different jobs. Zulu is a thinking partner for unresolved decisions, unclear plans, and the moments when your head is just full; he asks the right questions to help untangle a problem. Tango is a writing partner who turns rough intent into polished email, message, or conversation drafts, with multiple tone variants in one pass.",
      "Under the hood it's Next.js, React, and TypeScript on the front, with the Gemini API doing the heavy lifting, Supabase handling auth and persistent chat sessions, and Rive driving the character animations (idle, thinking, listening states for each). The interesting bit is the reliability layer: a two-tier timeout with automatic model fallback, per-user rate limiting on the AI endpoints, and Zod schemas validating every JSON response, so the UI can confidently render specific cards (Overwhelm, Decisions, Plans, Message prep) instead of blob text.",
      "Small detail I'm fond of: the custom cursor picks up Zulu's amber or Tango's teal depending on which side of the app you're on. It's what makes ClarityCast feel like a place rather than a chatbox. The earlier prototype that started this idea is also on my GitHub.",
    ],
    cover: "/projects/claritycast/cover.png",
    screenshots: [
      { src: "/projects/claritycast/screen-1.png", caption: "Pick your partner" },
      { src: "/projects/claritycast/screen-2.png", caption: "Zulu, the thinking partner in action" },
      { src: "/projects/claritycast/screen-3.png", caption: "Tango, drafting in three tones" },
    ],
    links: {
      live: "https://clarityv2-cyan.vercel.app/",
      github: "https://github.com/MiravVaitha/clarityv2",
    },
  },
  {
    slug: "line-follower",
    title: "Line-Following Vehicle",
    tech: ["Micro:bit", "Embedded Systems", "Electronics", "JavaScript, Onshape"],
    blurb: "Autonomous line-follower with sensor-tuned motor control.",
    duration: "4:23",
    status: "shipped",
    year: "2024",
    hue: 140,
    role: "Solo · electronics + embedded systems",
    plays: "612",
    longform: [
      "An autonomous line-following vehicle built around a BBC Micro:bit. Designed the chassis, motor mounts, and wheels in CAD, fabricated the parts with 3D printing and laser cutting, hand-soldered the circuit onto a Kitronik robotics board, and wrote the firmware in JavaScript.",
      "The control loop reads two light-dependent resistors on the underside of the vehicle and drives each DC motor at a speed that depends on which sensor sees the line. Most of the work went into tuning the LDR threshold values, since ambient light varied through the day and the bot would drift off the line through tight bends if the thresholds were off. Iterated on the thresholds and motor speeds until it held the line cleanly through the full track.",
    ],
    cover: "/projects/line-follower/cover.jpeg",
    screenshots: [
      { src: "/projects/line-follower/cover.jpeg", caption: "The finished build" },
      { src: "/projects/line-follower/screen-2.png", caption: "Motor mount, CAD'd in Onshape" },
      { src: "/projects/line-follower/screen-3.png", caption: "Control loop, in JavaScript" },
      { src: "/projects/line-follower/screen-4.png", caption: "Chassis base plate" },
      { src: "/projects/line-follower/screen-5.png", caption: "Wheel and motor assembly" },
    ],
    links: {
      live: "https://miravvaitha.com/docs/line-follower-project.pdf",
    },
  },
  {
    slug: "pharmstable",
    title: "PharmStable",
    tech: ["Next.js", "TypeScript", "Tailwind", "Anthropic API"],
    blurb:
      "An AI tool that estimates whether expired drugs are still biologically active and surfaces drug-repurposing opportunities.",
    duration: "3:47",
    status: "shipped",
    year: "2026",
    hue: 150,
    role: "Design and build",
    plays: "1.1K",
    // DRAFT generated from the GitHub README + live site walkthrough; edit freely.
    longform: [
      "PharmStable is a web app for a small but stubborn question: when a drug sits past its expiry date, is it actually gone? Most stockpiles get binned on the assumption that an expired pill is a dead pill, but stability is a sliding scale, not a switch. PharmStable scores residual bioactivity on a 0 to 100 heuristic, factoring in time past expiry, storage temperature, humidity, light exposure, container integrity, and formulation, then hands the result back as one of three plain verdicts: Likely Active, Possibly Degraded, or Likely Inactive.",
      "On top of the stability score sits a discovery layer powered by the Anthropic API. Once a drug has been analysed, Claude suggests analog compounds, structural modifications, related drugs, and repurposing candidates, each one tied back to the specific degradation pathways the heuristic just flagged. The brief was never to replace clinical validation, it was to give a researcher or a curious pharmacist a fast first pass before they reach for the bin or the literature.",
      "Built on Next.js, TypeScript, and Tailwind, with Supabase doing auth and history so every analysis is saved to your account, and the Anthropic API kept server-side so no keys leak to the client. The bit I'm fondest of is the verdict gauge: a single semi-circular arc that fills green, amber, or red as the score lands, with the degradation factor breakdown sitting underneath it. One glance and you know what the model thinks, and one scroll and you know why.",
    ],
    cover: "/projects/pharmstable/cover.png",
    screenshots: [
      { src: "/projects/pharmstable/screen-1.png", caption: "Drug identification and storage conditions" },
      { src: "/projects/pharmstable/screen-2.png", caption: "Verdict gauge with activity probability and risk level" },
      { src: "/projects/pharmstable/screen-3.png", caption: "AI-suggested analogs and repurposing leads" },
      { src: "/projects/pharmstable/screen-4.png", caption: "Landing page, feature glance" },
    ],
    links: {
      live: "https://ai-drug-discovery.netlify.app/",
      github: "https://github.com/MiravVaitha/PharmStable",
    },
  },
  {
    slug: "rc-vehicle",
    title: "RC Vehicle",
    tech: ["Onshape", "JavaScript", "Electronics", "Micro:bit"],
    blurb: "Built and programmed a remote-controlled vehicle from scratch.",
    duration: "4:47",
    status: "shipped",
    year: "2025",
    hue: 130,
    role: "Solo · electronics + manufacturing",
    plays: "894",
    longform: [
      "A remote-control football delivery car built as my Leaving Cert Technology higher-level project. The thematic brief sat under UN Sustainable Development Goal 12 (sustainable consumption), so I framed the car as a stadium promotional product. A small, colourful vehicle that drives the match ball out to centre pitch while wearing environmental messages on every panel, turning a kick-off into a chance to broadcast a sustainability message to a full stadium.",
      "Everything started in Onshape. The chassis and the wired controller box were laser-cut from 3mm green acrylic and bonded with weld-on cement, sanded smooth between cuts. The spoiler and the circular ring that cradles the ball were 3D-printed in PLA on the Ultimaker, since a single-piece roof was too big for the print bed. A 5mm brass rod, cut down on the junior hacksaw, forms the front axle and rides through holes I drilled into the wheel hubs. Twenty-odd environmental stickers and a pair of comically oversized googly eyes finish the front.",
      "The brain is a BBC Micro:bit slotted into a Kitronik robotics board, powered by four AA batteries in the controller and tethered to the car by a rainbow ribbon cable soldered to two 1.5V geared DC motors. I wrote the control loop in JavaScript on MakeCode. Button A drives forward, button B reverses, both buttons together pulse one motor forward and one back to spin in place, and a tap on the Micro:bit logo cuts power. Each input throws a matching glyph onto the LED matrix, so the operator gets visual confirmation the input actually landed. The fiddly bit was the wheels. The hubs didn't have wide enough openings for the brass axle, so I drilled them out on a cordless drill, and on one of them I went a fraction too far and came out the other side. It glued on fine.",
    ],
    cover: "/projects/rc-vehicle/cover.png",
    screenshots: [
      { src: "/projects/rc-vehicle/cover.png", caption: "The finished build, googly eyes and all" },
      { src: "/projects/rc-vehicle/screen-2.png", caption: "Wiring and gluing the Kitronik board" },
      { src: "/projects/rc-vehicle/screen-3.png", caption: "Kitroniks board mounted to controller" },
      { src: "/projects/rc-vehicle/screen-4.png", caption: "Spoiler and ball ring, fresh off the Ultimaker" },
      { src: "/projects/rc-vehicle/screen-5.png", caption: "Base assembly drawn in Onshape" },
      { src: "/projects/rc-vehicle/screen-6.png", caption: "Laser-cut chassis bonded with weld-on cement" },
    ],
    links: {
      live: "https://miravvaitha.com/docs/tech-project-portfolio.pdf",
      media: "https://drive.google.com/drive/folders/16Mwq8ZMVIVF9qnfC1pUEB7J8RXV1SsP9",
    },
  },
  {
    slug: "kroccustoms",
    title: "Kroccustoms",
    tech: ["Shopify", "Branding", "Design", "E-commerce"],
    blurb:
      "Co-founded a custom clothing brand. Built the Shopify storefront and ran branding, design, marketing, sales, and finances end-to-end.",
    duration: "2:57",
    status: "shipped",
    year: "2023",
    hue: 75,
    role: "Co-founder",
    plays: "1.5K",
    longform: [
      "Kroccustoms is a custom clothing brand I co-founded in 2023 through the Transition Year Mini Company programme at Kings Hospital School in Dublin. The remit was the whole thing, not just the product. Pick something to sell, build a brand around it, take it to market, and run it like a small business. Ours landed on streetwear, original graphic tees and hoodies aimed at students, friends, and the local clubs orbiting the school.",
      "On the storefront side I built and ran the Shopify shop end-to-end. Catalogue, variants, checkout, shipping rules, and the brand voice across product pages and emails. Designs were drawn in-house, then handed off to a print supplier for production. On the operational side I worked across branding, marketing, sales, and the basic finances. Every SKU was costed by hand against the print bill so we knew which colourways could actually carry a margin, and the rest were retired.",
      "Kroccustoms qualified as one of two Kings Hospital teams for the Local Enterprise Office South Dublin Secondary Schools Enterprise Programme in March 2023. The lesson I kept is the obvious one in hindsight. Ship something a real person can pay for. The first time a stranger handed over actual money for a tee with a logo I'd drawn taught me more than the next ten prototypes put together.",
    ],
    cover: "/projects/kroccustoms/cover.jpg",
    screenshots: [
      { src: "/projects/kroccustoms/screen-1.jpg", caption: "3D K monogram, olive" },
      { src: "/projects/kroccustoms/screen-2.jpg", caption: "Graffiti graphic, black" },
      { src: "/projects/kroccustoms/screen-3.jpg", caption: "Croc mascot, white" },
    ],
    links: { live: "https://kingshospital.ie/kh-entrepreneurs-in-the-making/" },
  },

  // ── Next ────────────────────────────────────────────────────────────────
  {
    slug: "ai-drone",
    title: "AI-Powered Drone",
    tech: ["TBD"],
    blurb: "My next project... probably.",
    duration: "3:14",
    status: "placeholder",
    year: "2026",
    hue: 230,
    role: "Solo · Design and build",
    plays: "247",
    longform: [
      "My next project... probably.",
    ],
    cover: "/projects/ai-drone/cover.jpg",
    links: {},
  },
];

export const projects: Project[] = projectsRaw.sort(
  (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status],
);
