import { experience, type Experience } from "@/content/experience";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(date: string | null): string {
  if (date === null) return "—";
  if (date === "present" || date === "TBD") return date;
  // YYYY-MM -> "Mon YYYY"
  const match = date.match(/^(\d{4})-(\d{2})$/);
  if (match) {
    const [, year, month] = match;
    return `${MONTHS[parseInt(month, 10) - 1]} ${year}`;
  }
  // YYYY or other passes through
  return date;
}

function formatRange(item: Experience): string {
  if (item.start === "TBD" && item.end === null) return "TBD";
  return `${formatDate(item.start)} — ${formatDate(item.end)}`;
}

export function Discography() {
  return (
    <section className="px-6 py-16 sm:px-12 sm:py-24 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Discography
        </h2>
        <div className="mt-10 divide-y divide-neutral-800 border-y border-neutral-800">
          {experience.map((item, i) => (
            <div
              key={`${item.org}-${item.start}-${i}`}
              className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-4 py-4 transition-colors hover:bg-neutral-900/40 sm:gap-8"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <div className="truncate text-base font-medium text-foreground sm:text-lg">
                  {item.role}
                </div>
                <div className="truncate text-sm text-muted-foreground">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground hover:underline hover:decoration-spotify-green hover:underline-offset-2"
                    >
                      {item.org}
                    </a>
                  ) : (
                    item.org
                  )}
                  {item.note && (
                    <span className="ml-2 italic text-neutral-500">
                      · {item.note}
                    </span>
                  )}
                </div>
              </div>
              <span className="whitespace-nowrap font-mono text-xs text-muted-foreground">
                {formatRange(item)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
