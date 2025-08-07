import * as z from 'zod';
// TypeScript-first schema validation library with static type inference. Reference: https://github.com/colinhacks/zod
// Zod is designed to centralize validation logic in schema files. Referenc: https://zod.dev/?id=writing-schemas; https://react-hook-form.com/get-started#SchemaValidation
import {
  emailSchema,
  verificationCodeSchema,
  newPasswordSchema,
  passwordSchema,
  firstNameSchema,
  lastNameSchema,
  usernameSchema,
  organizationNameSchema,
  slugSchema,
} from '@schema/validation';

export const signupSchema = z
  .object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    token: z.string().optional(),
    username: usernameSchema,
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
  })
  .superRefine((data, ctx) => {
    // if no token ，verificationCode mush 6
    if (!data.token) {
      if (!data.verificationCode || !/^\d{6}$/.test(data.verificationCode)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Verification code must be 6 digits',
          path: ['verificationCode'],
        });
      }
    }
  });

export const institutionSchema = z.object({
  companyName: organizationNameSchema,
  slug: slugSchema,
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
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    username: usernameSchema,
    email: z
      .string()
      .min(1, 'Please enter your email address')
      .email('Sorry, please type a valid email'),
    password: newPasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must agree to the terms to continue.' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });