import { HiOutlineUser } from 'react-icons/hi2';
import { UserLink } from '../../../../../entities/user';
import type { IssueUser } from '../../../../../shared/types/IssueUser';
import { Cell } from './Cell';

interface AssigneesCellProps {
  assignees: IssueUser[];
}

export function AssigneesCell({ assignees }: AssigneesCellProps) {
  if (assignees.length <= 0) {
    return (
      <Cell>
        <span
          className={
            'w-6 h-6 relative inline-block mr-2 rounded-full text-base align-middle text-primary-dark bg-gray-primary-light'
          }
        >
          <HiOutlineUser className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </span>
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
