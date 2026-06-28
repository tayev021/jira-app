import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { api } from '../../../shared/api/api';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { renderWithProviders } from '../../../shared/test/renders/renderWithProviders';
import { useAuth } from '../../../shared/hooks/useAuth';
import { workspaceFactory } from '../../../shared/test/factories/workspaceFactory';
import { DeleteWorkspace } from './DeleteWorkspace';
import * as router from 'react-router';
import toast from 'react-hot-toast';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../shared/api/api', () => ({
  api: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');

  return {
    ...actual,
    useParams: vi.fn(),
  };
});

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

  it('should delete workspace', async () => {
    const workspace = workspaceFactory();

    vi.mocked(router.useParams).mockReturnValue({ workspaceId: workspace.id });
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: true,
        data: undefined,
      }),
    } as any);

    const close = vi.fn();

    renderWithProviders(<DeleteWorkspace workspaceName="test" close={close} />);

    await userEvent.click(screen.getByRole('button', { name: /delete/i }));

    await waitFor(() => {
      expect(api).toHaveBeenCalledWith(`/workspaces/${workspace.id}`, {
        method: 'DELETE',
      });
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

    renderWithProviders(<DeleteWorkspace workspaceName="test" close={close} />);

    await userEvent.click(screen.getByRole('button', { name: /delete/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Something went wrong');
    });
  });
});
