import { createContext } from 'react';

export interface ModalContextType {
  modalName: string;
  open: (modalName: string) => void;
  close: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);
