import type { IssueUser } from '../../../../shared/types/IssueUser';
import { NoUserAvatar, UserAvatarLink } from '../../../../entities/user';

interface CardAssigneesProps {
  assignees: IssueUser[];
}

export function CardAssignees({ assignees }: CardAssigneesProps) {
  return (
    <div className="flex justify-between items-center  gap-2">
      <span className="italic">assignees</span>
      <div>
        {assignees.length <= 0 ? (
          <NoUserAvatar />
        ) : (
          assignees.map((assignee) => (
            <UserAvatarLink
              key={assignee.id}
              to={`/user/${assignee.id}/profile`}
              user={assignee}
            />
          ))
        )}
      </div>
    </div>
  );
}
