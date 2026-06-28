import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useAuth } from '../../../shared/hooks/useAuth';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import { SignInPage } from './SignInPage';
import { MemoryRouter, Route, Routes } from 'react-router';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

const user = userFactory({ id: '1' });

describe('pages/auth/signin', () => {
  beforeAll(() => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: user,
      isLoading: false,
    });
  });

  it('should render app if user signed in', async () => {
    render(
      <MemoryRouter initialEntries={['/auth/signin']}>
        <Routes>
          <Route path="/auth/signin" element={<SignInPage />} />
          <Route path="/app" element={<div>App</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('App')).toBeInTheDocument();
  });

  it('should render sign in page if user unauthorized', async () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: undefined,
      isLoading: false,
    });

    renderWithProviders(<SignInPage />);

    expect(
      screen.getByRole('heading', { level: 2, name: /^Welcome back$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /^Sign In$/i })
    ).toBeInTheDocument();
  });
});
