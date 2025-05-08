
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarItemProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, isActive, onClick }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <button
      className={cn(
        "w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-1 transition-colors text-sm sm:text-base",
        isActive 
          ? "bg-primary text-white" 
          : isDark 
            ? "hover:bg-gray-700 text-gray-200" 
            : "hover:bg-gray-100"
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

interface ActivitySidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ActivitySidebar: React.FC<ActivitySidebarProps> = ({ activeTab, onTabChange }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "p-3 sm:p-4 rounded-lg border",
      isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100")}>
      <h3 className={cn(
        "text-base sm:text-lg font-medium mb-3 sm:mb-4", 
        isDark ? "text-gray-100" : "")}>Tables</h3>
      <div className="space-y-1">
        <SidebarItem
          title="Billing Queue"
          isActive={activeTab === 'billing'}
          onClick={() => onTabChange('billing')}
        />
        <SidebarItem
          title="Tables"
          isActive={activeTab === 'tables'}
          onClick={() => onTabChange('tables')}
        />
        <SidebarItem
          title="Order History"
          isActive={activeTab === 'history'}
          onClick={() => onTabChange('history')}
        />
      </div>
      
      {!isMobile && (
        <div className="mt-6 sm:mt-8">
          <div className="mb-3">
            <h4 className={isDark ? "text-blue-400 font-medium" : "text-blue-600 font-medium"}>Bakehouse</h4>
            <div className={isDark ? "text-xs text-gray-400 mt-1" : "text-xs text-gray-500 mt-1"}>POS System</div>
          </div>
          <p className={isDark ? "text-xs text-gray-400" : "text-xs text-gray-500"}>
            The dreamy taste & magic of sweet moments in every bite from our bakery.
          </p>
          
          <div className={cn(
            "mt-4 pt-4 border-t flex items-center text-xs",
            isDark ? "border-gray-700 text-gray-400" : "border-gray-100 text-gray-500")}>
            <span className="mr-4">© 2024 Bakehouse</span>
            <button className={cn("mr-4", isDark ? "hover:text-gray-300" : "hover:text-gray-700")}>Contacts</button>
            <button className={isDark ? "hover:text-gray-300" : "hover:text-gray-700"}>Help</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitySidebar;
