import SectionHeading from '@/components/ui/SectionHeading';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { FrontEnd, BackEnd, Tools } from '@/utils/skillIcons';
import { connectDB } from '@/lib/db';
import Skill from '@/models/Skill';
import type { IconType } from 'react-icons';
import { BsBrush, BsCodeSlash, BsDatabase } from 'react-icons/bs';

type SkillUiItem = {
  name: string;
  level?: string;
};

interface SkillGroupProps {
  title: string;
  skills: SkillUiItem[];
  icon: IconType;
}

function SkillGroup({ title, skills, icon: Icon }: SkillGroupProps) {
  return (
    <article className='rounded-xl border border-accent-violet/20 bg-gradient-to-b from-[#062346]/85 to-[#031633]/90 px-6 py-5 md:px-7 md:py-6 h-[360px] md:h-[380px] flex flex-col gap-5 shadow-[0_18px_40px_rgba(0,0,0,0.22)]'>
      <div className='flex items-start justify-between'>
        <div className='h-12 w-12 rounded-md bg-[#1c3f63]/75 border border-[#214a72] flex items-center justify-center text-[#8bd3ff]'>
          <Icon size={20} aria-hidden='true' />
        </div>
        <span className='text-[10px] tracking-wide font-semibold text-[#b5dcff] px-2.5 py-1 rounded-[4px] border border-[#2a5a86] bg-[#133657]/65'>
          {String(skills.length).padStart(2, '0')} ITEMS
        </span>
      </div>

      <div className='space-y-1.5'>
        <h3 className='text-2xl leading-tight font-grotesk font-semibold text-[#d8ecff]'>
          {title}
        </h3>
      </div>

      <div className='flex flex-wrap gap-2 overflow-y-auto pr-1'>
        {skills.map((skill) => (
          <span
            key={skill.name}
            className='text-[12px] md:text-[12.5px] text-[#bdd8ef] px-3 py-1.5 rounded-lg border border-[#1b3e60] bg-[#0f2b49]/70 hover:bg-[#17385a] hover:border-[#2f6a9a] transition-colors duration-200'
            title={skill.name}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </article>
  );
}

type SkillDoc = {
  _id: string;
  name: string;
  level?: string;
  category: 'Frontend' | 'Backend' | 'Tools';
};

async function getSkills(): Promise<SkillDoc[]> {
  try {
    await connectDB();
    const docs = await Skill.find({})
      .sort({ order: 1, createdAt: -1 })
      .select('name level category')
      .lean();
    return JSON.parse(JSON.stringify(docs));
  } catch {
    return [];
  }
}

export default async function SkillsSection() {
  const dbSkills = await getSkills();
  const fallback = [
    ...FrontEnd.map((item) => ({
      name: item.title,
      level: '',
      category: 'Frontend' as const,
    })),
    ...BackEnd.map((item) => ({
      name: item.title,
      level: '',
      category: 'Backend' as const,
    })),
    ...Tools.map((item) => ({
      name: item.title,
      level: '',
      category: 'Tools' as const,
    })),
  ];

  const skillSource = dbSkills.length ? dbSkills : fallback;
  const frontEnd = skillSource.filter((skill) => skill.category === 'Frontend');
  const backEnd = skillSource.filter((skill) => skill.category === 'Backend');
  const tools = skillSource.filter((skill) => skill.category === 'Tools');

  return (
    <section id='skills' className='py-24 px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <AnimateOnScroll direction='up'>
          <SectionHeading
            number='02 / Skills'
            title='Tech Stack'
            subtitle='Focused stacks grouped into clean, modern skill panels.'
          />
        </AnimateOnScroll>

        <div className='mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          <AnimateOnScroll direction='up' delay={80}>
            <SkillGroup title='Frontend' skills={frontEnd} icon={BsBrush} />
          </AnimateOnScroll>
          <AnimateOnScroll direction='up' delay={150}>
            <SkillGroup title='Backend' skills={backEnd} icon={BsDatabase} />
          </AnimateOnScroll>
          <AnimateOnScroll direction='up' delay={220}>
            <SkillGroup
              title='Tools & DevOps'
              skills={tools}
              icon={BsCodeSlash}
            />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
