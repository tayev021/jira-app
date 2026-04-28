import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useAuth } from '../../../shared/hooks/useAuth';

export function HomePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/app');
  }, [currentUser, navigate]);

  return <div>Home Page</div>;
}
