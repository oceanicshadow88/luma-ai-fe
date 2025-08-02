/* eslint-disable @typescript-eslint/no-explicit-any */
import { isMainDomain } from '@utils/domainUtils';
import RedirectNoticePage from '@components/layout/RedirectNoticePage';
import { Outlet } from 'react-router-dom';

const OrganizationLayout = () => {
  if (isMainDomain()) {
    return <RedirectNoticePage />;
  }

  return <Outlet />;
};

export default OrganizationLayout;
