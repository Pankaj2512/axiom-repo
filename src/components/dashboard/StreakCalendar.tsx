'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { useStreaks } from '@/hooks/useStreaks';

export function StreakCalendar() {
  const { activityMap } = useStreaks();

  // Generate heatmap data using the actual activity map
  const data = React.useMemo(() => {
    const arr = [];
    const today = new Date();
    
    for (let i = 104; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const count = activityMap[dateStr] || 0;
      
      arr.push({
        date: dateStr,
        count
      });
    }
    return arr;
  }, [activityMap]);
  
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
              {weekIdx % 4 === 0 ? (
                 <div className="h-4 text-[10px] text-[var(--text-muted)] font-medium">
                   {new Date(week[0].date).toLocaleString('default', { month: 'short' })}
                 </div>
              ) : (
                <div className="h-4"></div>
              )}
              
              {week.map((day) => (
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
