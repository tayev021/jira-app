import type { ReactNode } from 'react';
import { QueryClientProvider } from './QueryClientProvider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}
