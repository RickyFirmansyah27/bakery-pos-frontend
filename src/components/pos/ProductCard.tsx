
import React from 'react';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getCategoryBgColor = (category: string) => {
    const colorMap: Record<string, string> = {
      sandwich: isDark ? 'bg-yellow-900/30' : 'bg-category-sandwich',
      bread: isDark ? 'bg-blue-900/30' : 'bg-category-bread',
      pastry: isDark ? 'bg-green-900/30' : 'bg-category-pastry',
      cake: isDark ? 'bg-pink-900/30' : 'bg-category-cake',
      donut: isDark ? 'bg-amber-900/30' : 'bg-category-donut',
      tart: isDark ? 'bg-purple-900/30' : 'bg-category-tart',
    };
    return colorMap[category] || (isDark ? 'bg-gray-700' : 'bg-gray-100');
  };

  const getCategoryTextColor = (category: string) => {
    const colorMap: Record<string, string> = {
      sandwich: isDark ? 'text-yellow-400' : 'text-yellow-600',
      bread: isDark ? 'text-blue-400' : 'text-blue-600',
      pastry: isDark ? 'text-green-400' : 'text-green-600',
      cake: isDark ? 'text-pink-400' : 'text-pink-600',
      donut: isDark ? 'text-amber-400' : 'text-amber-600',
      tart: isDark ? 'text-purple-400' : 'text-purple-600',
    };
    return colorMap[category] || (isDark ? 'text-gray-400' : 'text-gray-600');
  };

  // Default fallback image
  const fallbackImage = "https://placehold.co/600x400/e2e8f0/94a3b8?text=Product+Image";

  return (
    <button
      className={cn(
        "rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow p-2",
        isDark 
          ? "bg-gray-800 border border-gray-700" 
          : "bg-white border border-gray-100"
      )}
      onClick={() => onClick(product)}
    >
      <div className={cn(
        "aspect-square rounded-lg mb-2 overflow-hidden",
        isDark ? "bg-gray-700" : "bg-gray-50"
      )}>
        <img 
          src={product.image || fallbackImage} 
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = fallbackImage;
          }}
        />
      </div>
      <div className="text-left">
        <h3 className={cn(
          "text-sm font-medium",
          isDark ? "text-gray-200" : "text-gray-800"
        )}>
          {product.name}
        </h3>
        <div className="mt-1 flex items-center justify-between">
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            getCategoryBgColor(product.category),
            getCategoryTextColor(product.category)
          )}>
            {product.category}
          </span>
          <span className={cn(
            "text-sm font-semibold",
            isDark ? "text-gray-200" : "text-gray-900"
          )}>
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
