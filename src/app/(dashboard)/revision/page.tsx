'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SummaryGenerator } from '@/components/ai/SummaryGenerator';
import { Brain, CheckCircle2, XCircle, ChevronRight, HelpCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { calculateNextReview, createNewRevisionCard } from '@/lib/spacedRepetition';
import type { RecallRating, RevisionCard } from '@/types';

export default function RevisionPage() {
  const { user } = useAuth();
  
  // Mock data for UI testing. In reality, we'd fetch from Firestore via getDueRevisionCards
  const [cards, setCards] = React.useState<RevisionCard[]>([
    {
      id: 'rev-1',
      userId: 'user-1',
      itemId: 'two-sum',
      nextReviewDate: new Date().toISOString().split('T')[0],
      interval: 1,
      easeFactor: 2.5,
      repetitions: 1,
      lastRating: 'HARD',
      lastReviewDate: null
    }
  ]);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showAnswer, setShowAnswer] = React.useState(false);

  const currentCard = cards[currentIndex];

  const handleRating = (rating: RecallRating) => {
    if (!currentCard) return;
    
    // Calculate new SM-2 values
    const nextCardState = calculateNextReview(currentCard, rating);
    
    // TODO: Save nextCardState to Firestore using updateRevisionCard(user.uid, currentCard.itemId, nextCardState)
    
    // Move to next card
    setShowAnswer(false);
    setCurrentIndex(prev => prev + 1);
  };

  if (!currentCard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">All Caught Up!</h1>
        <p className="text-gray-400 mb-8">
          You have completed all your spaced repetition revisions for today. Take a break or explore new topics.
        </p>
        <Button onClick={() => window.location.href = '/syllabus'} className="w-full sm:w-auto">
          Explore Syllabus <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Today's Revision</h1>
          <p className="text-gray-400">Card {currentIndex + 1} of {cards.length}</p>
        </div>
        <div className="w-12 h-12 bg-[var(--accent-primary)]/10 rounded-full flex items-center justify-center">
          <Brain className="w-6 h-6 text-[var(--accent-primary)]" />
        </div>
      </div>

      <SummaryGenerator topicName="Data Structures / General Revision" />

      <Card className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-[var(--bg-secondary)]/50 backdrop-blur border border-white/5 relative overflow-hidden group">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--accent-primary)]/20 rounded-full blur-[100px] pointer-events-none transition-all duration-700 group-hover:bg-[var(--accent-primary)]/30" />
        
        <div className="relative z-10 w-full">
          <h2 className="text-2xl font-bold mb-4">Two Sum</h2>
          <p className="text-gray-400 mb-8">Array & Hashing • Easy</p>

          {!showAnswer ? (
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setShowAnswer(true)}
              className="mt-8 border-white/10 hover:bg-white/5 transition-all w-full max-w-xs"
            >
              Reveal Answer
            </Button>
          ) : (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-4 rounded-lg bg-black/40 border border-white/5 mb-8 text-left">
                <p className="text-sm font-mono text-[var(--accent-primary)] mb-2">Optimal Approach:</p>
                <p className="text-sm text-gray-300">
                  Use a hash map to store the difference `(target - currentNum)` as you iterate. If the current number exists in the map, you've found the pair. (O(n) time, O(n) space).
                </p>
              </div>

              <p className="text-sm text-gray-400 mb-4">How well did you recall this?</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleRating('AGAIN')}
                  className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                >
                  Again
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleRating('HARD')}
                  className="bg-orange-500/10 border-orange-500/20 text-orange-400 hover:bg-orange-500/20"
                >
                  Hard
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleRating('GOOD')}
                  className="bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20"
                >
                  Good
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleRating('EASY')}
                  className="bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20"
                >
                  Easy
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
