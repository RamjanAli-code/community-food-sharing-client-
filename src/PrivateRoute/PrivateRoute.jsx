import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) return <p>Loading...</p>;
  if (!user) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }
  return children;
};
export default PrivateRoute;