import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getDueRevisionCards, updateRevisionCard } from '@/lib/firestore';
import { RevisionCard } from '@/types';
import { calculateNextReview } from '@/lib/spacedRepetition';

export function useRevisionQueue() {
  const { user } = useAuth();
  const [dueCards, setDueCards] = useState<RevisionCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDueCards = useCallback(async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const data = await getDueRevisionCards(user.uid, today);
      setDueCards(data);
    } catch (err) {
      console.error('Failed to fetch revision queue', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDueCards();
  }, [fetchDueCards]);

  const reviewItem = async (itemId: string, rating: 'AGAIN' | 'HARD' | 'GOOD' | 'EASY', card: RevisionCard) => {
    if (!user) return;
    
    // Calculate new SM-2 intervals
    const updatedCard = calculateNextReview(card, rating);
    
    await updateRevisionCard(user.uid, itemId, updatedCard);
    
    // Remove from current queue since it's been reviewed
    setDueCards(prev => prev.filter(c => c.itemId !== itemId));
  };

  return {
    dueCards,
    isLoading,
    reviewItem,
    refresh: fetchDueCards
  };
}
