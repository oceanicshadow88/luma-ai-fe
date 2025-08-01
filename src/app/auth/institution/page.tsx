import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '@assets/logo.svg';
import background from '@assets/decorative_graphic.png';
import InstitutionForm from '@features/auth/components/InstitutionForm';

const InstitutionPage = () => {
  const location = useLocation();

  useEffect(() => {
    const hasRequiredData = location.state?.signupForm?.email;

    if (!hasRequiredData) {
      const hostname = window.location.hostname;
      const protocol = window.location.protocol;
      
      if (hostname.endsWith('.lumaai.com')) {
        window.location.href = `${protocol}//lumaai.com/auth/signup/admin`;
      } else if (hostname.endsWith('.lumaai.localhost')) {
        window.location.href = `${protocol}//lumaai.localhost:${window.location.port}/auth/signup/admin`;
      } else {
        window.location.href = '/auth/signup/admin';
      }
      return;
    }
  }, [location.state]);

  if (!location.state?.signupForm?.email) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <main className="w-full lg:w-3/5 sm:mt-10 sm:p-6 md:p-8 lg:pl-30 flex flex-col justify-center items-start bg-white">
        <header className="w-full mb-6 sm:mb-8 flex flex-row items-center gap-2 justify-center sm:justify-start">
          <img src={logo} alt="Luma AI Logo" className="h-6 sm:h-8" />
        </header>

        <section className="w-full sm:mb-6 text-left">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-xl font-semibold text-gray-800 leading-tight">
            Register New Institution
          </h1>
        </section>

        <section className="w-full max-w-sm sm:max-w-md lg:max-w-md">
          <InstitutionForm />
        </section>
      </main>

      <aside className="hidden lg:block w-full lg:w-2/5" aria-hidden="true">
        <img
          src={background}
          alt="Decorative pattern background"
          className="w-full h-full object-contain"
        />
      </aside>
    </div>
  );
};

export default InstitutionPage;