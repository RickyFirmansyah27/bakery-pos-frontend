
import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface OrderHeaderProps {
  customerName: string;
  orderNumber: string;
  tableNumber: string;
  orderType: 'Dine In' | 'Take Away';
  onUpdateCustomerName: (name: string) => void;
  onUpdateTableNumber: (table: string) => void;
  onUpdateOrderType: (type: 'Dine In' | 'Take Away') => void;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({
  customerName,
  orderNumber,
  tableNumber,
  orderType,
  onUpdateCustomerName,
  onUpdateTableNumber,
  onUpdateOrderType
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editableName, setEditableName] = useState(customerName);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleNameSave = () => {
    onUpdateCustomerName(editableName);
    setIsEditingName(false);
  };

  return (
    <div className={cn(
      "px-4 py-3 border-b",
      isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
    )}>
      <div className="flex items-center justify-between">
        <div>
          {isEditingName ? (
            <div className="flex items-center">
              <Input
                value={editableName}
                onChange={(e) => setEditableName(e.target.value)}
                className="mr-2 text-md"
                autoFocus
                onBlur={handleNameSave}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
              />
              <Button size="sm" onClick={handleNameSave}>Save</Button>
            </div>
          ) : (
            <h3 className={cn(
              "text-lg font-medium flex items-center",
              isDark ? "text-gray-100" : "text-gray-900"
            )}>
              {customerName}'s Order
              <button 
                onClick={() => {
                  setEditableName(customerName);
                  setIsEditingName(true);
                }} 
                className={cn(
                  "ml-2 hover:text-gray-600", 
                  isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <Edit size={16} />
              </button>
            </h3>
          )}
          <p className={cn(
            "text-sm",
            isDark ? "text-gray-400" : "text-gray-500"
          )}>
            Order Number: {orderNumber}
          </p>
        </div>
      </div>
      
      <div className="flex mt-3 space-x-4">
        <div className="w-1/2">
          <div className="relative">
            <select 
              className={cn(
                "w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none",
                isDark 
                  ? "bg-gray-700 border-gray-600 text-gray-200" 
                  : "border-gray-300 text-gray-700"
              )}
              value={tableNumber || ''}
              onChange={(e) => onUpdateTableNumber(e.target.value)}
            >
              <option value="">Select Table</option>
              {Array.from({ length: 10 }, (_, i) => i + 1).map(tableNum => (
                <option key={tableNum} value={`Table ${tableNum.toString().padStart(2, '0')}`}>
                  Table {tableNum.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className={cn(
                "h-4 w-4", 
                isDark ? "text-gray-400" : "text-gray-400"
              )} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="relative">
            <select 
              className={cn(
                "w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none",
                isDark 
                  ? "bg-gray-700 border-gray-600 text-gray-200" 
                  : "border-gray-300 text-gray-700"
              )}
              value={orderType}
              onChange={(e) => onUpdateOrderType(e.target.value as 'Dine In' | 'Take Away')}
            >
              <option value="Dine In">Dine In</option>
              <option value="Take Away">Take Away</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className={cn(
                "h-4 w-4", 
                isDark ? "text-gray-400" : "text-gray-400"
              )} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
