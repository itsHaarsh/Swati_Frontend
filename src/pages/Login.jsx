import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import logo from '@/assets/logo/swathi.png';

export const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(formData);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 animate-fade-in">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 sm:mb-12">
          <Link to="/" className="inline-flex items-center gap-2 sm:gap-3">
            <img src={logo} alt="Swathi" className="w-20 sm:w-24 h-auto" />
            <span className="text-lg sm:text-xl md:text-2xl tracking-wider font-light">SWATI</span>
          </Link>
        </div>

        <div className="border border-stone-200 p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl text-center mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-stone-600 text-center mb-8 sm:mb-12 tracking-wide text-sm">
            Sign in to your account
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <Label htmlFor="email" className="text-xs tracking-widest">EMAIL</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 border-stone-300 focus:border-stone-900 transition-colors h-12"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-xs tracking-widest">PASSWORD</Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="border-stone-300 focus:border-stone-900 transition-colors h-12 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-900"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="border-stone-300" />
                <span className="text-stone-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-stone-900 hover:text-stone-600 transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white py-4 sm:py-6 text-xs sm:text-sm tracking-widest transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </Button>
          </form>

          <div className="mt-6 sm:mt-8 text-center text-sm text-stone-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-stone-900 hover:text-stone-600 transition-colors">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
