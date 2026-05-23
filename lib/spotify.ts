const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const CURRENTLY_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

export type SpotifyTrack = {
  isPlaying: boolean;
  track: string;
  artist: string;
  album: string;
  albumArtUrl: string | null;
  songUrl: string | null;
  progressMs: number | null;
  durationMs: number | null;
  playedAt: string | null;
};

// In-memory access-token cache. Lives for the lifetime of a Vercel
// serverless container (so it survives warm starts and is recomputed on
// cold start). For local dev, persists across hot reloads of API routes.
let cachedAccessToken: { value: string; expiresAt: number } | null = null;

export async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  // Reuse cached token if it has at least 60s of life left.
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 60_000) {
    return cachedAccessToken.value;
  }

  const basic = btoa(`${clientId}:${clientSecret}`);
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };

  cachedAccessToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return data.access_token;
}

type SpotifyArtist = { name: string };
type SpotifyImage = { url: string; width: number; height: number };
type SpotifyAlbum = { name: string; images: SpotifyImage[] };
type SpotifyItem = {
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration_ms: number;
  external_urls: { spotify?: string };
};

function toTrack(item: SpotifyItem, opts: {
  isPlaying: boolean;
  progressMs: number | null;
  playedAt: string | null;
}): SpotifyTrack | null {
  if (!item?.name) return null;
  return {
    isPlaying: opts.isPlaying,
    track: item.name,
    artist: (item.artists ?? []).map((a) => a.name).filter(Boolean).join(", "),
    album: item.album?.name ?? "",
    albumArtUrl: item.album?.images?.[0]?.url ?? null,
    songUrl: item.external_urls?.spotify ?? null,
    progressMs: opts.progressMs,
    durationMs: item.duration_ms ?? 0,
    playedAt: opts.playedAt,
  };
}

// In-memory cache of the last successful response. Lets us keep returning
// real track data when Spotify briefly errors, rate-limits, or returns an
// unexpected shape. Persists for the lifetime of the serverless instance.
let lastKnown: SpotifyTrack | null = null;

export async function getNowPlaying(): Promise<SpotifyTrack | null> {
  const token = await getAccessToken();
  if (!token) return lastKnown;

  // 1. Try currently playing.
  try {
    const currentRes = await fetch(CURRENTLY_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    // 200 with body = something is loaded (playing or paused).
    // 204 = nothing playing, fall through to recently-played.
    if (currentRes.status === 200) {
      const data = (await currentRes.json()) as {
        is_playing: boolean;
        progress_ms: number;
        item: SpotifyItem | null;
      };
      if (data?.item) {
        const result = toTrack(data.item, {
          isPlaying: !!data.is_playing,
          progressMs: data.progress_ms ?? null,
          playedAt: null,
        });
        if (result) {
          lastKnown = result;
          return result;
        }
      }
    }
  } catch {
    // fall through to recently-played
  }

  // 2. Fall back to recently played.
  try {
    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (recentRes.ok) {
      const recentData = (await recentRes.json()) as {
        items: Array<{ track: SpotifyItem; played_at: string }>;
      };
      const recent = recentData.items?.[0];
      if (recent?.track) {
        const result = toTrack(recent.track, {
          isPlaying: false,
          progressMs: null,
          playedAt: recent.played_at ?? null,
        });
        if (result) {
          lastKnown = result;
          return result;
        }
      }
    }
  } catch {
    // fall through to cached
  }

  // 3. Both failed — serve the last successful response if we have one.
  return lastKnown;
}
