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
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      setError('root', { message: 'Invalid email or password.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="your@email.com"
        {...register('email')}
        error={errors.email?.message}
      />

      <PasswordInput
        id="password"
        label="Password"
        placeholder="********"
        {...register('password')}
        error={errors.password?.message}
      />

      {errors.root && <FormError message={errors.root.message} />}

      <Button type="submit" fullWidth disabled={isSubmitting || isLoggingIn} isLoading={isSubmitting || isLoggingIn}>
        Log In
      </Button>
    </form>
  );
}
