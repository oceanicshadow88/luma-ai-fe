import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas';
import { LoginFormData } from '../types';
import { useLogin } from '../hooks/useLogin';
import { Input } from '@components/forms/Input';
import { PasswordInput } from '@components/forms/PasswordInput';
import { Button } from '@components/buttons/Button';
import { useNavigate } from 'react-router-dom';
import { handleAdvancedFormError } from '@utils/errorHandler';
import { LOGIN_ERROR_MESSAGE_MAP } from '@custom-types/ApiError';
import { showToastWithAction } from '@components/toast/ToastWithAction';

interface LoginFormProps {
  loginType?: 'learner' | 'enterprise';
  onSuccess?: () => void;
}

export function LoginForm({ loginType = 'learner', onSuccess }: LoginFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const { login, isLoggingIn } = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data, loginType);

      const timeoutId = setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

      showToastWithAction('Successfully logged in! Redirecting...', {
        actionText: 'Go Now',
        onAction: () => {
          clearTimeout(timeoutId);
          navigate('/dashboard');
        },
        duration: 2000,
      });

      onSuccess?.();
    } catch (error) {
      handleAdvancedFormError(
        error,
        setError,
        LOGIN_ERROR_MESSAGE_MAP,
        'toast',
        'Something went wrong. Please try again later.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
      <Input
        id="email"
        label="Email Address"
        type="email"
        placeholder="e.g. your@email.com"
        {...register('email')}
        error={errors.email?.message}
      />

      <PasswordInput
        id="password"
        label="Password"
        placeholder="Your password"
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