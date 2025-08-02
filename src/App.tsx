import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TOAST_STYLE } from '@styles/toastStyles';
import InstitutionPage from '@app/auth/institution/page';
import { Toaster } from 'react-hot-toast';
import LearnerSignUpPage from '@app/auth/signup/learner/page';
import AdminSignUpPage from '@app/auth/signup/admin/page';
import ResetPasswordPage from '@app/auth/reset-password/page';
import LandingPage from '@app/landing/page';
import DashboardPage from '@app/dashboard/page';
import TeacherSignUpPage from './page/teacherPage/teacherPage';
import SignupRouter from '@app/auth/signup/SignupRouter';
import NotFoundPage from '@components/layout/NotFoundPage';
import RedirectNoticePage from './components/layout/RedirectNoticePage';
import { usePageStatus } from './hooks/usePageStatus';
import LoginPage from '@app/auth/login/page';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />

    <Route path="/auth/signup" element={<SignupRouter />} />
    <Route path="/auth/signup/admin" element={<AdminSignUpPage />} />

    <Route path="/auth/signup/instructor" element={<TeacherSignUpPage />} />
    <Route path="/auth/signup/learner" element={<LearnerSignUpPage />} />
    <Route path="/auth/signup/institution" element={<InstitutionPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />
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
