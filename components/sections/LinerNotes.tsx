import Image from "next/image";

// DRAFT — paragraphs below were drafted by Claude from the v1 site + MRD
// hints. Revise to taste. Tone target per MRD: "confident but not slick,
// witty without trying too hard, technical when it matters and human
// everywhere else."

export function LinerNotes() {
  return (
    <section className="px-6 py-16 sm:px-12 sm:py-24 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Liner Notes
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-[200px_1fr] sm:gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
            <Image
              src="/mirav.jpg"
              alt="Mirav Vaitha"
              fill
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 200px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-5 text-base leading-relaxed text-neutral-300">
            <p>
              I&rsquo;m an engineering student at Trinity College Dublin,
              and a software-engineering intern at Capventis (returning
              this summer for round two). Grew up in Dublin. Build things
              in Dublin. Plan to keep building things in Dublin.
            </p>
            <p>
              Lately that&rsquo;s meant ClarityCast &mdash; an AI tool
              that turns scrambled thoughts into something coherent enough
              to send &mdash; alongside a string of freelance websites for
              small businesses around the city. Before that: a
              remote-controlled vehicle, a line-following autonomous one,
              a Shopify-based clothing brand (Kroccustoms) I co-founded.
              The connecting thread is that I like starting from a blank
              file (or a bare circuit board), getting something working,
              and shipping it.
            </p>
            <p>
              Off the keyboard: three languages on rotation (English,
              Irish, Gujarati), a Spotify habit visible at the top of
              this page, and a working theory that &ldquo;shipped&rdquo;
              beats &ldquo;perfect&rdquo; almost every time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
