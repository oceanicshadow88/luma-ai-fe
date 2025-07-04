import { ResetPasswordFormData } from '@features/auth/types';
import { SignUpInput } from '@features/auth/types';
import { InstitutionFormData } from '@features/auth/types';
import { LoginFormData } from '@features/auth/types';

export type ResetPasswordField = keyof ResetPasswordFormData | 'toast';
export type SignupField = keyof SignUpInput | 'toast';
export type LoginField = keyof LoginFormData | 'toast';
export type InstitutionField = keyof InstitutionFormData | 'toast';

export interface ApiErrorMeta {
  cooldownSeconds?: number;
  [key: string]: unknown;
}

export class ApiError extends Error {
  meta?: ApiErrorMeta;
  
  constructor(message: string, meta?: ApiErrorMeta) {
    super(message);
    this.name = 'ApiError';
    this.meta = meta;
  }
}

export const API_ERRORS = {
  TOO_MANY_CODE_REQUESTS: { field: 'verificationCode' as const, message: 'Too many requests. Please try again later.' },
  INVALID_CODE: { field: 'verificationCode' as const, message: 'Invalid or expired code. Please request a new one.' },
  TOO_MANY_CODE_ATTEMPTS: { field: 'verificationCode' as const, message: 'Too many incorrect attempts. Please request a new verification code.' },
  INVALID_CREDENTIALS: { field: 'toast' as const, message: 'Login failed. Please check your email and password.' },
  TOO_MANY_LOGIN_ATTEMPTS: { field: 'toast' as const, message: 'Too many failed login attempts. Please try again later.' },
  EMAIL_REGISTERED: { field: 'email' as const, message: 'Email already registered. Please log in' },
  USERNAME_TAKEN: { field: 'username' as const, message: 'Username already in use. Try a different one' },
  PUBLIC_EMAIL: { field: 'email' as const, message: 'Public email providers are not allowed' },
};

export const UNKNOWN_ERROR = {
  field: 'toast' as const,
  message: 'Unexpected error occurred. Please try again.',
};