import type { Issue } from '../../../../../shared/types/Issue';
import { Cell } from './Cell';
import { UpdateIssuePriority } from '../../../../../features/updateIssuePriority';

interface PriorityCellProps {
  issue: Issue;
}

export function PriorityCell({ issue }: PriorityCellProps) {
  return (
    <Cell>
      <UpdateIssuePriority issue={issue} />
    </Cell>
  );
}
