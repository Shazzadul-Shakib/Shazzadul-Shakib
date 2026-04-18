import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import Badge from '@/components/ui/Badge';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import { projects as fallbackProjects } from '@/utils/constants';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A curated list of projects, case studies, and product builds.',
};

type ProjectDoc = {
  _id: string;
  title: string;
  description: string;
  image?: string;
  tech: string[];
  liveUrl?: string;
  clientUrl?: string;
  serverUrl?: string;
  featured?: boolean;
};

async function getProjects(): Promise<ProjectDoc[]> {
  try {
    await connectDB();
    const docs = await Project.find({})
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .select(
        'title description image tech liveUrl clientUrl serverUrl featured',
      )
      .lean();
    return JSON.parse(JSON.stringify(docs));
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const dbProjects = await getProjects();
  const projects = dbProjects.length
    ? dbProjects.map((project) => ({
        id: project._id,
        title: project.title,
        description: project.description,
        image: project.image || '/zbotdashboard.png',
        tech: project.tech,
        links: {
          live: project.liveUrl || '#',
          client: project.clientUrl || '#',
          server: project.serverUrl || '#',
        },
      }))
    : fallbackProjects;

  return (
    <div className='min-h-screen py-32 px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <AnimateOnScroll direction='up'>
          <div className='text-center mb-16'>
            <span className='font-mono text-accent-cyan text-sm tracking-widest uppercase mb-4 block'>
              Selected Work
            </span>
            <h1 className='text-4xl sm:text-5xl font-grotesk font-bold gradient-text mb-4'>
              Projects
            </h1>
            <p className='text-text-muted text-lg max-w-2xl mx-auto'>
              Product-focused projects from idea to deployment.
            </p>
          </div>
        </AnimateOnScroll>

        <div className='grid md:grid-cols-2 gap-8'>
          {projects.map((project, i) => (
            <AnimateOnScroll key={project.id} direction='up' delay={i * 80}>
              <article className='bg-white/[0.03] border border-border-glass rounded-2xl overflow-hidden hover:border-accent-violet/40 transition-all duration-300'>
                <div className='relative h-56'>
                  <Image
                    src={project.image}
                    fill
                    alt={project.title}
                    className='object-cover'
                  />
                </div>
                <div className='p-6 flex flex-col gap-4'>
                  <h2 className='text-2xl font-grotesk font-bold text-text-primary'>
                    {project.title}
                  </h2>
                  <p className='text-text-muted text-sm leading-relaxed'>
                    {project.description}
                  </p>

                  <div className='flex flex-wrap gap-2'>
                    {project.tech.slice(0, 8).map((tech) => (
                      <Badge key={tech} color='default'>
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className='flex items-center gap-4 pt-2'>
                    {project.links.live !== '#' ? (
                      <Link
                        href={project.links.live}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 text-accent-violet hover:text-accent-cyan text-sm font-medium'
                      >
                        <FaExternalLinkAlt size={12} /> Live
                      </Link>
                    ) : null}
                    {project.links.client !== '#' ? (
                      <Link
                        href={project.links.client}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 text-text-muted hover:text-text-primary text-sm font-medium'
                      >
                        <FaGithub size={13} /> Client
                      </Link>
                    ) : null}
                    {project.links.server !== '#' ? (
                      <Link
                        href={project.links.server}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 text-text-muted hover:text-text-primary text-sm font-medium'
                      >
                        <FaGithub size={13} /> Server
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
