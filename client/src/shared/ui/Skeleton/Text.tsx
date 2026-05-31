import { cn } from '../../utils/cn';

interface TextProps {
  className?: string;
}

export function Text({ className = '' }: TextProps) {
  return (
    <div
      className={cn(
        'w-full h-2.5 rounded-full bg-gray-primary-light',
        className
      )}
    ></div>
  );
}
