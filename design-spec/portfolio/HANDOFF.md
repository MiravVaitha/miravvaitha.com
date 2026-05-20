# Handoff: miravvaitha.com portfolio refresh

This folder is the **design spec** for the `website-refresh` branch of
`miravvaitha.com`. The prototype here (`desktop.html`) is the visual
target — port it into the existing Next.js 14 / Tailwind / shadcn codebase.

Open `portfolio/desktop.html` (or the mobile wrapper at `portfolio/index.html`)
in a browser to see the live design. Use the **Tweaks** toggle in the
toolbar to flip palettes, fonts, density, hero/card variants, and
music-metaphor strength — that menu IS the variation matrix.

---

## File map

| Prototype file | What it is | Where it goes in the real repo |
| --- | --- | --- |
| `desktop.html` | Page shell — loads React, Babel, fonts, the import-map shim for the shader library, then all the JSX scripts | (not ported — Next.js handles this) |
| `index.html` | iPhone-framed mobile preview wrapper | (not ported — preview only) |
| `project.html` | Project detail page shell | (not ported — same Next.js handling) |
| `styles.css` | **All CSS.** Theme variables, component styles, animations, mobile rules. Single source of truth for spacing / type / colors. | Port to either `app/globals.css` (variables + base) + Tailwind utility classes for components, OR keep mostly raw CSS and import once in `layout.tsx`. Either works. |
| `theme.jsx` | Palette / font / density definitions + `applyTheme()` that writes them to `:root` CSS vars | Port to `lib/theme.ts` (palettes as a typed const) + a `<ThemeProvider>` client component that reads localStorage and writes the same CSS vars |
| `data.jsx` | Projects, experience, links, faux now-playing queue, gallery (gallery is unused — drop it) | `content/projects.ts` (extend existing), `content/experience.ts` (extend existing) — see "Data shape changes" below |
| `chrome.jsx` | `TopScrubber`, `SideScrollbar`, `CustomCursor`, `Marquee`, `MiniPlayer`, `ScrollReveals` | New `components/ui/` files, one per component. All client components (`"use client"`). |
| `background.jsx` | Paper Shaders Warp wrapper | `components/ui/BackgroundShader.tsx` — see "Background shader install" below |
| `sections.jsx` | `Hero`, `NowPlaying`, `LinerNotes`, `Discography`, `TopTracks`, `ProjectCard`, `TracksList`, `TracksMosaic`, `Follow`, `Footer`, `SectionHeader` | Split into the existing `components/sections/` files. `NowPlaying` already exists — replace its body with the prototype's design and keep its existing data-fetching `useEffect`. |
| `project.jsx` | Project detail page (`ProjectHero`, `ProjectBody`, `ProjectFooter`) | `app/projects/[slug]/page.tsx` — server component that reads the project by slug, plus client components for any interactive bits |
| `app.jsx` | Root composition + Tweaks panel + `useTweaks` hook usage | Skip the Tweaks panel in production. Tweaks were a design-exploration tool — pick the chosen defaults (see "Chosen defaults" below) and ship those values as fixed. |
| `tweaks-panel.jsx` | Tweaks chrome | **Do not port.** Design-time only. |
| `mirav.jpg` | Profile photo | Already at `public/mirav.jpg` — no change. |
| `ios-frame.jsx` | iPhone frame for the mobile preview | **Do not port.** Preview wrapper only. |

---

## Chosen defaults (what the user picked)

From the `EDITMODE-BEGIN` block in `portfolio/app.jsx`:

```json
{
  "palette": "stage",         // sage green accent
  "dark": false,              // LIGHT mode
  "fontPair": "editorial",    // Instrument Serif display + Inter body + Geist Mono
  "density": "dense",         // 48px section padding
  "metaphor": "medium",       // marquee + chrome on, mini-player off
  "heroVariant": "centered",  // centered hero with NowPlaying below name
  "cardVariant": "grid"       // album-cover grid for projects
}
```

Ship these as fixed. Do not include the palette/font/density/hero/card
toggles in production.

---

## Design tokens

All defined in `portfolio/theme.jsx` and applied via CSS custom properties.
For the **Stage / light / editorial** chosen defaults the values are:

