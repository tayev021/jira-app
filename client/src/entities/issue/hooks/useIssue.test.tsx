import { vi } from 'vitest';
import { useAuth } from '../../../shared/hooks/useAuth';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { api } from '../../../shared/api/api';
import * as router from 'react-router';
import { issueFactory } from '../../../shared/test/factories/issueFactory';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useIssue } from './useIssue';
import { ApiError } from '../../../shared/utils/ApiError';

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

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

const user = userFactory({ id: '1' });

describe('entities/issue/hooks/useIssue', () => {
  beforeAll(() => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: user,
      isLoading: false,
    });
  });

  it('should load issue', async () => {
    const issue = issueFactory();

    vi.mocked(router.useParams).mockReturnValue({ issueId: issue.id });
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: true,
        data: { issue },
      }),
    } as any);

    const { result } = renderHook(() => useIssue(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.issue).toEqual(issue);
    });

    expect(api).toHaveBeenCalledWith(`/issues/${issue.id}`);
  });

  it('should return api error', async () => {
    const issue = issueFactory();

    vi.mocked(router.useParams).mockReturnValue({ issueId: issue.id });
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Issue not found',
        },
      }),
    } as any);

    const { result } = renderHook(() => useIssue(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeInstanceOf(ApiError);
  });

  it('should handle invalid json response', async () => {
    const issue = issueFactory();

    vi.mocked(router.useParams).mockReturnValue({ issueId: issue.id });
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockRejectedValue(new Error()),
    } as any);

    const { result } = renderHook(() => useIssue(), {
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
