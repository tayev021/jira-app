import { Outlet } from 'react-router';
import { Nav } from './Nav/Nav';
import { Heading } from './Heading';

export function WorkspaceLayout() {
  return (
    <div className="h-full p-5 flex flex-col gap-5 overflow-hidden">
      <Heading />
      <Nav />
      <Outlet />
    </div>
  );
}
