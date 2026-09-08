'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SummaryGenerator } from '@/components/ai/SummaryGenerator';
import { 
  Brain, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  Sparkles, 
  RotateCcw,
  BookOpen,
  Calendar,
  Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRevisionQueue } from '@/hooks/useRevisionQueue';
import { useProgress } from '@/hooks/useProgress';
import { findItemDetails } from '@/lib/syllabus';
import type { RecallRating } from '@/types';

export default function RevisionPage() {
  const { user } = useAuth();
  const { dueCards, isLoading, reviewItem, refresh } = useRevisionQueue();
  const { getProgressForItem } = useProgress();

  const [showAnswer, setShowAnswer] = React.useState(false);
  const [reviewedSessionCount, setReviewedSessionCount] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Active card is always the first due card, or null when empty
  const currentCard = dueCards.length > 0 ? dueCards[0] : null;

  const currentDetails = React.useMemo(() => {
    if (!currentCard) return null;
    return findItemDetails(currentCard.itemId);
  }, [currentCard]);

  const currentProgress = React.useMemo(() => {
    if (!currentCard) return null;
    return getProgressForItem(currentCard.itemId);
  }, [currentCard, getProgressForItem]);

  const handleRating = async (rating: RecallRating) => {
    if (!currentCard || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await reviewItem(currentCard.itemId, rating, currentCard);
      setShowAnswer(false);
      setReviewedSessionCount(prev => prev + 1);
    } catch (err) {
      console.error("Failed to update revision rating:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-3"></div>
        <p className="text-sm text-gray-400">Loading your spaced repetition queue...</p>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold mb-3 text-white">All Caught Up!</h1>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          {reviewedSessionCount > 0 
            ? `Fantastic work! You reviewed ${reviewedSessionCount} card${reviewedSessionCount === 1 ? '' : 's'} in this session. All scheduled revisions for today are complete.`
            : 'You have no flashcards due for spaced review today. Keep solving new topics in the syllabus to automatically schedule daily revisions!'}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link href="/syllabus" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto gap-2">
              <BookOpen className="w-4 h-4" /> Explore Syllabus
            </Button>
          </Link>
          <Button variant="outline" onClick={refresh} className="w-full sm:w-auto gap-2">
            <RotateCcw className="w-4 h-4" /> Check Again
          </Button>
        </div>
      </div>
    );
  }

  const difficultyVariant = 
    currentDetails?.item.difficulty === 'HARD' ? 'hard' : 
    currentDetails?.item.difficulty === 'EASY' ? 'easy' : 'medium';

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-white">Spaced Revision</h1>
          <p className="text-sm text-gray-400">
            {dueCards.length} {dueCards.length === 1 ? 'card' : 'cards'} remaining today
            {reviewedSessionCount > 0 && ` • ${reviewedSessionCount} completed`}
          </p>
        </div>
        <div className="w-12 h-12 bg-[var(--accent-primary)]/10 rounded-full flex items-center justify-center shadow-inner">
          <Brain className="w-6 h-6 text-[var(--accent-primary)]" />
        </div>
      </div>

      {/* AI Summary Generator for Topic */}
      <SummaryGenerator 
        topicName={currentDetails?.topic.name || currentDetails?.item.title || "Topic Revision"} 
      />

      {/* Main Flashcard */}
      <Card className="min-h-[420px] flex flex-col justify-between p-8 bg-[var(--bg-secondary)]/60 backdrop-blur border border-white/10 relative overflow-hidden group shadow-2xl">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--accent-primary)]/15 rounded-full blur-[100px] pointer-events-none transition-all duration-700 group-hover:bg-[var(--accent-primary)]/25" />
        
        {/* Card Header & Metadata */}
        <div className="relative z-10 w-full space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-mono">
              Interval: {currentCard.interval}d • Repetition #{currentCard.repetitions}
            </span>
            <div className="flex items-center gap-2">
              <Badge variant={difficultyVariant}>
                {currentDetails?.item.difficulty || 'MEDIUM'}
              </Badge>
              {currentDetails?.item.externalUrl && (
                <a
                  href={currentDetails.item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors p-1"
                  title="Open Problem"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div className="text-center pt-4 pb-2">
            <p className="text-xs uppercase tracking-wider text-[var(--accent-primary)] font-semibold mb-2">
              {currentDetails ? `${currentDetails.track.name} • ${currentDetails.topic.name}` : 'Syllabus Review'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {currentDetails?.item.title || currentCard.itemId}
            </h2>
            {currentDetails?.item.patternTags && currentDetails.item.patternTags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {currentDetails.item.patternTags.map(tag => (
                  <span key={tag} className="text-[11px] bg-white/5 border border-white/5 px-2 py-0.5 rounded text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card Body & Answer Toggle */}
        <div className="relative z-10 w-full my-4">
          {!showAnswer ? (
            <div className="text-center py-6">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setShowAnswer(true)}
                className="border-white/10 hover:bg-white/5 transition-all w-full max-w-xs shadow-lg"
              >
                Reveal Answer & Solution
              </Button>
            </div>
          ) : (
            <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-400">
              {/* Solution / Note Content */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-left space-y-2">
                <p className="text-xs font-mono font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
                  Optimal Approach & Patterns:
                </p>
                {currentProgress?.notes ? (
                  <div className="text-sm text-gray-200 whitespace-pre-wrap font-sans leading-relaxed">
                    {currentProgress.notes}
                  </div>
                ) : (
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Recall the optimal time/space complexity, data structure representation, and edge-case handling for <span className="font-semibold text-white">{currentDetails?.item.title || currentCard.itemId}</span>.
                  </p>
                )}

                {(currentProgress?.timeComplexity || currentProgress?.spaceComplexity) && (
                  <div className="flex gap-4 pt-2 text-xs font-mono text-gray-400 border-t border-white/5">
                    {currentProgress.timeComplexity && (
                      <span>Time: <strong className="text-green-400">{currentProgress.timeComplexity}</strong></span>
                    )}
                    {currentProgress.spaceComplexity && (
                      <span>Space: <strong className="text-blue-400">{currentProgress.spaceComplexity}</strong></span>
                    )}
                  </div>
                )}
              </div>

              {/* SM-2 Recall Rating Buttons */}
              <div className="pt-2 text-center">
                <p className="text-xs text-gray-400 mb-3">How easily did you recall this solution?</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <Button 
                    variant="outline" 
                    disabled={isSubmitting}
                    onClick={() => handleRating('AGAIN')}
                    className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs py-2 h-auto"
                  >
                    <div>
                      <div className="font-bold">Again</div>
                      <div className="text-[10px] opacity-70">&lt; 1 day</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    disabled={isSubmitting}
                    onClick={() => handleRating('HARD')}
                    className="bg-orange-500/10 border-orange-500/20 text-orange-400 hover:bg-orange-500/20 text-xs py-2 h-auto"
                  >
                    <div>
                      <div className="font-bold">Hard</div>
                      <div className="text-[10px] opacity-70">1-2 days</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    disabled={isSubmitting}
                    onClick={() => handleRating('GOOD')}
                    className="bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20 text-xs py-2 h-auto"
                  >
                    <div>
                      <div className="font-bold">Good</div>
                      <div className="text-[10px] opacity-70">~6 days</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    disabled={isSubmitting}
                    onClick={() => handleRating('EASY')}
                    className="bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20 text-xs py-2 h-auto"
                  >
                    <div>
                      <div className="font-bold">Easy</div>
                      <div className="text-[10px] opacity-70">&gt; 10 days</div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/5">
          <span>Axiom Spaced Repetition (SM-2)</span>
          {currentDetails?.item.id && (
            <Link 
              href={`/item/${currentDetails.item.id}`}
              className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              Open Full Problem Page <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </Card>
    </div>
  );
}

