# CLAUDE.md

Working notes for any session on this repo. Read end-to-end at the start of each session.

## Project

**miravvaitha.com v2** — personal portfolio, music-app-themed. Active work happens on the `website-refresh` branch. `main` still serves v1 (the legacy Vite app deployed via GitHub Pages from `gh-pages`). Nothing in v2 is on `main` yet — that's a deliberate merge step taken after live review.

## Where the spec lives

1. **`design-spec/portfolio/HANDOFF.md`** — design source of truth. Tokens, file map, component-by-component port spec, verification checklist. Read this before touching layout / type / colour.
2. **`design-spec/portfolio/desktop.html`** — open in a browser for the pixel-target prototype.
3. **`design-spec/portfolio/styles.css`** — all design CSS, ported almost verbatim into `app/globals.css`.

The original product MRD (audience, success criteria, tone of voice, scope, deploy plan) lives in chat history — promote to a top-level `MRD.md` if you want it in-repo.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind v3.4 — utility classes are minimal; the real styling lives in `app/globals.css` (ported from `design-spec/portfolio/styles.css`)
- shadcn/ui scaffolding installed manually (`components.json`, `lib/utils.ts`) — few primitives actually used
- Fonts: **Instrument Serif** (display) + **Inter** (body) via `next/font/google`; **Geist Sans** + **Geist Mono** kept as locals (`app/fonts/*.woff`)
- **Paper Shaders Warp** background (`@paper-design/shaders-react`)
- Spotify Web API via `/api/now-playing` + `lib/spotify.ts`
- Deployment: TBD — Vercel planned per MRD; v1 still ships via GH Pages

## Folder layout

```
app/
  layout.tsx                       # mounts BackgroundShader, CustomCursor, TopScrubber, SideScrollbar, ScrollReveals
  page.tsx                         # Hero · Marquee · LinerNotes · Discography · TopTracks · Follow · Footer
  globals.css                      # ported design CSS (the source of truth for visual styling)
  fonts/                           # Geist VF woff files
  api/
    now-playing/route.ts           # production Spotify endpoint
    spotify/auth/{login,callback}  # DEV-ONLY OAuth helper (refresh-token generator)
  projects/[slug]/page.tsx         # project detail server component, generateStaticParams over content/projects.ts
components/
  sections/  Hero · LinerNotes · Discography · TopTracks · Follow
  ui/        BackgroundShader · CustomCursor · TopScrubber · SideScrollbar · ScrollReveals · Marquee · NowPlaying · ProjectCard · SectionHeader · Footer · icons (unused — safe to delete)
content/
  projects.ts                      # Project[] — duration / year / hue / role / plays / longform / screenshots
  experience.ts                    # Experience[] + SocialLink[] for Follow
lib/
  spotify.ts                       # getAccessToken + getNowPlaying (real Spotify Web API)
  theme.ts                         # typed PALETTES / FONT_PAIRS / DENSITY (Stage default; others available)
  utils.ts                         # cn() helper
public/
  mirav.jpg                        # profile photo
design-spec/portfolio/             # frozen design prototype (HANDOFF + styles + JSX sources + desktop.html preview)
```

## Chosen design defaults (shipped fixed)

From the `EDITMODE-BEGIN` block in `design-spec/portfolio/app.jsx`:

| Token | Value |
|---|---|
| Palette | **Stage** (sage green accent on warm off-white) |
| Mode | **light** |
| Type pair | **Editorial** — Instrument Serif display · Inter body · Geist Mono mono |
| Density | **dense** (48px section padding, 14px gap) |
| Music metaphor | **medium** (marquee + chrome on, mini-player off) |
| Hero variant | **centered** |
| Card variant | **grid** (album-cover grid) |

Tokens live at `:root` in `app/globals.css`. Alternate palettes (Vinyl / Synth / Cassette) are typed in `lib/theme.ts` but not exposed in production.

## Commands

```bash
npm run dev        # local dev server (http://localhost:3000)
npm run build      # production build — STOP dev first (build clobbers .next cache)
npm run lint       # next lint
npx tsc --noEmit   # typecheck without writing to .next (safe while dev is running)
npm run start      # serve production build
```

There is no test suite.

## Working agreement

- Read this CLAUDE.md at the start of every session.
- Build incrementally — one section at a time on smaller tasks; for large ports (e.g. the design-spec port) plough end-to-end then iterate.
- No speculative features. If it's not in the MRD or HANDOFF, ask first.
- All placeholder copy is marked `TBD`. Never invent final copy without being asked.
- When asked to draft copy, mark it `DRAFT —` in a file comment so the boundary is obvious.

## Operational gotchas

- **Don't run `npm run build` while `npm run dev` is up.** Build writes prod artifacts into `.next/` that conflict with the dev server's runtime layout — you'll see `Error: Cannot find module './XXX.js'`. Use `npx tsc --noEmit` for typecheck while dev is live; full builds happen with dev stopped. If you hit the clobber: stop dev, `Remove-Item -Recurse -Force .next` (PowerShell), `npm run dev`.
- **PowerShell ≠ cmd.exe** — for recursive deletes use `Remove-Item -Recurse -Force <path>`, not `rmdir /s /q <path>`.
- **`gh` CLI isn't installed.** PRs open via the URL GitHub returns from `git push -u origin <branch>`.
- **`cursor: none !important` is applied globally on `pointer: fine` devices** via globals.css. If something looks weird because the cursor is missing, that's why — the custom cursor (`CustomCursor.tsx`) replaces it. On touch devices everything reverts to native.

## Spotify integration

Three env vars in `.env.local` (gitignored):

```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

To regenerate the refresh token: `npm run dev`, visit `http://127.0.0.1:3000/api/spotify/auth/login`, authorise on Spotify, copy the token off the callback page into `.env.local`, restart dev. The auth routes are guarded with `NODE_ENV === "production"` → 404, so they're inert when deployed.

The `Spotify Dashboard` redirect URI must be `http://127.0.0.1:3000/api/spotify/auth/callback` exactly. Browsers sometimes rewrite to `localhost`; both `login` and `callback` routes force the URI back to `127.0.0.1` in dev to handle that.

## Outstanding TBDs (rolling)

Content
- Hero tag still the prototype DRAFT: "Engineer, builder, occasional shipper of small things."
- Liner Notes paragraphs are DRAFT
- Project page long-form prose is DRAFT per project (in `content/projects.ts → longform[]`)
- Real project screenshots — placeholders ship; drop real images in `public/projects/{slug}/` and populate `project.screenshots`
- Project live/source URLs — many `#` placeholders in `content/projects.ts`
- X handle + Spotify profile URL — left out per MRD ("X optional", "Spotify TBD")

Repo hygiene
- Branch is still `website-refresh`; MRD says `v2`. Rename with `git branch -m website-refresh v2` if you want them to match.
- `components/ui/icons.tsx` is unused (inline ↗/▷/◁ characters replaced the brand SVGs) — safe to delete.

Deploy
- Vercel migration not started. v1 still serves from GH Pages via `gh-pages` branch on `main`. Plan per MRD: import to Vercel → add `miravvaitha.com` → update DNS → disable GH Pages → merge `v2`/`website-refresh` into `main`.
