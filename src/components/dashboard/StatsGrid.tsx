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

// Pre-compute static values outside the component to prevent recalculation on every render
const TOTAL_ITEMS = tracks.reduce((sum, track) =>
  sum + track.modules.reduce((mSum, mod) =>
    mSum + mod.topics.reduce((tSum, topic) => tSum + topic.items.length, 0)
  , 0)
, 0);

export function StatsGrid() {
  const [mounted, setMounted] = React.useState(false);
  const { progress } = useProgress();
  const { currentStreak, longestStreak } = useStreaks();
  const { dueCards } = useRevisionQueue();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate items completed this week
  const stats = React.useMemo(() => {
    let completedCount = 0;
    let thisWeekCount = 0;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneWeekAgoTime = oneWeekAgo.getTime();

    for (let i = 0; i < progress.length; i++) {
      const p = progress[i];
      if (p.status === 'COMPLETED') {
        completedCount++;

        if (p.completedAt) {
          const completedAtObj = p.completedAt as { seconds?: number };
          const completedTime = p.completedAt instanceof Date
            ? p.completedAt.getTime()
            : new Date(completedAtObj.seconds ? completedAtObj.seconds * 1000 : (p.completedAt as string | number)).getTime();

          if (completedTime > oneWeekAgoTime) {
            thisWeekCount++;
          }
        }
      }
    }

    return {
      completedItems: completedCount,
      overallPercentage: TOTAL_ITEMS > 0 ? Math.round((completedCount / TOTAL_ITEMS) * 100) : 0,
      thisWeekCompleted: thisWeekCount
    };
  }, [progress]);

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      <Card className="p-6 flex flex-col items-center justify-center">
        <ProgressRing percentage={stats.overallPercentage} size={100} strokeWidth={6} label="Overall" />
      </Card>

      <Card className="p-6 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">Items Completed</p>
            <h3 className="text-3xl font-bold mt-2 text-[var(--text-primary)]">{stats.completedItems}</h3>
          </div>
          <div className="p-2 rounded-lg bg-[var(--surface-hover)]">
            <Code2 className="w-5 h-5 text-[var(--accent-secondary)]" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-[var(--success)]">
          <span>+{stats.thisWeekCompleted} this week</span>
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
