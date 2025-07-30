import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TOAST_STYLE } from '@styles/toastStyles';
import InstitutionPage from '@app/auth/institution/page';
import { Toaster } from 'react-hot-toast';
import LearnerSignUpPage from '@app/auth/signup/learner/page';
import AdminSignUpPage from '@app/auth/signup/admin/page';
import EnterpriseLoginPage from '@app/auth/login/enterprise/page';
import LearnerLoginPage from '@app/auth/login/learner/page';
import EnterpriseResetPasswordPage from '@app/auth/reset-password/enterprise/page';
import LearnerResetPasswordPage from '@app/auth/reset-password/learner/page';
import LandingPage from '@app/landing/page';
import DashboardPage from '@app/dashboard/page';
import TeacherSignUpPage from './page/teacherPage/teacherPage';
import SignupRouter from '@app/auth/signup/SignupRouter';
import NotFoundPage from '@components/layout/NotFoundPage';
import RedirectNoticePage from './components/layout/RedirectNoticePage';
import { usePageStatus } from './hooks/usePageStatus';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />

    <Route path="/auth/signup" element={<SignupRouter />} />
    <Route path="/auth/signup/learner" element={<LearnerSignUpPage />} />
    <Route path="/auth/signup/admin" element={<AdminSignUpPage />} />
    <Route path="/auth/signup/teacher" element={<TeacherSignUpPage />} />
    <Route path="/auth/signup/institution" element={<InstitutionPage />} />

    <Route path="/auth/login" element={<LearnerLoginPage />} />
    <Route path="/auth/login/learner" element={<LearnerLoginPage />} />
    <Route path="/auth/login/enterprise" element={<EnterpriseLoginPage />} />

    <Route path="/auth/reset-password" element={<LearnerResetPasswordPage />} />
    <Route path="/auth/reset-password/learner" element={<LearnerResetPasswordPage />} />
    <Route path="/auth/reset-password/enterprise" element={<EnterpriseResetPasswordPage />} />

    <Route path="/dashboard" element={<DashboardPage />} />

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const AppWithRouter = () => {
  const pageStatus = usePageStatus();

  const renderContent = () => {
    switch (pageStatus) {
      case 'ok':
        return <AppRoutes />;
      case 'guide':
        return <RedirectNoticePage />;
      case 'notfound':
        return <NotFoundPage />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: TOAST_STYLE,
        }}
      />
      {renderContent()}
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppWithRouter />
  </BrowserRouter>
);

export default App;
