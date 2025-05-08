
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register({ name, email, password });
      toast({
        title: "Success",
        description: "Account created successfully"
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to register",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-4",
      isDark ? "bg-gray-900" : "bg-gray-50"
    )}>
      <div className={cn(
        "w-full max-w-md p-8 space-y-8 rounded-lg shadow-lg", 
        isDark ? "bg-gray-800" : "bg-white"
      )}>
        <div className="text-center">
          <h1 className={cn(
            "text-3xl font-bold",
            isDark ? "text-white" : "text-gray-900"
          )}>
            Create Account
          </h1>
          <p className={cn(
            "mt-2 text-sm",
            isDark ? "text-gray-300" : "text-gray-600"
          )}>
            Register to use Bakery POS
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className={cn(
              "block text-sm font-medium",
              isDark ? "text-gray-200" : "text-gray-700"
            )}>
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={cn(
                isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : ""
              )}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className={cn(
              "block text-sm font-medium",
              isDark ? "text-gray-200" : "text-gray-700"
            )}>
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : ""
              )}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className={cn(
              "block text-sm font-medium",
              isDark ? "text-gray-200" : "text-gray-700"
            )}>
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : ""
              )}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm-password" className={cn(
              "block text-sm font-medium",
              isDark ? "text-gray-200" : "text-gray-700"
            )}>
              Confirm Password
            </label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={cn(
                isDark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : ""
              )}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : 'Register'}
          </Button>
          
          <div className="text-center">
            <Link 
              to="/login" 
              className={cn(
                "text-sm hover:underline",
                isDark ? "text-blue-400" : "text-blue-600"
              )}
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
