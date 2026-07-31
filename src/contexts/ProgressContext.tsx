'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getAllUserProgress, updateUserProgress } from '@/lib/firestore';
import { UserProgress } from '@/types';

interface ProgressContextType {
  progress: UserProgress[];
  isLoading: boolean;
  markComplete: (itemId: string, data?: Partial<UserProgress>) => Promise<void>;
  toggleComplete: (itemId: string, isCurrentlyComplete: boolean) => Promise<void>;
  getProgressForItem: (itemId: string) => UserProgress | undefined;
  refresh: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (loading) return;
    if (!user) {
      setIsLoading(false);
      setProgress([]);
      return;
    }
    try {
      setIsLoading(true);
      const data = await getAllUserProgress(user.uid);
      setProgress(data);
    } catch (err) {
      console.error('Failed to fetch progress', err);
    } finally {
      setIsLoading(false);
    }
  }, [user, loading]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const markComplete = async (itemId: string, data?: Partial<UserProgress>) => {
    if (!user) return;

    // Optimistic UI update
    setProgress(prev => {
      const existing = prev.find(p => p.itemId === itemId);
      if (existing) {
        return prev.map(p => p.itemId === itemId ? { ...p, status: 'COMPLETED', completedAt: new Date() } : p);
      } else {
        return [...prev, { id: itemId, userId: user.uid, itemId, status: 'COMPLETED', notes: '', solution: '', timeComplexity: '', spaceComplexity: '', completedAt: new Date(), updatedAt: new Date() } as UserProgress];
      }
    });

    await updateUserProgress(user.uid, itemId, {
      ...data,
      status: 'COMPLETED',
      completedAt: new Date()
    });

    // Refresh to ensure exact sync with server (in background)
    await fetchProgress();
  };

  const toggleComplete = async (itemId: string, isCurrentlyComplete: boolean) => {
    if (!user) return;

    const newStatus = isCurrentlyComplete ? 'NOT_STARTED' : 'COMPLETED';

    // Optimistic UI update
    setProgress(prev => {
      const existing = prev.find(p => p.itemId === itemId);
      if (existing) {
        return prev.map(p => p.itemId === itemId ? { ...p, status: newStatus, completedAt: isCurrentlyComplete ? null : new Date() } : p);
      } else {
        return [...prev, { id: itemId, userId: user.uid, itemId, status: newStatus, notes: '', solution: '', timeComplexity: '', spaceComplexity: '', completedAt: newStatus === 'COMPLETED' ? new Date() : null, updatedAt: new Date() } as UserProgress];
      }
    });

    await updateUserProgress(user.uid, itemId, {
      status: newStatus,
      completedAt: newStatus === 'COMPLETED' ? new Date() : null
    });

    // Keep in background so UI feels snappy
    fetchProgress();
  };

  const getProgressForItem = useCallback((itemId: string) => {
    return progress.find(p => p.itemId === itemId);
  }, [progress]);

  const value = {
    progress,
    isLoading,
    markComplete,
    toggleComplete,
    getProgressForItem,
    refresh: fetchProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgressContext() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgressContext must be used within a ProgressProvider');
  }
  return context;
}
