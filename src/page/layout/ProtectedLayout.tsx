/* eslint-disable @typescript-eslint/no-explicit-any */
import LoginPage from '@app/auth/login/page';
import NotFoundPage from '@components/layout/NotFoundPage';
import { isMainDomain } from '@utils/domainUtils';
import { decodeJwt } from '../../utils/jwtUtils';
import { hasExpiry } from '../../utils/dataUtils';
import { Outlet } from 'react-router-dom';

const isAccessTokenValid = (): boolean => {
  const token = localStorage.getItem('accessToken') ?? '';
  const decodedPayload: any = token ? decodeJwt(token) : null;
  
  return !!token && !!decodedPayload && !hasExpiry(decodedPayload.exp);
};

const ProtectedLayout = () => {
  if (isMainDomain()) {
    return <NotFoundPage />;
  }

  if (!isAccessTokenValid()) {
    return <LoginPage />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
