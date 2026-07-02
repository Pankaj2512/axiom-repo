import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getAllUserProgress, updateUserProgress } from '@/lib/firestore';
import { UserProgress } from '@/types';

export function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const data = await getAllUserProgress(user.uid);
      setProgress(data);
    } catch (err) {
      console.error('Failed to fetch progress', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const markComplete = async (itemId: string, data: Partial<UserProgress>) => {
    if (!user) return;
    await updateUserProgress(user.uid, itemId, {
      ...data,
      status: 'COMPLETED',
      completedAt: new Date()
    });
    await fetchProgress(); // Refresh local state
  };

  const getProgressForItem = (itemId: string) => {
    return progress.find(p => p.itemId === itemId);
  };

  return {
    progress,
    isLoading,
    markComplete,
    getProgressForItem,
    refresh: fetchProgress
  };
}
