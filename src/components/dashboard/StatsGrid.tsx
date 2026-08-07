'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Code2, Flame, BrainCircuit } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { useStreaks } from '@/hooks/useStreaks';
import { useRevisionQueue } from '@/hooks/useRevisionQueue';
import { tracks } from '@/data/tracks';
import Link from 'next/link';

// Precompute total items from static data outside the component
// to prevent O(N) recalculations on every render
const totalItems = tracks.reduce((sum, track) =>
  sum + track.modules.reduce((mSum, mod) =>
    mSum + mod.topics.reduce((tSum, topic) => tSum + topic.items.length, 0)
  , 0)
, 0);

export function StatsGrid() {
  const [mounted, setMounted] = React.useState(false);
  const { progress } = useProgress();
  const { currentStreak, longestStreak } = useStreaks();
  const { dueCards } = useRevisionQueue();

  // Memoize O(N) progress calculations in a single pass to prevent
  // re-calculating when independent contexts (streaks, dueCards) update.
  // Note: Hook must be placed before `if (!mounted)` to satisfy rules of hooks.
  const { completedItems, thisWeekCompleted } = React.useMemo(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneWeekAgoTime = oneWeekAgo.getTime();

    let completed = 0;
    let recent = 0;

    for (const p of progress) {
      if (p.status === 'COMPLETED') {
        completed++;
        if (p.completedAt) {
          const time = p.completedAt instanceof Date
            ? p.completedAt.getTime()
            : new Date((p.completedAt as any).seconds ? (p.completedAt as any).seconds * 1000 : p.completedAt).getTime();
          if (time > oneWeekAgoTime) {
            recent++;
          }
        }
      }
    }
    return { completedItems: completed, thisWeekCompleted: recent };
  }, [progress]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const overallPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      <Card className="p-6 flex flex-col items-center justify-center">
        <ProgressRing percentage={overallPercentage} size={100} strokeWidth={6} label="Overall" />
      </Card>

      <Card className="p-6 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">Items Completed</p>
            <h3 className="text-3xl font-bold mt-2 text-[var(--text-primary)]">{completedItems}</h3>
          </div>
          <div className="p-2 rounded-lg bg-[var(--surface-hover)]">
            <Code2 className="w-5 h-5 text-[var(--accent-secondary)]" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-[var(--success)]">
          <span>+{thisWeekCompleted} this week</span>
        </div>
      </Card>

      <Card className="p-6 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">Study Streak</p>
            <h3 className="text-3xl font-bold mt-2 text-[var(--text-primary)]">{currentStreak} <span className="text-xl text-[var(--text-muted)] font-normal">days</span></h3>
          </div>
          <div className="p-2 rounded-lg bg-orange-500/10">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <span>Longest: {longestStreak} days</span>
        </div>
      </Card>

      <Card className={`p-6 flex flex-col justify-between ${dueCards.length > 0 ? 'border-[var(--warning)]/30 bg-[var(--warning)]/5' : ''}`}>
        <div className="flex items-start justify-between">
          <div>
            <p className={`text-sm font-medium ${dueCards.length > 0 ? 'text-[var(--warning)]' : 'text-[var(--text-secondary)]'}`}>Revision Due</p>
            <h3 className="text-3xl font-bold mt-2 text-[var(--text-primary)]">{dueCards.length}</h3>
          </div>
          <div className={`p-2 rounded-lg ${dueCards.length > 0 ? 'bg-[var(--warning)]/20' : 'bg-[var(--surface-hover)]'}`}>
            <BrainCircuit className={`w-5 h-5 ${dueCards.length > 0 ? 'text-[var(--warning)]' : 'text-[var(--text-secondary)]'}`} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          {dueCards.length > 0 ? (
            <Link href="/revision" className="text-[var(--warning)] hover:underline text-sm font-medium">Start Revision →</Link>
          ) : (
            <span className="text-sm font-medium text-[var(--success)]">All caught up!</span>
          )}
        </div>
      </Card>
    </div>
  );
}
