import { useAuth } from '../../../shared/hooks/useAuth';
import { UserAvatar } from '../../../entities/user';
import { UpdateAvatar } from '../../../features/updateAvatar';
import { UpdateBio } from '../../../features/updateBio';

export function AccountBio() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="p-5 border border-gray-primary-light rounded-md shadow-md">
      <h4 className="mb-2 font-semibold text-xl text-purple-primary text-center">
        Bio
      </h4>
      <div className="grid grid-cols-[min-content_minmax(100px,1fr)] gap-5">
        <div className="flex flex-col items-center gap-2">
          <UserAvatar
            user={currentUser}
            className="w-35 h-35 shadow-md text-5xl"
          />
          <UpdateAvatar />
        </div>
        <UpdateBio user={currentUser} />
      </div>
    </div>
  );
}
