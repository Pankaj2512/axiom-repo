import { RecallRating, RevisionCard } from '@/types';

// SM-2 Algorithm Implementation

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function calculateNextReview(card: RevisionCard, rating: RecallRating): RevisionCard {
  // rating maps: AGAIN=0, HARD=3, GOOD=4, EASY=5
  const ratingValueMap: Record<RecallRating, number> = {
    AGAIN: 0,
    HARD: 3,
    GOOD: 4,
    EASY: 5
  };
  
  const q = ratingValueMap[rating];
  let newInterval = card.interval;
  let newRepetitions = card.repetitions;
  let newEaseFactor = card.easeFactor;
  
  if (q < 3) {
    // Failed recall
    newRepetitions = 0;
    newInterval = 1;
  } else {
    // Successful recall
    if (newRepetitions === 0) {
      newInterval = 1;
    } else if (newRepetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(newInterval * newEaseFactor);
    }
    newRepetitions += 1;
  }
  
  // Calculate new ease factor
  newEaseFactor = newEaseFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  newEaseFactor = Math.max(1.3, newEaseFactor);
  
  const today = new Date();
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + newInterval);
  
  return {
    ...card,
    interval: newInterval,
    easeFactor: newEaseFactor,
    repetitions: newRepetitions,
    nextReviewDate: formatDate(nextDate),
    lastRating: rating,
    lastReviewDate: formatDate(today)
  };
}

export function getItemsDueForReview(cards: RevisionCard[], todayDateString?: string): RevisionCard[] {
  const today = todayDateString || formatDate(new Date());
  return cards.filter(card => card.nextReviewDate <= today);
}

export function createNewRevisionCard(userId: string, itemId: string): RevisionCard {
  return {
    id: `rev-${userId}-${itemId}`,
    userId,
    itemId,
    nextReviewDate: formatDate(new Date()), // Due immediately (or tomorrow based on preference)
    interval: 0,
    easeFactor: 2.5,
    repetitions: 0,
    lastRating: null,
    lastReviewDate: null
  };
}

export function isRevisionDay(dayOfWeek: number, settingDay: number): boolean {
  return dayOfWeek === settingDay;
}
