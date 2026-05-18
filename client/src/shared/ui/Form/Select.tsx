import {
  Children,
  cloneElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';

type SelectProps<T> = {
  children: ReactNode | ReactNode[];
  className?: string;
  handleChange: (value: T) => void;
} & ComponentProps<'ul'>;

interface ChildElementProps<T> {
  handleClick: (value: T) => void;
}

export function Select<T>({
  children,
  className = '',
  handleChange,
}: SelectProps<T>) {
  return (
    <ul
      className={cn(
        `absolute w-full h-full flex flex-col gap-0.5 py-0.5 pl-1 pr-1 border-2 rounded-sm border-gray-primary bg-primary-bg uppercase overflow-hidden hover:h-auto focus:h-auto hover:shadow-md hover:border-primary  focus:border-primary focus:outline-none z-10`,
        className
      )}
      tabIndex={0}
    >
      {Children.map(children, (child) =>
        cloneElement(child as ReactElement<ChildElementProps<T>>, {
          handleClick: handleChange,
        })
      )}
    </ul>
  );
}
