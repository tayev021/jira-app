import type { ReactNode } from 'react';
import { NavLink } from 'react-router';

interface NavTab {
  to: string;
  children: ReactNode;
}

export function NavTab({ to, children }: NavTab) {
  return (
    <li>
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          isActive
            ? 'flex gap-2 items-center px-4 py-2 bg-primary text-secondary-text leading-none'
            : 'flex gap-2 items-center px-4 py-2 leading-none'
        }
      >
        {children}
      </NavLink>
    </li>
  );
}
