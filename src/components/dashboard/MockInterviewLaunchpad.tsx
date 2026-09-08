'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Bot, Sparkles, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';

export function MockInterviewLaunchpad() {
  return (
    <Card className="p-6 relative overflow-hidden bg-gradient-to-r from-indigo-950/70 via-purple-950/50 to-black/60 border border-indigo-500/25 shadow-xl">
      <div className="absolute right-0 top-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 text-xs gap-1 py-0.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              New Feature
            </Badge>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Real-time FAANG Bar-Raiser AI
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Simulate a Live FAANG Technical Interview
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Practice 45-minute coding rounds tailored to Google, Meta, and Amazon interview styles. Chat with an AI interviewer who gives Socratic hints and produces an official 4-pillar scorecard.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-purple-400" /> 45m Timed Round
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Bot className="w-3.5 h-3.5 text-indigo-400" /> Conversational Cues
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-400" /> Hire / No Hire Scorecard
            </span>
          </div>
        </div>

        <Link href="/mock-interview" className="flex-shrink-0 w-full md:w-auto">
          <Button className="w-full md:w-auto gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 px-6 py-2.5">
            <span>Enter Mock Arena</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
