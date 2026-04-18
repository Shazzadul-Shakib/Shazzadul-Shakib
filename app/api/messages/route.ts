import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Message from '@/models/Message';

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const messages = await Message.find({})
      .sort({ isRead: 1, createdAt: -1 })
      .lean();
    return NextResponse.json({ messages }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 },
    );
  }
}
