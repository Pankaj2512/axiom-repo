import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { InterviewSession } from '@/types/interview';

const LOCAL_STORAGE_KEY = 'axiom_mock_interviews';

function getLocalHistory(): InterviewSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("Could not read interview sessions from localStorage:", e);
    return [];
  }
}

function saveLocalSession(session: InterviewSession) {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalHistory();
    const idx = current.findIndex(s => s.id === session.id);
    if (idx >= 0) {
      current[idx] = session;
    } else {
      current.unshift(session);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.warn("Could not save interview session to localStorage:", e);
  }
}

/**
 * Saves or creates a mock interview session in Firestore and localStorage fallback.
 */
export async function saveInterviewSession(session: InterviewSession): Promise<void> {
  saveLocalSession(session);
  try {
    if (session.userId && db) {
      const docRef = doc(db, 'users', session.userId, 'mock_interviews', session.id);
      await setDoc(docRef, session, { merge: true });
    }
  } catch (err) {
    console.warn("Firestore save failed, relied on localStorage fallback:", err);
  }
}

/**
 * Updates specific fields of an active interview session.
 */
export async function updateInterviewSession(
  userId: string,
  sessionId: string,
  data: Partial<InterviewSession>
): Promise<void> {
  if (typeof window !== 'undefined') {
    const current = getLocalHistory();
    const idx = current.findIndex(s => s.id === sessionId);
    if (idx >= 0) {
      current[idx] = { ...current[idx], ...data };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
    }
  }

  try {
    if (userId && db) {
      const docRef = doc(db, 'users', userId, 'mock_interviews', sessionId);
      await updateDoc(docRef, data);
    }
  } catch (err) {
    console.warn("Firestore update failed, relied on localStorage fallback:", err);
  }
}

/**
 * Retrieves a mock interview session by its ID.
 */
export async function getInterviewSession(
  userId: string,
  sessionId: string
): Promise<InterviewSession | null> {
  const local = getLocalHistory().find(s => s.id === sessionId);
  if (local) return local;

  try {
    if (userId && db) {
      const docRef = doc(db, 'users', userId, 'mock_interviews', sessionId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data() as InterviewSession;
      }
    }
  } catch (err) {
    console.warn("Firestore fetch failed:", err);
  }

  return null;
}

/**
 * Fetches all past mock interview sessions for a given user.
 */
export async function getUserInterviewHistory(userId: string): Promise<InterviewSession[]> {
  const localList = getLocalHistory().filter(s => !userId || s.userId === userId);

  try {
    if (userId && db) {
      const colRef = collection(db, 'users', userId, 'mock_interviews');
      const q = query(colRef);
      const snap = await getDocs(q);
      const remoteList = snap.docs.map(d => d.data() as InterviewSession);
      
      // Merge unique by ID
      const map = new Map<string, InterviewSession>();
      localList.forEach(item => map.set(item.id, item));
      remoteList.forEach(item => map.set(item.id, item));

      return Array.from(map.values()).sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  } catch (err) {
    console.warn("Firestore history fetch failed, returning localStorage list:", err);
  }

  return localList.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
