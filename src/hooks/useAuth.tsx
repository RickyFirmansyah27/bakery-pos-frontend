
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { authApi, User, LoginCredentials, RegisterData } from '@/api/authApi';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  // Query to get the current user
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authApi.getCurrentUser(),
    staleTime: Infinity, // Don't refetch unless explicitly invalidated
  });

  // Set user when the query resolves
  useEffect(() => {
    if (!isLoading) {
      setUser(currentUser);
    }
  }, [currentUser, isLoading]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (loggedInUser) => {
      setUser(loggedInUser);
      queryClient.setQueryData(['currentUser'], loggedInUser);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (newUser) => {
      setUser(newUser);
      queryClient.setQueryData(['currentUser'], newUser);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setUser(null);
      queryClient.setQueryData(['currentUser'], null);
      // Optional: clear all queries from cache
      queryClient.clear();
    },
  });

  const login = async (credentials: LoginCredentials): Promise<User> => {
    return await loginMutation.mutateAsync(credentials);
  };

  const register = async (data: RegisterData): Promise<User> => {
    return await registerMutation.mutateAsync(data);
  };

  const logout = async (): Promise<void> => {
    await logoutMutation.mutateAsync();
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
