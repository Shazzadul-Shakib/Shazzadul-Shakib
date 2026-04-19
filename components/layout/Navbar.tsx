'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { navLinks, siteConfig } from '@/utils/constants';
import Button from '@/components/ui/Button';
import MobileMenu from './MobileMenu';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    // Sync immediately on mount/reload before any user scroll occurs.
    onScroll();

    // Re-check after browser restores scroll position on refresh/navigation.
    const rafId = window.requestAnimationFrame(onScroll);
    window.addEventListener('load', onScroll);
    window.addEventListener('pageshow', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('load', onScroll);
      window.removeEventListener('pageshow', onScroll);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') return;
    const sections = [
      'hero',
      'about',
      'skills',
      'projects',
      'experience',
      'blog',
      'contact',
    ];

    const updateActiveSection = () => {
      const marker = window.scrollY + 140;
      let current = sections[0];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= marker) {
          current = id;
        } else {
          break;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [pathname]);

  const handleNavClick = (href: string) => {
    const sectionId = href.startsWith('/#') ? href.slice(2) : '';
    if (!sectionId) {
      setMobileOpen(false);
      return;
    }

    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `/#${sectionId}`);
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-deep/80 backdrop-blur-xl shadow-2xl shadow-black/25'
            : 'bg-transparent'
        }`}
      >
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16 md:h-20'>
            {/* Logo */}
            <Link href='/' className='flex items-center gap-2 group'>
              <div className='relative w-9 h-9'>
                <Image
                  src='/logoW.png'
                  fill
                  alt='S'
                  className='object-contain'
                />
              </div>
              <span className='font-grotesk font-bold text-text-primary hidden sm:block group-hover:text-accent-violet transition-colors'>
                Shakib
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className='hidden md:flex items-center gap-1'>
              {navLinks.map((link) => {
                const isHashLink = link.href.startsWith('/#');
                const sectionLinkedRoute =
                  pathname === '/' &&
                  ((link.href === '/projects' &&
                    activeSection === 'projects') ||
                    (link.href === '/blog' && activeSection === 'blog'));
                const isActive = isHashLink
                  ? pathname === '/' && activeSection === link.href.slice(2)
                  : sectionLinkedRoute ||
                    pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);
                return link.href.startsWith('/#') ? (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-accent-violet bg-accent-violet/10'
                        : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-accent-violet bg-accent-violet/10'
                        : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA + Mobile toggle */}
            <div className='flex items-center gap-3'>
              <a
                href={siteConfig.resumeUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='hidden md:block'
              >
                <Button size='sm'>Hire Me</Button>
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className='md:hidden p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors'
                aria-label='Toggle menu'
              >
                {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavClick={handleNavClick}
        activeSection={activeSection}
        pathname={pathname}
      />
    </>
  );
}
