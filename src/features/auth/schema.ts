import * as z from 'zod'; // TypeScript-first schema validation library with static type inference. Reference: https://github.com/colinhacks/zod
                          // Zod is designed to centralize validation logic in schema files. Referenc: https://zod.dev/?id=writing-schemas; https://react-hook-form.com/get-started#SchemaValidation
import { emailSchema, verificationCodeSchema, passwordSchema } from '@schema/validation';

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
    code: verificationCodeSchema,
    password: passwordSchema,
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
 
export const resetPasswordSchema = z
  .object({
    email: emailSchema,
    verificationCode: verificationCodeSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z
  .object({
    email: emailSchema,
    password: z.string().min(8, 'Please lengthen this text to 8 characters or more'),
  })
