import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TOAST_STYLE } from '@styles/toastStyles';
import InstitutionPage from '@page/institutionPage';
import { Toaster } from 'react-hot-toast';
import LearnerSignUpPage from '@page/learnerSignupPage';
import AdminSignUpPage from '@page/adminSignUpPage';
import ResetPasswordPage from '@page/resetPasswordPage';
import LandingPage from '@page/landingPage';
import DashboardPage from '@page/dashboardPage';
import NotFoundPage from '@components/layout/NotFoundPage';
import LoginPage from '@page/loginPage';
import OrganizationLayout from '@components/layout/OrganizationLayout';
import ProtectedLayout from '@components/layout/ProtectedLayout';
import TeacherSignUpPage from '@page/teacherPage';
import { isMainDomain, getSubdomain } from '@utils/domainUtils';
import { useEffect, useState } from 'react';
import UnavailablePage from '@page/unavailablePage';
import { institutionService } from '@api/auth/institution';
import LogoutPage from '@page/logoutPage';

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
      <Route path="logout" element={<LogoutPage />} />
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
