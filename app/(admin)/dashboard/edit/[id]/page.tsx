import { notFound } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Blog Post" };

async function getBlog(id: string) {
  try {
    await connectDB();
    const blog = await Blog.findById(id).lean();
    return blog ? JSON.parse(JSON.stringify(blog)) : null;
  } catch {
    return null;
  }
}

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) notFound();

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-grotesk font-bold text-text-primary">
          Edit Post
        </h1>
        <p className="text-text-muted text-sm mt-1 font-mono">/{blog.slug}</p>
      </div>
      <BlogForm mode="edit" initialData={blog} />
    </div>
  );
}
