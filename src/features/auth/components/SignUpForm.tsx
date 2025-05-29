import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../schemas';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSignUp } from '@features/auth/hooks/useSignUp';
import { useSendCode } from '@features/auth/hooks/useSendCode';
import { SIGNUP_ERROR_MESSAGE_MAP, UNKNOWN_ERROR } from '@custom-types/ApiError';
import { getErrorField, getErrorMessage } from '@utils/errorHandler';
import { Path } from 'react-hook-form';
import { Input } from '@components/forms/Input';
import { PasswordInput } from '@components/forms/PasswordInput';
import { Button } from '@components/buttons/Button';
import { VerificationCodeInput } from '@components/forms/VerificationCodeInput';
import { FormError } from '@components/forms/FormError';
import rightLogo from '@assets/decorative_graphic.png';
import logo from '@assets/logo.svg';

export default function SignUpForm() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        mode: 'onTouched',
    });

    const email = watch('email');
    const password = watch('password');
    const { signup, isSigningUp } = useSignUp();
    const { sendCode, countdown, canSend } = useSendCode();

    const handleSendCode = async () => {
        if (!email || !canSend) return;
        try {
            await sendCode(email);
            toast.success('Verification code sent');
        } catch (error: unknown) {
            const field = getErrorField(error, SIGNUP_ERROR_MESSAGE_MAP, UNKNOWN_ERROR.field);
            const message = getErrorMessage(error, UNKNOWN_ERROR.message);
            setError(field as Path<z.infer<typeof signupSchema>>, { message });
            toast.error(message);
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
        };

        try {
            const result = await signup(payload);
            if (result?.redirect) {
                toast('Company not found, redirecting...');
                navigate('/auth/signup/institution', { state: { email: data.email } });
                return;
            }
            toast.success('Signup success!');
            navigate('/dashboard');
        } catch (error: unknown) {
            const field = getErrorField(error, SIGNUP_ERROR_MESSAGE_MAP, UNKNOWN_ERROR.field);
            const message = getErrorMessage(error, UNKNOWN_ERROR.message);
            if (message.toLowerCase().includes('user already exist')) {
                toast('Email already registered. Please log in.');
                navigate('/auth/login');
                return;
            }
            setError(field as Path<z.infer<typeof signupSchema>>, { message });
            toast.error(message);
        }
    };

    return (
        <div className="w-[1440px] h-[900px] flex bg-white items-center mx-auto">
            <div className="h-[800px] my-[50px] px-[170px] pt-[20px] flex flex-col justify-start">
                <img src={logo} alt="Luma AI Logo" className="w-[140px] h-auto mb-3" />

                <h2 className="text-xl font-semibold mb-10 text-left">Sign up for Luma AI Enterprise Version</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <Input
                        id="email"
                        label="Work Email"
                        type="email"
                        placeholder="e.g. xxx@college.edu.au"
                        {...register('email')}
                        error={errors.email?.message}
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
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            id="firstName"
                            label="First Name"
                            placeholder="e.g. John"
                            {...register('firstName')}
                            error={errors.firstName?.message}
                        />
                        <Input
                            id="lastName"
                            label="Last Name"
                            placeholder="e.g. Smith"
                            {...register('lastName')}
                            error={errors.lastName?.message}
                        />
                    </div>

                    <Input
                        id="username"
                        label="Username"
                        placeholder="e.g. johnsmith123"
                        {...register('username')}
                        error={errors.username?.message}
                    />

                    <PasswordInput
                        id="password"
                        label="Password"
                        placeholder="create a password"
                        {...register('password')}
                        error={errors.password?.message}
                    />

                    <PasswordInput
                        id="confirmPassword"
                        label="Confirm Password"
                        placeholder="confirm your password"
                        {...register('confirmPassword')}
                        error={errors.confirmPassword?.message}
                    />

                    <div className="flex items-center">
                        <input type="checkbox" className="mr-2" {...register('agreeTerms')} />
                        <label className="text-sm text-gray-700">I agree to the Terms</label>
                    </div>
                    <FormError message={errors.agreeTerms?.message} />

                    <Button type="submit" variant="primary" fullWidth isLoading={isSigningUp}>
                        Sign Up
                    </Button>
                </form>
            </div>

            <div className="h-[800px] my-[50px] pr-[100px] flex items-center justify-center">
                <img src={rightLogo} alt="Luma AI Logo" className="w-[600px] h-[800px] object-contain" />
            </div>
        </div>
    );
}