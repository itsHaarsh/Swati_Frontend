import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, ChevronDown, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo/swathi.png';

export const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products?filters[$or][0][Name][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}&populate=*`
      );
      const data = await response.json();
      setSearchResults(data.data || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleProductClick = (productId) => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/shop/${productId}`);
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex justify-between items-center h-24 sm:h-28">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Swathi" className="w-16 sm:w-20 md:w-24 h-auto object-contain" />
              <span className="text-xl sm:text-2xl md:text-3xl tracking-wider font-light">SWATI</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              <Link to="/" className="text-xs tracking-widest hover-underline font-semibold">HOME</Link>
              <Link to="/shop" className="text-xs tracking-widest hover-underline font-semibold">SHOP</Link>
              <Link to="/about" className="text-xs tracking-widest hover-underline font-semibold">ABOUT</Link>
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
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    className="hover:bg-transparent p-2 flex items-center gap-2"
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline text-xs">{user?.FirstName || 'User'}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                  
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-lg shadow-lg py-2 z-50">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm hover:bg-stone-100"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-stone-100 text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
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

              {/* Mobile hamburger */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-transparent p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
        <div className={`absolute top-0 left-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between px-6 h-24 border-b border-stone-100">
            <span className="text-lg tracking-widest font-light">MENU</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="px-6 py-8 flex flex-col gap-6">
            <Link to="/" className="text-sm tracking-widest hover-underline font-semibold" onClick={() => setMobileMenuOpen(false)}>HOME</Link>
            <Link to="/shop" className="text-sm tracking-widest hover-underline font-semibold" onClick={() => setMobileMenuOpen(false)}>SHOP</Link>
            <Link to="/about" className="text-sm tracking-widest hover-underline font-semibold" onClick={() => setMobileMenuOpen(false)}>ABOUT</Link>
          </nav>
        </div>
      </div>

      {/* Search Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-50 transition-all duration-500 ${
          searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32">
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full text-2xl sm:text-3xl md:text-4xl border-b-2 border-stone-900 pb-3 sm:pb-4 focus:outline-none bg-transparent"
              autoFocus
            />
            <button
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery('');
                setSearchResults([]);
              }}
              className="absolute right-0 top-0 text-2xl sm:text-3xl md:text-4xl text-stone-400 hover:text-stone-900 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {searching && (
              <p className="text-center text-stone-500 py-8">Searching...</p>
            )}
            
            {!searching && searchQuery.length >= 2 && searchResults.length === 0 && (
              <p className="text-center text-stone-500 py-8">No products found</p>
            )}

            {searchResults.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {searchResults.map((product) => (
                  <button
                    key={product.documentId}
                    onClick={() => handleProductClick(product.documentId)}
                    className="flex gap-4 p-4 hover:bg-stone-50 transition-colors text-left border-b border-stone-100"
                  >
                    <div className="w-20 h-20 bg-stone-100 flex-shrink-0">
                      {product.ProductImage && (
                        <img 
                          src={`${import.meta.env.VITE_API_URL}${product.ProductImage.url}`} 
                          alt={product.Name} 
                          className="w-full h-full object-cover" 
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-1">{product.Name}</h3>
                      <p className="text-sm text-stone-500 mb-1 line-clamp-2">{product.description}</p>
                      <p className="text-sm font-medium">₹{product.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
