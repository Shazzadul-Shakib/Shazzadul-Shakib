import BlogForm from "@/components/admin/BlogForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Blog Post" };

export default function NewBlogPage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-grotesk font-bold text-text-primary">
          Create New Post
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Write and publish a new blog post
        </p>
      </div>
      <BlogForm mode="create" />
    </div>
  );
}
