
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1E88E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9.5 7.5-2 2a4.95 4.95 0 1 0 7 7l2-2a4.95 4.95 0 1 0-7-7Z" />
            <path d="M14 6.5v10" />
            <path d="M10 7.5v10" />
            <path d="m16 7 1-5 1.37.68A3 3 0 0 0 19.7 3H21v1.3c0 .46.1.92.32 1.33L22 7l-5 1" />
            <path d="m8 17-1 5-1.37-.68A3 3 0 0 0 4.3 21H3v-1.3a3 3 0 0 0-.32-1.33L2 17l5-1" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="px-6 py-6 text-base">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
