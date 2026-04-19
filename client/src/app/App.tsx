import { Providers } from './providers';
import { AppRouter } from './routes';
import { Toaster } from '../shared/ui/Toaster';

export function App() {
  return (
    <Providers>
      <AppRouter />
      <Toaster />
    </Providers>
  );
}
