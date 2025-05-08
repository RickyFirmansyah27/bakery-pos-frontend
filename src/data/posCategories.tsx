
import React from 'react';

export interface CategoryTab {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
}

export const posCategories: CategoryTab[] = [
  { 
    id: 'all', 
    name: 'All Menu', 
    count: 110,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m16 10-4 4-4-4" />
      </svg>
    )
  },
  { 
    id: 'bread', 
    name: 'Breads', 
    count: 20,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M6 17h12" />
      </svg>
    )
  },
  { 
    id: 'cake', 
    name: 'Cakes', 
    count: 20,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="12" r="4" />
        <circle cx="17" cy="12" r="4" />
        <path d="M12 4h.01" />
        <path d="M12 20h.01" />
        <path d="M4 8V7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1" />
        <path d="M4 16v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1" />
      </svg>
    )
  },
  { 
    id: 'donut', 
    name: 'Donuts', 
    count: 20,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <path d="M8.56 3.69a9 9 0 0 0-2.92 1.95" />
        <path d="M3.69 8.56A9 9 0 0 0 3 12" />
        <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
        <path d="M8.56 20.31A9 9 0 0 0 12 21" />
        <path d="M15.44 20.31a9 9 0 0 0 2.92-1.95" />
        <path d="M20.31 15.44A9 9 0 0 0 21 12" />
        <path d="M20.31 8.56a9 9 0 0 0-1.95-2.92" />
        <path d="M15.44 3.69A9 9 0 0 0 12 3" />
      </svg>
    ) 
  },
  { 
    id: 'pastry', 
    name: 'Pastries', 
    count: 20,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.8 18-3.6-10a2 2 0 0 0-1.9-1.4H7.7a2 2 0 0 0-1.9 1.4L2.2 18" />
        <path d="M5 18h14" />
        <path d="M3 22h18" />
      </svg>
    )
  },
  { 
    id: 'sandwich', 
    name: 'Sandwich', 
    count: 20,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3" />
        <path d="M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83" />
        <path d="m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z" />
        <path d="M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z" />
      </svg>
    )
  },
];

export default posCategories;
