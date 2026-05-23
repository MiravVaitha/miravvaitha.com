// Main app wiring + tweaks.

const { useEffect, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "stage",
  "dark": false,
  "fontPair": "editorial",
  "density": "dense",
  "metaphor": "medium",
  "heroVariant": "centered",
  "cardVariant": "grid"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Reflect theme to :root CSS vars whenever tweaks change.
  useEffect(() => { applyTheme(t); }, [t]);

  // Marquee items rotate based on metaphor strength
  const marqueeItems = useMemo(() => [
    "Now Playing · Mirav Vaitha",
    "Side A · Track 01",
    "Dublin, IE",
    "Currently shipping",
    "ClarityCast · Capventis · Trinity",
    "Available for freelance",
  ], []);

  // Current "track" for mini player
  const playerTrack = NOW_PLAYING_QUEUE[0];

  return (
    <React.Fragment>
      <BackgroundShader />
      <CustomCursor />
      <TopScrubber />
      <SideScrollbar />
      <ScrollReveals />

      <div className="shell">
        <Hero variant={t.heroVariant} />

        {t.metaphor !== "minimal" && (
          <Marquee items={marqueeItems} />
        )}

        <LinerNotes />
        <Discography />
        <TopTracks variant={t.cardVariant} />
        <Follow />
        <Footer />
      </div>

      {t.metaphor === "full" && <MiniPlayer track={{ ...playerTrack, hue: 40 }} />}

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakRadio
          label="Mode"
          value={t.dark ? "dark" : "light"}
          options={["dark", "light"]}
          onChange={(v) => setTweak("dark", v === "dark")}
        />
        <TweakSelect
          label="Palette"
          value={t.palette}
          options={[
            { value: "vinyl", label: "Vinyl · warm rust" },
            { value: "synth", label: "Synth · violet" },
            { value: "stage", label: "Stage · sage green" },
            { value: "cassette", label: "Cassette · coral" },
          ]}
          onChange={(v) => setTweak("palette", v)}
        />
        <TweakRadio
          label="Typeface"
          value={t.fontPair}
          options={[
            { value: "geist", label: "Geist" },
            { value: "editorial", label: "Editorial" },
          ]}
          onChange={(v) => setTweak("fontPair", v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={[
            { value: "spacious", label: "Spacious" },
            { value: "cozy", label: "Cozy" },
            { value: "dense", label: "Dense" },
          ]}
          onChange={(v) => setTweak("density", v)}
        />
        <TweakSelect
          label="Hero"
          value={t.heroVariant}
          options={[
            { value: "split", label: "Split · name left, player right" },
            { value: "centered", label: "Centered · spotlight" },
            { value: "stack", label: "Stack · player on top" },
          ]}
          onChange={(v) => setTweak("heroVariant", v)}
        />
        <TweakSelect
          label="Project cards"
          value={t.cardVariant}
          options={[
            { value: "grid", label: "Grid · album covers" },
            { value: "list", label: "List · tracklist" },
            { value: "mosaic", label: "Mosaic · editorial" },
          ]}
          onChange={(v) => setTweak("cardVariant", v)}
        />

        <TweakSection label="Music metaphor" />
        <TweakRadio
          label="Strength"
          value={t.metaphor}
          options={[
            { value: "minimal", label: "Light" },
            { value: "medium", label: "Med" },
            { value: "full", label: "Full" },
          ]}
          onChange={(v) => setTweak("metaphor", v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
