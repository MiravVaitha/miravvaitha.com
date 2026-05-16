import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

// Always hit Spotify fresh — no Next.js route caching.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getNowPlaying();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null);
  }
}
