import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useWorkspace } from '../../../entities/workspace';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { workspaceFactory } from '../../../shared/test/factories/workspaceFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import { Settings } from './Settings';
import { useIssues } from '../../../entities/issue';
import { issueFactory } from '../../../shared/test/factories/issueFactory';
import * as router from 'react-router';
import userEvent from '@testing-library/user-event';
import { deleteWorkspace } from '../../../features/deleteWorkspace/api/deleteWorkspace';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../entities/workspace', () => ({
  useWorkspace: vi.fn(),
}));

vi.mock('../../../entities/issue', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../../entities/issue')>();

  return {
    ...actual,
    useIssues: vi.fn(),
  };
});

vi.mock('../../../features/deleteWorkspace/api/deleteWorkspace', () => ({
  deleteWorkspace: vi.fn(),
}));

const user = userFactory({ id: '1' });

describe('widgets/Settings/ui/', () => {
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

  it('should render disabled delete workspace feature', async () => {
    vi.mocked(useIssues).mockReturnValue({
      issues: [issueFactory({ workspaceId: '111' })],
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<Settings />);

    expect(
      screen.getByRole('heading', {
        level: 4,
        name: /^Delete Workspace$/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Once you delete your workspace, there is no going back. Please be certain'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'You cannot delete a workspace while it contains issues in progress'
      )
    ).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', {
      name: /Delete Workspace/i,
    });

    expect(deleteButton).toBeDisabled();
  });

  it('should render delete workspace feature', async () => {
    vi.spyOn(router, 'useParams').mockReturnValue({ workspaceId: '111' });
    vi.mocked(useIssues).mockReturnValue({
      issues: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<Settings />);

    expect(
      screen.getByRole('heading', {
        level: 4,
        name: /^Delete Workspace$/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Once you delete your workspace, there is no going back. Please be certain'
      )
    ).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', {
      name: /Delete Workspace/i,
    });

    expect(deleteButton).toBeEnabled();

    const event = userEvent.setup();

    await event.click(deleteButton);

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to delete this workspace?')
    ).toBeInTheDocument();

    await event.click(screen.getByRole('button', { name: /^Delete$/i }));
    await waitFor(() => {
      expect(deleteWorkspace).toHaveBeenCalledWith({
        workspaceId: '111',
      });
    });
  });
});
