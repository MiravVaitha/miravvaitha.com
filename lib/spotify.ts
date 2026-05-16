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

export async function getAccessToken(): Promise<string> {
  // TODO(session 2): exchange SPOTIFY_REFRESH_TOKEN for a fresh access
  // token. Reads from process.env: SPOTIFY_CLIENT_ID,
  // SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN.
  return "mock-access-token";
}

export async function getNowPlaying(): Promise<SpotifyTrack | null> {
  // TODO(session 2): hit /me/player/currently-playing; on empty, fall
  // back to /me/player/recently-played?limit=1 with isPlaying=false.
  // Return null on auth failure so the API route can pass that through
  // and the component can render its empty state.
  return {
    isPlaying: false,
    track: "Track Name",
    artist: "Artist Name",
    album: "Album Name",
    albumArtUrl: null,
    songUrl: null,
    progressMs: null,
    durationMs: null,
    playedAt: new Date().toISOString(),
  };
}
