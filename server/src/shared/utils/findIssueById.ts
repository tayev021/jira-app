import { Issue } from '../../modules/issue/issue.model';
import { NotFoundError } from '../errors';

export async function findIssueById(issueId: string) {
  const issue = await Issue.findById(issueId);

  if (!issue) {
    throw new NotFoundError('Issue with this ID does not exist');
  }

  return issue;
}
