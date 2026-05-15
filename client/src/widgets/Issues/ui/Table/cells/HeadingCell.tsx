import { cn } from '../../../../../shared/utils/cn';

interface HeadingCellProps {
  children: string;
  className?: string;
}

export function HeadingCell({ children, className = '' }: HeadingCellProps) {
  return (
    <th
      className={cn(
        'px-3 py-1.5 border border-t-2 border-gray-primary-light font-semibold text-start',
        className
      )}
    >
      {children}
    </th>
  );
}
