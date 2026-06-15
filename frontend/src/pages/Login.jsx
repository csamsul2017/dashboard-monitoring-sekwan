import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Building2, AlertCircle, CheckCircle, ChevronRight, ShieldCheck } from 'lucide-react';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Interactive States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Username dan password wajib diisi.');
      return;
    }

    setIsLoading(true);

    // Simulate Corporate API Request
    setTimeout(() => {
      if ((username.toLowerCase() === 'admin' || username === 'admin@sekwan.go.id') && password === 'admin123') {
        setIsLoading(false);
        setSuccess(true);
        setTimeout(() => {
          onLoginSuccess({
            name: 'Administrator Sekwan',
            email: 'admin@sekwan.go.id',
            role: 'Super Admin',
            lastLogin: new Date().toLocaleString('id-ID'),
          });
        }, 1200);
      } else {
        setIsLoading(false);
        setError('Kredensial salah. Gunakan admin / admin123 untuk demo.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col justify-center items-center p-6 font-sans relative overflow-hidden">
      {/* Subtle top background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-blue-500/[0.05] blur-[100px] pointer-events-none"></div>

      {/* Brand Header */}
      <div className="flex flex-col items-center mb-8 space-y-3 z-10">
        <div className="w-11 h-11 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shadow-md">
          <Building2 className="w-5 h-5 text-blue-600" />
        </div>
        {/* <div className="text-center">
          <h1 className="text-slate-800 font-extrabold tracking-wider text-base uppercase">SEKWAN MONITORING</h1>
          <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">Sekretariat DPRD Portal</p>
        </div> */}
      </div>

      {/* Minimalist Card */}
      <div className="w-full max-w-[420px] bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-100 z-10">
        {/* Title */}
        <div className="mb-6">
          <h2 className="text-lg font-extrabold text-slate-900">Sign In</h2>
          <p className="text-xs text-slate-500 mt-1">Masukkan akun Anda untuk melanjutkan ke dasbor.</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="flex items-start space-x-2.5 p-3.5 mb-5 rounded-xl bg-red-50 border border-red-100 text-red-800 text-xs">
            <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Gagal Masuk</p>
              <p className="text-red-700 mt-0.5 text-[11px]">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="flex items-start space-x-2.5 p-3.5 mb-5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs">
            <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Berhasil</p>
              <p className="text-emerald-700 mt-0.5 text-[11px]">Membuka dasbor pemantauan Anda...</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="space-y-1">
            <label className="text-slate-600 text-[10px] font-bold uppercase tracking-wider block" htmlFor="username">
              Username atau Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={isLoading || success}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-400 text-xs transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-slate-600 text-[10px] font-bold uppercase tracking-wider block" htmlFor="password">
                Kata Sandi
              </label>
              <a
                href="#forgot"
                onClick={e => {
                  e.preventDefault();
                  setError('Silakan hubungi administrator IT.');
                }}
                className="text-[10px] text-blue-600 hover:text-blue-500 hover:underline transition-colors"
              >
                Lupa sandi?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading || success}
                className="w-full pl-9 pr-9 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-400 text-xs transition-all"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLoading || success} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center pt-1">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              disabled={isLoading || success}
              className="w-3.5 h-3.5 rounded border-slate-300 text-blue-650 focus:ring-blue-500 transition-all cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 text-[11px] text-slate-500 select-none cursor-pointer">
              Ingat akun saya
            </label>
          </div>

          {/* Submit */}
          <button
            id="submit-btn"
            type="submit"
            disabled={isLoading || success}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-blue-100"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Memproses...</span>
              </>
            ) : success ? (
              <span>Mengalihkan...</span>
            ) : (
              <>
                <span>Masuk Aplikasi</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer Info */}
      <div className="mt-8 flex items-center space-x-2 text-[10px] text-slate-400 z-10">
        <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
        <span>Koneksi Terenkripsi SSL &bull; &copy; {new Date().getFullYear()} Sekretariat DPRD</span>
      </div>
    </div>
  );
}

export default Login;
