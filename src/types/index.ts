// ============================================================
// Axiom — Core Type Definitions
// ============================================================

export type ItemStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REVISION_NEEDED';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type RecallRating = 'AGAIN' | 'HARD' | 'GOOD' | 'EASY';
export type TrackCategory = 'ENGINEERING' | 'CIVIL_SERVICES' | 'BANKING' | 'OTHER';
export type ItemType = 'QUESTION' | 'CONCEPT' | 'CASE_STUDY' | 'PROJECT' | 'VIDEO' | 'READING';
export type AuthProvider = 'google' | 'github';

export interface Track {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  category: TrackCategory;
  modules: Module[];
}

export interface Module {
  id: string;
  trackId: string;
  name: string;
  description: string;
  order: number;
  topics: Topic[];
}

export interface Topic {
  id: string;
  moduleId: string;
  name: string;
  description: string;
  order: number;
  items: Item[];
}

export interface Item {
  id: string;
  topicId: string;
  title: string;
  difficulty?: Difficulty;
  type: ItemType;
  externalUrl?: string;
  companyTags?: string[];
  patternTags?: string[];
  order: number;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  authProvider: AuthProvider;
  createdAt: Date;
  settings: UserSettings;
  streakData: StreakData;
}

export interface UserSettings {
  theme: 'dark' | 'light' | 'system';
  revisionDayOfWeek: number; // 0 = Sunday, 6 = Saturday
  dailyGoalMinutes: number;
  notifications: boolean;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  activityMap: Record<string, number>; // date -> count of items completed
}

export interface UserProgress {
  id: string;
  userId: string;
  itemId: string;
  trackId: string;
  moduleId: string;
  topicId: string;
  status: ItemStatus;
  notes: string;
  solution: string;
  timeComplexity: string;
  spaceComplexity: string;
  completedAt: Date | null;
  updatedAt: Date;
}

export interface CustomList {
  id: string;
  userId: string;
  name: string;
  description: string;
  itemIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RevisionCard {
  id: string;
  userId: string;
  itemId: string;
  nextReviewDate: string; // YYYY-MM-DD
  interval: number; // days
  easeFactor: number; // starts at 2.5
  repetitions: number;
  lastRating: RecallRating | null;
  lastReviewDate: string | null; // YYYY-MM-DD
}

export interface DashboardStats {
  totalItems: number;
  completedItems: number;
  inProgressItems: number;
  revisionDueToday: number;
  overallPercentage: number;
  categoryBreakdown: CategoryStat[];
}

export interface CategoryStat {
  trackId: string;
  trackName: string;
  totalItems: number;
  completedItems: number;
  percentage: number;
  color: string;
}
