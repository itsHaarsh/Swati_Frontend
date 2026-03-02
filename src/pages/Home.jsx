import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { productsAPI } from '@/services/api';
import { useState, useEffect } from 'react';
import tool4Image from '@/assets/products/tool4.jpeg';

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getAll();
        setFeaturedProducts(data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden" style={{ backgroundImage: `url(${tool4Image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="hero__content__wrapper text-center max-w-3xl mx-auto px-4 sm:px-6 animate-hero relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 tracking-tight opacity-0 text-white" style={{ animation: 'heroFade 1.2s ease-out 0.2s forwards' }}>
            Natural Beauty,
            <br />
            Elevated
          </h1>
          <p className="text-base sm:text-lg text-stone-200 mb-8 sm:mb-12 tracking-wide opacity-0 px-4" style={{ animation: 'heroFade 1.2s ease-out 0.4s forwards' }}>
            Discover our collection of clean, effective skincare
          </p>
          <div className="opacity-0" style={{ animation: 'heroFade 1.2s ease-out 0.6s forwards' }}>
            <Link to="/shop">
              <Button className="bg-white hover:bg-stone-100 text-stone-900 px-8 sm:px-12 py-4 sm:py-6 text-xs sm:text-sm tracking-widest transition-colors duration-300">
                SHOP NOW
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl mb-4 tracking-tight">Featured Collection</h2>
            <p className="text-stone-600 tracking-wide">Curated essentials for your daily ritual</p>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-stone-600 tracking-wide">Loading products...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center mt-12 sm:mt-16">
                <Link to="/shop">
                  <Button variant="outline" className="border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white px-8 sm:px-12 py-4 sm:py-6 text-xs sm:text-sm tracking-widest transition-all duration-300">
                    VIEW ALL
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl mb-6 sm:mb-8 tracking-tight">Our Philosophy</h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed tracking-wide">
            We believe in the power of natural ingredients, thoughtfully sourced and carefully formulated. 
            Every product is designed to nourish your skin while respecting the environment.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6 tracking-tight">Stay Connected</h2>
          <p className="text-stone-600 mb-6 sm:mb-8 tracking-wide">Subscribe for exclusive offers and wellness tips</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border border-stone-300 focus:outline-none focus:border-stone-900 transition-colors text-sm sm:text-base"
            />
            <Button className="bg-stone-900 h-auto hover:bg-stone-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm tracking-widest transition-colors duration-300 whitespace-nowrap">
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
