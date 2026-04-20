import type { ReactNode } from 'react';
import { QueryClientProvider as Provider } from '@tanstack/react-query';
import { queryClient } from '../../shared/api/queryClient';

interface QueryClientProviderProps {
  children: ReactNode;
}

export function QueryClientProvider({ children }: QueryClientProviderProps) {
  return <Provider client={queryClient}>{children}</Provider>;
}
