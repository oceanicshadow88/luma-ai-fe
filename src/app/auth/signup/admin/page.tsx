import logo from '@assets/logo.svg';
import rightLogo from '@assets/decorative_graphic.png';
import SignUpForm from '@features/auth/components/SignUpForm';
import { UserRole } from '@features/auth/types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { filterSignupForm } from '@utils/filterSignupForm';
import { showToastWithAction } from '@components/toast/ToastWithAction';

const AdminSignUpPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') ?? '';

  const getFormTitle = () => {
    return 'Sign up for Luma AI Enterprise Version';
  };

  const onSuccess = (data: any) => {
    if (token) {
      const timeoutId = setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

      showToastWithAction('Successfully signed up! Redirecting...', {
        actionText: 'Go Now',
        onAction: () => {
          clearTimeout(timeoutId);
          navigate('/dashboard');
        },
        duration: 2000,
      });
    }

    navigate('/auth/signup/institution', {
      state: { signupForm: filterSignupForm(data) },
    });
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
            <SignUpForm userRole={UserRole.ADMIN} token={token} onSuccess={onSuccess} />
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
