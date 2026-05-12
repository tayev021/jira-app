import { useState, type ReactNode } from 'react';
import { DropdownContext } from '../../shared/context/DropdownContext';

interface DropdownProviderProps {
  children: ReactNode;
}

export function DropdownProvider({ children }: DropdownProviderProps) {
  const [dropdownName, setDropdownName] = useState('');
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const open = setDropdownName;
  const close = () => setDropdownName('');

  return (
    <DropdownContext.Provider
      value={{ dropdownName, anchor, setAnchor, open, close }}
    >
      {children}
    </DropdownContext.Provider>
  );
}
