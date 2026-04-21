import type { ReactNode } from 'react';
import { useMe } from '../../entities/user';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { isLoading } = useMe();

  if (isLoading) return <div>Loading...</div>;

  return children;
}
