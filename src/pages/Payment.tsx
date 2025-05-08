
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { Order, Product } from '@/types';
import { fetchProducts } from '@/api/bakeryApi';

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [order, setOrder] = useState<Order | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'qris'>('cash');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Get order from location state or fallback to localStorage
    const locationOrder = location.state?.order;
    if (locationOrder) {
      setOrder(locationOrder);
    } else {
      // If no order in location state, redirect back to POS
      navigate('/', { replace: true });
    }

    // Fetch products for displaying order details
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    
    getProducts();
  }, [location, navigate]);

  const handleProcessPayment = () => {
    if (!order) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Update order status in localStorage
      const orders = JSON.parse(localStorage.getItem('bakeryOrders') || '[]');
      const updatedOrders = orders.map((o: Order) => {
        if (o.id === order.id) {
          return {
            ...o,
            isPaid: true,
            paymentMethod,
            status: 'Completed'
          };
        }
        return o;
      });
      
      localStorage.setItem('bakeryOrders', JSON.stringify(updatedOrders));
      
      toast({
        title: "Payment successful!",
        description: "Your order has been processed successfully."
      });
      
      setIsProcessing(false);
      
      // Navigate to success page or back to POS
      navigate('/payment-success', { 
        state: { 
          order: {
            ...order,
            isPaid: true,
            paymentMethod,
            status: 'Completed'
          }
        } 
      });
    }, 2000);
  };

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading order details...</p>
      </div>
    );
  }

  // Get product details for order items
  const orderItems = order.items.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product,
      total: product ? product.price * item.quantity : 0
    };
  });

  return (
    <div className={cn(
      "min-h-screen py-8 px-4 sm:px-6 lg:px-8",
      isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
    )}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate('/')} 
            className={cn(
              "flex items-center mr-4",
              isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <h1 className="text-2xl font-bold">Order Payment</h1>
        </div>
        
        <div className={cn(
          "rounded-lg shadow-md mb-8",
          isDark ? "bg-gray-800" : "bg-white"
        )}>
          <div className={cn(
            "px-6 py-4 border-b",
            isDark ? "border-gray-700" : "border-gray-200"
          )}>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{order.customerName}'s Order</h2>
                <p className={cn(
                  "text-sm",
                  isDark ? "text-gray-400" : "text-gray-500"
                )}>
                  Order Number: {order.orderNumber} • {new Date().toLocaleString()}
                </p>
                {order.tableNumber && (
                  <p className={cn(
                    "text-sm mt-1",
                    isDark ? "text-gray-400" : "text-gray-500"
                  )}>
                    {order.tableNumber} • {order.orderType}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4">
            <div className={cn(
              "border-b pb-4 mb-4",
              isDark ? "border-gray-700" : "border-gray-200"
            )}>
              <h3 className="text-lg font-medium mb-4">Order Items</h3>
              <div className="space-y-3">
                {orderItems.map((item, index) => (
                  item.product ? (
                    <div key={index} className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className={cn(
                            "text-sm",
                            isDark ? "text-gray-400" : "text-gray-500"
                          )}>
                            ${item.product.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ) : null
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>Subtotal</p>
                <p>${order.subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>Tax (10%)</p>
                <p>${order.tax.toFixed(2)}</p>
              </div>
              {order.discount && order.discount > 0 && (
                <div className="flex justify-between">
                  <p className="text-green-600">Discount</p>
                  <p className="text-green-600">-${order.discount.toFixed(2)}</p>
                </div>
              )}
              <div className={cn(
                "flex justify-between pt-2 text-lg font-bold",
                isDark ? "border-t border-gray-700" : "border-t border-gray-200"
              )}>
                <p>Total</p>
                <p>${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "rounded-lg shadow-md mb-8",
          isDark ? "bg-gray-800" : "bg-white"
        )}>
          <div className="px-6 py-4">
            <h3 className="text-lg font-medium mb-4">Payment Method</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-lg border-2",
                  paymentMethod === 'cash'
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : isDark ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300",
                  "transition-colors"
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={paymentMethod === 'cash' ? "text-blue-500" : ""}>
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M6 12h.01M18 12h.01" />
                </svg>
                <span className="mt-2 font-medium">Cash</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-lg border-2",
                  paymentMethod === 'card'
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : isDark ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300",
                  "transition-colors"
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={paymentMethod === 'card' ? "text-blue-500" : ""}>
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                <span className="mt-2 font-medium">Card</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('qris')}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-lg border-2",
                  paymentMethod === 'qris'
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : isDark ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300",
                  "transition-colors"
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={paymentMethod === 'qris' ? "text-blue-500" : ""}>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M7 7h.01M7 12h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01M7 17h5" />
                </svg>
                <span className="mt-2 font-medium">QRIS</span>
              </button>
            </div>
            
            <Button 
              className="w-full py-6 text-lg"
              onClick={handleProcessPayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </>
              ) : (
                `Pay ${order.total.toFixed(2)}`
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
