
import React from 'react';
import { OrderHistoryItem } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface OrderHistoryTableProps {
  orders: OrderHistoryItem[];
  isLoading: boolean;
}

const OrderHistoryTable: React.FC<OrderHistoryTableProps> = ({ orders, isLoading }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (isLoading) {
    return (
      <div className={cn("rounded-lg shadow-sm border overflow-hidden",
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100")}>
        <div className={cn("p-4 border-b animate-pulse", 
          isDark ? "border-gray-700" : "border-gray-200")}>
          <div className={cn("h-6 rounded w-1/4 mb-2", isDark ? "bg-gray-700" : "bg-gray-200")}></div>
          <div className={cn("h-4 rounded w-3/4", isDark ? "bg-gray-700" : "bg-gray-200")}></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={cn("text-xs uppercase tracking-wider",
              isDark ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-500")}>
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Date & Time</th>
                <th className="p-3 text-left">Customer Name</th>
                <th className="p-3 text-left">Order Status</th>
                <th className="p-3 text-left">Total Payment</th>
                <th className="p-3 text-left">Order Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, idx) => (
                <tr key={idx} className={cn("border-b",
                  isDark ? "border-gray-700" : "border-gray-100")}>
                  <td className="p-3"><div className={cn("h-4 rounded w-8", isDark ? "bg-gray-700" : "bg-gray-200")}></div></td>
                  <td className="p-3"><div className={cn("h-4 rounded w-24", isDark ? "bg-gray-700" : "bg-gray-200")}></div></td>
                  <td className="p-3"><div className={cn("h-4 rounded w-20", isDark ? "bg-gray-700" : "bg-gray-200")}></div></td>
                  <td className="p-3"><div className={cn("h-4 rounded w-12", isDark ? "bg-gray-700" : "bg-gray-200")}></div></td>
                  <td className="p-3"><div className={cn("h-4 rounded w-16", isDark ? "bg-gray-700" : "bg-gray-200")}></div></td>
                  <td className="p-3"><div className={cn("h-4 rounded w-14", isDark ? "bg-gray-700" : "bg-gray-200")}></div></td>
                  <td className="p-3"><div className={cn("h-4 rounded w-12", isDark ? "bg-gray-700" : "bg-gray-200")}></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg shadow-sm border overflow-hidden",
      isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100")}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={cn("text-xs uppercase tracking-wider",
            isDark ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-500")}>
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Date & Time</th>
              <th className="p-3 text-left">Customer Name</th>
              <th className="p-3 text-left">Order Status</th>
              <th className="p-3 text-left">Total Payment</th>
              <th className="p-3 text-left">Payment Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className={cn("border-b hover:bg-opacity-50",
                isDark 
                  ? "border-gray-700 hover:bg-gray-700" 
                  : "border-gray-100 hover:bg-gray-50")}>
                <td className={cn("p-3 text-sm", 
                  isDark ? "text-gray-300" : "")}>{order.orderNumber}</td>
                <td className={cn("p-3 text-sm", 
                  isDark ? "text-gray-300" : "")}>{order.date} - {order.time}</td>
                <td className={cn("p-3 text-sm font-medium", 
                  isDark ? "text-gray-200" : "")}>{order.customerName}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.orderStatus === 'Done' 
                      ? isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
                      : order.orderStatus === 'Cancelled' 
                      ? isDark ? 'bg-red-900 text-red-200' : 'bg-red-50 text-red-600'
                      : isDark ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className={cn("p-3 text-sm", 
                  isDark ? "text-gray-300" : "")}>{order.totalPayment}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.paymentStatus === 'Paid' 
                      ? isDark ? 'bg-green-900 text-green-200' : 'bg-green-50 text-green-600'
                      : isDark ? 'bg-red-900 text-red-200' : 'bg-red-50 text-red-600'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button className={isDark ? "text-blue-400 hover:text-blue-300 text-sm" : "text-blue-500 hover:text-blue-600 text-sm"}>
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistoryTable;
