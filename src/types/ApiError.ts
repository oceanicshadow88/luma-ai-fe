import { ResetPasswordFormData } from '@features/auth/types';
import { SignUpInput } from '@features/auth/types';
import { InstitutionPayload } from '@features/auth/types';
import { LoginFormData } from '@features/auth/types';

export type ResetPasswordField = keyof ResetPasswordFormData | 'toast';
export type SignupField = keyof SignUpInput | 'toast';

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

export const RESET_PASSWORD_ERROR_MESSAGE_MAP: Record<string, [ResetPasswordField, string]> = {
  'email address': ['email', 'Please enter your email address'],
  'too many requests': ['verificationCode', 'Too many requests. Please try again later.'],
  'verification code': ['verificationCode', 'Please enter the verification code'],
  'invalid code': ['verificationCode', 'Invalid or expired code. Please request a new one.'],
  'invalid or expired code': ['verificationCode', 'Invalid or expired code. Please request a new one.'],
  'too many attempts': ['verificationCode', 'Too many incorrect attempts. Please request a new verification code.'],
  'new password': ['password', 'Please enter a new password'],
  'password characters': ['password', 'Password must be 8-20 characters and contain at least one uppercase letter, lowercase letter, number and special character (!@#$%^&*)'],
};

export const LOGIN_ERROR_MESSAGE_MAP: Record<string, [keyof LoginFormData | 'toast', string]> = {
  'credentials': ['toast', 'Login failed. Please check your email and password.'],
  'attempts': ['toast', 'Too many failed login attempts. Please try again later.'],
  'include': ['toast', 'Login failed. Please check your email and password.'],
};

export const SIGNUP_ERROR_MESSAGE_MAP: Record<string, SignupField> = {
  'Please enter your first name': 'firstName',
  'Please enter your last name': 'lastName',
  'Please enter your username': 'username',
  'Please enter your email address': 'email',
  'Sorry, please type a valid email': 'email',
  'Please enter the 6-digit verification code': 'code',
  'Please enter your password': 'password',
  'Passwords do not match': 'confirmPassword',
  'You must agree to the terms to continue.': 'agreeTerms',
  'Email already registered. Please log in': 'email',
  'Username already in use. Try a different one': 'username',
  'Invalid or expired code': 'code',
};

export const INSTITUTION_ERROR_MAP: Record<string, keyof InstitutionPayload | 'root'> = {
  'Organisation name must be at least 2 characters': 'name',
};

export const UNKNOWN_ERROR = {
  field: 'toast' as ResetPasswordField | SignupField | keyof InstitutionPayload,
  message: 'Unexpected error occurred. Please try again.',
};