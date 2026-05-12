import { HiOutlineUser } from 'react-icons/hi2';
import { cn } from '../../../shared/utils/cn';

interface NoUserAvatarProps {
  className?: string;
}

export function NoUserAvatar({ className = '' }: NoUserAvatarProps) {
  return (
    <div
      className={cn(
        'w-6 h-6 relative inline-block rounded-full text-base align-middle text-primary-dark bg-gray-primary-light',
        className
      )}
    >
      <HiOutlineUser className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
