
import React from 'react';
import { Card } from '@/components/ui/card';
import { Grid3X3, ListFilter, BarChart3, Download, DollarSign, ShoppingBag, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import SalesChart from '../components/reports/SalesChart';
import ReportCard from '../components/reports/ReportCard';

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Report Cards Section (moved from Report page) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ReportCard 
          icon={<DollarSign className="h-5 w-5 text-blue-500" />}
          title="Today's Sales"
          value="$1,245.89"
          currency="USD"
          change={{ value: "$125.23", percentage: 12.5, isPositive: true }}
        />
        <ReportCard 
          icon={<ShoppingBag className="h-5 w-5 text-green-500" />}
          title="Weekly Sales"
          value="$8,320.50"
          currency="USD"
          change={{ value: "$432.10", percentage: 5.2, isPositive: false }}
        />
        <ReportCard 
          icon={<ShoppingCart className="h-5 w-5 text-purple-500" />}
          title="Total Orders"
          value={156}
          suffix="orders"
          change={{ value: "12", percentage: 8.1, isPositive: true }}
        />
      </div>
      
      {/* Sales Chart from Reports page */}
      <div className="mb-8">
        <SalesChart title="Monthly Sales Performance" showChart={true} />
      </div>
      
      {/* Recent Activity Section */}
      <Card className="p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className={cn("flex items-center justify-between pb-4", 
              theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-100')}>
              <div className="flex items-center">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mr-4", 
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200')}>
                  <span className="text-xs font-medium">{item}</span>
                </div>
                <div>
                  <p className="font-medium">New order placed</p>
                  <p className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>Order #{1000 + item}</p>
                </div>
              </div>
              <span className={cn("text-sm", theme === 'dark' ? 'text-gray-400' : 'text-gray-500')}>{item}h ago</span>
            </div>
          ))}
        </div>
        <button className="mt-4 text-sm text-blue-500 font-medium hover:underline">
          View all activity
        </button>
      </Card>
      
      {/* Quick Actions Section */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Add Product', 'Process Order', 'View Reports', 'Manage Team'].map((action, index) => (
            <button 
              key={index}
              className={cn("p-4 rounded-lg transition-colors", 
                theme === 'dark' 
                  ? 'border border-gray-700 hover:bg-gray-800' 
                  : 'border border-gray-200 hover:bg-gray-50'
              )}
            >
              <p className="font-medium text-center">{action}</p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
