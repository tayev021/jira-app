import { useNavigate } from 'react-router';
import { UserAvatar, useUser } from '../../../entities/user';
import { Button } from '../../../shared/ui/Button';
import { formatDate } from '../../../shared/utils/formatDate';
import { HiArrowSmallLeft } from 'react-icons/hi2';

export function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="border border-gray-primary-light rounded-md shadow-lg">
      <div className="grid grid-cols-[50px_1fr_50px] gap-2 px-5 py-2 border-b border-gray-primary-light shadow-b-md">
        <Button
          className="text-primary hover:text-primary-dark"
          onClick={() => navigate(-1)}
        >
          <HiArrowSmallLeft className="w-6 h-6" />
        </Button>
        <h3 className="font-bold text-lg text-primary text-center">
          {user.name} {user.surname}
        </h3>
      </div>
      <div className="flex gap-5 p-5">
        <UserAvatar
          user={user}
          className="shrink-0 w-40 h-40 shadow-md text-5xl"
        />
        <ul className="flex flex-col gap-2">
          <li>
            <h5 className="font-semibold text-base">Contact email</h5>
            <p>{user.email}</p>
          </li>
          <li>
            <h5 className="font-semibold text-base">Bio</h5>
            {user.bio ? (
              <p>{user.bio}</p>
            ) : (
              <p className="italic text-gray-primary">{`${user.name} ${user.surname} doesn't have a bio yet`}</p>
            )}
          </li>
          <li>
            <h5 className="font-semibold text-base">Created</h5>
            <p>{formatDate(user.createdAt, 'DD MMM YYYY')}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
