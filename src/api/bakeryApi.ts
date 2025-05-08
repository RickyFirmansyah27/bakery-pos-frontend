
import { Product, Order, SalesReport, FavoriteProduct, OrderHistoryItem } from '../types';

// Mock data for products
const products: Product[] = [
  {
    id: '1',
    name: 'Beef Crowich',
    price: 5.50,
    category: 'sandwich',
    image: 'https://images.unsplash.com/photo-1539252554873-9e588e05e374?w=800&auto=format&fit=crop&q=80',
    description: 'Tender beef slices with fresh vegetables on our homemade croissant bread'
  },
  {
    id: '2',
    name: 'Buttermelt Croissant',
    price: 4.00,
    category: 'pastry',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
    description: 'Premium butter croissant with a crispy pastry crust and soft inside will melt away on your mouth!'
  },
  {
    id: '3',
    name: 'Cereal Cream Donut',
    price: 2.45,
    category: 'donut',
    image: 'https://images.unsplash.com/photo-1514517220017-8ce97a34a7b6?w=800&auto=format&fit=crop&q=80',
    description: 'Sweet donut topped with cereal and filled with vanilla cream'
  },
  {
    id: '4',
    name: 'Cheesy Cheesecake',
    price: 3.75,
    category: 'cake',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop&q=80',
    description: 'Rich and creamy cheesecake with a buttery graham cracker crust'
  },
  {
    id: '5',
    name: 'Cheezy Sourdough',
    price: 4.50,
    category: 'bread',
    image: 'https://images.unsplash.com/photo-1586444248879-11d7a7413773?w=800&auto=format&fit=crop&q=80',
    description: 'Artisan sourdough bread filled with premium cheese blend'
  },
  {
    id: '6',
    name: 'Egg Tart',
    price: 3.25,
    category: 'tart',
    image: 'https://images.unsplash.com/photo-1572383672419-ab35444a5db0?w=800&auto=format&fit=crop&q=80',
    description: 'Flaky pastry shell filled with sweet egg custard'
  },
  {
    id: '7',
    name: 'Grains Pan Bread',
    price: 4.50,
    category: 'bread',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    description: 'Multigrain bread made with organic whole grains and seeds'
  },
  {
    id: '8',
    name: 'Spinchoco Roll',
    price: 4.00,
    category: 'pastry',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&auto=format&fit=crop&q=80',
    description: 'Chocolate swiss roll with spinach infused sponge cake'
  },
  {
    id: '9',
    name: 'Sliced Black Forest',
    price: 5.00,
    category: 'cake',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&auto=format&fit=crop&q=80',
    description: 'Classic Black Forest cake with cherries and chocolate shavings'
  },
  {
    id: '10',
    name: 'Solo Floss Bread',
    price: 4.50,
    category: 'bread',
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&auto=format&fit=crop&q=80',
    description: 'Soft bread topped with sweet meat floss and mayo'
  },
  {
    id: '11',
    name: 'Zoguma Pan Bread',
    price: 4.50,
    category: 'bread',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&auto=format&fit=crop&q=80',
    description: 'Premium Japanese-style milk bread with soft texture'
  },
  {
    id: '12',
    name: 'Double Chocolate Tart',
    price: 4.25,
    category: 'tart',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    description: 'Rich chocolate ganache in a chocolate pastry shell'
  },
  {
    id: '13',
    name: 'Ham & Cheese Sandwich',
    price: 5.25,
    category: 'sandwich',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&auto=format&fit=crop&q=80',
    description: 'Classic ham and cheese on our freshly baked bread'
  },
  {
    id: '14',
    name: 'Glazed Ring Donut',
    price: 2.00,
    category: 'donut',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=80',
    description: 'Traditional ring donut with sweet glaze coating'
  },
];

// Mock active order
const activeOrder: Order = {
  id: '005',
  customerName: 'Eloise',
  orderNumber: '#005',
  tableNumber: '05',
  orderType: 'Dine In',
  items: [
    { productId: '1', quantity: 1 },
    { productId: '9', quantity: 2 },
    { productId: '10', quantity: 1 },
  ],
  status: 'Open',
  total: 21.00,
  subtotal: 20.00,
  tax: 2.00,
  discount: 1.00,
  createdAt: '2024-05-29T07:59:00Z',
  isPaid: false,
};

