
import React, { useState } from 'react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, notes?: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    onAddToCart(product, quantity, notes);
    onClose();
  };

  const getCategoryClass = (category: string) => {
    const classMap: Record<string, string> = {
      sandwich: isDark ? 'text-yellow-400' : 'text-yellow-600',
      bread: isDark ? 'text-blue-400' : 'text-blue-600',
      pastry: isDark ? 'text-green-400' : 'text-green-600',
      cake: isDark ? 'text-pink-400' : 'text-pink-600',
      donut: isDark ? 'text-amber-400' : 'text-amber-600',
      tart: isDark ? 'text-purple-400' : 'text-purple-600',
    };
    return classMap[category] || (isDark ? 'text-gray-400' : 'text-gray-600');
  };

  // Default fallback image
  const fallbackImage = "https://placehold.co/600x400/e2e8f0/94a3b8?text=Product+Image";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
      <div className={cn(
        "rounded-lg w-full max-w-md mx-auto overflow-hidden",
        isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      )}>
        {/* Header */}
        <div className={cn(
          "flex items-center justify-between p-4 border-b",
          isDark ? "border-gray-700" : "border-gray-200"
        )}>
          <h3 className="text-lg font-medium">Detail Menu</h3>
          <button 
            onClick={onClose}
            className={cn(
              "hover:text-gray-600",
              isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        
        {/* Product Image */}
        <div className={cn(
          "aspect-video overflow-hidden",
          isDark ? "bg-gray-700" : "bg-gray-100"
        )}>
          <img 
            src={product.image || fallbackImage} 
            alt={product.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = fallbackImage;
            }}
          />
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <span className={`text-xs font-medium ${getCategoryClass(product.category)}`}>
            {product.category}
          </span>
          <h2 className="text-xl font-semibold mt-1">{product.name}</h2>
          {product.description && (
            <p className={cn(
              "text-sm mt-2",
              isDark ? "text-gray-300" : "text-gray-600"
            )}>
              {product.description}
            </p>
          )}
          
          <div className="text-2xl font-bold text-blue-500 mt-4">
            ${product.price.toFixed(2)}
          </div>
          
          {/* Notes textarea */}
          <div className="mt-4">
            <label htmlFor="notes" className={cn(
              "text-sm",
              isDark ? "text-gray-300" : "text-gray-600"
            )}>
              Add notes to your order:
            </label>
            <textarea
              id="notes"
              className={cn(
                "mt-1 w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500",
                isDark 
                  ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" 
                  : "border-gray-200 placeholder-gray-400"
              )}
              rows={2}
              placeholder="Special instructions, allergies, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          
          {/* Quantity controls */}
          <div className="flex items-center justify-between mt-4">
            <div className={cn(
              "flex items-center border rounded-lg",
              isDark ? "border-gray-600" : "border-gray-200"
            )}>
              <button 
                className={cn(
                  "px-3 py-1 border-r",
                  isDark 
                    ? "text-gray-300 hover:text-gray-100 border-gray-600" 
                    : "text-gray-600 hover:text-gray-800 border-gray-200"
                )}
                onClick={decreaseQuantity}
              >
                −
              </button>
              <div className="px-4 py-1">
                {quantity}
              </div>
              <button 
                className={cn(
                  "px-3 py-1 border-l",
                  isDark 
                    ? "text-gray-300 hover:text-gray-100 border-gray-600" 
                    : "text-gray-600 hover:text-gray-800 border-gray-200"
                )}
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        {/* Add to cart button */}
        <div className={cn(
          "p-4 border-t",
          isDark ? "border-gray-700" : "border-gray-200"
        )}>
          <Button 
            onClick={handleAddToCart}
            className="w-full py-6 text-base"
          >
            Add to Cart (${(product.price * quantity).toFixed(2)})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
