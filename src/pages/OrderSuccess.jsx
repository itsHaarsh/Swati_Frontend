import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders/${orderId}?populate=*`
        );
        const data = await response.json();
        setOrder(data.data);
      } catch (error) {
        console.error('Failed to fetch order');
      }
    };
    fetchOrder();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
        <h1 className="text-3xl font-light mb-4">Order Placed Successfully!</h1>
        <p className="text-stone-600 mb-8">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>

        {order && (
          <div className="bg-white p-6 rounded-lg text-left mb-8">
            <h2 className="text-xl font-medium mb-4">Order Details</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Order ID:</strong> {order.documentId}</p>
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Link to="/orders">
            <Button variant="outline">View Orders</Button>
          </Link>
          <Link to="/shop">
            <Button className="bg-stone-900 hover:bg-stone-800">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
