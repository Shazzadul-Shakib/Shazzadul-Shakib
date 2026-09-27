import type { Metadata } from 'next';
import SiteSettingsForm from '@/components/admin/SiteSettingsForm';

export const metadata: Metadata = {
  title: 'Site Settings',
};

export default function SiteSettingsPage() {
  return (
    <div className='p-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-grotesk font-bold text-text-primary'>
          Site Settings
        </h1>
        <p className='text-text-muted text-sm mt-1'>
          Update site-wide links, like your resume.
        </p>
      </div>
      <SiteSettingsForm />
    </div>
  );
}
