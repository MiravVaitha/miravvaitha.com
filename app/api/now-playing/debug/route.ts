import { NextResponse } from "next/server";

// TEMPORARY DIAGNOSTIC — delete after Spotify integration is verified on Vercel.
// Reports which step of the Spotify auth/data flow is failing, without leaking
// secret values. Safe to hit publicly: only reports lengths, statuses, and
// truncated error text.

export const dynamic = "force-dynamic";

type Report = {
  env: {
    clientIdPresent: boolean;
    clientIdLen: number;
    clientIdTrimmedMatches: boolean;
    clientSecretPresent: boolean;
    clientSecretLen: number;
    clientSecretTrimmedMatches: boolean;
    refreshTokenPresent: boolean;
    refreshTokenLen: number;
    refreshTokenTrimmedMatches: boolean;
  };
  tokenRequest?: {
    status: number;
    ok: boolean;
    bodySnippet: string;
  };
  currentlyPlaying?: {
    status: number;
    ok: boolean;
    bodySnippet: string;
  };
  recentlyPlayed?: {
    status: number;
    ok: boolean;
    bodySnippet: string;
  };
  error?: string;
};

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID ?? "";
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN ?? "";

  const report: Report = {
    env: {
      clientIdPresent: !!clientId,
      clientIdLen: clientId.length,
      clientIdTrimmedMatches: clientId === clientId.trim(),
      clientSecretPresent: !!clientSecret,
      clientSecretLen: clientSecret.length,
      clientSecretTrimmedMatches: clientSecret === clientSecret.trim(),
      refreshTokenPresent: !!refreshToken,
      refreshTokenLen: refreshToken.length,
      refreshTokenTrimmedMatches: refreshToken === refreshToken.trim(),
    },
  };

  if (!clientId || !clientSecret || !refreshToken) {
    report.error = "missing one or more env vars";
    return NextResponse.json(report);
  }

  try {
    const basic = btoa(`${clientId.trim()}:${clientSecret.trim()}`);
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken.trim(),
      }),
      cache: "no-store",
    });
    const tokenBody = await tokenRes.text();
    report.tokenRequest = {
      status: tokenRes.status,
      ok: tokenRes.ok,
      // Only show body on failure — success body contains the access_token.
      bodySnippet: tokenRes.ok ? "[redacted: token]" : tokenBody.slice(0, 200),
    };

    if (!tokenRes.ok) {
      return NextResponse.json(report);
    }

    const tokenJson = JSON.parse(tokenBody) as { access_token?: string };
    const accessToken = tokenJson.access_token;
    if (!accessToken) {
      report.error = "token response missing access_token";
      return NextResponse.json(report);
    }

    const currentRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      },
    );
    const currentBody = await currentRes.text();
    report.currentlyPlaying = {
      status: currentRes.status,
      ok: currentRes.ok,
      // Track name + artist could leak; only show error bodies and length on success.
      bodySnippet: currentRes.ok
        ? `[ok: ${currentBody.length} bytes]`
        : currentBody.slice(0, 200),
    };

    const recentRes = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      },
    );
    const recentBody = await recentRes.text();
    report.recentlyPlayed = {
      status: recentRes.status,
      ok: recentRes.ok,
      bodySnippet: recentRes.ok
        ? `[ok: ${recentBody.length} bytes]`
        : recentBody.slice(0, 200),
    };

    return NextResponse.json(report);
  } catch (e) {
    report.error = e instanceof Error ? e.message : String(e);
    return NextResponse.json(report);
  }
}
