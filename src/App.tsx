import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import { authService } from '@api/auth/auth';
import NotFoundPage from '@components/layout/NotFoundPage';

const App = () => {
  const [isSubdomainValid, setIsSubdomainValid] = useState<boolean | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    if (pathname === '/auth/signup/admin') {
      if (hostname === 'lumaai.com' || hostname === 'lumaai.localhost') {
        setIsSubdomainValid(true);
        return;
      }
      authService.verifySubdomain().then(setIsSubdomainValid);
      return;
    }

    const shouldSkipValidation = () => {
      if (hostname === 'lumaai.com') {
        if (pathname === '/' || pathname === '/auth/signup/institution') {
          return true;
        }
      }
      
      if (hostname === 'lumaai.localhost') {
        if (pathname === '/' || pathname === '/auth/signup/institution') {
          return true;
        }
      }
      
      return false;
    };

    if (shouldSkipValidation()) {
      setIsSubdomainValid(true);
    } else {
      authService.verifySubdomain().then(setIsSubdomainValid);
    }
  }, []);

  if (isSubdomainValid === null) return <div>Loading...</div>;
  
  if (!isSubdomainValid) return <NotFoundPage />;

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
    </BrowserRouter>
  );
};

export default App;