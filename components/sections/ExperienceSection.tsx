import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { experiences } from '@/utils/constants';
import { connectDB } from '@/lib/db';
import Experience from '@/models/Experience';
import { HiCheckCircle } from 'react-icons/hi2';

type ExperienceDoc = {
  _id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  description: string[];
  tech: string[];
};

async function getExperiences(): Promise<ExperienceDoc[]> {
  try {
    await connectDB();
    const docs = await Experience.find({})
      .sort({ order: 1, createdAt: -1 })
      .select('role company period type description tech')
      .lean();
    return JSON.parse(JSON.stringify(docs));
  } catch {
    return [];
  }
}

export default async function ExperienceSection() {
  const dbExperiences = await getExperiences();
  const experienceList = dbExperiences.length
    ? dbExperiences.map((exp, idx) => ({ ...exp, id: idx + 1 }))
    : experiences;

  return (
    <section id='experience' className='py-24 px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <AnimateOnScroll direction='up'>
          <SectionHeading
            number='04 / Experience'
            title='My Journey'
            subtitle="Where I've worked and what I've built along the way."
          />
        </AnimateOnScroll>

        <div className='relative max-w-3xl'>
          {/* Vertical line */}
          <div className='absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent-violet via-accent-cyan to-transparent ml-5' />

          <div className='flex flex-col gap-12'>
            {experienceList.map((exp, i) => (
              <AnimateOnScroll key={exp.id} delay={i * 150} direction='left'>
                <div className='relative pl-14'>
                  {/* Dot */}
                  <div
                    className='absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center ml-0.5 -translate-x-1/2'
                    style={{
                      background:
                        i === 0
                          ? 'linear-gradient(135deg, #2F7FD1, #8BD3FF)'
                          : 'rgba(47,127,209,0.24)',
                      border: '2px solid',
                      borderColor:
                        i === 0 ? '#8BD3FF' : 'rgba(139,211,255,0.45)',
                      boxShadow:
                        i === 0 ? '0 0 20px rgba(139,211,255,0.38)' : 'none',
                    }}
                  >
                    <span className='text-white text-xs font-bold'>
                      {exp.id}
                    </span>
                  </div>

                  {/* Card */}
                  <div className='bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-accent-violet/30 transition-all duration-300'>
                    <div className='flex flex-wrap items-start justify-between gap-4 mb-4'>
                      <div>
                        <h3 className='text-xl font-grotesk font-bold text-text-primary'>
                          {exp.role}
                        </h3>
                        <div className='flex items-center gap-2 mt-1'>
                          <span className='text-accent-violet font-semibold text-sm'>
                            {exp.company}
                          </span>
                          <span className='text-border-glass'>·</span>
                          <span className='text-xs px-2 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20'>
                            {exp.type}
                          </span>
                        </div>
                      </div>
                      <span className='font-mono text-xs text-text-muted bg-white/5 px-3 py-1.5 rounded-lg border border-border-glass'>
                        {exp.period}
                      </span>
                    </div>

                    <ul className='space-y-2 mb-4'>
                      {exp.description.map((point, j) => (
                        <li
                          key={j}
                          className='flex items-start gap-3 text-text-muted text-sm leading-relaxed'
                        >
                          <HiCheckCircle className='text-accent-violet flex-shrink-0 mt-0.5 text-base' />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className='flex flex-wrap gap-2 pt-2 border-t border-border-glass'>
                      {exp.tech.map((t) => (
                        <Badge key={t} color='default'>
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
