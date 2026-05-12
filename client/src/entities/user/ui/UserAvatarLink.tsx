import { Link } from 'react-router';
import type { User } from '../../../shared/types/User';
import { cn } from '../../../shared/utils/cn';

interface UserAvatarLinkProps {
  user: Pick<User, 'id' | 'name' | 'surname' | 'avatar'>;
  to: string;
  className?: string;
}

export function UserAvatarLink({
  user,
  className = '',
  to,
}: UserAvatarLinkProps) {
  const initials = user.name[0] + user.surname[0];

  return (
    <Link
      to={to}
      className={cn(
        'w-6 h-6 flex justify-center items-center rounded-full text-xs font-semibold text-secondary-text bg-primary hover:bg-primary-dark',
        className
      )}
    >
      {initials}
    </Link>
  );
}
