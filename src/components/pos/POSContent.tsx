
import React from 'react';
import CategoryTabs from '@/components/pos/CategoryTabs';
import SearchBar from '@/components/pos/SearchBar';
import ProductGrid from '@/components/pos/ProductGrid';
import OrderTracking from '@/components/pos/OrderTracking';
import { Product } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '../ui/button';

interface POSContentProps {
  categories: Array<{
    id: string;
    name: string;
    count: number;
    icon: React.ReactNode;
  }>;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  products: Product[];
  onProductClick: (product: Product) => void;
  isLoadingProducts: boolean;
  handleSearch: (query: string) => void;
  searchPlaceholder?: string;
  toggleOrderSummary?: () => void;
  showOrderButton?: boolean;
  orderCount?: number;
}

const POSContent: React.FC<POSContentProps> = ({ 
  categories,
  activeCategory,
  setActiveCategory,
  products,
  onProductClick,
  isLoadingProducts,
  handleSearch,
  searchPlaceholder = "Search something sweet on your mind...",
  toggleOrderSummary,
  showOrderButton = false,
  orderCount = 0
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "flex-1 flex flex-col h-full",
      isDark ? "bg-gray-900" : "bg-gray-50"
    )}>
      {/* Main content area with overflow scroll */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 pb-32">
          <CategoryTabs 
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          
          <div className="mt-6">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder={searchPlaceholder}
            />
          </div>
          
          <div className="mt-6">
            <ProductGrid 
              products={products}
              onProductClick={onProductClick}
              isLoading={isLoadingProducts}
            />
          </div>
        </div>
      </div>
      
      {/* Fixed order tracking at bottom */}
      <div className={cn(
        "fixed bottom-0 py-3 px-4 shadow-md transition-all duration-300 ease-in-out z-10",
        isDark ? "bg-gray-800 border-t border-gray-700" : "bg-white border-t border-gray-200",
        isMobile ? "inset-x-0" : "left-[70px] right-[400px]"
      )}>
        <div className="flex items-center justify-between">
          {/* Order tracking section - taking most of the space on mobile */}
          <div className={cn(
            "flex-grow",
            showOrderButton ? "max-w-[75%]" : "w-full"
          )}>
            <OrderTracking />
          </div>
          
          {/* Mobile order button */}
          {showOrderButton && (
            <div className="flex-shrink-0 ml-2">
              <Button
                variant="default"
                className="flex items-center justify-center h-10"
                onClick={toggleOrderSummary}
              >
                <ShoppingBag size={18} className="mr-1" />
                <span>Order</span>
                {orderCount > 0 && (
                  <span className="ml-1 bg-white text-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {orderCount}
                  </span>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default POSContent;
