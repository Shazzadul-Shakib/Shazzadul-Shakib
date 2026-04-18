import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'violet' | 'cyan' | 'green' | 'orange' | 'red' | 'default';
  className?: string;
}

const colorMap = {
  violet: 'bg-accent-violet/14 text-text-primary border-accent-violet/40',
  cyan: 'bg-accent-cyan/14 text-accent-cyan border-accent-cyan/40',
  green: 'bg-text-primary/12 text-text-primary border-text-primary/30',
  orange: 'bg-accent-cyan/14 text-text-primary border-accent-cyan/40',
  red: 'bg-accent-violet/14 text-accent-violet border-accent-violet/40',
  default: 'bg-white/5 text-text-muted border-border-glass',
};

export default function Badge({
  children,
  color = 'default',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md border transition-colors',
        colorMap[color],
        className,
      )}
    >
      {children}
    </span>
  );
}
