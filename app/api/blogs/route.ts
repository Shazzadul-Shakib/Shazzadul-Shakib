import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import { blogSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

// GET /api/blogs - public
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get('tag');
    const limit = parseInt(searchParams.get('limit') || '20');

    const query = tag ? { published: true, tags: tag } : { published: true };

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-content')
      .lean();

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 },
    );
  }
}

// POST /api/blogs - protected
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const parsed = blogSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const blog = await Blog.create(parsed.data);
    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/admin/dashboard/blogs');
    return NextResponse.json({ blog }, { status: 201 });
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : 'Failed to create blog';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
