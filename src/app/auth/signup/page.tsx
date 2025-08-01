import AdminSignUpForm from '@features/auth/components/SignUpForm';
import { useSearchParams } from 'react-router-dom';
import TeacherSignUpForm from '@features/auth/components/TeacherSignUpForm';

const SignUpPage = () => {
  const [searchParams] = useSearchParams();
  const hasToken = searchParams.get('token');

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center px-4">
      {hasToken ? <TeacherSignUpForm /> : <AdminSignUpForm />}
    </div>
  );
};

export default SignUpPage;
