import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User, Info, Sparkles } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser, signupUser } = useApp();
  const [isLoginTab, setIsLoginTab] = useState(true);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please fill in all credentials.');
      return;
    }

    if (isLoginTab) {
      const res = loginUser(email, password);
      if (!res.success) {
        setErrorMsg(res.message);
      }
    } else {
      if (!name.trim()) {
        setErrorMsg('Please enter your name.');
        return;
      }
      const res = signupUser(name, email, password);
      if (!res.success) {
        setErrorMsg(res.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      {/* Modal Container */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl p-6 sm:p-8 animate-scale-up space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Heading */}
        <div className="text-center space-y-1">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight mt-3">
            {isLoginTab ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs text-slate-400">
            {isLoginTab ? 'Login to continue ordering delicious meals' : 'Join BiteDash for fast, hot deliveries'}
          </p>
        </div>

        {/* Tab Headers */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-850">
          <button
            onClick={() => { setIsLoginTab(true); setErrorMsg(''); }}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
              isLoginTab ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setIsLoginTab(false); setErrorMsg(''); }}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
              !isLoginTab ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Field (Sign-up only) */}
          {!isLoginTab && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-9 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-orange-500 hover:border-slate-700 transition"
                  required
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="email"
                placeholder="suvidha@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-9 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-orange-500 hover:border-slate-700 transition"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-9 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-orange-500 hover:border-slate-700 transition"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-xs text-rose-500 font-semibold">{errorMsg}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:opacity-95 active:scale-98 transition duration-150"
          >
            {isLoginTab ? 'Access Account' : 'Register Account'}
          </button>
        </form>

        {/* Demo Helper Banner */}
        {isLoginTab && (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 flex gap-2.5 text-xs text-slate-400">
            <Info className="h-4.5 w-4.5 text-orange-500 flex-shrink-0" />
            <div>
              <span className="font-semibold text-slate-300">Demo Login Details:</span>
              <p className="mt-0.5 text-[11px] text-slate-505 leading-normal">
                Email: <code className="text-slate-300">suvidha@example.com</code><br/>
                Password: <code className="text-slate-300">123456</code>
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
