// Theme system for the portfolio prototype.
// All palettes are oklch-defined so the chroma/lightness stays harmonious
// when we swap hues. Dark variant is the default; light variant is generated.

// Each palette: [accent, bg, fg, mute, surface]
// Stored as the "value" of the color tweak so it can be persisted as JSON.
const PALETTES = {
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

const FONT_PAIRS = {
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

const DENSITY = {
  spacious: { section: 128, gap: 28, label: "Spacious" },
  cozy:     { section: 80,  gap: 20, label: "Cozy" },
  dense:    { section: 48,  gap: 14, label: "Dense" },
};

// Apply theme to :root CSS variables. Called whenever tweaks change.
function applyTheme(t) {
  const palette = PALETTES[t.palette] || PALETTES.vinyl;
  const colors = t.dark ? palette.dark : palette.light;
  const [accent, bg, fg, mute, surface] = colors;
  const fonts = FONT_PAIRS[t.fontPair] || FONT_PAIRS.geist;
  const dens = DENSITY[t.density] || DENSITY.cozy;

  const r = document.documentElement.style;
  r.setProperty("--accent", accent);
  r.setProperty("--bg", bg);
  r.setProperty("--fg", fg);
  // Force "muted" to be the same as foreground so secondary text is also
  // bright/readable against the colorful shader background. Visual
  // hierarchy is preserved via opacity in styles.css.
  r.setProperty("--mute", fg);
  r.setProperty("--surface", surface);
  r.setProperty("--font-display", fonts.display);
  r.setProperty("--font-body", fonts.body);
  r.setProperty("--font-mono", fonts.mono);
  r.setProperty("--section-pad", dens.section + "px");
  r.setProperty("--gap", dens.gap + "px");
  document.documentElement.dataset.mode = t.dark ? "dark" : "light";
  document.documentElement.dataset.metaphor = t.metaphor;
}

Object.assign(window, { PALETTES, FONT_PAIRS, DENSITY, applyTheme });
