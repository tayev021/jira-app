import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '../../shared/hooks/useAuth';

export function ProtectedRoute() {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser && !isLoading) navigate('/auth/signin');
  }, [currentUser, isLoading, navigate]);

  if (isLoading) return 'Loader placeholder';

  return <Outlet />;
}
