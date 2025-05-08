
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTheme } from '@/hooks/useTheme';

const AllOrdersTable: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const orders = [
    { 
      id: '#ORD-001', 
      customer: 'Sarah Johnson', 
      items: 3, 
      total: 32.50, 
      date: '2025-05-01 09:15 AM', 
      status: 'completed' 
    },
    { 
      id: '#ORD-002', 
      customer: 'Michael Chen', 
      items: 5, 
      total: 47.25, 
      date: '2025-05-01 10:20 AM', 
      status: 'completed' 
    },
    { 
      id: '#ORD-003', 
      customer: 'Emma Davis', 
      items: 2, 
      total: 18.75, 
      date: '2025-05-01 11:05 AM', 
      status: 'pending' 
    },
    { 
      id: '#ORD-004', 
      customer: 'Daniel Thompson', 
      items: 7, 
      total: 63.90, 
      date: '2025-05-01 01:30 PM', 
      status: 'completed' 
    },
    { 
      id: '#ORD-005', 
      customer: 'Olivia Rodriguez', 
      items: 4, 
      total: 29.50, 
      date: '2025-05-01 02:45 PM', 
      status: 'processing' 
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className={isDark ? "bg-green-900 text-green-100" : "bg-green-100 text-green-800 hover:bg-green-200"}>Completed</Badge>;
      case 'pending':
        return <Badge className={isDark ? "bg-yellow-900 text-yellow-100" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"}>Pending</Badge>;
      case 'processing':
        return <Badge className={isDark ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-800 hover:bg-blue-200"}>Processing</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className={cn("w-full rounded-lg shadow p-6", 
      isDark ? 'bg-gray-800 text-gray-100' : 'bg-white')}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={cn("text-xl font-semibold", 
          isDark ? 'text-gray-100' : 'text-gray-800')}>All Orders</h2>
        <button className={cn("text-sm font-medium", 
          isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800')}>
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className={isDark ? "text-gray-400" : ""}>
            List of all recent orders.
          </TableCaption>
          <TableHeader>
            <TableRow className={isDark ? "border-gray-700" : ""}>
              <TableHead className={isDark ? "text-gray-300" : ""}>Order ID</TableHead>
              <TableHead className={isDark ? "text-gray-300" : ""}>Customer</TableHead>
              <TableHead className={cn("text-right", isDark ? "text-gray-300" : "")}>Items</TableHead>
              <TableHead className={cn("text-right", isDark ? "text-gray-300" : "")}>Total</TableHead>
              <TableHead className={isDark ? "text-gray-300" : ""}>Date & Time</TableHead>
              <TableHead className={isDark ? "text-gray-300" : ""}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className={isDark ? "border-gray-700 hover:bg-gray-700/50" : ""}>
                <TableCell className={cn("font-medium", isDark ? "text-gray-200" : "")}>{order.id}</TableCell>
                <TableCell className={isDark ? "text-gray-300" : ""}>{order.customer}</TableCell>
                <TableCell className={cn("text-right", isDark ? "text-gray-300" : "")}>{order.items}</TableCell>
                <TableCell className={cn("text-right", isDark ? "text-gray-300" : "")}>${order.total.toFixed(2)}</TableCell>
                <TableCell className={isDark ? "text-gray-300" : ""}>{order.date}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllOrdersTable;
