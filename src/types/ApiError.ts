import { ResetPasswordFormData } from '@features/auth/type';

export type ResetPasswordField = keyof ResetPasswordFormData | 'root';

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

export const UNKNOWN_ERROR = {
  field: 'root' as ResetPasswordField,
  message: 'Unexpected error occurred. Please try again.',
};