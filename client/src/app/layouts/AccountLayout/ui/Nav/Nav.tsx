import {
  HiOutlineCog6Tooth,
  HiOutlineIdentification,
  HiOutlineSquares2X2,
} from 'react-icons/hi2';
import { NavTab } from './NavTab';

export function Nav() {
  return (
    <nav>
      <ul className="flex flex-col border border-gray-primary-light rounded-md shadow-md  overflow-hidden">
        <NavTab to="">
          <HiOutlineIdentification className="text-xl" />
          Bio
        </NavTab>
        <NavTab to="issues">
          <HiOutlineSquares2X2 className="text-xl" />
          Issues
        </NavTab>
        <NavTab to="settings">
          <HiOutlineCog6Tooth className="text-xl" />
          Settings
        </NavTab>
      </ul>
    </nav>
  );
}
