import { z } from 'zod';

export const signupSchema = z
  .object({
    firstName: z.string().min(1, 'Please enter your first name'),
    lastName: z.string().min(1, 'Please enter your last name'),
    username: z
    .string()
    .min(2, 'Username must be at least 2 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers'),
    email: z
      .string()
      .min(1, 'Please enter your email address')
      .email('Sorry, please type a valid email'),
    code: z
      .string()
      .min(1, 'Please enter the 6-digit verification code')
      .regex(/^\d+$/, 'Verification code must contain only digits'),
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

  export const institutionSchema = z.object({
    name: z
      .string()
      .min(2, 'Organisation name must be at least 2 characters')
      .max(100, 'Organisation name too long'),
    slug: z
      .string()
      .min(1, 'Slug cannot be empty')
      .max(100, 'Slug too long')
      .regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
    logo: z.any().optional(), 
    emailDomain: z.string(),
  });