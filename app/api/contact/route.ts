import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { rateLimit } from '@/lib/rateLimit';
import { connectDB } from '@/lib/db';
import { contactSchema } from '@/lib/validations';
import Message from '@/models/Message';

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (!rateLimit(ip, 5, 60_000)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a minute.' },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { name, email, message } = parsed.data;

    await connectDB();
    await Message.create({
      name,
      email,
      message,
      isRead: false,
    });

    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/messages');

    return NextResponse.json(
      { message: 'Message received successfully!' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Try again later.' },
      { status: 500 },
    );
  }
}
