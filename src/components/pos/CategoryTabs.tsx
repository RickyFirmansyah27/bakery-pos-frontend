
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface CategoryTab {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

interface CategoryTabsProps {
  categories: CategoryTab[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  setActiveCategory
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-4">
      {categories.map((category) => (
        <button
          key={category.id}
          className={cn(
            "flex flex-col items-center justify-center p-3 rounded-lg transition-colors",
            activeCategory === category.id
              ? isDark 
                ? "bg-gray-800 border-2 border-blue-500 shadow-sm" 
                : "bg-white border-2 border-blue-500 shadow-sm"
              : isDark 
                ? "bg-gray-800 border border-gray-700 hover:border-blue-400" 
                : "bg-white border border-gray-200 hover:border-blue-300"
          )}
          onClick={() => setActiveCategory(category.id)}
        >
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center mb-2",
            activeCategory === category.id 
              ? "bg-blue-900/50" 
              : isDark ? "bg-gray-700" : "bg-gray-100"
          )}>
            {category.icon}
          </div>
          <span className={cn(
            "text-sm font-medium",
            activeCategory === category.id 
              ? "text-blue-400" 
              : isDark ? "text-gray-300" : "text-gray-700"
          )}>
            {category.name}
          </span>
          <span className={cn(
            "text-xs",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>
            {category.count} items
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
