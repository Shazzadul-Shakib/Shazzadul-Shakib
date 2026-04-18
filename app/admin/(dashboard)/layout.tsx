import { SessionProvider } from 'next-auth/react';
import DashboardSidebar from '@/components/admin/DashboardSidebar';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className='flex flex-col lg:flex-row min-h-screen bg-deep relative'>
        <DashboardSidebar />
        <div className='flex-1 overflow-auto pt-16 lg:pt-0'>{children}</div>
      </div>
    </SessionProvider>
  );
}
