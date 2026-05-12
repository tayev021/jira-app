import { useContext } from 'react';
import {
  DropdownContext,
  type DropdownContextType,
} from '../context/DropdownContext';

export function useDropdown(): DropdownContextType {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(
      'The useDropdown hook must be used inside DropdownContext!'
    );
  }

  return context;
}
