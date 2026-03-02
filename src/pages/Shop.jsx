import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { productsAPI, categoriesAPI } from '@/services/api';

export const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productsAPI.getAll(),
          categoriesAPI.getAll()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8 sm:py-12 md:py-16 flex items-center justify-center">
        <p className="text-stone-600 tracking-wide">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-8 sm:py-12 md:py-16 flex items-center justify-center">
        <p className="text-red-600 tracking-wide">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 md:py-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 tracking-tight">Shop All</h1>
          <p className="text-stone-600 tracking-wide">
            {filteredProducts.length} Products
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-500 tracking-wide">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};
