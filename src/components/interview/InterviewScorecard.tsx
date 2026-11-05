'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  InterviewEvaluation,
  InterviewSession,
  InterviewVerdict
} from '@/types/interview';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Code2,
  TrendingUp,
  ShieldCheck,
  Zap,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface InterviewScorecardProps {
  evaluation: InterviewEvaluation;
  session: InterviewSession;
  onRestart: () => void;
}

export function InterviewScorecard({
  evaluation,
  session,
  onRestart
}: InterviewScorecardProps) {
  const { verdict, score, rubrics, summary, strengths, areasToImprove, optimalSolutionHints } = evaluation;

  const verdictConfig: Record<InterviewVerdict, { label: string; bg: string; text: string; border: string }> = {
    STRONG_HIRE: {
      label: 'Strong Hire — Exceeds Bar',
      bg: 'from-emerald-900/60 to-emerald-950/40',
      text: 'text-emerald-400',
      border: 'border-emerald-500/40'
    },
    HIRE: {
      label: 'Hire — Meets Bar',
      bg: 'from-green-900/60 to-green-950/40',
      text: 'text-green-400',
      border: 'border-green-500/40'
    },
    LEAN_HIRE: {
      label: 'Lean Hire — Borderline',
      bg: 'from-yellow-900/60 to-yellow-950/40',
      text: 'text-yellow-400',
      border: 'border-yellow-500/40'
    },
    LEAN_NO_HIRE: {
      label: 'Lean No Hire — Below Bar',
      bg: 'from-orange-900/60 to-orange-950/40',
      text: 'text-orange-400',
      border: 'border-orange-500/40'
    },
    NO_HIRE: {
      label: 'No Hire — Substantially Below Bar',
      bg: 'from-red-900/60 to-red-950/40',
      text: 'text-red-400',
      border: 'border-red-500/40'
    }
  };

  const vInfo = verdictConfig[verdict] || verdictConfig['LEAN_HIRE'];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-400 py-6 px-4">
      {/* Hero Banner with Verdict & Score */}
      <div className={`rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${vInfo.bg} border ${vInfo.border} shadow-2xl relative overflow-hidden`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Badge variant="default" className="text-xs uppercase tracking-wider font-bold">
                {session.company} Technical Interview Evaluation
              </Badge>
              <Badge variant="info" className="text-xs">
                {session.difficulty} Difficulty
              </Badge>
            </div>

            <h1 className={`text-2xl sm:text-4xl font-extrabold ${vInfo.text} tracking-tight drop-shadow-md`}>
              {vInfo.label}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
              {summary}
            </p>
          </div>

          {/* Overall Score Circle */}
          <div className="flex flex-col items-center justify-center w-28 h-28 rounded-full bg-black/40 border-2 border-white/20 shadow-inner flex-shrink-0">
            <span className="text-3xl font-black font-mono text-white">{score}</span>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Score / 100</span>
          </div>
        </div>
      </div>

      {/* 4-Pillar Rubric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white/5 border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400" /> Problem Solving
            </span>
            <span className="font-mono font-bold text-white">{rubrics.problemSolving}%</span>
          </div>
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full transition-all duration-700"
              style={{ width: `${rubrics.problemSolving}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-400">Algorithmic correctness and edge case handling</p>
        </Card>

        <Card className="p-4 bg-white/5 border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-300 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-blue-400" /> Code Quality
            </span>
            <span className="font-mono font-bold text-white">{rubrics.codeQuality}%</span>
          </div>
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
              style={{ width: `${rubrics.codeQuality}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-400">Modularity, variable naming, and idiomatic syntax</p>
        </Card>

        <Card className="p-4 bg-white/5 border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-300 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-purple-400" /> Communication
            </span>
            <span className="font-mono font-bold text-white">{rubrics.communication}%</span>
          </div>
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full transition-all duration-700"
              style={{ width: `${rubrics.communication}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-400">Verbalizing approach and responding to cues</p>
        </Card>

        <Card className="p-4 bg-white/5 border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-300 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-green-400" /> Efficiency
            </span>
            <span className="font-mono font-bold text-white">{rubrics.efficiency}%</span>
          </div>
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${rubrics.efficiency}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-400">Time & auxiliary space complexity optimization</p>
        </Card>
      </div>

      {/* Strengths & Growth Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <Card className="p-5 bg-black/30 border-white/10 space-y-3">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Key Strengths Observed
          </h3>
          <ul className="space-y-2 text-xs text-gray-300">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Growth Areas */}
        <Card className="p-5 bg-black/30 border-white/10 space-y-3">
          <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Areas for Growth & Bar-Raising
          </h3>
          <ul className="space-y-2 text-xs text-gray-300">
            {areasToImprove.map((area, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Optimal Solution Insights */}
      {optimalSolutionHints && (
        <Card className="p-5 bg-indigo-950/30 border-indigo-500/20 space-y-2 text-xs">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Optimal Bar-Raiser Approach
          </h3>
          <p className="text-indigo-200 leading-relaxed font-sans">
            {optimalSolutionHints}
          </p>
        </Card>
      )}

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="text-xs text-gray-400 font-mono">
          Session #{session.id.slice(-8)} • Problem: {session.problem.title}
        </div>
        <Button onClick={onRestart} className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white">
          <RotateCcw className="w-4 h-4" /> Start Another Mock Interview
        </Button>
      </div>
    </div>
  );
}
