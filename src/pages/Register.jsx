import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import logo from '@/assets/logo/swathi.png';

export const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    agreeOrNot: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePassword = (password) => {
    const hasCapital = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasCapital && hasNumber && hasSymbol && password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validatePassword(formData.password)) {
      setError('Password must contain at least 8 characters, 1 capital letter, 1 number, and 1 symbol');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const result = await register(formData);
    if (result.success) {
      setSuccess('Account created successfully! Please login.');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: fieldValue });
    
    // Auto-set username to email
    if (name === 'email') {
      setFormData(prev => ({ ...prev, email: value, username: value }));
    }
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
          <h2 className="text-2xl sm:text-3xl text-center mb-6 sm:mb-8 tracking-tight">Create Account</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded text-sm">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-xs tracking-widest">FIRST NAME</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-2 border-stone-300 focus:border-stone-900 transition-colors h-12"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="lastName" className="text-xs tracking-widest">LAST NAME</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-2 border-stone-300 focus:border-stone-900 transition-colors h-12"
                />
              </div>
            </div>

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
              <Label htmlFor="phoneNumber" className="text-xs tracking-widest">PHONE NUMBER</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="+1234567890"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-2 border-stone-300 focus:border-stone-900 transition-colors h-12"
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
              <p className="text-xs text-stone-500 mt-1">Min 8 chars, 1 capital, 1 number, 1 symbol</p>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-xs tracking-widest">CONFIRM PASSWORD</Label>
              <div className="relative mt-2">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border-stone-300 focus:border-stone-900 transition-colors h-12 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-900"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs sm:text-sm">
              <input 
                type="checkbox" 
                name="agreeOrNot"
                checked={formData.agreeOrNot}
                onChange={handleChange}
                className="mt-1 border-stone-300" 
                required 
              />
              <span className="text-stone-600 leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-stone-900 hover:text-stone-600 transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-stone-900 hover:text-stone-600 transition-colors">
                  Privacy Policy
                </a>
              </span>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white py-4 sm:py-6 text-xs sm:text-sm tracking-widest transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </Button>
          </form>

          <div className="mt-6 sm:mt-8 text-center text-sm text-stone-600">
            Already have an account?{' '}
            <Link to="/login" className="text-stone-900 hover:text-stone-600 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
