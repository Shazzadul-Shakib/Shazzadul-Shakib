import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import BlogCard from '@/components/blog/BlogCard';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { HiArrowLongRight } from 'react-icons/hi2';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

interface BlogDoc {
  _id: string;
  title: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  slug: string;
  createdAt: string;
}

async function getLatestBlogs(): Promise<BlogDoc[]> {
  try {
    await connectDB();
    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(1)
      .select('title slug excerpt tags coverImage createdAt')
      .lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch {
    return [];
  }
}

export default async function BlogsPreviewSection() {
  const blogs = await getLatestBlogs();

  return (
    <section id='blog' className='py-24 px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-end justify-between mb-16'>
          <SectionHeading
            number='05 / Blog'
            title='Latest Posts'
            subtitle='Thoughts, tutorials, and notes from my journey.'
            className='mb-0'
          />
          <Link href='/blog' className='hidden md:block'>
            <span className='group inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan hover:text-deep transition-all duration-300 hover:-translate-y-0.5 text-sm font-medium'>
              See More
              <HiArrowLongRight className='transition-transform duration-300 group-hover:translate-x-1' />
            </span>
          </Link>
        </div>

        {blogs.length > 0 ? (
          <>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {blogs.map((blog, i) => (
                <AnimateOnScroll key={blog._id} delay={i * 100} direction='up'>
                  <BlogCard blog={blog} />
                </AnimateOnScroll>
              ))}
            </div>
            <div className='flex justify-center mt-10 md:hidden'>
              <Link
                href='/blog'
                className='group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan hover:text-deep transition-all duration-300'
              >
                See More
                <HiArrowLongRight className='transition-transform duration-300 group-hover:translate-x-1' />
              </Link>
            </div>
          </>
        ) : (
          <AnimateOnScroll direction='up'>
            <div className='text-center py-16'>
              <div className='text-6xl mb-4'>✍️</div>
              <p className='text-text-muted text-lg mb-2'>
                Blog posts coming soon!
              </p>
              <p className='text-text-muted text-sm'>
                Thoughts, tutorials and insights will be published here.
              </p>
            </div>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
}
