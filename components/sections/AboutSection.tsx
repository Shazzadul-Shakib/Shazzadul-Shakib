import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { aboutStats, siteConfig } from '@/utils/constants';

export default function AboutSection() {
  return (
    <section
      id='about'
      className='py-20 sm:py-24 lg:py-28 px-5 sm:px-6 lg:px-8'
    >
      <div className='max-w-7xl mx-auto'>
        <AnimateOnScroll direction='up'>
          <SectionHeading
            number='01 / About'
            title='Who I Am'
            subtitle='A little bit about me and my journey as a developer.'
          />
        </AnimateOnScroll>

        <div className='grid lg:grid-cols-2 gap-10 lg:gap-14 items-center'>
          {/* Text Content */}
          <AnimateOnScroll direction='up' delay={100}>
            <div className='space-y-5 sm:space-y-6'>
              <p className='text-text-muted text-lg leading-relaxed'>
                I&apos;m{' '}
                <span className='text-text-primary font-semibold'>
                  {siteConfig.name}
                </span>
                , a passionate{' '}
                <span className='text-accent-violet font-semibold'>
                  Full-Stack Developer
                </span>{' '}
                with a strong commitment to building modern, scalable web
                applications. I specialize in the{' '}
                <span className='text-accent-cyan font-semibold'>
                  MERN stack
                </span>{' '}
                and{' '}
                <span className='text-accent-violet font-semibold'>
                  PostgreSQL
                </span>
                .
              </p>
              <p className='text-text-muted text-lg leading-relaxed'>
                My approach combines elegant front-end experiences with
                efficient, secure back-end logic. I&apos;m always excited to
                embrace new technologies and deliver impactful solutions that
                make a real difference.
              </p>
              <p className='text-text-muted text-lg leading-relaxed'>
                When not coding, I&apos;m studying how to escape infinite bug
                loops.{' '}
                <span className='text-accent-cyan font-semibold'>
                  Actually for hire.
                </span>
              </p>

              <div className='flex flex-wrap gap-3 pt-2'>
                {[
                  'Problem Solving',
                  'Clean Code',
                  'System Design',
                  'Team Collaboration',
                  'Fast Learner',
                ].map((trait) => (
                  <span
                    key={trait}
                    className='px-3 py-1.5 text-xs font-medium rounded-full bg-accent-violet/10 text-accent-violet border border-accent-violet/20'
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Stats Grid */}
          <div className='grid grid-cols-2 gap-3 sm:gap-4'>
            {aboutStats.map((stat, i) => (
              <AnimateOnScroll
                key={stat.label}
                delay={200 + i * 100}
                direction='up'
              >
                <GlassCard
                  hover
                  className='p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-2'
                >
                  <span className='text-5xl font-grotesk font-black gradient-text'>
                    {stat.value}
                  </span>
                  <span className='text-text-muted text-sm font-medium'>
                    {stat.label}
                  </span>
                </GlassCard>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
