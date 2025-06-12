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
import {
  RESET_PASSWORD_ERROR_MESSAGE_MAP,
  UNKNOWN_ERROR,
} from '@custom-types/ApiError';
import { handleAdvancedFormError } from '@utils/errorHandler';
import { toast } from 'react-hot-toast';

type Theme = 'default' | 'student';

interface ResetPasswordFormProps {
  userType?: UserType;
  onSuccess?: () => void;
  theme?: Theme;
}

export function ResetPasswordForm({
  userType = UserType.LEARNER,
  onSuccess,
  theme = 'default'
}: ResetPasswordFormProps) {
  const navigate = useNavigate();

  const themeStyles = {
    default: {
      inputClassName: 'border focus:outline-none focus:placeholder-transparent text-left border-gray-300 focus:border-blue-600 focus:ring-0 px-4 h-11 leading-normal pl-[20px]',
      passwordInputClassName: 'border focus:outline-none rounded-3xl text-left border-gray-300 focus:border-blue-600 focus:ring-0 px-4 h-11 leading-normal pl-[20px] pr-10',
      labelClassName: 'text-left block text-gray-600 mb-1 group-focus-within:text-blue-600',
      buttonClass: '',
      verificationButtonClass: '',
    },
    student: {
      inputClassName: 'border focus:outline-none focus:placeholder-transparent text-left border-gray-300 focus:border-yellow-500 focus:ring-0 px-4 h-11 leading-normal pl-[20px]',
      passwordInputClassName: 'border focus:outline-none rounded-3xl text-left border-gray-300 focus:border-yellow-500 focus:ring-0 px-4 h-11 leading-normal pl-[20px] pr-10',
      labelClassName: 'text-left block text-gray-600 mb-1 group-focus-within:text-yellow-500',
      buttonClass: '!bg-yellow-500 hover:!bg-yellow-600',
      verificationButtonClass: '!bg-transparent !text-yellow-500 hover:!bg-transparent hover:!text-yellow-600 !border-yellow-500',
    },
  };

  const currentTheme = themeStyles[theme];

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
    try {
      await resetPassword(data);
      toast.success('Password reset successfully. Please log in again with new password.');
      setTimeout(() => navigate(getLoginPath()), 3000);
      onSuccess?.();
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
          inputClassName={currentTheme.inputClassName}
          labelClassName={currentTheme.labelClassName}
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
          inputClassName={currentTheme.inputClassName}
          labelClassName={currentTheme.labelClassName}
          buttonClassName={currentTheme.verificationButtonClass}
        />
        <PasswordInput
          id="password"
          label="New Password"
          placeholder="Create a new password"
          {...register('password')}
          error={errors.password?.message}
          inputClassName={currentTheme.passwordInputClassName}
          labelClassName={currentTheme.labelClassName}
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          placeholder="Confirm your new password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          inputClassName={currentTheme.passwordInputClassName}
          labelClassName={currentTheme.labelClassName}
        />
      </div>
      <div>
        <Button 
          type="submit" 
          fullWidth 
          disabled={isSubmitting} 
          isLoading={isSubmitting}
          className={currentTheme.buttonClass}
        >
          Reset Password
        </Button>
      </div>
    </form>
  );
}