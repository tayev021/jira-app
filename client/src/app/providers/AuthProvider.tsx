import { type ReactNode } from 'react';
import { useMe } from '../../entities/user';
import { AuthContext } from '../../shared/context/AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, isLoading } = useMe();

  if (isLoading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ currentUser: user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
