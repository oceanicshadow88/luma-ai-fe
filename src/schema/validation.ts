import * as z from 'zod';  // TypeScript-first schema validation library with static type inference. Reference: https://github.com/colinhacks/zod

export const emailSchema = z
  .string()
  .min(1, 'Please enter your email address')
  .email('Sorry, please type a valid email');

export const verificationCodeSchema = z
  .string()
  .min(1, 'Please enter the verification code')
  .length(6, 'Verification code must be 6 digits');

export const passwordSchema = z
  .string()
  .min(1, 'Please enter your new password')
  .refine(
    (pwd) =>
      pwd.length >= 8 &&
      pwd.length <= 20 &&
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      /[^A-Za-z0-9]/.test(pwd),
    {
      message:
        'Password must be 8-20 characters and contain at least one uppercase letter, lowercase letter, number and special character from the following ! @ # $ % ^ & *',
    }
  );
