import type { IssueStatus } from '../../../shared/types/IssueStatus';
import type { Issue } from '../../../shared/types/Issue';
import { api } from '../../../shared/api/api';
import { ApiError } from '../../../shared/utils/ApiError';
import type { ApiResponse } from '../../../shared/types/ApiResponse';

export async function updateIssueStatus(data: {
  issueId: string;
  status: IssueStatus;
}): Promise<Issue> {
  const response = await api(`/issues/${data.issueId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status: data.status }),
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
