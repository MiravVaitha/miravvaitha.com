import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";

// DRAFT — paragraphs from the prototype; revise to taste.
export function LinerNotes() {
  return (
    <section className="section liner" data-screen-label="02 Liner Notes">
      <SectionHeader
        number="02"
        title="Liner Notes"
        sub="A few words from the artist"
      />
      <div className="liner-grid">
        <div className="liner-photo">
          <div className="liner-photo-frame">
            <Image
              src="/mirav.jpg"
              alt="Mirav Vaitha"
              fill
              sizes="(min-width: 820px) 320px, 100vw"
              className="liner-photo-img"
            />
          </div>
          <div className="liner-photo-caption">
            <span className="mono">Side A · Photo · 2025</span>
          </div>
        </div>
        <div className="liner-copy">
          <p>
            I&apos;m an engineering student at{" "}
            <a
              href="https://www.tcd.ie/engineering/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Trinity College Dublin
            </a>
            , and a software-engineering intern at{" "}
            <a
              href="https://www.capventis.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Capventis
            </a>{" "}
            — returning this summer for round two. Grew up in Dublin. Build
            things in Dublin. Plan to keep building things in Dublin.
          </p>
          <p>
            Lately that&apos;s meant <strong>ClarityCast</strong> — an AI tool
            that turns scrambled thoughts into something coherent enough to
            send — alongside a string of freelance websites for small
            businesses around the city. Before that: a remote-controlled
            vehicle, a line-following autonomous one, a Shopify-based clothing
            brand (<strong>Kroccustoms</strong>) I co-founded. The connecting
            thread is that I like starting from a blank file (or a bare
            circuit board), getting something working, and shipping it.
          </p>
          <p>
            Off the keyboard: three languages on rotation (English, Irish,
            Gujarati), a music habit visible at the top of this page, and a
            working theory that <em>shipped</em> beats <em>perfect</em> almost
            every time.
          </p>
        </div>
      </div>
    </section>
  );
}
