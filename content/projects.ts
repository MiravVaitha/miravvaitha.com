export type ProjectStatus =
  | "shipped"
  | "in-progress"
  | "placeholder"
  /** Started, not finished, not being worked on. Parked rather than abandoned. */
  | "shelved";

export type ProjectScreenshot = {
  src: string;
  caption: string;
  wide?: boolean;
  /**
   * Phone-shaped screenshot. The default tile is 16/10 landscape and crops to
   * fill, which reduces a phone screen to a sliver, so portrait shots get a
   * near-phone tile, are fitted rather than cropped, and never take the wide
   * hero slot. Set it on every shot in a project to get an even row of them.
   */
  portrait?: boolean;
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

// UI order is: current → done → next → shelved. The sort at the end of
// `projects` enforces this regardless of declaration order — drop new entries
// anywhere in the array and they'll slot into the right group at render time.
// Shelved sorts last on purpose: parked work sits below finished work.
const STATUS_ORDER: Record<ProjectStatus, number> = {
  "in-progress": 0,
  shipped: 1,
  placeholder: 2,
  shelved: 3,
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
    screenshots: [
      { src: "/projects/zenemic/screen-1.png", caption: "Launch screen", portrait: true },
      { src: "/projects/zenemic/screen-2.png", caption: "Setting up an event, resource by resource", portrait: true },
      { src: "/projects/zenemic/screen-3.png", caption: "The finished event and its automated resources", portrait: true },
    ],
    links: {},
  },
  // ── Done ────────────────────────────────────────────────────────────────
  {
    slug: "uas-ground-station",
    title: "UAS Ground Station",
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "MAVLink", "ArduPilot SITL"],
    blurb:
      "Ground control station for a fixed-wing drone: live MAVLink telemetry, a mapped flight track, waypoint missions, a payload release solver, and offline replay.",
    duration: "5:12",
    status: "shipped",
    year: "2026",
    hue: 250,
    role: "Solo · frontend + backend",
    plays: "1.3K",
    // DRAFT written from the repo README and NOTES.md; edit freely.
    longform: [
      "A ground control station for a fixed-wing drone. It takes live MAVLink telemetry off an ArduPilot simulator, draws the aircraft's track on a vector map, plots altitude and battery as it flies, uploads waypoint missions to the vehicle, and works out where a payload has to leave the aircraft to land on a target you click. It runs in two modes. Live mode has a Python backend listening for MAVLink over UDP, normalising the telemetry, and streaming it to the browser over a WebSocket. Replay mode plays a recorded flight straight from a JSON file, with no backend, no aircraft, and no network past the initial page load.",
      "Both modes emit identically shaped frames, so there is a single code path to the UI and almost everything keeps working with nothing running behind it: map, charts, waypoint planning, and the release solver. Only mission upload needs a real vehicle. On the backend a daemon thread owns the blocking pymavlink connection and atomically swaps normalised frames into a shared reference, which the WebSocket handler and the recorder each sample at 5 Hz. That is what makes a recording exactly what the browser saw, rather than a second, subtly different view of the same flight. Mission upload rides the same UDP link as the telemetry through an autopilot-driven handshake, with the HTTP handler queueing jobs that the reader loop services between incoming messages.",
      "The release solver is deliberately first-order: fall time from altitude, forward carry along the approach heading at groundspeed rather than airspeed since the payload inherits ground motion at release, then wind drift on top, all subtracted from the target to give a release point. It ignores drag and assumes the payload couples to the wind instantly, which a real system would not. My favourite bug wasn't in the code at all. Telemetry never arrived because sim_vehicle.py auto-detects WSL2 and derives the Windows host IP a way that only holds under NAT networking, so under mirrored networking it resolved to the default gateway and a full flight's worth of MAVLink went to my home router. That one and every other dead end is written up in NOTES.md in the repo.",
    ],
    cover: "/projects/uas-ground-station/cover.png",
    screenshots: [
      { src: "/projects/uas-ground-station/screen-1.gif", caption: "Live flight track and telemetry" },
      { src: "/projects/uas-ground-station/screen-2.png", caption: "Waypoints uploaded, mission in progress" },
      { src: "/projects/uas-ground-station/cover.png", caption: "Payload release solver, target and release point" },
      { src: "/projects/uas-ground-station/screen-3.gif", caption: "Replaying a recorded flight, no backend" },
    ],
    links: {
      live: "https://uas-ground-station.vercel.app",
      github: "https://github.com/MiravVaitha/uas-ground-station",
    },
  },
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
    slug: "faceless",
    title: "Faceless",
    tech: ["React", "Three.js", "TypeScript", "Tauri"],
    blurb:
      "Faceless is a Nextbot-style horror game: upload any photo and that face becomes the thing chasing you through a fog-drenched night city.",
    duration: "3:33",
    status: "shipped",
    year: "2026",
    hue: 300,
    role: "Solo · design + build",
    plays: "666",
    // DRAFT generated from the GitHub README; edit freely.
    longform: [
      "Faceless is a first-person horror-chase game in the style of Garry's Mod Nextbots. Upload a photo of anyone and that face becomes a flat 2D sprite that hunts you through a fogged night city. Sprinting alone barely outruns it, so you chain bunny-hops for airborne speed, and a timer keeps your best survival run on local record.",
      "Built with React Three Fiber, three.js, and Zustand, with Tauri or Electron shells for a desktop build. The bot chases with A* pathfinding recomputed on a short delay, so it overshoots corners the way a proper Nextbot should. The repo ships zero binary assets: every texture is painted onto canvases at load, and every sound, from footsteps to the jumpscare sting, is synthesized with the Web Audio API.",
      "As the face closes in, a red vignette, screen shake, and an accelerating heartbeat give away how much trouble you're in, and getting caught ends in a full-screen jumpscare. Best played by handing the keyboard to someone with their own face loaded in.",
    ],
    cover: "/projects/faceless/cover.png",
    screenshots: [
      { src: "/projects/faceless/screen-1.png", caption: "The street, seconds before it isn't empty" },
      { src: "/projects/faceless/screen-2.png", caption: "Upload a face. Then run." },
      { src: "/projects/faceless/screen-3.png", caption: "It doesn't stop" },
      { src: "/projects/faceless/screen-4.png", caption: "A new best, apparently" },
    ],
    links: {
      github: "https://github.com/MiravVaitha/faceless",
    },
  },

  // ── Shelved ─────────────────────────────────────────────────────────────
  {
    slug: "team-myles-odonoghue",
    title: "Team Myles O'Donoghue",
    tech: ["Wix", "Daft API", "TypeScript"],
    blurb:
      "Freelance work on a Dublin estate agency's site: redesign, Daft.ie listing sync, and an AI assistant.",
    duration: "4:18",
    status: "shelved",
    year: "2026",
    hue: 200,
    role: "Design and build",
    plays: "847",
    // DRAFT written from the three build screenshots; edit freely.
    longform: [
      "Team Myles O'Donoghue is a Dublin estate agency, and this was freelance work on their Wix site. The brief ran across three fronts: a UI and UX refresh, an integration with Daft.ie so property listings kept themselves current, and an AI assistant to field the questions the office was answering by phone. The redesign came first. A cleaner header and navigation, a hero built around a single call to action, and a consistent brand treatment across the pages, so sales, valuations, commercial properties, and maintenance requests each had an obvious way in.",
      "The Daft.ie integration was the heaviest piece. It lived in Wix's Velo backend as a set of modules that spoke to Daft's SOAP API, pulled the agency's listings on a schedule, and wrote them into the site's own collections so nothing had to be re-entered by hand. Most of the effort went into making it debuggable rather than clever: a SOAP helper so request building stayed in one place, structured failure objects instead of thrown strings, logging that masked credentials and truncated oversized HTML payloads, and a pair of test runners so a sync could be exercised on demand instead of waiting on the scheduled job.",
      "The assistant was a custom chat widget briefed on the agency's services, opening hours, coverage areas, and contact routes, with quick replies for the questions that came up most, current listings in particular. I built it against a local harness that mocked the live site's own back-to-top button at the same size, colour, and position, so I could check the launcher docked cleanly and never sat on top of anything.",
    ],
    cover: "/projects/team-myles-odonoghue/cover.png",
    screenshots: [
      { src: "/projects/team-myles-odonoghue/screen-1.png", caption: "Redesigned header and hero, in the Wix editor" },
      { src: "/projects/team-myles-odonoghue/screen-2.png", caption: "Daft.ie sync running in the Velo backend" },
      { src: "/projects/team-myles-odonoghue/screen-3.png", caption: "Site assistant, tested in a local harness" },
    ],
    links: { live: "https://www.teammylesodonoghue.ie/" },
  },
];

export const projects: Project[] = projectsRaw.sort(
  (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status],
);
