import { Issue } from '../../modules/issue/issue.model';
import { ApiError } from '../errors';

export async function findIssueById(issueId: string) {
  const issue = await Issue.findById(issueId);

  if (!issue) {
    throw new ApiError(400, 'ERROR', 'Issue with this ID does not exist');
  }

  return issue;
}
