'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/account/profile';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else if (data?.user) {
        router.push(next);
        router.refresh();
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block mb-3">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.4)]">
              <span className="font-mono font-bold text-white text-base">CG</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white font-mono">
              CRIMSON<span className="text-rose-500">GHOUL</span>
            </span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold text-white tracking-tight">Access Your Terminal</h1>
        <p className="text-xs text-slate-400 mt-1">Sign in to track orders, manage wishlists, and checkout</p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center gap-3">
          <svg className="w-4 h-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
            Account Email
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="operator@crimsonghoul.io"
            required
            className="w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">
              Password
            </label>
          </div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            className="w-full"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading}
          className="w-full justify-center mt-2"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </Button>
      </form>

      {/* Footer Link */}
      <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-400">
        Need an operative account?{' '}
        <Link href={`/register?next=${encodeURIComponent(next)}`} className="text-rose-400 hover:text-rose-300 font-semibold transition-colors">
          Register Here
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex items-center justify-center px-4 py-24">
      <Suspense fallback={<div className="text-slate-400 text-xs font-mono">Loading authentication portal...</div>}>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
