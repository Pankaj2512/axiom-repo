import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from './firebase';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error: unknown) {
    console.error("Error signing in with Google:", error);
    return { user: null, error: 'An error occurred during Google sign in.' };
  }
};

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return { user: result.user, error: null };
  } catch (error: unknown) {
    console.error("Error signing in with GitHub:", error);
    return { user: null, error: 'An error occurred during GitHub sign in.' };
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error: unknown) {
    console.error("Error signing out:", error);
    return { error: 'An error occurred during sign out.' };
  }
};
