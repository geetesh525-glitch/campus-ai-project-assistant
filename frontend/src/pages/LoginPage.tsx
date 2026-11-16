import React, { useState } from 'react';
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sun,
  Moon,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface LoginPageProps {
  onSuccess: () => void;
  onExploreGuest: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess, onExploreGuest }) => {
  const { loginWithGoogle, loginWithEmail, loginAsDemoStudent } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both your university email and password.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      await loginWithEmail(email.trim(), password);
      onSuccess();
    } catch (err) {
      setError('Failed to authenticate with provided credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      onSuccess();
    } catch (err) {
      setError('Google sign-in encountered an issue.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginAsDemoStudent();
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#0B0F19] text-[#202938] dark:text-[#F3F4F6] flex flex-col justify-between font-sans transition-colors duration-200">
      {/* Top Bar with Brand & Theme Toggle */}
      <header className="h-16 px-6 border-b border-[#E5E9EF] dark:border-[#1F2937] bg-white dark:bg-[#111827] flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded bg-[#315B85] dark:bg-[#2563EB] flex items-center justify-center text-white">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-sm tracking-tight text-[#202938] dark:text-white">
              Campus AI
            </span>
            <span className="text-[10px] text-[#687386] dark:text-[#9CA3AF] ml-2 font-medium">
              Academic Portal Authentication
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md border border-[#E5E9EF] dark:border-[#374151] text-[#687386] dark:text-[#9CA3AF] hover:text-[#202938] dark:hover:text-white hover:bg-[#F7F8FA] dark:hover:bg-[#1E293B] transition-colors"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#F59E0B]" /> : <Moon className="w-4 h-4 text-[#315B85]" />}
          </button>

          <button
            onClick={onExploreGuest}
            className="text-xs font-medium text-[#687386] dark:text-[#9CA3AF] hover:text-[#202938] dark:hover:text-white px-2.5 py-1.5 transition-colors"
          >
            Preview Landing Page →
          </button>
        </div>
      </header>

      {/* Main Login Center Card */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md academic-card dark:bg-[#111827] dark:border-[#1F2937] p-8 shadow-sm">
          {/* Header & Academic Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] text-[11px] font-medium mb-3 border border-[#CBD5E1] dark:border-[#334155]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>University Single Sign-On (SSO)</span>
            </div>
            <h2 className="text-xl font-bold text-[#202938] dark:text-white">Sign In to Campus AI</h2>
            <p className="text-xs text-[#687386] dark:text-[#9CA3AF] mt-1">
              Access your collaborative multi-agent workspace, RAG documents, and viva preparation.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded bg-[#FBEAE9] dark:bg-[#7F1D1D]/30 border border-[#FFCDD2] dark:border-[#EF4444]/40 text-xs text-[#C45454] dark:text-[#FCA5A5]">
              {error}
            </div>
          )}

          {/* 1. Sign In With Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full flex items-center justify-center space-x-3 py-2.5 px-4 rounded border border-[#E5E9EF] dark:border-[#374151] bg-white dark:bg-[#1F2937] text-xs font-medium text-[#202938] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#374151] transition-all shadow-sm"
          >
            {/* Google Logo SVG */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{googleLoading ? 'Connecting to Google SSO...' : 'Continue with Google Account'}</span>
          </button>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E9EF] dark:border-[#1F2937]"></div>
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider text-[#687386] dark:text-[#9CA3AF]">
              <span className="bg-white dark:bg-[#111827] px-3">or sign in with email</span>
            </div>
          </div>

          {/* 2. Email & Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-medium text-[#202938] dark:text-[#E5E7EB] mb-1">
                University Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#687386] dark:text-[#9CA3AF] absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="academic-input w-full pl-9"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#202938] dark:text-[#E5E7EB] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#687386] dark:text-[#9CA3AF] absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="academic-input w-full pl-9"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#687386] dark:text-[#9CA3AF]">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-[#CBD5E1] dark:border-[#374151]" />
                <span>Remember session</span>
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Please contact your university IT department or use Demo Sign In.'); }} className="text-[#315B85] dark:text-[#60A5FA] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="academic-btn-primary w-full text-xs py-2.5 flex items-center justify-center space-x-1.5 shadow-sm mt-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In with University ID'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Sign-In Shortcut */}
          <div className="mt-5 pt-4 border-t border-[#E5E9EF] dark:border-[#1F2937]">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded bg-[#EAF1F8] dark:bg-[#1E293B] hover:bg-[#D5E4F2] dark:hover:bg-[#334155] text-xs font-semibold text-[#315B85] dark:text-[#60A5FA] transition-colors border border-[#CBD5E1] dark:border-[#374151]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>One-Click Demo Student Sign In</span>
            </button>
            <p className="text-[10px] text-center text-[#687386] dark:text-[#9CA3AF] mt-1.5">
              Instantly signs in as Geetesh Kumar (CS Undergraduate) with sample documents.
            </p>
          </div>
        </div>
      </main>

      {/* Institutional Security Footer */}
      <footer className="py-4 px-6 border-t border-[#E5E9EF] dark:border-[#1F2937] bg-white dark:bg-[#111827] text-xs text-[#687386] dark:text-[#9CA3AF] flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#32845A]" />
          <span>FERPA / GDPR Academic Privacy Compliant • 256-Bit SSL Encryption</span>
        </div>
        <div className="text-[11px]">
          Campus AI Intelligent Academic Assistant v1.0
        </div>
      </footer>
    </div>
  );
};
