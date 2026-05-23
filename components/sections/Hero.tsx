import { NowPlaying } from "@/components/ui/NowPlaying";
import { HeroContacts } from "@/components/ui/HeroContacts";

export function Hero() {
  return (
    <section className="hero hero-centered" data-screen-label="01 Hero">
      <div className="hero-eyebrow">
        <span className="dot" /> <span>SIDE A · TRACK 01</span>
      </div>
      <h1 className="hero-name hero-name-center">Mirav Vaitha</h1>
      <p className="hero-tag">
        <em>19 Y/O Engineer and Builder from Ireland.</em>
      </p>
      <HeroContacts />
      <div className="hero-np-center">
        <NowPlaying compact />
      </div>
    </section>
  );
}
