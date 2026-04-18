'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import {
  HiHome,
  HiSquares2X2,
  HiPencilSquare,
  HiArrowLeftOnRectangle,
  HiGlobeAlt,
  HiEnvelope,
  HiBars3,
  HiXMark,
} from 'react-icons/hi2';

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard', Icon: HiHome },
  { label: 'Blogs', href: '/admin/dashboard/blogs', Icon: HiPencilSquare },
  { label: 'Messages', href: '/admin/dashboard/messages', Icon: HiEnvelope },
  {
    label: 'Portfolio Content',
    href: '/admin/dashboard/content',
    Icon: HiSquares2X2,
  },
  { label: 'Visit Site', href: '/', Icon: HiGlobeAlt },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className='lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border-glass z-40 flex items-center justify-between px-4'>
        <div className='flex items-center gap-3'>
          <div className='relative w-8 h-8'>
            <Image
              src='/logoW.png'
              fill
              alt='Logo'
              className='object-contain'
            />
          </div>
          <p className='text-text-primary font-grotesk font-bold text-sm'>
            Admin
          </p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='p-2 text-text-muted hover:text-text-primary bg-white/5 rounded-lg'
        >
          {isOpen ? <HiXMark size={24} /> : <HiBars3 size={24} />}
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-deep/80 backdrop-blur-sm z-40 lg:hidden'
          onClick={closeMenu}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-surface border-r border-border-glass z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo (Desktop) */}
        <div className='hidden lg:flex p-6 border-b border-border-glass items-center gap-3'>
          <div className='relative w-8 h-8'>
            <Image
              src='/logoW.png'
              fill
              alt='Logo'
              className='object-contain'
            />
          </div>
          <div>
            <p className='text-text-primary font-grotesk font-bold text-sm'>
              Admin
            </p>
            <p className='text-text-muted text-xs'>Blog Dashboard</p>
          </div>
        </div>

        {/* Logo (Mobile Header inside drawer) */}
        <div className='lg:hidden p-6 border-b border-border-glass flex items-center justify-between'>
          <p className='text-text-primary font-grotesk font-bold text-sm'>
            Blog Dashboard
          </p>
          <button
            onClick={closeMenu}
            className='p-1 text-text-muted hover:text-text-primary bg-white/5 rounded-lg'
          >
            <HiXMark size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className='flex-1 p-4 flex flex-col gap-1 overflow-y-auto'>
          {menuItems.map(({ label, href, Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                onClick={closeMenu}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-accent-violet/10 text-accent-violet'
                    : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className='p-4 border-t border-border-glass'>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className='w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-accent-cyan hover:bg-accent-cyan/10 transition-all'
          >
            <HiArrowLeftOnRectangle size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
