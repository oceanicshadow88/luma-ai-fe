import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../schemas';
import { useResetPassword } from '../hooks/useResetPassword';
import { Input } from '@components/forms/Input';
import { PasswordInput } from '@components/forms/PasswordInput';
import { Button } from '@components/buttons/Button';
import { VerificationCodeInput } from '@components/forms/VerificationCodeInput';
import { ResetPasswordFormData } from '@features/auth/types';
import {
  RESET_PASSWORD_ERROR_MESSAGE_MAP,
  UNKNOWN_ERROR,
} from '@custom-types/ApiError';
import { handleAdvancedFormError } from '@utils/errorHandler';  
import { toast } from 'react-hot-toast';

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const { resetPassword, sendVerificationCode, isCodeSending, countdown } = useResetPassword();

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword(data);
      toast.success('Password reset successfully. Please log in again with new password.');
      setTimeout(() => navigate('/auth/login'), 3000);
    } catch (error) {
      handleAdvancedFormError(
        error,
        setError,
        RESET_PASSWORD_ERROR_MESSAGE_MAP,
        'toast',
        UNKNOWN_ERROR.message
      );
    }
  };

  const handleSendCode = async () => {
    clearErrors('email');
    const isValid = await trigger('email');
    if (!isValid) return;

    const email = getValues('email');
    try {
      await sendVerificationCode(email);
      toast.success('If the email is valid, a verification code will be sent.');
    } catch (error) {
      handleAdvancedFormError(
        error,
        setError,
        RESET_PASSWORD_ERROR_MESSAGE_MAP,
        'toast',
        UNKNOWN_ERROR.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div className="space-y-4 max-w-md ">
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="e.g. your@email.com"
          {...register('email')}
          error={errors.email?.message}
        />
        <VerificationCodeInput
          id="verificationCode"
          label="Verification Code"
          placeholder="Enter the 6-digit code"
          buttonText={countdown > 0 ? `Resend in ${countdown}s` : 'Send'}
          onButtonClick={handleSendCode}
          isButtonDisabled={countdown > 0 || isCodeSending}
          {...register('verificationCode')}
          error={errors.verificationCode?.message}
        />
        <PasswordInput
          id="password"
          label="New Password"
          placeholder="Create a new password"
          {...register('password')}
          error={errors.password?.message}
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          placeholder="Confirm your new password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
      </div>
      <div>
        <Button type="submit" fullWidth disabled={isSubmitting} isLoading={isSubmitting}>
          Reset Password
        </Button>
      </div>
    </form>
  );
}