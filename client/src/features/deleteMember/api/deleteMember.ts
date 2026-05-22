import { api } from '../../../shared/api/api';
import type { ApiResponse } from '../../../shared/types/ApiResponse';
import { ApiError } from '../../../shared/utils/ApiError';

export async function deleteMember(data: {
  memberId: string;
  workspaceId: string;
}): Promise<void> {
  const response = await api(`/workspaces/${data.workspaceId}/member`, {
    method: 'DELETE',
    body: JSON.stringify({ memberId: data.memberId }),
  });

  let json: unknown;

  try {
    json = await response.json();
  } catch {
    throw new ApiError({ code: 'ERROR', message: 'Invalid JSON response' });
  }

  const result = json as ApiResponse<void>;

  if (!result.success) {
    throw new ApiError(result.error);
  }
}
