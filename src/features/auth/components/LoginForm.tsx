import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@features/auth/schemas';
import { LoginFormData, UserType } from '@features/auth/types';
import { useLogin } from '@features/auth/hooks/useLogin';
import { Input } from '@components/forms/Input';
import { PasswordInput } from '@components/forms/PasswordInput';
import { Button } from '@components/buttons/Button';
import { useNavigate } from 'react-router-dom';
import { handleAdvancedFormError } from '@utils/errorHandler';
import { LOGIN_ERROR_MESSAGE_MAP } from '@custom-types/ApiError';
import { showToastWithAction } from '@components/toast/ToastWithAction';

type Theme = 'default' | 'learner';

interface LoginFormProps {
  userType?: UserType;
  onSuccess?: () => void;
  theme?: Theme;
}

export function LoginForm({ userType = UserType.LEARNER, onSuccess, theme = 'default' }: LoginFormProps) {
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

  const themeStyles = {
    default: {
      inputClassName: 'border focus:outline-none focus:placeholder-transparent text-left border-gray-300 focus:border-blue-600 focus:ring-0 px-4 h-11 leading-normal pl-[20px]',
      passwordInputClassName: 'border focus:outline-none rounded-3xl text-left border-gray-300 focus:border-blue-600 focus:ring-0 px-4 h-11 leading-normal pl-[20px] pr-10',
      labelClassName: 'text-left block text-gray-600 mb-1 group-focus-within:text-blue-600',
      buttonClass: '',
    },
    learner: {
      inputClassName: 'border focus:outline-none focus:placeholder-transparent text-left border-gray-300 focus:border-yellow-500 focus:ring-0 px-4 h-11 leading-normal pl-[20px]',
      passwordInputClassName: 'border focus:outline-none rounded-3xl text-left border-gray-300 focus:border-yellow-500 focus:ring-0 px-4 h-11 leading-normal pl-[20px] pr-10',
      labelClassName: 'text-left block text-gray-600 mb-1 group-focus-within:text-yellow-600',
      buttonClass: '!bg-yellow-500 hover:!bg-yellow-600',
    },
  };

  const currentTheme = themeStyles[theme];

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data, userType);
      
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
        inputClassName={currentTheme.inputClassName}
        labelClassName={currentTheme.labelClassName}
      />

      <PasswordInput
        id="password"
        label="Password"
        placeholder="Your password"
        {...register('password')}
        error={errors.password?.message}
        inputClassName={currentTheme.passwordInputClassName}
        labelClassName={currentTheme.labelClassName}
      />

      <Button
        type="submit"
        variant="primary"
        className={`rounded-3xl ${currentTheme.buttonClass}`}
        fullWidth
        disabled={isSubmitting || isLoggingIn}
        isLoading={isSubmitting || isLoggingIn}
      >
        Log In
      </Button>
    </form>
  );
}