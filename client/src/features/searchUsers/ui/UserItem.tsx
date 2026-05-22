import type { User } from '../../../shared/types/User';
import { UserLink } from '../../../entities/user';
import { Button } from '../../../shared/ui/Button';

interface UserItemProps {
  user: User;
  onClick: () => void;
}

export function UserItem({ user, onClick }: UserItemProps) {
  return (
    <li className="group flex justify-between items-center px-2 py-2 rounded-sm hover:bg-secondary-bg">
      <UserLink className="h-9" user={user} />
      <Button
        className="hidden px-3 py-1 rounded-full font-medium text-xs text-secondary-text bg-primary cursor-pointer hover:bg-primary-dark group-hover:block"
        onClick={onClick}
      >
        Invite
      </Button>
    </li>
  );
}
