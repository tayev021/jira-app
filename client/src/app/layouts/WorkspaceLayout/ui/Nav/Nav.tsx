import {
  HiOutlineGlobeAlt,
  HiOutlineTableCells,
  HiOutlineUserGroup,
  HiOutlineViewColumns,
} from 'react-icons/hi2';
import { NavTab } from './NavTab';

export function Nav() {
  return (
    <nav>
      <ul className="flex border-b border-gray-primary-light shadow-[0_4px_6px_-6px_rgba(0,0,0,0.2)]">
        <NavTab to="">
          <HiOutlineGlobeAlt className="text-xl" />
          Summary
        </NavTab>
        <NavTab to="members">
          <HiOutlineUserGroup className="text-xl" />
          Members
        </NavTab>
        <NavTab to="issues">
          <HiOutlineTableCells className="text-xl" />
          Issues
        </NavTab>
        <NavTab to="board">
          <HiOutlineViewColumns className="text-xl" />
          Board
        </NavTab>
      </ul>
    </nav>
  );
}
