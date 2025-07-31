import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../schemas';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSendCode } from '@features/auth/hooks/useSendCode';
import { Input } from '@components/forms/Input';
import { PasswordInput } from '@components/forms/PasswordInput';
import { Button } from '@components/buttons/Button';
import { VerificationCodeInput } from '@components/forms/VerificationCodeInput';
import { showToastWithAction } from '@components/toast/ToastWithAction';
import { UserRole } from '@features/auth/types';
import { Checkbox } from '@components/forms/Checkbox';
import { useFormTheme, type ThemeType } from '@styles/formThemeStyles';
import { signupService } from '@api/auth/signup';
import { useEffect } from 'react';
import { decodeJwt } from '@utils/jwtUtils';

interface SignUpFormProps {
  userRole?: UserRole;
  onSuccess?: (data?: any) => void;
  theme?: ThemeType;
  token?: string;
}

const SignUpForm = ({
  userRole = UserRole.LEARNER,
  onSuccess,
  theme = 'default',
  token,
}: SignUpFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const themeStyles = useFormTheme(theme);

  const defaultFormValues = location.state?.signupForm || {};
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (!token) {
      return;
    }
    if (!token && userRole === UserRole.LEARNER) {
      navigate('/auth/login/learner');
      return;
    }
    const decodePayload: any = decodeJwt(token);
    setValue('email', decodePayload.email);
    setValue('token', token);
  }, [token]);

  const email = watch('email');
  const verificationCode = watch('verificationCode');
  const { sendCode, countDown, canSend } = useSendCode();

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
        setError(result.meta?.field as keyof z.infer<typeof signupSchema>, {
          message: result.message,
        });
      }
      return;
    }

    showToastWithAction('If the email is valid, a verification code will be sent.', {
      duration: 2000,
    });
  };

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
      verifyValue: data.verificationCode,
      termsAccepted: data.termsAccepted,
      token: data.token,
    };

    const result = await signupService.signup(payload, userRole);

    if (!result) {
      return;
    }
    if (result.meta?.field) {
      setError(result.meta.field as keyof z.infer<typeof signupSchema>, {
        message: result.message,
      });
      return;
    }

    onSuccess?.(data);
    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full mt-8">
      <Input
        id="email"
        label="Work Email"
        type="email"
        placeholder="e.g. xxx@college.edu.au"
        {...register('email')}
        error={errors.email?.message}
        inputClassName={themeStyles.inputClassName}
        labelClassName={themeStyles.labelClassName}
        isDisabled={!!token}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="firstName"
          label="First Name"
          placeholder="e.g. John"
          {...register('firstName')}
          error={errors.firstName?.message}
          inputClassName={themeStyles.inputClassName}
          labelClassName={themeStyles.labelClassName}
        />
        <Input
          id="lastName"
          label="Last Name"
          placeholder="e.g. Smith"
          {...register('lastName')}
          error={errors.lastName?.message}
          inputClassName={themeStyles.inputClassName}
          labelClassName={themeStyles.labelClassName}
        />
      </div>

      <Input
        id="username"
        label="Username"
        placeholder="e.g. johnsmith123"
        {...register('username')}
        error={errors.username?.message}
        inputClassName={themeStyles.inputClassName}
        labelClassName={themeStyles.labelClassName}
      />

      <PasswordInput
        id="password"
        label="Password"
        placeholder="Create a password"
        {...register('password')}
        error={errors.password?.message}
        inputClassName={themeStyles.passwordInputClassName}
        labelClassName={themeStyles.labelClassName}
      />

      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
        inputClassName={themeStyles.passwordInputClassName}
        labelClassName={themeStyles.labelClassName}
      />

      <div className="flex flex-col space-y-1">
        <Checkbox
          id="agreeTerms"
          label="I agree to the Terms"
          {...register('termsAccepted', {
            setValueAs: (value) => Boolean(value),
          })}
          error={errors.termsAccepted?.message}
          checkboxClassName={themeStyles.checkboxClassName}
          labelClassName={themeStyles.checkboxLabelClassName}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className={`rounded-3xl ${themeStyles.buttonClass}`}
        fullWidth
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
