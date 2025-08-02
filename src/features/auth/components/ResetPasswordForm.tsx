import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@features/auth/schemas';
import { Input } from '@components/forms/Input';
import { PasswordInput } from '@components/forms/PasswordInput';
import { Button } from '@components/buttons/Button';
import { VerificationCodeInput } from '@components/forms/VerificationCodeInput';
import { ResetPasswordInput } from '@features/auth/types';
import { showToastWithAction } from '@components/toast/ToastWithAction';
import { useFormTheme, type ThemeType } from '@styles/formThemeStyles';
import { resetPasswordService } from '@api/auth/resetPassword';
import { useSendCode } from '@features/auth/hooks/useSendCode';
import { useEffect } from 'react';

interface ResetPasswordFormProps {
  onSuccess?: () => void;
  theme?: ThemeType;
}

export function ResetPasswordForm({ onSuccess, theme = 'default' }: ResetPasswordFormProps) {
  const navigate = useNavigate();
  const themeStyles = useFormTheme(theme);

  const { sendCode, countDown, canSend } = useSendCode();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
  });

  const email = watch('email');
  const verificationCode = watch('verificationCode');

  useEffect(() => {
    if (verificationCode && errors.verificationCode) {
      clearErrors('verificationCode');
    }
  }, [verificationCode, clearErrors]);

  const handleSendCode = async () => {
    if (!email || !canSend) return;

    clearErrors('verificationCode');

    const result = await sendCode(email);

    if (result) {
      if (result.meta?.field) {
        setError(result.meta?.field as keyof ResetPasswordInput, {
          message: result.message,
        });
      }
      return;
    }

    showToastWithAction('If the email is valid, a verification code will be sent.', {
      duration: 2000,
    });
  };

  const onSubmit = async (data: ResetPasswordInput) => {
    const payload = {
      email: data.email,
      verificationCode: data.verificationCode,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    const result = await resetPasswordService.resetPassword(payload);

    if (result) {
      if (result.meta?.field) {
        setError(result.meta?.field as keyof ResetPasswordInput, {
          message: result.message,
        });
      }
      return;
    }

    const timeoutId = setTimeout(() => {
      navigate('/login');
    }, 3000);

    showToastWithAction('Password reset successfully! Redirecting to login...', {
      actionText: 'Go Now',
      onAction: () => {
        clearTimeout(timeoutId);
        navigate('/login');
      },
      duration: 2000,
    });

    onSuccess?.();
    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div className="space-y-4 max-w-md">
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

        <VerificationCodeInput
          id="verificationCode"
          label="Verification Code"
          placeholder="Enter the 6-digit code"
          buttonText={countDown > 0 ? `Resend in ${countDown}s` : 'Send'}
          onButtonClick={handleSendCode}
          isButtonDisabled={!canSend}
          {...register('verificationCode')}
          error={errors.verificationCode?.message}
          inputClassName={themeStyles.inputClassName}
          labelClassName={themeStyles.labelClassName}
          buttonClassName={themeStyles.verificationButtonClass}
        />

        <PasswordInput
          id="password"
          label="New Password"
          placeholder="Create a new password"
          {...register('password')}
          error={errors.password?.message}
          inputClassName={themeStyles.passwordInputClassName}
          labelClassName={themeStyles.labelClassName}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          placeholder="Confirm your new password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          inputClassName={themeStyles.passwordInputClassName}
          labelClassName={themeStyles.labelClassName}
        />
      </div>

      <div>
        <Button
          type="submit"
          variant="primary"
          className={`rounded-3xl ${themeStyles.buttonClass}`}
          fullWidth
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Reset Password
        </Button>
      </div>
    </form>
  );
}
