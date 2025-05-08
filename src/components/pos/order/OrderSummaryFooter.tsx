
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface OrderSummaryFooterProps {
  subtotal: number;
  tax: number;
  discount?: number;
  total: number;
}

const OrderSummaryFooter: React.FC<OrderSummaryFooterProps> = ({
  subtotal,
  tax,
  discount,
  total
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={cn(
      "px-4 py-3 border-t",
      isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    )}>
      <div className="flex justify-between items-center text-sm">
        <span className={isDark ? "text-gray-400" : "text-gray-600"}>Subtotal</span>
        <span className={isDark ? "text-gray-200" : "text-gray-900"}>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center text-sm mt-2">
        <span className={isDark ? "text-gray-400" : "text-gray-600"}>Tax (10%)</span>
        <span className={isDark ? "text-gray-200" : "text-gray-900"}>${tax.toFixed(2)}</span>
      </div>
      {discount && discount > 0 && (
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-green-600">Discount</span>
          <span className="text-green-600">-${discount.toFixed(2)}</span>
        </div>
      )}
      <div className={cn(
        "mt-3 pt-3 border-t",
        isDark ? "border-gray-700" : "border-gray-200"
      )}>
        <div className="flex justify-between items-center">
          <span className={cn(
            "font-semibold",
            isDark ? "text-gray-200" : "text-gray-800"
          )}>
            TOTAL
          </span>
          <span className={cn(
            "font-bold",
            isDark ? "text-gray-100" : "text-gray-900"
          )}>
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryFooter;
