import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface NavItem {
  path: string;
  name: string;
  icon: React.ReactNode;
}

interface SidebarNavProps {
  items: NavItem[];
  username: string;
  role: string;
  avatar?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ items, username, role, avatar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { toast } = useToast();
  
  // Default avatar fallback
  const defaultAvatar = "https://placehold.co/200/9b87f5/ffffff?text=" + username.charAt(0).toUpperCase();

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

  return (
    <div className="min-h-screen bg-white border-r border-gray-200 w-[240px] fixed left-0 top-0 z-40">
      <div className="flex flex-col h-full">
        {/* User profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              {avatar ? (
                <img 
                  src={avatar} 
                  alt={username} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = defaultAvatar;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary text-white text-sm font-medium">
                  {username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium">{username}</h3>
              <p className="text-xs text-gray-500">{role}</p>
            </div>
            <button className="ml-auto text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-2">
            {items.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm rounded-lg hover:bg-accent group",
                    location.pathname === item.path 
                      ? "bg-accent text-primary font-medium" 
                      : "text-gray-700"
                  )}
                >
                  <span className={cn(
                    "w-6 h-6 mr-3 flex items-center justify-center",
                    location.pathname === item.path 
                      ? "text-primary" 
                      : "text-gray-500 group-hover:text-primary"
                  )}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button 
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50"
            onClick={handleLogout}
          >
            <span className="w-6 h-6 mr-3 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </span>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
