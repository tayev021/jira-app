import {
  HiOutlineCog6Tooth,
  HiOutlineGlobeAlt,
  HiOutlineTableCells,
  HiOutlineUserGroup,
  HiOutlineViewColumns,
} from 'react-icons/hi2';
import { NavTab } from './NavTab';

export function Nav() {
  return (
    <nav>
      <ul className="flex border-b border-gray-primary-light shadow-b-md">
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
        <NavTab to="settings">
          <HiOutlineCog6Tooth className="text-xl" />
          Settings
        </NavTab>
      </ul>
    </nav>
  );
}
