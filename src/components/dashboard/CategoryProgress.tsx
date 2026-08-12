'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProgress } from '@/hooks/useProgress';
import { tracks } from '@/data/tracks';

const TRACK_COLORS: Record<string, string> = {
  sde2: 'var(--accent-primary)',
  aiml: 'var(--success)',
  fresher: 'var(--warning)',
};

// Pre-compute static track totals outside the component
const TRACK_TOTALS: Record<string, { name: string, total: number, color: string }> = {};
tracks.forEach(track => {
  let total = 0;
  track.modules.forEach(m => {
    m.topics.forEach(t => {
      total += t.items.length;
    });
  });
  TRACK_TOTALS[track.id] = {
    name: track.name,
    total,
    color: TRACK_COLORS[track.id] || 'var(--accent-secondary)'
  };
});

export function CategoryProgress() {
  const { progress } = useProgress();

  const categories = React.useMemo(() => {
    // Count completions per track in a single pass
    const completedCounts: Record<string, number> = {};

    for (let i = 0; i < progress.length; i++) {
      const p = progress[i];
      if (p.status === 'COMPLETED' && p.trackId) {
        completedCounts[p.trackId] = (completedCounts[p.trackId] || 0) + 1;
      }
    }

    // Map to final array using pre-computed static data
    return Object.keys(TRACK_TOTALS).map(trackId => ({
      name: TRACK_TOTALS[trackId].name,
      completed: completedCounts[trackId] || 0,
      total: TRACK_TOTALS[trackId].total,
      color: TRACK_TOTALS[trackId].color
    }));
  }, [progress]);

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Track Progress</h3>
        <p className="text-sm text-[var(--text-secondary)]">Your progress across enrolled modules</p>
      </div>

      <div className="space-y-6">
        {categories.map((cat, idx) => {
          const percentage = cat.total > 0 ? Math.round((cat.completed / cat.total) * 100) : 0;
          return (
            <div key={idx}>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-[var(--text-primary)] truncate pr-4">{cat.name}</span>
                <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">{cat.completed} / {cat.total} ({percentage}%)</span>
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