```
--accent: oklch(0.55 0.15 145)            (sage green)
--bg:     oklch(0.98 0.010 150)           (warm off-white)
--fg:     oklch(0.18 0.008 150)           (near-black)
--mute:   var(--fg)                       (overridden to match --fg; see theme.jsx note)
--surface:oklch(0.93 0.014 150)
--font-display: "Instrument Serif", serif
--font-body:    "Inter", sans-serif
--font-mono:    "Geist Mono", monospace
--section-pad: 48px
--gap: 14px
--maxw: 1240px
--radius: 14px
```

Other palettes (Vinyl / Synth / Cassette) are defined too — keep them in
`lib/theme.ts` even if not exposed, so they're available for future use.

### Type scale

- Hero name: `clamp(48px, 14vw, 176px)` — Instrument Serif 600, line-height 0.88, letter-spacing -0.04em
- Hero tag: `clamp(20px, 2.4vw, 32px)` italic
- Section title: `clamp(28px, 4vw, 52px)` Instrument Serif 600
- Section sub: 11px Geist Mono uppercase, letter-spacing 0.06em
- Body prose (Liner Notes / project writeups): `clamp(17px, 1.4vw, 20px)` Instrument Serif
- Body UI (cards, lists): 14–16px Inter
- Mono (timestamps, eyebrows, "Track 01", etc.): 11px Geist Mono uppercase

### Spacing

- Section padding: `var(--section-pad)` top + bottom = 48px at "dense"
- Inner gap: `var(--gap)` = 14px between siblings in lists/grids
- Page horizontal: `clamp(20px, 5vw, 56px)`
- Content max-width: 1240px

---

## Data shape changes

### `content/projects.ts` — extend the existing `Project` type

Add these fields (currently in `portfolio/data.jsx`):

```ts
export type Project = {
  slug: string;
  title: string;
  tech: string[];
  blurb: string;
  status: "shipped" | "in-progress" | "placeholder";
  cover?: string;
  links?: { live?: string; github?: string };

  // NEW:
  duration: string;        // mock track length, e.g. "4:12" — used in TopTracks + project page
  year: string;            // "2025"
  hue: number;             // 0–360, drives the album-cover gradient
  role: string;            // "Solo · design + build"
  plays: string;           // "1.2K" or "—"
  longform: string[];      // each entry = one paragraph in the project page body
};
```

Copy the full `PROJECTS` array from `portfolio/data.jsx` over. The
long-form copy in there is **draft text** — review and edit. Tone target
(from the existing `LinerNotes.tsx`): confident, dry, technical when it
matters, human everywhere else.

### `content/experience.ts` — add summary copy

```ts
export type Experience = {
  org: string;
  role: string;
  start: string;
  end: string | null;
  url?: string;
  note?: string;

  // NEW:
  summary?: string;        // paragraph shown under each timeline entry
};
```

Copy the `EXPERIENCE` array from `portfolio/data.jsx`. Summaries are
also drafts — review and edit.

---

## Component-by-component spec

### `Hero` (centered variant)

`components/sections/Hero.tsx`. Inside a centered flex column:

1. **Eyebrow** — pulsing accent dot + `SIDE A · TRACK 01` in Geist Mono uppercase
2. **Name** — `Mirav Vaitha` as a single line at hero size
3. **Tag** — italic Instrument Serif, max-width 640
4. **Credits** — Geist Mono uppercase, 12px, the existing "Engineering @ Trinity ..." line
5. **NowPlaying** widget — compact variant, centered below

CSS classes referenced: `.hero`, `.hero-centered`, `.hero-eyebrow`, `.hero-name`, `.hero-name-center`, `.hero-tag`, `.hero-credits`, `.hero-np-center`.

### `NowPlaying`

**Reuse the existing `components/ui/NowPlaying.tsx` `useEffect` that polls
`/api/now-playing` every 30s.** Replace only the markup with the prototype
layout. Match these classes (or port to Tailwind):

- `.np` (outer card with backdrop blur)
- `.np-art` — spinning vinyl placeholder (`@keyframes spin`, 14s). When `data.albumArtUrl` exists, replace the inner rings with `<Image>` of the album art instead.
- `.np-meta` — label + track + artist + progress bar + timestamps
- `.np-eq` — animated 4-bar equaliser absolutely positioned in the album art corner; only animate when `data.isPlaying`

