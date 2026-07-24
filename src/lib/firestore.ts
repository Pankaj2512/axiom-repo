import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  deleteDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from './firebase';
import type { UserProfile, UserProgress, RevisionCard, CustomList, UserNote } from '@/types';

// ==========================================
// USER PROFILE
// ==========================================
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
};

export const createUserProfile = async (uid: string, data: Partial<UserProfile>): Promise<void> => {
  const docRef = doc(db, 'users', uid);
  const now = new Date();
  const defaultProfile: Partial<UserProfile> = {
    uid,
    createdAt: now,
    settings: {
      theme: 'dark',
      revisionDayOfWeek: 0, // Sunday
      dailyGoalMinutes: 60,
      notifications: true,
    },
    streakData: {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: '',
      activityMap: {},
    },
    ...data
  };
  // Use setDoc with merge to avoid overwriting if it exists somehow
  await setDoc(docRef, defaultProfile, { merge: true });
};

// ==========================================
// USER PROGRESS (Subcollection)
// ==========================================
export const updateUserProgress = async (uid: string, itemId: string, data: Partial<UserProgress>): Promise<void> => {
  const docRef = doc(db, 'users', uid, 'progress', itemId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  } else {
    await setDoc(docRef, {
      id: itemId,
      userId: uid,
      itemId,
      status: 'IN_PROGRESS',
      notes: '',
      solution: '',
      timeComplexity: '',
      spaceComplexity: '',
      completedAt: null,
      updatedAt: new Date(),
      ...data
    });
  }
};

export const getUserProgress = async (uid: string, itemId: string): Promise<UserProgress | null> => {
  const docRef = doc(db, 'users', uid, 'progress', itemId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProgress;
  }
  return null;
};

export const getAllUserProgress = async (uid: string): Promise<UserProgress[]> => {
  const progressRef = collection(db, 'users', uid, 'progress');
  const q = query(progressRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => doc.data() as UserProgress);
};

// ==========================================
// REVISION CARDS (Subcollection)
// ==========================================
export const updateRevisionCard = async (uid: string, itemId: string, data: Partial<RevisionCard>): Promise<void> => {
  const docRef = doc(db, 'users', uid, 'revision_cards', itemId);
  // Merge so we don't accidentally overwrite
  await setDoc(docRef, data, { merge: true });
};

export const getDueRevisionCards = async (uid: string, dateStr: string): Promise<RevisionCard[]> => {
  // Query all cards where nextReviewDate <= today
  const cardsRef = collection(db, 'users', uid, 'revision_cards');
  const q = query(cardsRef, where('nextReviewDate', '<=', dateStr));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => doc.data() as RevisionCard);
};

// ==========================================
// CUSTOM LISTS (Subcollection)
// ==========================================
export const createCustomList = async (uid: string, listId: string, data: Partial<CustomList>): Promise<void> => {
  const docRef = doc(db, 'users', uid, 'custom_lists', listId);
  await setDoc(docRef, {
    id: listId,
    userId: uid,
    itemIds: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data
  });
};

export const getUserCustomLists = async (uid: string): Promise<CustomList[]> => {
  const listsRef = collection(db, 'users', uid, 'custom_lists');
  const q = query(listsRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as CustomList);
};

export const addToList = async (uid: string, listId: string, itemId: string) => {
  const listRef = doc(db, 'users', uid, 'custom_lists', listId);
  await updateDoc(listRef, {
    itemIds: arrayUnion(itemId),
    updatedAt: new Date()
  });
};

export const removeFromList = async (uid: string, listId: string, itemId: string) => {
  const listRef = doc(db, 'users', uid, 'custom_lists', listId);
  await updateDoc(listRef, {
    itemIds: arrayRemove(itemId),
    updatedAt: new Date()
  });
};

// ==========================================
// NOTES (Subcollection)
// ==========================================

export const createNote = async (uid: string, title: string, content: string, topicId?: string): Promise<string> => {
  const notesRef = collection(db, 'users', uid, 'notes');
  const newNoteRef = doc(notesRef);
  await setDoc(newNoteRef, {
    id: newNoteRef.id,
    userId: uid,
    title,
    content,
    topicId: topicId || null,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
  return newNoteRef.id;
};

export const updateNote = async (uid: string, noteId: string, title: string, content: string) => {
  const noteRef = doc(db, 'users', uid, 'notes', noteId);
  await updateDoc(noteRef, {
    title,
    content,
    updatedAt: Date.now()
  });
};

export const getUserNotes = async (uid: string): Promise<UserNote[]> => {
  const notesRef = collection(db, 'users', uid, 'notes');
  const q = query(notesRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as UserNote);
};

export const deleteNote = async (uid: string, noteId: string) => {
  await deleteDoc(doc(db, 'users', uid, 'notes', noteId));
};
