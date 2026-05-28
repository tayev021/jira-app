import type { User } from '../../../../shared/types/User';
import { NoUserAvatar, UserAvatarLink } from '../../../../entities/user';

interface CardAssigneesProps {
  assignees: User[];
}

export function CardAssignees({ assignees }: CardAssigneesProps) {
  const firstThree = assignees.slice(0, 3);

  return (
    <div className="flex justify-between items-center  gap-2">
      <span className="italic">assignees</span>
      <div>
        {assignees.length <= 0 ? (
          <NoUserAvatar />
        ) : (
          <ul className="flex gap-0.5">
            {firstThree.map((assignee) => (
              <li key={assignee.id}>
                <UserAvatarLink
                  key={assignee.id}
                  to={`/profile/${assignee.id}`}
                  user={assignee}
                />
              </li>
            ))}
            {assignees.length - 3 > 0 ? (
              <li className="font-bold text-base text-primary">
                +{assignees.length - 3}
              </li>
            ) : null}
          </ul>
        )}
      </div>
    </div>
  );
}
