import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../shared/hooks/useAuth';

export function ProtectedRoute() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return 'Loader placeholder';

  if (!currentUser) {
    return <Navigate to="/auth/signin" replace />;
  }

  return <Outlet />;
}
