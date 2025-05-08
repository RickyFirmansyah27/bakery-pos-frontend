
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PointOfSale from "./pages/PointOfSale";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Activity from "./pages/Activity";
import Settings from "./pages/Settings";
import Teams from "./pages/Teams";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider } from "./hooks/useTheme";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import "./App.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }
  
  return isAuthenticated ? <>{element}</> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Protected routes */}
                  <Route path="/" element={<ProtectedRoute element={<Layout><PointOfSale /></Layout>} />} />
                  <Route path="/dashboard" element={<ProtectedRoute element={<Layout><Dashboard /></Layout>} />} />
                  <Route path="/report" element={<ProtectedRoute element={<Layout><Report /></Layout>} />} />
                  <Route path="/activity" element={<ProtectedRoute element={<Layout><Activity /></Layout>} />} />
                  <Route path="/settings" element={<ProtectedRoute element={<Layout><Settings /></Layout>} />} />
                  <Route path="/teams" element={<ProtectedRoute element={<Layout><Teams /></Layout>} />} />
                  <Route path="/payment" element={<ProtectedRoute element={<Payment />} />} />
                  <Route path="/payment-success" element={<ProtectedRoute element={<PaymentSuccess />} />} />
                  
                  {/* Redirect index to root */}
                  <Route path="/index" element={<Navigate to="/" replace />} />
                  
                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
