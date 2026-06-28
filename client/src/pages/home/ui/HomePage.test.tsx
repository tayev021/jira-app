import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useAuth } from '../../../shared/hooks/useAuth';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import { MemoryRouter, Route, Routes } from 'react-router';
import { HomePage } from './HomePage';

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
          <Route path="/auth/signin" element={<HomePage />} />
          <Route path="/app" element={<div>App</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('App')).toBeInTheDocument();
  });

  it('should render home page if user unauthorized', async () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: undefined,
      isLoading: false,
    });

    renderWithProviders(<HomePage />);

    expect(
      screen.getByRole('heading', { level: 2, name: /^More projects$/i })
    ).toBeInTheDocument();

    const linkGetStarted = screen.getByRole('link', { name: /get started/i });
    const linkContinue = screen.getByRole('link', { name: /continue/i });

    expect(linkGetStarted).toBeInTheDocument();
    expect(linkGetStarted).toHaveAttribute('href', '/auth/signup');
    expect(linkContinue).toBeInTheDocument();
    expect(linkContinue).toHaveAttribute('href', '/auth/signin');
  });
});
