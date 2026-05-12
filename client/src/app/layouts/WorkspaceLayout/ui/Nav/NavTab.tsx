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
            ? 'flex gap-1 items-center px-3 py-1 border-b-4 border-b-primary text-primary  leading-none'
            : 'flex gap-1 items-center px-3 py-1 leading-none'
        }
      >
        {children}
      </NavLink>
    </li>
  );
}
