import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('accessToken') !== null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/"/>;
};

export default PrivateRoute;