import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import logo from '@/assets/logo/swathi2.png';

export const Footer = () => {
  return (
    <footer className="mt-32">
      <div className="bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-sm tracking-wider mb-6">SHOP</h3>
              <ul className="space-y-3 text-sm text-stone-600">
                <li><Link to="/shop" className="hover-underline transition-colors">All Products</Link></li>
                <li><Link to="/shop" className="hover-underline transition-colors">Skincare</Link></li>
                <li><Link to="/shop" className="hover-underline transition-colors">Body Care</Link></li>
                <li><Link to="/shop" className="hover-underline transition-colors">Wellness</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm tracking-wider mb-6">ABOUT</h3>
              <ul className="space-y-3 text-sm text-stone-600">
                <li><a href="#" className="hover-underline transition-colors">Our Story</a></li>
                <li><a href="#" className="hover-underline transition-colors">Ingredients</a></li>
                <li><a href="#" className="hover-underline transition-colors">Sustainability</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm tracking-wider mb-6">SUPPORT</h3>
              <ul className="space-y-3 text-sm text-stone-600">
                <li><a href="#" className="hover-underline transition-colors">Contact</a></li>
                <li><a href="#" className="hover-underline transition-colors">Shipping</a></li>
                <li><a href="#" className="hover-underline transition-colors">Returns</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm tracking-wider mb-6">CONNECT</h3>
              <div className="flex gap-4">
                <a href="#" className="text-stone-600 hover-underline transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-stone-600 hover-underline transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-stone-600 hover-underline transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs tracking-wider">
            <p>© SWATI, INC. 2026</p>
            <div className="flex gap-8">
              <a href="#" className="hover:opacity-70 transition-opacity">Terms & Conditions</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
