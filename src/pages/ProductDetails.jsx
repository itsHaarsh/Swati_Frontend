import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { productsAPI } from '@/services/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productData, allProducts] = await Promise.all([
          productsAPI.getById(id),
          productsAPI.getAll()
        ]);
        setProduct(productData);
        setRelatedProducts(
          allProducts
            .filter(p => p.category === productData.category && p.documentId !== productData.documentId)
            .slice(0, 4)
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-stone-600 tracking-wide">Loading...</p>
      </div>
    );
  }

  if (error || !product) {
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

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Link to="/shop" className="inline-flex items-center text-stone-600 hover:text-stone-900 mb-8 sm:mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-xs sm:text-sm tracking-wide">BACK TO SHOP</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-16 sm:mb-20 lg:mb-24">
          <div>
            <div className="aspect-[3/4] bg-stone-100 mb-4 p-4">
              {product.images?.[currentImageIndex] && !imageError ? (
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-stone-200">
                  <span className="text-stone-500">Image not available</span>
                </div>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-stone-100 border-2 p-1 ${
                      currentImageIndex === index ? 'border-stone-900' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
            <div>
              <p className="text-xs tracking-widest text-stone-500 mb-3 sm:mb-4">{product.category}</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 tracking-tight">{product.name}</h1>
              <p className="text-xl sm:text-2xl mb-6 sm:mb-8">₹{product.price}</p>
            </div>

            <div className="text-sm sm:text-base text-stone-600 leading-relaxed space-y-3">
              {product.description.split('\n').map((line, index) => {
                if (!line.trim()) return null;
                
                let formatted = line
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/__(.*?)__/g, '<strong>$1</strong>')
                  .replace(/_(.*?)_/g, '<em>$1</em>')
                  .replace(/~~(.*?)~~/g, '<del>$1</del>');
                
                const isBullet = line.trim().startsWith('-');
                
                if (isBullet) {
                  const content = formatted.replace(/^-\s*/, '');
                  return (
                    <div key={index} className="flex gap-2">
                      <span className="text-stone-400 flex-shrink-0">•</span>
                      <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                  );
                }
                
                return (
                  <div key={index} dangerouslySetInnerHTML={{ __html: formatted }} />
                );
              })}
            </div>

            {product.inStock ? (
              <span className="text-sm tracking-wide text-stone-600">In Stock</span>
            ) : (
              <span className="text-sm tracking-wide text-stone-400">Out of Stock</span>
            )}

            <Button
              onClick={() => addToCart(product, navigate)}
              disabled={!product.inStock}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white py-4 sm:py-6 text-xs sm:text-sm tracking-widest transition-colors duration-300"
            >
              ADD TO BAG
            </Button>

            <div className="border-t border-stone-200 pt-6 sm:pt-8 space-y-3 sm:space-y-4 text-xs sm:text-sm text-stone-600">
              <div className="flex justify-between">
                <span>Free Shipping</span>
                <span>On orders over ₹500</span>
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
                <Link key={p.documentId} to={`/shop/${p.documentId}`} className="block group">
                  <div className="aspect-[3/4] bg-stone-100 mb-4 overflow-hidden p-2">
                    {p.image ? (
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-stone-200">
                        <span className="text-stone-500 text-sm">Image not available</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-xs tracking-widest text-stone-500">{p.category}</p>
                    <h3 className="text-sm tracking-wide">{p.name}</h3>
                    <p className="text-sm">₹{p.price}</p>
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
