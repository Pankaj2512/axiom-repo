'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithGoogle, signInWithGithub } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If user is already logged in, redirect to dashboard
  React.useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) setError(error);
    setIsGoogleLoading(false);
  };

  const handleGithubSignIn = async () => {
    setIsGithubLoading(true);
    setError(null);
    const { error } = await signInWithGithub();
    if (error) setError(error);
    setIsGithubLoading(false);
  };

  if (loading || user) {
    return <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent-primary)] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent-secondary)] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md z-10 animate-slide-up">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] mb-2">
            Axiom
          </h1>
          <p className="text-[var(--text-secondary)]">Crack Your Dream Role</p>
        </div>

        <Card className="p-8 backdrop-blur-2xl border-[var(--border)] bg-opacity-40">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Welcome Back</h2>
          
          {error && (
            <div className="mb-4 p-3 rounded bg-[var(--error)] bg-opacity-20 border border-[var(--error)] text-[var(--error)] text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Button 
              variant="glass" 
              className="w-full h-12 flex items-center justify-center gap-3 text-[var(--text-primary)] transition-all hover:scale-[1.02]"
              onClick={handleGoogleSignIn}
              isLoading={isGoogleLoading}
              disabled={isGithubLoading}
            >
              {!isGoogleLoading && <Mail className="w-5 h-5 text-red-400" />}
              Continue with Google
            </Button>
            
            <Button 
              variant="glass" 
              className="w-full h-12 flex items-center justify-center gap-3 text-[var(--text-primary)] transition-all hover:scale-[1.02]"
              onClick={handleGithubSignIn}
              isLoading={isGithubLoading}
              disabled={isGoogleLoading}
            >
              {!isGithubLoading && (
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              )}
              Continue with GitHub
            </Button>
          </div>

          <p className="mt-8 text-center text-xs text-[var(--text-muted)]">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </Card>
      </div>
    </div>
  );
}
