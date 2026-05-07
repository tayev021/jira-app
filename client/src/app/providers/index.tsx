import type { ReactNode } from 'react';
import { AuthProvider } from './AuthProvider';
import { QueryClientProvider } from './QueryClientProvider';
import { DropdownProvider } from './DropdownProvider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider>
      <AuthProvider>
        <DropdownProvider>{children}</DropdownProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
