
import React from 'react';
import { useTheme } from '@/hooks/useTheme';

const EmptyOrder: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={`mx-auto ${isDark ? 'text-gray-600' : 'text-gray-300'} mb-3`}>
          <path d="M7 22a5 5 0 0 1-5-5" />
          <path d="M7 17.12A5 5 0 0 1 12 12" />
          <path d="M5 2h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-14a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1" />
          <path d="M2 12v-2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5" />
          <path d="M22 14v4a2 2 0 0 1-2 2H5" />
          <path d="M10 7h.01" />
        </svg>
        <p className={isDark ? "text-gray-400" : "text-gray-500"}>No items in order</p>
        <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-2`}>Add items from the menu to get started</p>
      </div>
    </div>
  );
};

export default EmptyOrder;
