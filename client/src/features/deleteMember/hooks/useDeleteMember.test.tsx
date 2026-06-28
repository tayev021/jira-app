import { vi } from 'vitest';
import { useAuth } from '../../../shared/hooks/useAuth';
import { userFactory } from '../../../shared/test/factories/userFactory';
import { api } from '../../../shared/api/api';
import * as router from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { ApiError } from '../../../shared/utils/ApiError';
import { useDeleteMember } from './useDeleteMember';

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

describe('features/deleteMember/hooks/useDeleteMember', () => {
  beforeAll(() => {
    vi.mocked(useAuth).mockReturnValue({
      currentUser: user,
      isLoading: false,
    });
  });

  it('should delete member', async () => {
    const member = userFactory();

    vi.mocked(router.useParams).mockReturnValue({ workspaceId: '111' });
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: true,
        data: undefined,
      }),
    } as any);

    const { result } = renderHook(() => useDeleteMember(member.id), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.mutateAsync(null);
    });

    expect(api).toHaveBeenCalledWith(`/workspaces/111/member`, {
      method: 'DELETE',
      body: JSON.stringify({
        memberId: member.id,
      }),
    });
  });

  it('should return api error', async () => {
    const member = userFactory();

    vi.mocked(router.useParams).mockReturnValue({ workspaceId: '111' });
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockResolvedValue({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Issue not found',
        },
      }),
    } as any);

    const { result } = renderHook(() => useDeleteMember(member.id), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await expect(result.current.mutateAsync(null)).rejects.toBeInstanceOf(
        ApiError
      );
    });
  });

  it('should handle invalid json response', async () => {
    const member = userFactory();

    vi.mocked(router.useParams).mockReturnValue({ workspaceId: '111' });
    vi.mocked(api).mockResolvedValue({
      json: vi.fn().mockRejectedValue(new Error()),
    } as any);

    const { result } = renderHook(() => useDeleteMember(member.id), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await expect(result.current.mutateAsync(null)).rejects.toBeInstanceOf(
        ApiError
      );
    });
  });
});
