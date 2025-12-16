'use client';

import { Navigate } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate href="/login" replace />;
  }

  if (!user.validated) {
    return <Navigate href="/validation-attente" replace />;
  }

  return <>{children}</>;
}
