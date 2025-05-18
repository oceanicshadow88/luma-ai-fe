import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schema';
import { LoginFormData } from '../type';
import { useLogin } from '../hooks/useLogin';
import { Input } from '@components/Input';
import { PasswordInput } from '@components/PasswordInput';
import { Button } from '@components/Button';
import { FormError } from '@components/FormError';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const { login, isLoggingIn } = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast.success('Login successful!');
        navigate('/dashboard');
    } catch (error) {
      setError('root', { message: 'Invalid email or password.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-8 mt-8 mb-8">
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="your@email.com"
        {...register('email')}
        fieldClassName="mb-4"
        labelClassName="text-left block"  
        inputClassName="text-left bg-gray-100 border-b border-gray-300 rounded-none focus:border-blue-500 focus:ring-0 px-0 py-3 h-12" 
        error={errors.email?.message}
      />

      <PasswordInput
        id="password"
        label="Password"
        placeholder="********"
        {...register('password')}
        fieldClassName="mb-4"
        labelClassName="text-left block"  
        inputClassName="text-left  bg-gray-100 border-b border-gray-300 rounded-none focus:border-blue-500 focus:ring-0 px-0 py-3 h-12" 
        error={errors.password?.message}
      />

      {errors.root && <FormError message={errors.root.message} />}

      <Button 
        type="submit" 
        variant="primary"
        className="!bg-black hover:!bg-gray-600 !text-white mt-4 py-3"
        fullWidth 
        disabled={isSubmitting || isLoggingIn} 
        isLoading={isSubmitting || isLoggingIn}
      >
        CONTINUE
      </Button>
    </form>
  );
}