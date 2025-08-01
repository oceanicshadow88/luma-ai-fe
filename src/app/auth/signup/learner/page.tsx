import logo from '@assets/logo.svg';
import leftLogo from '@assets/decorative_graphic.png';
import SignUpForm from '@features/auth/components/SignUpForm';
import { UserRole } from '@features/auth/types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { showToastWithAction } from '@components/toast/ToastWithAction';
import { decodeJwt } from '../../../../utils/jwtUtils';
import { hasExpiry } from '../../../../utils/dataUtils';

const LearnerSignUpPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') ?? '';
  const decodePayload: any = decodeJwt(token ?? '');

  const getFormTitle = () => {
    return 'Sign up for Luma AI Learner Version';
  };

  const onSuccess = () => {
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
  };

  if (!decodePayload || hasExpiry(decodePayload?.exp)) {
        return (
          <div className="text-center py-8">
            <div className="text-red-600">
              Invalid or expired invitation link. Please check your email or contact admin.
            </div>
          </div>
        );
      }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <aside className="hidden lg:block w-full lg:w-3/5" aria-hidden="true">
        <img src={leftLogo} alt="Luma AI Illustration" className="w-full h-full object-contain" />
      </aside>

      <main className="w-full lg:w-3/5 sm:mt-10 sm:p-6 md:p-8 lg:pl-30 flex flex-col justify-center items-start bg-white">
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
            <SignUpForm
              userRole={UserRole.LEARNER}
              token={token}
              theme="learner"
              onSuccess={onSuccess}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default LearnerSignUpPage;
