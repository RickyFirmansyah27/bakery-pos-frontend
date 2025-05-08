
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { ChevronLeft, ChevronRight, CakeSlice, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ expanded, setExpanded }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { logout } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const getPageTitle = () => {
    const path = location.pathname;
    switch(path) {
      case '/':
        return 'Point of Sales';
      case '/dashboard':
        return 'Dashboard';
      case '/activity':
        return 'Activity';
      case '/report':
        return 'Report';
      case '/teams':
        return 'Teams';
      case '/settings':
        return 'Settings';
      default:
        return 'Point of Sales';
    }
  };

  const navItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      )
    },
    {
      path: '/',
      name: 'Point of Sales',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m16 10-4 4-4-4" />
        </svg>
      )
    },
    {
      path: '/activity',
      name: 'Activity',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    },
    {
      path: '/report',
      name: 'Report',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      path: '/teams',
      name: 'Teams',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 1 0 7.75" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
        duration: 3000,
      });
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout failed",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // If mobile and not expanded, don't render the sidebar
  if (isMobile && !expanded) {
    return null;
  }

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 border-r h-full flex flex-col py-6 transition-all duration-300 ease-in-out z-20",
        theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
        expanded ? "w-[240px]" : "w-[70px]",
        // Handle mobile sidebar
        isMobile && expanded ? "w-[240px] shadow-xl" : "",
        isMobile && !expanded ? "hidden" : ""
      )}
    >
      {/* Logo and Title */}
      <div className={cn(
        "flex items-center px-3 mb-8",
        expanded ? "justify-start" : "justify-center"
      )}>
        <div className={cn(
          "rounded-full flex items-center justify-center text-white",
          expanded ? "w-12 h-12" : "w-10 h-10"
        )} style={{ background: '#1EAEDB' }}>
          <CakeSlice size={expanded ? 24 : 20} />
        </div>
        {expanded && (
          <h1 className="ml-3 text-lg font-semibold truncate">
            BakeHouse
          </h1>
        )}
      </div>
      
      {/* Toggle Button (hide on mobile) */}
      {!isMobile && (
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "absolute top-6 -right-3 w-6 h-6 rounded-full flex items-center justify-center",
            theme === 'dark' ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-white text-gray-600 border-gray-200',
            "border shadow-sm hover:bg-gray-100 hover:dark:bg-gray-700 transition-colors"
          )}
        >
          {expanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      )}
      
      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className={cn(
          "flex flex-col",
          expanded ? "px-2 space-y-1" : "items-center space-y-5 mt-4"
        )}>
          {navItems.map((item) => (
            <li key={item.path} className="w-full">
              <Link 
                to={item.path}
                className={cn(
                  "flex items-center transition-colors rounded-lg",
                  expanded ? "px-4 py-2" : "flex-col py-2 px-0 w-full items-center justify-center",
                  location.pathname === item.path 
                    ? theme === 'dark' 
                      ? "bg-gray-800 text-blue-400" 
                      : "bg-blue-50 text-blue-600" 
                    : theme === 'dark' 
                      ? "text-gray-400 hover:text-gray-300" 
                      : "text-gray-500 hover:text-gray-700",
                  !expanded && location.pathname === item.path
                    ? theme === 'dark'
                      ? "bg-gray-800"
                      : "bg-blue-50"
                    : ""
                )}
                title={expanded ? '' : item.name}
                onClick={() => isMobile && setExpanded(false)}
              >
                <span className={cn(
                  "flex-shrink-0",
                  !expanded && "mb-1"
                )}>
                  {item.icon}
                </span>
                {expanded 
                  ? <span className="ml-3">{item.name}</span> 
                  : <span className="text-xs text-center">{item.name.split(' ')[0]}</span>
                }
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Logout button */}
      <div className="mt-auto pt-4 pb-6">
        <button 
          className={cn(
            "flex items-center w-full",
            expanded ? "px-6 py-2" : "flex-col px-0 justify-center",
            theme === 'dark' ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-600"
          )}
          title={expanded ? '' : "Log Out"}
          onClick={handleLogout}
        >
          <LogOut size={24} />
          {expanded 
            ? <span className="ml-3">Log Out</span> 
            : <span className="text-xs mt-1">Log Out</span>
          }
        </button>
      </div>
    </div>
  );
};

export default Navigation;
