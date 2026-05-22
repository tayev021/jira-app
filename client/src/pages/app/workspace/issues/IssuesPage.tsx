import { Issues } from '../../../../widgets/Issues';
import { Outlet } from 'react-router';

export function IssuesPage() {
  return (
    <>
      <Issues />
      <Outlet />
    </>
  );
}
