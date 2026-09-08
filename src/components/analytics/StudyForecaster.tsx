'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/contexts/AuthContext';
import { getAllUserProgress } from '@/lib/firestore';
import { tracks } from '@/data/tracks';
import { 
  BrainCircuit, 
  TrendingUp, 
  Calendar, 
  AlertCircle, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Flame, 
  Check, 
  Layers, 
  Compass, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import type { ForecastPlan } from '@/app/api/ai/forecast/route';

const POPULAR_COMPANIES = ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Uber'];
const TIMELINE_PRESETS = [14, 30, 45, 60, 90];

export function StudyForecaster() {
  const { user, loading } = useAuth();
  const [estimatedDate, setEstimatedDate] = React.useState<Date | null>(null);
  const [daysRemaining, setDaysRemaining] = React.useState<number>(0);
  const [velocity, setVelocity] = React.useState<number>(0);
  const [completedCount, setCompletedCount] = React.useState<number>(0);
  const [totalItemsCount, setTotalItemsCount] = React.useState<number>(450);
  const [isLoading, setIsLoading] = React.useState(true);

  // Modal & AI Plan States
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [targetCompany, setTargetCompany] = React.useState('Google');
  const [customCompany, setCustomCompany] = React.useState('');
  const [availableDays, setAvailableDays] = React.useState<number>(45);
  const [dailyHours, setDailyHours] = React.useState<number>(2);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [plan, setPlan] = React.useState<ForecastPlan | null>(null);
  const [activeTab, setActiveTab] = React.useState<'strategy' | 'topics' | 'milestones'>('strategy');

  // Load saved plan from localStorage
  React.useEffect(() => {
    try {
      const savedPlan = localStorage.getItem('axiom_study_plan');
      const savedCompany = localStorage.getItem('axiom_target_company');
      const savedDays = localStorage.getItem('axiom_target_days');
      if (savedPlan) {
        setPlan(JSON.parse(savedPlan));
      }
      if (savedCompany) {
        setTargetCompany(savedCompany);
      }
      if (savedDays) {
        setAvailableDays(Number(savedDays) || 45);
      }
    } catch (e) {
      console.warn("Could not load saved plan from storage", e);
    }
  }, []);

  React.useEffect(() => {
    async function calculateForecast() {
      if (loading) return;
      if (!user) {
        setIsLoading(false);
        return;
      }
      try {
        const progress = await getAllUserProgress(user.uid);
        
        // 1. Calculate Total Items in Syllabus
        const totalItems = tracks.reduce((sum, track) => 
          sum + track.modules.reduce((mSum, mod) => 
            mSum + mod.topics.reduce((tSum, topic) => tSum + topic.items.length, 0)
          , 0)
        , 0);
        setTotalItemsCount(totalItems);

        // 2. Calculate Completed Items
        const completedItems = progress.filter(p => p.status === 'COMPLETED');
        setCompletedCount(completedItems.length);
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
          p.completedAt && (
            (p.completedAt instanceof Date ? p.completedAt.getTime() : new Date((p.completedAt as any).seconds ? (p.completedAt as any).seconds * 1000 : p.completedAt).getTime()) > fourteenDaysAgo.getTime()
          )
        );

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

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    const company = customCompany.trim() || targetCompany;

    try {
      const res = await fetch('/api/ai/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetCompany: company,
          availableDays,
          dailyHoursAvailable: dailyHours,
          currentProgress: {
            totalCompleted: completedCount,
            totalItems: totalItemsCount,
            currentVelocity: velocity
          }
        })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setPlan(data.plan);
      setActiveTab('strategy');

      // Persist to local storage
      try {
        localStorage.setItem('axiom_study_plan', JSON.stringify(data.plan));
        localStorage.setItem('axiom_target_company', company);
        localStorage.setItem('axiom_target_days', String(availableDays));
      } catch (e) {
        console.warn("Could not persist plan to localStorage", e);
      }
    } catch (err: any) {
      alert(`Failed to generate forecast: ${err.message || 'Server error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 h-full flex items-center justify-center border-dashed bg-black/20">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      </Card>
    );
  }

  const activeCompany = customCompany.trim() || targetCompany;

  return (
    <>
      <Card className="p-6 h-full flex flex-col relative overflow-hidden bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-black/40 border border-indigo-500/20">
        {/* Decorative background glow */}
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shadow-inner shadow-white/10">
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-white leading-tight">Study Forecaster</h3>
              <p className="text-xs text-indigo-200/60">AI predictive analysis & roadmap</p>
            </div>
          </div>
          
          <Button 
            variant="glass" 
            size="sm" 
            onClick={() => setIsModalOpen(true)}
            className="text-xs gap-1 border-indigo-500/30 text-indigo-200 hover:text-white"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            {plan ? 'AI Roadmap' : 'Plan Exam'}
          </Button>
        </div>

        {/* Velocity / Completion Forecast */}
        <div className="flex-1 flex flex-col justify-between relative z-10 space-y-4">
          {velocity > 0 && estimatedDate ? (
            <div className="space-y-4">
              <div className="text-center space-y-1 py-1">
                <p className="text-xs text-indigo-200 font-medium">Projected Completion</p>
                <h2 className="text-2xl font-bold text-white drop-shadow-md">
                  {estimatedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </h2>
                <p className="text-xs font-mono text-indigo-300">
                  ({daysRemaining} days remaining at current pace)
                </p>
              </div>
              
              <div className="bg-black/40 rounded-lg p-3 flex items-center justify-between border border-white/5 text-xs">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Current Velocity</span>
                </div>
                <span className="font-mono font-semibold text-white">
                  {velocity.toFixed(1)} items/day
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-2 space-y-2">
              <div className="inline-flex p-2 rounded-full bg-indigo-500/10 text-indigo-300">
                <AlertCircle className="w-5 h-5" />
              </div>
              <p className="text-xs text-indigo-200/80">
                Solve topics over the next few days to compute your real-time completion velocity.
              </p>
            </div>
          )}

          {/* AI Strategy Mini Card */}
          {plan ? (
            <div className="rounded-xl bg-indigo-950/40 border border-indigo-500/30 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-200 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-indigo-400" />
                  Target: {activeCompany}
                </span>
                <Badge variant="success" className="text-[10px] px-1.5 py-0">
                  {plan.estimatedReadinessScore}% Readiness
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Recommended Pace:</span>
                <span className="font-mono font-bold text-white text-xs">
                  {plan.recommendedItemsPerDay} items / day
                </span>
              </div>

              <p className="text-[11px] text-indigo-200/70 line-clamp-2 italic">
                "{plan.forecastMessage}"
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full text-center text-xs text-indigo-300 hover:text-white font-medium flex items-center justify-center gap-1 pt-1"
              >
                View Full Strategy & Milestones <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer rounded-xl bg-gradient-to-r from-indigo-950/40 to-purple-950/30 border border-indigo-500/20 p-3 hover:border-indigo-400/40 transition-all flex items-center justify-between group"
            >
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Target Company Roadmap
                </p>
                <p className="text-[11px] text-indigo-200/60">Generate a custom plan for Google, Meta, or Amazon</p>
              </div>
              <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          )}
        </div>
      </Card>

      {/* AI Strategy & Roadmap Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="AI Target Exam Forecast & Roadmap"
        maxWidth="max-w-3xl"
      >
        <div className="space-y-6">
          {/* Configuration Form */}
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-4">
            {/* Target Company Selector */}
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-2">
                1. Target Company
              </label>
              <div className="flex flex-wrap gap-2">
                {POPULAR_COMPANIES.map((company) => (
                  <button
                    key={company}
                    type="button"
                    onClick={() => {
                      setTargetCompany(company);
                      setCustomCompany('');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      targetCompany === company && !customCompany
                        ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    {company}
                  </button>
                ))}
                <input
                  type="text"
                  placeholder="Other company..."
                  value={customCompany}
                  onChange={(e) => setCustomCompany(e.target.value)}
                  className="px-3 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>
            </div>

            {/* Timeline & Commitment Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-2">
                  2. Timeline (Days Remaining)
                </label>
                <div className="flex flex-wrap gap-2">
                  {TIMELINE_PRESETS.map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setAvailableDays(days)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        availableDays === days
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      {days}d
                    </button>
                  ))}
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={availableDays}
                    onChange={(e) => setAvailableDays(Math.max(1, Number(e.target.value) || 30))}
                    className="w-16 px-2 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-white text-center focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-2">
                  3. Daily Study Commitment
                </label>
                <div className="flex gap-2">
                  {[1, 2, 4].map((hrs) => (
                    <button
                      key={hrs}
                      type="button"
                      onClick={() => setDailyHours(hrs)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        dailyHours === hrs
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      {hrs} {hrs === 1 ? 'hr/day' : 'hrs/day'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-xs text-gray-400">
                Current progress: {completedCount}/{totalItemsCount} completed ({velocity.toFixed(1)}/day)
              </span>
              <Button
                onClick={handleGeneratePlan}
                isLoading={isGenerating}
                className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-500/20"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                {isGenerating ? 'Generating Strategy...' : 'Generate AI Strategy'}
              </Button>
            </div>
          </div>

          {/* Generated Plan Section */}
          {plan && (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Header Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-3 text-center">
                  <p className="text-[11px] text-indigo-300">Daily Target</p>
                  <p className="text-xl font-bold text-white font-mono mt-0.5">
                    {plan.recommendedItemsPerDay} <span className="text-xs font-normal text-gray-400">items</span>
                  </p>
                </div>
                <div className="bg-purple-950/40 border border-purple-500/20 rounded-xl p-3 text-center">
                  <p className="text-[11px] text-purple-300">Readiness Score</p>
                  <p className="text-xl font-bold text-green-400 font-mono mt-0.5">
                    {plan.estimatedReadinessScore}%
                  </p>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-xl p-3 text-center">
                  <p className="text-[11px] text-gray-400">Target Horizon</p>
                  <p className="text-xl font-bold text-white font-mono mt-0.5">
                    {availableDays} <span className="text-xs font-normal text-gray-400">days</span>
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-white/10 gap-4 text-sm font-medium">
                <button
                  onClick={() => setActiveTab('strategy')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'strategy' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Company Strategy
                  {activeTab === 'strategy' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('topics')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'topics' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Topic Priorities
                  {activeTab === 'topics' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('milestones')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'milestones' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Weekly Milestones
                  {activeTab === 'milestones' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)]" />
                  )}
                </button>
              </div>

              {/* Tab 1: Strategy */}
              {activeTab === 'strategy' && (
                <div className="space-y-4 max-h-80 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                  <div className="p-3.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed">
                    <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-indigo-400" />
                      {activeCompany} Interview Philosophy & Expectations
                    </p>
                    {plan.companyFocusStrategy}
                  </div>

                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-2">
                    <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                      Key Pro Interview Tips
                    </p>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {plan.interviewTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: Topic Priorities */}
              {activeTab === 'topics' && (
                <div className="space-y-4 max-h-80 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                  <div>
                    <h4 className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> High-Yield Topics (Must Master)
                    </h4>
                    <div className="space-y-2">
                      {plan.topicsToFocus.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-white">{item.topic}</span>
                            <Badge variant={item.priority === 'High' ? 'hard' : 'medium'}>
                              {item.priority} Priority
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-400">{item.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {plan.topicsToSkip && plan.topicsToSkip.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> Deprioritize / Skip for Timeline
                      </h4>
                      <div className="space-y-2">
                        {plan.topicsToSkip.map((item, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-black/30 border border-white/5 flex items-start justify-between gap-4">
                            <span className="text-xs font-medium text-gray-300">{item.topic}</span>
                            <span className="text-[11px] text-gray-500 text-right">{item.reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Milestones */}
              {activeTab === 'milestones' && (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                  {plan.weeklyMilestones.map((m) => (
                    <div key={m.week} className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] flex items-center justify-center font-bold text-xs flex-shrink-0">
                        W{m.week}
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <p className="text-xs font-semibold text-white">{m.theme}</p>
                        <p className="text-xs text-gray-400">{m.goal}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            {plan && (
              <Button onClick={() => setIsModalOpen(false)} className="gap-2">
                <Check className="w-4 h-4" /> Save Strategy & Apply
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

