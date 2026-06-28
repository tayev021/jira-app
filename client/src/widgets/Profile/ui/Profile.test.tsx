import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { useWorkspace } from '../../../entities/workspace';
import { useAuth } from '../../../shared/hooks/useAuth';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { workspaceFactory } from '../../../shared/test/factories/workspaceFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import { Profile } from './Profile';
import { useUser } from '../../../entities/user';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../entities/workspace', () => ({
  useWorkspace: vi.fn(),
}));

vi.mock('../../../entities/user/api/getUser', () => ({
  getUser: vi.fn(),
}));

vi.mock('../../../entities/user', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../../entities/user')>();

  return {
    ...actual,
    useUser: vi.fn(),
  };
});

const user = userFactory({ id: '1' });

describe('widgets/Profile/ui/', () => {
  beforeAll(() => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: user,
      isLoading: false,
    });
    vi.mocked(useWorkspace).mockReturnValue({
      workspace: workspaceFactory({
        id: '111',
        owner: user,
        members: [user],
      }),
      isLoading: false,
      isError: false,
      error: null,
    });
  });

  it('should render user profile', async () => {
    vi.mocked(useUser).mockReturnValue({
      user: userFactory({ id: '2', name: 'Name', surname: 'Surname' }),
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<Profile />);

    await waitFor(() => {
      expect(useUser).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Name Surname')).toBeInTheDocument();
      expect(screen.getByText('test@test.com')).toBeInTheDocument();
      expect(
        screen.getByText(`Name Surname doesn't have a bio yet`)
      ).toBeInTheDocument();
    });
  });
});
