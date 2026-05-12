import { UpdateIssueStatus } from '../../../../../features/updateIssueStatus';
import type { Issue } from '../../../../../shared/types/Issue';
import { Cell } from './Cell';

interface StatusCellProps {
  issue: Issue;
}

export function StatusCell({ issue }: StatusCellProps) {
  return (
    <Cell className="w-38">
      <UpdateIssueStatus issue={issue} />
    </Cell>
  );
}
