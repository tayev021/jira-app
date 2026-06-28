import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { useAuth } from '../../../../shared/hooks/useAuth';
import { userFactory } from '../../../../shared/test/factories/userFactory';
import { renderWithProviders } from '../../../../shared/test/renders/renderWithProviders';
import { AccountLayout } from './AccountLayout';

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

const user = userFactory({ id: '1' });

describe('app/layouts/AccountLayout/ui/', () => {
  beforeAll(() => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: user,
      isLoading: false,
    });
  });

  it('should render AccountLayout', async () => {
    renderWithProviders(<AccountLayout />);

    expect(
      screen.getByRole('heading', { level: 3, name: /^Welcome, Test Test$/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Bio')).toBeInTheDocument();
    expect(screen.getByText('Issues')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Mock Outlet')).toBeInTheDocument();
  });
});
