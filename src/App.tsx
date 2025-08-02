import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TOAST_STYLE } from '@styles/toastStyles';
import InstitutionPage from '@app/auth/institution/page';
import { Toaster } from 'react-hot-toast';
import LearnerSignUpPage from '@app/auth/signup/learner/page';
import AdminSignUpPage from '@app/auth/signup/admin/page';
import ResetPasswordPage from '@app/auth/reset-password/page';
import LandingPage from '@app/landing/page';
import DashboardPage from '@app/dashboard/page';
import NotFoundPage from '@components/layout/NotFoundPage';
import LoginPage from '@app/auth/login/page';
import OrganizationLayout from '@page/layout/OrganizationLayout';
import ProtectedLayout from '@page/layout/ProtectedLayout';
import TeacherSignUpPage from '@page/teacherPage/teacherPage';
import { isMainDomain, getSubdomain } from '@utils/domainUtils';
import { useEffect, useState } from 'react';
import UnavailablePage from '@page/unavailablePage/unavailablePage';
import { institutionService } from '@api/auth/institution';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/auth/signup/admin" element={<AdminSignUpPage />} />
    <Route path="/auth/signup/institution" element={<InstitutionPage />} />

    <Route path="/" element={<OrganizationLayout />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="auth/signup/learner" element={<LearnerSignUpPage />} />
      <Route path="auth/signup/instructor" element={<TeacherSignUpPage />} />
    </Route>

    <Route path="/" element={<ProtectedLayout />}>
      <Route path="dashboard" element={<DashboardPage />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const App = () => {
  const [isSubDomainAvailable, setIsSubDomainAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isMainDomain()) {
      setIsLoading(false);
      setIsSubDomainAvailable(true);
      return;
    }

    const checkAvailability = async () => {
      const subdomain = getSubdomain();
      const available = await institutionService.checkCompanyAvailability(subdomain).finally(() => {
        setIsLoading(false);
      });
      setIsSubDomainAvailable(!!available);
    };
    checkAvailability();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isSubDomainAvailable) {
    return <UnavailablePage />;
  }

  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: TOAST_STYLE,
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
