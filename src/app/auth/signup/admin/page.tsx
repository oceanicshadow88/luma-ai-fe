import logo from '@assets/logo.svg';
import rightLogo from '@assets/decorative_graphic.png';
import SignUpForm from '@features/auth/components/SignUpForm';
import { UserRole } from '@features/auth/types';
import { useSearchParams } from 'react-router-dom';

const AdminSignUpPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const getFormTitle = () => {
    return 'Sign up for Luma AI Enterprise Version';
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <main className="w-full lg:w-3/5 sm:mt-10 sm:p-6 md:p-8 lg:pr-30 flex flex-col justify-center items-start bg-white">
        <header className="w-full mb-6 sm:mb-8 flex flex-row items-center gap-2 justify-center sm:justify-start">
          <img src={logo} alt="Luma AI Logo" className="h-6 sm:h-8" />
        </header>

        <section className="w-full sm:mb-6 text-left">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-xl font-semibold text-gray-800 leading-tight">
            {getFormTitle()}
          </h1>
        </section>

        <section className="w-full max-w-sm sm:max-w-md lg:max-w-md">
          <div className="w-full">
            <SignUpForm userRole={UserRole.ADMIN} token={token}/>
          </div>
        </section>
      </main>

      <aside className="hidden lg:block w-full lg:w-3/5" aria-hidden="true">
        <img src={rightLogo} alt="Luma AI Illustration" className="w-full h-full object-contain" />
      </aside>
    </div>
  );
};

export default AdminSignUpPage;
