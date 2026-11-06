import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'glass-card',
        hover && 'hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20',
        className
      )}
      {...props}
    />
  );
}
