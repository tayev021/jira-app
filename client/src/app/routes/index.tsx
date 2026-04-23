import { BrowserRouter, Routes, Route } from 'react-router';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../../pages/home';
import { SignInPage, SignUpPage } from '../../pages/auth';
import { ProtectedRoute } from './ProtectedRoute';
import { AppHomePage } from '../../pages/app';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="auth">
            <Route path="signin" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
          <Route path="app" element={<ProtectedRoute />}>
            <Route index element={<AppHomePage />} />
          </Route>
          <Route path="account" element={<ProtectedRoute />}>
            <Route index element={<div>Account Page</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
