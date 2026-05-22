import { api } from '../../../shared/api/api';
import type { ApiResponse } from '../../../shared/types/ApiResponse';
import type { User } from '../../../shared/types/User';
import { ApiError } from '../../../shared/utils/ApiError';

export async function addMember(data: {
  userId: string;
  workspaceId: string;
}): Promise<User> {
  const response = await api(`/workspaces/${data.workspaceId}/member`, {
    method: 'PUT',
    body: JSON.stringify({ userId: data.userId }),
  });

  let json: unknown;

  try {
    json = await response.json();
  } catch {
    throw new ApiError({ code: 'ERROR', message: 'Invalid JSON response' });
  }

  const result = json as ApiResponse<{ member: User }>;

  if (!result.success) {
    throw new ApiError(result.error);
  }

  return result.data.member;
}
