
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface OrderTrackInfo {
  customerName: string;
  tableInfo: string;
  orderTime: string;
  status: string;
  statusColor: string;
}

interface OrderTrackingProps {
  orders?: OrderTrackInfo[];
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orders = defaultOrders }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center flex-col">
      <div className="flex items-center justify-between w-full">
        <button className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <rect x="2" y="4" width="20" height="5" rx="2" />
            <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
            <path d="M10 13h4" />
          </svg>
          Track Order
        </button>
      </div>
      
      <div className="relative w-full mt-3">
        <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-none">
          {orders.map((order, index) => (
            <div 
              key={index} 
              className={cn(
                "p-2 px-4 rounded-lg shadow-sm border shrink-0",
                isDark 
                  ? "bg-gray-800 border-gray-700" 
                  : "bg-white border-gray-100"
              )}
            >
              <div className={cn(
                "text-xs mb-1",
                isDark ? "text-gray-400" : "text-gray-500"
              )}>
                {order.customerName}
              </div>
              <div className="flex justify-between items-center">
                <div className={cn(
                  "text-xs", 
                  isDark ? "text-gray-300" : "text-gray-800"
                )}>
                  {order.tableInfo}
                </div>
                <div className="text-xs font-medium ml-4">{order.orderTime}</div>
              </div>
              <div className={`text-[10px] text-${order.statusColor} mt-0.5`}>{order.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Default orders data if none is provided
const defaultOrders: OrderTrackInfo[] = [
  {
    customerName: "Mike",
    tableInfo: "Table 04 • Dine In",
    orderTime: "10:00 AM",
    status: "On Kitchen Hand",
    statusColor: "blue-500"
  },
  {
    customerName: "Billie",
    tableInfo: "Table 03 • Take Away",
    orderTime: "08:45 AM",
    status: "All Done",
    statusColor: "green-500"
  },
  {
    customerName: "Richard",
    tableInfo: "Table 02 • Dine In",
    orderTime: "08:45 AM",
    status: "To be Served",
    statusColor: "amber-500"
  },
  {
    customerName: "Sharon",
    tableInfo: "Table 01 • Dine In",
    orderTime: "08:15 AM",
    status: "To be Served",
    statusColor: "amber-500"
  }
];

export default OrderTracking;
