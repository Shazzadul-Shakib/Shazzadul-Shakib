import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
