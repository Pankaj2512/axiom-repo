'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressBar({
  percentage,
  label,
  color = 'var(--accent-primary)',
  showPercentage = true,
  className
}: ProgressBarProps) {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setWidth(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-end mb-2">
          {label && <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>}
          {showPercentage && <span className="text-xs text-[var(--text-secondary)]">{percentage}%</span>}
        </div>
      )}
      <div className="h-2 w-full bg-[var(--surface-hover)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full progress-fill"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
