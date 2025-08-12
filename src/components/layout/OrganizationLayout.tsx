import { isMainDomain } from '@utils/domainUtils';
import RedirectNoticePage from '@components/layout/RedirectNoticePage';
import { Outlet } from 'react-router-dom';

const OrganizationLayout = () => {
  if (isMainDomain()) {
    return <RedirectNoticePage />;
  }

  //check is does company exits is not return Page unavailable see: https://oajfojafoff.atlassian.net/

  return <Outlet />;
};

export default OrganizationLayout;
