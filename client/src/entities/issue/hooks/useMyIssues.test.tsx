import { vi } from 'vitest';
import { useAuth } from '../../../shared/hooks/useAuth';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { api } from '../../../shared/api/api';
import { issueFactory } from '../../../shared/test/factories/issueFactory';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { ApiError } from '../../../shared/utils/ApiError';
import { useMyIssues } from './useMyIssues';

vi.mock('../../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../shared/api/api', () => ({
  api: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

const user = userFactory({ id: '1' });

describe('entities/issue/hooks/useMyIssues', () => {
  beforeAll(() => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: user,
      isLoading: false,
    });
  });

  it('should load user issues', async () => {
    const issues = [issueFactory(), issueFactory(), issueFactory()];

    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: true,
        data: { issues },
      }),
    } as any);

    const { result } = renderHook(() => useMyIssues(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.issues).toEqual(issues);
    });

    expect(api).toHaveBeenCalledWith('/issues/me');
  });

  it('should return api error', async () => {
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Issues not found',
        },
      }),
    } as any);

    const { result } = renderHook(() => useMyIssues(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeInstanceOf(ApiError);
  });

  it('should handle invalid json response', async () => {
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockRejectedValue(new Error()),
    } as any);

    const { result } = renderHook(() => useMyIssues(), {
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
