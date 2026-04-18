import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { blogSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

// GET /api/blogs/[id] - public (by slug or _id)
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;

    const blog = await Blog.findOne({
      $or: [{ slug: id }, { _id: id }],
      published: true,
    }).lean();

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// PUT /api/blogs/[id] - protected
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const parsed = blogSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const blog = await Blog.findByIdAndUpdate(id, parsed.data, { new: true });
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE /api/blogs/[id] - protected
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
