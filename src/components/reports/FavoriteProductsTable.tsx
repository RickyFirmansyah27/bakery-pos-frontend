
import React from 'react';
import { FavoriteProduct } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface FavoriteProductsTableProps {
  products: FavoriteProduct[];
  isLoading: boolean;
}

const FavoriteProductsTable: React.FC<FavoriteProductsTableProps> = ({ products, isLoading }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  if (isLoading) {
    return (
      <div className={cn("rounded-lg border p-6 animate-pulse", 
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-sm")}>
        <div className="flex items-center justify-between mb-4">
          <div className={cn("h-5 rounded w-1/4", isDark ? "bg-gray-700" : "bg-gray-200")}></div>
          <div className={cn("h-8 rounded w-8", isDark ? "bg-gray-700" : "bg-gray-200")}></div>
        </div>
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className={cn("flex items-center py-3 border-b", 
            isDark ? "border-gray-700" : "border-gray-100")}>
            <div className={cn("w-12 h-12 rounded-md mr-3", isDark ? "bg-gray-700" : "bg-gray-200")}></div>
            <div className="flex-1">
              <div className={cn("h-4 rounded w-1/2 mb-2", isDark ? "bg-gray-700" : "bg-gray-200")}></div>
              <div className={cn("h-3 rounded w-1/4", isDark ? "bg-gray-700" : "bg-gray-200")}></div>
            </div>
            <div className={cn("h-5 rounded w-12", isDark ? "bg-gray-700" : "bg-gray-200")}></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg border shadow-sm", 
      isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100")}>
      <div className="flex items-center justify-between p-6 mb-0">
        <h3 className={cn("text-sm font-medium", isDark ? "text-blue-400" : "text-blue-600")}>
          Favorite Product
        </h3>
        <button className={isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      </div>
      
      <div className={cn("grid grid-cols-3 gap-4 text-sm font-medium mb-2 px-6", 
        isDark ? "text-gray-300" : "")}>
        <div>Img</div>
        <div>Product Name</div>
        <div className="text-right">Total Orders</div>
      </div>
      
      <div className="px-6 pb-6">
        {products.map((product) => (
          <div key={product.id} className={cn("flex items-center py-3 border-b last:border-0", 
            isDark ? "border-gray-700" : "border-gray-100")}>
            <div className={cn("w-12 h-12 rounded-md overflow-hidden", 
              isDark ? "bg-gray-700" : "bg-gray-100")}>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 ml-3">
              <h4 className={cn("text-sm font-medium", isDark ? "text-gray-200" : "")}>{product.name}</h4>
              <p className={cn("text-xs mt-0.5", isDark ? "text-gray-400" : "text-gray-500")}>{product.category}</p>
            </div>
            <div className={cn("text-sm font-medium", isDark ? "text-gray-200" : "")}>
              {product.totalOrders} 
              <span className={isDark ? "text-gray-400 text-xs" : "text-gray-500 text-xs"}> Times</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteProductsTable;
