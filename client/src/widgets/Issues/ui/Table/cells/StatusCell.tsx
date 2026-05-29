import type { Issue } from '../../../../../shared/types/Issue';
import { Table } from '../../../../../shared/ui/Table';
import { UpdateIssueStatus } from '../../../../../features/updateIssueStatus';

interface StatusCellProps {
  issue: Issue;
}

export function StatusCell({ issue }: StatusCellProps) {
  return (
    <Table.Cell>
      <UpdateIssueStatus issue={issue} />
    </Table.Cell>
  );
}
