import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useValidateSession } from '../../features/auth/hooks/use-auth';
import { clearAuthSession, getAuthToken } from '../../core/lib/auth';

interface ProtectedLayoutProps {
    children: React.ReactNode
}

export const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const location = useLocation();
  const token = getAuthToken();


  const { isLoading, isError } = useValidateSession(token);


  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
        <Loader2 size={40} className="animate-spin text-primary mb-4" />
        <p className="text-sm text-text-muted font-medium animate-pulse">
          Verifying credentials...
        </p>
      </div>
    );
  }

  // 4. Error State (Redirect)
  if (isError) {
    clearAuthSession();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children
};