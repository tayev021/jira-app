import { cn } from '../../../shared/utils/cn';

interface HeadingProps {
  children: string;
  className?: string;
}

export function Heading({ children, className = '' }: HeadingProps) {
  return <h4 className={cn('mb-2 font-semibold', className)}>{children}</h4>;
}
