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

//Use message from backend response to map frontend error massage
export const ERROR_MESSAGE_MAP: Record<string, { field: ResetPasswordField; message: string }> = {
  'Please enter your email address': {
    field: 'email',
    message: 'Please enter your email address',
  },
  'Sorry, please type a valid email': {
    field: 'email',
    message: 'Sorry, please type a valid email',
  },
  'Too many requests. Please try again later.': {
    field: 'verificationCode',
    message: 'Too many requests. Please try again later.',
  },
  'Please enter the verification code': {
    field: 'verificationCode',
    message: 'Please enter the verification code',
  },
  'Invalid or expired code. Please request a new one.': {
    field: 'verificationCode',
    message: 'Invalid or expired code. Please request a new one.',
  },
  'Too many incorrect attempts. Please request a new verification code.': {
    field: 'verificationCode',
    message: 'Too many incorrect attempts. Please request a new verification code.',
  },
  'Please enter a new password': {
    field: 'password',
    message: 'Please enter your new password',
  },
  'Password must be 8-20 characters and contain at least one uppercase letter, lowercase letter, number and special character':
    {
      field: 'password',
      message:
        'Password must be 8-20 characters and contain at least one uppercase letter, lowercase letter, number and special character',
    },
  'Passwords do not match': {
    field: 'confirmPassword',
    message: 'Passwords do not match',
  },
};

export const UNKNOWN_ERROR = {
  field: 'root' as ResetPasswordField,
  message: 'Unexpected error occurred. Please try again.',
};
