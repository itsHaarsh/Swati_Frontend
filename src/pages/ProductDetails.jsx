import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/mockData';
import { useState } from 'react';

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const product = products.find(p => p.id === parseInt(id));

  const handleImageError = () => {
    setImageError(true);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Link to="/shop" className="inline-flex items-center text-stone-600 hover:text-stone-900 mb-8 sm:mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-xs sm:text-sm tracking-wide">BACK TO SHOP</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-16 sm:mb-20 lg:mb-24">
          <div className="aspect-[3/4] bg-stone-100">
            {!imageError ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-stone-200">
                <span className="text-stone-500">Image not available</span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
            <div>
              <p className="text-xs tracking-widest text-stone-500 mb-3 sm:mb-4">{product.category}</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 tracking-tight">{product.name}</h1>
              <p className="text-xl sm:text-2xl mb-6 sm:mb-8">${product.price.toFixed(2)}</p>
            </div>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed tracking-wide">
              {product.description}
            </p>

            {product.inStock ? (
              <span className="text-sm tracking-wide text-stone-600">In Stock</span>
            ) : (
              <span className="text-sm tracking-wide text-stone-400">Out of Stock</span>
            )}

            <Button
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white py-4 sm:py-6 text-xs sm:text-sm tracking-widest transition-colors duration-300"
            >
              ADD TO BAG
            </Button>

            <div className="border-t border-stone-200 pt-6 sm:pt-8 space-y-3 sm:space-y-4 text-xs sm:text-sm text-stone-600">
              <div className="flex justify-between">
                <span>Free Shipping</span>
                <span>On orders over $50</span>
              </div>
              <div className="flex justify-between">
                <span>Returns</span>
                <span>30-day return policy</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>3-5 business days</span>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl mb-8 sm:mb-12 text-center tracking-tight">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/shop/${p.id}`} className="block group">
                  <div className="aspect-[3/4] bg-stone-100 mb-4 overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full hidden items-center justify-center bg-stone-200">
                      <span className="text-stone-500 text-sm">Image not available</span>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-xs tracking-widest text-stone-500">{p.category}</p>
                    <h3 className="text-sm tracking-wide">{p.name}</h3>
                    <p className="text-sm">${p.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
