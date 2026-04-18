import Link from 'next/link';
import type { Metadata } from 'next';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import Skill from '@/models/Skill';
import Project from '@/models/Project';
import Experience from '@/models/Experience';

export const metadata: Metadata = { title: 'Admin Dashboard' };

async function getStats() {
  try {
    await connectDB();
    const [blogs, skills, projects, experiences] = await Promise.all([
      Blog.countDocuments({}),
      Skill.countDocuments({}),
      Project.countDocuments({}),
      Experience.countDocuments({}),
    ]);

    return { blogs, skills, projects, experiences };
  } catch {
    return { blogs: 0, skills: 0, projects: 0, experiences: 0 };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div className='p-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-grotesk font-bold text-text-primary'>
          Admin Dashboard
        </h1>
        <p className='text-text-muted mt-1'>
          Manage your portfolio content from one place.
        </p>
      </div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        {[
          { label: 'Blogs', value: stats.blogs },
          { label: 'Skills', value: stats.skills },
          { label: 'Projects', value: stats.projects },
          { label: 'Experiences', value: stats.experiences },
        ].map((card) => (
          <div
            key={card.label}
            className='rounded-2xl border border-border-glass bg-white/[0.03] p-5'
          >
            <p className='text-text-muted text-xs uppercase tracking-wider'>
              {card.label}
            </p>
            <p className='text-3xl font-grotesk font-bold text-text-primary mt-2'>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className='grid md:grid-cols-2 gap-6'>
        <Link
          href='/admin/dashboard/blogs'
          className='rounded-2xl border border-border-glass bg-white/[0.03] p-6 hover:border-accent-violet/40 transition-all'
        >
          <h2 className='text-xl font-grotesk font-semibold text-text-primary'>
            Manage Blogs
          </h2>
          <p className='text-text-muted text-sm mt-2'>
            Create, update, publish or remove blog posts.
          </p>
        </Link>
        <Link
          href='/admin/dashboard/content'
          className='rounded-2xl border border-border-glass bg-white/[0.03] p-6 hover:border-accent-cyan/40 transition-all'
        >
          <h2 className='text-xl font-grotesk font-semibold text-text-primary'>
            Manage Portfolio Content
          </h2>
          <p className='text-text-muted text-sm mt-2'>
            CRUD skills, projects, and experiences shown on your homepage.
          </p>
        </Link>
      </div>
    </div>
  );
}
