import type { Issue } from '../../../shared/types/Issue';
import { api } from '../../../shared/api/api';
import { ApiError } from '../../../shared/utils/ApiError';
import type { ApiResponse } from '../../../shared/types/ApiResponse';

export async function deleteAssignee(data: {
  assigneeId: string;
  issueId: string;
}): Promise<Issue> {
  const response = await api(`/issues/${data.issueId}/assignee`, {
    method: 'DELETE',
    body: JSON.stringify({ assigneeId: data.assigneeId }),
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
