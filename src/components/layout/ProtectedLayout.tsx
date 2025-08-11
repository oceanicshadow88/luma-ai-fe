/* eslint-disable @typescript-eslint/no-explicit-any */
import NotFoundPage from '@components/layout/NotFoundPage';
import { isMainDomain } from '@utils/domainUtils';
import { decodeJwt } from '../../utils/jwtUtils';
import { hasExpiry } from '../../utils/dataUtils';
import { Outlet, Navigate } from 'react-router-dom';

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
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
