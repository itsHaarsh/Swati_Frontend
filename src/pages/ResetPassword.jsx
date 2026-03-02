import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import logo from '@/assets/logo/swathi.png';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Invalid reset link');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/create-accounts/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Password reset failed');
      }

      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 animate-fade-in">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 sm:mb-12">
          <Link to="/" className="inline-flex items-center gap-2 sm:gap-3">
            <img src={logo} alt="Swathi" className="h-12 sm:h-14 md:h-16 w-auto" />
            <span className="text-lg sm:text-xl md:text-2xl tracking-wider font-light">SWATI</span>
          </Link>
        </div>

        <div className="border border-stone-200 p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl text-center mb-2 tracking-tight">Reset Password</h2>
          <p className="text-stone-600 text-center mb-8 sm:mb-12 tracking-wide text-sm">
            Enter your new password
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <Label htmlFor="newPassword" className="text-xs tracking-widest">NEW PASSWORD</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="••••••••"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="mt-2 border-stone-300 focus:border-stone-900 transition-colors h-12"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-xs tracking-widest">CONFIRM PASSWORD</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="mt-2 border-stone-300 focus:border-stone-900 transition-colors h-12"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white py-4 sm:py-6 text-xs sm:text-sm tracking-widest transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? 'RESETTING...' : 'RESET PASSWORD'}
            </Button>
          </form>

          <div className="mt-6 sm:mt-8 text-center text-sm text-stone-600">
            Remember your password?{' '}
            <Link to="/login" className="text-stone-900 hover:text-stone-600 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
