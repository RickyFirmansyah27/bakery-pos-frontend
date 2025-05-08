
import React, { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search..." 
}) => {
  const [query, setQuery] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        className={cn(
          "w-full py-3 pl-12 pr-4 rounded-lg focus:outline-none transition-colors",
          isDark
            ? "bg-gray-800 text-white border border-gray-700 focus:border-blue-500 placeholder-gray-400"
            : "bg-white text-gray-800 border border-gray-200 focus:border-blue-400 placeholder-gray-400"
        )}
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isDark ? "text-gray-500" : "text-gray-400"}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
    </form>
  );
};

export default SearchBar;
