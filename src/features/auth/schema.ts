import * as z from 'zod'; // TypeScript-first schema validation library with static type inference. Reference: https://github.com/colinhacks/zod
                          // Zod is designed to centralize validation logic in schema files. Referenc: https://zod.dev/?id=writing-schemas; https://react-hook-form.com/get-started#SchemaValidation
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
