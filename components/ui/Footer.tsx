export function Footer() {
  return (
    <footer className="border-t border-neutral-800 px-6 py-8 sm:px-12 lg:px-20">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center">
        <p>© 2026 Mirav Vaitha</p>
        <p>
          Made with{" "}
          <span className="text-spotify-green" aria-label="love">
            ♥
          </span>{" "}
          in Dublin
        </p>
      </div>
    </footer>
  );
}
