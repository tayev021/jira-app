import { cn } from '../../utils/cn';
import { HiOutlinePhoto } from 'react-icons/hi2';

interface ImageProps {
  className?: string;
}

export function Image({ className = '' }: ImageProps) {
  return (
    <div
      className={cn(
        'w-25 flex items-center justify-center aspect-square rounded-full bg-gray-primary-light',
        className
      )}
    >
      <HiOutlinePhoto className="w-1/3 h-1/3 text-gray-primary" />
    </div>
  );
}
