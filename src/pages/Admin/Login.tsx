import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-electric/30 border-t-electric rounded-full animate-spin" />
          <p className="text-slate-400 font-medium">Preparing secure access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full glass p-8 rounded-3xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-electric/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-electric" />
          </div>
          <h1 className="text-3xl font-bold text-white font-[Poppins]">Admin Portal</h1>
          <p className="text-slate-400 mt-2">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-electric hover:bg-electric/90 text-white font-bold py-3 rounded-xl transition-all hover-lift"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
