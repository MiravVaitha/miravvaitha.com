// Theme system ported from design-spec/portfolio/theme.jsx. In production
// we ship Stage / light / editorial / dense / medium (see HANDOFF.md). The
// other palettes are kept here typed-but-unused so future variants can be
// flipped on without rewriting the type surface.

export type PaletteName = "vinyl" | "synth" | "stage" | "cassette";

export type PaletteValues = {
  label: string;
  /** [accent, bg, fg, mute, surface] */
  dark: [string, string, string, string, string];
  /** [accent, bg, fg, mute, surface] */
  light: [string, string, string, string, string];
};

export const PALETTES: Record<PaletteName, PaletteValues> = {
  vinyl: {
    label: "Vinyl",
    dark:  ["oklch(0.74 0.14 48)",  "oklch(0.14 0.006 60)",  "oklch(0.97 0.006 60)",  "oklch(0.55 0.012 60)",  "oklch(0.20 0.008 60)"],
    light: ["oklch(0.58 0.16 48)",  "oklch(0.98 0.008 70)",  "oklch(0.18 0.006 60)",  "oklch(0.46 0.012 60)",  "oklch(0.94 0.010 70)"],
  },
  synth: {
    label: "Synth",
    dark:  ["oklch(0.74 0.16 290)", "oklch(0.13 0.020 280)", "oklch(0.97 0.010 280)", "oklch(0.56 0.020 280)", "oklch(0.20 0.025 280)"],
    light: ["oklch(0.52 0.20 290)", "oklch(0.98 0.010 280)", "oklch(0.18 0.010 280)", "oklch(0.48 0.020 280)", "oklch(0.94 0.015 280)"],
  },
  stage: {
    label: "Stage",
    dark:  ["oklch(0.78 0.14 145)", "oklch(0.14 0.008 150)", "oklch(0.97 0.008 150)", "oklch(0.56 0.014 150)", "oklch(0.20 0.012 150)"],
    light: ["oklch(0.55 0.15 145)", "oklch(0.98 0.010 150)", "oklch(0.18 0.008 150)", "oklch(0.46 0.014 150)", "oklch(0.93 0.014 150)"],
  },
  cassette: {
    label: "Cassette",
    dark:  ["oklch(0.76 0.16 32)",  "oklch(0.15 0.012 40)",  "oklch(0.97 0.010 40)",  "oklch(0.56 0.014 40)",  "oklch(0.21 0.014 40)"],
    light: ["oklch(0.62 0.18 32)",  "oklch(0.97 0.018 70)",  "oklch(0.20 0.012 40)",  "oklch(0.48 0.014 40)",  "oklch(0.93 0.020 70)"],
  },
};

export type FontPairName = "geist" | "editorial";

export const FONT_PAIRS: Record<FontPairName, { label: string; display: string; body: string; mono: string }> = {
  geist: {
    label: "Geist",
    display: '"Geist", ui-sans-serif, system-ui, -apple-system, sans-serif',
    body:    '"Geist", ui-sans-serif, system-ui, -apple-system, sans-serif',
    mono:    '"Geist Mono", ui-monospace, "SF Mono", Menlo, monospace',
  },
  editorial: {
    label: "Editorial",
    display: '"Instrument Serif", "Times New Roman", Georgia, serif',
    body:    '"Inter", ui-sans-serif, system-ui, sans-serif',
    mono:    '"Geist Mono", ui-monospace, "SF Mono", Menlo, monospace',
  },
};

export type DensityName = "spacious" | "cozy" | "dense";

export const DENSITY: Record<DensityName, { section: number; gap: number; label: string }> = {
  spacious: { section: 128, gap: 28, label: "Spacious" },
  cozy:     { section: 80,  gap: 20, label: "Cozy" },
  dense:    { section: 48,  gap: 14, label: "Dense" },
};

export type MetaphorName = "minimal" | "medium" | "full";

// Chosen defaults (from app.jsx EDITMODE-BEGIN block).
export const THEME_DEFAULTS = {
  palette: "stage" as PaletteName,
  dark: false,
  fontPair: "editorial" as FontPairName,
  density: "dense" as DensityName,
  metaphor: "medium" as MetaphorName,
  heroVariant: "centered" as const,
  cardVariant: "grid" as const,
};
