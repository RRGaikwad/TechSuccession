import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, Check, ShieldCheck, AlertTriangle } from 'lucide-react';

const ManageSettings = () => {
  const { updateAdminPassword } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters long' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match' });
      return;
    }

    setIsLoading(true);
    try {
      await updateAdminPassword(newPassword);
      setStatus({ type: 'success', message: 'Password updated successfully! Next time you login, use your new password.' });
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to update password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-[Poppins]">Admin Settings</h1>
        <p className="text-slate-400">Manage your administrative access and security</p>
      </div>

      <div className="grid gap-6">
        {/* Security Info Card */}
        <div className="glass p-6 rounded-2xl border-l-4 border-electric/50">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-electric" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Access Security</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your admin password is now stored securely in Firebase Firestore. 
                This ensures that your changes sync across all devices instantly. 
                Keep your password safe as it provides full control over your portfolio content.
              </p>
            </div>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="glass p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-electric" />
            <h2 className="text-xl font-bold text-white">Change Admin Password</h2>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {status.type && (
              <div className={`p-4 rounded-xl flex items-center gap-3 ${
                status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {status.type === 'success' ? <Check className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
                <p className="text-sm">{status.message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="bg-electric hover:bg-electric/90 text-white font-bold py-3 px-8 rounded-xl transition-all hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Check className="w-5 h-5" />
              )}
              Update Password
            </button>
          </form>
        </div>

        {/* Warning Card */}
        <div className="bg-orange-500/5 border border-orange-500/20 p-4 rounded-xl">
          <p className="text-xs text-orange-400 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            Warning: Changing your password will affect all devices currently logged in. 
            If you forget your password, you will need to manually update the 'settings' document in your Firebase Console.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageSettings;
