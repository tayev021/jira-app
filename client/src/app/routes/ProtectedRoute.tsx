import { useEffect, type ReactNode } from 'react';
import { useMe } from '../../entities/user';
import { useNavigate } from 'react-router';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) navigate('/auth/signin');
  }, [user, isLoading, navigate]);

  if (isLoading) return 'Loader placeholder';

  return children;
}
