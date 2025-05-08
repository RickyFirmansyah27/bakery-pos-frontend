
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      // If no order in location state, redirect back to POS
      navigate('/', { replace: true });
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  const getPaymentMethodText = () => {
    switch (order.paymentMethod) {
      case 'card': return 'Card Payment';
      case 'qris': return 'QRIS';
      case 'cash':
      default: return 'Cash Payment';
    }
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col items-center justify-center px-4",
      isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
    )}>
      <div className={cn(
        "max-w-md w-full rounded-lg shadow-lg p-6",
        isDark ? "bg-gray-800" : "bg-white"
      )}>
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className={cn(
            "mb-6",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>
            Thank you for your order. Your payment has been processed successfully.
          </p>
          
          <div className={cn(
            "w-full rounded-lg p-4 mb-6",
            isDark ? "bg-gray-700" : "bg-gray-50"
          )}>
            <div className="flex justify-between mb-2">
              <span className={isDark ? "text-gray-400" : "text-gray-500"}>Order Number:</span>
              <span className="font-medium">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className={isDark ? "text-gray-400" : "text-gray-500"}>Total Amount:</span>
              <span className="font-medium">${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className={isDark ? "text-gray-400" : "text-gray-500"}>Payment Method:</span>
              <span className="font-medium">{getPaymentMethodText()}</span>
            </div>
            <div className="flex justify-between">
              <span className={isDark ? "text-gray-400" : "text-gray-500"}>Date:</span>
              <span className="font-medium">{new Date().toLocaleString()}</span>
            </div>
          </div>
          
          <div className="space-y-3 w-full">
            <Button
              className="w-full"
              onClick={() => navigate('/')}
            >
              Back to Point of Sale
            </Button>
            <Button
              variant="outline"
              className={cn(
                "w-full", 
                isDark && "border-gray-700 hover:bg-gray-700"
              )}
              onClick={() => navigate('/activity')}
            >
              View Order History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
