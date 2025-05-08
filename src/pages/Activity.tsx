
import React, { useState, useEffect } from 'react';
import ActivitySidebar from '@/components/activity/ActivitySidebar';
import OrderHistoryTable from '@/components/activity/OrderHistoryTable';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { Order, OrderHistoryItem } from '@/types';
import { fetchOrderHistory } from '@/api/bakeryApi';
import { useIsMobile } from '@/hooks/use-mobile';

const Activity: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tables');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check for orders from payment page in localStorage
    const checkForNewOrders = () => {
      // Load orders from localStorage
      const storedOrders = JSON.parse(localStorage.getItem('bakeryOrders') || '[]');
      setOrders(storedOrders);
    };

    // Fetch order history
    const getOrderHistory = async () => {
      try {
        setIsLoadingHistory(true);
        const history = await fetchOrderHistory();
        setOrderHistory(history);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    checkForNewOrders();
    getOrderHistory();

    // Set up listener for storage events to detect changes from other tabs
    window.addEventListener('storage', checkForNewOrders);
    
    return () => {
      window.removeEventListener('storage', checkForNewOrders);
    };
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'billing':
        return <BillingQueue orders={orders.filter(order => !order.isPaid)} />;
      case 'tables':
        return <TablesView orders={orders.filter(order => order.orderType === 'Dine In')} />;
      case 'history':
        return <OrderHistoryTable orders={orderHistory} isLoading={isLoadingHistory} />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "p-2 sm:p-4 md:p-6",
      isDark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
    )}>
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Activity</h1>
      
      <div className={cn(
        "flex flex-col md:flex-row gap-4 md:gap-6",
        isMobile ? "space-y-4 md:space-y-0" : ""
      )}>
        <div className={cn(
          isMobile ? "w-full" : "w-64"
        )}>
          <ActivitySidebar 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        </div>
        
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// Billing Queue component
const BillingQueue: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  
  // If no orders, add a dummy billing queue item
  let displayOrders = [...orders];
  
  if (displayOrders.length === 0) {
    // Create dummy billing queue orders for demonstration
    displayOrders = [
      {
        id: "dummy-1",
        customerName: "Alex Thompson",
        orderNumber: "ORD-8769",
        tableNumber: "Table 05",
        orderType: "Dine In",
        items: [{productId: "p1", quantity: 2}],
        status: "Open",
        total: 24.50,
        subtotal: 22.00,
        tax: 2.50,
        createdAt: new Date().toISOString(),
        isPaid: false
      },
      {
        id: "dummy-2",
        customerName: "Sarah Parker",
        orderNumber: "ORD-8770",
        orderType: "Take Away",
        items: [{productId: "p2", quantity: 1}],
        status: "Open",
        total: 18.75,
        subtotal: 17.00,
        tax: 1.75,
        createdAt: new Date().toISOString(),
        isPaid: false
      }
    ];
  }
  
  return (
    <div className={cn(
      "rounded-lg border",
      isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
    )}>
      <h2 className={cn(
        "text-lg sm:text-xl font-medium p-4 sm:p-6 border-b",
        isDark ? "border-gray-700" : "border-gray-200"
      )}>
        Pending Payments
      </h2>
      
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {displayOrders.map((order) => (
            <div key={order.id} className={cn(
              "rounded-lg border p-3 sm:p-4",
              isDark ? "border-gray-700 bg-gray-700" : "border-gray-200 bg-gray-50"
            )}>
              <div className="flex justify-between items-center mb-2 sm:mb-3">
                <h3 className="font-medium text-sm sm:text-base">{order.customerName}</h3>
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  order.isPaid ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                )}>
                  {order.isPaid ? 'Paid' : 'Unpaid'}
                </span>
              </div>
              <div className={cn(
                "text-xs sm:text-sm mb-2",
                isDark ? "text-gray-300" : "text-gray-600"
              )}>
                {order.orderNumber} • {order.tableNumber || 'No Table'}
              </div>
              <div className="flex justify-between items-center">
                <div className={cn(
                  "text-xs sm:text-sm",
                  isDark ? "text-gray-400" : "text-gray-500"
                )}>
                  {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="font-medium text-sm sm:text-base">${order.total.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Tables View component
const TablesView: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  
  // Create an array of 4 tables
  const tables = Array.from({ length: 4 }, (_, i) => {
    const tableNum = `Table ${(i + 1).toString().padStart(2, '0')}`;
    const tableOrders = orders.filter(order => order.tableNumber === tableNum);
    
    return {
      id: i + 1,
      name: tableNum,
      shortName: `Tab ${i + 1 < 10 ? '0' : ''}${i + 1}`,
      status: tableOrders.length > 0 ? 'occupied' : 'available',
      orders: tableOrders
    };
  });

  return (
    <div className={cn(
      "rounded-lg border",
      isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
    )}>
      <h2 className={cn(
        "text-lg sm:text-xl font-medium p-4 sm:p-6 border-b",
        isDark ? "border-gray-700" : "border-gray-200"
      )}>
        Tables Status
      </h2>
      
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {tables.map((table) => (
            <div key={table.id} className={cn(
              "rounded-lg border p-3 sm:p-4 h-auto sm:h-36 md:h-48 flex flex-col",
              table.status === 'occupied' 
                ? isDark ? "border-amber-500 bg-amber-500/10" : "border-amber-200 bg-amber-50"
                : isDark ? "border-green-500 bg-green-500/10" : "border-green-200 bg-green-50"
            )}>
              <div className="flex justify-between items-center mb-2 sm:mb-3">
                <h3 className="font-medium text-sm sm:text-base">
                  {isMobile ? table.shortName : table.name}
                </h3>
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  table.status === 'occupied' 
                    ? "bg-amber-100 text-amber-800" 
                    : "bg-green-100 text-green-800"
                )}>
                  {table.status === 'occupied' ? 'Occupied' : 'Available'}
                </span>
              </div>
              
              {table.status === 'occupied' ? (
                <div className="flex-1">
                  {table.orders.map((order) => (
                    <div key={order.id} className="mb-2">
                      <div className="font-medium text-xs sm:text-sm">{order.customerName}</div>
                      <div className="flex justify-between">
                        <div className={cn(
                          "text-xs",
                          isDark ? "text-gray-400" : "text-gray-500"
                        )}>
                          {order.orderNumber} • {order.items.length} items
                        </div>
                        <div className="text-xs sm:text-sm">${order.total.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className={cn(
                    "text-xs sm:text-sm",
                    isDark ? "text-gray-400" : "text-gray-500"
                  )}>No current orders</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;
