import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TOAST_STYLE } from '@styles/toastStyles';
import InstitutionPage from '@app/auth/institution/page';
import { Toaster } from 'react-hot-toast';
import SignUpPage from '@app/auth/signup/page';
import EnterpriseLoginPage from '@app/auth/login/enterprise/page';
import LearnerLoginPage from '@app/auth/login/learner/page';
import ResetPasswordPage from '@app/auth/reset-password/page';
import LandingPage from '@app/landing/page';
import DashboardPage from '@app/dashboard/page';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: TOAST_STYLE,
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/auth/login/enterprise" element={<EnterpriseLoginPage />} />
        <Route path="/auth/login/learner" element={<LearnerLoginPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/auth/signup/institution" element={<InstitutionPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
