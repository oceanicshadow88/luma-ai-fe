import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ResetPasswordPage from '@app/auth/reset-password/page'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<Navigate to="/auth/reset-password" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
