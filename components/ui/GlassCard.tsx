import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl sm:rounded-2xl backdrop-blur-sm',
        'bg-surface/42 border border-border-glass',
        hover &&
          'transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/30',
        glow && 'border-accent-violet/30',
        className,
      )}
    >
      {children}
    </div>
  );
}
