import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 sm:py-8 border-b border-stone-200">
      <img
        src={item.image}
        alt={item.name}
        className="w-full sm:w-24 md:w-32 h-32 sm:h-32 md:h-40 object-cover bg-stone-100"
      />
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs tracking-widest text-stone-500 mb-2">{item.category}</p>
          <h3 className="text-sm sm:text-base tracking-wide mb-3 sm:mb-4">{item.name}</h3>
        </div>

        <div className="flex items-center justify-between sm:justify-start sm:gap-4">
          <div className="flex items-center border border-stone-300">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-stone-100"
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="w-10 sm:w-12 text-center text-sm">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-stone-100"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3 sm:hidden">
            <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(item.id)}
              className="hover:bg-transparent p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex flex-col justify-between items-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromCart(item.id)}
          className="hover:bg-transparent"
        >
          <X className="w-4 h-4" />
        </Button>
        <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};
