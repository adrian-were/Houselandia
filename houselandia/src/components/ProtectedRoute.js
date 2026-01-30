import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children, onOpenLogin }) => {
  useEffect(() => {
    if (!user) {
      // If no user, open the login modal automatically
      onOpenLogin();
    }
  }, [user, onOpenLogin]);

  if (!user) {
    // Redirect them to home while the login modal pops up
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;