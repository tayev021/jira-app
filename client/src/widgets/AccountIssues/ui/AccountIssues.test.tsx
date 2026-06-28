import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { useMyIssues } from '../../../entities/issue';
import { AccountIssues } from './AccountIssues';
import { issueFactory } from '../../../shared/test/factories/issueFactory';
import { ApiError } from '../../../shared/utils/ApiError';
import toast from 'react-hot-toast';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';

vi.mock('../../../entities/issue', () => ({
  useMyIssues: vi.fn(),
}));

describe('widgets/AccountIssues/ui/', () => {
  it('should render personal issues', () => {
    vi.mocked(useMyIssues).mockReturnValue({
      issues: [
        issueFactory({ title: 'Test 1' }),
        issueFactory({ title: 'Test 2' }),
      ],
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/account/issues']}>
        <Routes>
          <Route path="/account/issues" element={<AccountIssues />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
  });

  it('should render error', async () => {
    vi.mocked(useMyIssues).mockReturnValue({
      issues: undefined,
      isLoading: false,
      isError: true,
      error: new ApiError({ code: 'ERROR', message: 'Test Error' }),
    });

    renderWithProviders(<AccountIssues />);

    expect(toast.error).toHaveBeenCalledWith('Test Error');
  });

  it('should render loader', () => {
    vi.mocked(useMyIssues).mockReturnValue({
      issues: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    renderWithProviders(<AccountIssues />);

    expect(
      screen.getByRole('status', {
        name: /loading/i,
      })
    ).toBeInTheDocument();
  });
});
