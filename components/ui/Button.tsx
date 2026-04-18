import React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
  asChild?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-accent-violet text-text-primary font-semibold border border-accent-cyan/20 shadow-sm shadow-black/10 hover:bg-accent-cyan hover:text-deep hover:border-accent-cyan/40 hover:scale-[1.01] active:scale-[0.99]',
  outline:
    'border border-border-glass text-text-primary hover:border-accent-cyan/50 hover:text-accent-cyan hover:bg-accent-violet/10',
  ghost: 'text-text-muted hover:text-text-primary hover:bg-accent-violet/10',
  danger:
    'bg-accent-cyan/12 border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/22',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs sm:text-sm rounded-lg',
  md: 'px-4 sm:px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-5 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan/40 disabled:opacity-50 disabled:cursor-not-allowed select-none',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {loading && (
        <span className='w-4 h-4 border-2 border-text-primary/25 border-t-accent-cyan rounded-full animate-spin' />
      )}
      {children}
    </button>
  );
}
