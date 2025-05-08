import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductsByCategory } from '@/api/bakeryApi';
import ProductDetails from '@/components/pos/ProductDetails';
import OrderSummary from '@/components/pos/OrderSummary';
import POSContent from '@/components/pos/POSContent';
import { Product } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { useOrderManager } from '@/components/pos/OrderManager';
import { posCategories } from '@/data/posCategories';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const PointOfSale: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const isMobile = useIsMobile();
  
  // Fetch all products for order item details
  const { data: allProducts = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  
  // Order management functionality
  const {
    currentOrder,
    handleAddToCart,
    handleQuantityChange,
    handleUpdateCustomerName,
    handleUpdateTableNumber,
    handleUpdateOrderType
  } = useOrderManager(allProducts);

  // Fetch products based on the active category
  const {
    data: products = [],
    isLoading: isLoadingProducts,
  } = useQuery({
    queryKey: ['products', activeCategory],
    queryFn: () => fetchProductsByCategory(activeCategory),
  });

  // Filter products by search query
  const filteredProducts = searchQuery
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleToggleSelection = (productId: string) => {
    const newSelectedItems = new Set(selectedItems);
    
    if (newSelectedItems.has(productId)) {
      newSelectedItems.delete(productId);
    } else {
      newSelectedItems.add(productId);
    }
    
    setSelectedItems(newSelectedItems);
  };

  // Toggle order summary visibility on mobile
  const toggleOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };

  return (
    <div className="flex h-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex flex-col">
        <div className="flex flex-1 overflow-hidden relative">
          {/* Products section with order tracking */}
          <div className={cn(
            "flex-1 flex overflow-hidden",
            isMobile && showOrderSummary ? "hidden" : "flex"
          )}>
            <POSContent
              categories={posCategories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              products={filteredProducts}
              onProductClick={handleProductClick}
              isLoadingProducts={isLoadingProducts}
              handleSearch={handleSearch}
              toggleOrderSummary={toggleOrderSummary}
              showOrderButton={isMobile}
              orderCount={currentOrder?.items.length || 0}
            />
          </div>
          
          {/* Order summary */}
          <div className={cn(
            "border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto",
            isMobile 
              ? (showOrderSummary ? "fixed inset-0 z-30" : "hidden") 
              : "w-[400px]"
          )}>
            <OrderSummary 
              order={currentOrder}
              products={allProducts}
              onQuantityChange={handleQuantityChange}
              onToggleSelection={handleToggleSelection}
              selectedItems={selectedItems}
              onUpdateCustomerName={handleUpdateCustomerName}
              onUpdateTableNumber={handleUpdateTableNumber}
              onUpdateOrderType={handleUpdateOrderType}
              onClose={isMobile ? () => setShowOrderSummary(false) : undefined}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>

      {/* Product details modal */}
      {selectedProduct && (
        <ProductDetails 
          product={selectedProduct}
          onClose={handleCloseProductDetails}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default PointOfSale;
