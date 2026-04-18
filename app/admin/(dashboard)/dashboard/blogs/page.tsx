import Link from 'next/link';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import { formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { HiPlus, HiPencil, HiEye, HiEyeSlash } from 'react-icons/hi2';
import DeleteBlogButton from '@/components/admin/DeleteBlogButton';

async function getBlogs() {
  try {
    await connectDB();
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .select('title slug published tags createdAt')
      .lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch {
    return [];
  }
}

export default async function AdminBlogsPage() {
  const blogs = await getBlogs();
  const published = blogs.filter(
    (b: { published: boolean }) => b.published,
  ).length;
  const drafts = blogs.length - published;

  return (
    <div className='p-8'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-grotesk font-bold text-text-primary'>
            Blog Dashboard
          </h1>
          <p className='text-text-muted text-sm mt-1'>Manage all blog posts</p>
        </div>
        <Link href='/admin/dashboard/blogs/new'>
          <Button size='md'>
            <HiPlus className='text-lg' /> New Post
          </Button>
        </Link>
      </div>

      <div className='grid grid-cols-3 gap-4 mb-8'>
        {[
          {
            label: 'Total Posts',
            value: blogs.length,
            color: 'text-text-primary',
          },
          { label: 'Published', value: published, color: 'text-accent-violet' },
          { label: 'Drafts', value: drafts, color: 'text-accent-cyan' },
        ].map((stat) => (
          <div
            key={stat.label}
            className='bg-white/[0.03] border border-border-glass rounded-2xl p-5 text-center'
          >
            <p className={`text-3xl font-grotesk font-black ${stat.color}`}>
              {stat.value}
            </p>
            <p className='text-text-muted text-xs mt-1'>{stat.label}</p>
          </div>
        ))}
      </div>

      {blogs.length === 0 ? (
        <div className='text-center py-24 bg-white/[0.02] border border-border-glass rounded-2xl'>
          <div className='text-6xl mb-4'>✍️</div>
          <p className='text-text-muted mb-4'>No blog posts yet.</p>
          <Link href='/admin/dashboard/blogs/new'>
            <Button>Create your first post</Button>
          </Link>
        </div>
      ) : (
        <div className='bg-white/[0.02] border border-border-glass rounded-2xl overflow-hidden'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-border-glass'>
                <th className='text-left text-xs font-medium text-text-muted px-5 py-4'>
                  Title
                </th>
                <th className='text-left text-xs font-medium text-text-muted px-5 py-4 hidden md:table-cell'>
                  Tags
                </th>
                <th className='text-left text-xs font-medium text-text-muted px-5 py-4 hidden sm:table-cell'>
                  Date
                </th>
                <th className='text-left text-xs font-medium text-text-muted px-5 py-4'>
                  Status
                </th>
                <th className='text-left text-xs font-medium text-text-muted px-5 py-4'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(
                (blog: {
                  _id: string;
                  title: string;
                  slug: string;
                  published: boolean;
                  tags: string[];
                  createdAt: string;
                }) => (
                  <tr
                    key={blog._id}
                    className='border-b border-border-glass last:border-0 hover:bg-white/[0.02] transition-colors'
                  >
                    <td className='px-5 py-4'>
                      <p className='text-text-primary font-medium text-sm line-clamp-1'>
                        {blog.title}
                      </p>
                      <p className='text-text-muted text-xs mt-0.5 font-mono'>
                        /{blog.slug}
                      </p>
                    </td>
                    <td className='px-5 py-4 hidden md:table-cell'>
                      <div className='flex flex-wrap gap-1'>
                        {blog.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className='text-xs px-2 py-0.5 rounded-full bg-accent-violet/10 text-accent-violet border border-accent-violet/20'
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 2 && (
                          <span className='text-xs text-text-muted'>
                            +{blog.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className='px-5 py-4 hidden sm:table-cell'>
                      <span className='text-text-muted text-xs'>
                        {formatDate(blog.createdAt)}
                      </span>
                    </td>
                    <td className='px-5 py-4'>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                          blog.published
                            ? 'bg-accent-cyan/14 text-accent-cyan border-accent-cyan/35'
                            : 'bg-accent-violet/14 text-text-primary border-accent-violet/35'
                        }`}
                      >
                        {blog.published ? (
                          <>
                            <HiEye size={12} /> Published
                          </>
                        ) : (
                          <>
                            <HiEyeSlash size={12} /> Draft
                          </>
                        )}
                      </span>
                    </td>
                    <td className='px-5 py-4'>
                      <div className='flex items-center gap-2'>
                        <Link
                          href={`/admin/dashboard/blogs/edit/${blog._id}`}
                          className='p-2 rounded-lg text-text-muted hover:text-accent-violet hover:bg-accent-violet/10 transition-all'
                          title='Edit'
                        >
                          <HiPencil size={15} />
                        </Link>
                        <DeleteBlogButton id={blog._id} />
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
