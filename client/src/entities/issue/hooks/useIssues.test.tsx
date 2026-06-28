import { vi } from 'vitest';
import { useAuth } from '../../../shared/hooks/useAuth';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { api } from '../../../shared/api/api';
import * as router from 'react-router';
import { issueFactory } from '../../../shared/test/factories/issueFactory';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useIssues } from './useIssues';
import { ApiError } from '../../../shared/utils/ApiError';
import { workspaceFactory } from '../../../shared/test/factories/workspaceFactory';
import { useWorkspace } from '../../workspace';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../workspace', () => ({
  useWorkspace: vi.fn(),
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

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

const user = userFactory({ id: '1' });
const workspace = workspaceFactory({ id: '111' });

describe('entities/issue/hooks/useIssues', () => {
  beforeAll(() => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: user,
      isLoading: false,
    });
    vi.mocked(useWorkspace).mockReturnValue({
      workspace: workspace,
      isLoading: false,
      isError: false,
      error: null,
    });
  });

  it('should load issues', async () => {
    const issues = [issueFactory(), issueFactory(), issueFactory()];

    vi.mocked(router.useParams).mockReturnValue({ workspaceId: workspace.id });
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: true,
        data: { issues },
      }),
    } as any);

    const { result } = renderHook(() => useIssues(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.issues).toEqual(issues);
    });

    expect(api).toHaveBeenCalledWith(`/issues?workspaceId=${workspace.id}`);
  });

  it('should return api error', async () => {
    vi.mocked(router.useParams).mockReturnValue({ workspaceId: workspace.id });
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Issues not found',
        },
      }),
    } as any);

    const { result } = renderHook(() => useIssues(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeInstanceOf(ApiError);
  });

  it('should handle invalid json response', async () => {
    vi.mocked(router.useParams).mockReturnValue({ workspaceId: workspace.id });
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockRejectedValue(new Error()),
    } as any);

    const { result } = renderHook(() => useIssues(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(
      expect.objectContaining({
        code: 'ERROR',
        message: 'Invalid JSON response',
      })
    );
  });
});
