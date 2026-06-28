import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { api } from '../../../shared/api/api';
import { useAuth } from '../../../shared/hooks/useAuth';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import { DeleteAccount } from './DeleteAccount';
import userEvent from '@testing-library/user-event';
import toast from 'react-hot-toast';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../shared/api/api', () => ({
  api: vi.fn(),
}));

const user = userFactory();

describe('features/deleteAccount/ui/DeleteAccount', () => {
  beforeAll(() => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: user,
      isLoading: false,
    });
  });

  it('should delete account', async () => {
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: true,
        data: null,
      }),
    } as any);

    const close = vi.fn();

    renderWithProviders(<DeleteAccount close={close} />);

    await userEvent.click(screen.getByRole('button', { name: /delete/i }));
    await waitFor(() => {
      expect(api).toHaveBeenCalledWith('/users', {
        method: 'DELETE',
      });
    });
    await waitFor(() => {
      expect(close).toHaveBeenCalled();
    });
  });

  it('should show error toast when request fails', async () => {
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: false,
        error: {
          code: 'ERROR',
          message: 'Delete failed',
        },
      }),
    } as any);

    const close = vi.fn();

    renderWithProviders(<DeleteAccount close={close} />);

    await userEvent.click(screen.getByRole('button', { name: /delete/i }));
    await waitFor(() => {
      expect(api).toHaveBeenCalledWith('/users', {
        method: 'DELETE',
      });
    });
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Delete failed');
    });
  });

  it('redirects if current user is unauthorized', () => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: undefined,
      isLoading: false,
    });

    const close = vi.fn();

    renderWithProviders(<DeleteAccount close={close} />);

    expect(toast.error).toHaveBeenCalledWith(
      'Unable to delete account. Current user is unavailable'
    );
    expect(screen.queryByText(/delete account/i)).not.toBeInTheDocument();
  });
});
