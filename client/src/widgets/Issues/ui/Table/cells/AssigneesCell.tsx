import { NoUserAvatar, UserLink } from '../../../../../entities/user';
import type { IssueUser } from '../../../../../shared/types/IssueUser';
import { Cell } from './Cell';

interface AssigneesCellProps {
  assignees: IssueUser[];
}

export function AssigneesCell({ assignees }: AssigneesCellProps) {
  if (assignees.length <= 0) {
    return (
      <Cell>
        <NoUserAvatar className="mr-2" />
        <span className="align-middle">Unassigned</span>
      </Cell>
    );
  }

  return (
    <Cell>
      {assignees.map((assignee) => (
        <UserLink key={assignee.id} user={assignee} />
      ))}
    </Cell>
  );
}
