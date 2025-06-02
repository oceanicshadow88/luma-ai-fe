import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas';
import { LoginFormData } from '../types';
import { useLogin } from '../hooks/useLogin';
import { Input } from '@components/forms/Input';
import { PasswordInput } from '@components/forms/PasswordInput';
import { Button } from '@components/buttons/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ApiError } from '@custom-types/ApiError';

export function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const { login, isLoggingIn } = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast.success('Login successful!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
      <Input
        id="email"
        label="Work Email"
        type="email"
        placeholder="e.g. xxx@college.edu.au"
        {...register('email')}
        error={errors.email?.message}
      />

      <PasswordInput
        id="password"
        label="Password"
        placeholder="your password"
        {...register('password')}
        error={errors.password?.message}
      />

      <Button
        type="submit"
        variant="primary"
        className="rounded-3xl"
        fullWidth
        disabled={isSubmitting || isLoggingIn}
        isLoading={isSubmitting || isLoggingIn}
      >
        Log In
      </Button>
    </form>
  );
}
