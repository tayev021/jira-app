import { useState, type ReactElement } from 'react';
import { ModalContext } from '../../shared/context/ModalContext';

interface ModalProviderProps {
  children: ReactElement | ReactElement[];
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalName, setModalName] = useState('');

  const open = setModalName;
  const close = () => setModalName('');

  return (
    <ModalContext.Provider value={{ modalName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}
