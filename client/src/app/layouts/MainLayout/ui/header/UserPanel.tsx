import { useAuth } from '../../../../../shared/hooks/useAuth';
import { UserAvatarLink } from '../../../../../entities/user';
import { SignOut } from '../../../../../features/signOut';

export function UserPanel() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="flex gap-3 items-center">
      <UserAvatarLink to="account" user={currentUser} />
      <SignOut />
    </div>
  );
}
