import Link from "next/link";
import Image from "next/image";
import { socialLinks, navLinks } from "@/utils/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-glass mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image src="/logoW.png" fill alt="Logo" className="object-contain" />
              </div>
              <span className="font-grotesk font-bold text-text-primary">
                Shazzadul Islam Shakib
              </span>
            </div>
            <p className="text-text-muted text-sm">Full Stack Developer · MERN · PostgreSQL</p>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-text-muted text-sm hover:text-accent-violet transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-xl bg-white/5 border border-border-glass text-text-muted hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-200 hover:scale-110"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-border-glass to-transparent" />

        <p className="text-center text-text-muted text-sm">
          © {year}{" "}
          <span className="text-accent-violet font-medium">Shazzadul Islam Shakib</span>
          {" "}- All rights reserved.
        </p>
      </div>
    </footer>
  );
}
