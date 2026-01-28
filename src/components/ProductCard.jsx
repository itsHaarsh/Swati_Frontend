import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="group overflow-hidden border-0 bg-transparent">
      <Link to={`/shop/${product.id}`}>
        <div className="relative overflow-hidden bg-stone-100 aspect-[3/4] mb-4">
          {!imageError ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-stone-200">
              <span className="text-stone-500 text-sm">Image not available</span>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <span className="text-sm tracking-wide">OUT OF STOCK</span>
            </div>
          )}
        </div>
      </Link>

      <div className="text-center space-y-2">
        <p className="text-xs tracking-widest text-stone-500 uppercase">
          {product.category}
        </p>
        <Link to={`/shop/${product.id}`}>
          <h3 className="text-sm tracking-wide hover:text-stone-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm">${product.price.toFixed(2)}</p>
        
        <Button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className="w-full mt-4 bg-stone-900 hover:bg-stone-800 text-white transition-colors duration-300"
        >
          ADD TO BAG
        </Button>
      </div>
    </Card>
  );
};
