import { NextResponse } from "next/server";

// One-off helper for generating a SPOTIFY_REFRESH_TOKEN locally.
// Visit /api/spotify/auth/login in dev to start the OAuth flow.
// Not used by /api/now-playing — safe to delete once you have your token.

const SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
];

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Disabled in production", { status: 404 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  if (!clientId) {
    return new NextResponse(
      "SPOTIFY_CLIENT_ID is not set in .env.local. Add it and restart the dev server.",
      { status: 400 },
    );
  }

  const url = new URL(req.url);
  let redirectUri = `${url.origin}/api/spotify/auth/callback`;
  // Force loopback IP in dev. Browsers often autocomplete 127.0.0.1 back
  // to "localhost" in the address bar, which would mismatch Spotify's
  // exact-string redirect URI check. The early NODE_ENV === "production"
  // return above means we're in dev here.
  if (url.hostname === "localhost") {
    redirectUri = redirectUri.replace("://localhost", "://127.0.0.1");
  }

  if (url.searchParams.get("debug") === "1") {
    return new NextResponse(
      [
        `req.url:       ${req.url}`,
        `computed origin: ${url.origin}`,
        `redirect_uri being sent to Spotify:`,
        `  ${redirectUri}`,
        ``,
        `This exact string must be in your Spotify app's Redirect URIs list.`,
      ].join("\n"),
      { headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  const authorizeUrl = new URL("https://accounts.spotify.com/authorize");
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("scope", SCOPES.join(" "));
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);

  return NextResponse.redirect(authorizeUrl.toString());
}
