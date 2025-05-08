
import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Header from './Header';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const [sidebarExpanded, setSidebarExpanded] = useState(false); // Default to collapsed
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Get current page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/' || path === '/index') return 'Point of Sale';
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/report') return 'Reports';
    if (path === '/activity') return 'Activity';
    if (path === '/settings') return 'Settings';
    if (path === '/teams') return 'Teams';
    return 'Bakery POS';
  };
  
  // Automatically collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarExpanded(false);
    }
  }, [isMobile]);
  
  // Get current date and time
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Format date as "Wed, 29 May 2024"
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      };
      setCurrentDate(now.toLocaleDateString('en-US', options));
      
      // Format time as "07:59 AM"
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      }));
    };
    
    updateDateTime();
    // Update time every minute
    const interval = setInterval(updateDateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={cn(
      "flex min-h-screen w-full", 
      theme === 'dark' 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    )}>
      <Navigation 
        expanded={sidebarExpanded} 
        setExpanded={setSidebarExpanded} 
        data-navigation
      />
      <div className={cn(
        "transition-all duration-300 ease-in-out flex-1 min-w-0 flex flex-col",
        sidebarExpanded ? (isMobile ? "ml-0" : "ml-[240px]") : (isMobile ? "ml-0" : "ml-[70px]")
      )}>
        <Header 
          title={getPageTitle()} 
          date={currentDate}
          time={currentTime}
          status="Open Order"
          toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
        />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
