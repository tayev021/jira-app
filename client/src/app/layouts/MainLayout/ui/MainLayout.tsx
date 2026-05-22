import { Outlet } from 'react-router';
import { Header } from './header/Header';

export function MainLayout() {
  return (
    <div className="h-screen grid grid-cols-1 grid-rows-[min-content_1fr] overflow-hidden">
      <Header />
      <main className="min-h-0 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
