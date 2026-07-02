'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

// Helper to generate mock data
const generateMockHeatmap = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 105; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    
    // Random activity level 0-4
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const baseProb = isWeekend ? 0.7 : 0.3;
    let count = 0;
    
    if (Math.random() > baseProb) {
      count = Math.floor(Math.random() * 5);
      if (count > 0 && Math.random() > 0.8) count += 3; // occasional high activity
    }
    
    data.push({
      date: d.toISOString().split('T')[0],
      count
    });
  }
  return data;
};

export function StreakCalendar() {
  const data = React.useMemo(() => generateMockHeatmap(), []);
  
  // Group into columns of 7 days
  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-[var(--surface-hover)] border-[var(--border)]';
    if (count <= 2) return 'bg-[var(--accent-primary)]/30 border-[var(--accent-primary)]/20';
    if (count <= 4) return 'bg-[var(--accent-primary)]/60 border-[var(--accent-primary)]/40';
    return 'bg-[var(--accent-primary)] border-[var(--accent-primary)]/80';
  };

  return (
    <Card className="p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Activity Map</h3>
        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-[var(--surface-hover)]"></div>
            <div className="w-3 h-3 rounded-sm bg-[var(--accent-primary)]/30"></div>
            <div className="w-3 h-3 rounded-sm bg-[var(--accent-primary)]/60"></div>
            <div className="w-3 h-3 rounded-sm bg-[var(--accent-primary)]"></div>
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col gap-[6px] text-[10px] text-[var(--text-muted)] font-medium pt-5">
          <div className="h-3 leading-3"></div>
          <div className="h-3 leading-3">Mon</div>
          <div className="h-3 leading-3"></div>
          <div className="h-3 leading-3">Wed</div>
          <div className="h-3 leading-3"></div>
          <div className="h-3 leading-3">Fri</div>
          <div className="h-3 leading-3"></div>
        </div>

        <div className="flex gap-[6px] overflow-x-auto pb-2 scrollbar-hide">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-[6px]">
              {/* Optional month labels could go here */}
              {weekIdx % 4 === 0 ? (
                 <div className="h-4 text-[10px] text-[var(--text-muted)] font-medium">
                   {new Date(week[0].date).toLocaleString('default', { month: 'short' })}
                 </div>
              ) : (
                <div className="h-4"></div>
              )}
              
              {week.map((day, dayIdx) => (
                <div
                  key={day.date}
                  className={cn(
                    'w-3 h-3 rounded-sm border transition-colors hover:border-white/50 cursor-pointer',
                    getColorClass(day.count)
                  )}
                  title={`${day.count} items on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
