import { Outlet } from 'react-router';
import { Header } from './header/Header';

export function MainLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 grid-rows-[min-content_1fr]">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
