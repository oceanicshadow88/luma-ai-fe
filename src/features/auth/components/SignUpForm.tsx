import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../schemas';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSignUp } from '@features/auth/hooks/useSignUp';
import { useSendCode } from '@features/auth/hooks/useSendCode';
import { Input } from '@components/forms/Input';
import { PasswordInput } from '@components/forms/PasswordInput';
import { Button } from '@components/buttons/Button';
import { VerificationCodeInput } from '@components/forms/VerificationCodeInput';
import { showToastWithAction } from '@components/toast/ToastWithAction';
import { filterSignupForm } from '@utils/filterSignupForm';
import { UserRole } from '@features/auth/types';
import { Checkbox } from '@components/forms/Checkbox';
import { useFormTheme, type ThemeType } from '@styles/formThemeStyles';

interface SignUpFormProps {
  userRole?: UserRole;
  onSuccess?: () => void;
  theme?: ThemeType;
}

export function SignUpForm({ 
  userRole = UserRole.LEARNER, 
  onSuccess, 
  theme = 'default' 
}: SignUpFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const themeStyles = useFormTheme(theme);

  const defaultFormValues = location.state?.signupForm || {};
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: defaultFormValues,
  });

  const email = watch('email');
  const { signup, isSigningUp } = useSignUp();
  const { sendCode, countdown, canSend } = useSendCode();

  const handleSendCode = async () => {
    if (!email || !canSend) return;
    
    const result = await sendCode(email, { setError });
    
    if (result.success) {
      showToastWithAction('If the email is valid, a verification code will be sent.', {
        duration: 2000,
      });
    }
  };

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
      verifyValue: data.code,
      termsAccepted: data.termsAccepted
    };

    const result = await signup(payload, userRole, { setError });
      
    if (result.success) {
      if (result.redirect) {
        if (result.redirect === '/auth/signup/institution') {
          if (userRole === UserRole.ADMIN) {
            showToastWithAction('Company not found, redirecting to institution setup...', {
              duration: 2000,
            });
            navigate('/auth/signup/institution', { 
              state: { signupForm: filterSignupForm(data) } 
            });
            return;
          }
        }
      }

      const timeoutId = setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

      showToastWithAction('Successfully signed up! Redirecting...', {
        actionText: 'Go Now',
        onAction: () => {
          clearTimeout(timeoutId);
          navigate('/dashboard');
        },
        duration: 2000,
      });

      onSuccess?.();
    }
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
      />

      <VerificationCodeInput
        id="code"
        label="Verification Code"
        placeholder="Enter the 6-digit code"
        buttonText={countdown > 0 ? `Resend in ${countdown}s` : 'Send'}
        onButtonClick={handleSendCode}
        isButtonDisabled={!canSend}
        {...register('code')}
        error={errors.code?.message}
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
        placeholder="create a password"
        {...register('password')}
        error={errors.password?.message}
        inputClassName={themeStyles.passwordInputClassName}
        labelClassName={themeStyles.labelClassName}
      />

      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        placeholder="confirm your password"
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
            setValueAs: (value) => Boolean(value)
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
        disabled={isSubmitting || isSigningUp}
        isLoading={isSubmitting || isSigningUp}
      >
        Sign Up
      </Button>
    </form>
  );
}