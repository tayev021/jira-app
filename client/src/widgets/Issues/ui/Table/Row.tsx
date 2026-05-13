import type { Issue } from '../../../../shared/types/Issue';
import { TitleCell } from './cells/TitleCell';
import { Cell } from './cells/Cell';
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
    <tr className="relative bg-primary-bg hover:bg-secondary-bg">
      <TitleCell issue={issue} />
      <Cell>
        <UserLink user={issue.reporter} />
      </Cell>
      <AssigneesCell assignees={issue.assignees} />
      <PriorityCell issue={issue} />
      <StatusCell issue={issue} />
      <Cell>{formatDate(issue.createdAt)}</Cell>
      <Cell>{formatDate(issue.updatedAt)}</Cell>
      <ActionsCell issue={issue} />
    </tr>
  );
}
