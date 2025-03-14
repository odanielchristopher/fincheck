import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthGuard } from './AuthGuard';

import { AuthLayout } from '../../views/layouts/AuthLayout';
import { Dashboard } from '../../views/pages/Dashboard';
import { Login } from '../../views/pages/Login';
import { Register } from '../../views/pages/Register';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
