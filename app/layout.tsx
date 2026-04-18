import type { Metadata } from 'next';
import { spaceGrotesk, inter } from '@/app/ui/font';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'Shazzadul Islam Shakib — Full Stack Developer',
    template: '%s | Shazzadul Islam Shakib',
  },
  description:
    'Full Stack Developer specializing in MERN stack and PostgreSQL. Building scalable, secure, and high-performing web applications.',
  keywords: [
    'Full Stack Developer',
    'MERN Stack',
    'React',
    'Next.js',
    'Node.js',
  ],
  authors: [{ name: 'Shazzadul Islam Shakib' }],
  openGraph: {
    type: 'website',
    title: 'Shazzadul Islam Shakib — Full Stack Developer',
    description:
      'Full Stack Developer specializing in MERN stack and PostgreSQL.',
    siteName: 'Shazzadul Islam Shakib Portfolio',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className='font-inter bg-deep text-text-primary antialiased'>
        {children}
        <Toaster
          position='top-center'
          toastOptions={{
            duration: 4000,
            style: {
              background: '#071A2F',
              color: '#EAF4FF',
              border: '1px solid rgba(139,211,255,0.28)',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#8BD3FF', secondary: '#EAF4FF' },
            },
            error: {
              iconTheme: { primary: '#2F7FD1', secondary: '#EAF4FF' },
            },
          }}
        />
      </body>
    </html>
  );
}
