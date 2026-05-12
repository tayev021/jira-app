import { Link } from 'react-router';
import type { User } from '../../../shared/types/User';

interface UserLinkProps {
  user: Pick<User, 'id' | 'name' | 'surname' | 'avatar'>;
}

export function UserLink({ user }: UserLinkProps) {
  const initials = user.name[0] + user.surname[0];

  return (
    <Link
      to={`/user/${user.id}/profile`}
      className="group flex items-center gap-2"
    >
      <span
        className={
          'w-6 h-6 flex justify-center items-center rounded-full text-xs font-semibold text-secondary-text bg-primary'
        }
      >
        {initials}
      </span>
      <span className="group-hover:text-primary">
        {user.name} {user.surname}
      </span>
    </Link>
  );
}
