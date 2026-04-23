import { useAuth } from '../../../../../shared/hooks/useAuth';
import { Link } from 'react-router';
import { UserAvatar } from '../../../../../entities/user';
import { SignOut } from '../../../../../features/signOut';

export function UserPanel() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="flex gap-3 items-center">
      <Link to="account">
        <UserAvatar user={currentUser} />
      </Link>
      <SignOut />
    </div>
  );
}
