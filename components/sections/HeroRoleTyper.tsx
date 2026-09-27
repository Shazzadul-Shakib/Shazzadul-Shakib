'use client';
import { useEffect, useState } from 'react';

const roles = [
  'Full Stack Developer',
  'MERN Stack Expert',
  'React Enthusiast',
  'Problem Solver',
];

export default function HeroRoleTyper() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        40,
      );
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <div
      className='animate-fade-up flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-grotesk font-semibold mb-8 h-12'
      style={{ animationDelay: '200ms' }}
    >
      <span className='text-accent-violet opacity-60'>&lt;</span>
      <span className='gradient-text min-w-0'>
        {displayed}
        <span className='inline-block w-0.5 h-7 bg-accent-violet ml-0.5 align-middle animate-pulse' />
      </span>
      <span className='text-accent-violet opacity-60'>/&gt;</span>
    </div>
  );
}
