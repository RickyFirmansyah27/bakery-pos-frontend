
import React from 'react';
import FavoriteProductsTable from '../components/reports/FavoriteProductsTable';
import AllOrdersTable from '../components/reports/AllOrdersTable';
import { BarChart3, Grid3X3, ListFilter, Download } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

// Mock favorite products data
const favoriteProducts = [
  {
    id: "1",
    name: 'Chocolate Croissant',
    category: 'Pastries',
    totalOrders: 156,
    image: 'https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: "2",
    name: 'Sourdough Bread',
    category: 'Bread',
    totalOrders: 129,
    image: 'https://images.unsplash.com/photo-1586444248879-bc047384429a?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: "3",
    name: 'Blueberry Muffin',
    category: 'Pastries',
    totalOrders: 98,
    image: 'https://images.unsplash.com/photo-1607958996333-41784c70a7d5?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: "4",
    name: 'Strawberry Tart',
    category: 'Desserts',
    totalOrders: 87,
    image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&q=80&w=100&h=100'
  }
];

const Report: React.FC = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const isDark = theme === 'dark';
  
  // Quick stats from Dashboard (moved here)
  const quickStats = [
    { title: 'Total Sales', value: '$12,456.89', icon: <BarChart3 className="h-5 w-5 text-blue-500" /> },
    { title: 'Total Orders', value: '256', icon: <ListFilter className="h-5 w-5 text-green-500" /> },
    { title: 'Product Categories', value: '12', icon: <Grid3X3 className="h-5 w-5 text-purple-500" /> },
  ];
  
  const downloadReport = () => {
    // In a real application, this would generate a CSV or PDF file
    // For this demo, we'll just show a toast notification
    
    // Simulate a delay for file generation
    setTimeout(() => {
      toast({
        title: "Report Downloaded",
        description: "Your order report has been downloaded successfully.",
        duration: 3000,
      });
    }, 1000);
    
    // For demo purposes, create a simple CSV of mock data
    const mockData = [
      ['Order ID', 'Date', 'Customer', 'Items', 'Total'],
      ['ORD-1234', '2023-05-06', 'John Doe', '3', '$45.67'],
      ['ORD-1235', '2023-05-06', 'Jane Smith', '2', '$27.80'],
      ['ORD-1236', '2023-05-05', 'Bob Johnson', '5', '$72.50'],
      ['ORD-1237', '2023-05-05', 'Alice Brown', '1', '$12.99']
    ];
    
    const csvContent = mockData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bakery-orders-report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className={cn(
      "p-6 w-full", 
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900')
    }>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales Report</h1>
        <Button 
          onClick={downloadReport}
          variant="outline"
          className={cn(
            "flex items-center gap-2",
            isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-100"
          )}
        >
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>
      
      {/* Quick Stats Section from Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <Card key={index} className="p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className={cn("text-sm", theme === 'dark' ? 'text-gray-300' : 'text-gray-500')}>{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className={cn("rounded-full p-3", theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100')}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className={cn("mb-8", 
        isDark ? 'bg-gray-800 rounded-lg border border-gray-700' : '')}>
        <AllOrdersTable />
      </div>
      
      <div className={cn("rounded-lg shadow", 
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white')}>
        <h2 className={cn("text-lg font-semibold", 
          isDark ? 'text-gray-100 p-6' : 'text-gray-800 p-6')}>
          Most Popular Items
        </h2>
        <FavoriteProductsTable products={favoriteProducts} isLoading={false} />
      </div>
    </div>
  );
};

export default Report;
