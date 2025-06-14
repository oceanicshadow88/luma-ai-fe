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
import { useFormTheme, type ThemeType } from '@styles/formThemeStyles';

interface ResetPasswordFormProps {
  userType?: UserType;
  onSuccess?: () => void;
  theme?: ThemeType;
}

export function ResetPasswordForm({
  userType = UserType.LEARNER,
  onSuccess,
  theme = 'default'
}: ResetPasswordFormProps) {
  const navigate = useNavigate();
  const themeStyles = useFormTheme(theme);

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

  const { resetPassword, sendVerificationCode, isCodeSending, isResetting, countdown } = useResetPassword();

  const getLoginPath = () => {
    return userType === UserType.ENTERPRISE ? '/auth/login/enterprise' : '/auth/login/learner';
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    const result = await resetPassword(data, { setError });
    
    if (result.success) {
      toast.success('Password reset successfully. Please log in again with new password.');
      setTimeout(() => navigate(getLoginPath()), 3000);
      onSuccess?.();
    }
  };

  const handleSendCode = async () => {
    clearErrors('email');
    const isValid = await trigger('email');
    if (!isValid) return;

    const email = getValues('email');
    const result = await sendVerificationCode(email, { setError });
    
    if (result.success) {
      toast.success('If the email is valid, a verification code will be sent.');
    }
  };

  const isProcessing = isSubmitting || isResetting;

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
          buttonText={countdown > 0 ? `Resend in ${countdown}s` : 'Send'}
          onButtonClick={handleSendCode}
          isButtonDisabled={countdown > 0 || isCodeSending}
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
          fullWidth 
          disabled={isProcessing} 
          isLoading={isProcessing}
          className={themeStyles.buttonClass}
        >
          Reset Password
        </Button>
      </div>
    </form>
  );
}