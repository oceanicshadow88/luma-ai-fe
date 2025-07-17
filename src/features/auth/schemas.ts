import * as z from 'zod'; // TypeScript-first schema validation library with static type inference. Reference: https://github.com/colinhacks/zod
// Zod is designed to centralize validation logic in schema files. Referenc: https://zod.dev/?id=writing-schemas; https://react-hook-form.com/get-started#SchemaValidation
import {
  emailSchema,
  verificationCodeSchema,
  newPasswordSchema,
  passwordSchema,
} from '@schema/validation';

export const signupSchema = z
  .object({
    firstName: z.string().min(1, 'Please enter your first name'),
    lastName: z.string().min(1, 'Please enter your last name'),
    username: z
      .string()
      .min(2, 'Username must be at least 2 characters')
      .max(20, 'Username must be at most 20 characters')
      .regex(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers'),
    email: emailSchema,
    verificationCode: verificationCodeSchema,
    password: newPasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, 'You must agree to the terms to continue.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

  export const institutionSchema = z.object({
    companyName: z
      .string()
      .min(2, 'Organisation name must be at least 2 characters')
      .max(100, 'Organisation name too long'),
    slug: z.string(),
    logo: z.any().optional(),
    emailDomain: z.string(),
  });

export const resetPasswordSchema = z
  .object({
    email: emailSchema,
    verificationCode: verificationCodeSchema,
    password: newPasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const teacherSignupSchema = z
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
