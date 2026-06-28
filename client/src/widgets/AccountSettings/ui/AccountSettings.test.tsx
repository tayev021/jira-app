import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useWorkspaces } from '../../../entities/workspace';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { AccountSettings } from './AccountSettings';
import { workspaceFactory } from '../../../shared/test/factories/workspaceFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import userEvent from '@testing-library/user-event';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../entities/workspace', () => ({
  useWorkspaces: vi.fn(),
}));

describe('widgets/AccountSettings/ui/', () => {
  it('should redirect to sign in page when user is not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: undefined,
      isLoading: false,
    });
    vi.mocked(useWorkspaces).mockReturnValue({
      workspaces: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/account/settings']}>
        <Routes>
          <Route path="/account/settings" element={<AccountSettings />} />
          <Route path="/auth/signin" element={<div>Sign In Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Sign In Page')).toBeInTheDocument();
  });

  it('should render delete account widget', () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: userFactory(),
      isLoading: false,
    });
    vi.mocked(useWorkspaces).mockReturnValue({
      workspaces: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<AccountSettings />);

    expect(
      screen.getByRole('heading', { level: 4, name: /delete account/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Once you delete your account, there is no going back. Please be certain'
      )
    ).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /delete account/i });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('should prohibit delete account', () => {
    const user = userFactory();

    vi.mocked(useAuth).mockReturnValue({
      currentUser: user,
      isLoading: false,
    });
    vi.mocked(useWorkspaces).mockReturnValue({
      workspaces: [workspaceFactory({ owner: user })],
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<AccountSettings />);

    expect(
      screen.getByRole('heading', { level: 4, name: /delete account/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Once you delete your account, there is no going back. Please be certain'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('You cannot delete a workspace owner account')
    ).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /delete account/i });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('should open delete account modal when button is clicked', async () => {
    const event = userEvent.setup();
    vi.mocked(useAuth).mockReturnValue({
      currentUser: userFactory(),
      isLoading: false,
    });
    vi.mocked(useWorkspaces).mockReturnValue({
      workspaces: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<AccountSettings />);

    const button = screen.getByRole('button', { name: /delete account/i });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await event.click(button);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
