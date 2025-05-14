import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from '@/app/auth/signup/page';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/auth/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;