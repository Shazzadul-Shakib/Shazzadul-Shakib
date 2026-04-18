import BlogCard from "@/components/blog/BlogCard";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, tutorials, and notes from my development journey.",
};

interface BlogDoc {
  _id: string;
  title: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  slug: string;
  createdAt: string;
}

async function getBlogs(tag?: string): Promise<BlogDoc[]> {
  try {
    await connectDB();
    const query: Record<string, unknown> = { published: true };
    if (tag) query.tags = { $in: [tag] };

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .select("title slug excerpt tags coverImage createdAt")
      .lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch {
    return [];
  }
}

interface BlogListPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogListPage({ searchParams }: BlogListPageProps) {
  const { tag } = await searchParams;
  const blogs = await getBlogs(tag);

  return (
    <div className="min-h-screen py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimateOnScroll direction="up">
          <div className="text-center mb-16">
            <span className="font-mono text-accent-cyan text-sm tracking-widest uppercase mb-4 block">
              My Writings
            </span>
            <h1 className="text-4xl sm:text-5xl font-grotesk font-bold gradient-text mb-4">
              Blog
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Thoughts, tutorials, and notes from my development journey.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Tag filter */}
        {tag && (
          <div className="flex items-center gap-3 mb-10">
            <span className="text-text-muted text-sm">Filtered by:</span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent-violet/10 text-accent-violet border border-accent-violet/20">
              {tag}
            </span>
            <a
              href="/blog"
              className="text-text-muted text-xs hover:text-text-primary transition-colors"
            >
              Clear filter ✕
            </a>
          </div>
        )}

        {blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, i) => (
              <AnimateOnScroll key={blog._id} delay={i * 80} direction="up">
                <BlogCard blog={blog} />
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <AnimateOnScroll direction="up">
            <div className="text-center py-24">
              <div className="text-7xl mb-6">✍️</div>
              <h2 className="text-2xl font-grotesk font-bold text-text-primary mb-3">
                Blog coming soon!
              </h2>
              <p className="text-text-muted">
                Thoughts and tutorials will be published here soon. Stay tuned!
              </p>
            </div>
          </AnimateOnScroll>
        )}
      </div>
    </div>
  );
}
