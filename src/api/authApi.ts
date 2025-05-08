
// This is a dummy implementation of authentication API
// In a real app, this would connect to a backend server

// Simulated user storage in localStorage
const USERS_STORAGE_KEY = 'bakery_users';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

// Helper to get users from localStorage
const getUsers = (): Record<string, { user: User, password: string }> => {
  const usersData = localStorage.getItem(USERS_STORAGE_KEY);
  return usersData ? JSON.parse(usersData) : {};
};

// Helper to save users to localStorage
const saveUsers = (users: Record<string, { user: User, password: string }>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Initialize with a default admin user if no users exist
const initializeDefaultUser = () => {
  const users = getUsers();
  
  if (Object.keys(users).length === 0) {
    const defaultAdmin = {
      user: {
        id: 'admin-1',
        email: 'admin@bakery.com',
        name: 'Admin User',
        role: 'admin' as const
      },
      password: 'password123'
    };
    
    users[defaultAdmin.user.email] = defaultAdmin;
    saveUsers(users);
  }
};

// Initialize default user
initializeDefaultUser();

// Simulated delay to mimic server latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  // Login function
  login: async (credentials: LoginCredentials): Promise<User> => {
    await delay(800); // Simulate network delay
    
    const { email, password } = credentials;
    const users = getUsers();
    
    const userRecord = users[email];
    
    if (!userRecord || userRecord.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    // Store user in session storage (for current session only)
    sessionStorage.setItem('currentUser', JSON.stringify(userRecord.user));
    
    return userRecord.user;
  },
  
  // Register function
  register: async (data: RegisterData): Promise<User> => {
    await delay(1000); // Simulate network delay
    
    const { email, password, name } = data;
    const users = getUsers();
    
    // Check if user already exists
    if (users[email]) {
      throw new Error('User already exists with this email');
    }
    
    // Create new user with explicitly typed role
    const newUser = {
      user: {
        id: `user-${Date.now()}`,
        email,
        name,
        role: 'staff' as const,  // Explicitly type as 'staff' role
      },
      password
    };
    
    // Save user
    users[email] = newUser;
    saveUsers(users);
    
    // Log in the user
    sessionStorage.setItem('currentUser', JSON.stringify(newUser.user));
    
    return newUser.user;
  },
  
  // Logout function
  logout: async (): Promise<void> => {
    await delay(300); // Simulate network delay
    sessionStorage.removeItem('currentUser');
  },
  
  // Get current user
  getCurrentUser: (): User | null => {
    const userData = sessionStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }
};
