import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { fetchAllPages } from '@/services/api';

export const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const allOrders = await fetchAllPages(
          `${API_URL}/api/orders?filters[user][id][$eq]=${user.id}&populate=*&sort=orderDate:desc`
        );
        setOrders(allOrders);
      } catch (error) {
        console.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-light mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500 mb-4">No orders yet</p>
            <Link to="/shop" className="text-stone-900 hover:underline">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.documentId} className="bg-white p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-stone-500">Order ID: {order.documentId}</p>
                    <p className="text-sm text-stone-500">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{order.totalAmount}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm font-medium mb-2">Items:</p>
                  {order.orderItems?.map((item, idx) => (
                    <p key={idx} className="text-sm text-stone-600">
                      {item.Name} x {item.quantity}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
