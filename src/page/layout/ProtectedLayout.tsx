/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from 'react-router-dom';
import LoginPage from '@app/auth/login/page';
import NotFoundPage from '@components/layout/NotFoundPage';
import { isMainDomain } from '@utils/domainUtils';

const isAuth = (): boolean => {
  return true;
};

const ProtectedLayout = () => {
  if (isMainDomain()) {
    return <NotFoundPage />;
  }
  if (isAuth()) {
    return <LoginPage />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
