import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useWorkspace } from '../../../entities/workspace';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { workspaceFactory } from '../../../shared/test/factories/workspaceFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import { Members } from './Members';
import userEvent from '@testing-library/user-event';
import * as router from 'react-router';
import { searchUsers } from '../../../features/searchUsers/api/searchUsers';
import { addMember } from '../../../features/addMember/api/addMember';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../entities/workspace', () => ({
  useWorkspace: vi.fn(),
}));

vi.mock('../../../features/searchUsers/api/searchUsers', () => ({
  searchUsers: vi.fn(),
}));

vi.mock('../../../features/addMember/api/addMember', () => ({
  addMember: vi.fn(),
}));

const user = userFactory({ id: '1' });
const firstMember = userFactory({ id: '2', name: 'First', surname: 'Member' });
const secondMember = userFactory({
  id: '3',
  name: 'Second',
  surname: 'Member',
});

describe('widgets/Members/ui/', () => {
  beforeAll(() => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: user,
      isLoading: false,
    });
    vi.mocked(useWorkspace).mockReturnValue({
      workspace: workspaceFactory({
        id: '111',
        owner: user,
        members: [user, firstMember, secondMember],
      }),
      isLoading: false,
      isError: false,
      error: null,
    });
  });

  it('should render workspace members', async () => {
    renderWithProviders(<Members />);

    expect(screen.getByText('Test Test')).toBeInTheDocument();
    expect(screen.getByText('First Member')).toBeInTheDocument();
    expect(screen.getByText('Second Member')).toBeInTheDocument();
  });

  it('should not render members list if there are no members in the workspace ', async () => {
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

    renderWithProviders(<Members />);

    expect(
      screen.getByText('There are no members in this workspace')
    ).toBeInTheDocument();
  });

  it('should invite user to workspace', async () => {
    vi.spyOn(router, 'useParams').mockReturnValue({ workspaceId: '111' });
    vi.mocked(searchUsers).mockReturnValue(
      Promise.resolve([
        userFactory({ id: '123', name: 'Test', surname: 'Member' }),
      ])
    );

    renderWithProviders(<Members />);

    const event = userEvent.setup();

    await event.click(screen.getByRole('button', { name: /^Invite Member$/i }));

    expect(screen.queryByRole('dialog')).toBeInTheDocument();

    const searchInput = screen.getByRole('textbox');

    await event.type(searchInput, 'test');
    await waitFor(() => {
      expect(searchUsers).toHaveBeenCalledWith({
        query: 'test',
        workspaceId: '111',
      });
    });

    expect(screen.getByText('Test Member')).toBeInTheDocument();

    await event.click(screen.getByRole('button', { name: /^Invite$/i }));
    await waitFor(() => {
      expect(addMember).toHaveBeenCalledWith({
        userId: '123',
        workspaceId: '111',
      });
    });
  });
});
