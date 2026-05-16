import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { useLocation, useNavigate } from 'react-router';
import { cn } from '../utils/cn';
import { HiOutlineXMark } from 'react-icons/hi2';

interface DrawerProps {
  children: ReactNode;
  className?: string;
}

export function Drawer({ children, className = '' }: DrawerProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);

  const closeDrawer = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      navigate(location.state?.backgroundLocation || '/');
    }, 400);
  }, [location, navigate]);

  useEffect(
    function () {
      function escapeDown(event: KeyboardEvent) {
        if (event.key === 'Escape') closeDrawer();
      }

      document.addEventListener('keydown', escapeDown);

      return () => document.removeEventListener('keydown', escapeDown);
    },
    [closeDrawer]
  );

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen backdrop-blur-[2px] transition-all z-40"
      onClick={(event: MouseEvent) =>
        event.target === event.currentTarget && closeDrawer()
      }
    >
      <div
        className={cn(
          `fixed top-0 right-0 w-125 max-w-screen h-screen bg-primary-bg shadow-[-6px_0_12px_0_rgba(0,0,0,0.2)] ${isClosing ? 'animate-drawer-close' : 'animate-drawer-open'} overflow-y-auto`,
          className
        )}
      >
        <button
          className="absolute top-4 left-4 w-7 aspect-square text-gray-primary cursor-pointer hover:text-primary-dark"
          onClick={closeDrawer}
        >
          <HiOutlineXMark className="w-full h-full" />
        </button>
        {children}
      </div>
    </div>
  );
}
