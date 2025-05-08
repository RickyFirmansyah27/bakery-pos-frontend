
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  date: string;
  time: string;
  status: 'Open Order' | 'Close Order' | string;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, date, time, status, toggleSidebar }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "flex items-center justify-between h-16 px-2 md:px-4 border-b",
      isDark 
        ? 'bg-gray-900 border-gray-800 text-white' 
        : 'bg-white border-gray-200 text-gray-900'
    )}>
      {/* Left section - Menu toggle and date/time */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <button 
          className={cn(
            "p-2",
            isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'
          )}
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
        
        {!isMobile && (
          <div className="flex items-center space-x-2">
            <div className={cn(
              "border rounded-md p-1 px-2 flex items-center space-x-1",
              isDark 
                ? 'bg-gray-800 border-gray-700 text-gray-200' 
                : 'bg-white border-gray-200 text-gray-700'
            )}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="text-sm">{date}</span>
            </div>
            
            <div className={isDark ? 'text-gray-600' : 'text-gray-400'}>—</div>
            
            <div className={cn(
              "border rounded-md p-1 px-2 flex items-center space-x-1",
              isDark 
                ? 'bg-gray-800 border-gray-700 text-gray-200' 
                : 'bg-white border-gray-200 text-gray-700'
            )}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-sm">{time}</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Middle section - title (only on mobile) */}
      <div className="flex items-center">
        {isMobile && (
          <h1 className="font-medium text-lg">{title}</h1>
        )}
      </div>
      
      {/* Right section - Order status and actions */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          <span className={`w-2 h-2 rounded-full mr-1.5 ${status === 'Open Order' ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className={`text-sm ${status === 'Open Order' ? 'text-green-400' : 'text-red-400'}`}>{status}</span>
        </div>
        
        <button className={cn(
          "p-2", 
          isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'
        )}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
