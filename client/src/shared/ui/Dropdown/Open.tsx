import { cloneElement, type MouseEvent, type ReactNode } from 'react';
import { useDropdown } from '../../hooks/useDropdown';

interface OpenProps {
  menuName: string;
  children: ReactNode;
}

interface ChildElementProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function Open({ menuName, children }: OpenProps) {
  const { dropdownName, setAnchor, open, close } = useDropdown();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    const button = event.currentTarget;

    if (dropdownName !== menuName) {
      open(menuName);
      setAnchor(button);
    } else {
      close();
    }
  }

  return cloneElement(children as React.ReactElement<ChildElementProps>, {
    onClick: handleClick,
  });
}
