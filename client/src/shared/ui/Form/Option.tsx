import type { ComponentProps, ReactNode } from 'react';
import { HiChevronDown } from 'react-icons/hi2';

type OptionProps<T> = {
  value: T;
  selected?: boolean;
  children: ReactNode;
  handleClick?: (value: T) => void;
} & ComponentProps<'li'>;

export function Option<T>({
  value,
  selected = false,
  children,
  handleClick = () => {},
}: OptionProps<T>) {
  return (
    <li
      className={`${selected ? '-order-1' : ''} flex items-center px-1 py-2 cursor-pointer hover:bg-secondary-bg`}
      tabIndex={0}
      onClick={() => handleClick(value)}
    >
      {children}
      {selected ? <HiChevronDown className="ml-auto" /> : null}
    </li>
  );
}
