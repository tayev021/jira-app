import { api } from '../../../shared/api/api';
import type { ApiResponse } from '../../../shared/types/ApiResponse';
import type { WorkspaceStatistics } from '../../../shared/types/WorkspaceStatistics';
import { ApiError } from '../../../shared/utils/ApiError';

export async function getWorkspaceStatistics(
  workspaceId: string
): Promise<WorkspaceStatistics> {
  const response = await api(`/workspaces/${workspaceId}/statistics`);

  let json: unknown;

  try {
    json = await response.json();
  } catch {
    throw new ApiError({ code: 'ERROR', message: 'Invalid JSON response' });
  }

  const result = json as ApiResponse<{
    workspaceStatistics: WorkspaceStatistics;
  }>;

  if (!result.success) {
    throw new ApiError(result.error);
  }

  return result.data.workspaceStatistics;
}
