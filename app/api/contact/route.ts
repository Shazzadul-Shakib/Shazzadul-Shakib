import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';
import { contactSchema } from '@/lib/validations';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'shakib1186@gmail.com',
    pass: process.env.PASS,
  },
});

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

    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'shakib1186@gmail.com',
      to: 'shakib1186@gmail.com',
      subject: `Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #8D4A8A;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #F0D299; color: #3A0353; padding: 16px; border-radius: 8px;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Message sent successfully!' },
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
