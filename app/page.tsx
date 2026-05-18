import { Hero } from "@/components/sections/Hero";
import { LinerNotes } from "@/components/sections/LinerNotes";
import { Discography } from "@/components/sections/Discography";
import { TopTracks } from "@/components/sections/TopTracks";
import { Follow } from "@/components/sections/Follow";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <LinerNotes />
      <Discography />
      <TopTracks />
      <Follow />
      <Footer />
    </main>
  );
}
