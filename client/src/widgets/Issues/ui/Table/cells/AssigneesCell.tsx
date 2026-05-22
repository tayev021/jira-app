import type { User } from '../../../../../shared/types/User';
import { Cell } from './Cell';
import { NoUserAvatar, UserLink } from '../../../../../entities/user';

interface AssigneesCellProps {
  assignees: User[];
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
    <Cell className="flex flex-col gap-1">
      {assignees.map((assignee) => (
        <UserLink key={assignee.id} user={assignee} />
      ))}
    </Cell>
  );
}
