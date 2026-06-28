import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useWorkspace } from '../../../entities/workspace';
import { useIssues } from '../../../entities/issue';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { workspaceFactory } from '../../../shared/test/factories/workspaceFactory';
import { issueFactory } from '../../../shared/test/factories/issueFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import { Issues } from './Issues';
import userEvent from '@testing-library/user-event';
import { createIssue } from '../../../features/createIssue/api/createIssue';
import * as router from 'react-router';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../entities/workspace', () => ({
  useWorkspace: vi.fn(),
}));

vi.mock('../../../entities/issue', () => ({
  useIssues: vi.fn(),
}));

vi.mock('../../../features/createIssue/api/createIssue', () => ({
  createIssue: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual };
});

const user = userFactory({ id: '1' });

describe('widgets/Issues/ui/', () => {
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

  it('should render issues table', async () => {
    vi.mocked(useIssues).mockReturnValue({
      issues: [
        issueFactory({
          slug: 'ISS-1',
          title: 'Issue 1',
          status: 'todo',
          priority: 'none',
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
        issueFactory({
          title: 'Issue 2',
          status: 'in progress',
          priority: 'low',
        }),
        issueFactory({ title: 'Issue 3', status: 'done', priority: 'medium' }),
      ],
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<Issues />);

    expect(screen.getByText('Issue 1')).toBeInTheDocument();
    expect(screen.getByText('Issue 2')).toBeInTheDocument();
    expect(screen.getByText('Issue 3')).toBeInTheDocument();
    expect(screen.getByText('01 May 2026, 19:00')).toBeInTheDocument();
    expect(screen.getByText('10 Jun 2026, 20:01')).toBeInTheDocument();
    expect(screen.getByText(/^todo$/i)).toBeInTheDocument();
    expect(screen.getByText(/^in progress$/i)).toBeInTheDocument();
    expect(screen.getByText(/^done$/i)).toBeInTheDocument();
    expect(screen.getByText(/^none$/i)).toBeInTheDocument();
    expect(screen.getByText(/^low$/i)).toBeInTheDocument();
    expect(screen.getByText(/^medium$/i)).toBeInTheDocument();
    expect(
      screen.getByText(/^ReporterName ReporterSurname$/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/^AssigneeName AssigneeSurname$/i)
    ).toBeInTheDocument();
  });

  it('should not render issues table if no issues', async () => {
    vi.mocked(useIssues).mockReturnValue({
      issues: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<Issues />);

    expect(screen.getByText(/^No issues yet...$/i)).toBeInTheDocument();
  });

  it('should create new issues', async () => {
    vi.spyOn(router, 'useParams').mockReturnValue({ workspaceId: '111' });
    vi.mocked(useIssues).mockReturnValue({
      issues: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<Issues />);

    const event = userEvent.setup();

    await event.click(screen.getByRole('button', { name: /^Create Issue$/i }));

    expect(screen.queryByRole('dialog')).toBeInTheDocument();

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    await event.type(titleInput, 'Issue title');
    await event.type(descriptionInput, 'Issue description');
    await event.click(screen.getByText(/^none$/i));
    await event.click(screen.getByText(/^medium$/i));

    expect(titleInput).toHaveValue('Issue title');
    expect(descriptionInput).toHaveValue('Issue description');

    await event.click(
      screen.getAllByRole('button', { name: /^create issue$/i })[1]
    );

    await waitFor(() => {
      expect(createIssue).toHaveBeenCalledWith({
        title: 'Issue title',
        description: 'Issue description',
        priority: 'medium',
        workspaceId: '111',
      });
    });
  });
});
