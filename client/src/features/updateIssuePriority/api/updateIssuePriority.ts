import type { IssuePriority } from '../../../shared/types/IssuePriority';
import type { Issue } from '../../../shared/types/Issue';
import { api } from '../../../shared/api/api';
import type { ApiResponse } from '../../../shared/types/ApiResponse';
import { ApiError } from '../../../shared/utils/ApiError';

export async function updateIssuePriority(data: {
  issueId: string;
  priority: IssuePriority;
}): Promise<Issue> {
  const response = await api(`/issues/${data.issueId}/priority`, {
    method: 'PATCH',
    body: JSON.stringify({ priority: data.priority }),
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
