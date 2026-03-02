import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/components/CartItem';
import { useCart } from '@/context/CartContext';

export const Cart = () => {
  const { cartItems, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-stone-300 mx-auto mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-3xl mb-3 sm:mb-4 tracking-tight">Your bag is empty</h2>
          <p className="text-stone-600 mb-6 sm:mb-8 tracking-wide">Start adding products to your bag</p>
          <Link to="/shop">
            <Button className="bg-stone-900 hover:bg-stone-800 text-white px-8 sm:px-12 py-4 sm:py-6 text-xs sm:text-sm tracking-widest transition-colors duration-300">
              SHOP NOW
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const shipping = cartTotal > 500 ? 0 : 50;
  const tax = cartTotal * 0.1;
  const total = cartTotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Link to="/shop" className="inline-flex items-center text-stone-600 hover:text-stone-900 mb-8 sm:mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-xs sm:text-sm tracking-wide">CONTINUE SHOPPING</span>
        </Link>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-8 sm:mb-12 tracking-tight">Shopping Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="border border-stone-200 p-4 sm:p-6 lg:p-8 sticky top-24">
              <h2 className="text-lg sm:text-xl mb-6 sm:mb-8 tracking-tight">Order Summary</h2>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-600">Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-stone-200 pt-3 sm:pt-4">
                  <div className="flex justify-between text-base sm:text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout" className="block">
                <Button className="w-full bg-stone-900 hover:bg-stone-800 text-white py-4 sm:py-6 text-xs sm:text-sm tracking-widest transition-colors duration-300 mb-3 sm:mb-4">
                  CHECKOUT
                </Button>
              </Link>

              {shipping > 0 && (
                <p className="text-center text-xs text-stone-500 tracking-wide">
                  Free shipping on orders over ₹500
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
