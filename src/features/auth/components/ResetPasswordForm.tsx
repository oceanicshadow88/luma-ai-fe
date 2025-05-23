import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../schema';
import { useResetPassword } from '../hooks/useResetPassword';
import { Input } from '@components/forms/Input';
import { PasswordInput } from '@components/forms/PasswordInput';
import { Button } from '@components/buttons/Button';
import { FormError } from '@components/forms/FormError';
import { VerificationCodeInput } from '@components/forms/VerificationCodeInput';
import { ResetPasswordFormData } from '@features/auth/type';
import {
  ApiError,
  ERROR_MESSAGE_MAP,
  UNKNOWN_ERROR,
  ResetPasswordField,
} from '@custom-types/ApiError';
import { toast } from 'react-hot-toast';

// Extend ResetPasswordFormData to include 'root' for form errors
type ExtendedResetPasswordFormData = ResetPasswordFormData & { root?: string };

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
  } = useForm<ExtendedResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const { resetPassword, sendVerificationCode, isCodeSending, countdown } = useResetPassword();

  const onSubmit = async (data: ExtendedResetPasswordFormData) => {
    try {
      await resetPassword(data);
      toast.success('Password reset successfully. Please log in again with new password.');
      setTimeout(() => navigate('/auth/login'), 3000);
    } catch (error) {
      if (error instanceof ApiError) {
        const field: ResetPasswordField = ERROR_MESSAGE_MAP[error.message] || UNKNOWN_ERROR.field;
        const message = error.message in ERROR_MESSAGE_MAP ? error.message : UNKNOWN_ERROR.message;
        setError(field, { message });
      } else {
        setError('root', { message: 'Unexpected error occurred.' });
      }
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
      if (error instanceof ApiError) {
        const field: ResetPasswordField = ERROR_MESSAGE_MAP[error.message] || UNKNOWN_ERROR.field;
        let message = error.message in ERROR_MESSAGE_MAP ? error.message : UNKNOWN_ERROR.message;
        if (field === 'verificationCode' && error.meta?.cooldownSeconds) {
          message = `Too many requests. Try again in ${error.meta.cooldownSeconds} seconds.`;
        }
        setError(field, { message });
      } else {
        setError('verificationCode', {
          message: 'Unexpected error. Please try again.',
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div className="space-y-4 max-w-md ">
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="e.g. xxx@college.edu"
          {...register('email')}
          error={errors.email?.message}
        />
        <VerificationCodeInput
          id="verificationCode"
          label="Verification Code"
          placeholder="Enter the 6-digit code"
          buttonText={countdown > 0 ? `Resend in ${countdown}s` : 'Send Verification Code'}
          onButtonClick={handleSendCode}
          isButtonDisabled={countdown > 0 || isCodeSending}
          {...register('verificationCode')}
          error={errors.verificationCode?.message}
        />
        <PasswordInput
          id="password"
          label="New Password"
          placeholder="create a new password"
          {...register('password')}
          error={errors.password?.message}
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          placeholder="confirm your new password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
      </div>
      {errors.root && <FormError message={errors.root.message} />}
      <div>
        <Button type="submit" fullWidth disabled={isSubmitting} isLoading={isSubmitting}>
          Reset Password
        </Button>
      </div>
    </form>
  );
}