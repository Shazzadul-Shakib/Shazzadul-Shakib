import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getResumeUrl } from '@/lib/siteSettings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resumeUrl = await getResumeUrl();

  return (
    <>
      <Navbar resumeUrl={resumeUrl} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
