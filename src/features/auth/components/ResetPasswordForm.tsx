import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@features/auth/schemas';
import { useResetPassword } from '@features/auth/hooks/useResetPassword';
import { Input } from '@components/forms/Input';
import { PasswordInput } from '@components/forms/PasswordInput';
import { Button } from '@components/buttons/Button';
import { VerificationCodeInput } from '@components/forms/VerificationCodeInput';
import { ResetPasswordFormData, UserType } from '@features/auth/types';
import { toast } from 'react-hot-toast';

interface ResetPasswordFormProps {
  userType?: UserType;
  onSuccess?: () => void;
}

export function ResetPasswordForm({
  userType = UserType.LEARNER,
  onSuccess,
}: ResetPasswordFormProps) {
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

  const getLoginPath = () => {
    return userType === UserType.ENTERPRISE ? '/auth/login/enterprise' : '/auth/login/learner';
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    await resetPassword(data);
    toast.success('Password reset successfully. Please log in again with new password.');
    setTimeout(() => navigate(getLoginPath()), 3000);
    onSuccess?.();
  };

  const handleSendCode = async () => {
    clearErrors('email');
    const isValid = await trigger('email');
    if (!isValid) return;

    const email = getValues('email');
    await sendVerificationCode(email);
    toast.success('If the email is valid, a verification code will be sent.');
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