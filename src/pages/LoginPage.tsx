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
  X,
  User,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface LoginPageProps {
  onSuccess: () => void;
  onExploreGuest: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess, onExploreGuest }) => {
  const { loginWithGoogleAccount, loginWithEmail, loginAsDemoStudent } = useAuth();
  const { toggleTheme, isDark } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleSigningIn, setGoogleSigningIn] = useState<string | null>(null);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [showCustomGoogleInput, setShowCustomGoogleInput] = useState(false);

  const googleAccounts = [
    {
      name: 'Geetesh Kumar',
      email: 'geetesh525@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
      institution: 'Department of Computer Science & Engineering',
      tag: 'Current User'
    },
    {
      name: 'Alex Morgan',
      email: 'alex.morgan@university.edu',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
      institution: 'Faculty of Computer Science & Engineering',
      tag: 'University Student'
    }
  ];

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

  const handleSelectGoogleAccount = (acc: { name: string; email: string; avatar?: string; institution?: string }) => {
    setGoogleSigningIn(acc.email);
    setTimeout(() => {
      loginWithGoogleAccount(acc);
      setShowGoogleModal(false);
      setGoogleSigningIn(null);
      onSuccess();
    }, 600);
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail.trim()) return;
    const name = customGoogleName.trim() || customGoogleEmail.split('@')[0];
    handleSelectGoogleAccount({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: customGoogleEmail.trim(),
      institution: 'Department of Computer Science & Engineering'
    });
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
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#315B85] to-[#6366F1] flex items-center justify-center text-white shadow-sm">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-[#202938] dark:text-white">
              Campus AI
            </span>
            <span className="text-[10px] text-[#687386] dark:text-[#9CA3AF] ml-2 font-medium">
              Academic Portal Authentication
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md border border-[#E5E9EF] dark:border-[#374151] text-[#687386] dark:text-[#9CA3AF] hover:text-[#202938] dark:hover:text-white hover:bg-[#F7F8FA] dark:hover:bg-[#1E293B] transition-colors"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#F59E0B]" /> : <Moon className="w-4 h-4 text-[#315B85]" />}
          </button>

          <button
            onClick={onExploreGuest}
            className="text-xs font-semibold text-[#315B85] dark:text-[#60A5FA] hover:underline px-2.5 py-1.5 transition-colors"
          >
            Preview Landing Page →
          </button>
        </div>
      </header>

      {/* Main Login Center Card */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white dark:bg-[#111827] border border-[#E5E9EF] dark:border-[#1F2937] rounded-2xl p-8 shadow-sm">
          {/* Header & Academic Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#EAF1F8] dark:bg-[#1E293B] text-[#315B85] dark:text-[#60A5FA] text-[11px] font-semibold mb-3 border border-[#CBD5E1] dark:border-[#334155]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#32845A]" />
              <span>University Single Sign-On (SSO)</span>
            </div>
            <h2 className="text-xl font-bold text-[#202938] dark:text-white">Sign In to Campus AI</h2>
            <p className="text-xs text-[#687386] dark:text-[#9CA3AF] mt-1">
              Access your collaborative multi-agent workspace, RAG documents, and viva preparation.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-[#FBEAE9] dark:bg-[#7F1D1D]/30 border border-[#FFCDD2] dark:border-[#EF4444]/40 text-xs text-[#C45454] dark:text-[#FCA5A5]">
              {error}
            </div>
          )}

          {/* 1. Sign In With Google Button */}
          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            className="w-full py-2.5 px-4 rounded-xl border border-[#CBD5E1] dark:border-[#334155] bg-white dark:bg-[#1E293B] hover:bg-[#F8FAFC] dark:hover:bg-[#334155]/60 text-[#202938] dark:text-white text-xs font-semibold flex items-center justify-center space-x-3 transition-all shadow-sm group"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E9EF] dark:border-[#1F2937]"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
              <span className="bg-white dark:bg-[#111827] px-2 text-[#687386] dark:text-[#9CA3AF]">
                or sign in with campus credentials
              </span>
            </div>
          </div>

          {/* 2. Email Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#202938] dark:text-gray-300 mb-1">
                Institutional Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white placeholder-[#94A3B8] focus:ring-2 focus:ring-[#315B85] focus:outline-none"
                />
                <Mail className="w-4 h-4 text-[#687386] dark:text-[#9CA3AF] absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202938] dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F7F8FA] dark:bg-[#161F30] text-[#202938] dark:text-white placeholder-[#94A3B8] focus:ring-2 focus:ring-[#315B85] focus:outline-none"
                />
                <Lock className="w-4 h-4 text-[#687386] dark:text-[#9CA3AF] absolute left-3 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[#315B85] hover:bg-[#27496B] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-sm transition-all"
            >
              {loading ? (
                <span>Verifying Student Records...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* 3. Instant One-Click Demo Button */}
          <div className="mt-5 pt-4 border-t border-[#E5E9EF] dark:border-[#1F2937]">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-3 rounded-lg bg-[#ECFDF5] dark:bg-[#064E3B]/40 hover:bg-[#D1FAE5] dark:hover:bg-[#064E3B]/60 text-[#059669] dark:text-[#34D399] border border-[#A7F3D0] dark:border-[#065F46] text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Access as Demo Student (Geetesh Kumar)</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-[#687386] dark:text-[#9CA3AF] border-t border-[#E5E9EF] dark:border-[#1F2937] bg-white dark:bg-[#111827]">
        Campus AI • Intelligent Academic Assistant for College & University Engineering
      </footer>

      {/* GOOGLE ACCOUNT SELECTION MODAL */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 text-center border-b border-gray-100 dark:border-gray-800 relative">
              <button
                onClick={() => setShowGoogleModal(false)}
                className="absolute right-4 top-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                  />
                </svg>
              </div>

              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Sign in with Google
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Choose an account to continue to Campus AI
              </p>
            </div>

            {/* Account List */}
            <div className="p-3 divide-y divide-gray-100 dark:divide-gray-800">
              {googleAccounts.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleSelectGoogleAccount(acc)}
                  disabled={!!googleSigningIn}
                  className="w-full p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 flex items-center space-x-3 transition-colors text-left group"
                >
                  <img
                    src={acc.avatar}
                    alt={acc.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-gray-900 dark:text-white truncate">
                        {acc.name}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-semibold">
                        {acc.tag}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {acc.email}
                    </div>
                  </div>

                  {googleSigningIn === acc.email && (
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin shrink-0"></div>
                  )}
                </button>
              ))}

              {/* Use Another Account Button / Form */}
              <div className="pt-2">
                {!showCustomGoogleInput ? (
                  <button
                    onClick={() => setShowCustomGoogleInput(true)}
                    className="w-full p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 flex items-center space-x-3 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Use another Google account
                    </span>
                  </button>
                ) : (
                  <form onSubmit={handleCustomGoogleSubmit} className="p-3 space-y-2.5">
                    <input
                      type="text"
                      placeholder="Your Full Name (e.g. Geetesh Kumar)"
                      value={customGoogleName}
                      onChange={(e) => setCustomGoogleName(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Google Email (e.g. user@gmail.com)"
                      value={customGoogleEmail}
                      onChange={(e) => setCustomGoogleEmail(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                      required
                    />
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCustomGoogleInput(false)}
                        className="px-3 py-1.5 rounded-lg border text-xs text-gray-600 dark:text-gray-300"
                      >
                        Back
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-gray-50 dark:bg-gray-900/50 text-center text-[10px] text-gray-400 border-t border-gray-100 dark:border-gray-800">
              Campus AI uses secure Google OAuth authentication
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
