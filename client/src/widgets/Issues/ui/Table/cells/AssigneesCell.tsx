import type { User } from '../../../../../shared/types/User';
import { Table } from '../../../../../shared/ui/Table';
import { NoUserAvatar, UserLink } from '../../../../../entities/user';

interface AssigneesCellProps {
  assignees: User[];
}

export function AssigneesCell({ assignees }: AssigneesCellProps) {
  if (assignees.length <= 0) {
    return (
      <Table.Cell>
        <NoUserAvatar className="mr-2" />
        <span className="align-middle">Unassigned</span>
      </Table.Cell>
    );
  }

  return (
    <Table.Cell className="flex-col items-start gap-1">
      {assignees.map((assignee) => (
        <UserLink key={assignee.id} user={assignee} />
      ))}
    </Table.Cell>
  );
}
