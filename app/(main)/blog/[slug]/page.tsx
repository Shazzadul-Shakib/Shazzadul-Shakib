import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Badge from "@/components/ui/Badge";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { formatDate, readingTime } from "@/lib/utils";
import { HiArrowLeft, HiClock, HiCalendar } from "react-icons/hi2";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

async function getBlog(slug: string) {
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug, published: true }).lean();
    return blog ? JSON.parse(JSON.stringify(blog)) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Post Not Found" };

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      ...(blog.coverImage && {
        images: [{ url: blog.coverImage, width: 1200, height: 630, alt: blog.title }],
      }),
    },
    twitter: {
      card: blog.coverImage ? "summary_large_image" : "summary",
      title: blog.title,
      description: blog.excerpt,
      ...(blog.coverImage && { images: [blog.coverImage] }),
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const mins = readingTime(blog.content);

  return (
    <article className="min-h-screen py-32 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent-violet transition-colors text-sm mb-10"
        >
          <HiArrowLeft /> Back to Blog
        </Link>

        <AnimateOnScroll direction="up">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag: string, i: number) => {
              const colors = ["violet", "cyan", "green", "orange"] as const;
              return (
                <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                  <Badge color={colors[i % colors.length]}>{tag}</Badge>
                </Link>
              );
            })}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-grotesk font-bold text-text-primary leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-5 text-text-muted text-sm mb-10 pb-10 border-b border-border-glass">
            <span className="flex items-center gap-2">
              <HiCalendar /> {formatDate(blog.createdAt)}
            </span>
            <span className="flex items-center gap-2">
              <HiClock /> {mins} min read
            </span>
          </div>
        </AnimateOnScroll>

        {/* Cover image */}
        {blog.coverImage && (
          <AnimateOnScroll direction="up" delay={100}>
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-12 border border-border-glass">
              <Image
                src={blog.coverImage}
                fill
                alt={blog.title}
                className="object-cover"
                priority
              />
            </div>
          </AnimateOnScroll>
        )}

        {/* Content */}
        <AnimateOnScroll direction="up" delay={200}>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </AnimateOnScroll>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-border-glass">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent-violet hover:text-accent-cyan transition-colors font-medium"
          >
            <HiArrowLeft /> Read more posts
          </Link>
        </div>
      </div>
    </article>
  );
}
