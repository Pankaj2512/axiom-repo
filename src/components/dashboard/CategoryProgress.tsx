'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';

export function CategoryProgress() {
  const categories = [
    { name: 'Data Structures & Algorithms', completed: 45, total: 150, color: 'var(--accent-primary)' },
    { name: 'System Design (HLD & LLD)', completed: 12, total: 80, color: 'var(--accent-secondary)' },
    { name: 'AI/ML Concepts', completed: 5, total: 60, color: 'var(--success)' },
    { name: 'CS Fundamentals', completed: 20, total: 50, color: 'var(--warning)' },
  ];

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Track Progress</h3>
        <p className="text-sm text-[var(--text-secondary)]">Your progress across enrolled modules</p>
      </div>

      <div className="space-y-6">
        {categories.map((cat, idx) => {
          const percentage = Math.round((cat.completed / cat.total) * 100);
          return (
            <div key={idx}>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-[var(--text-primary)]">{cat.name}</span>
                <span className="text-xs text-[var(--text-secondary)]">{cat.completed} / {cat.total} ({percentage}%)</span>
              </div>
              <ProgressBar 
                percentage={percentage} 
                color={cat.color} 
                showPercentage={false}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
