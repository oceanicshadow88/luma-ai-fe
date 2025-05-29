import { ResetPasswordFormData } from '@features/auth/type';
import { SignUpInput } from '@features/auth/types';
import { InstitutionPayload } from '@features/auth/types';

export type ResetPasswordField = keyof ResetPasswordFormData | 'root';
export type SignupField = keyof SignUpInput | 'root';

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

export const ERROR_MESSAGE_MAP: Record<string, ResetPasswordField> = {
  'Please enter your email address': 'email',
  'Too many requests. Please try again later.': 'verificationCode',
  'Please enter the verification code': 'verificationCode',
  'Invalid or expired code. Please request a new one.': 'verificationCode',
  'Too many incorrect attempts. Please request a new verification code.': 'verificationCode',
  'Please enter a new password': 'password',
  'Password must be 8-20 characters and contain at least one uppercase letter, lowercase letter, number and special character': 'password',
  'Passwords do not match': 'confirmPassword',
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
  field: 'root' as ResetPasswordField | SignupField | keyof InstitutionPayload,
  message: 'Unexpected error occurred. Please try again.',
};