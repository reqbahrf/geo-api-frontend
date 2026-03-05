import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isInitializing, initializeAuth } = useAuthStore();

  useEffect(() => {
    if (!isInitializing) {
      initializeAuth();
    }
  }, [isInitializing, initializeAuth]);

  if (isInitializing) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to='/home'
        replace
      />
    );
  }

  return <>{children}</>;
}