Strip the prototype's queue rotation (`NOW_PLAYING_QUEUE` cycling) — the
real API drives state.

### `LinerNotes`

`components/sections/LinerNotes.tsx`. The existing component is already
correct in structure; just replace any grey/muted-foreground text colors
to match the prototype (high-contrast `--fg`, secondary text at 0.92
opacity) and ensure the three paragraphs render as Instrument Serif
display type, not the default sans body.

The photo at `public/mirav.jpg` works as-is. Keep `next/image` with `fill`.

### `Discography` — timeline version

This is the biggest change vs. the current `Discography.tsx`. The
prototype's version:

- **Vertical rail on the left** at 12px from the left edge, 2px wide, in `color-mix(in oklab, var(--fg) 14%, transparent)`
- **Rail fill** — a div inside the rail with `height: calc(var(--rail-progress, 0) * 100%)` driven by scroll position (compute on `scroll` event: `(viewportBottom - listTop) / (listHeight + viewportHeight/2)`)
- **Each entry** is a `<li class="disco-item">` with:
  - `.disco-marker` — accent dot (14px round) with a 4px bg ring around it. If `entry.end === "present"`, add `.disco-pulse` — an absolutely-positioned ring that grows + fades via `@keyframes disco-pulse` (2.2s)
  - `.disco-card` — content block. Track number in mono + "Currently playing" pill (only if present), then the role/org heading, then date range, then summary paragraph
- Role line is `{role} <span class="disco-at">@</span> <a class="disco-org-link">{org}</a>` — the `@` is dimmed, the org is the link

See `portfolio/styles.css` `.disco-timeline` block for full styles.

### `TopTracks` (grid variant)

`components/sections/TopTracks.tsx` + `components/ui/ProjectCard.tsx`.

- 1/2/3 col responsive grid (`.tracks-grid`)
- Each `ProjectCard` is an `<a href="/projects/{slug}">` (use `next/link`) — clicking goes to the detail page
- Card structure: square cover image with `--h` CSS variable driving a radial gradient; "01" track number in top-left; title overlay at bottom-left; status badge top-right ("IN PROGRESS" / "TBD"); hover-only `.cover-hover` with EQ bars + "▷ Preview" text
- Below the cover: title + duration on one line, blurb (2 lines max), tech stack as mono dots-separated

### `Follow`

`components/sections/Follow.tsx`. Existing structure is right; restyle to
match `.follow-list` — oversized Instrument Serif label, mono handle on
right, arrow icon that animates up-right on hover. Add the GitHub +
LinkedIn + Email entries (no X, no Spotify profile — the now-playing widget
covers that). Match the existing data in `content/follow.ts` or move it
inline.

### Project detail page

New route: `app/projects/[slug]/page.tsx`. Server component that:

1. Reads `projects` from `content/projects.ts`
2. `notFound()` if no match
3. Renders `<ProjectHero>`, `<ProjectBody>`, `<ProjectFooter>` (prev/next)

See `portfolio/project.jsx` for component structure and
`portfolio/styles.css` `.proj-*` for styling.

The screenshot section in the prototype shows colored placeholder tiles —
swap for real screenshots when they exist. Until then, keep the
placeholders (a working portfolio with "screenshots coming soon" beats
shipping with broken images).

---

## Chrome (page-level effects)

All client components.

### `BackgroundShader` — Paper Shaders Warp

```bash
npm install @paper-design/shaders-react
```

```tsx
// components/ui/BackgroundShader.tsx
"use client";
import { Warp } from "@paper-design/shaders-react";

export function BackgroundShader() {
  return (
    <>
      <div className="bg-shader" aria-hidden>
        <Warp
          style={{ width: "100%", height: "100%" }}
          proportion={0.45}
          softness={1}
          distortion={0.25}
          swirl={0.8}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={0}
          speed={1}
          colors={[
            "hsl(203, 100%, 62%)",
            "hsl(255, 100%, 72%)",
            "hsl(158, 99%, 59%)",
            "hsl(264, 100%, 61%)",
          ]}
        />
      </div>
      <div className="bg-shader-overlay" aria-hidden />
    </>
  );
}
```

Mount once in `app/layout.tsx` so it persists across route changes.

