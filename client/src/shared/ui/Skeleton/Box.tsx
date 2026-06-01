import { cn } from '../../utils/cn';

interface BoxProps {
  className?: string;
}

export function Box({ className = '' }: BoxProps) {
  return (
    <div
      className={cn('w-full h-25 rounded-md bg-gray-primary-light', className)}
    ></div>
  );
}
