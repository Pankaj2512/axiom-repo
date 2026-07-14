import { useProgressContext } from '@/contexts/ProgressContext';

export function useProgress() {
  // We simply re-export the context hook to avoid rewriting all the imports in existing components
  return useProgressContext();
}
