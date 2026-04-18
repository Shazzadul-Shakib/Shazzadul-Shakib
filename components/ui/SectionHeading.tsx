import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  number?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  number,
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-12 sm:mb-14 lg:mb-16', centered && 'text-center', className)}>
      {number && (
        <span className='font-mono text-accent-cyan text-xs sm:text-sm tracking-widest uppercase mb-3 block'>
          {number}
        </span>
      )}
      <h2 className='text-2xl sm:text-4xl lg:text-5xl font-grotesk font-bold text-text-primary mb-3 sm:mb-4 relative inline-block'>
        {title}
        <span className='absolute -bottom-2 left-0 right-0 h-[3px] bg-accent-cyan rounded-full' />
      </h2>
      {subtitle && (
        <p className='text-text-muted text-center w-full max-w-3xl mx-auto text-sm sm:text-base lg:text-lg mt-4 sm:mt-5 leading-relaxed'>
          {subtitle}
        </p>
      )}
    </div>
  );
}
