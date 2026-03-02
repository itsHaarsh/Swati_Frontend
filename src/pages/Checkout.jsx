import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    street: user?.Address || '',
    city: user?.City || '',
    state: user?.State || '',
    zipCode: user?.ZipCode || '',
    country: user?.Country || 'India',
  });

  const shipping = cartTotal > 500 ? 0 : 50;
  const tax = cartTotal * 0.1;
  const total = cartTotal + shipping + tax;

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderItemsText = cartItems.map(item => 
        `${item.Name || item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}`
      ).join('\n');

      const addressText = `${address.street}, ${address.city}, ${address.state} - ${address.zipCode}, ${address.country}`;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            user: user.id,
            orderItems: orderItemsText,
            totalAmount: total,
            shippingAddress: addressText,
            orderDate: new Date(),
          },
        }),
      });

      if (!response.ok) throw new Error('Order failed');

      const data = await response.json();
      clearCart();
      navigate(`/order-success/${data.data.documentId}`);
    } catch (error) {
      alert('Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-light mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Address */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg">
            <h2 className="text-xl font-medium mb-6">Shipping Address</h2>
            <div className="space-y-4">
              <div>
                <Label>Street Address</Label>
                <Input
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  placeholder="Enter street address"
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder="City"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    placeholder="State"
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Zip Code</Label>
                  <Input
                    value={address.zipCode}
                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                    placeholder="Zip Code"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    placeholder="Country"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg h-fit">
            <h2 className="text-xl font-medium mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.Name || item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2 text-sm">
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
                <div className="border-t pt-2">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-stone-900 hover:bg-stone-800 text-white py-6"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </Button>
              {shipping > 0 && (
                <p className="text-center text-xs text-stone-500">
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
