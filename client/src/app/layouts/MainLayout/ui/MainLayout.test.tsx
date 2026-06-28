import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { useAuth } from '../../../../shared/hooks/useAuth';
import { userFactory } from '../../../../shared/test/factories/userFactory';
import { renderWithProviders } from '../../../../shared/test/renders/renderWithProviders';
import { MainLayout } from './MainLayout';
import userEvent from '@testing-library/user-event';
import { signOut } from '../../../../features/signOut/api/signOut';

vi.mock('../../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');

  return {
    ...actual,
    Outlet: () => <div>Mock Outlet</div>,
  };
});

vi.mock('../../../../features/signOut/api/signOut', () => ({
  signOut: vi.fn(),
}));

const user = userFactory({ id: '1' });

describe('app/layouts/MainLayout/ui/', () => {
  beforeAll(() => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: user,
      isLoading: false,
    });
  });

  it('should render MainLayout with authorized user and sign out', async () => {
    renderWithProviders(<MainLayout />);

    const event = userEvent.setup();

    expect(
      screen.getByRole('heading', { level: 2, name: /Jira/i })
    ).toBeInTheDocument();
    expect(screen.getByText('TT')).toBeInTheDocument();
    expect(screen.getByText('Mock Outlet')).toBeInTheDocument();

    await event.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
    });
  });

  it('should render MainLayout with unauthorized user', async () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: undefined,
      isLoading: false,
    });

    renderWithProviders(<MainLayout />);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });
});
