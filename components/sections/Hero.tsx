import { NowPlaying } from "@/components/ui/NowPlaying";

export function Hero() {
  return (
    <section className="relative min-h-screen px-6 py-16 sm:px-12 sm:py-24 lg:px-20">
      <div className="mb-12 sm:mb-0 sm:absolute sm:right-6 sm:top-6 lg:right-20 lg:top-12">
        <NowPlaying />
      </div>

      <div className="max-w-4xl space-y-8 sm:pr-80">
        <h1 className="text-6xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl xl:text-9xl">
          Mirav Vaitha
        </h1>
        <p className="text-xl italic text-muted-foreground">
          TBD &mdash; hero copy
        </p>
        <p className="font-mono text-sm text-muted-foreground">
          Engineering @ Trinity College Dublin · SWE Intern @ Capventis · Based
          in Dublin
        </p>
      </div>
    </section>
  );
}
