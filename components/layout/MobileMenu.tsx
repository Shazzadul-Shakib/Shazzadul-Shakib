'use client';
import Link from 'next/link';
import { navLinks, socialLinks, siteConfig } from '@/utils/constants';
import Button from '@/components/ui/Button';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavClick: (href: string) => void;
  activeSection: string;
  pathname: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  onNavClick,
  activeSection,
  pathname,
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-surface border-l border-border-glass flex flex-col transition-transform duration-300 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-border-glass'>
          <span className='font-grotesk font-bold text-text-primary text-lg'>
            Navigation
          </span>
          <button
            onClick={onClose}
            className='p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors'
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <nav className='flex-1 p-6 flex flex-col gap-2'>
          {navLinks.map((link) => {
            const isHashLink = link.href.startsWith('/#');
            const sectionLinkedRoute =
              pathname === '/' &&
              ((link.href === '/projects' && activeSection === 'projects') ||
                (link.href === '/blog' && activeSection === 'blog'));
            const isActive = isHashLink
              ? pathname === '/' && activeSection === link.href.slice(2)
              : sectionLinkedRoute ||
                pathname === link.href ||
                pathname.startsWith(`${link.href}/`);
            return link.href.startsWith('/#') ? (
              <button
                key={link.label}
                onClick={() => onNavClick(link.href)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-accent-violet/10 text-accent-violet'
                    : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-accent-violet/10 text-accent-violet'
                    : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Social + CTA */}
        <div className='p-6 border-t border-border-glass flex flex-col gap-4'>
          <div className='flex gap-3'>
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='p-2.5 rounded-xl bg-white/5 border border-border-glass text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all'
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <a
            href={siteConfig.resumeUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button className='w-full justify-center'>Hire Me</Button>
          </a>
        </div>
      </div>
    </>
  );
}
