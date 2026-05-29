import type { Issue } from '../../../../../shared/types/Issue';
import { Table } from '../../../../../shared/ui/Table';
import { UpdateIssuePriority } from '../../../../../features/updateIssuePriority';

interface PriorityCellProps {
  issue: Issue;
}

export function PriorityCell({ issue }: PriorityCellProps) {
  return (
    <Table.Cell>
      <UpdateIssuePriority issue={issue} />
    </Table.Cell>
  );
}
