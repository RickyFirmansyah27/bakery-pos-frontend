
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to the Point of Sale page
  return <Navigate to="/" replace />;
};

export default Index;
