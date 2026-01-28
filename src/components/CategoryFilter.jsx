import { Button } from '@/components/ui/button';

export const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-12 sm:mb-16 px-4">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onSelectCategory(category)}
          variant="ghost"
          className={`text-xs sm:text-sm tracking-widest transition-colors px-3 sm:px-4 py-2 ${
            selectedCategory === category
              ? 'text-stone-900 border-b-2 border-stone-900 rounded-none'
              : 'text-stone-500 hover:text-stone-900 hover:bg-transparent'
          }`}
        >
          {category.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};
