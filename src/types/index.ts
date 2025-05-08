
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'sandwich' | 'bread' | 'pastry' | 'cake' | 'donut' | 'tart';
  image: string;
  description?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  customerName: string;
  orderNumber: string;
  tableNumber?: string;
  orderType: 'Dine In' | 'Take Away';
  items: OrderItem[];
  status: 'Open' | 'Closed' | 'Cancelled';
  total: number;
  subtotal: number;
  tax: number;
  discount?: number;
  paymentMethod?: string;
  createdAt: string;
  isPaid: boolean;
}

export interface SalesReport {
  totalSalesAmount: number;
  totalProductSales: number;
  totalCustomers: number;
  netProfit: number;
  growthAmount: number;
  growthPercentage: number;
  currency: string;
}

export interface FavoriteProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  totalOrders: number;
}

export interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface OrderHistoryItem {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  customerName: string;
  orderStatus: string;
  totalPayment: string;
  paymentStatus: 'Paid' | 'Unpaid';
}
