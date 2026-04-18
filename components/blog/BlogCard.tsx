import Link from "next/link";
import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { HiClock, HiArrowLongRight } from "react-icons/hi2";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  slug: string;
  createdAt: string;
}

const tagColors = ["violet", "cyan", "green", "orange"] as const;

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <GlassCard hover className="overflow-hidden flex flex-col">
      {blog.coverImage ? (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={blog.coverImage}
            fill
            alt={blog.title}
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        </div>
      ) : (
        <div className="h-44 bg-gradient-to-br from-accent-violet/20 to-accent-cyan/20 flex items-center justify-center">
          <span className="text-5xl">✍️</span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex flex-wrap gap-1.5">
          {blog.tags.slice(0, 3).map((tag, i) => (
            <Badge key={tag} color={tagColors[i % tagColors.length]}>
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="text-text-primary font-grotesk font-semibold text-lg leading-snug line-clamp-2 hover:text-accent-violet transition-colors">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h3>

        <p className="text-text-muted text-sm leading-relaxed line-clamp-3 flex-1">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-border-glass mt-auto">
          <span className="flex items-center gap-1.5 text-text-muted text-xs">
            <HiClock size={12} />
            {formatDate(blog.createdAt)}
          </span>
          <Link
            href={`/blog/${blog.slug}`}
            className="flex items-center gap-1.5 text-accent-violet text-xs font-medium hover:text-accent-cyan transition-colors"
          >
            Read more <HiArrowLongRight />
          </Link>
        </div>
      </div>
    </GlassCard>
  );
}
