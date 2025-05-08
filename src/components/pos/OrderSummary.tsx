
import React from 'react';
import { Order, OrderItem, Product } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import OrderHeader from './order/OrderHeader';
import OrderItems from './order/OrderItems';
import OrderSummaryFooter from './order/OrderSummaryFooter';
import PaymentActions from './order/PaymentActions';
import EmptyOrder from './order/EmptyOrder';
import { X } from 'lucide-react';

interface OrderSummaryProps {
  order: Order | null;
  products: Product[];
  onQuantityChange: (productId: string, quantity: number) => void;
  onToggleSelection: (productId: string) => void;
  selectedItems: Set<string>;
  onUpdateCustomerName: (name: string) => void;
  onUpdateTableNumber: (table: string) => void;
  onUpdateOrderType: (type: 'Dine In' | 'Take Away') => void;
  onClose?: () => void;
  isMobile?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  order,
  products,
  onQuantityChange,
  onToggleSelection,
  selectedItems,
  onUpdateCustomerName,
  onUpdateTableNumber,
  onUpdateOrderType,
  onClose,
  isMobile = false
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // If no order or empty order, show empty state
  if (!order) {
    return (
      <div className="h-full w-full">
        {isMobile && onClose && (
          <div className={cn(
            "flex items-center justify-between p-4 border-b",
            isDark ? "border-gray-700" : "border-gray-200"
          )}>
            <h2 className="font-semibold">Order Summary</h2>
            <button onClick={onClose} className="p-1">
              <X size={20} />
            </button>
          </div>
        )}
        <EmptyOrder />
      </div>
    );
  }

  // Find product details for each order item
  const orderItemsWithDetails = order.items.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product,
    };
  });

  return (
    <div className={cn(
      "shadow-sm h-full flex flex-col",
      isDark ? "bg-gray-800" : "bg-white"
    )}>
      {/* Mobile close button */}
      {isMobile && onClose && (
        <div className={cn(
          "flex items-center justify-between p-4 border-b",
          isDark ? "border-gray-700" : "border-gray-200"
        )}>
          <h2 className="font-semibold">Order Summary</h2>
          <button onClick={onClose} className="p-1">
            <X size={20} />
          </button>
        </div>
      )}
      
      {/* Order header with customer info & order type */}
      <OrderHeader
        customerName={order.customerName}
        orderNumber={order.orderNumber}
        tableNumber={order.tableNumber || ''}
        orderType={order.orderType}
        onUpdateCustomerName={onUpdateCustomerName}
        onUpdateTableNumber={onUpdateTableNumber}
        onUpdateOrderType={onUpdateOrderType}
      />

      {/* Order items */}
      <div className={cn(
        "px-4 py-3 flex-1 overflow-y-auto mb-[160px]", /* Add bottom margin to prevent content being hidden behind the fixed payment section */
        isDark ? "bg-gray-800" : "bg-white"
      )}>
        <OrderItems
          items={orderItemsWithDetails}
          onQuantityChange={onQuantityChange}
          onToggleSelection={onToggleSelection}
          selectedItems={selectedItems}
        />
      </div>

      {/* Payment summary */}
      <OrderSummaryFooter
        subtotal={order.subtotal}
        tax={order.tax}
        discount={order.discount}
        total={order.total}
      />

      {/* Payment actions */}
      <PaymentActions 
        order={order} 
        isEmpty={orderItemsWithDetails.length === 0}
      />
    </div>
  );
};

export default OrderSummary;
