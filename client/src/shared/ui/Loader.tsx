import { cn } from '../utils/cn';
import { Spinner } from './Spinner';

interface LoaderProps {
  className?: string;
}

export function Loader({ className = '' }: LoaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-primary-bg',
        className
      )}
    >
      <Spinner />
    </div>
  );
}
