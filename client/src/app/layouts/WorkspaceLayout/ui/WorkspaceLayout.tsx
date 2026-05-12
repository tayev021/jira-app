import { Outlet } from 'react-router';
import { Nav } from './Nav/Nav';
import { Heading } from './Heading';

export function WorkspaceLayout() {
  return (
    <div className="p-5 flex flex-col gap-5">
      <Heading />
      <Nav />
      <Outlet />
    </div>
  );
}
