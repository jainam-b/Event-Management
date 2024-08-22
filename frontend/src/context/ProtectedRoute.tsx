import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated:", isAuthenticated); // Debugging line
  
  if (isAuthenticated === undefined) {
    return null; // Render nothing or a loading spinner while the state is being determined
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />; // Update the path to your login page
};

export default ProtectedRoute;