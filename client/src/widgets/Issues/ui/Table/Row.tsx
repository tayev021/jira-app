import type { Issue } from '../../../../shared/types/Issue';
import { Cell } from './cells/Cell';
import { PriorityCell } from './cells/PriorityCell';
import { StatusCell } from './cells/StatusCell';
import { formatDate } from '../../../../shared/utils/formatDate';
import { TitleCell } from './cells/TitleCell';
import { UserLink } from '../../../../entities/user';
import { AssigneesCell } from './cells/AssigneesCell';

interface TableRowProps {
  issue: Issue;
}

export function Row({ issue }: TableRowProps) {
  return (
    <tr>
      <TitleCell issue={issue} />
      <Cell>
        <UserLink user={issue.reporter} />
      </Cell>
      <AssigneesCell assignees={issue.assignees} />
      <PriorityCell issue={issue} />
      <StatusCell issue={issue} />
      <Cell>{formatDate(issue.createdAt)}</Cell>
      <Cell>{formatDate(issue.updatedAt)}</Cell>
    </tr>
  );
}
