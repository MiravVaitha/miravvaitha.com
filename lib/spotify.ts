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

export async function getNowPlaying(): Promise<SpotifyTrack | null> {
  const token = await getAccessToken();
  if (!token) return null;

  // First: try currently playing.
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
    if (data.item) {
      return {
        isPlaying: data.is_playing,
        track: data.item.name,
        artist: data.item.artists.map((a) => a.name).join(", "),
        album: data.item.album.name,
        albumArtUrl: data.item.album.images[0]?.url ?? null,
        songUrl: data.item.external_urls.spotify ?? null,
        progressMs: data.progress_ms,
        durationMs: data.item.duration_ms,
        playedAt: null,
      };
    }
  }

  // Fall back to recently played.
  const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!recentRes.ok) return null;

  const recentData = (await recentRes.json()) as {
    items: Array<{ track: SpotifyItem; played_at: string }>;
  };
  const recent = recentData.items?.[0];
  if (!recent) return null;

  return {
    isPlaying: false,
    track: recent.track.name,
    artist: recent.track.artists.map((a) => a.name).join(", "),
    album: recent.track.album.name,
    albumArtUrl: recent.track.album.images[0]?.url ?? null,
    songUrl: recent.track.external_urls.spotify ?? null,
    progressMs: null,
    durationMs: recent.track.duration_ms,
    playedAt: recent.played_at,
  };
}
