import { NextResponse } from 'next/server';
import { getAboutStats } from '@/lib/aboutStats';

export async function GET() {
  try {
    const stats = await getAboutStats();
    return NextResponse.json({ stats }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to load about stats';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
