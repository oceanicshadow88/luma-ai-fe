import * as z from 'zod';
import { emailSchema, verificationCodeSchema, passwordSchema } from '@schema/validation';

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
