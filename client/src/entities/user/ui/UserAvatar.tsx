import { SERVER_URL } from '../../../shared/constants';
import type { User } from '../../../shared/types/User';
import { cn } from '../../../shared/utils/cn';

interface UserAvatarProps {
  user: Pick<User, 'name' | 'surname' | 'avatar'>;
  className?: string;
}

export function UserAvatar({ user, className = '' }: UserAvatarProps) {
  const initials = user.name[0] + user.surname[0];

  return (
    <div
      className={cn(
        'w-6 h-6 flex justify-center items-center rounded-full text-xs font-semibold text-secondary-text bg-primary',
        className
      )}
    >
      {user.avatar ? (
        <img
          src={`${SERVER_URL}/images/avatars/${user.avatar}`}
          alt={`${user.name} ${user.surname} avatar`}
          className="h-full aspect-square rounded-full"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
