import { Link } from 'react-router-dom';
import logo from '@assets/logo.svg';
import background from '@assets/decorative_graphic.png';
import { LoginForm } from '@features/auth/components/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <aside className="hidden lg:block w-full lg:w-2/5" aria-hidden="true">
        <img
          src={background}
          alt="Decorative pattern background"
          className="w-full h-full object-contain"
        />
      </aside>

      <main className="w-full lg:w-3/5 sm: mt-10 sm:p-6 md:p-8 lg:pl-30 flex flex-col justify-center items-start bg-white">
        <header className="w-full mb-6 sm:mb-8 flex flex-row items-center gap-2 justify-center sm:justify-start">
          <img src={logo} alt="Luma AI Logo" className="h-6 sm:h-8" />
        </header>

        <section className="w-full sm:mb-6 text-left">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-xl font-semibold text-gray-800 leading-tight">
            Log in to Luma AI Version
          </h1>
        </section>

        <section className="w-full max-w-sm sm:max-w-md lg:max-w-md">
          <div className="w-full">
            <LoginForm theme="learner" />
          </div>

          <div className="mt-4 sm:mt-6 text-sm text-center">
            <p className="text-gray-600 inline">Forgot Password?</p>
            <Link
              to="/reset-password"
              className="ml-1 text-[#ffa310] font-medium hover:text-yellow-600 hover:underline active:text-blue-700 transition-colors"
            >
              Reset Your Password
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
