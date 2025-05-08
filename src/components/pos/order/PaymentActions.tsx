
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Order } from '@/types';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface PaymentActionsProps {
  order: Order;
  isEmpty: boolean;
}

const PaymentActions: React.FC<PaymentActionsProps> = ({ order, isEmpty }) => {
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'discount10') {
      toast({
        title: "Promo applied!",
        description: "10% discount has been applied to your order."
      });
      // This would normally update the order with a discount
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please enter a valid promo code.",
        variant: "destructive"
      });
    }
  };

  const handleQRISPayment = () => {
    toast({
      title: "QRIS Payment",
      description: "Scan the QR code to complete your payment."
    });
    // This would normally show a QR code for payment
  };

  const handlePlaceOrder = () => {
    if (!order.tableNumber && order.orderType === 'Dine In') {
      toast({
        title: "Table number required",
        description: "Please select a table for dine-in orders",
        variant: "destructive"
      });
      return;
    }
    
    // Store order in localStorage for demonstration purposes
    const orders = JSON.parse(localStorage.getItem('bakeryOrders') || '[]');
    const orderWithStatus = {
      ...order,
      status: 'Pending',
      orderedAt: new Date().toISOString()
    };
    
    orders.push(orderWithStatus);
    localStorage.setItem('bakeryOrders', JSON.stringify(orders));
    
    // Dispatch a storage event to notify other components
    window.dispatchEvent(new Event('storage'));
    
    // Navigate to payment page
    navigate('/payment', { state: { order: orderWithStatus } });
  };

  return (
    <div className={cn(
      "sticky bottom-0 left-0 right-0 px-4 py-3 border-t z-10 shadow-lg",
      isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    )}>
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-lg">TOTAL</span>
        <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
      </div>
      
      <div className="flex gap-2 mb-3">
        <div className="flex-1">
          <div className={cn(
            "relative flex items-center w-full h-10 rounded-md border focus-within:border-blue-500 overflow-hidden",
            isDark 
              ? "bg-gray-700 border-gray-600" 
              : "bg-white border-gray-300"
          )}>
            <div className={cn(
              "grid place-items-center h-full w-10",
              isDark ? "text-gray-400" : "text-gray-400"
            )}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            <input
              className={cn(
                "peer h-full w-full outline-none text-sm pr-2",
                isDark ? "bg-gray-700 text-gray-200" : "text-gray-700"
              )}
              type="text"
              placeholder="Add Promo or Voucher"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </div>
        </div>
        <Button 
          onClick={handleQRISPayment} 
          variant={isDark ? "outline" : "outline"} 
          className={cn(
            "min-w-[80px]",
            isDark && "border-gray-700 bg-gray-700 hover:bg-gray-600"
          )}
        >
          QRIS
        </Button>
      </div>
      <Button 
        className="w-full py-6 text-base bg-blue-500 hover:bg-blue-600" 
        onClick={handlePlaceOrder}
        disabled={isEmpty}
      >
        Place Order
      </Button>
    </div>
  );
};

export default PaymentActions;
