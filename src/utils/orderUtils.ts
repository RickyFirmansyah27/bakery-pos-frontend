
import { OrderItem, Product } from '@/types';

export const calculateOrderTotals = (items: OrderItem[], products: Product[]): { 
  subtotal: number, 
  tax: number, 
  total: number 
} => {
  const subtotal = items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);
  
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  
  return { subtotal, tax, total };
};
