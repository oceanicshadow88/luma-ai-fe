import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { teacherSignupSchema } from '../schemas';
import { z } from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '@components/forms/Input';
import { PasswordInput } from '@components/forms/PasswordInput';
import { Button } from '@components/buttons/Button';
import { useEffect, useState } from 'react';
import { authService } from '@api/auth/auth';
import { signupService } from '@api/auth/signup';
import { hasExpiry } from '@utils/dataUtils';
import { decodeJwt } from '@utils/jwtUtils';
import { Checkbox } from '@components/forms/Checkbox';
import { showToastWithAction } from '@components/toast/ToastWithAction';
import { ApiError } from '@custom-types/ApiError';

export default function TeacherSignUpForm() {
  const [searchParams] = useSearchParams();
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = searchParams.get('token') ?? '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decodePayload: any = decodeJwt(token);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof teacherSignupSchema>>({
    resolver: zodResolver(teacherSignupSchema),
    mode: 'onTouched',
    defaultValues: {
      email: token ? decodePayload?.email : '',
    },
  });

  useEffect(() => {
    const verifyToken = async () => {
      if (!decodePayload) {
        setIsTokenInvalid(true);
        setIsLoading(false);
        return;
      }
      await authService
        .authToken(token ?? '')
        .catch((e) => {
          if (e.message.includes('expired')) return;
          setIsTokenInvalid(true);
        })
        .finally(() => setIsLoading(false));
    };
    verifyToken();
  }, [token, decodePayload]);

  const onSubmit = async (data: z.infer<typeof teacherSignupSchema>) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      verifyValue: token ?? 'abc',
      termsAccepted: true,
    };

    const result = await signupService.signupAsInstructor(payload);

    if (result instanceof ApiError) { 
      if (result.meta?.field){
        setError(result.meta.field as keyof z.infer<typeof teacherSignupSchema>, {
          message: result.message
        });
      }
      return;
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
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (isTokenInvalid) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600">Invalid invitation link. Please check your email or contact admin</div>
      </div>
    );
  }

  if (hasExpiry(decodePayload.exp)) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600">This invitation link has expired.</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full mt-8">
      <Input
        id="email"
        label="Work Email"
        type="email"
        placeholder="e.g. xxx@college.edu.au"
        {...register('email')}
        error={errors.email?.message}
        isDisabled={true}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        placeholder="Create a password"
        {...register('password')}
        error={errors.password?.message}
      />

      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      <div className="flex flex-col space-y-1">
        <Checkbox
          id="agreeTerms"
          label="I agree to the Terms"
          {...register('agreeTerms')}
          error={errors.agreeTerms?.message}
        />
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        className="rounded-3xl"
        fullWidth 
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        Sign Up
      </Button>
    </form>
  );
}