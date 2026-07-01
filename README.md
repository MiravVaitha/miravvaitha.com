# miravvaitha.com

Personal portfolio for Mirav Vaitha, built as a music streaming app. Roles become a discography, projects become top tracks, and a live "now playing" widget streams whatever is currently on my Spotify.

Live site: [miravvaitha.com](https://miravvaitha.com)

## Concept

The site borrows the visual language of a music player and maps each portfolio section onto a musical idea:

| Section | Framing | Source |
| --- | --- | --- |
| Hero | Cover art and intro | `components/sections/Hero.tsx` |
| Marquee | Scrolling ticker | `app/page.tsx` (`MARQUEE_ITEMS`) |
| Liner Notes | About and bio | `components/sections/LinerNotes.tsx` |
| Discography | Roles and experience as a track timeline | `content/experience.ts` |
| Top Tracks | Projects as album cards | `content/projects.ts` |
| Follow | Social links | `content/experience.ts` (`links`) |
| Now Playing | Live Spotify status | `/api/now-playing` + `lib/spotify.ts` |

Persistent chrome (animated shader background, custom cursor, top scrubber, side scrollbar, scroll reveals) is mounted once in `app/layout.tsx`.

## Tech stack

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS v3.4. Most of the visual design lives in `app/globals.css`; utility classes are used sparingly.
- **UI primitives:** shadcn/ui scaffolding (`components.json`, `lib/utils.ts`)
- **Fonts:** Instrument Serif (display) and Inter (body) via `next/font/google`; Geist Sans and Geist Mono as local fonts
- **Background:** Paper Shaders Warp (`@paper-design/shaders-react`)
- **Data:** Spotify Web API for the now-playing widget

## Getting started

Prerequisites: Node.js 18.17 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The now-playing widget stays inert until the Spotify variables below are set.

## Environment variables

The now-playing endpoint reads three variables. Copy the example file and fill in real values (the copy is gitignored):

```bash
cp .env.local.example .env.local
```

```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

Generating a refresh token (development only):

1. Run `npm run dev`.
2. Visit `http://127.0.0.1:3000/api/spotify/auth/login` and authorise on Spotify.
3. Copy the refresh token shown on the callback page into `.env.local`.
4. Restart the dev server.

The auth helper routes return a 404 in production, so they never ship live. The Spotify app's redirect URI must be exactly `http://127.0.0.1:3000/api/spotify/auth/callback`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (`next lint`) |
| `npx tsc --noEmit` | Type check without writing build artifacts |

Note: do not run `npm run build` while the dev server is running. The build writes into `.next/`, which clobbers the dev runtime. Stop dev first, or use `npx tsc --noEmit` for a live type check.

## Project structure

```
app/
  layout.tsx                 # Root layout: fonts, metadata, persistent chrome
  page.tsx                   # Home: Hero, Marquee, Liner Notes, Discography, Top Tracks, Follow, Footer
  globals.css                # Ported design CSS (source of truth for visual styling)
  fonts/                     # Geist variable font files
  api/
    now-playing/route.ts     # Production Spotify endpoint
    spotify/auth/            # Dev-only OAuth helper (refresh-token generator)
  projects/[slug]/page.tsx   # Project detail page (static params from content/projects.ts)
components/
  sections/                  # Hero, Liner Notes, Discography, Top Tracks, Follow
  ui/                        # Background, cursor, scrubber, scrollbar, marquee, cards, footer
content/
  projects.ts                # Project entries (title, tech, blurb, cover, long-form copy)
  experience.ts              # Experience entries and social links
lib/
  spotify.ts                 # Spotify token refresh and now-playing fetch, with caching
  theme.ts                   # Typed palettes, font pairs, density presets
  utils.ts                   # cn() class-name helper
design-spec/portfolio/       # Frozen design prototype and handoff notes
public/                      # Static assets (profile photo, project images)
```

## Editing content

Content is typed and file based, so no CMS is involved.

- **Projects:** add or edit entries in `content/projects.ts`. Each entry drives its album card in Top Tracks and its detail page at `/projects/[slug]`. Entries sort automatically by status (in progress, then shipped, then placeholder). Drop project images in `public/projects/{slug}/` and reference them from the entry.
- **Experience:** add or edit entries in `content/experience.ts`. The entry marked `end: "present"` renders the "Currently playing" pill in Discography.

## Deployment

Built to deploy on Vercel. Set the three Spotify environment variables in the Vercel project settings so the now-playing endpoint works in production. The now-playing route is forced dynamic and is never statically cached.

## License

Personal project. All rights reserved.
