import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../schemas';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSignUp } from '@features/auth/hooks/useSignUp';
import { useSendCode } from '@features/auth/hooks/useSendCode';
import { SIGNUP_ERROR_MESSAGE_MAP } from '@custom-types/ApiError';
import { handleAdvancedFormError, handleToastError } from '@utils/errorHandler';
import { Input } from '@components/forms/Input';
import { PasswordInput } from '@components/forms/PasswordInput';
import { Button } from '@components/buttons/Button';
import { VerificationCodeInput } from '@components/forms/VerificationCodeInput';
import { showToastWithAction } from '@components/toast/ToastWithAction';
import { filterSignupForm } from '@utils/filterSignupForm';
import { UserRole } from '@features/auth/types';
import { Checkbox } from '@components/forms/Checkbox';

type Theme = 'default' | 'student';

interface SignUpFormProps {
  userRole?: UserRole;
  onSuccess?: () => void;
  theme?: Theme;
}

export function SignUpForm({ userRole = UserRole.LEARNER, onSuccess, theme = 'default' }: SignUpFormProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const themeStyles = {
        default: {
            inputClassName: 'border focus:outline-none focus:placeholder-transparent text-left border-gray-300 focus:border-blue-600 focus:ring-0 px-4 h-11 leading-normal pl-[20px]',
            passwordInputClassName: 'border focus:outline-none rounded-3xl text-left border-gray-300 focus:border-blue-600 focus:ring-0 px-4 h-11 leading-normal pl-[20px] pr-10',
            labelClassName: 'text-left block text-gray-600 mb-1 group-focus-within:text-blue-600',
            checkboxLabelClassName: 'text-left text-gray-600 ml-2 group-focus-within:text-blue-600',
            buttonClass: '',
            verificationButtonClass: '',
            checkboxClassName: 'mr-2',
        },
        student: {
            inputClassName: 'border focus:outline-none focus:placeholder-transparent text-left border-gray-300 focus:border-yellow-500 focus:ring-0 px-4 h-11 leading-normal pl-[20px]',
            passwordInputClassName: 'border focus:outline-none rounded-3xl text-left border-gray-300 focus:border-yellow-500 focus:ring-0 px-4 h-11 leading-normal pl-[20px] pr-10',
            labelClassName: 'text-left block text-gray-600 mb-1 group-focus-within:text-yellow-500',
            checkboxLabelClassName: 'text-left text-gray-600 ml-2 group-focus-within:text-yellow-500',
            buttonClass: '!bg-yellow-500 hover:!bg-yellow-600',
            verificationButtonClass: '!bg-transparent !text-yellow-500 hover:!bg-transparent hover:!text-yellow-600  !border-yellow-500',
            checkboxClassName: 'mr-2 accent-yellow-500',
        },
    };

    const currentTheme = themeStyles[theme];

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
        try {
            await sendCode(email);
            showToastWithAction('If the email is valid, a verification code will be sent.', {
                duration: 2000,
            });
        } catch (error: unknown) {
            handleToastError(
                error,
                SIGNUP_ERROR_MESSAGE_MAP,
                'Failed to send verification code. Please try again.'
            );
        }
    };

    const onSubmit = async (data: z.infer<typeof signupSchema>) => {
        const payload = {
            firstname: data.firstName,
            lastname: data.lastName,
            username: data.username,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            verifyCode: data.code,
            termsAccepted: data.termsAccepted
        };

        try {
            const result = await signup(payload, userRole);
            
            if (result?.redirect) {
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
        } catch (error) {
            handleAdvancedFormError(
                error,
                setError,
                SIGNUP_ERROR_MESSAGE_MAP,
                'toast',
                'Something went wrong. Please try again later.'
            );
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
                inputClassName={currentTheme.inputClassName}
                labelClassName={currentTheme.labelClassName}
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
                inputClassName={currentTheme.inputClassName}
                labelClassName={currentTheme.labelClassName}
                buttonClassName={currentTheme.verificationButtonClass}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    id="firstName"
                    label="First Name"
                    placeholder="e.g. John"
                    {...register('firstName')}
                    error={errors.firstName?.message}
                    inputClassName={currentTheme.inputClassName}
                    labelClassName={currentTheme.labelClassName}
                />
                <Input
                    id="lastName"
                    label="Last Name"
                    placeholder="e.g. Smith"
                    {...register('lastName')}
                    error={errors.lastName?.message}
                    inputClassName={currentTheme.inputClassName}
                    labelClassName={currentTheme.labelClassName}
                />
            </div>

            <Input
                id="username"
                label="Username"
                placeholder="e.g. johnsmith123"
                {...register('username')}
                error={errors.username?.message}
                inputClassName={currentTheme.inputClassName}
                labelClassName={currentTheme.labelClassName}
            />

            <PasswordInput
                id="password"
                label="Password"
                placeholder="create a password"
                {...register('password')}
                error={errors.password?.message}
                inputClassName={currentTheme.passwordInputClassName}
                labelClassName={currentTheme.labelClassName}
            />

            <PasswordInput
                id="confirmPassword"
                label="Confirm Password"
                placeholder="confirm your password"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
                inputClassName={currentTheme.passwordInputClassName}
                labelClassName={currentTheme.labelClassName}
            />

            <div className="flex flex-col space-y-1">
                <Checkbox
                    id="agreeTerms"
                    label="I agree to the Terms"
                    {...register('termsAccepted', { 
                        setValueAs: (value) => Boolean(value)
                    })}
                    error={errors.termsAccepted?.message}
                    checkboxClassName={currentTheme.checkboxClassName}
                    labelClassName={currentTheme.checkboxLabelClassName}
                />
            </div>

            <Button 
                type="submit" 
                variant="primary" 
                className={`rounded-3xl ${currentTheme.buttonClass}`}
                fullWidth 
                disabled={isSubmitting || isSigningUp}
                isLoading={isSubmitting || isSigningUp}
            >
                Sign Up
            </Button>
        </form>
    );
}