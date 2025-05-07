// src/components/admin/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth'; // Pastikan path ini benar

function PrivateRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default PrivateRoute;
