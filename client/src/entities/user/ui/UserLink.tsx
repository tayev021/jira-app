import { Link } from 'react-router';
import type { User } from '../../../shared/types/User';
import { cn } from '../../../shared/utils/cn';

interface UserLinkProps {
  user: Pick<User, 'id' | 'name' | 'surname' | 'avatar'>;
  className?: string;
}

export function UserLink({ user, className = '' }: UserLinkProps) {
  const initials = user.name[0] + user.surname[0];

  return (
    <Link
      to={`/user/${user.id}/profile`}
      className={cn('h-6 group flex items-center gap-2 text-sm', className)}
    >
      <span
        className={
          'h-full aspect-square flex justify-center items-center rounded-full font-semibold text-secondary-text bg-primary'
        }
      >
        {initials}
      </span>
      <span className="text-[1.05em] group-hover:text-primary">
        {user.name} {user.surname}
      </span>
    </Link>
  );
}
