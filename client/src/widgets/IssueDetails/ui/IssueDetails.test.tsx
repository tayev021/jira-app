import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { useIssue } from '../../../entities/issue';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import { IssueDetails } from './IssueDetails';
import { ApiError } from '../../../shared/utils/ApiError';
import toast from 'react-hot-toast';
import { issueFactory } from '../../../shared/test/factories/issueFactory';
import { userFactory } from '../../../shared/test/factories/userFactory';
import userEvent from '@testing-library/user-event';
import { updateIssueDescription } from '../../../features/updateIssueDescription/api/updateIssueDescription';
import { updateIssueStatus } from '../../../features/updateIssueStatus/api/updateIssueStatus';
import { updateIssuePriority } from '../../../features/updateIssuePriority/api/updateIssuePriority';
import { useWorkspace } from '../../../entities/workspace';
import { useAuth } from '../../../shared/hooks/useAuth';
import { workspaceFactory } from '../../../shared/test/factories/workspaceFactory';
import { addAssignee } from '../../../features/addAssignee/api/addAssignee';
import { deleteIssue } from '../../../features/deleteIssue/api/deleteIssue';

vi.mock('../../../entities/issue', () => ({
  useIssue: vi.fn(),
}));

vi.mock(
  '../../../features/updateIssueDescription/api/updateIssueDescription',
  () => ({
    updateIssueDescription: vi.fn(),
  })
);

vi.mock('../../../features/updateIssueStatus/api/updateIssueStatus', () => ({
  updateIssueStatus: vi.fn(),
}));

vi.mock(
  '../../../features/updateIssuePriority/api/updateIssuePriority',
  () => ({
    updateIssuePriority: vi.fn(),
  })
);

vi.mock('../../../features/addAssignee/api/addAssignee', () => ({
  addAssignee: vi.fn(),
}));

vi.mock('../../../features/deleteIssue/api/deleteIssue', () => ({
  deleteIssue: vi.fn(),
}));

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../entities/workspace', () => ({
  useWorkspace: vi.fn(),
}));

const user = userFactory({ id: '1' });

describe('widgets/IssueDetails/ui/', () => {
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

  it('should render loader', () => {
    vi.mocked(useIssue).mockReturnValue({
      issue: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    renderWithProviders(<IssueDetails />);

    expect(
      screen.getByRole('status', {
        name: /loading/i,
      })
    ).toBeInTheDocument();
  });

  it('should render error', async () => {
    vi.mocked(useIssue).mockReturnValue({
      issue: undefined,
      isLoading: false,
      isError: true,
      error: new ApiError({ code: 'ERROR', message: 'Test Error' }),
    });

    renderWithProviders(<IssueDetails />);

    expect(toast.error).toHaveBeenCalledWith('Test Error');
  });

  it('should render issue details', async () => {
    vi.mocked(useIssue).mockReturnValue({
      issue: issueFactory({
        slug: 'ISS-1',
        title: 'Test 1',
        description: 'test description',
        status: 'todo',
        priority: 'medium',
        reporter: userFactory({
          name: 'ReporterName',
          surname: 'ReporterSurname',
        }),
        assignees: [
          userFactory({
            name: 'AssigneeName',
            surname: 'AssigneeSurname',
          }),
        ],
        createdAt: new Date('2026-05-01T19:00:00Z').toISOString(),
        updatedAt: new Date('2026-06-10T20:01:00Z').toISOString(),
      }),
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<IssueDetails />);

    expect(
      screen.getByRole('heading', { level: 3, name: /test 1/i })
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(/test description/i)).toBeInTheDocument();
    expect(screen.getByText('01 May 2026, 19:00')).toBeInTheDocument();
    expect(screen.getByText('10 Jun 2026, 20:01')).toBeInTheDocument();
    expect(screen.getByText(/todo/i)).toBeInTheDocument();
    expect(screen.getByText(/medium/i)).toBeInTheDocument();
    expect(screen.getByText(/ReporterName/i)).toBeInTheDocument();
    expect(screen.getByText(/ReporterSurname/i)).toBeInTheDocument();
    expect(screen.getByText(/AssigneeName/i)).toBeInTheDocument();
    expect(screen.getByText(/AssigneeSurname/i)).toBeInTheDocument();
  });

  it('should update issue description when user types into the textarea', async () => {
    vi.mocked(useIssue).mockReturnValue({
      issue: issueFactory({
        id: '1',
        description: 'test description',
      }),
      isLoading: false,
      isError: false,
      error: null,
    });

    const event = userEvent.setup();

    renderWithProviders(<IssueDetails />);

    const textarea = screen.getByDisplayValue(/test description/i);

    await event.clear(textarea);
    await event.type(textarea, 'New description');
    await event.tab();

    await waitFor(() => {
      expect(updateIssueDescription).toHaveBeenCalledWith({
        issueId: '1',
        description: 'New description',
      });
    });
  });

  it('should update issue status when user chooses new status', async () => {
    vi.mocked(useIssue).mockReturnValue({
      issue: issueFactory({ id: '1', status: 'todo' }),
      isLoading: false,
      isError: false,
      error: null,
    });

    const event = userEvent.setup();

    renderWithProviders(<IssueDetails />);

    await event.click(screen.getByRole('button', { name: /todo/i }));

    const doneButton = await screen.findByRole('button', {
      name: /done/i,
    });

    await event.click(doneButton);

    await waitFor(() => {
      expect(updateIssueStatus).toHaveBeenCalledWith({
        issueId: '1',
        status: 'done',
      });
    });
  });

  it('should update issue priority when user chooses new priority', async () => {
    vi.mocked(useIssue).mockReturnValue({
      issue: issueFactory({ id: '1', priority: 'none' }),
      isLoading: false,
      isError: false,
      error: null,
    });

    const event = userEvent.setup();

    renderWithProviders(<IssueDetails />);

    await event.click(screen.getByRole('button', { name: /none/i }));

    const highButton = await screen.findByRole('button', {
      name: /high/i,
    });

    await event.click(highButton);

    await waitFor(() => {
      expect(updateIssuePriority).toHaveBeenCalledWith({
        issueId: '1',
        priority: 'high',
      });
    });
  });

  it('should assign workspace member to issue', async () => {
    vi.mocked(useIssue).mockReturnValue({
      issue: issueFactory({ id: '222', reporter: user, workspaceId: '111' }),
      isLoading: false,
      isError: false,
      error: null,
    });

    const event = userEvent.setup();

    renderWithProviders(<IssueDetails />);

    await event.click(screen.getByRole('button', { name: /Add Assignee/i }));

    expect(screen.queryByRole('dialog')).toBeInTheDocument();

    await event.click(screen.getByRole('button', { name: /^Assign$/i }));

    await waitFor(() => {
      expect(addAssignee).toHaveBeenCalledWith({
        assigneeId: '1',
        issueId: '222',
      });
    });
  });

  it('should delete issue', async () => {
    vi.mocked(useIssue).mockReturnValue({
      issue: issueFactory({ id: '222', reporter: user, workspaceId: '111' }),
      isLoading: false,
      isError: false,
      error: null,
    });

    const event = userEvent.setup();

    renderWithProviders(<IssueDetails />);

    await event.click(screen.getByRole('button', { name: /^Delete Issue$/i }));

    expect(screen.queryByRole('dialog')).toBeInTheDocument();

    await event.click(screen.getByRole('button', { name: /^Delete$/i }));

    await waitFor(() => {
      expect(deleteIssue).toHaveBeenCalledWith({ issueId: '222' });
    });
  });
});
