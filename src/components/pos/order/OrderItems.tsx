
import React from 'react';
import { OrderItem, Product } from '@/types';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface OrderItemWithProduct extends OrderItem {
  product?: Product;
}

interface OrderItemsProps {
  items: OrderItemWithProduct[];
  onQuantityChange: (productId: string, quantity: number) => void;
  onToggleSelection: (productId: string) => void;
  selectedItems: Set<string>;
}

const OrderItems: React.FC<OrderItemsProps> = ({
  items,
  onQuantityChange,
  onToggleSelection,
  selectedItems,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className={isDark ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>
          No items added yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {items.map(item => {
        if (!item.product) return null;
        
        const isSelected = selectedItems.has(item.productId);
        
        return (
          <div key={item.productId} className={cn(
            "flex items-center py-3 border-b last:border-0",
            isDark ? "border-gray-700" : "border-gray-100"
          )}>
            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-3">
              <img 
                src={item.product.image} 
                alt={item.product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={cn(
                "text-sm font-medium",
                isDark ? "text-gray-100" : "text-gray-900"
              )}>
                {item.product.name}
              </h4>
              <p className={cn(
                "text-sm",
                isDark ? "text-gray-400" : "text-gray-500"
              )}>
                ${item.product.price.toFixed(2)}
              </p>
              {item.notes && (
                <p className={cn(
                  "text-xs truncate",
                  isDark ? "text-gray-500" : "text-gray-400"
                )}>
                  {item.notes}
                </p>
              )}
            </div>
            <div className="flex items-center ml-4">
              <button 
                type="button"
                className="rounded-full w-6 h-6 flex items-center justify-center focus:outline-none"
                onClick={() => onToggleSelection(item.productId)}
              >
                {isSelected ? (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                ) : (
                  <div className={cn(
                    "w-5 h-5 border rounded-full",
                    isDark ? "border-gray-600" : "border-gray-300"
                  )} />
                )}
              </button>
            </div>
            <div className="flex items-center ml-3">
              <button 
                className={cn(
                  "p-1",
                  isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-700"
                )}
                onClick={() => onQuantityChange(item.productId, Math.max(0, item.quantity - 1))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <span className={cn(
                "mx-2 text-sm",
                isDark ? "text-gray-200" : "text-gray-800"
              )}>
                {item.quantity}
              </span>
              <button 
                className={cn(
                  "p-1",
                  isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-700"
                )}
                onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderItems;
