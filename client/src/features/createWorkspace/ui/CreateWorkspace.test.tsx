import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { api } from '../../../shared/api/api';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import { useAuth } from '../../../shared/hooks/useAuth';
import { workspaceFactory } from '../../../shared/test/factories/workspaceFactory';
import { CreateWorkspace } from './CreateWorkspace';
import toast from 'react-hot-toast';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../shared/api/api', () => ({
  api: vi.fn(),
}));

const user = userFactory({ id: '1' });

describe('features/createWorkspace/ui/CreateWorkspace', () => {
  beforeAll(() => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: user,
      isLoading: false,
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create new workspace', async () => {
    const workspace = workspaceFactory();

    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: true,
        data: { workspace },
      }),
    } as any);

    const close = vi.fn();

    renderWithProviders(<CreateWorkspace close={close} />);

    const event = userEvent.setup();

    await event.type(screen.getByRole('textbox'), 'New workspace');
    await event.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(api).toHaveBeenCalledWith('/workspaces', {
        method: 'POST',
        body: JSON.stringify({
          name: 'New workspace',
        }),
      });
      expect(close).toHaveBeenCalledTimes(1);
    });
  });

  it('should show toast api error', async () => {
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: false,
        error: {
          code: 'ERROR',
          message: 'Something went wrong',
        },
      }),
    } as any);

    const close = vi.fn();

    renderWithProviders(<CreateWorkspace close={close} />);

    const event = userEvent.setup();

    await event.type(screen.getByRole('textbox'), 'New workspace');
    await event.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Something went wrong');
    });
  });

  it('should show toast validation error', async () => {
    const close = vi.fn();

    renderWithProviders(<CreateWorkspace close={close} />);

    const event = userEvent.setup();

    await event.type(screen.getByRole('textbox'), 't');
    await event.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Workspace name must be at least 2 characters'
      );
    });
  });
});
