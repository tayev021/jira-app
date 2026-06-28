import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Providers } from '../../../app/providers';
import { MemoryRouter } from 'react-router';

export function renderWithProviders(ui: ReactNode) {
  return render(
    <Providers>
      <MemoryRouter>{ui}</MemoryRouter>
    </Providers>
  );
}
