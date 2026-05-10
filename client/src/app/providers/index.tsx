import type { ReactNode } from 'react';
import { AuthProvider } from './AuthProvider';
import { QueryClientProvider } from './QueryClientProvider';
import { DropdownProvider } from './DropdownProvider';
import { ModalProvider } from './ModalProvider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider>
      <AuthProvider>
        <ModalProvider>
          <DropdownProvider>{children}</DropdownProvider>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
