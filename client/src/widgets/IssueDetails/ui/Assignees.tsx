import { NoUserAvatar, UserLink } from '../../../entities/user';
import type { IssueUser } from '../../../shared/types/IssueUser';

interface AssigneesProps {
  assignees: IssueUser[];
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
