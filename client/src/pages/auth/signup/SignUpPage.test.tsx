import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useAuth } from '../../../shared/hooks/useAuth';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import { MemoryRouter, Route, Routes } from 'react-router';
import { SignUpPage } from './SignUpPage';

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
          <Route path="/auth/signin" element={<SignUpPage />} />
          <Route path="/app" element={<div>App</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('App')).toBeInTheDocument();
  });

  it('should render sign up page if user unauthorized', async () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: undefined,
      isLoading: false,
    });

    renderWithProviders(<SignUpPage />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /^Start organizing your work today$/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /^Sign Up$/i })
    ).toBeInTheDocument();
  });
});
