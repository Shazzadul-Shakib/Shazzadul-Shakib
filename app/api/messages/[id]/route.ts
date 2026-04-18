import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Message from '@/models/Message';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid message id' }, { status: 400 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const isRead = Boolean(body?.isRead);

    const message = await Message.findByIdAndUpdate(
      id,
      { isRead },
      { new: true },
    );
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/messages');
    return NextResponse.json({ message }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update message status' },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid message id' }, { status: 400 });
  }

  try {
    await connectDB();
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/messages');
    return NextResponse.json({ message: 'Message deleted' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 },
    );
  }
}
