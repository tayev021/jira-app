import { Link } from 'react-router';
import { useMe, UserAvatar } from '../../../../../entities/user';
import { SignOut } from '../../../../../features/signOut';

export function UserPanel() {
  const { user } = useMe();

  if (!user) return null;

  return (
    <div className="flex gap-3 items-center">
      <Link to="account">
        <UserAvatar user={user} />
      </Link>
      <SignOut />
    </div>
  );
}
