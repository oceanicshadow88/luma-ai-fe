import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import ResetPasswordPage from '@app/auth/reset-password/page'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        {/* <Route path="*" element={<Navigate to="/auth/reset-password" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
