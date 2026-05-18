import { Board } from '../../../../widgets/Board';
import { Outlet } from 'react-router';

export function BoardPage() {
  return (
    <>
      <Board />
      <Outlet />
    </>
  );
}
