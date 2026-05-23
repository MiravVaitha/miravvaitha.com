// Horizontally scrolling text band. Pure CSS animation; safe as a server
// component. Items are duplicated 4x so the loop is seamless.

type Props = {
  items: string[];
  sep?: string;
};

export function Marquee({ items, sep = "✦" }: Props) {
  const stream = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {stream.map((s, i) => (
          <span key={i} className="marquee-item">
            <span>{s}</span>
            <span className="marquee-sep">{sep}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
