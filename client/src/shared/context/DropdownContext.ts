import { createContext } from 'react';

export interface DropdownContextType {
  dropdownName: string;
  anchor: HTMLElement | null;
  setAnchor: (anchor: HTMLElement) => void;
  open: (dropdownName: string) => void;
  close: () => void;
}

export const DropdownContext = createContext<DropdownContextType | null>(null);
