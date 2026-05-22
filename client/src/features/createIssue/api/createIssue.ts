import { api } from '../../../shared/api/api';
import type { ApiResponse } from '../../../shared/types/ApiResponse';
import type { Issue } from '../../../shared/types/Issue';
import type { IssuePriority } from '../../../shared/types/IssuePriority';
import { ApiError } from '../../../shared/utils/ApiError';

export async function createIssue(data: {
  title: string;
  description: string;
  priority?: IssuePriority;
  workspaceId: string;
}): Promise<Issue> {
  const response = await api('/issues', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  let json: unknown;

  try {
    json = await response.json();
  } catch {
    throw new ApiError({ code: 'ERROR', message: 'Invalid JSON response' });
  }

  const result = json as ApiResponse<{ issue: Issue }>;

  if (!result.success) {
    throw new ApiError(result.error);
  }

  return result.data.issue;
}
