import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import InstitutionPage from '@app/auth/institution/page';
import { Toaster } from 'react-hot-toast';
import SignUpPage from '@app/auth/signup/page';
import LoginPage from '@app/auth/login/page';
import ResetPasswordPage from '@app/auth/reset-password/page';
import LandingPage from '@app/landing/page';
import DashboardPage from '@app/dashboard/page';


const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        // Using style object instead of Tailwind classes because the Toaster component
        // doesn't process Tailwind utility classes and expects standard React style objects
        toastOptions={{
          duration: 3000,
          style: {
            zIndex: 9999,
            marginTop: '300px',
            width: '300px',
            padding: '1rem',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            textAlign: 'center',
            borderRadius: '1rem',
            fontWeight: 'bold',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/auth/signup/institution" element={<InstitutionPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
