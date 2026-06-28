import { vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useIssues } from '../../../entities/issue';
import { Board } from './Board';
import { ApiError } from '../../../shared/utils/ApiError';
import toast from 'react-hot-toast';
import { issueFactory } from '../../../shared/test/factories/issueFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import userEvent from '@testing-library/user-event';
import { updateIssueStatus } from '../../../features/updateIssueStatus/api/updateIssueStatus';

vi.mock('../../../entities/issue', () => ({
  useIssues: vi.fn(),
}));

vi.mock('../../../features/updateIssueStatus/api/updateIssueStatus', () => ({
  updateIssueStatus: vi.fn(),
}));

describe('widgets/Board/ui/', () => {
  it('should render loader', () => {
    vi.mocked(useIssues).mockReturnValue({
      issues: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<Board />);

    expect(
      screen.getByRole('status', {
        name: /loading/i,
      })
    ).toBeInTheDocument();
  });

  it('should render error', async () => {
    vi.mocked(useIssues).mockReturnValue({
      issues: undefined,
      isLoading: false,
      isError: true,
      error: new ApiError({ code: 'ERROR', message: 'Test Error' }),
    });

    renderWithProviders(<Board />);

    expect(toast.error).toHaveBeenCalledWith('Test Error');
  });

  it('should render board', async () => {
    vi.mocked(useIssues).mockReturnValue({
      issues: [
        issueFactory({ slug: 'ISS-1', title: 'Test 1', status: 'todo' }),
        issueFactory({ slug: 'ISS-2', title: 'Test 2', status: 'in progress' }),
        issueFactory({ slug: 'ISS-3', title: 'Test 3', status: 'done' }),
      ],
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<Board />);

    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
    expect(screen.getByText('Test 3')).toBeInTheDocument();
  });

  it('should open create issue modal when create button is clicked', async () => {
    vi.mocked(useIssues).mockReturnValue({
      issues: [
        issueFactory({ slug: 'ISS-1', title: 'Test 1', status: 'todo' }),
        issueFactory({ slug: 'ISS-2', title: 'Test 2', status: 'in progress' }),
        issueFactory({ slug: 'ISS-3', title: 'Test 3', status: 'done' }),
      ],
      isLoading: false,
      isError: false,
      error: null,
    });

    const event = userEvent.setup();

    renderWithProviders(<Board />);

    const buttons = screen.getAllByRole('button', { name: /create issue/i });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await event.click(buttons[0]);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should update issue status on drop', async () => {
    vi.mocked(useIssues).mockReturnValue({
      issues: [
        issueFactory({ slug: 'ISS-1', title: 'Test 1', status: 'todo' }),
        issueFactory({ slug: 'ISS-2', title: 'Test 2', status: 'in progress' }),
        issueFactory({ slug: 'ISS-3', title: 'Test 3', status: 'done' }),
      ],
      isLoading: false,
      isError: false,
      error: null,
    });

    renderWithProviders(<Board />);

    const column = screen
      .getByRole('heading', { level: 4, name: /^done$/i })
      .closest('div')?.parentElement;
    const dataTransfer = { getData: vi.fn().mockReturnValue('issue-2') };

    fireEvent.drop(column!, { dataTransfer });

    expect(dataTransfer.getData).toHaveBeenCalledWith('issueId');

    await waitFor(() => {
      expect(updateIssueStatus).toHaveBeenCalledWith({
        issueId: 'issue-2',
        status: 'done',
      });
    });
  });
});
