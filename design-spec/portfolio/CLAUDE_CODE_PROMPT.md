# Paste this into Claude Code

Use this once you've copied the `portfolio/` folder into your repo (rename it
to `design-spec/` at the repo root, alongside `app/`, `components/`, etc.).

---

I'm working on the `website-refresh` branch of `miravvaitha.com`. There's a
new folder `design-spec/` containing a finished design prototype for the
new site — a music-app-themed personal portfolio.

**Step 1.** Read `design-spec/HANDOFF.md` end-to-end. It has the file map,
chosen design tokens, component-by-component port spec, data-shape
changes, the Spotify wiring plan, and a verification checklist.

**Step 2.** Open `design-spec/portfolio/desktop.html` in a browser if you
can, or read these files to understand the design:
- `design-spec/portfolio/styles.css` — all CSS, single source of truth
- `design-spec/portfolio/theme.jsx` — palettes + fonts + density
- `design-spec/portfolio/sections.jsx` — section component structure
- `design-spec/portfolio/chrome.jsx` — page-level effects
- `design-spec/portfolio/background.jsx` — Paper Shaders Warp wrapper
- `design-spec/portfolio/data.jsx` — projects + experience data with new fields
- `design-spec/portfolio/project.jsx` — project detail page layout

**Step 3.** Port the design into the existing Next.js 14 / Tailwind /
shadcn codebase, working in roughly this order:

1. Install `@paper-design/shaders-react`. Add `Instrument Serif` + `Inter` to the font setup in `app/layout.tsx` (the local `Geist` fonts already loaded stay — Inter joins them).
2. Drop the `dark` class from `<html>` in `app/layout.tsx` (the chosen default is **light mode**, "Stage" palette).
3. Set up the theme CSS variables. Either:
   - Replace the contents of `app/globals.css` with the `:root` block from `design-spec/portfolio/styles.css` (everything up to and including the `--maxw` / `--radius` declarations) — or —
   - Move those variables into `tailwind.config.ts` as a color / font / spacing extension and use Tailwind classes throughout.
   The chosen palette is **Stage** in **light** mode (see HANDOFF "Design tokens" for exact `oklch` values).
4. Extend `content/projects.ts` and `content/experience.ts` with the new fields (`duration`, `year`, `hue`, `role`, `plays`, `longform[]` on projects; `summary` on experience). Copy the data from `design-spec/portfolio/data.jsx`. Treat the long-form copy in there as **drafts to review**, not final.
5. Build the chrome client components (`components/ui/`):
   - `BackgroundShader.tsx` (Warp)
   - `CustomCursor.tsx`
   - `TopScrubber.tsx`
   - `SideScrollbar.tsx`
   - `Marquee.tsx`
   - `ScrollReveals.tsx`
   Mount them in `app/layout.tsx` so they persist across routes.
6. Restyle the existing sections (`components/sections/`) to match the prototype:
   - `Hero.tsx` → centered variant from `design-spec/portfolio/sections.jsx` `HeroCentered`
   - `LinerNotes.tsx` → keep structure, switch type to Instrument Serif, bump contrast
   - `Discography.tsx` → **rebuild as a vertical timeline** — left rail with scroll-progress fill, accent dot per entry, pulsing ring on current roles, summary paragraph under each. See `.disco-timeline` block in `styles.css`.
   - `TopTracks.tsx` → album-cover grid variant
   - `Follow.tsx` → oversized rows with magnetic-cursor arrows
7. Update `components/ui/NowPlaying.tsx`:
   - **Keep** the existing `useEffect` that polls `/api/now-playing` every 30s
   - **Replace** the markup with the prototype's `.np` structure (spinning vinyl placeholder, EQ bars, progress bar, dual timestamps)
   - **Delete** the prototype's `NOW_PLAYING_QUEUE` rotation simulator — that was only there because the design prototype couldn't reach the real API
8. Build `app/projects/[slug]/page.tsx` as a server component that reads from `content/projects.ts` (with `notFound()` for unknown slugs) and renders the project hero / body / pager. See `design-spec/portfolio/project.jsx` for the structure.
9. Update `components/ui/ProjectCard.tsx` so cards link to `/projects/${slug}` (currently they link to the same — confirm) and match the prototype's hover state with EQ bars + "▷ Preview" overlay.

**Step 4.** Do NOT port:
- `tweaks-panel.jsx` — design-time exploration tool only
- `app.jsx` — references the Tweaks panel
- `index.html` — iPhone-frame preview wrapper, not a real page
- `ios-frame.jsx` — same
- The shader-loading shim in `desktop.html` (import maps, esm.sh) — that
  was a hack because the prototype runs on CDN React. In Next.js
  `@paper-design/shaders-react` imports normally.

**Step 5.** Run `npm run dev` and walk through the HANDOFF.md verification
checklist. The Spotify API should "just work" since the existing
`.env.local` and `/api/now-playing/route.ts` are already in place.

**Step 6.** When porting is done, commit on `website-refresh` and open a
PR against `main`. Don't merge yet — let me review the live preview first.

Constraints:
- Stay on the `website-refresh` branch the whole time.
- Don't touch the legacy root-level static HTML files (`index.html`, `experience.html`, etc.) — those are the old site on `main`.
- The site deploys via GitHub Pages from the `gh-pages` branch — don't touch deployment yet, just confirm the build works locally.
- I want pixel-close fidelity to the prototype. If you have to deviate (e.g. an animation doesn't translate cleanly to Tailwind), call it out in your reply rather than silently changing the design.
