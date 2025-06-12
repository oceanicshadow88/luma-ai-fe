import { Link } from 'react-router-dom';
import { ResetPasswordForm } from '@features/auth/components/ResetPasswordForm';
import { UserType } from '@features/auth/types';
import logo from '@assets/logo.svg';

const EnterpriseResetPasswordPage = () => {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <img src={logo} alt="Luma AI Logo" className="absolute left-[3.47vw] top-[4.44vh] w-24 sm:w-32" />
  
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Reset Password
          </h1>
        </header>
  
        <main className="w-full max-w-md mt-6">
          <ResetPasswordForm userType={UserType.ENTERPRISE} />
          <Link
            to="/auth/login/enterprise"
            className="block pt-6 text-center text-blue-600 hover:text-blue-900 hover:underline"
            aria-label="Back to login page"
          >
            Back to Login
          </Link>
        </main>
      </div>
    );
  };

  export default EnterpriseResetPasswordPage;