import type { Issue } from '../../../../shared/types/Issue';
import { Table } from '../../../../shared/ui/Table';
import { TitleCell } from './cells/TitleCell';
import { UserLink } from '../../../../entities/user';
import { AssigneesCell } from './cells/AssigneesCell';
import { PriorityCell } from './cells/PriorityCell';
import { StatusCell } from './cells/StatusCell';
import { formatDate } from '../../../../shared/utils/formatDate';
import { ActionsCell } from './cells/ActionsCell';

interface TableRowProps {
  issue: Issue;
}

export function Row({ issue }: TableRowProps) {
  return (
    <Table.Row>
      <TitleCell issue={issue} />
      <Table.Cell>
        <UserLink user={issue.reporter} />
      </Table.Cell>
      <AssigneesCell assignees={issue.assignees} />
      <PriorityCell issue={issue} />
      <StatusCell issue={issue} />
      <Table.Cell>{formatDate(issue.createdAt)}</Table.Cell>
      <Table.Cell>{formatDate(issue.updatedAt)}</Table.Cell>
      <ActionsCell issue={issue} />
    </Table.Row>
  );
}
