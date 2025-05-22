import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../schemas';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSignUp } from '@/features/auth/hooks/useSignUp';
import { useSendCode } from '@/features/auth/hooks/useSendCode';
import { SIGNUP_ERROR_MESSAGE_MAP, UNKNOWN_SIGNUP_ERROR } from '@/types/ApiError';
import { getErrorField, getErrorMessage } from '@/utils/errorHandler';
import { Path } from 'react-hook-form';

export default function SignUpForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const passwordChecks = [
        { label: 'Use 8 or more characters, less than 20', test: (pw: string) => pw.length >= 8 && pw.length <= 20 },
        { label: 'One uppercase letter', test: (pw: string) => /[A-Z]/.test(pw) },
        { label: 'One lowercase letter', test: (pw: string) => /[a-z]/.test(pw) },
        { label: 'One number', test: (pw: string) => /[0-9]/.test(pw) },
        { label: 'One special character', test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
    ];

    const handleSendCode = async () => {
        if (!email || !canSend) return;
        try {
            await sendCode(email);
            toast.success('Verification code sent');
        } catch (error: unknown) {
            const field = getErrorField(error, SIGNUP_ERROR_MESSAGE_MAP, UNKNOWN_SIGNUP_ERROR.field);
            const message = getErrorMessage(error, UNKNOWN_SIGNUP_ERROR.message);
            setError(field as unknown as Path<z.infer<typeof signupSchema>>, { message });
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
            await signup(payload);
            toast.success('Signup success!');
            navigate('/dashboard');
        } catch (error: unknown) {
            const field = getErrorField(error, SIGNUP_ERROR_MESSAGE_MAP, UNKNOWN_SIGNUP_ERROR.field);
            const message = getErrorMessage(error, UNKNOWN_SIGNUP_ERROR.message);
            setError(field as unknown as Path<z.infer<typeof signupSchema>>, { message });
            toast.error(message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" {...register('firstName')} />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" {...register('lastName')} />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" {...register('username')} />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Work Email</label>
                <input className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" {...register('email')} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Verification Code</label>
                <div className="mt-1 flex gap-2">
                    <input className="flex-1 border border-gray-300 rounded px-3 py-2" {...register('code')} />
                    <button
                        type="button"
                        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                        onClick={handleSendCode}
                        disabled={!canSend}
                    >
                        {countdown > 0 ? `Resend in ${countdown}s` : 'Send Code'}
                    </button>
                </div>
                {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 pr-10"
                        {...register('password')}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-9 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    <ul className="mt-2 text-xs text-gray-600 space-y-1">
                        {passwordChecks.map((check, idx) => (
                            <li key={idx} className={check.test(password || '') ? 'text-green-600' : ''}>
                                {check.test(password || '') ? '✔' : '✘'} {check.label}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 pr-10"
                        {...register('confirmPassword')}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-9 text-gray-500"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center">
                <input type="checkbox" className="mr-2" {...register('agreeTerms')} />
                <label className="text-sm text-gray-700">I agree to the Terms</label>
            </div>
            {errors.agreeTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeTerms.message}</p>}

            <button
                type="submit"
                disabled={isSigningUp}
                className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
            >
                {isSigningUp ? 'Signing up...' : 'Sign Up'}
            </button>
        </form>
    );
}