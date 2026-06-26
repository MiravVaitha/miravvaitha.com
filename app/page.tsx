import { Hero } from "@/components/sections/Hero";
import { LinerNotes } from "@/components/sections/LinerNotes";
import { Discography } from "@/components/sections/Discography";
import { TopTracks } from "@/components/sections/TopTracks";
import { Follow } from "@/components/sections/Follow";
import { Footer } from "@/components/ui/Footer";
import { Marquee } from "@/components/ui/Marquee";

const MARQUEE_ITEMS = [
  "Now Playing · Mirav Vaitha",
  "Side A · Track 01",
  "Dublin, IE",
  "Currently building",
  "Design · Hardware · Software & AI",
];

export default function Home() {
  return (
    <div className="shell">
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <LinerNotes />
      <Discography />
      <TopTracks />
      <Follow />
      <Footer />
    </div>
  );
}
