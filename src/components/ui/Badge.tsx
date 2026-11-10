import * as React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'easy' | 'medium' | 'hard';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ children, variant = 'default', className, ...props }: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-[var(--surface-hover)] text-[var(--text-primary)]',
    success: 'bg-[var(--success)]/10 text-[var(--success)]',
    easy: 'bg-[var(--success)]/10 text-[var(--success)]',
    warning: 'bg-[var(--warning)]/10 text-[var(--warning)]',
    medium: 'bg-[var(--warning)]/10 text-[var(--warning)]',
    error: 'bg-[var(--error)]/10 text-[var(--error)]',
    hard: 'bg-[var(--error)]/10 text-[var(--error)]',
    info: 'bg-[var(--info)]/10 text-[var(--info)]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
