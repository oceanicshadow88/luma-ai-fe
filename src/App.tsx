import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from '@/app/auth/signup/page';
import InstitutionPage from '@/app/auth/signup/institution';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/auth/signup/institution" element={<InstitutionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;