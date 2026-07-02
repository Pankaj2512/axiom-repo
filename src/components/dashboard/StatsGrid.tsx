'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Code2, Flame, BrainCircuit } from 'lucide-react';

export function StatsGrid() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      <Card className="p-6 flex flex-col items-center justify-center">
        <ProgressRing percentage={28} size={100} strokeWidth={6} label="Overall" />
      </Card>
      
      <Card className="p-6 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">Items Completed</p>
            <h3 className="text-3xl font-bold mt-2 text-[var(--text-primary)]">127</h3>
          </div>
          <div className="p-2 rounded-lg bg-[var(--surface-hover)]">
            <Code2 className="w-5 h-5 text-[var(--accent-secondary)]" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-[var(--success)]">
          <span>+12 this week</span>
        </div>
      </Card>

      <Card className="p-6 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--text-secondary)]">Study Streak</p>
            <h3 className="text-3xl font-bold mt-2 text-[var(--text-primary)]">12 <span className="text-xl text-[var(--text-muted)] font-normal">days</span></h3>
          </div>
          <div className="p-2 rounded-lg bg-orange-500/10">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <span>Longest: 21 days</span>
        </div>
      </Card>

      <Card className="p-6 flex flex-col justify-between border-[var(--warning)]/30 bg-[var(--warning)]/5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--warning)]">Revision Due</p>
            <h3 className="text-3xl font-bold mt-2 text-[var(--text-primary)]">8</h3>
          </div>
          <div className="p-2 rounded-lg bg-[var(--warning)]/20">
            <BrainCircuit className="w-5 h-5 text-[var(--warning)]" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <button className="text-[var(--warning)] hover:underline text-sm font-medium">Start Revision →</button>
        </div>
      </Card>
    </div>
  );
}
