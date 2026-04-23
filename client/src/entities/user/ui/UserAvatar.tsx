import type { User } from '../../../shared/types/User';

interface UserAvatarProps {
  user: User;
}

export function UserAvatar({ user }: UserAvatarProps) {
  const initials = user.name[0] + user.surname[0];

  return (
    <div className="w-6 h-6 flex justify-center items-center rounded-full text-xs font-semibold text-secondary-text bg-primary hover:bg-primary-dark">
      {initials}
    </div>
  );
}
