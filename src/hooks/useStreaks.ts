import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProfile, createUserProfile } from '@/lib/firestore';

export function useStreaks() {
  const { user } = useAuth();
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [activityMap, setActivityMap] = useState<Record<string, number>>({});

  const fetchStreaks = useCallback(async () => {
    if (!user) return;
    try {
      const profile = await getUserProfile(user.uid);
      if (profile && profile.streakData) {
        setCurrentStreak(profile.streakData.currentStreak);
        setLongestStreak(profile.streakData.longestStreak);
        setActivityMap(profile.streakData.activityMap || {});
      }
    } catch (err) {
      console.error('Failed to fetch streaks', err);
    }
  }, [user]);

  useEffect(() => {
    fetchStreaks();
  }, [fetchStreaks]);

  const logActivity = async () => {
    if (!user) return;
    try {
      const profile = await getUserProfile(user.uid);
      if (!profile) return;

      const today = new Date().toISOString().split('T')[0];
      const streakData = profile.streakData;

      const newActivityMap = { ...streakData.activityMap };
      newActivityMap[today] = (newActivityMap[today] || 0) + 1;

      let newCurrent = streakData.currentStreak;

      // If last active was yesterday, increment. If today, keep same. If older, reset to 1.
      const lastActive = new Date(streakData.lastActiveDate || 0);
      const todayDate = new Date(today);
      const diffTime = Math.abs(todayDate.getTime() - lastActive.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newCurrent += 1;
      } else if (diffDays > 1) {
        newCurrent = 1;
      } else if (!streakData.lastActiveDate) {
        newCurrent = 1;
      }

      const newLongest = Math.max(streakData.longestStreak, newCurrent);

      const newData = {
        streakData: {
          currentStreak: newCurrent,
          longestStreak: newLongest,
          lastActiveDate: today,
          activityMap: newActivityMap
        }
      };

      await createUserProfile(user.uid, newData); // setDoc with merge: true handles updates

      setCurrentStreak(newCurrent);
      setLongestStreak(newLongest);
      setActivityMap(newActivityMap);
    } catch (err) {
      console.error('Failed to log activity', err);
    }
  };

  return {
    currentStreak,
    longestStreak,
    activityMap,
    logActivity,
    refresh: fetchStreaks
  };
}
