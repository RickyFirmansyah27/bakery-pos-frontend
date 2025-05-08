
import React from 'react';
import { Order, OrderItem, Product } from '@/types';
import { calculateOrderTotals } from '@/utils/orderUtils';

interface OrderManagerProps {
  orders: Order[];
  products: Product[];
  currentOrderId: string;
  createNewOrder: () => void;
}

export const useOrderManager = (allProducts: Product[] = []) => {
  const [currentOrder, setCurrentOrder] = React.useState<Order | null>(null);
  const [orderCount, setOrderCount] = React.useState(1);
  
  // Create a new empty order
  const createNewOrder = React.useCallback(() => {
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      customerName: 'New Customer',
      orderNumber: `#${orderCount.toString().padStart(3, '0')}`,
      tableNumber: '',
      orderType: 'Dine In',
      items: [],
      status: 'Open',
      total: 0,
      subtotal: 0,
      tax: 0,
      createdAt: new Date().toISOString(),
      isPaid: false
    };
    
    setCurrentOrder(newOrder);
    setOrderCount(prev => prev + 1);
  }, [orderCount]);
  
  // Initialize empty order on component mount
  React.useEffect(() => {
    if (!currentOrder) {
      createNewOrder();
    }
  }, [createNewOrder, currentOrder]);

  const calculateOrderTotals = (items: OrderItem[]): { subtotal: number, tax: number, total: number } => {
    const subtotal = items.reduce((sum, item) => {
      const product = allProducts.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
    
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  };

  const handleAddToCart = (product: Product, quantity: number, notes?: string) => {
    if (!currentOrder) return;
    
    const updatedOrder = { ...currentOrder };
    const existingItemIndex = updatedOrder.items.findIndex(item => item.productId === product.id);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      updatedOrder.items[existingItemIndex].quantity += quantity;
      if (notes) {
        updatedOrder.items[existingItemIndex].notes = notes;
      }
    } else {
      // Add new item
      updatedOrder.items.push({
        productId: product.id,
        quantity,
        notes
      });
    }
    
    // Calculate new totals
    const { subtotal, tax, total } = calculateOrderTotals(updatedOrder.items);
    updatedOrder.subtotal = subtotal;
    updatedOrder.tax = tax;
    updatedOrder.total = total;
    
    setCurrentOrder(updatedOrder);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (!currentOrder) return;
    
    const updatedOrder = { ...currentOrder };
    
    if (quantity === 0) {
      // Remove item if quantity is 0
      updatedOrder.items = updatedOrder.items.filter(item => item.productId !== productId);
    } else {
      // Update quantity
      const itemIndex = updatedOrder.items.findIndex(item => item.productId === productId);
      if (itemIndex >= 0) {
        updatedOrder.items[itemIndex].quantity = quantity;
      }
    }
    
    // Calculate new totals
    const { subtotal, tax, total } = calculateOrderTotals(updatedOrder.items);
    updatedOrder.subtotal = subtotal;
    updatedOrder.tax = tax;
    updatedOrder.total = total;
    
    setCurrentOrder(updatedOrder);
  };
  
  const handleUpdateCustomerName = (name: string) => {
    if (!currentOrder || !name) return;
    
    setCurrentOrder({
      ...currentOrder,
      customerName: name
    });
  };
  
  const handleUpdateTableNumber = (table: string) => {
    if (!currentOrder) return;
    
    setCurrentOrder({
      ...currentOrder,
      tableNumber: table
    });
  };
  
  const handleUpdateOrderType = (type: 'Dine In' | 'Take Away') => {
    if (!currentOrder) return;
    
    setCurrentOrder({
      ...currentOrder,
      orderType: type
    });
  };

  return {
    currentOrder,
    createNewOrder,
    handleAddToCart,
    handleQuantityChange,
    handleUpdateCustomerName,
    handleUpdateTableNumber,
    handleUpdateOrderType
  };
};

export default useOrderManager;
