import { Link } from 'react-router-dom';
import { ResetPasswordForm } from '@features/auth/components/ResetPasswordForm';
import logo from '@assets/logo.svg';

const ResetPasswordFormPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">  
      <img src={logo} alt="logo" className="absolute left-[3.47vw] top-[4.44vh]" />
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reset Password</h1>
      <ResetPasswordForm />
      <Link to="/auth/login" className="pt-6 text-blue-600 hover:text-blue-900 hover:underline">
        Back to Login
      </Link>
    </div>
  );
};

export default ResetPasswordFormPage;
