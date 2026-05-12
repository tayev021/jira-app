import type { Workspace } from '../../../shared/types/Workspace';
import { api } from '../../../shared/api/api';
import { ApiError } from '../../../shared/utils/ApiError';
import type { ApiResponse } from '../../../shared/types/ApiResponse';

export async function getWorkspace(workspaceId: string): Promise<Workspace> {
  const response = await api(`/workspaces/${workspaceId}`);

  let json: unknown;

  try {
    json = await response.json();
  } catch {
    throw new ApiError({ code: 'ERROR', message: 'Invalid JSON response' });
  }

  const result = json as ApiResponse<{ workspace: Workspace }>;

  if (!result.success) {
    throw new ApiError(result.error);
  }

  return result.data.workspace;
}
