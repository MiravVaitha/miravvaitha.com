type Props = {
  number: string;
  title: string;
  sub: string;
};

export function SectionHeader({ number, title, sub }: Props) {
  return (
    <div className="section-header">
      <div className="sh-left">
        <span className="sh-num mono">{number}</span>
        <h2 className="sh-title">{title}</h2>
      </div>
      <span className="sh-sub mono">{sub}</span>
    </div>
  );
}
