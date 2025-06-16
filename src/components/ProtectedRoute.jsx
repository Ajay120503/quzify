import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const name = localStorage.getItem('quiz-user-name');

  if (!name) {
    return <Navigate to="/User" replace />;
  }

  return children;
};

export default ProtectedRoute;
