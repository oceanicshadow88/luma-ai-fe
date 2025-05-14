import { z } from 'zod';

export const signupSchema = z
  .object({
    firstName: z.string().min(1, 'Please enter your first name'),
    lastName: z.string().min(1, 'Please enter your last name'),
    username: z
      .string()
      .min(1, 'Please enter your username'),
    email: z
      .string()
      .min(1, 'Please enter your email address')
      .email('Sorry, please type a valid email'),
    code: z.string().min(1, 'Please enter the 6-digit verification code'),
    password: z
      .string()
      .min(1, 'Please enter your password')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
        'Password must be 8–20 characters and contain at least one uppercase letter, lowercase letter, number and special character'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must agree to the terms to continue.' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
