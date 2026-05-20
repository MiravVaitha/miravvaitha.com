// Content data for the portfolio prototype.
// Lifted from /content/projects.ts and /content/experience.ts on the website-refresh branch.

const PROJECTS = [
  {
    slug: "claritycast",
    title: "ClarityCast",
    tech: ["Next.js", "TypeScript", "Tailwind", "Gemini API"],
    blurb: "AI tool that turns scrambled thoughts into structured communication.",
    duration: "4:12",
    status: "shipped",
    year: "2025",
    hue: 18, // rust
    role: "Solo · design + build",
    plays: "1.2K",
    longform: [
      "ClarityCast is a web app that takes a free-form brain-dump — meeting notes, half-baked ideas, a rambling voice memo — and rewrites it into clearly structured communication: an email, a Slack update, a stand-up note, a one-pager.",
      "The interesting bit is the prompt chain. Rather than one big LLM call, the app first classifies intent (am I writing an email or a memo?), then drafts, then runs a separate critique pass before producing the final output. That layered approach catches the AI-slop tone that single-shot prompts produce.",
      "Built with Next.js, the Gemini API, and a small amount of state management for the multi-step editor. Deployed on Vercel.",
    ],
    links: { live: "#", github: "#" },
  },
  {
    slug: "kroccustoms",
    title: "Kroccustoms",
    tech: ["Shopify", "Branding", "E-commerce"],
    blurb: "Co-founded custom clothing brand. Ran the storefront end-to-end.",
    duration: "3:48",
    status: "shipped",
    year: "2024",
    hue: 320, // magenta
    role: "Co-founder · ops + storefront",
    plays: "—",
    longform: [
      "Kroccustoms is a custom-clothing brand I co-founded — bespoke hoodies, tees, tracksuits for individuals, sports teams, and small clubs in the Dublin area.",
      "On the technical side: built the Shopify storefront, set up the product catalog and order flow, wrote the brand voice, and handled customer comms. On the operational side: liaised with the printers, costed every SKU, ran social.",
      "The lesson: ship something a real person can pay for. The first sale teaches you more than the next ten prototypes.",
    ],
    links: { live: "https://www.instagram.com/kroccustoms/" },
  },
  {
    slug: "freelance",
    title: "Freelance Web Dev",
    tech: ["Next.js", "React", "Vercel"],
    blurb: "Websites for local Dublin businesses.",
    duration: "—:—",
    status: "in-progress",
    year: "2025",
    hue: 200, // cyan
    role: "Solo · design + build",
    plays: "—",
    longform: [
      "An ongoing stream of work building websites for small businesses around Dublin — restaurants, service businesses, individual professionals.",
      "The brief is usually the same: they have a slow, outdated WordPress site (or no site at all), and they want something fast, mobile-friendly, and easy to update. I build a custom Next.js front-end, deploy on Vercel, and hand them either a tiny CMS or a one-page Markdown source they can edit themselves.",
      "Currently working with two clients. Open to more — get in touch if that's you.",
    ],
    links: {},
  },
  {
    slug: "rc-vehicle",
    title: "RC Vehicle",
    tech: ["Onshape", "Hardware", "JavaScript"],
    blurb: "Built and programmed a remote-controlled vehicle from scratch.",
    duration: "5:21",
    status: "shipped",
    year: "2024",
    hue: 50, // amber
    role: "Solo · mechanical + firmware",
    plays: "—",
    longform: [
      "A from-scratch RC vehicle as a hands-on project for Trinity's first-year engineering course. CAD'd the chassis in Onshape, 3D-printed the body, wired the motor controller and receiver, and wrote the control firmware in JavaScript.",
      "The non-obvious part was tuning the differential steering response — naive PWM mapping made the car oversteer at low throttle. A small dead-zone + exponential curve on the stick input fixed it.",
      "Won the in-class drag race and time trial. The body is on a shelf in my room.",
    ],
    links: {},
  },
  {
    slug: "line-follower",
    title: "Line-Following Vehicle",
    tech: ["Micro:bit", "Embedded", "Electronics"],
    blurb: "Autonomous line-follower with sensor-tuned motor control.",
    duration: "3:02",
    status: "shipped",
    year: "2023",
    hue: 140, // sage
    role: "Solo · electronics + firmware",
    plays: "—",
    longform: [
      "An autonomous line-following vehicle built around a BBC Micro:bit. Two IR reflectance sensors, two DC motors, and a small bit of state-machine logic to handle T-junctions and gaps in the line.",
      "The fun part was the PID tuning. Without it the bot oscillated wildly down a straight; with too much D-term it locked up on corners. The final tune is a heavy P, moderate D, no I — closer to a band-bang than a textbook controller, but it works.",
    ],
    links: {},
  },
  {
    slug: "next",
    title: "Untitled Track",
    tech: [],
    blurb: "Open slot — what's next.",
    duration: "—:—",
    status: "placeholder",
    year: "2026",
    hue: 260, // violet
    role: "TBD",
    plays: "—",
    longform: [
      "This space is intentionally left blank. Something will land here soon.",
    ],
    links: {},
  },
];

const EXPERIENCE = [
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

const LINKS = [
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

// Faux "now playing" rotating queue — stand-in for the live Spotify API
// during prototype. In production this comes from /api/now-playing.
const NOW_PLAYING_QUEUE = [
  { track: "Strobe", artist: "Deadmau5", album: "For Lack of a Better Name", duration: 634, playing: true },
  { track: "Redbone", artist: "Childish Gambino", album: "Awaken, My Love!", duration: 326, playing: true },
  { track: "Nights", artist: "Frank Ocean", album: "Blonde", duration: 307, playing: true },
  { track: "Time Alone with You", artist: "Jacob Collier ft. Daniel Caesar", album: "Djesse Vol. 3", duration: 257, playing: true },
];

// Gallery — placeholders for now. User drops in real photos later.
const GALLERY = [
  { id: "g1", caption: "Dublin · Liffey", ratio: "4/5", hue: 28 },
  { id: "g2", caption: "Workbench, late", ratio: "1/1", hue: 200 },
  { id: "g3", caption: "RC build", ratio: "4/3", hue: 50 },
  { id: "g4", caption: "Trinity, Hilary term", ratio: "3/4", hue: 140 },
  { id: "g5", caption: "Sketchbook", ratio: "1/1", hue: 320 },
  { id: "g6", caption: "Studio", ratio: "4/5", hue: 260 },
];

Object.assign(window, { PROJECTS, EXPERIENCE, LINKS, NOW_PLAYING_QUEUE, GALLERY });
