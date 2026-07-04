'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';
import { getAllUserProgress } from '@/lib/firestore';
import { TOTAL_SYLLABUS_ITEMS } from '@/data/tracks';
import { BrainCircuit, TrendingUp, AlertCircle } from 'lucide-react';

export function StudyForecaster() {
  const { user, loading } = useAuth();
  const [estimatedDate, setEstimatedDate] = React.useState<Date | null>(null);
  const [daysRemaining, setDaysRemaining] = React.useState<number>(0);
  const [velocity, setVelocity] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function calculateForecast() {
      if (loading) return;
      if (!user) {
        setIsLoading(false);
        return;
      }
      try {
        const progress = await getAllUserProgress(user.uid);

        // 1. Get Total Items in Syllabus
        const totalItems = TOTAL_SYLLABUS_ITEMS;

        // 2. Calculate Completed Items
        const completedItems = progress.filter(p => p.status === 'COMPLETED');
        const itemsLeft = totalItems - completedItems.length;

        if (itemsLeft <= 0) {
          setDaysRemaining(0);
          setVelocity(0);
          setIsLoading(false);
          return;
        }

        // 3. Calculate Velocity (Items completed per day over the last 14 days)
        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

        const recentCompletions = completedItems.filter(p =>
          p.completedAt && p.completedAt.getTime() > fourteenDaysAgo.getTime()
        );

        // Avoid division by zero, assume at least 1 day has passed if they did anything
        const avgItemsPerDay = recentCompletions.length > 0
          ? recentCompletions.length / 14
          : 0;

        setVelocity(avgItemsPerDay);

        // 4. Forecast
        if (avgItemsPerDay > 0) {
          const estimatedDays = Math.ceil(itemsLeft / avgItemsPerDay);
          setDaysRemaining(estimatedDays);

          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + estimatedDays);
          setEstimatedDate(futureDate);
        }

      } catch (err) {
        console.error("Forecast error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    calculateForecast();
  }, [user, loading]);

  if (isLoading) {
    return (
      <Card className="p-6 h-full flex items-center justify-center border-dashed bg-black/20">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      </Card>
    );
  }

  return (
    <Card className="p-6 h-full flex flex-col relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-purple-900/20 border border-indigo-500/20">
      {/* Decorative background */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shadow-inner shadow-white/10">
          <BrainCircuit className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="font-bold text-white leading-tight">Study Forecaster</h3>
          <p className="text-xs text-indigo-200/60">AI predictive analysis</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center relative z-10">
        {velocity > 0 && estimatedDate ? (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <p className="text-sm text-indigo-200">Estimated Completion</p>
              <h2 className="text-3xl font-bold text-white drop-shadow-md">
                {estimatedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </h2>
              <p className="text-xs font-mono text-indigo-300">
                ({daysRemaining} days remaining)
              </p>
            </div>

            <div className="bg-black/40 rounded-lg p-3 flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Current Velocity</span>
              </div>
              <span className="font-mono text-sm font-medium text-white">
                {velocity.toFixed(1)} items/day
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-indigo-400/50 mx-auto" />
            <div>
              <p className="text-sm font-medium text-indigo-200">Not enough data</p>
              <p className="text-xs text-indigo-200/60 mt-1">
                Complete a few topics over the next few days so the AI can calculate your velocity.
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
