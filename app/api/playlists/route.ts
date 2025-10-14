import { NextResponse } from 'next/server';
import { getAllPlaylists } from '@/lib/markdown-parser';

export async function GET() {
  try {
    const playlists = getAllPlaylists();
    return NextResponse.json(playlists);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch playlists' },
      { status: 500 },
    );
  }
}
