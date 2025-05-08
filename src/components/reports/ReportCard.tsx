
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ReportCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  currency?: string;
  change?: {
    value: string | number;
    percentage?: number;
    isPositive: boolean;
  };
  suffix?: string;
}

const ReportCard: React.FC<ReportCardProps> = ({ 
  icon, 
  title, 
  value, 
  currency, 
  change,
  suffix
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className={cn("p-6 rounded-lg border shadow-sm", 
      isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100")}>
      <div className="flex items-center mb-3">
        {icon}
        <h3 className={cn("ml-2 text-sm font-medium", 
          isDark ? "text-gray-300" : "text-gray-600")}>{title}</h3>
      </div>
      
      <div className="flex items-end">
        <div className={cn("text-2xl font-bold", 
          isDark ? "text-gray-100" : "text-gray-900")}>
          {value?.toLocaleString()}
        </div>
        {currency && (
          <div className={cn("ml-2 text-sm", 
            isDark ? "text-gray-400" : "text-gray-500")}>{currency}</div>
        )}
        {suffix && (
          <div className={cn("ml-2 text-sm", 
            isDark ? "text-gray-400" : "text-gray-500")}>{suffix}</div>
        )}
      </div>
      
      {change && (
        <div className="mt-2 flex items-center">
          <span className={`flex items-center text-sm ${
            change.isPositive 
              ? (isDark ? 'text-green-400' : 'text-green-600') 
              : (isDark ? 'text-red-400' : 'text-red-600')
          }`}>
            {change.isPositive ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
            {change.value}
            {change.percentage && (
              <span className="ml-1 text-xs">{change.percentage}%</span>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default ReportCard;
