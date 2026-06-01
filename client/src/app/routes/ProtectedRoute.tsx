import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../shared/hooks/useAuth';
import { AppLoader } from '../../shared/ui/AppLoader';

export function ProtectedRoute() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return <AppLoader />;

  if (!currentUser) {
    return <Navigate to="/auth/signin" replace />;
  }

  return <Outlet />;
}
