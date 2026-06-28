import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useAuth } from '../../shared/hooks/useAuth';
import { userFactory } from '../../shared/test/factories/userFactory';
import { ProtectedRoute } from './ProtectedRoute';
import { MemoryRouter, Route, Routes } from 'react-router';

vi.mock('../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../shared/ui/AppLoader', () => ({
  AppLoader: () => <div>Loading...</div>,
}));

describe('app/routes/ProtectedRoute', () => {
  it('should render loader while auth is loading', () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: undefined,
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should redirect to sign in when user is not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: undefined,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<div>Protected page</div>} />
          </Route>
          <Route path="/auth/signin" element={<div>Sign In Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Sign In Page')).toBeInTheDocument();
  });

  it('should render outlet when user is authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: userFactory(),
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<div>Protected page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected page')).toBeInTheDocument();
  });
});
