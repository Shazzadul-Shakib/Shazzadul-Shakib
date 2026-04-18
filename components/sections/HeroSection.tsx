'use client';
import { useEffect, useState } from 'react';
import { siteConfig, socialLinks } from '@/utils/constants';
import Button from '@/components/ui/Button';
import { HiArrowLongRight, HiArrowDown } from 'react-icons/hi2';

const roles = [
  'Full Stack Developer',
  'MERN Stack Expert',
  'React Enthusiast',
  'Problem Solver',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        40,
      );
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section
      id='hero'
      className='relative min-h-screen flex items-center overflow-hidden'
    >
      {/* Animated background blobs */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div
          className='blob absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-violet animate-float-blob'
          style={{ animationDuration: '15s' }}
        />
        <div
          className='blob absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-cyan animate-float-blob'
          style={{ animationDelay: '-5s', animationDuration: '18s' }}
        />
        <div
          className='blob absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-accent-violet animate-float-blob'
          style={{ animationDelay: '-10s', animationDuration: '20s' }}
        />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')] pointer-events-none" />

      {/* Fixed social sidebar */}
      <div className='hidden lg:flex flex-col items-center gap-4 fixed left-8 top-1/2 -translate-y-1/2 z-40'>
        <div className='w-px h-20 bg-gradient-to-b from-transparent to-border-glass' />
        {socialLinks.map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={label}
            className='p-2 text-text-muted hover:text-accent-cyan hover:scale-125 transition-all duration-200'
          >
            <Icon size={18} />
          </a>
        ))}
        <div className='w-px h-20 bg-gradient-to-t from-transparent to-border-glass' />
      </div>

      {/* Main content */}
      <div className='relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 py-24'>
        <div className='flex flex-col lg:flex-row gap-16 items-center justify-between'>
          {/* Text content */}
          <div className='flex-1 max-w-2xl'>
            <div className='animate-fade-up' style={{ animationDelay: '0ms' }}>
              <span className='font-mono text-accent-cyan text-sm tracking-[0.2em] uppercase mb-6 block'>
                This is
              </span>
            </div>

            <h1
              className='animate-fade-up text-4xl sm:text-5xl lg:text-7xl font-grotesk font-black leading-[1.05] mb-4'
              style={{ animationDelay: '100ms' }}
            >
              <span className='gradient-text'>Shazzadul</span>
              <br />
              <span className='text-text-primary'>Islam Shakib</span>
            </h1>

            <div
              className='animate-fade-up flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-grotesk font-semibold mb-8 h-12'
              style={{ animationDelay: '200ms' }}
            >
              <span className='text-accent-violet opacity-60'>&lt;</span>
              <span className='gradient-text min-w-0'>
                {displayed}
                <span className='inline-block w-0.5 h-7 bg-accent-violet ml-0.5 align-middle animate-pulse' />
              </span>
              <span className='text-accent-violet opacity-60'>/&gt;</span>
            </div>

            <p
              className='animate-fade-up text-text-muted text-base sm:text-lg leading-relaxed max-w-xl mb-10'
              style={{ animationDelay: '300ms' }}
            >
              Passionate{' '}
              <span className='text-accent-violet font-semibold'>
                Full-Stack Developer
              </span>{' '}
              specializing in{' '}
              <span className='text-accent-cyan font-semibold'>MERN stack</span>{' '}
              but{' '}
              <span className='text-accent-violet font-semibold'>
                Stack doesn't matter to me
              </span>
              . Love to see the solution of a problem in visual.
            </p>

            <div
              className='animate-fade-up flex flex-wrap gap-4'
              style={{ animationDelay: '400ms' }}
            >
              <a
                href={siteConfig.resumeUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button size='lg'>
                  View Resume <HiArrowLongRight className='text-lg' />
                </Button>
              </a>
              <Button
                variant='outline'
                size='lg'
                onClick={() =>
                  document
                    .getElementById('projects')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                See My Work
              </Button>
            </div>

            {/* Mobile socials */}
            <div
              className='animate-fade-up flex gap-3 mt-8 lg:hidden'
              style={{ animationDelay: '500ms' }}
            >
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='p-3 rounded-xl bg-white/5 border border-border-glass text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all'
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Code card decoration */}
          <div className='hidden lg:block flex-shrink-0 animate-float'>
            <div className='relative'>
              <div className='absolute -inset-4 bg-gradient-to-r from-accent-violet/20 to-accent-cyan/20 rounded-3xl blur-xl' />
              <div className='relative bg-surface border border-border-glass rounded-2xl p-6 font-mono text-sm leading-7 min-w-[260px] shadow-2xl'>
                <div className='flex items-center gap-2 mb-4'>
                  <div className='w-3 h-3 rounded-full bg-accent-violet/70' />
                  <div className='w-3 h-3 rounded-full bg-accent-cyan/70' />
                  <div className='w-3 h-3 rounded-full bg-text-primary/70' />
                  <span className='text-text-muted text-xs ml-2'>
                    developer.ts
                  </span>
                </div>
                <div className='text-text-muted'>
                  <span className='text-accent-violet'>const</span>{' '}
                  <span className='text-accent-cyan'>dev</span>{' '}
                  <span className='text-text-primary'>= {'{'}</span>
                </div>
                <div className='ml-4'>
                  <span className='text-accent-violet'>name</span>
                  <span className='text-text-primary'>: </span>
                  <span className='text-accent-cyan'>&apos;Shakib&apos;</span>
                  <span className='text-text-primary'>,</span>
                </div>
                <div className='ml-4'>
                  <span className='text-accent-violet'>stack</span>
                  <span className='text-text-primary'>: </span>
                  <span className='text-accent-cyan'>&apos;Mostly MERN, but doesn't matter&apos;</span>
                  <span className='text-text-primary'>,</span>
                </div>
                <div className='ml-4'>
                  <span className='text-accent-violet'>available</span>
                  <span className='text-text-primary'>: </span>
                  <span className='text-orange-400'>true</span>
                  <span className='text-text-primary'>,</span>
                </div>
                <div className='ml-4'>
                  <span className='text-accent-violet'>coffee</span>
                  <span className='text-text-primary'>: </span>
                  <span className='text-orange-400'>Infinity</span>
                  <span className='text-text-primary'>,</span>
                </div>
                <div className='ml-4'>
                  <span className='text-accent-violet'>Games</span>
                  <span className='text-text-primary'>: </span>
                  <span className='text-orange-400'>PUBG</span>
                  <span className='text-text-primary'>,</span>
                </div>
                <div className='ml-4'>
                  <span className='text-accent-violet'>Sports</span>
                  <span className='text-text-primary'>: </span>
                  <span className='text-orange-400'>Any, just let's go</span>
                  <span className='text-text-primary'>,</span>
                </div>
                <div className='text-text-primary'>{'}'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce'>
        <span className='text-text-muted text-xs font-mono tracking-widest uppercase'>
          scroll
        </span>
        <HiArrowDown className='text-accent-violet text-lg' />
      </div>
    </section>
  );
}
