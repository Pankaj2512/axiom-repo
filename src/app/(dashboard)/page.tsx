'use client';

import * as React from 'react';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { StreakCalendar } from '@/components/dashboard/StreakCalendar';
import { CategoryProgress } from '@/components/dashboard/CategoryProgress';
import { StudyForecaster } from '@/components/analytics/StudyForecaster';

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">Welcome back, Pankaj</h1>
        <p className="text-[var(--text-secondary)] mt-1">Here's your preparation overview for today.</p>
      </header>

      {/* Top Stats */}
      <section>
        <StatsGrid />
      </section>

      {/* Middle Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <StreakCalendar />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <StudyForecaster />
          <CategoryProgress />
        </div>
      </section>
    </div>
  );
}
