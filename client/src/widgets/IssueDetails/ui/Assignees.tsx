import type { User } from '../../../shared/types/User';
import { NoUserAvatar, UserLink } from '../../../entities/user';

interface AssigneesProps {
  assignees: User[];
}

export function Assignees({ assignees }: AssigneesProps) {
  return (
    <>
      {assignees.length <= 0 ? (
        <div>
          <NoUserAvatar className="mr-2" />
          <span className="align-middle">Unassigned</span>
        </div>
      ) : (
        <ul>
          {assignees.map((assignee) => (
            <li key={assignee.id}>
              <UserLink key={assignee.id} user={assignee} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
