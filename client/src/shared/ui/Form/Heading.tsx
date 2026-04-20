import { cn } from '../../utils/cn';

interface HeadingProps {
  children: string;
  className?: string;
}

export function Heading({ children, className = '' }: HeadingProps) {
  return (
    <h3
      className={cn(
        'text-lg font-semibold text-center leading-none text-primary',
        className
      )}
    >
      {children}
    </h3>
  );
}
