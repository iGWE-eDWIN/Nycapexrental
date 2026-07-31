'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Building2, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('Nycapexrental@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');

      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw new Error(error.message);
      }

      // Store local session indicator for client navigation
      if (typeof window !== 'undefined') {
        localStorage.setItem('nycapex_admin_session', 'authenticated');
      }

      router.push('/admin');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory-white flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <header className="flex justify-between items-center max-w-6xl mx-auto w-full py-4">
        <Link href="/" className="flex items-center gap-2">
          <Building2 className="w-7 h-7 text-champagne-gold" />
          <span className="font-display text-2xl font-bold tracking-tight uppercase">
            Nycapex<span className="text-champagne-gold">rental</span>
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs uppercase font-semibold tracking-widest text-gray-400 hover:text-champagne-gold transition-colors"
        >
          Return to Site
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md bg-surface text-charcoal p-8 md:p-10 shadow-2xl border border-outline-variant/40">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-charcoal text-champagne-gold flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-display text-3xl font-bold text-charcoal">Admin Portal</h1>
            <p className="font-body text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">
              Nycapexrental Control Center
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 p-3 mb-6 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 text-sm bg-ivory-white border border-outline-variant/50 focus:outline-none focus:border-charcoal font-body"
                  placeholder="Nycapexrental@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 text-sm bg-ivory-white border border-outline-variant/50 focus:outline-none focus:border-charcoal font-body"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-charcoal text-ivory-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-champagne-gold hover:text-charcoal transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-[11px] text-gray-500">
              Need help access? Contact <span className="font-semibold">Nycapexrental@gmail.com</span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-4">
        © 2026 Nycapexrental Admin System. All rights reserved.
      </footer>
    </div>
  );
}
