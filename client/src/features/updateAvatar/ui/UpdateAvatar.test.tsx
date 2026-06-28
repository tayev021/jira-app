import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UpdateAvatar } from './UpdateAvatar';
import { api } from '../../../shared/api/api';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import toast from 'react-hot-toast';

vi.mock('../../../shared/api/api', () => ({
  api: vi.fn(),
}));

describe('features/updateAvatar/ui/UpdateAvatar', () => {
  it('should upload avatar', async () => {
    const user = userFactory();

    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: true,
        data: { user },
      }),
    } as any);

    renderWithProviders(<UpdateAvatar />);

    const event = userEvent.setup();
    const input = screen.getByLabelText(/update avatar/i);
    const file = new File(['avatar'], 'avatar.png', {
      type: 'image/png',
    });

    await event.upload(input, file);

    await waitFor(() => {
      expect(api).toHaveBeenCalled();
    });

    expect(api).toHaveBeenCalledWith(
      '/users/avatar',
      expect.objectContaining({
        method: 'PATCH',
        body: expect.any(FormData),
      })
    );

    const body = vi.mocked(api).mock.calls[0][1]?.body as FormData;

    expect(body.get('avatar')).toBe(file);
  });

  it('should show error toast when request fails', async () => {
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: false,
        error: {
          code: 'ERROR',
          message: 'Upload failed',
        },
      }),
    } as any);

    renderWithProviders(<UpdateAvatar />);

    const event = userEvent.setup();
    const input = screen.getByLabelText(/update avatar/i);
    const file = new File(['avatar'], 'avatar.png', {
      type: 'image/png',
    });

    await event.upload(input, file);

    await waitFor(() => {
      expect(api).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Upload failed');
    });
  });
});
