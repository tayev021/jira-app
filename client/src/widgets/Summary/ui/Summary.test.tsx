import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { useWorkspace } from '../../../entities/workspace';
import { useAuth } from '../../../shared/hooks/useAuth';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { workspaceFactory } from '../../../shared/test/factories/workspaceFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import { Summary } from './Summary';
import * as router from 'react-router';
import { getWorkspaceStatistics } from '../../../entities/workspace/api/getWorkspaceStatistics';
import { ApiError } from '../../../shared/utils/ApiError';
import toast from 'react-hot-toast';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../entities/workspace', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../../entities/workspace')>();

  return {
    ...actual,
    useWorkspace: vi.fn(),
  };
});

vi.mock('../../../entities/workspace/api/getWorkspaceStatistics', () => ({
  getWorkspaceStatistics: vi.fn(),
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render workspace summary', async () => {
    vi.spyOn(router, 'useParams').mockReturnValue({ workspaceId: '111' });
    vi.mocked(getWorkspaceStatistics).mockReturnValue(
      Promise.resolve({
        createdInLastWeek: 7,
        updatedInLastWeek: 4,
        completedInLastWeek: 2,
        statuses: {
          todo: 10,
          'in progress': 5,
          done: 5,
        },
        priorities: {
          none: 2,
          low: 3,
          medium: 10,
          high: 5,
        },
      })
    );

    renderWithProviders(<Summary />);

    await waitFor(() => {
      expect(getWorkspaceStatistics).toHaveBeenCalledWith('111');
    });

    await waitFor(() => {
      expect(screen.getByText('Test Test')).toBeInTheDocument();
      expect(screen.getByText('3 members in workspace')).toBeInTheDocument();
      expect(screen.getByText('7 created')).toBeInTheDocument();
      expect(screen.getByText('4 updated')).toBeInTheDocument();
      expect(screen.getByText('2 completed')).toBeInTheDocument();
      expect(screen.getByText('Todo: 10')).toBeInTheDocument();
      expect(screen.getByText('In progress: 5')).toBeInTheDocument();
      expect(screen.getByText('Done: 5')).toBeInTheDocument();
    });
  });

  it('should render error toast if loading the workspace fails', async () => {
    vi.spyOn(router, 'useParams').mockReturnValue({ workspaceId: '111' });
    vi.mocked(useWorkspace).mockReturnValue({
      workspace: undefined,
      isLoading: false,
      isError: true,
      error: new ApiError({ code: 'ERROR', message: 'Fail load workspace' }),
    });

    renderWithProviders(<Summary />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Fail load workspace');
    });
  });
});
