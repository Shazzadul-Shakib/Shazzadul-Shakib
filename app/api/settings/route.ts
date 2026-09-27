import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import SiteSettings from '@/models/SiteSettings';
import { siteSettingsSchema } from '@/lib/validations';

// GET /api/settings - public
export async function GET() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({}).lean();
    return NextResponse.json({ settings: settings || null }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch settings';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT /api/settings - protected
export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const parsed = siteSettingsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { $set: parsed.data },
      { new: true, upsert: true },
    );

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update settings';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
