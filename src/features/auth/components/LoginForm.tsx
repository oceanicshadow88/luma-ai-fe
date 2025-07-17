import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@features/auth/schemas';
import { LoginFormData, UserType } from '@features/auth/types';
import { Input } from '@components/forms/Input';
import { PasswordInput } from '@components/forms/PasswordInput';
import { Button } from '@components/buttons/Button';
import { showToastWithAction } from '@components/toast/ToastWithAction';
import { useFormTheme, type ThemeType } from '@styles/formThemeStyles';
import { loginService } from '@api/auth/login';

interface LoginFormProps {
  userType?: UserType;
  onSuccess?: () => void;
  theme?: ThemeType;
}

export function LoginForm({
  userType = UserType.LEARNER,
  onSuccess,
  theme = 'default'
}: LoginFormProps) {
  const navigate = useNavigate();
  const themeStyles = useFormTheme(theme);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    
    const result = await loginService.login(data, userType);

    if (result) return;

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
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
      <Input
        id="email"
        label="Email Address"
        type="email"
        placeholder="e.g. your@email.com"
        {...register('email')}
        error={errors.email?.message}
        inputClassName={themeStyles.inputClassName}
        labelClassName={themeStyles.labelClassName}
      />

      <PasswordInput
        id="password"
        label="Password"
        placeholder="Your password"
        {...register('password')}
        error={errors.password?.message}
        inputClassName={themeStyles.passwordInputClassName}
        labelClassName={themeStyles.labelClassName}
      />

      <Button
        type="submit"
        variant="primary"
        className={`rounded-3xl ${themeStyles.buttonClass}`}
        fullWidth
        disabled={isSubmitting }
        isLoading={isSubmitting }
      >
        Log In
      </Button>
    </form>
  );
}

