import { api } from '../../../shared/api/api';
import { ApiError } from '../../../shared/utils/ApiError';
import type { ApiResponse } from '../../../shared/types/ApiResponse';

export async function deleteIssue(data: { issueId: string }): Promise<void> {
  const response = await api(`/issues/${data.issueId}`, {
    method: 'DELETE',
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
