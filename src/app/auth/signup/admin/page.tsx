import logo from '@assets/logo.svg';
import rightLogo from '@assets/decorative_graphic.png';
import SignUpForm from '@features/auth/components/SignUpForm';
import { UserRole } from '@features/auth/types';
import { useNavigate } from 'react-router-dom';
import { showToastWithAction } from '@components/toast/ToastWithAction';
import { useQueryToken } from '@hooks/useQueryToken';
import { isMainDomain } from '@utils/domainUtils';
import RedirectNoticePage from '@components/layout/RedirectNoticePage';

const AdminSignUpPage = () => {
  const navigate = useNavigate();
  const { isValidToken, token } = useQueryToken(false);
  const subDomainNoToken = !isMainDomain() && !token;
  const hasTokenButInvalid = token && !isValidToken;
  const mainDomainHasToken = isMainDomain() && token;

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
      return;
    }

    navigate('/auth/signup/institution', {
      state: { signupForm: data },
    });
  };

  if (mainDomainHasToken) {
    return <RedirectNoticePage />;
  }

  if (subDomainNoToken || hasTokenButInvalid) {
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
      <main className="w-full lg:w-3/5 sm:mt-10 sm:p-6 md:p-8 lg:pr-30 flex flex-col justify-center items-start bg-white">
        <header className="w-full mb-6 sm:mb-8 flex flex-row items-center gap-2 justify-center sm:justify-start">
          <img src={logo} alt="Luma AI Logo" className="h-6 sm:h-8" />
        </header>

        <section className="w-full sm:mb-6 text-left">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-xl font-semibold text-gray-800 leading-tight">
            Sign up for Luma AI Enterprise Version
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