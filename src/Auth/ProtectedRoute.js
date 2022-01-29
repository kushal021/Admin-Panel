import React from 'react';
import { useUserAuth } from './UserAuthContext';
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const { user } = useUserAuth();

  if (!user) {
    return <Navigate to='/login' />
  }
  return children;
}

export default ProtectedRoute;