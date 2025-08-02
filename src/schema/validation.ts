import * as z from 'zod';

// TypeScript-first schema validation library with static type inference. Reference: https://github.com/colinhacks/zod

export const emailSchema = z
  .string()
  .min(1, 'Please enter your email address')
  .email('Please type a valid email');

export const verificationCodeSchema = z
  .string()
  .min(1, 'Please enter the verification code')
  .length(6, 'Verification code must be 6 digits')
  .regex(/^\d{6}$/, 'Verification code must contain only digits');

export const newPasswordSchema = z
  .string()
  .min(1, 'Please enter your password')
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
        'Password must be 8-20 characters and contain at least one uppercase letter, lowercase letter, number and special character from the following !@#$%^&*',
    }
  );

export const passwordSchema = z
  .string()
  .min(1, 'Please enter your password')
  .min(8, 'Please lengthen this text to 8 characters or more');

export const firstNameSchema = z
  .string()
  .min(1, 'Please enter your first name')
  .min(2, 'First name must be at least 2 characters')
  .max(20, 'First name must be at most 20 characters')
  .regex(/^[a-zA-Z]+$/, 'First name can only contain letters');

export const lastNameSchema = z
  .string()
  .min(1, 'Please enter your last name')
  .min(2, 'Last name must be at least 2 characters')
  .max(20, 'Last name must be at most 20 characters')
  .regex(/^[a-zA-Z]+$/, 'Last name can only contain letters');

export const usernameSchema = z
  .string()
  .min(2, 'Username must be at least 2 characters')
  .max(20, 'Username must be at most 20 characters')
  .regex(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers');

export const organizationNameSchema = z
  .string()
  .min(2, 'Organisation name must be at least 2 characters')
  .max(20, 'Organisation name must be at most 20 characters')
  .regex(/^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/, 'Organisation name can only contain letters, numbers and spaces, with no leading or trailing spaces');

export const slugSchema = z
  .string()
  .min(2, 'Slug must be at least 2 characters')
  .max(30, 'Slug must be at most 30 characters')
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slug can only contain lowercase letters, numbers and single hyphens (no consecutive hyphens)');