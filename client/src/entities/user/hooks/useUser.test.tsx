import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useUser } from './useUser';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { ApiError } from '../../../shared/utils/ApiError';

const globalFetch = vi.fn();
vi.stubGlobal('fetch', globalFetch);

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('entities/user/hooks/useUser', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should load user', async () => {
    const user = userFactory();

    globalFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true, data: { user } }), {
        status: 200,
      })
    );

    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.user).toEqual(user);
    });
  });

  it('should handle invalid JSON response', async () => {
    globalFetch.mockResolvedValueOnce({
      json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
    });

    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeInstanceOf(ApiError);
    expect(result.current.error?.message).toBe('Invalid JSON response');
  });

  it('should handle api error', async () => {
    globalFetch.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
          },
        }),
        { status: 404 }
      )
    );

    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeInstanceOf(ApiError);
    expect(result.current.error?.code).toBe('USER_NOT_FOUND');
    expect(result.current.error?.message).toBe('User not found');
  });
});