The `.bg-shader-overlay` tint is at 18% in light mode (35% in dark). Text
gets a light dark-glow `text-shadow` to lift off the colored background.
See `.bg-shader-overlay` + the text-shadow rules in `styles.css`.

### `CustomCursor`

Two fixed divs (`.cursor-dot` + `.cursor-ring`) following the mouse via
rAF. Ring gets `.active` over `a, button, [data-magnetic]`. Glow tinted
with `--accent`. Hidden on `pointer: coarse`.

Add `cursor: none !important` to all elements on fine-pointer devices.

### `TopScrubber`

Fixed top progress bar showing scroll position as a track-progress.
Clickable to seek. Already implemented in `portfolio/chrome.jsx`.

### `SideScrollbar`

Replaces the native scrollbar on the right edge. Thin track with an
accent thumb sized proportionally to viewport/document. Hide the native
scrollbar with `scrollbar-width: none` on html/body. On touch devices,
restore the native scrollbar.

### `Marquee`

Horizontally scrolling text band between hero and Liner Notes. Just a
flex row of duplicated items animated with `@keyframes marquee` over 40s.

### `ScrollReveals`

`IntersectionObserver` that adds `.in-view` to sections + their list
children on enter. CSS fades + translates them up. Respects
`prefers-reduced-motion`.

---

## Spotify wiring — the only "logic" change

The existing `/app/api/now-playing/route.ts` is correct. The prototype
ignores it (sandboxed origin can't reach `/api/...`).

In production:

1. Keep the existing `useEffect` poll in `NowPlaying.tsx` (30s interval).
2. Wire its `data` state to the prototype's markup. Map:
   - `data.albumArtUrl` → the `<Image>` inside `.np-art` (when present; otherwise show the spinning vinyl ring placeholder)
   - `data.track` → `.np-track`
   - `data.artist` → `.np-artist`
   - `data.album` → alt text on the album art
   - `data.songUrl` → wrap `.np-track` in an `<a>`
   - `data.isPlaying` → toggles between "Now playing" and "Last played" labels + controls whether the EQ bars animate
   - `data.progressMs / data.durationMs` → drives `.np-bar-fill` width and the `.np-times` left/right values
3. **Delete** the `NOW_PLAYING_QUEUE` array and the rotation simulation from the prototype's `NowPlaying` component when porting.

`.env.local` already has Spotify credentials (saw it in your repo). No
new env vars needed.

---

## Project page screenshots

The prototype shows two placeholder tiles per project. When real
screenshots exist, drop them into `public/projects/{slug}/` and update
`content/projects.ts`:

```ts
{
  ...
  screenshots: [
    { src: "/projects/claritycast/hero.png", caption: "Drafting view", wide: true },
    { src: "/projects/claritycast/output.png", caption: "Final output" },
  ],
}
```

Render with `next/image`. Lazy-load below the fold.

---

## Deployment

The existing `vite-app/package.json` script in the legacy folder runs
`gh-pages -d dist`. The current `package.json` (Next.js) doesn't have
that — deploy is presumably via Vercel or a different GH Pages workflow.
Confirm in `.github/workflows/` (if any) or your Vercel project.

---

## Things to verify after porting

- [ ] Tweaks panel is removed (don't ship the design-time tool)
- [ ] Now Playing uses the real API, not the queue simulator
- [ ] All `data-magnetic` attributes preserved on interactive elements (the custom cursor uses them)
- [ ] `cursor: none !important` applied on fine-pointer devices
- [ ] `prefers-reduced-motion` respected on scroll reveals, vinyl spin, marquee, cursor
- [ ] Project page screenshots: real images or "coming soon" placeholders, not broken `<img>` tags
- [ ] Mobile: hero name doesn't overflow on iPhone SE (≤380px), tap targets ≥44px, native scrollbar restored on touch
- [ ] Background shader runs only client-side (Next.js may complain about server-rendering WebGL — make sure `"use client"` is on `BackgroundShader` and any component that imports it)
- [ ] Light mode is the default (the existing `layout.tsx` has `className="... dark"` on `<html>` — remove the `dark` class)
- [ ] Font loading: add `Instrument Serif` and `Inter` to the existing local-font setup in `layout.tsx`, or switch to `next/font/google` for both
