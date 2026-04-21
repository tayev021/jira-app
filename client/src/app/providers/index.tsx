import type { ReactNode } from 'react';
import { AuthProvider } from './AuthProvider';
import { QueryClientProvider } from './QueryClientProvider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
