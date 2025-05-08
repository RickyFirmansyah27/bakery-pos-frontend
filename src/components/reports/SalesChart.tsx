
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

// Mock sales data
const data = [
  { name: 'Jan', value: 8000 },
  { name: 'Feb', value: 9000 },
  { name: 'Mar', value: 7500 },
  { name: 'Apr', value: 9500 },
  { name: 'May', value: 11000 },
  { name: 'Jun', value: 10500 },
  { name: 'Jul', value: 8500 },
  { name: 'Aug', value: 9500 },
  { name: 'Sep', value: 11500 },
  { name: 'Oct', value: 10000 },
  { name: 'Nov', value: 8500 },
  { name: 'Dec', value: 12000 },
];

interface SalesChartProps {
  title: string;
  showChart: boolean;
}

const SalesChart: React.FC<SalesChartProps> = ({ title, showChart }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gradientId = "colorValue";
  const chartLineColor = isDark ? '#60A5FA' : '#3B82F6'; // Blue color for the line
  const chartFillColor = isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)'; // Lighter blue for the area
  const gridColor = isDark ? 'rgba(75, 85, 99, 0.2)' : '#f0f0f0'; // Grid color
  const textColor = isDark ? 'rgba(229, 231, 235, 0.8)' : '#333'; // Text color
  
  if (!showChart) {
    return (
      <div className={cn(
        "p-6 rounded-lg border shadow-sm",
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      )}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={cn(
            "text-sm font-medium", 
            isDark ? "text-blue-400" : "text-blue-600"
          )}>
            {title}
          </h3>
          <div className="relative">
            <select className={cn(
              "block appearance-none w-full border py-1 px-4 pr-8 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
              isDark ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-700"
            )}>
              <option>Total Sales Amount</option>
              <option>Total Products</option>
              <option>Total Customers</option>
            </select>
            <div className={cn(
              "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2",
              isDark ? "text-gray-400" : "text-gray-700"
            )}>
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "flex items-center justify-center h-64 rounded-lg",
          isDark ? "bg-gray-700" : "bg-gray-50"
        )}>
          <div className={cn(
            "text-center",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
              <line x1="6" y1="6" x2="6" y2="6" />
              <line x1="6" y1="18" x2="6" y2="18" />
            </svg>
            <p>Chart display is turned off</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn(
      "p-6 rounded-lg border shadow-sm",
      isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={cn(
          "text-sm font-medium",
          isDark ? "text-blue-400" : "text-blue-600"
        )}>
          {title}
        </h3>
        <div className="relative">
          <select className={cn(
            "block appearance-none w-full border py-1 px-4 pr-8 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
            isDark ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-700"
          )}>
            <option>Total Sales Amount</option>
            <option>Total Products</option>
            <option>Total Customers</option>
          </select>
          <div className={cn(
            "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2",
            isDark ? "text-gray-400" : "text-gray-700"
          )}>
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartLineColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartLineColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis 
              dataKey="name" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: textColor }} 
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                border: 'none',
                backgroundColor: isDark ? '#374151' : '#ffffff',
                color: isDark ? '#e5e7eb' : '#333333',
              }}
              formatter={(value) => [`$${value}`, 'Value']}
              labelStyle={{
                color: isDark ? '#e5e7eb' : '#333333',
              }}
              itemStyle={{
                color: isDark ? '#e5e7eb' : '#333333',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={chartLineColor} 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: chartLineColor }}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className={cn(
          "p-4 rounded-lg",
          isDark ? "bg-gray-700" : "bg-gray-50"
        )}>
          <div className={cn(
            "text-sm mb-1",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>Amount</div>
          <div className="flex items-baseline">
            <span className={cn(
              "text-lg font-bold",
              isDark ? "text-gray-100" : ""
            )}>12,650.00</span>
            <span className={cn(
              "ml-2 text-xs",
              isDark ? "text-gray-400" : "text-gray-500"
            )}>USD</span>
          </div>
        </div>
        
        <div className={cn(
          "p-4 rounded-lg",
          isDark ? "bg-gray-700" : "bg-gray-50"
        )}>
          <div className={cn(
            "text-sm mb-1",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>Growth</div>
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-green-500">+ 1,543.30</span>
            <span className={cn(
              "ml-2 text-xs",
              isDark ? "text-gray-400" : "text-gray-500"
            )}>USD</span>
          </div>
        </div>
        
        <div className={cn(
          "p-4 rounded-lg",
          isDark ? "bg-gray-700" : "bg-gray-50"
        )}>
          <div className={cn(
            "text-sm mb-1",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>Growth Percentage</div>
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-green-500">+ 12.2</span>
            <span className={cn(
              "ml-2 text-xs",
              isDark ? "text-gray-400" : "text-gray-500"
            )}>Percent (%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
