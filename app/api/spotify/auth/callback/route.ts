// One-off helper for generating a SPOTIFY_REFRESH_TOKEN locally.
// Receives the OAuth code from Spotify, exchanges it for tokens, and
// displays the refresh token for you to paste into .env.local.
// Not used by /api/now-playing — safe to delete once you have your token.

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Disabled in production", { status: 404 });
  }

  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return htmlResponse(
      `<h1>Spotify rejected the request</h1><pre>${escapeHtml(error)}</pre>`,
    );
  }
  if (!code) {
    return htmlResponse("<h1>No <code>code</code> parameter received.</h1>");
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return htmlResponse(
      "<h1>Missing CLIENT_ID or CLIENT_SECRET in .env.local.</h1>",
    );
  }

  // Must match exactly what the login route sent to /authorize. The
  // early NODE_ENV === "production" return above means we're in dev here.
  let redirectUri = `${url.origin}/api/spotify/auth/callback`;
  if (url.hostname === "localhost") {
    redirectUri = redirectUri.replace("://localhost", "://127.0.0.1");
  }
  const basic = btoa(`${clientId}:${clientSecret}`);

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    return htmlResponse(
      `<h1>Token exchange failed</h1><pre>${escapeHtml(text)}</pre>`,
    );
  }

  const data = (await tokenRes.json()) as { refresh_token: string };

  return htmlResponse(`
    <html>
      <head>
        <title>Spotify refresh token</title>
        <style>
          :root { color-scheme: dark; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            background: #0a0a0a; color: #fafafa;
            padding: 3rem 1.5rem; max-width: 640px; margin: 0 auto;
            line-height: 1.5;
          }
          h1 { font-size: 1.5rem; margin: 0 0 1rem; }
          .token {
            background: #171717; color: #fafafa;
            padding: 1rem; border-radius: 8px; word-break: break-all;
            font-family: ui-monospace, monospace; font-size: 0.85rem;
            user-select: all; border: 1px solid #1ED760; margin: 1rem 0;
          }
          p, ol { color: #a3a3a3; }
          code { background: #171717; padding: 0.1rem 0.35rem; border-radius: 4px; color: #fafafa; }
          ol { padding-left: 1.25rem; }
          li { margin-bottom: 0.5rem; }
        </style>
      </head>
      <body>
        <h1>Refresh token generated</h1>
        <p>Add this line to your <code>.env.local</code>:</p>
        <div class="token">SPOTIFY_REFRESH_TOKEN=${escapeHtml(data.refresh_token)}</div>
        <ol>
          <li>Copy the line above into <code>.env.local</code> (alongside the existing CLIENT_ID and CLIENT_SECRET).</li>
          <li>Stop the dev server (Ctrl+C) and run <code>npm run dev</code> again — env vars are only read at startup.</li>
          <li>Open <code>/</code> — NowPlaying should now show real data.</li>
        </ol>
      </body>
    </html>
  `);
}

function htmlResponse(html: string) {
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}
