import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UpdateBio } from './UpdateBio';
import { api } from '../../../shared/api/api';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import toast from 'react-hot-toast';

vi.mock('../../../shared/api/api', () => ({
  api: vi.fn(),
}));

describe('features/updateBio/ui/UpdateBio', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update bio on blur', async () => {
    const user = userFactory({ bio: 'Old bio' });

    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: true,
        data: { user: { ...user, bio: 'New bio' } },
      }),
    } as any);

    renderWithProviders(<UpdateBio user={user} />);

    const event = userEvent.setup();
    const textarea = screen.getByRole('textbox');

    await event.clear(textarea);
    await event.type(textarea, 'New bio');
    await event.tab();

    await waitFor(() => {
      expect(api).toHaveBeenCalledWith('/users/bio', {
        method: 'PATCH',
        body: JSON.stringify({
          bio: 'New bio',
        }),
      });
    });
  });

  it('should not update bio if value has not changed', async () => {
    const user = userFactory({ bio: 'Old bio' });

    renderWithProviders(<UpdateBio user={user} />);

    const event = userEvent.setup();
    const textarea = screen.getByRole('textbox');

    await event.clear(textarea);
    await event.type(textarea, 'Old bio');
    await event.tab();

    await waitFor(() => {
      expect(api).not.toHaveBeenCalled();
    });
  });

  it('should show error toast when request fails', async () => {
    const user = userFactory({ bio: 'Old bio' });

    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: false,
        error: {
          code: 'ERROR',
          message: 'Failed to update bio',
        },
      }),
    } as any);

    renderWithProviders(<UpdateBio user={user} />);

    const event = userEvent.setup();
    const textarea = screen.getByRole('textbox');

    await event.clear(textarea);
    await event.type(textarea, 'New bio');
    await event.tab();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to update bio');
    });
  });
});
