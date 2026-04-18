import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { projects } from '@/utils/constants';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { HiArrowLongRight } from 'react-icons/hi2';

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

export default async function ProjectsSection() {
  const dbProjects = await getProjects();
  const source = dbProjects.length
    ? dbProjects.map((project) => ({
        id: project._id,
        title: project.title,
        description: project.description,
        image: project.image || '/zbotdashboard.png',
        tech: project.tech,
        featured: Boolean(project.featured),
        links: {
          live: project.liveUrl || '#',
          client: project.clientUrl || '#',
          server: project.serverUrl || '#',
        },
      }))
    : projects;

  const previewProjects = source.slice(0, 3);

  return (
    <section
      id='projects'
      className='py-20 sm:py-24 lg:py-28 px-5 sm:px-6 lg:px-8'
    >
      <div className='max-w-7xl mx-auto'>
        <AnimateOnScroll direction='up'>
          <SectionHeading
            number='03 / Projects'
            title='Featured Work'
            subtitle="A selection of projects I've built from concept to deployment."
          />
        </AnimateOnScroll>

        <div className='flex flex-col gap-16 sm:gap-20'>
          {previewProjects.map((project, i) => (
            <AnimateOnScroll key={project.id} delay={i * 120} direction='up'>
              <div
                className={`grid lg:grid-cols-2 gap-8 sm:gap-10 items-center ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Image */}
                <div className='group relative h-56 sm:h-72 lg:h-80 rounded-2xl overflow-hidden border border-border-glass'>
                  <Image
                    src={project.image}
                    fill
                    alt={project.title}
                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 gap-4'>
                    {project.links.live !== '#' ? (
                      <Link
                        href={project.links.live}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 px-5 py-2.5 bg-accent-violet text-white text-sm font-semibold rounded-xl hover:bg-accent-violet/90 transition-colors'
                      >
                        <FaExternalLinkAlt size={12} /> Live Site
                      </Link>
                    ) : null}
                    {project.links.client !== '#' ? (
                      <Link
                        href={project.links.client}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold rounded-xl hover:bg-white/20 transition-colors'
                      >
                        <FaGithub size={14} /> GitHub
                      </Link>
                    ) : null}
                  </div>
                </div>

                {/* Content */}
                <div className='flex flex-col gap-3 sm:gap-4'>
                  <div className='flex items-center gap-3'>
                    {project.featured && (
                      <span className='text-xs font-mono text-accent-cyan tracking-widest uppercase'>
                        Featured Project
                      </span>
                    )}
                  </div>

                  <h3 className='text-2xl sm:text-3xl font-grotesk font-bold text-text-primary group-hover:gradient-text transition-all'>
                    {project.title}
                  </h3>

                  <div className='relative p-4 sm:p-5 rounded-xl bg-surface border border-border-glass'>
                    <p className='text-text-muted leading-relaxed text-sm sm:text-base'>
                      {project.description}
                    </p>
                  </div>

                  <div className='flex flex-wrap gap-2'>
                    {project.tech.slice(0, 7).map((tech) => (
                      <Badge key={tech} color={i % 2 === 0 ? 'violet' : 'cyan'}>
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 7 && (
                      <Badge color='default'>
                        +{project.tech.length - 7} more
                      </Badge>
                    )}
                  </div>

                  <div className='flex flex-wrap items-center gap-3 sm:gap-4 pt-2'>
                    {project.links.live !== '#' ? (
                      <Link
                        href={project.links.live}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 text-accent-violet hover:text-accent-cyan transition-colors font-medium text-sm'
                      >
                        <FaExternalLinkAlt size={12} /> Live Demo
                      </Link>
                    ) : null}
                    {project.links.client !== '#' ? (
                      <Link
                        href={project.links.client}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors font-medium text-sm'
                      >
                        <FaGithub size={14} /> Client Code
                      </Link>
                    ) : null}
                    {project.links.server !== '#' ? (
                      <Link
                        href={project.links.server}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors font-medium text-sm'
                      >
                        <FaGithub size={14} /> Server Code
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {source.length > 3 ? (
          <div className='flex justify-center mt-14'>
            <Link
              href='/projects'
              className='group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-violet/10 border border-accent-violet/30 text-accent-violet hover:bg-accent-violet hover:text-white transition-all duration-300 hover:-translate-y-0.5'
            >
              See More Projects
              <HiArrowLongRight className='transition-transform duration-300 group-hover:translate-x-1' />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
