import { useEffect, useState, type ReactNode } from 'react';
import { useDropdown } from '../../hooks/useDropdown';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';

interface MenuProps {
  name: string;
  className?: string;
  children: ReactNode;
}

export function Menu({ name, className = '', children }: MenuProps) {
  const { dropdownName, anchor, close } = useDropdown();
  const ref = useOutsideClick<HTMLDivElement>(close);
  const [style, setStyle] = useState({ top: 0, left: 0 });

  useEffect(() => {
    function updatePosition() {
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();

      setStyle({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }

    updatePosition();

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [anchor]);

  if (name !== dropdownName) return null;

  return createPortal(
    <div
      ref={ref}
      className={cn('absolute', className)}
      style={style}
      onClick={() => close()}
    >
      {children}
    </div>,
    document.body
  );
}
