import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import {
  getPortfolioModel,
  isPortfolioType,
  validatePortfolioPayload,
} from '@/lib/portfolioRegistry';

type Params = { params: Promise<{ type: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { type } = await params;
  if (!isPortfolioType(type)) {
    return NextResponse.json(
      { error: 'Invalid portfolio type' },
      { status: 400 },
    );
  }

  try {
    await connectDB();
    const Model = getPortfolioModel(type);
    const items = await Model.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch items';
    const status = /MONGODB_URI|ECONNREFUSED|ENOTFOUND|Mongo/i.test(message)
      ? 503
      : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { type } = await params;
  if (!isPortfolioType(type)) {
    return NextResponse.json(
      { error: 'Invalid portfolio type' },
      { status: 400 },
    );
  }

  try {
    await connectDB();
    const body = await req.json();
    const parsed = validatePortfolioPayload(type, body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const Model = getPortfolioModel(type);
    const item = await Model.create(parsed.data);
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to create item';
    const status = /MONGODB_URI|ECONNREFUSED|ENOTFOUND|Mongo/i.test(message)
      ? 503
      : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
