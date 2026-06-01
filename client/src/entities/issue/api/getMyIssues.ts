import type { Issue } from '../../../shared/types/Issue';
import { api } from '../../../shared/api/api';
import { ApiError } from '../../../shared/utils/ApiError';
import type { ApiResponse } from '../../../shared/types/ApiResponse';

export async function getMyIssues(): Promise<Issue[]> {
  const response = await api(`/issues/me`);

  let json: unknown;

  try {
    json = await response.json();
  } catch {
    throw new ApiError({ code: 'ERROR', message: 'Invalid JSON response' });
  }

  const result = json as ApiResponse<{ issues: Issue[] }>;

  if (!result.success) {
    throw new ApiError(result.error);
  }

  return result.data.issues;
}
