import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import {
  getPortfolioModel,
  isPortfolioType,
  validatePortfolioPayload,
} from '@/lib/portfolioRegistry';

type Params = { params: Promise<{ type: string; id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { type, id } = await params;
  if (!isPortfolioType(type)) {
    return NextResponse.json(
      { error: 'Invalid portfolio type' },
      { status: 400 },
    );
  }

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid item id' }, { status: 400 });
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
    const item = await Model.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ item }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update item';
    const status = /MONGODB_URI|ECONNREFUSED|ENOTFOUND|Mongo/i.test(message)
      ? 503
      : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { type, id } = await params;
  if (!isPortfolioType(type)) {
    return NextResponse.json(
      { error: 'Invalid portfolio type' },
      { status: 400 },
    );
  }

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid item id' }, { status: 400 });
  }

  try {
    await connectDB();
    const Model = getPortfolioModel(type);
    const item = await Model.findByIdAndDelete(id);

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item deleted' }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to delete item';
    const status = /MONGODB_URI|ECONNREFUSED|ENOTFOUND|Mongo/i.test(message)
      ? 503
      : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
