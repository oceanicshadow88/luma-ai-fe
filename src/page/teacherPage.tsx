import logo from '@assets/logo.svg';
import decorativeGraphic from '@assets/decorative_graphic.png';
import TeacherSignUpForm from '@features/auth/components/TeacherSignUpForm';
import { useQueryToken } from '@hooks/useQueryToken';

export const TeacherSignUpPage = () => {
  const { isValidToken, token } = useQueryToken();

  if (!isValidToken) {
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
            Sign up for Luma AI Teacher Version
          </h1>
        </section>

        <section className="w-full max-w-sm sm:max-w-md lg:max-w-md">
          <div className="w-full">
            <TeacherSignUpForm token={token} />
          </div>
        </section>
      </main>

      <aside className="hidden lg:block w-full lg:w-3/5" aria-hidden="true">
        <img
          src={decorativeGraphic}
          alt="Luma AI Illustration"
          className="w-full h-full object-contain"
        />
      </aside>
    </div>
  );
};

export default TeacherSignUpPage;
