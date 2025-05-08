
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  isLoading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick, isLoading }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className={cn(
              "aspect-square rounded-lg mb-2",
              isDark ? "bg-gray-700" : "bg-gray-200"
            )}></div>
            <div className={cn(
              "h-4 rounded mb-2",
              isDark ? "bg-gray-700" : "bg-gray-200"
            )}></div>
            <div className={cn(
              "h-4 rounded w-1/2",
              isDark ? "bg-gray-700" : "bg-gray-200"
            )}></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={cn(
        "flex items-center justify-center h-64 rounded-lg border border-dashed",
        isDark 
          ? "bg-gray-800 border-gray-700" 
          : "bg-gray-50 border-gray-300"
      )}>
        <div className="text-center">
          <p className={cn(
            "mb-2",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>No products found</p>
          <p className={cn(
            "text-sm",
            isDark ? "text-gray-500" : "text-gray-400"
          )}>Try selecting a different category</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
