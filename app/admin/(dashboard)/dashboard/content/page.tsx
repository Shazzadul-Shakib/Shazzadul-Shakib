import type { Metadata } from 'next';
import ContentManager from '@/components/admin/ContentManager';

export const metadata: Metadata = {
  title: 'Portfolio Content',
};

export default function PortfolioContentPage() {
  return (
    <div className='p-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-grotesk font-bold text-text-primary'>
          Portfolio Content
        </h1>
        <p className='text-text-muted text-sm mt-1'>
          Create, edit, and delete skills, projects, and experiences.
        </p>
      </div>
      <ContentManager />
    </div>
  );
}
