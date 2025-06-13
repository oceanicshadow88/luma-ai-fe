import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../schemas';
import { z } from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input } from '@components/forms/Input';
import { PasswordInput } from '@components/forms/PasswordInput';
import { Button } from '@components/buttons/Button';
import { FormError } from '@components/forms/FormError';
import rightLogo from '@assets/decorative_graphic.png';
import logo from '@assets/logo.svg';
import { useEffect, useState } from 'react';
import { authService } from '@api/auth/auth';
import { signupService } from '@api/auth/signup';

export default function TeacherSignUpForm() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
    defaultValues: {
      email: token ? 'test@test.com' : '',
      code: token ?? '',
    },
  });

  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService
      .authToken(token ?? '')
      .catch((e) => setIsTokenInvalid(true))
      .finally(() => setIsLoading(false));
  }, [token]);

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
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
    const result = await signupService.teacherSignup(payload);
    if (result.status === 201) {
      toast.success('Signup success! You will be redirect in 3 seconds ');
      setTimeout(() => navigate('/dashboard'), 3000);
    }
  };

  if (isLoading) {
    return 'Loading...';
  }

  if (isTokenInvalid) {
    return 'Invalid invitation link. Please check your email or contact admin';
  }

  return (
    <div className="w-[1440px] h-[900px] flex bg-white items-center mx-auto">
      <div className="h-[800px] my-[50px] px-[170px] pt-[20px] flex flex-col justify-start">
        <img src={logo} alt="Luma AI Logo" className="w-[140px] h-auto mb-3" />

        <h2 className="text-xl font-semibold mb-10 text-left">
          Sign up for Luma AI Enterprise Version
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          <Input
            id="email"
            label="Work Email"
            type="email"
            placeholder="e.g. xxx@college.edu.au"
            {...register('email')}
            error={errors.email?.message}
            isDisabled={true}
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

          <div className="flex items-center">
            <input type="checkbox" className="mr-2" {...register('agreeTerms')} />
            <label className="text-sm text-gray-700">I agree to the Terms</label>
          </div>
          <FormError message={errors.agreeTerms?.message} />

          <Button type="submit" variant="primary" fullWidth isLoading={false}>
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
