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

// Pre-calculate track totals outside component to prevent recalculation on every render
const STATIC_TRACK_TOTALS: Record<string, number> = {};
tracks.forEach(track => {
  let total = 0;
  track.modules.forEach(m => {
    m.topics.forEach(t => {
      total += t.items.length;
    });
  });
  STATIC_TRACK_TOTALS[track.id] = total;
});

export function CategoryProgress() {
  const { progress } = useProgress();

  // Memoize categories mapping to prevent recalculation on unrelated context updates
  const categories = React.useMemo(() => {
    // Single pass over progress to get completed counts by track
    const completedByTrack: Record<string, number> = {};
    progress.forEach(p => {
      if (p.status === 'COMPLETED') {
        completedByTrack[p.trackId] = (completedByTrack[p.trackId] || 0) + 1;
      }
    });

    return tracks.map(track => ({
      name: track.name,
      completed: completedByTrack[track.id] || 0,
      total: STATIC_TRACK_TOTALS[track.id] || 0,
      color: TRACK_COLORS[track.id] || 'var(--accent-secondary)'
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