// Mock sales report
const salesReport: SalesReport = {
  totalSalesAmount: 12650.00,
  totalProductSales: 1250,
  totalCustomers: 400,
  netProfit: 12650.00,
  growthAmount: 1543.30,
  growthPercentage: 12.2,
  currency: 'USD',
};

// Mock favorite products with updated images
const favoriteProducts: FavoriteProduct[] = [
  {
    id: '2',
    name: 'Buttermelt Croissant',
    category: 'pastry',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
    totalOrders: 183,
  },
  {
    id: '1',
    name: 'Beef Crowich',
    category: 'sandwich',
    image: 'https://images.unsplash.com/photo-1539252554873-9e588e05e374?w=800&auto=format&fit=crop&q=80',
    totalOrders: 160,
  },
  {
    id: '9',
    name: 'Sliced Blackforest',
    category: 'cake',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&auto=format&fit=crop&q=80',
    totalOrders: 125,
  },
  {
    id: '10',
    name: 'Solo Floss Bread',
    category: 'bread',
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&auto=format&fit=crop&q=80',
    totalOrders: 119,
  },
];

// Mock order history
const orderHistory: OrderHistoryItem[] = [
  {
    id: '001',
    orderNumber: '001',
    date: '25/05/2024',
    time: '08:00 AM',
    customerName: 'George',
    orderStatus: 'Done',
    totalPayment: 'USD 35.00',
    paymentStatus: 'Paid',
  },
  {
    id: '002',
    orderNumber: '002',
    date: '25/05/2024',
    time: '08:17 AM',
    customerName: 'Charlie',
    orderStatus: 'Done',
    totalPayment: 'USD 12.50',
    paymentStatus: 'Paid',
  },
  {
    id: '003',
    orderNumber: '003',
    date: '25/05/2024',
    time: '08:30 AM',
    customerName: 'Hyacinth',
    orderStatus: 'Done',
    totalPayment: 'USD 15.25',
    paymentStatus: 'Paid',
  },
  {
    id: '004',
    orderNumber: '004',
    date: '25/05/2024',
    time: '08:35 AM',
    customerName: 'Francesca',
    orderStatus: 'Done',
    totalPayment: 'USD 22.10',
    paymentStatus: 'Paid',
  },
  {
    id: '005',
    orderNumber: '005',
    date: '25/05/2024',
    time: '08:42 AM',
    customerName: 'Eliza',
    orderStatus: 'Cancelled',
    totalPayment: 'USD 12.25',
    paymentStatus: 'Unpaid',
  },
  {
    id: '006',
    orderNumber: '006',
    date: '25/05/2024',
    time: '09:00 AM',
    customerName: 'Jolly',
    orderStatus: 'Done',
    totalPayment: 'USD 64.00',
    paymentStatus: 'Paid',
  },
  {
    id: '007',
    orderNumber: '007',
    date: '25/05/2024',
    time: '11:20 AM',
    customerName: 'Justin',
    orderStatus: 'Done',
    totalPayment: 'USD 21.50',
    paymentStatus: 'Paid',
  },
  {
    id: '008',
    orderNumber: '008',
    date: '25/05/2024',
    time: '11:58 AM',
    customerName: 'Gregory',
    orderStatus: 'Done',
    totalPayment: 'USD 16.25',
    paymentStatus: 'Paid',
  },
  {
    id: '009',
    orderNumber: '009',
    date: '25/05/2024',
    time: '12:03 AM',
    customerName: 'Alwi',
    orderStatus: 'Cancelled',
    totalPayment: 'USD 19.20',
    paymentStatus: 'Unpaid',
  },
  {
    id: '010',
    orderNumber: '010',
    date: '25/05/2024',
    time: '12:15 PM',
    customerName: 'Ganta',
    orderStatus: 'Done',
    totalPayment: 'USD 12.25',
    paymentStatus: 'Paid',
  },
];

// Mock API functions that return promises
export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 500);
  });
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    const filteredProducts = 
      category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    setTimeout(() => resolve(filteredProducts), 500);
  });
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    const product = products.find(p => p.id === id);
    setTimeout(() => resolve(product), 300);
  });
};

export const fetchActiveOrder = async (): Promise<Order> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(activeOrder), 500);
  });
};

export const fetchSalesReport = async (): Promise<SalesReport> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(salesReport), 700);
  });
};

export const fetchFavoriteProducts = async (): Promise<FavoriteProduct[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(favoriteProducts), 600);
  });
};

export const fetchOrderHistory = async (): Promise<OrderHistoryItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(orderHistory), 800);
  });
};
