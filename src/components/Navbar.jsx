import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import logo from '@/assets/logo/swathi2.png';

export const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <img src={logo} alt="Swathi" className="h-8 sm:h-10 md:h-12 w-auto" />
              <span className="text-lg sm:text-xl md:text-2xl tracking-wider font-light">SWATHI</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              <Link to="/" className="text-xs tracking-widest hover-underline">
                HOME
              </Link>
              <Link to="/shop" className="text-xs tracking-widest hover-underline">
                SHOP
              </Link>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-transparent p-2"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-600">Welcome, {user?.firstName || 'User'}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hover:bg-transparent p-2"
                    onClick={handleLogout}
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="icon" className="hover:bg-transparent p-2">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              )}
              
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative hover:bg-transparent p-2">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-50 transition-all duration-500 ${
          searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full text-2xl sm:text-3xl md:text-4xl border-b-2 border-stone-900 pb-3 sm:pb-4 focus:outline-none bg-transparent"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute right-0 top-0 text-2xl sm:text-3xl md:text-4xl text-stone-400 hover:text-stone-900 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
