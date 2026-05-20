import { NowPlaying } from "@/components/ui/NowPlaying";

export function Hero() {
  return (
    <section className="hero hero-centered" data-screen-label="01 Hero">
      <div className="hero-eyebrow">
        <span className="dot" /> <span>SIDE A · TRACK 01</span>
      </div>
      <h1 className="hero-name hero-name-center">Mirav Vaitha</h1>
      <p className="hero-tag">
        <em>Engineer, builder, occasional shipper of small things.</em>
      </p>
      <p className="hero-credits">
        Engineering @ Trinity College Dublin &nbsp;·&nbsp; SWE Intern @
        Capventis &nbsp;·&nbsp; Based in Dublin
      </p>
      <div className="hero-np-center">
        <NowPlaying compact />
      </div>
    </section>
  );
}
